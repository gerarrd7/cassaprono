class GemsMines {
    constructor() {
        this.language = this.getLanguageFromURL();
        this.translations = {
            fr: {
                title: "Gems Mines",
                subtitle: "Prédicteur de mines professionnel",
                predictions: "Prédictions",
                reset: "Réinitialiser",
                back: "Retour",
                trapCount: pièges => `${pièges} piège${pièges > 1 ? 's' : ''}`,
                loadingText: "Chargement de Gems Mines...",
                noLang: "Veuillez configurer la langue dans votre bot et réessayer"
            },
            en: {
                title: "Gems Mines",
                subtitle: "Professional Mine Predictor",
                predictions: "Predictions",
                reset: "Reset",
                back: "Back",
                trapCount: traps => `${traps} trap${traps > 1 ? 's' : ''}`,
                loadingText: "Loading Gems Mines...",
                noLang: "Please configure the language in your bot and try again"
            },
            ru: {
                title: "Gems Mines",
                subtitle: "Профессиональный предсказатель мин",
                predictions: "Прогнозы",
                reset: "Сбросить",
                back: "Назад",
                trapCount: traps => `${traps} ловуш${traps > 1 ? 'ки' : 'ка'}`,
                loadingText: "Загрузка Gems Mines...",
                noLang: "Пожалуйста, настройте язык в вашем боте и попробуйте снова"
            },
            ar: {
                title: "Gems Mines",
                subtitle: "متنبئ الألغام الاحترافي",
                predictions: "التوقعات",
                reset: "إعادة تعيين",
                back: "رجوع",
                trapCount: traps => `${traps} فخ${traps > 1 ? 'وخ' : ''}`,
                loadingText: "جارٍ تحميل Gems Mines...",
                noLang: "يرجى تكوين اللغة في البوت الخاص بك وإعادة المحاولة"
            }
        };

        // Vérifier la langue
        if (!this.language) {
            this.handleNoLanguage();
            return;
        }

        this.trapImage = "https://i.ibb.co/nqMShQQL/20250512-220505.jpg";
        this.initializeElements();
        this.count = 2;
        this.isPredicting = false;
        this.initializeGrid();
        this.bindEvents();
        this.updateLanguage(this.language);
        this.updateDisplay();
        this.handlePreloader();
        if (!PredictionManager.canPredict()) PredictionManager.showCooldownOnButton(document.getElementById('predictBtn'), '🔮 ' + (this.translations[this.language] || this.translations.fr).predictions);
    }
    
    getLanguageFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang');
    }

    handleNoLanguage() {
        document.body.innerHTML = `
            <div class="preloader" id="preloader" style="opacity: 1; visibility: visible;">
                <div class="loader"></div>
                <div class="loading-text">${this.translations.fr.noLang}</div>
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
        document.getElementById('page-title').textContent = `${t.title} - Professional Edition`;
        document.getElementById('title').textContent = t.title;
        document.getElementById('subtitle').textContent = t.subtitle;
        document.getElementById('predictBtn').innerHTML = `🔮 ${t.predictions}`;
        document.getElementById('resetBtn').innerHTML = `↻ ${t.reset}`;
        document.getElementById('backButton').innerHTML = `
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            ${t.back}
        `;
        document.getElementById('loadingText').textContent = t.loadingText;
        this.updateDisplay();
    }

    initializeElements() {
        this.grid = document.getElementById("gameGrid");
        this.countDisplay = document.getElementById("trapCount");
        this.predictBtn = document.getElementById("predictBtn");
        this.resetBtn = document.getElementById("resetBtn");
        this.increaseBtn = document.getElementById("increase");
        this.decreaseBtn = document.getElementById("decrease");
        this.preloader = document.getElementById("preloader");
        this.mainContainer = document.getElementById("mainContainer");
        this.backButton = document.getElementById("backButton");
    }

    initializeGrid() {
        this.grid.innerHTML = ''; // Clear existing grid
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            this.grid.appendChild(cell);
        }
        this.cells = document.querySelectorAll('.cell');
    }

    bindEvents() {
        this.increaseBtn.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(100);
            this.adjustCount(1);
        });
        this.decreaseBtn.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(100);
            this.adjustCount(-1);
        });
        this.predictBtn.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
            this.predict();
        });
        this.resetBtn.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(200);
            this.reset();
        });
        this.backButton.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(200);
            this.handleBack();
        });
    }

    handlePreloader() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.preloader.classList.add('hidden');
                setTimeout(() => {
                    this.mainContainer.classList.add('visible');
                }, 200);
            }, 2000);
        });
    }

    adjustCount(delta) {
        const newCount = this.count + delta;
        if (newCount >= 2 && newCount <= 9) {
            this.count = newCount;
            this.updateDisplay();
        }
    }

    updateDisplay() {
        const t = this.translations[this.language] || this.translations.fr;
        this.countDisplay.textContent = t.trapCount(this.count);
        this.increaseBtn.disabled = this.count >= 9;
        this.decreaseBtn.disabled = this.count <= 2;
    }

    toggleButtons(disabled) {
        [this.predictBtn, this.resetBtn, this.increaseBtn, this.decreaseBtn].forEach(btn => {
            btn.disabled = disabled;
        });
    }

    getTrapRange(count) {
        const ranges = {
            2: [6, 10], 3: [5, 9], 4: [5, 8], 5: [4, 7],
            6: [3, 6], 7: [3, 5], 8: [2, 4], 9: [2, 3]
        };
        return ranges[count] || [2, 2];
    }

    async predict() {
        if (this.isPredicting) return;
        if (!GrilleDemandManager.recordStep()) {
            if (!PredictionManager.canPredict()) {
                var t = this.translations[this.language] || this.translations.fr;
                PredictionManager.showCooldownOnButton(this.predictBtn, '🔮 ' + t.predictions);
            }
            return;
        }

        this.isPredicting = true;
        this.toggleButtons(true);
        this.predictBtn.classList.add('loading');
        this.addVisualFeedback(this.predictBtn, 'predict');

        // Clear previous predictions
        this.cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('animate');
        });

        await new Promise(resolve => setTimeout(resolve, 800));

        const trapRange = this.getTrapRange(this.count);
        const trapCount = Math.floor(Math.random() * (trapRange[1] - trapRange[0] + 1)) + trapRange[0];

        const indexes = [];
        while (indexes.length < trapCount) {
            const rand = Math.floor(Math.random() * this.cells.length);
            if (!indexes.includes(rand)) {
                indexes.push(rand);
            }
        }

        for (let i = 0; i < indexes.length; i++) {
            setTimeout(() => {
                const cell = this.cells[indexes[i]];
                cell.classList.add('animate');
                if (navigator.vibrate) navigator.vibrate(80);

                setTimeout(() => {
                    const img = document.createElement('img');
                    img.src = this.trapImage;
                    img.alt = "Piège détecté";
                    img.loading = "lazy";
                    cell.appendChild(img);
                }, 300);

                if (i === indexes.length - 1) {
                    setTimeout(() => {
                        this.isPredicting = false;
                        this.toggleButtons(false);
                        this.predictBtn.classList.remove('loading');
                        this.updateDisplay();
                        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
                    }, 600);
                }
            }, i * 200);
        }
    }

    async reset() {
        if (this.isPredicting) return;

        this.count = 2;
        this.updateDisplay();

        this.cells.forEach((cell, i) => {
            setTimeout(() => {
                cell.classList.add('animate');
                cell.innerHTML = '';
                setTimeout(() => {
                    cell.classList.remove('animate');
                }, 400);
            }, i * 30);
        });
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

    addVisualFeedback(element, type = 'success') {
        if (type === 'predict') {
            element.classList.add('vibrating');
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
            setTimeout(() => {
                element.classList.remove('vibrating');
            }, 500);
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new GemsMines();
});
