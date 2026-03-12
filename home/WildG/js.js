class PredictorApp {
    constructor() {
        this.language = this.getLanguageFromURL();
        this.translations = {
            fr: {
                title: "Interface de Prédiction Professionnelle",
                loading: "Chargement...",
                predicting: "Prédiction en cours...",
                threeCases: "3 cases",
                twoCases: "2 cases",
                predict: "Prédictions",
                reset: "Réinitialiser",
                back: "Retour",
                alertLimit: "Limite atteinte ! Cliquez sur Réinitialiser",
                alertRisk: "Veuillez ne pas risquer trop pour éviter de perdre",
                notRecommended: "Non recommandé",
                noLang: "Veuillez configurer la langue dans votre bot et réessayer"
            },
            en: {
                title: "Professional Prediction Interface",
                loading: "Loading...",
                predicting: "Predicting...",
                threeCases: "3 boxes",
                twoCases: "2 boxes",
                predict: "Predictions",
                reset: "Reset",
                back: "Back",
                alertLimit: "Limit reached! Click Reset",
                alertRisk: "Please do not risk too much to avoid losing",
                alertStop: "To avoid risks, please stop here or collect your money and reset.",
                notRecommended: "Not recommended",
                noLang: "Please configure the language in your bot and try again"
            },
            ru: {
                title: "Профессиональный интерфейс предсказания",
                loading: "Загрузка...",
                predicting: "Идет предсказание...",
                threeCases: "3 ячейки",
                twoCases: "2 ячейки",
                predict: "Предсказания",
                reset: "Сбросить",
                back: "Назад",
                alertLimit: "Достигнут предел! Нажмите Сбросить",
                alertRisk: "Пожалуйста, не рискуйте слишком много, чтобы избежать потерь",
                alertStop: "Чтобы избежать рисков, остановитесь здесь или заберите деньги и сбросьте.",
                notRecommended: "Не рекомендуется",
                noLang: "Пожалуйста, настройте язык в вашем боте и попробуйте снова"
            },
            ar: {
                title: "واجهة التنبؤ الاحترافية",
                loading: "جارٍ التحميل...",
                predicting: "جارٍ التنبؤ...",
                threeCases: "3 مربعات",
                twoCases: "2 مربع",
                predict: "التنبؤات",
                reset: "إعادة تعيين",
                back: "رجوع",
                alertLimit: "تم الوصول إلى الحد! انقر على إعادة تعيين",
                alertRisk: "من فضلك، لا تعرض الكثير للخطر لتجنب الخسارة",
                alertStop: "لتجنب المخاطر، توقف هنا أو اجمع المال وأعد التشغيل.",
                notRecommended: "غير موصى به",
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
        if (!PredictionManager.canPredict()) PredictionManager.showCooldownOnButton(document.getElementById('predictButton'), (this.translations[this.language] || this.translations.fr).predict, document.getElementById('predict-button-text'));
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
        document.getElementById('threeCasesButton').textContent = t.threeCases;
        document.getElementById('twoCasesButton').textContent = t.twoCases;
        document.getElementById('notRecommendedText').textContent = t.notRecommended;
        document.getElementById('predict-button-text').textContent = t.predict;
        document.getElementById('reset-button-text').textContent = t.reset;
        document.getElementById('back-button-text').textContent = t.back;
    }

    init() {
        // Détection iPhone/iPad
        function isIOS() {
            return /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) && 
                   (navigator.maxTouchPoints > 0 || /Macintosh/.test(navigator.userAgent));
        }

        // Appliquer styles iOS
        if (isIOS()) {
            document.querySelectorAll('.rectangle').forEach(rectangle => rectangle.classList.add('rectangle--ios'));
            document.querySelector('.logo').classList.add('logo--ios');
        }

        // Liste des coefficients (en ordre croissant)
        const coefficientsTwoCases = [
            "x2", "x4", "x8", "x16", "x32",
            "x64", "x128", "x256", "x512", "x1024"
        ];
        const coefficientsThreeCases = [
            "x3", "x9", "x27", "x81", "x243",
            "x729", "x2187", "x6561", "x19683", "x59049"
        ];

        // Afficher contenu après chargement
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('content').classList.add('visible');
        }, 3000);

        // Animation des particules
        let particleCount = 0;
        const maxParticles = 15;

        function createParticle() {
            if (particleCount >= maxParticles) return;
            
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const startX = Math.random() * 80 + 10;
            particle.style.left = `${startX}vw`;
            
            const size = Math.random() * 0.3 + 0.2;
            particle.style.width = `${size}vmin`;
            particle.style.height = `${size}vmin`;
            
            const duration = 5 + Math.random() * 3;
            const delay = Math.random() * 2;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            const direction = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10);
            particle.style.setProperty('--direction', direction);
            
            document.body.appendChild(particle);
            particleCount++;
            
            setTimeout(() => {
                particle.remove();
                particleCount--;
            }, (duration + delay) * 1000);
        }

        setInterval(() => {
            if (Math.random() > 0.5) {
                createParticle();
            }
        }, 2000);

        // Gestion du nombre de cases
        let numRectangles = 2;
        let currentCoefficients = coefficientsTwoCases;
        // Pondération: 50% = 1, 30% = 2, 20% = 3
        const rand1 = Math.random();
        let maxPredictions = rand1 < 0.5 ? 1 : (rand1 < 0.8 ? 2 : 3);
        let predictionCount = 0;

        const updateRectangleCount = (count) => {
            numRectangles = count;
            currentCoefficients = count === 2 ? coefficientsTwoCases : coefficientsThreeCases;
            const threeCasesButton = document.getElementById('threeCasesButton');
            const twoCasesButton = document.getElementById('twoCasesButton');
            threeCasesButton.classList.toggle('active', count === 3);
            twoCasesButton.classList.toggle('active', count === 2);
            resetGame();
        };

        document.getElementById('threeCasesButton').addEventListener('click', () => {
            updateRectangleCount(3);
        });

        document.getElementById('twoCasesButton').addEventListener('click', () => {
            updateRectangleCount(2);
        });

        // Vérifier si le coefficient dépasse la limite
        const checkCoefficientLimit = (rows) => {
            const alertBox = document.getElementById('alertBox');
            const threshold = numRectangles === 2 ? coefficientsTwoCases.indexOf('x8') : coefficientsThreeCases.indexOf('x9');
            
            if (rows.length > threshold) {
                alertBox.textContent = this.translations[this.language].alertRisk;
                alertBox.style.display = 'block';
            } else {
                alertBox.style.display = 'none';
            }
        };

        // Ajouter une nouvelle ligne
        const addNewRow = () => {
            const rectangleContainer = document.getElementById('rectangleContainer');
            const rows = rectangleContainer.querySelectorAll('.rectangle-row');
            const predictButton = document.getElementById('predictButton');

            if (rows.length >= 10) {
                const alertBox = document.getElementById('alertBox');
                alertBox.textContent = this.translations[this.language].alertLimit;
                alertBox.style.display = 'block';
                predictButton.disabled = true;
                setTimeout(() => {
                    alertBox.style.display = 'none';
                }, 4000);
                return false;
            }

            const newRow = document.createElement('div');
            newRow.classList.add('rectangle-row');
            for (let i = 0; i < numRectangles; i++) {
                const newRectangle = document.createElement('div');
                newRectangle.classList.add('rectangle');
                if (isIOS()) newRectangle.classList.add('rectangle--ios');
                newRow.appendChild(newRectangle);
            }

            const rowNumber = document.createElement('span');
            rowNumber.classList.add('row-number');
            rowNumber.textContent = currentCoefficients[rows.length];
            newRow.appendChild(rowNumber);

            rectangleContainer.prepend(newRow); // Ajouter en haut pour que les lignes montent
            checkCoefficientLimit(rows.length + 1);
            return true;
        };

        // Bouton Prédictions
        document.getElementById('predictButton').addEventListener('click', () => {
            const predictButton = document.getElementById('predictButton');
            const loading = document.getElementById('prediction-loading');
            if (predictButton.disabled) return;

            // Vérifier la limite de prédictions
            if (predictionCount >= maxPredictions) {
                const alertBox = document.getElementById('alertBox');
                alertBox.textContent = this.translations[this.language].alertStop || 'Pour éviter les risques, veuillez vous arrêter ici ou ramasser l\'argent et réinitialiser.';
                alertBox.style.display = 'block';
                predictButton.disabled = true;
                return;
            }

            if (!PredictionManager.canPredict()) { PredictionManager.showCooldownOnButton(predictButton, this.translations[this.language].predict || 'Prédictions', document.getElementById('predict-button-text')); return; }
            PredictionManager.recordPrediction();

            predictButton.disabled = true;
            loading.style.display = 'flex';

            setTimeout(() => {
                loading.style.display = 'none';
                const rectangleContainer = document.getElementById('rectangleContainer');
                const rows = rectangleContainer.querySelectorAll('.rectangle-row');
                const currentRow = rectangleContainer.firstElementChild;

                if (rows.length >= 11) {
                    const alertBox = document.getElementById('alertBox');
                    alertBox.textContent = this.translations[this.language].alertLimit;
                    alertBox.style.display = 'block';
                    predictButton.disabled = true;
                    setTimeout(() => {
                        alertBox.style.display = 'none';
                    }, 4000);
                } else if (currentRow) {
                    const rectangles = currentRow.querySelectorAll('.rectangle');
                    const imageCount = numRectangles === 2 ? 1 : 2;
                    const indices = [];
                    while (indices.length < imageCount) {
                        const randomIndex = Math.floor(Math.random() * rectangles.length);
                        if (!indices.includes(randomIndex)) indices.push(randomIndex);
                    }

                    indices.forEach(index => {
                        const randomRectangle = rectangles[index];
                        const image = document.createElement('img');
                        image.src = "imog/or gain.jpg";
                        image.alt = "Prediction Image";

                        let img = randomRectangle.querySelector('img');
                        if (!img) {
                            randomRectangle.appendChild(image);
                            img = image;
                        }
                        img.style.display = 'block';
                    });

                    predictionCount++;

                    // Si limite atteinte, griser les bandes restantes
                    if (predictionCount >= maxPredictions) {
                        addNewRow();
                        const topRow = rectangleContainer.firstElementChild;
                        if (topRow) {
                            topRow.querySelectorAll('.rectangle').forEach(rect => {
                                rect.style.background = '#555';
                                rect.style.opacity = '0.4';
                            });
                        }
                        const alertBox = document.getElementById('alertBox');
                        alertBox.textContent = this.translations[this.language].alertStop || 'Pour éviter les risques, veuillez vous arrêter ici ou ramasser l\'argent et réinitialiser.';
                        alertBox.style.display = 'block';
                        predictButton.disabled = true;
                    } else {
                        addNewRow();
                        predictButton.disabled = rows.length >= 10;
                    }
                }
            }, 1500);
        });

        // Bouton Réinitialiser
        const resetGame = () => {
            const rectangleContainer = document.getElementById('rectangleContainer');
            const predictButton = document.getElementById('predictButton');
            predictionCount = 0;
            // Pondération: 50% = 1, 30% = 2, 20% = 3
            const rand2 = Math.random();
            maxPredictions = rand2 < 0.5 ? 1 : (rand2 < 0.8 ? 2 : 3);
            let initialRow = `
                <div class="rectangle-row">
            `;
            for (let i = 1; i <= numRectangles; i++) {
                initialRow += `<div class="rectangle ${isIOS() ? 'rectangle--ios' : ''}" id="rectangle${i}"></div>`;
            }
            initialRow += `
                <span class="row-number">${currentCoefficients[0]}</span>
                </div>
            `;
            rectangleContainer.innerHTML = initialRow;
            predictButton.disabled = false;
            const alertBox = document.getElementById('alertBox');
            alertBox.style.display = 'none';
        };

        document.getElementById('resetButton').addEventListener('click', () => {
            resetGame();
        });

        // Bouton Retour
        document.getElementById('backButton').addEventListener('click', () => {
            window.history.back();
        });
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new PredictorApp();
});