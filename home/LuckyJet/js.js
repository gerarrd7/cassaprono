class LuckyJetPredictor {
    constructor() {
        this.language = this.getLanguageFromURL();
        this.translations = {
            fr: {
                title: "Lucky Jet Predictor",
                subtitle: "Système de prédiction intelligent",
                version: "Version 3.0 Elite",
                multiplier: "Multiplicateur",
                launchPrediction: "Lancer Prédiction",
                back: "Retour",
                readyStatus: "Système Lucky Jet prêt",
                analyzingStatus: "Analyse des patterns Lucky Jet...",
                predictionStatus: "Signal Lucky Jet",
                backStatus: "Retour en cours...",
                noLang: "Veuillez configurer la langue dans votre bot et réessayer",
                analyzing: "Analyse"
            },
            en: {
                title: "Lucky Jet Predictor",
                subtitle: "Intelligent Prediction System",
                version: "Version 3.0 Elite",
                multiplier: "Multiplier",
                launchPrediction: "Launch Prediction",
                back: "Back",
                readyStatus: "Lucky Jet System Ready",
                analyzingStatus: "Analyzing Lucky Jet patterns...",
                predictionStatus: "Lucky Jet Signal",
                backStatus: "Returning...",
                noLang: "Please configure the language in your bot and try again",
                analyzing: "Analyzing"
            },
            ru: {
                title: "Lucky Jet Predictor",
                subtitle: "Интеллектуальная система прогнозирования",
                version: "Версия 3.0 Элит",
                multiplier: "Множитель",
                launchPrediction: "Запустить прогноз",
                back: "Назад",
                readyStatus: "Система Lucky Jet готова",
                analyzingStatus: "Анализ шаблонов Lucky Jet...",
                predictionStatus: "Сигнал Lucky Jet",
                backStatus: "Возврат...",
                noLang: "Пожалуйста, настройте язык в вашем боте и попробуйте снова",
                analyzing: "Анализ"
            },
            ar: {
                title: "Lucky Jet Predictor",
                subtitle: "نظام التنبؤ الذكي",
                version: "الإصدار 3.0 النخبة",
                multiplier: "المضاعف",
                launchPrediction: "إطلاق التنبؤ",
                back: "رجوع",
                readyStatus: "نظام Lucky Jet جاهز",
                analyzingStatus: "تحليل أنماط Lucky Jet...",
                predictionStatus: "إشارة Lucky Jet",
                backStatus: "العودة جارية...",
                noLang: "يرجى تكوين اللغة في البوت الخاص بك وإعادة المحاولة",
                analyzing: "تحليل"
            }
        };

        // Vérifier la langue
        if (!this.language) {
            this.handleNoLanguage();
            return;
        }

        this.predictionCircle = document.getElementById('prediction-circle');
        this.predictionValue = document.getElementById('prediction-value');
        this.generateBtn = document.getElementById('generate-btn');
        this.backBtn = document.getElementById('back-btn');
        this.btnText = document.getElementById('btn-text');
        this.statusBar = document.getElementById('status-bar');

        this.isGenerating = false;
        this.timeOffset = 0;

        this.updateLanguage(this.language);
        this.initializeEventListeners();
        this.showStatus(this.translations[this.language].readyStatus, 2500);

        // Animation d'entrée cosmique
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(30px) scale(0.95)';
        document.body.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0) scale(1)';
        }, 150);
    }

    getLanguageFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang');
    }

    handleNoLanguage() {
        document.body.innerHTML = `
            <div class="status-bar show" id="status-bar">${this.translations.fr.noLang}</div>
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
        document.getElementById('logo').textContent = t.title;
        document.getElementById('subtitle').textContent = t.subtitle;
        document.getElementById('version').textContent = t.version;
        document.getElementById('prediction-label').textContent = t.multiplier;
        document.getElementById('btn-text').textContent = `🚀 ${t.launchPrediction}`;
        document.getElementById('back-btn').textContent = `← ${t.back}`;
    }

    initializeEventListeners() {
        this.generateBtn.addEventListener('click', () => {
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
            this.generateSignal();
        });

        this.backBtn.addEventListener('click', () => {
            if (navigator.vibrate) {
                navigator.vibrate(150);
            }
            this.goBack();
        });
    }

    async generateSignal() {
        if (this.isGenerating) return;

        const t = this.translations[this.language] || this.translations.fr;
        this.isGenerating = true;
        this.setLoadingState(true);
        this.showStatus(t.analyzingStatus);

        await this.simulateAdvancedAnalysis();

        const coefficient = this.calculateLuckyJetCoefficient();
        this.displayResult(coefficient);

        this.timeOffset += 1; // Changed to 1 minute interval
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + this.timeOffset);
        const formattedTime = currentTime.toLocaleTimeString(this.language || 'fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        this.setLoadingState(false);
        this.isGenerating = false;
        this.showStatus(`${t.predictionStatus}: ${coefficient}x ${t.predictionStatus.toLowerCase().includes('signal') ? 'predicted at' : 'prévu à'} ${formattedTime}`, 4000);
    }

    async simulateAdvancedAnalysis() {
        const t = this.translations[this.language] || this.translations.fr;
        const stages = [
            { text: t.analyzing.substring(0, 4), duration: 500 },
            { text: t.analyzing.substring(0, 5), duration: 700 },
            { text: t.analyzing.substring(0, 6), duration: 600 },
            { text: t.analyzing.substring(0, 5), duration: 500 }
        ];

        for (let stage of stages) {
            this.predictionValue.innerHTML = `
                ${stage.text}
                <div class="loading-dots" style="margin-top: 10px;">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            await this.delay(stage.duration);
        }
    }

    calculateLuckyJetCoefficient() {
        const random = Math.random();
        let coefficient;

        if (random < 0.65) {
            // Low multipliers (1.00x - 2.50x) - 65%
            coefficient = 1.00 + Math.random() * 1.50;
        } else if (random < 0.85) {
            // Medium multipliers (2.50x - 5.00x) - 20%
            coefficient = 2.50 + Math.random() * 2.50;
        } else if (random < 0.95) {
            // High multipliers (5.00x - 15.00x) - 10%
            coefficient = 5.00 + Math.random() * 10.00;
        } else if (random < 0.99) {
            // Very high multipliers (15.00x - 50.00x) - 4%
            coefficient = 15.00 + Math.random() * 35.00;
        } else {
            // Mega multipliers (50.00x - 200.00x) - 1%
            coefficient = 50.00 + Math.random() * 150.00;
        }

        return coefficient.toFixed(2);
    }

    displayResult(coefficient) {
        this.predictionValue.textContent = `${coefficient}x`;
        this.predictionValue.style.transform = 'scale(1.15)';
        this.predictionValue.style.filter = 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.8))';

        if (parseFloat(coefficient) > 10) {
            this.celebrateHighMultiplier();
        }

        setTimeout(() => {
            this.predictionValue.style.transform = 'scale(1)';
            this.predictionValue.style.filter = 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.3))';
        }, 400);
    }

    celebrateHighMultiplier() {
        const sparkles = ['✨', '💫', '⭐', '🌟'];
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                this.createSparkle(sparkles[Math.floor(Math.random() * sparkles.length)]);
            }, i * 100);
        }
    }

    createSparkle(emoji) {
        const sparkle = document.createElement('div');
        sparkle.textContent = emoji;
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '2rem';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';

        this.predictionCircle.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }

    setLoadingState(loading) {
        const t = this.translations[this.language] || this.translations.fr;
        if (loading) {
            this.predictionCircle.classList.add('loading');
            this.generateBtn.disabled = true;
            this.btnText.innerHTML = `
                🛸 ${t.analyzing}
                <div class="loading-dots" style="margin-left: 8px">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
        } else {
            this.predictionCircle.classList.remove('loading');
            this.generateBtn.disabled = false;
            this.btnText.textContent = `🚀 ${t.launchPrediction}`;
        }
    }

    showStatus(message, duration = 0) {
        this.statusBar.textContent = message;
        this.statusBar.classList.add('show');

        if (duration > 0) {
            setTimeout(() => {
                this.statusBar.classList.remove('show');
            }, duration);
        }
    }

    goBack() {
        const t = this.translations[this.language] || this.translations.fr;
        this.showStatus(t.backStatus, 1200);
        setTimeout(() => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "https://t.me/PREDBOX2ROBOT?start=user22476018";
                setTimeout(() => {
                    window.close();
                }, 500);
            }
        }, 600);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// CSS pour l'animation des étincelles
const sparkleCSS = `
    @keyframes sparkleFloat {
        0% {
            opacity: 0;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0);
        }
    }
`;

const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    new LuckyJetPredictor();
});
