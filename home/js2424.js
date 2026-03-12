        // Redirection automatique vers Netlify
        function checkAndRedirectToNetlify() {
            const currentUrl = window.location.href;
            if (currentUrl.includes('gerarrd7.github.io/cassaprono/') || 
                currentUrl.includes('gerard7.github.io/cassaprono/') ||
                currentUrl.includes('github.io/cassaprono')) {
                
                // Conserver les paramètres URL actuels
                const urlParams = window.location.search;
                const newUrl = 'https://amazing-jelly-603fc6.netlify.app/' + urlParams;
                
                // Redirection immédiate
                window.location.replace(newUrl);
                return true;
            }
            return false;
        }
   // Configuration des traductions multilingues
        const translations = {
            'fr': {
                'pageTitle': 'Cassa Predictor',
                'brandName': 'Predictor',
                'sidebarTitle': 'Menu',
                'modeDark': 'Mode Sombre',
                'modeLight': 'Mode Clair',
                'termsBtn': "Conditions d'utilisation",
                'termsTitle': "Conditions d'utilisation",
                'gamesTitle': 'Nos Jeux ',
                'loadingText': 'Chargement de votre jeu...',
                'noLangError': 'Veuillez configurer la langue dans le bot avant de continuer',
                'category1win': '1win bet',
                'categoryOther': 'Autres Bets',
                'searchPlaceholder': 'Rechercher un jeu...',
                'tabAll': 'Tout',
                'tabWin': 'Win Game',
                'tabOther': 'Autres bet',
                'tabFavs': 'Favoris',
                'noFavorites': 'Aucun favori pour le moment',
                'noResults': 'Aucun jeu trouvé'
            },
            'en': {
                'pageTitle': 'Cassa Predictor',
                'brandName': 'Predictor',
                'sidebarTitle': 'Menu',
                'modeDark': 'Dark Mode',
                'modeLight': 'Light Mode',
                'termsBtn': 'Terms of Use',
                'termsTitle': 'Terms of Use',
                'gamesTitle': 'Our  Games',
                'loadingText': 'Loading your game...',
                'noLangError': 'Please configure the language in the bot before continuing',
                'category1win': '1win bet',
                'categoryOther': 'Other Bets',
                'searchPlaceholder': 'Search a game...',
                'tabAll': 'All',
                'tabWin': 'Win Game',
                'tabOther': 'Other bets',
                'tabFavs': 'Favorites',
                'noFavorites': 'No favorites yet',
                'noResults': 'No game found'
            },
            'ru': {
                'pageTitle': 'Cassa Предиктор',
                'brandName': 'Предиктор',
                'sidebarTitle': 'Меню',
                'modeDark': 'Тёмный режим',
                'modeLight': 'Светлый режим',
                'termsBtn': 'Условия использования',
                'termsTitle': 'Условия использования',
                'gamesTitle': 'Наши Премиум Игры',
                'loadingText': 'Загрузка вашей игры...',
                'noLangError': 'Пожалуйста, настройте язык в боте перед продолжением',
                'category1win': '1win ставка',
                'categoryOther': 'Другие ставки',
                'searchPlaceholder': 'Поиск игры...',
                'tabAll': 'Все',
                'tabWin': 'Win Game',
                'tabOther': 'Другие ставки',
                'tabFavs': 'Избранные',
                'noFavorites': 'Нет избранных',
                'noResults': 'Игра не найдена'
            },
            'ar': {
                'pageTitle': 'كاسا بريديكتور',
                'brandName': 'بريديكتور',
                'sidebarTitle': 'القائمة',
                'modeDark': 'الوضع الداكن',
                'modeLight': 'الوضع الفاتح',
                'termsBtn': 'شروط الاستخدام',
                'termsTitle': 'شروط الاستخدام',
                'gamesTitle': 'ألعابنا المميزة',
                'loadingText': 'جارٍ تحميل لعبتك...',
                'noLangError': 'يرجى تهيئة اللغة في البوت قبل المتابعة',
                'category1win': 'رهان 1win',
                'categoryOther': 'رهانات أخرى',
                'searchPlaceholder': 'ابحث عن لعبة...',
                'tabAll': 'الكل',
                'tabWin': 'Win Game',
                'tabOther': 'رهانات أخرى',
                'tabFavs': 'المفضلة',
                'noFavorites': 'لا مفضلات حتى الآن',
                'noResults': 'لم يتم العثور على لعبة'
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
            },
            {
                'name': 'Chicken Run',
                'url': 'home/ChickenRun/game.html',
                'image': 'logo game/Chicken_run.png',
                'category': '1win bet',
                'imagefit': 'contain'
            },
            {
                'name': 'JetX',
                'url': 'home/JetX/game.html',
                'image': 'logo game/jetx.png',
                'category': '1win bet',
                'imagefit': 'contain'
            },
            {
                'name': 'Aviatrix',
                'url': 'home/Aviatrix/game.html',
                'image': 'logo game/aviatrix.png',
                'category': 'Autres Bets',
                'imagefit': 'contain'
            },
            {
                'name': 'Labu Run',
                'url': 'home/LabuRun/game.html',
                'image': 'logo game/labu_run.png',
                'category': '1win bet',
                'imagefit': 'contain'
            },
            {
                'name': 'Chicken Subway',
                'url': 'home/ChickenSubway/game.html',
                'image': 'logo game/chicken_subway.png',
                'category': '1win bet',
                'imagefit': 'contain'
            },
            {
                'name': 'Play Me',
                'url': 'home/PlayMe/game.html',
                'image': 'logo game/play_me.png',
                'category': '1win bet',
                'imagefit': 'contain'
            },
            {
                'name': 'Overheat',
                'url': 'home/Overheat/game.html',
                'image': 'logo game/overheat.png',
                'category': '1win bet',
                'imagefit': 'contain'
            },
            {
                'name': 'Derby Racing',
                'url': 'home/DerbyRacing/game.html',
                'image': 'logo game/derby_racing.png',
                'category': 'Autres Bets',
                'imagefit': 'contain'
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

            // Nouveaux éléments
            var searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.placeholder = texts.searchPlaceholder;
            var tabTout = document.getElementById('tab-tout');
            var tabWin = document.getElementById('tab-win');
            var tabOther = document.getElementById('tab-other');
            var tabFavs = document.getElementById('tab-favs');
            if (tabTout) tabTout.textContent = texts.tabAll;
            if (tabWin) tabWin.textContent = texts.tabWin;
            if (tabOther) tabOther.textContent = texts.tabOther;
            if (tabFavs) tabFavs.textContent = texts.tabFavs;

            var termsText = document.getElementById('termsText');
            if (termsText) termsText.textContent = texts.termsBtn;
            var termsTitle = document.getElementById('termsTitle');
            if (termsTitle) termsTitle.textContent = texts.termsTitle;
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
        var activeTab = 'tout';
        var searchQuery = '';

        function getFavorites() {
            try { return JSON.parse(localStorage.getItem('cassaFavorites') || '[]'); }
            catch(e) { return []; }
        }

        function toggleFavorite(gameName, event) {
            event.stopPropagation();
            event.preventDefault();
            var favs = getFavorites();
            var idx = favs.indexOf(gameName);
            if (idx === -1) favs.push(gameName);
            else favs.splice(idx, 1);
            localStorage.setItem('cassaFavorites', JSON.stringify(favs));
            refreshGames();
        }

        function isFavorite(gameName) {
            return getFavorites().indexOf(gameName) !== -1;
        }

        function handleGameClick(gameUrl, event) {
            event.preventDefault();
            showLoading();
            
            setTimeout(() => {
                hideLoading();
                window.location.href = getGameUrlWithParams(gameUrl);
            }, 1500);
        }

        function updateTabBadges() {
            var counts = {
                tout: gamesData.length,
                win: gamesData.filter(g => g.category === '1win bet').length,
                other: gamesData.filter(g => g.category !== '1win bet').length,
                favs: getFavorites().length
            };
            document.querySelectorAll('.tab-btn').forEach(function(btn) {
                var tab = btn.getAttribute('data-tab');
                var badge = btn.querySelector('.tab-badge');
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'tab-badge';
                    btn.appendChild(badge);
                }
                badge.textContent = counts[tab] || 0;
            });
        }

        function refreshGames() {
            const language = getParam('lang') || 'fr';
            const texts = translations[language] || translations['fr'];
            var filtered = gamesData.slice();

            if (activeTab === 'win') {
                filtered = filtered.filter(g => g.category === '1win bet');
            } else if (activeTab === 'other') {
                filtered = filtered.filter(g => g.category !== '1win bet');
            } else if (activeTab === 'favs') {
                var favs = getFavorites();
                filtered = filtered.filter(g => favs.indexOf(g.name) !== -1);
            }

            if (searchQuery.trim()) {
                var q = searchQuery.trim().toLowerCase();
                filtered = filtered.filter(g => g.name.toLowerCase().indexOf(q) !== -1);
            }

            updateTabBadges();

            const gamesGrid = document.getElementById('gamesGrid');
            gamesGrid.innerHTML = '';

            if (filtered.length === 0) {
                const emptyDiv = document.createElement('div');
                emptyDiv.className = 'empty-state';
                emptyDiv.textContent = activeTab === 'favs' ? texts.noFavorites : texts.noResults;
                gamesGrid.appendChild(emptyDiv);
                return;
            }

            filtered.forEach((game, index) => {
                const gameCard = document.createElement('div');
                gameCard.className = 'game-card';
                gameCard.onclick = (event) => handleGameClick(game.url, event);

                const categoryText = game.category === '1win bet' ?
                    texts.category1win : texts.categoryOther;

                const bgFit = game.imagefit || 'cover';
                const bgExtra = bgFit === 'contain'
                    ? 'background-size: contain; background-repeat: no-repeat; background-color: #0d1020;'
                    : 'background-size: cover;';

                const favClass = isFavorite(game.name) ? ' active' : '';
                const safeName = game.name.replace(/'/g, "\\'");

                gameCard.innerHTML = `
                    <button class="fav-btn${favClass}" onclick="toggleFavorite('${safeName}', event)" aria-label="Favori">
                        <i class="fas fa-heart"></i>
                    </button>
                    <div class="game-image${bgFit === 'contain' ? ' game-image--portrait' : ''}" style="background-image: url('${game.image}'); ${bgExtra}">
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

        function populateGames() {
            refreshGames();
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
            // Vérification et redirection Netlify (priorité absolue)
            if (checkAndRedirectToNetlify()) {
                return; // Arrêter l'exécution si redirection en cours
            }
            
            // Créer les particules
            createParticles();
            
            // Vérification de la langue
            if (!checkLanguageAndRedirect()) return;

            // Initialisation des composants
            parseProfileFromUrl();
            loadMode();
            populateGames();

            // Barre de recherche
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    searchQuery = this.value;
                    refreshGames();
                });
            }

            // Onglets
            const tabBtns = document.querySelectorAll('.tab-btn');
            tabBtns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    tabBtns.forEach(function(b) { b.classList.remove('active'); });
                    btn.classList.add('active');
                    activeTab = btn.getAttribute('data-tab');
                    refreshGames();
                });
            });

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

            // Terms modal
            const termsToggle = document.getElementById('termsToggle');
            const termsModal = document.getElementById('termsModal');
            const closeTerms = document.getElementById('closeTerms');
            const termsContent = {
                'fr': [
                    ['⚠️ Important :', 'Aucun prédicteur, bot ou application ne peut garantir des signaux fiables à 100%. Au mieux, la précision atteint environ <strong>85%</strong>, car nous sommes sur un casino et le hasard reste présent.', '#f667ea'],
                    ['📊 Notre méthode :', "Notre analyse repose sur l'historique des jeux et des algorithmes d'identification de tendances. Nous faisons de notre mieux pour fournir des signaux de qualité.", '#667eea'],
                    ['💰 Gestion de l\'argent :', 'Ne misez jamais la totalité de votre argent sur une seule prédiction. Faites des paris inférieurs à votre solde disponible. La prudence est votre meilleur allié.', '#48bb78'],
                    ['✅ Savoir s\'arrêter :', 'Si vous détectez des pertes consécutives, arrêtez de jouer immédiatement. Continuer dans une mauvaise série ne fera qu\'aggraver vos pertes.', '#f6ad55'],
                    ['🚨 Ne soyez pas gourmand :', "C'est la gourmandise qui fait perdre ce que vous avez gagné. Si vos gains dépassent déjà le double de votre dépôt, retirez-les et prenez une pause.", '#f56565'],
                    ['🔒 En résumé :', 'Ne vous fiez jamais totalement aux prédictions d\'un quelconque prédicteur. Jouez de manière responsable, protégez votre argent et gardez toujours le contrôle.', '#764ba2']
                ],
                'en': [
                    ['⚠️ Important:', 'No predictor, bot or application can guarantee 100% reliable signals. At best, accuracy reaches about <strong>85%</strong>, because we are on a casino and randomness is always present.', '#f667ea'],
                    ['📊 Our method:', 'Our analysis is based on game history and trend identification algorithms. We do our best to provide quality signals.', '#667eea'],
                    ['💰 Money management:', 'Never bet all your money on a single prediction. Place bets lower than your available balance. Caution is your best ally.', '#48bb78'],
                    ['✅ Know when to stop:', 'If you detect consecutive losses, stop playing immediately. Continuing in a bad streak will only make your losses worse.', '#f6ad55'],
                    ['🚨 Don\'t be greedy:', 'Greed is what makes you lose what you\'ve won. If your winnings already exceed double your deposit, withdraw them and take a break.', '#f56565'],
                    ['🔒 Summary:', 'Never fully rely on any predictor\'s predictions. Play responsibly, protect your money and always stay in control.', '#764ba2']
                ],
                'ru': [
                    ['⚠️ Важно:', 'Ни один предиктор, бот или приложение не может гарантировать 100% надёжные сигналы. В лучшем случае точность достигает около <strong>85%</strong>, потому что мы в казино и случайность всегда присутствует.', '#f667ea'],
                    ['📊 Наш метод:', 'Наш анализ основан на истории игр и алгоритмах выявления тенденций. Мы делаем всё возможное для предоставления качественных сигналов.', '#667eea'],
                    ['💰 Управление деньгами:', 'Никогда не ставьте все деньги на один прогноз. Делайте ставки меньше вашего доступного баланса. Осторожность — ваш лучший союзник.', '#48bb78'],
                    ['✅ Знайте когда остановиться:', 'Если вы обнаружили последовательные потери, немедленно прекратите играть. Продолжение в плохой серии только усугубит ваши потери.', '#f6ad55'],
                    ['🚨 Не будьте жадными:', 'Жадность заставляет терять то, что вы выиграли. Если ваш выигрыш уже превышает удвоенный депозит, выведите его и сделайте перерыв.', '#f56565'],
                    ['🔒 Итог:', 'Никогда не полагайтесь полностью на прогнозы любого предиктора. Играйте ответственно, защищайте свои деньги и всегда сохраняйте контроль.', '#764ba2']
                ],
                'ar': [
                    ['⚠️ مهم:', 'لا يمكن لأي متنبئ أو بوت أو تطبيق ضمان إشارات موثوقة بنسبة 100%. في أفضل الأحوال تصل الدقة إلى حوالي <strong>85%</strong>، لأننا في كازينو والعشوائية موجودة دائماً.', '#f667ea'],
                    ['📊 طريقتنا:', 'يعتمد تحليلنا على سجل الألعاب وخوارزميات تحديد الاتجاهات. نبذل قصارى جهدنا لتقديم إشارات عالية الجودة.', '#667eea'],
                    ['💰 إدارة المال:', 'لا تراهن أبداً بكل أموالك على توقع واحد. ضع رهانات أقل من رصيدك المتاح. الحذر هو أفضل حليف لك.', '#48bb78'],
                    ['✅ اعرف متى تتوقف:', 'إذا اكتشفت خسائر متتالية، توقف عن اللعب فوراً. الاستمرار في سلسلة سيئة لن يؤدي إلا إلى تفاقم خسائرك.', '#f6ad55'],
                    ['🚨 لا تكن جشعاً:', 'الجشع هو ما يجعلك تخسر ما ربحته. إذا تجاوزت أرباحك ضعف إيداعك، اسحبها وخذ استراحة.', '#f56565'],
                    ['🔒 الخلاصة:', 'لا تعتمد أبداً بالكامل على توقعات أي متنبئ. العب بمسؤولية، احمِ أموالك وابقَ دائماً متحكماً.', '#764ba2']
                ]
            };
            if (termsToggle && termsModal) {
                termsToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    const lang = getParam('lang') || 'fr';
                    const items = termsContent[lang] || termsContent['fr'];
                    const termsBody = document.getElementById('termsBody');
                    const termsTitle = document.getElementById('termsTitle');
                    const texts = translations[lang] || translations['fr'];
                    if (termsTitle && texts.termsTitle) termsTitle.textContent = texts.termsTitle;
                    termsBody.innerHTML = items.map(function(item) {
                        return '<p style="margin-bottom:15px;"><strong style="color:' + item[2] + ';">' + item[0] + '</strong> ' + item[1] + '</p>';
                    }).join('');
                    termsModal.style.display = 'block';
                });
                closeTerms.addEventListener('click', () => {
                    termsModal.style.display = 'none';
                });
                termsModal.addEventListener('click', (e) => {
                    if (e.target === termsModal) termsModal.style.display = 'none';
                });
            }

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
