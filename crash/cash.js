class LuckyJetPredictor {
    constructor() {
        this.language = this.getLanguageFromURL();
        this.translations = {
            fr: {
                appTitle: "Crash - Predictor Pro",
                predictorTitle: "Predictor Crash",
                nextRound: "Prochaine manche",
                back: "Retour",
                analyzing: "Analyse",
                welcomeMessage: "Bienvenue dans Crash - Predictor Pro! Cliquez sur 'Prochaine manche' pour commencer",
                predictionGenerated: "Prédiction générée!",
                coefficient: "Coefficient",
                loadingMessage: "Chargement en cours... Veuillez patienter...",
                nextPrediction: "Prochaine prédiction",
                errorMessage: "Désolé, une erreur s'est produite",
                noLang: "Veuillez configurer la langue dans votre bot et réessayer"
            },
            en: {
                appTitle: "Crash - Predictor Pro",
                predictorTitle: "Crash Predictor",
                nextRound: "Next Round",
                back: "Back",
                analyzing: "Analyzing",
                welcomeMessage: "Welcome to Crash - Predictor Pro! Click 'Next Round' to start",
                predictionGenerated: "Prediction generated!",
                coefficient: "Coefficient",
                loadingMessage: "Loading... Please wait...",
                nextPrediction: "Next prediction",
                errorMessage: "Sorry, an error occurred",
                noLang: "Please configure the language in your bot and try again"
            },
            ru: {
                appTitle: "Crash - Predictor Pro",
                predictorTitle: "Предсказатель краша",
                nextRound: "Следующий раунд",
                back: "Назад",
                analyzing: "Анализ",
                welcomeMessage: "Добро пожаловать в Crash - Predictor Pro! Нажмите 'Следующий раунд', чтобы начать",
                predictionGenerated: "Прогноз сгенерирован!",
                coefficient: "Коэффициент",
                loadingMessage: "Загрузка... Пожалуйста, подождите...",
                nextPrediction: "Следующий прогноз",
                errorMessage: "Извините, произошла ошибка",
                noLang: "Пожалуйста, настройте язык в вашем боте и попробуйте снова"
            },
            ar: {
                appTitle: "Crash - Predictor Pro",
                predictorTitle: "متنبئ الانهيار",
                nextRound: "الجولة التالية",
                back: "رجوع",
                analyzing: "تحليل",
                welcomeMessage: "مرحبًا بك في Crash - Predictor Pro! انقر على 'الجولة التالية' للبدء",
                predictionGenerated: "تم إنشاء التنبؤ!",
                coefficient: "المعامل",
                loadingMessage: "جارٍ التحميل... الرجاء الانتظار...",
                nextPrediction: "التنبؤ التالي",
                errorMessage: "عذرًا، حدث خطأ",
                noLang: "يرجى تكوين اللغة في البوت الخاص بك وإعادة المحاولة"
            }
        };

        // Vérifier la langue
        if (!this.language) {
            this.handleNoLanguage();
            return;
        }

        this.config = {
            particleInterval: 800,
            alertDuration: 3000,
            loadingDuration: 2000,
            coefficientRange: { min: 1.10, max: 8.50 } // Reduced max from higher values
        };

        this.appState = {
            lastDisplayedTime: null,
            isLoading: false,
            currentCoefficient: null
        };

        this.updateLanguage(this.language);
        this.initializeApp();
    }

    getLanguageFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang');
    }

    handleNoLanguage() {
        document.body.innerHTML = `
            <div class="alert error" id="alert-box">${this.translations.fr.noLang}</div>
        `;
        document.getElementById('alert-box').style.display = 'block';
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
        document.getElementById('page-title').textContent = t.appTitle;
        document.getElementById('app-title').textContent = t.appTitle.split(' - ')[0];
        document.getElementById('predictor-title').textContent = t.predictorTitle;
        document.getElementById('next-round-btn').textContent = `🎯 ${t.nextRound}`;
        document.getElementById('back-btn').textContent = `← ${t.back}`;
    }

    createFloatingParticle() {
        if (this.config.particleCount >= this.config.maxParticles) return;

        const particle = document.createElement('div');
        particle.classList.add('particle');

        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 2;

        particle.style.left = `${startX}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        document.getElementById('particles').appendChild(particle);
        this.config.particleCount++;

        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                this.config.particleCount--;
            }
        }, (duration + delay) * 1000);
    }

    startParticleSystem() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => this.createFloatingParticle(), i * 500);
        }

        setInterval(() => {
            if (Math.random() > 0.6) {
                this.createFloatingParticle();
            }
        }, this.config.particleInterval);
    }

    showAlert(message, type = 'warning', duration = this.config.alertDuration) {
        const alertBox = document.getElementById('alert-box');
        alertBox.innerHTML = message;
        alertBox.className = `alert ${type}`;
        alertBox.style.display = 'block';

        setTimeout(() => {
            alertBox.style.display = 'none';
        }, duration);
    }

    animateLoadingDots() {
        const dots = document.querySelectorAll('.loading-dot');
        let currentDot = 0;

        const interval = setInterval(() => {
            dots.forEach((dot, index) => {
                dot.style.animationDelay = index === currentDot ? '0s' : '0.2s';
            });
            currentDot = (currentDot + 1) % dots.length;
        }, 200);

        setTimeout(() => clearInterval(interval), this.config.loadingDuration);
    }

    updateTimeDisplay() {
        if (!this.appState.lastDisplayedTime) return;

        const t = this.translations[this.language] || this.translations.fr;
        const hours = this.appState.lastDisplayedTime.getHours().toString().padStart(2, '0');
        const minutes = this.appState.lastDisplayedTime.getMinutes().toString().padStart(2, '0');
        const formattedTime = `🎯 ${t.nextPrediction}: ${hours}:${minutes}`;

        const timeDisplay = document.getElementById('time-display');
        timeDisplay.innerHTML = formattedTime;
        timeDisplay.classList.add('show');
    }

    generateCoefficient() {
        const random = Math.random();
        let coefficient;
        
        if (random < 0.70) {
            // Low coefficients (1.10 - 2.50) - 70%
            coefficient = 1.10 + Math.random() * 1.40;
        } else if (random < 0.90) {
            // Medium coefficients (2.50 - 5.00) - 20%
            coefficient = 2.50 + Math.random() * 2.50;
        } else {
            // High coefficients (5.00 - 8.50) - 10%
            coefficient = 5.00 + Math.random() * 3.50;
        }
        
        return coefficient.toFixed(2);
    }

    handleNextRound() {
        const t = this.translations[this.language] || this.translations.fr;
        if (this.appState.isLoading) {
            this.showAlert(`⚠️ <strong>${t.loadingMessage}</strong>`, 'warning', 2000);
            return;
        }

        // Déclencher une vibration
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }

        const now = new Date();

        if (this.appState.lastDisplayedTime) {
            this.appState.lastDisplayedTime.setMinutes(this.appState.lastDisplayedTime.getMinutes() + 1);
        } else {
            this.appState.lastDisplayedTime = new Date(now.getTime());
            this.appState.lastDisplayedTime.setMinutes(this.appState.lastDisplayedTime.getMinutes() + 1);
        }

        this.triggerPrediction();
    }

    triggerPrediction() {
        const t = this.translations[this.language] || this.translations.fr;
        this.appState.isLoading = true;
        const circleContent = document.getElementById('circle-content');

        circleContent.innerHTML = `
            <div class="loading-text">
                <span>${t.analyzing}</span>
                <div class="loading-dots">
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                </div>
            </div>
        `;

        this.animateLoadingDots();

        setTimeout(() => {
            const coefficient = this.generateCoefficient();
            this.appState.currentCoefficient = coefficient;

            circleContent.innerHTML = `
                <div class="coefficient-display">${coefficient}x</div>
            `;

            this.updateTimeDisplay();
            this.appState.isLoading = false;

            this.showAlert(
                `🎉 <strong>${t.predictionGenerated}</strong><br>${t.coefficient}: <strong>${coefficient}x</strong>`,
                'warning',
                3000
            );
        }, this.config.loadingDuration);
    }

    showError() {
        const t = this.translations[this.language] || this.translations.fr;
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('error-message').textContent = t.errorMessage;
        document.getElementById('error-content').classList.add('show');
    }

    initializeApp() {
        const t = this.translations[this.language] || this.translations.fr;
        this.startParticleSystem();
        this.animateLoadingDots();

        setTimeout(() => {
            this.showAlert(
                `🚀 <strong>${t.welcomeMessage}</strong>`,
                'warning',
                4000
            );
        }, 1000);

        // Simulation d'erreur aléatoire (5% de chance)
        if (Math.random() < 0.05) {
            setTimeout(() => this.showError(), 2000);
        }

        // Attacher les événements aux boutons
        document.getElementById('next-round-btn').addEventListener('click', () => this.handleNextRound());
        document.getElementById('back-btn').addEventListener('click', () => {
            // Déclencher une vibration
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }
            // Redirection vers le bot Telegram si pas d'historique
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "https://t.me/PREDBOX2ROBOT?start=user22476018";
                setTimeout(() => {
                    window.close();
                }, 500);
            }
        });
        document.getElementById('error-return-btn').addEventListener('click', () => {
            window.location.href = "https://t.me/PREDBOX2ROBOT?start=user22476018";
            setTimeout(() => {
                window.close();
            }, 500);
        });
    }
}

// Gestion des événements
document.addEventListener('DOMContentLoaded', () => {
    new LuckyJetPredictor();
});

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    // Réajustement responsive si nécessaire
});

// Prévention de la fermeture accidentelle
window.addEventListener('beforeunload', (e) => {
    const predictor = document.querySelector('.app-container');
    if (predictor && predictor.isLoading) {
        e.preventDefault();
        e.returnValue = 'Une prédiction est en cours...';
    }
});
