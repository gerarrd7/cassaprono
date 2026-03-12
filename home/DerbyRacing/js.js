class DerbyRacingPredictor {
    constructor() {
        this.language = this.getLanguageFromURL();
        this.translations = {
            fr: {
                subtitle: "Prédiction de course",
                version: "Version 1.0",
                initText: "Cliquez sur\nPRÉDICTION",
                loading: "Analyse de la course...",
                resultLabel: "Choisissez le cheval",
                btnSignal: "PRÉDICTION",
                btnWaiting: "Analyse...",
                back: "← Retour",
                countdown: "Prochaine prédiction dans",
                sec: "sec",
                noLang: "Veuillez configurer la langue dans votre bot et réessayer",
                colors: { green: "Vert", red: "Rouge", yellow: "Jaune", blue: "Bleu" }
            },
            en: {
                subtitle: "Race prediction",
                version: "Version 1.0",
                initText: "Click\nPREDICTION",
                loading: "Analyzing the race...",
                resultLabel: "Choose the horse",
                btnSignal: "PREDICTION",
                btnWaiting: "Analyzing...",
                back: "← Back",
                countdown: "Next prediction in",
                sec: "sec",
                noLang: "Please configure the language in your bot and try again",
                colors: { green: "Green", red: "Red", yellow: "Yellow", blue: "Blue" }
            },
            ru: {
                subtitle: "Прогноз гонки",
                version: "Версия 1.0",
                initText: "Нажмите\nПРОГНОЗ",
                loading: "Анализ гонки...",
                resultLabel: "Выберите лошадь",
                btnSignal: "ПРОГНОЗ",
                btnWaiting: "Анализ...",
                back: "← Назад",
                countdown: "Следующий прогноз через",
                sec: "с",
                noLang: "Пожалуйста, настройте язык в вашем боте",
                colors: { green: "Зелёный", red: "Красный", yellow: "Жёлтый", blue: "Синий" }
            },
            ar: {
                subtitle: "توقعات السباق",
                version: "الإصدار 1.0",
                initText: "PRÉDICTION\nانقر على",
                loading: "تحليل السباق...",
                resultLabel: "اختر الحصان",
                btnSignal: "PRÉDICTION",
                btnWaiting: "تحليل...",
                back: "رجوع ←",
                countdown: "التوقع التالي خلال",
                sec: "ث",
                noLang: "يرجى تكوين اللغة في البوت",
                colors: { green: "أخضر", red: "أحمر", yellow: "أصفر", blue: "أزرق" }
            }
        };

        this.horses = [
            { key: "green",  hex: "#22c55e", emoji: "🟢" },
            { key: "red",    hex: "#ef4444", emoji: "🔴" },
            { key: "yellow", hex: "#eab308", emoji: "🟡" },
            { key: "blue",   hex: "#3b82f6", emoji: "🔵" }
        ];

        if (!this.language) { this.handleNoLanguage(); return; }

        this.printSignal  = document.getElementById('print-signal');
        this.stopBlock    = document.getElementById('stop-block');
        this.stopTimer    = document.getElementById('stop-timer');
        this.stopProgress = document.getElementById('stop-progress');
        this.getSignalBtn = document.getElementById('get-signal');
        this.backBtn      = document.getElementById('back-btn');
        this.countdownInterval = null;
        this.COOLDOWN = 50;

        this.applyTranslations();
        this.initEvents();
        this.restoreState();
        if (!this.countdownInterval && !PredictionManager.canPredict()) PredictionManager.showCooldownOnButton(this.getSignalBtn, this.t().btnSignal);
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.8s ease';
        setTimeout(function() { document.body.style.opacity = '1'; }, 150);
    }

    t() { return this.translations[this.language] || this.translations.fr; }

    getLanguageFromURL() {
        return new URLSearchParams(window.location.search).get('lang');
    }

    handleNoLanguage() {
        var msg = this.translations.fr.noLang;
        document.body.innerHTML = '<div style="color:white;text-align:center;padding:2rem;position:relative;z-index:10;">' + msg + '</div>';
        setTimeout(function() {
            window.location.href = 'https://t.me/PREDBOX2ROBOT?start=user22476018';
            setTimeout(function() { window.close(); }, 500);
        }, 3000);
    }

    applyTranslations() {
        var t = this.t();
        document.documentElement.lang = this.language;
        document.getElementById('subtitle').textContent  = t.subtitle;
        document.getElementById('version').textContent   = t.version;
        document.getElementById('init-text').textContent = t.initText;
        this.getSignalBtn.textContent = t.btnSignal;
        this.backBtn.textContent      = t.back;
    }

    initEvents() {
        var self = this;
        this.getSignalBtn.addEventListener('click', function() {
            if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
            self.onSignalClick();
        });
        this.backBtn.addEventListener('click', function() {
            if (navigator.vibrate) navigator.vibrate(100);
            if (window.history.length > 1) window.history.back();
            else {
                window.location.href = 'https://t.me/PREDBOX2ROBOT?start=user22476018';
                setTimeout(function() { window.close(); }, 500);
            }
        });
    }

    pickHorse() {
        return this.horses[Math.floor(Math.random() * this.horses.length)];
    }

    renderHorse(horse) {
        var t = this.t();
        var colorName = t.colors[horse.key];
        this.printSignal.innerHTML =
            '<div class="signal-label">' + t.resultLabel + '</div>' +
            '<div class="horse-result">' +
                '<span class="horse-emoji">' + horse.emoji + '</span>' +
                '<span class="horse-color-name" style="color:' + horse.hex + '">' + colorName + '</span>' +
            '</div>';
    }

    onSignalClick() {
        if (!DerbyDemandManager.recordStep()) {
            if (!PredictionManager.canPredict()) {
                PredictionManager.showCooldownOnButton(this.getSignalBtn, this.t().btnSignal);
            }
            return;
        }
        var t    = this.t();
        var self = this;
        this.getSignalBtn.disabled    = true;
        this.getSignalBtn.textContent = t.btnWaiting;
        this.printSignal.innerHTML = '<span class="loading-text">' + t.loading + '</span>';
        setTimeout(function() {
            var horse = self.pickHorse();
            self.renderHorse(horse);
            GameStateManager.save('derby', { horseKey: horse.key, countdownEnd: Date.now() + self.COOLDOWN * 1000 });
            self.startCooldown(self.COOLDOWN);
        }, 5000);
    }

    getHorseByKey(key) {
        for (var i = 0; i < this.horses.length; i++) {
            if (this.horses[i].key === key) return this.horses[i];
        }
        return this.horses[0];
    }

    restoreState() {
        var saved = GameStateManager.load('derby');
        if (!saved) return;
        var now = Date.now();
        if (saved.countdownEnd && saved.countdownEnd > now) {
            this.renderHorse(this.getHorseByKey(saved.horseKey));
            var remaining = Math.ceil((saved.countdownEnd - now) / 1000);
            this.startCooldown(remaining);
        } else if (saved.horseKey) {
            this.renderHorse(this.getHorseByKey(saved.horseKey));
        }
    }

    startCooldown(seconds) {
        var self      = this;
        var t         = this.t();
        var remaining = seconds;
        this.stopBlock.classList.remove('deactivate');
        this.stopProgress.style.backgroundSize = '0% 100%';
        this.stopTimer.textContent = t.countdown + ' ' + remaining + ' ' + t.sec;
        this.countdownInterval = setInterval(function() {
            remaining--;
            self.stopTimer.textContent = t.countdown + ' ' + remaining + ' ' + t.sec;
            var pct = ((seconds - remaining) / seconds) * 100;
            self.stopProgress.style.backgroundSize = pct + '% 100%';
            if (remaining <= 0) {
                clearInterval(self.countdownInterval);
                self.countdownInterval = null;
                self.stopBlock.classList.add('deactivate');
                if (!PredictionManager.canPredict()) {
                    PredictionManager.showCooldownOnButton(self.getSignalBtn, t.btnSignal);
                } else {
                    self.getSignalBtn.disabled    = false;
                    self.getSignalBtn.textContent = t.btnSignal;
                }
            }
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', function() { new DerbyRacingPredictor(); });
