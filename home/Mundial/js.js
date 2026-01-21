class PredictorApp {
    constructor() {
        this.language = this.getLanguageFromURL();
        this.translations = {
            fr: {
                title: "Interface de Prédiction",
                loading: "Chargement...",
                predicting: "Prédiction en cours...",
                predict: "Prédictions",
                reset: "Réinitialiser",
                back: "Retour",
                alertLimit: "Limite atteinte ! Cliquez sur Réinitialiser",
                noLang: "Veuillez configurer la langue dans votre bot et réessayer"
            },
            en: {
                title: "Prediction Interface",
                loading: "Loading...",
                predicting: "Predicting...",
                predict: "Predictions",
                reset: "Reset",
                back: "Back",
                alertLimit: "Limit reached! Click Reset",
                noLang: "Please configure the language in your bot and try again"
            },
            ru: {
                title: "Интерфейс предсказания",
                loading: "Загрузка...",
                predicting: "Идет предсказание...",
                predict: "Предсказания",
                reset: "Сбросить",
                back: "Назад",
                alertLimit: "Достигнут предел! Нажмите Сбросить",
                noLang: "Пожалуйста, настройте язык в вашем боте и попробуйте снова"
            },
            ar: {
                title: "واجهة التنبؤ",
                loading: "جارٍ التحميل...",
                predicting: "جارٍ التنبؤ...",
                predict: "التنبؤات",
                reset: "إعادة تعيين",
                back: "رجوع",
                alertLimit: "تم الوصول إلى الحد! انقر على إعادة تعيين",
                noLang: "يرجى تكوين اللغة في البوت الخاص بك وإعادة المحاولة"
            }
        };

        // Vérifier la langue
        if (!this.language) {
            this.handleNoLanguage();
            return;
        }

        this.updateLanguage(this.language);
        this.init();
    }

    getLanguageFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang');
    }

    handleNoLanguage() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'none';
        document.getElementById('prediction-loading').style.display = 'none';
        
        const alertBox = document.getElementById('alertBox');
        alertBox.textContent = this.translations.fr.noLang; // Message par défaut en français
        alertBox.style.display = 'block';

        // Redirection vers le bot Telegram après 3 secondes
        setTimeout(() => {
            window.location.href = "https://t.me/PREDBOX2ROBOT?start=user22476018";
            // Tenter de fermer la page
            setTimeout(() => {
                window.close();
            }, 500);
        }, 3000);
    }

    updateLanguage(lang) {
        document.documentElement.lang = lang;
        const t = this.translations[lang] || this.translations.fr; // Français par défaut
        document.getElementById('app-title').textContent = t.title;
        document.getElementById('loading-text').textContent = t.loading;
        document.getElementById('prediction-loading-text').textContent = t.predicting;
        document.getElementById('predict-button-text').textContent = t.predict;
        document.getElementById('reset-button-text').textContent = t.reset;
        document.getElementById('return-button-text').textContent = t.back;
        document.getElementById('alertBox').textContent = t.alertLimit;
    }

    init() {
        // Fonction de vibration
        function vibrateDevice() {
            if (navigator.vibrate) {
                navigator.vibrate(200); // Vibration de 200ms
            }
        }

        // Afficher contenu après chargement
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('content').classList.add('visible');
        }, 3000);

        // Ajouter une nouvelle ligne
        const addNewRow = () => {
            const rectangleContainer = document.getElementById('rectangleContainer');
            const rows = rectangleContainer.querySelectorAll('.rectangle-row');
            const predictButton = document.getElementById('predictButton');

            if (rows.length >= 5) {
                const alertBox = document.getElementById('alertBox');
                alertBox.style.display = 'block';
                predictButton.disabled = true;
                setTimeout(() => {
                    alertBox.style.display = 'none';
                }, 4000);
                return false;
            }

            const newRow = document.createElement('div');
            newRow.classList.add('rectangle-row');
            for (let i = 0; i < 4; i++) {
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
        };

        // Bouton Prédictions
        document.getElementById('predictButton').addEventListener('click', () => {
            vibrateDevice(); // Vibration avant l'action
            
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

                // Ne pas ajouter d'image si la limite est atteinte
                if (rows.length >= 6) {
                    const alertBox = document.getElementById('alertBox');
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
                    image.src = "imogs/bol.png";
                    image.alt = "Prediction Image";

                    let img = randomRectangle.querySelector('img');
                    if (!img) {
                        randomRectangle.appendChild(image);
                        img = image;
                    }
                    img.style.display = 'block';

                    addNewRow();
                }
                predictButton.disabled = rows.length >= 5;
            }, 1500);
        });

        // Bouton Réinitialiser
        document.getElementById('resetButton').addEventListener('click', () => {
            vibrateDevice(); // Vibration avant l'action
            
            const rectangleContainer = document.getElementById('rectangleContainer');
            const predictButton = document.getElementById('predictButton');
            rectangleContainer.innerHTML = `
                <div class="rectangle-row">
                    <div class="rectangle" id="rectangle1"></div>
                    <div class="rectangle" id="rectangle2"></div>
                    <div class="rectangle" id="rectangle3"></div>
                    <div class="rectangle" id="rectangle4"></div>
                    <span class="row-number">1</span>
                </div>
            `;
            predictButton.disabled = false;
        });

        // Bouton Retour
        document.getElementById('returnButton').addEventListener('click', () => {
            vibrateDevice(); // Vibration avant l'action
            
            // Retour à la page précédente
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Si pas d'historique, on peut rediriger vers une URL par défaut
                window.location.href = '/';
            }
        });
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new PredictorApp();
});