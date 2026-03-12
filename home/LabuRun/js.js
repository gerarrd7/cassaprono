class LabuRunPredictor {
    constructor() {
        this.language = this.getLanguageFromURL();
        this.COEFS_FACILE = [1.1, 1.2, 1.3, 1.5, 1.8, 2, 2.5, 3, 4, 5.5];
        this.COEFS_MOYEN  = [1.2, 1.5, 1.7, 2, 3, 4.5, 6];
        this.difficulty = 'facile';
        this.translations = {
            fr: {
                subtitle: "Prédiction intelligente",
                version: "Version 2.0",
                initText: "Cliquez sur\nPRÉDICTION",
                loading: "Chargement...",
                stoppedAt: "Arrêté sur",
                btnPredict: "PRÉDICTION",
                btnWaiting: "Chargement...",
                back: "\u2190 Retour",
                countdown: "Prochain signal dans",
                sec: "sec",
                facile: "FACILE",
                moyen: "MOYEN",
                noLang: "Veuillez configurer la langue dans votre bot et réessayer"
            },
            en: {
                subtitle: "Smart Prediction",
                version: "Version 2.0",
                initText: "Click\nPREDICTION",
                loading: "Loading...",
                stoppedAt: "Stopped at",
                btnPredict: "PREDICTION",
                btnWaiting: "Loading...",
                back: "\u2190 Back",
                countdown: "Next signal in",
                sec: "sec",
                facile: "EASY",
                moyen: "MEDIUM",
                noLang: "Please configure the language in your bot and try again"
            },
            ru: {
                subtitle: "\u0423\u043c\u043d\u043e\u0435 \u043f\u0440\u043e\u0433\u043d\u043e\u0437\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435",
                version: "\u0412\u0435\u0440\u0441\u0438\u044f 2.0",
                initText: "\u041d\u0430\u0436\u043c\u0438\u0442\u0435\n\u041f\u0420\u041e\u0413\u041d\u041e\u0417",
                loading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...",
                stoppedAt: "\u041e\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u043e \u043d\u0430",
                btnPredict: "\u041f\u0420\u041e\u0413\u041d\u041e\u0417",
                btnWaiting: "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...",
                back: "\u2190 \u041d\u0430\u0437\u0430\u0434",
                countdown: "\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u0441\u0438\u0433\u043d\u0430\u043b \u0447\u0435\u0440\u0435\u0437",
                sec: "\u0441",
                facile: "\u041b\u0415\u0413\u041a\u041e",
                moyen: "\u0421\u0420\u0415\u0414\u041d\u0415",
                noLang: "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u0442\u0435 \u044f\u0437\u044b\u043a \u0432 \u0432\u0430\u0448\u0435\u043c \u0431\u043e\u0442\u0435"
            },
            ar: {
                subtitle: "\u0627\u0644\u062a\u0646\u0628\u0624 \u0627\u0644\u0630\u0643\u064a",
                version: "\u0627\u0644\u0625\u0635\u062f\u0627\u0631 2.0",
                initText: "\u0627\u0646\u0642\u0631 \u0639\u0644\u0649\n\u062a\u0646\u0628\u0624",
                loading: "\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644...",
                stoppedAt: "\u062a\u0648\u0642\u0641 \u0639\u0646\u062f",
                btnPredict: "\u062a\u0646\u0628\u0624",
                btnWaiting: "\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644...",
                back: "\u0631\u062c\u0648\u0639 \u2190",
                countdown: "\u0627\u0644\u0625\u0634\u0627\u0631\u0629 \u0627\u0644\u062a\u0627\u0644\u064a\u0629 \u062e\u0644\u0627\u0644",
                sec: "\u062b",
                facile: "\u0633\u0647\u0644",
                moyen: "\u0645\u062a\u0648\u0633\u0637",
                noLang: "\u064a\u0631\u062c\u0649 \u062a\u0643\u0648\u064a\u0646 \u0627\u0644\u0644\u063a\u0629 \u0641\u064a \u0627\u0644\u0628\u0648\u062a"
            }
        };

        if (!this.language) { this.handleNoLanguage(); return; }

        this.printSignal       = document.getElementById('print-signal');
        this.stopBlock         = document.getElementById('stop-block');
        this.stopTimer         = document.getElementById('stop-timer');
        this.stopProgress      = document.getElementById('stop-progress');
        this.getSignalBtn      = document.getElementById('get-signal');
        this.optFacile         = document.getElementById('opt-facile');
        this.optMoyen          = document.getElementById('opt-moyen');
        this.backBtn           = document.getElementById('back-btn');
        this.countdownInterval = null;
        this.COOLDOWN          = 25;

        this.applyTranslations();
        this.initEvents();
        this.restoreState();
        if (!this.countdownInterval && !PredictionManager.canPredict()) PredictionManager.showCooldownOnButton(this.getSignalBtn, this.t().btnPredict);
        document.body.style.opacity    = '0';
        document.body.style.transition = 'opacity 0.8s ease';
        setTimeout(function() { document.body.style.opacity = '1'; }, 150);
    }

    t() { return this.translations[this.language] || this.translations.fr; }
    getLanguageFromURL() { return new URLSearchParams(window.location.search).get('lang'); }

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
        var logoEl     = document.getElementById('logo');
        var subtitleEl = document.getElementById('subtitle');
        var versionEl  = document.getElementById('version');
        var initEl     = document.getElementById('init-text');
        if (logoEl)     logoEl.textContent     = 'Labu Run';
        if (subtitleEl) subtitleEl.textContent = t.subtitle;
        if (versionEl)  versionEl.textContent  = t.version;
        if (initEl)     initEl.textContent      = t.initText;
        this.getSignalBtn.textContent = t.btnPredict;
        this.optFacile.textContent    = t.facile;
        this.optMoyen.textContent     = t.moyen;
        this.backBtn.textContent      = t.back;
    }

    initEvents() {
        var self = this;
        this.optFacile.addEventListener('click', function() { self.setDifficulty('facile'); });
        this.optMoyen.addEventListener('click', function() { self.setDifficulty('moyen'); });
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

    setDifficulty(diff) {
        this.difficulty = diff;
        this.optFacile.classList.toggle('active', diff === 'facile');
        this.optMoyen.classList.toggle('active', diff === 'moyen');
    }

    pickCoefficient() {
        var list = this.difficulty === 'moyen' ? this.COEFS_MOYEN : this.COEFS_FACILE;
        return list[Math.floor(Math.random() * list.length)];
    }

    onSignalClick() {
        if (!PredictionManager.canPredict()) { PredictionManager.showCooldownOnButton(this.getSignalBtn, this.t().btnPredict); return; }
        var t    = this.t();
        var self = this;
        var diffLabel = this.difficulty === 'moyen' ? t.moyen : t.facile;
        this.getSignalBtn.disabled    = true;
        this.getSignalBtn.textContent = t.btnWaiting;
        this.printSignal.innerHTML = '<span class="loading-text">' + t.loading + '</span>';
        setTimeout(function() {
            PredictionManager.recordPrediction();
            var signal = self.pickCoefficient();
            self.printSignal.innerHTML =
                '<div class="signal-label">' + diffLabel + ' \u2022 ' + t.stoppedAt + '</div>' +
                '<div class="signal-value">' + signal + 'x</div>';
            GameStateManager.save('laburun', { coefficient: signal, difficulty: self.difficulty, countdownEnd: Date.now() + self.COOLDOWN * 1000 });
            self.startCooldown(self.COOLDOWN);
        }, 5000);
    }

    restoreState() {
        var saved = GameStateManager.load('laburun');
        if (!saved) return;
        var t = this.t();
        var now = Date.now();
        if (saved.difficulty) this.setDifficulty(saved.difficulty);
        var diffLabel = saved.difficulty === 'moyen' ? t.moyen : t.facile;
        if (saved.countdownEnd && saved.countdownEnd > now) {
            this.printSignal.innerHTML =
                '<div class="signal-label">' + diffLabel + ' \u2022 ' + t.stoppedAt + '</div>' +
                '<div class="signal-value">' + saved.coefficient + 'x</div>';
            var remaining = Math.ceil((saved.countdownEnd - now) / 1000);
            this.startCooldown(remaining);
        } else if (saved.coefficient) {
            this.printSignal.innerHTML =
                '<div class="signal-label">' + diffLabel + ' \u2022 ' + t.stoppedAt + '</div>' +
                '<div class="signal-value">' + saved.coefficient + 'x</div>';
        }
    }

    startCooldown(seconds) {
        var self      = this;
        var t         = this.t();
        var remaining = seconds;
        this.stopBlock.classList.remove('deactivate');
        this.stopProgress.style.backgroundSize = '0% 100%';
        this.stopTimer.textContent = t.countdown + ' ' + remaining + ' ' + t.sec;
        this.getSignalBtn.disabled = true;
        this.countdownInterval = setInterval(function() {
            remaining--;
            self.stopTimer.textContent = t.countdown + ' ' + remaining + ' ' + t.sec;
            var pct = ((seconds - remaining) / seconds) * 100;
            self.stopProgress.style.backgroundSize = pct + '% 100%';
            if (remaining <= 0) {
                clearInterval(self.countdownInterval);
                self.stopBlock.classList.add('deactivate');
                if (!PredictionManager.canPredict()) {
                    PredictionManager.showCooldownOnButton(self.getSignalBtn, t.btnPredict);
                } else {
                    self.getSignalBtn.disabled    = false;
                    self.getSignalBtn.textContent = t.btnPredict;
                }
            }
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', function() { new LabuRunPredictor(); });
