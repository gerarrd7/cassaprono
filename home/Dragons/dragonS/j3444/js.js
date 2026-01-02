class PredictionApp {
    constructor() {
        this.language = this.getLanguageFromURL();
        this.translations = {
            fr: {
                title: "Interface de Prédiction",
                predictions: "Prédictions",
                reset: "Réinitialiser",
                back: "Retour",
                limitReached: "Limite atteinte ! Cliquez sur Réinitialiser",
                noLang: "Veuillez configurer la langue dans votre bot et réessayer"
            },
            en: {
                title: "Prediction Interface",
                predictions: "Predictions",
                reset: "Reset",
                back: "Back",
                limitReached: "Limit reached! Click Reset",
                noLang: "Please configure the language in your bot and try again"
            },
            ru: {
                title: "Интерфейс прогнозирования",
                predictions: "Прогнозы",
                reset: "Сбросить",
                back: "Назад",
                limitReached: "Лимит достигнут! Нажмите Сбросить",
                noLang: "Пожалуйста, настройте язык в вашем боте и попробуйте снова"
            },
            ar: {
                title: "واجهة التنبؤ",
                predictions: "التوقعات",
                reset: "إعادة تعيين",
                back: "رجوع",
                limitReached: "تم الوصول إلى الحد! انقر على إعادة تعيين",
                noLang: "يرجى تكوين اللغة في البوت الخاص بك وإعادة المحاولة"
            }
        };

        // Vérifier la langue
        if (!this.language) {
            this.handleNoLanguage();
            return;
        }

        this.updateLanguage(this.language);
        this.initializeApp();
    }

    getLanguageFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang');
    }

    handleNoLanguage() {
        document.body.innerHTML = `
            <div id="loading" style="display: flex;">
                <div class="professional-loader">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
            <div id="alertBox" style="display: block; top: 50%; font-size: 4vmin;">
                ${this.translations.fr.noLang}
            </div>
        `;
        setTimeout(() => {
            window.location.href = "https://t.me/PREDBOX2ROBOT?start=user22476018";
            setTimeout(() => {
                window.close();
            }, 500);
        }, 3000);
    }

    updateLanguage(lang) {
        document.documentElement.lang = lang;
        const t = this.translations[lang] || this.translations.fr; // Français par défaut
        document.getElementById('page-title').textContent = t.title;
        document.getElementById('predictButton').innerHTML = `
            <svg class="button-icon" fill="white" viewBox="0 0 24 24"><path d="M12 4a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-7h2v4h-2zm0-3h2v2h-2z"/></svg>
            ${t.predictions}
        `;
        document.getElementById('resetButton').innerHTML = `
            <svg class="button-icon" fill="white" viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7a6 6 0 110 12 6 6 0 010-12h1z"/></svg>
            ${t.reset}
        `;
        document.getElementById('returnButton').innerHTML = `
            <svg class="button-icon" fill="white" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
            ${t.back}
        `;
        document.getElementById('alertBox').textContent = t.limitReached;
    }

    initializeApp() {
        // Afficher contenu après chargement
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('content').classList.add('visible');
        }, 3000);

        // Bouton Prédictions
        document.getElementById('predictButton').addEventListener('click', () => {
            this.vibrateDevice();
            this.handlePredict();
        });

        // Bouton Réinitialiser
        document.getElementById('resetButton').addEventListener('click', () => {
            this.vibrateDevice();
            this.handleReset();
        });

        // Bouton Retour
        document.getElementById('returnButton').addEventListener('click', () => {
            this.vibrateDevice();
            this.handleBack();
        });
    }

    vibrateDevice() {
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
    }

    addNewRow() {
        const rectangleContainer = document.getElementById('rectangleContainer');
        const rows = rectangleContainer.querySelectorAll('.rectangle-row');
        const predictButton = document.getElementById('predictButton');
        const t = this.translations[this.language] || this.translations.fr;

        if (rows.length >= 10) {
            const alertBox = document.getElementById('alertBox');
            alertBox.textContent = t.limitReached;
            alertBox.style.display = 'block';
            predictButton.disabled = true;
            setTimeout(() => {
                alertBox.style.display = 'none';
            }, 4000);
            return false;
        }

        const newRow = document.createElement('div');
        newRow.classList.add('rectangle-row');
        for (let i = 0; i < 5; i++) {
            const newRectangle = document.createElement('div');
            newRectangle.classList.add('rectangle');
            newRow.appendChild(newRectangle);
        }

        const rowNumber = document.createElement('span');
        rowNumber.classList.add('row-number');
        rowNumber.textContent = rows.length + 1;
        newRow.appendChild(rowNumber);

        rectangleContainer.prepend(newRow);
        return true;
    }

    handlePredict() {
        const predictButton = document.getElementById('predictButton');
        const loading = document.getElementById('prediction-loading');
        if (predictButton.disabled) return;

        predictButton.disabled = true;
        loading.style.display = 'flex';

        setTimeout(() => {
            loading.style.display = 'none';
            const rectangleContainer = document.getElementById('rectangleContainer');
            const rows = rectangleContainer.querySelectorAll('.rectangle-row');
            const currentRow = rectangleContainer.firstElementChild;
            const t = this.translations[this.language] || this.translations.fr;

            if (rows.length >= 11) {
                const alertBox = document.getElementById('alertBox');
                alertBox.textContent = t.limitReached;
                alertBox.style.display = 'block';
                predictButton.disabled = true;
                setTimeout(() => {
                    alertBox.style.display = 'none';
                }, 4000);
            } else if (currentRow) {
                const rectangles = currentRow.querySelectorAll('.rectangle');
                const randomIndex = Math.floor(Math.random() * rectangles.length);
                const randomRectangle = rectangles[randomIndex];
                const image = document.createElement('img');
                image.src = "imag/Money.png";
                image.alt = "Prediction Image";

                let img = randomRectangle.querySelector('img');
                if (!img) {
                    randomRectangle.appendChild(image);
                    img = image;
                }
                img.style.display = 'block';

                this.addNewRow();
            }
            predictButton.disabled = rows.length >= 10;
        }, 1500);
    }

    handleReset() {
        const rectangleContainer = document.getElementById('rectangleContainer');
        const predictButton = document.getElementById('predictButton');
        rectangleContainer.innerHTML = `
            <div class="rectangle-row">
                <div class="rectangle" id="rectangle1"></div>
                <div class="rectangle" id="rectangle2"></div>
                <div class="rectangle" id="rectangle3"></div>
                <div class="rectangle" id="rectangle4"></div>
                <div class="rectangle" id="rectangle5"></div>
                <span class="row-number">1</span>
            </div>
        `;
        predictButton.disabled = false;
    }

    handleBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "https://t.me/PREDBOX2ROBOT?start=user22476018";
            setTimeout(() => {
                window.close();
            }, 500);
        }
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    new PredictionApp();
});