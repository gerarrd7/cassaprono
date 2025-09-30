   // Configuration des traductions multilingues
        const translations = {
            'fr': {
                'pageTitle': 'Cassa Predictor',
                'brandName': 'Predictor',
                'sidebarTitle': 'Menu',
                'modeDark': 'Mode Sombre',
                'modeLight': 'Mode Clair',
                'gamesTitle': 'Nos Jeux ',
                'loadingText': 'Chargement de votre jeu...',
                'noLangError': 'Veuillez configurer la langue dans le bot avant de continuer',
                'category1win': '1win bet',
                'categoryOther': 'Autres Bets'
            },
            'en': {
                'pageTitle': 'Cassa Predictor',
                'brandName': 'Predictor',
                'sidebarTitle': 'Menu',
                'modeDark': 'Dark Mode',
                'modeLight': 'Light Mode',
                'gamesTitle': 'Our  Games',
                'loadingText': 'Loading your game...',
                'noLangError': 'Please configure the language in the bot before continuing',
                'category1win': '1win bet',
                'categoryOther': 'Other Bets'
            },
            'ru': {
                'pageTitle': 'Cassa Предиктор',
                'brandName': 'Предиктор',
                'sidebarTitle': 'Меню',
                'modeDark': 'Тёмный режим',
                'modeLight': 'Светлый режим',
                'gamesTitle': 'Наши Премиум Игры',
                'loadingText': 'Загрузка вашей игры...',
                'noLangError': 'Пожалуйста, настройте язык в боте перед продолжением',
                'category1win': '1win ставка',
                'categoryOther': 'Другие ставки'
            },
            'ar': {
                'pageTitle': 'كاسا بريديكتور',
                'brandName': 'بريديكتور',
                'sidebarTitle': 'القائمة',
                'modeDark': 'الوضع الداكن',
                'modeLight': 'الوضع الفاتح',
                'gamesTitle': 'ألعابنا المميزة',
                'loadingText': 'جارٍ تحميل لعبتك...',
                'noLangError': 'يرجى تهيئة اللغة في البوت قبل المتابعة',
                'category1win': 'رهان 1win',
                'categoryOther': 'رهانات أخرى'
            }
        };

        // Configuration des jeux
        const gamesData = [
            {
                'name': 'Lucky Jet',
                'url': 'home/LuckyJet/game.html',
                'image': 'home/LuckyJet/Imogos/LuckyBases.jpg',
                'category': '1win bet'
            },
            {
                'name': 'Aviator',
                'url': 'home/Aviator/gameAvia.html',
                'image': 'home/Aviator/logo/aviator-game.webp',
                'category': 'Autres Bets'
            },
            {
                'name': 'Apple of Fortune',
                'url': 'home/apple/applegame.html',
                'image': 'home/apple/stelo/logo .jpg',
                'category': 'Autres Bets'
            },
            {
                'name': 'Gems Mines',
                'url': 'home/grile/mines.html',
                'image': 'home/grile/vision/BaseMines.jpg',
                'category': 'Autres Bets'
            },
            {
                'name': 'Dragons',
                'url': 'home/Dragons/dragonS/game.html',
                'image': 'home/Dragons/dragonS/imag/baseDragons.jpg',
                'category': 'Autres Bets'
            },
            {
                'name': 'Crash',
                'url': 'crash/crash.html',
                'image': 'crash/vision/logo.jpg',
                'category': 'Autres Bets'
            },
            {
                'name': 'Swimp',
                'url': 'home/crapaud/swimp.html',
                'image': 'home/crapaud/imago/baseCrap.jpg',
                'category': 'Autres Bets'
            },
            {
                'name': 'Mundial',
                'url': 'home/Mundial/game.html',
                'image': 'home/Mundial/imogs/BaseMond.jpeg',
                'category': 'Autres Bets'
            },
            {
                'name': 'Thimbles',
                'url': 'home/boll/thimble.html',
                'image': 'home/boll/imog/BaseThimbles.jpg',
                'category': 'Autres Bets'
            },
            {
                'name': 'Wild Ghost',
                'url': 'home/WildG/wild.html',
                'image': 'home/WildG/imog/west logo.jpg',
                'category': 'Autres Bets'
            }
        ];

        // Génération des particules
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = window.innerWidth > 768 ? 15 : 8;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 60 + 20;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
                particle.style.animationDelay = Math.random() * 20 + 's';
                
                particlesContainer.appendChild(particle);
            }
        }

        // Utilitaires
        function sanitizeInput(input) {
            const tempDiv = document.createElement('div');
            tempDiv.textContent = input;
            return tempDiv.innerHTML;
        }

        function getParam(paramName) {
            const urlParams = new URLSearchParams(window.location.search);
            return sanitizeInput(urlParams.get(paramName) || '');
        }

        function getGameUrlWithParams(gameUrl) {
            const lang = getParam('lang');
            const username = getParam('us');
            const userId = getParam('i');
            const telegramLink = getParam('lk');
            const params = new URLSearchParams();

            if (lang) params.append('lang', lang);
            if (username) params.append('us', username);
            if (userId) params.append('i', userId);
            if (telegramLink) params.append('lk', telegramLink);

            return gameUrl + (params.toString() ? '?' + params.toString() : '');
        }

        // Profil utilisateur
        function parseProfileFromUrl() {
            const username = getParam('us');
            const userId = getParam('i');
            const telegramLink = getParam('lk');
            
            const profileBtn = document.getElementById('profileBtn');
            const profileInfo = document.getElementById('profileInfo');
            const profileName = document.getElementById('profileName');
            const profileId = document.getElementById('profileId');

            if (userId && username && telegramLink) {
                const telegramUrl = 'https://t.me/' + telegramLink;
                profileBtn.setAttribute('href', telegramUrl);
                profileInfo.style.display = 'none';
            }
        }

        // Traductions
        function applyTranslations(language) {
            const texts = translations[language] || translations['fr'];
            
            document.getElementById('page-title').textContent = texts.pageTitle;
            document.getElementById('brand-name').textContent = texts.brandName;
            document.getElementById('sidebar-title').textContent = texts.sidebarTitle;
            document.getElementById('games-title').textContent = texts.gamesTitle;
            document.getElementById('loadingText').textContent = texts.loadingText;

            const modeText = document.getElementById('modeText');
            modeText.textContent = document.body.classList.contains('dark-mode') ? 
                texts.modeDark : texts.modeLight;
        }

        function checkLanguageAndRedirect() {
            const language = getParam('lang');
            const telegramLink = getParam('lk');

            if (!language) {
                const loadingOverlay = document.getElementById('loadingOverlay');
                const loadingText = document.getElementById('loadingText');
                
                loadingText.textContent = translations['fr']['noLangError'];
                loadingOverlay.classList.add('active');
                
                setTimeout(() => {
                    if (telegramLink) {
                        window.location.href = 'https://t.me/' + telegramLink;
                    } else {
                        window.location.href = 'https://t.me/PREDBOX2ROBOT';
                    }
                    setTimeout(() => {
                        window.close();
                    }, 100);
                }, 2000);
                
                return false;
            }
            
            applyTranslations(language);
            return true;
        }

        // Mode sombre/clair
        function loadMode() {
            const savedTheme = localStorage.getItem('theme') || 'dark-mode';
            const body = document.body;
            const modeText = document.getElementById('modeText');
            const modeIcon = document.querySelector('#modeToggle i');
            const language = getParam('lang') || 'fr';
            const texts = translations[language] || translations['fr'];

            body.classList.remove('dark-mode', 'light-mode');
            body.classList.add(savedTheme);
            
            modeText.textContent = savedTheme === 'dark-mode' ? 
                texts.modeDark : texts.modeLight;
            modeIcon.className = savedTheme === 'dark-mode' ? 
                'fas fa-moon' : 'fas fa-sun';
        }

        function saveMode(theme) {
            localStorage.setItem('theme', theme);
        }

        function toggleMode() {
            const body = document.body;
            const modeText = document.getElementById('modeText');
            const modeIcon = document.querySelector('#modeToggle i');
            const language = getParam('lang') || 'fr';
            const texts = translations[language] || translations['fr'];

            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                modeText.textContent = texts.modeLight;
                modeIcon.className = 'fas fa-sun';
                saveMode('light-mode');
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                modeText.textContent = texts.modeDark;
                modeIcon.className = 'fas fa-moon';
                saveMode('dark-mode');
            }
        }

        // Loading
        function showLoading() {
            const loadingOverlay = document.getElementById('loadingOverlay');
            loadingOverlay.classList.add('active');
        }

        function hideLoading() {
            const loadingOverlay = document.getElementById('loadingOverlay');
            loadingOverlay.classList.remove('active');
        }

        // Gestion des jeux
        function handleGameClick(gameUrl, event) {
            event.preventDefault();
            showLoading();
            
            setTimeout(() => {
                hideLoading();
                window.location.href = getGameUrlWithParams(gameUrl);
            }, 1500);
        }

        function populateGames() {
            const gamesGrid = document.getElementById('gamesGrid');
            const language = getParam('lang') || 'fr';
            const texts = translations[language] || translations['fr'];
            
            gamesGrid.innerHTML = '';
            
            gamesData.forEach((game, index) => {
                const gameCard = document.createElement('div');
                gameCard.className = 'game-card';
                gameCard.onclick = (event) => handleGameClick(game.url, event);

                const categoryText = game.category === '1win bet' ? 
                    texts.category1win : texts.categoryOther;

                gameCard.innerHTML = `
                    <div class="game-image" style="background-image: url('${game.image}');">
                        <div class="game-overlay">
                            <div class="play-btn" aria-label="Jouer à ${game.name}">
                                <i class="fas fa-play"></i>
                            </div>
                        </div>
                    </div>
                    <div class="game-info">
                        <div class="game-name">${game.name}</div>
                        <div class="game-category">${categoryText}</div>
                    </div>
                `;
                
                gamesGrid.appendChild(gameCard);
            });
        }

        // Scroll effects
        function handleScroll() {
            const backToTop = document.getElementById('backToTop');
            const topNav = document.getElementById('topNav');
            
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
            
            if (window.scrollY > 50) {
                topNav.classList.add('scrolled');
            } else {
                topNav.classList.remove('scrolled');
            }
        }

        // Initialisation
        document.addEventListener('DOMContentLoaded', () => {
            // Créer les particules
            createParticles();
            
            // Vérification de la langue
            if (!checkLanguageAndRedirect()) return;

            // Initialisation des composants
            parseProfileFromUrl();
            loadMode();
            populateGames();

            // Mode toggle
            const modeToggle = document.getElementById('modeToggle');
            modeToggle.addEventListener('click', (event) => {
                event.preventDefault();
                toggleMode();
            });

            // Sidebar
            const hamburgerBtn = document.getElementById('hamburgerBtn');
            const sidebar = document.getElementById('sidebar');
            const closeSidebar = document.getElementById('closeSidebar');
            const overlay = document.getElementById('overlay');

            hamburgerBtn.addEventListener('click', () => {
                sidebar.classList.add('active');
                overlay.classList.add('active');
            });

            closeSidebar.addEventListener('click', () => {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            });

            overlay.addEventListener('click', () => {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            });

            // Back to top
            const backToTop = document.getElementById('backToTop');
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    'top': 0,
                    'behavior': 'smooth'
                });
            });

            // Scroll listener
            window.addEventListener('scroll', handleScroll);

            // Optimisation des performances
            let ticking = false;
            function requestTick() {
                if (!ticking) {
                    window.requestAnimationFrame(handleScroll);
                    ticking = true;
                }
            }
            window.addEventListener('scroll', () => {
                requestTick();
                ticking = false;
            });
        });

        // Préchargement des images
        function preloadImages() {
            gamesData.forEach(game => {
                const img = new Image();
                img.src = game.image;
            });
        }
        
        window.addEventListener('load', preloadImages);
