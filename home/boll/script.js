class ThimbleCassa {
    constructor() {
        this.language = this.getLanguageFromURL();
        this.translations = {
            fr: {
                pageTitle: "Thimble Cassa",
                bille1: "1 bille x2.91",
                billes2: "2 billes x1.45",
                predictButton: "Prédiction",
                backButton: "Retour",
                notificationChoose: "Veuillez sélectionner une option avant de procéder",
                notificationError: "Veuillez sélectionner une option avant de procéder."
            },
            en: {
                pageTitle: "Thimble Cassa",
                bille1: "1 ball x2.91",
                billes2: "2 balls x1.45",
                predictButton: "Prediction",
                backButton: "Back",
                notificationChoose: "Please select an option before proceeding",
                notificationError: "Please select an option before proceeding."
            },
            ru: {
                pageTitle: "Thimble Cassa",
                bille1: "1 шар x2.91",
                billes2: "2 шара x1.45",
                predictButton: "Прогноз",
                backButton: "Назад",
                notificationChoose: "Пожалуйста, выберите опцию перед продолжением",
                notificationError: "Пожалуйста, выберите опцию перед продолжением."
            },
            ar: {
                pageTitle: "Thimble Cassa",
                bille1: "كرة واحدة x2.91",
                billes2: "كرتين x1.45",
                predictButton: "التنبؤ",
                backButton: "رجوع",
                notificationChoose: "يرجى تحديد خيار قبل المتابعة",
                notificationError: "يرجى تحديد خيار قبل المتابعة."
            }
        };

        // Vérifier la langue
        if (!this.language) {
            this.handleNoLanguage();
            return;
        }

        this.updateLanguage(this.language);
        this.initialize();
    }

    getLanguageFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang');
    }

    handleNoLanguage() {
        document.body.innerHTML = `
            <div class="notification" id="notification">${this.translations.fr.notificationError}</div>
        `;
        document.getElementById('notification').style.display = 'block';
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
        document.getElementById('page-title').textContent = t.pageTitle;
        document.getElementById('bille1-btn').textContent = t.bille1;
        document.getElementById('billes2-btn').textContent = t.billes2;
        document.getElementById('predictBtn').textContent = t.predictButton;
        document.getElementById('back-button-text').textContent = t.backButton;
        document.getElementById('notification').textContent = t.notificationChoose;
    }

    initialize() {
        // Animation des particules
        let particleCount = 0;
        const maxParticles = 40;

        function createParticle() {
            if (particleCount >= maxParticles) return;

            const particle = document.createElement('div');
            particle.classList.add('particle');

            const startX = Math.random() * 80 + 10;
            particle.style.left = `${startX}vw`;
            particle.style.setProperty('--direction', Math.random() > 0.5 ? 1 : -1);

            const size = Math.random() * 0.3 + 0.2;
            particle.style.width = `${size}vmin`;
            particle.style.height = `${size}vmin`;

            const duration = 8 + Math.random() * 4;
            const delay = Math.random() * 2;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;

            document.body.appendChild(particle);
            particleCount++;

            setTimeout(() => {
                particle.remove();
                particleCount--;
            }, (duration + delay) * 1000);
        }

        setInterval(() => {
            if (Math.random() > 0.4) {
                for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
                    createParticle();
                }
            }
        }, 1200);

        // Afficher la notification initiale
        const notification = document.getElementById('notification');
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 4000);

        // Fonction de prédiction
        const predict = () => {
            const selectedBet = document.querySelector('.bet-btn[selected]');
            const loader = document.getElementById('loader');
            const overlay = document.getElementById('overlay');
            const gobelets = document.querySelectorAll('.ball-img');
            const notification = document.getElementById('notification');
            const betButtons = document.querySelectorAll('.bet-btn');
            const t = this.translations[this.language] || this.translations.fr;

            if (!selectedBet) {
                notification.textContent = t.notificationError;
                notification.style.display = 'block';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 4000);
                return;
            }

            gobelets.forEach(gobelet => gobelet.classList.remove('moved'));
            betButtons.forEach(btn => btn.removeAttribute('selected'));
            selectedBet.setAttribute('selected', '');

            overlay.style.display = 'block';
            loader.style.display = 'block';

            setTimeout(() => {
                loader.style.display = 'none';
                overlay.style.display = 'none';

                const indices = [0, 1, 2];
                let selectedIndices = [];

                if (selectedBet.getAttribute('data-value') === 'billes2') {
                    selectedIndices = indices.sort(() => Math.random() - 0.5).slice(0, 2);
                } else {
                    selectedIndices = [indices[Math.floor(Math.random() * indices.length)]];
                }

                selectedIndices.forEach(index => {
                    gobelets[index].classList.add('moved');
                });

                setTimeout(() => {
                    gobelets.forEach(gobelet => gobelet.classList.remove('moved'));
                }, 4000);
            }, 4000);
        };

        // Attacher les événements aux boutons de pari
        document.querySelectorAll('.bet-btn').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.bet-btn').forEach(btn => btn.removeAttribute('selected'));
                this.setAttribute('selected', '');
            });
        });

        // Bouton Retour
        document.getElementById('backButton').addEventListener('click', () => {
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

        // Attacher l'événement au bouton de prédiction
        document.getElementById('predictBtn').addEventListener('click', () => {
            // Déclencher une vibration
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }
            predict();
        });
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    new ThimbleCassa();
});