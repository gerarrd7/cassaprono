/* ============================================================
   shared.js — Cassa Predictor shared utilities
   Loaded by all game pages before their own JS
   ============================================================ */

// ========== PREDICTION LIMIT MANAGER ==========
var PredictionManager = (function() {
    var STORAGE_KEY = 'cassaPredTracker';
    var MAX_PREDICTIONS = 80;
    var COOLDOWN_MS = 5 * 60 * 60 * 1000; // 5 hours

    function getData() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            var data = raw ? JSON.parse(raw) : {};
            if (typeof data.count !== 'number') data.count = 0;
            if (typeof data.cooldownStart !== 'number') data.cooldownStart = 0;
            return data;
        } catch(e) {
            return { count: 0, cooldownStart: 0 };
        }
    }

    function saveData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    return {
        canPredict: function() {
            var data = getData();
            if (data.cooldownStart > 0) {
                if (Date.now() - data.cooldownStart >= COOLDOWN_MS) {
                    data.count = 0;
                    data.cooldownStart = 0;
                    saveData(data);
                    return true;
                }
                return false;
            }
            return data.count < MAX_PREDICTIONS;
        },

        recordPrediction: function() {
            var data = getData();
            if (data.cooldownStart > 0 && (Date.now() - data.cooldownStart >= COOLDOWN_MS)) {
                data.count = 0;
                data.cooldownStart = 0;
            }
            data.count++;
            if (data.count >= MAX_PREDICTIONS) {
                data.cooldownStart = Date.now();
            }
            saveData(data);
        },

        getRemainingCooldown: function() {
            var data = getData();
            if (data.cooldownStart > 0) {
                var elapsed = Date.now() - data.cooldownStart;
                if (elapsed < COOLDOWN_MS) {
                    return COOLDOWN_MS - elapsed;
                }
            }
            return 0;
        },

        formatCooldown: function(ms) {
            var totalSec = Math.ceil(ms / 1000);
            var h = Math.floor(totalSec / 3600);
            var m = Math.floor((totalSec % 3600) / 60);
            var s = totalSec % 60;
            return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        },

        showCooldownOnButton: function(btn, originalText, textEl) {
            if (btn._cooldownInterval) return;
            var target = textEl || btn;
            var self = this;
            function update() {
                var remaining = self.getRemainingCooldown();
                if (remaining <= 0) {
                    clearInterval(btn._cooldownInterval);
                    btn._cooldownInterval = null;
                    btn.disabled = false;
                    target.textContent = originalText;
                    return;
                }
                btn.disabled = true;
                target.textContent = 'Réessayer dans ' + self.formatCooldown(remaining);
            }
            update();
            if (self.getRemainingCooldown() > 0) {
                btn._cooldownInterval = setInterval(update, 1000);
            }
        }
    };
})();

// ========== STANDARD COEFFICIENT (85% / 10% / 5%) ==========
function standardCoefficient() {
    var r = Math.random();
    var c;
    if (r < 0.85) {
        c = 1.05 + Math.random() * 2.00;   // 1.05 – 3.05
    } else if (r < 0.95) {
        c = 3.03 + Math.random() * 1.97;   // 3.03 – 5.00
    } else {
        c = 5.01 + Math.random() * 5.00;   // 5.01 – 10.01
    }
    return c.toFixed(2);
}

// ========== COEFFICIENT FACILE (bas, sécurisé) ==========
function coefficientFacile() {
    var r = Math.random();
    var c;
    if (r < 0.90) {
        c = 1.05 + Math.random() * 0.95;   // 1.05 – 2.00
    } else if (r < 0.98) {
        c = 2.01 + Math.random() * 0.99;   // 2.01 – 3.00
    } else {
        c = 3.01 + Math.random() * 1.99;   // 3.01 – 5.00
    }
    return c.toFixed(2);
}

// ========== COEFFICIENT MOYEN (risque modéré) ==========
function coefficientMoyen() {
    var r = Math.random();
    var c;
    if (r < 0.50) {
        c = 2.00 + Math.random() * 3.00;   // 2.00 – 5.00
    } else if (r < 0.85) {
        c = 5.01 + Math.random() * 4.99;   // 5.01 – 10.00
    } else {
        c = 10.01 + Math.random() * 39.99; // 10.01 – 50.00
    }
    return c.toFixed(2);
}

// ========== GAME STATE PERSISTENCE ==========
var GameStateManager = (function() {
    var PREFIX = 'gs_';

    return {
        save: function(gameId, state) {
            state.savedAt = Date.now();
            localStorage.setItem(PREFIX + gameId, JSON.stringify(state));
        },

        load: function(gameId) {
            try {
                return JSON.parse(localStorage.getItem(PREFIX + gameId)) || null;
            } catch(e) {
                return null;
            }
        },

        clear: function(gameId) {
            localStorage.removeItem(PREFIX + gameId);
        }
    };
})();

// ========== GRILLE DEMAND COUNTER ==========
// 3 predict clicks = 1 demand ; starting a group and leaving still costs 1
var GrilleDemandManager = (function() {
    var KEY = 'grilleStepCtr';

    function getData() {
        try {
            return JSON.parse(localStorage.getItem(KEY)) || { steps: 0 };
        } catch(e) {
            return { steps: 0 };
        }
    }

    return {
        recordStep: function() {
            var data = getData();
            if (data.steps % 3 === 0) {
                if (!PredictionManager.canPredict()) return false;
                PredictionManager.recordPrediction();
            }
            data.steps++;
            localStorage.setItem(KEY, JSON.stringify(data));
            return true;
        }
    };
})();

// ========== DERBY DEMAND COUNTER ==========
// Each prediction costs 3 from the 50-prediction limit
var DerbyDemandManager = (function() {
    return {
        recordStep: function() {
            if (!PredictionManager.canPredict()) return false;
            PredictionManager.recordPrediction();
            PredictionManager.recordPrediction();
            PredictionManager.recordPrediction();
            return true;
        }
    };
})();
