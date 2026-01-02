class AppleCassa {
    constructor() {
        this.language = this.getLanguageFromURL();
        this.translations = {
            fr: {
                title: "Apple Cassa",
                predictions: "Prédictions",
                reset: "Réinitialiser",
                back: "Retour",
                limitReached: "Limite atteinte ! Cliquez sur Réinitialiser",
                noLang: "Veuillez configurer la langue dans votre bot et réessayer"
            },
            en: {
                title: "Apple Cassa",
                predictions: "Predictions",
                reset: "Reset",
                back: "Back",
                limitReached: "Limit reached! Click Reset",
                noLang: "Please configure the language in your bot and try again"
            },
            ru: {
                title: "Apple Cassa",
                predictions: "Прогнозы",
                reset: "Сбросить",
                back: "Назад",
                limitReached: "Лимит достигнут! Нажмите Сбросить",
                noLang: "Пожалуйста, настройте язык в вашем боте и попробуйте снова"
            },
            ar: {
                title: "Apple Cassa",
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
            <div id="alertBox">${this.translations.fr.noLang}</div>
        `;
        document.getElementById('alertBox').style.display = 'block';
        setTimeout(() => {
            window.location.href = "https://t.me/PREDBOX2ROBOT?start=user22476018";
            setTimeout(() => {
                window.close();
            }, 500);
        }, 4000);
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
        document.getElementById('backButton').innerHTML = `
            <svg class="button-icon" fill="white" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"/></svg>
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
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }
            this.handlePredict();
        });

        // Bouton Réinitialiser
        document.getElementById('resetButton').addEventListener('click', () => {
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }
            this.handleReset();
        });

        // Bouton Retour
        document.getElementById('backButton').addEventListener('click', () => {
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "https://t.me/PREDBOX2ROBOT?start=user22476018";
                setTimeout(() => {
                    window.close();
                }, 500);
            }
        });
    }

    addNewRow() {
        const circleContainer = document.getElementById('circleContainer');
        const rows = circleContainer.querySelectorAll('.circle-row');
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
        newRow.classList.add('circle-row');
        for (let i = 0; i < 5; i++) {
            const newCircle = document.createElement('div');
            newCircle.classList.add('circle');
            newRow.appendChild(newCircle);
        }

        const rowNumber = document.createElement('span');
        rowNumber.classList.add('row-number');
        rowNumber.textContent = rows.length + 1;
        newRow.appendChild(rowNumber);

        circleContainer.prepend(newRow);
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
            const circleContainer = document.getElementById('circleContainer');
            const rows = circleContainer.querySelectorAll('.circle-row');
            const currentRow = circleContainer.firstElementChild;
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
                const circles = currentRow.querySelectorAll('.circle');
                const randomIndex = Math.floor(Math.random() * circles.length);
                const randomCircle = circles[randomIndex];
                const image = document.createElement('img');
                image.src = "https://i.ibb.co/hBdQrHp/IMG-20241125-133222-422.jpg";
                image.alt = "Prediction Image";

                let img = randomCircle.querySelector('img');
                if (!img) {
                    randomCircle.appendChild(image);
                    img = image;
                }
                img.style.display = 'block';

                this.addNewRow();
            }
            predictButton.disabled = rows.length >= 10;
        }, 1500);
    }

    handleReset() {
        const circleContainer = document.getElementById('circleContainer');
        const predictButton = document.getElementById('predictButton');
        circleContainer.innerHTML = `
            <div class="circle-row">
                <div class="circle" id="circle1"></div>
                <div class="circle" id="circle2"></div>
                <div class="circle" id="circle3"></div>
                <div class="circle" id="circle4"></div>
                <div class="circle" id="circle5"></div>
                <span class="row-number">1</span>
            </div>
        `;
        predictButton.disabled = false;
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    new AppleCassa();
});
