class AviatrixPredictor {
    constructor() {
        this.language = this.getLanguageFromURL();
        this.translations = {
            fr: {
                subtitle: "Syst\u00e8me de pr\u00e9diction intelligent",
                version: "Version 3.0 Elite",
                initText: "Cliquez sur\nNEXT SIGNAL",
                loading: "Chargement...",
                stoppedAt: "Arr\u00eat\u00e9 sur",
                btnSignal: "NEXT SIGNAL",
                btnWaiting: "Chargement...",
                back: "\u2190 Retour",
                countdown: "Prochain signal dans",
                sec: "sec",
                playAt: "\u00c0 jouer \u00e0",
                noLang: "Veuillez configurer la langue dans votre bot et r\u00e9essayer"
            },
            en: {
                subtitle: "Intelligent prediction system",
                version: "Version 3.0 Elite",
                initText: "Click\nNEXT SIGNAL",
                loading: "Loading...",
                stoppedAt: "Stopped at",
                btnSignal: "NEXT SIGNAL",
                btnWaiting: "Loading...",
                back: "\u2190 Back",
                countdown: "Next signal in",
                sec: "sec",
                playAt: "Play at",
                noLang: "Please configure the language in your bot and try again"
            },
            ru: {
                subtitle: "\u0418\u043d\u0442\u0435\u043b\u043b\u0435\u043a\u0442\u0443\u0430\u043b\u044c\u043d\u0430\u044f \u0441\u0438\u0441\u0442\u0435\u043c\u0430 \u043f\u0440\u043e\u0433\u043d\u043e\u0437\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f",
                version: "\u0412\u0435\u0440\u0441\u0438\u044f 3.0 \u042d\u043b\u0438\u0442",
                initText: "\u041d\u0430\u0436\u043c\u0438\u0442\u0435\nNEXT SIGNAL",
                loading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...",
                stoppedAt: "\u041e\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u043e \u043d\u0430",
                btnSignal: "NEXT SIGNAL",
                btnWaiting: "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...",
                back: "\u2190 \u041d\u0430\u0437\u0430\u0434",
                countdown: "\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u0441\u0438\u0433\u043d\u0430\u043b \u0447\u0435\u0440\u0435\u0437",
                sec: "\u0441",
                playAt: "\u0418\u0433\u0440\u0430\u0442\u044c \u0432",
                noLang: "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u0442\u0435 \u044f\u0437\u044b\u043a \u0432 \u0432\u0430\u0448\u0435\u043c \u0431\u043e\u0442\u0435"
            },
            ar: {
                subtitle: "\u0646\u0638\u0627\u0645 \u0627\u0644\u062a\u0646\u0628\u0624 \u0627\u0644\u0630\u0643\u064a",
                version: "\u0627\u0644\u0625\u0635\u062f\u0627\u0631 3.0",
                initText: "NEXT SIGNAL\n\u0627\u0646\u0642\u0631 \u0639\u0644\u0649",
                loading: "\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644...",
                stoppedAt: "\u062a\u0648\u0642\u0641 \u0639\u0646\u062f",
                btnSignal: "NEXT SIGNAL",
                btnWaiting: "\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644...",
                back: "\u0631\u062c\u0648\u0639 \u2190",
                countdown: "\u0627\u0644\u0625\u0634\u0627\u0631\u0629 \u0627\u0644\u062a\u0627\u0644\u064a\u0629 \u062e\u0644\u0627\u0644",
                sec: "\u062b",
                playAt: "\u0627\u0644\u0639\u0628 \u0641\u064a",
                noLang: "\u064a\u0631\u062c\u0649 \u062a\u0643\u0648\u064a\u0646 \u0627\u0644\u0644\u063a\u0629 \u0641\u064a \u0627\u0644\u0628\u0648\u062a"
            }
        };

        if (!this.language) { this.handleNoLanguage(); return; }

        this.printSignal  = document.getElementById('print-signal');
        this.stopBlock    = document.getElementById('stop-block');
        this.stopTimer    = document.getElementById('stop-timer');
        this.stopProgress = document.getElementById('stop-progress');
        this.getSignalBtn = document.getElementById('get-signal');
        this.backBtn      = document.getElementById('back-btn');
        this.countdownInterval = null;
        this.playAtEl          = document.getElementById('play-at-text');
        this.COOLDOWN = 90;

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

    onSignalClick() {
        if (!PredictionManager.canPredict()) { PredictionManager.showCooldownOnButton(this.getSignalBtn, this.t().btnSignal); return; }
        var t    = this.t();
        var self = this;
        this.getSignalBtn.disabled    = true;
        this.getSignalBtn.textContent = t.btnWaiting;
        this.printSignal.innerHTML = '<span class="loading-text">' + t.loading + '</span>';
        if (self.playAtEl) self.playAtEl.textContent = '';
        setTimeout(function() {
            PredictionManager.recordPrediction();
            var signal = standardCoefficient();
            var playAt = Date.now() + 2 * 60 * 1000;
            var d = new Date(playAt);
            var hhmm = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
            self.printSignal.innerHTML =
                '<div class="signal-label">' + t.stoppedAt + '</div>' +
                '<div class="signal-value">' + signal + 'x</div>';
            if (self.playAtEl) self.playAtEl.textContent = t.playAt + ' ' + hhmm;
            GameStateManager.save('aviatrix', { coefficient: signal, countdownEnd: Date.now() + self.COOLDOWN * 1000, playAt: playAt });
            self.startCooldown(self.COOLDOWN);
        }, 15000);
    }

    showPlayAt(saved) {
        if (!this.playAtEl || !saved || !saved.playAt) return;
        var d = new Date(saved.playAt);
        this.playAtEl.textContent = this.t().playAt + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
    }

    restoreState() {
        var saved = GameStateManager.load('aviatrix');
        if (!saved) return;
        var t = this.t();
        var now = Date.now();
        if (saved.countdownEnd && saved.countdownEnd > now) {
            this.printSignal.innerHTML =
                '<div class="signal-label">' + t.stoppedAt + '</div>' +
                '<div class="signal-value">' + saved.coefficient + 'x</div>';
            this.showPlayAt(saved);
            var remaining = Math.ceil((saved.countdownEnd - now) / 1000);
            this.startCooldown(remaining);
        } else if (saved.coefficient) {
            this.printSignal.innerHTML =
                '<div class="signal-label">' + t.stoppedAt + '</div>' +
                '<div class="signal-value">' + saved.coefficient + 'x</div>';
            this.showPlayAt(saved);
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

document.addEventListener('DOMContentLoaded', function() { new AviatrixPredictor(); });