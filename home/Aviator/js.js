   
        class AviatorPredictor {
            constructor() {
                this.predictionCircle = document.getElementById('prediction-circle');
                this.predictionValue = document.getElementById('prediction-value');
                this.generateBtn = document.getElementById('generate-btn');
                this.backBtn = document.getElementById('back-btn');
                this.btnText = document.getElementById('btn-text');
                this.statusBar = document.getElementById('status-bar');
                this.title = document.getElementById('app-title');
                this.subtitle = document.getElementById('app-subtitle');
                this.version = document.getElementById('app-version');
                this.predictionLabel = document.getElementById('prediction-label');
                
                this.isGenerating = false;
                this.timeOffset = 0;
                this.language = this.getLanguageFromURL();
                this.translations = {
                    fr: {
                        title: "Aviator Predictor",
                        subtitle: "Générateur de signaux avancé",
                        version: "Version 2.0 Pro",
                        coefficient: "Coefficient",
                        generate: "Générer Signal",
                        back: "Retour",
                        analysis: "Analyse",
                        calculation: "Calcul",
                        validation: "Validation",
                        analyzing: "Analyse des données en cours...",
                        generated: "Signal généré: {0}x à {1}",
                        ready: "Prêt à générer un signal",
                        returning: "Retour en cours...",
                        noLang: "Veuillez configurer la langue dans votre bot et réessayer"
                    },
                    en: {
                        title: "Aviator Predictor",
                        subtitle: "Advanced Signal Generator",
                        version: "Version 2.0 Pro",
                        coefficient: "Coefficient",
                        generate: "Generate Signal",
                        back: "Back",
                        analysis: "Analysis",
                        calculation: "Calculation",
                        validation: "Validation",
                        analyzing: "Analyzing data...",
                        generated: "Signal generated: {0}x at {1}",
                        ready: "Ready to generate a signal",
                        returning: "Returning...",
                        noLang: "Please configure the language in your bot and try again"
                    },
                    ru: {
                        title: "Aviator Predictor",
                        subtitle: "Продвинутый генератор сигналов",
                        version: "Версия 2.0 Pro",
                        coefficient: "Коэффициент",
                        generate: "Сгенерировать сигнал",
                        back: "Назад",
                        analysis: "Анализ",
                        calculation: "Расчет",
                        validation: "Проверка",
                        analyzing: "Анализ данных...",
                        generated: "Сигнал сгенерирован: {0}x в {1}",
                        ready: "Готово к генерации сигнала",
                        returning: "Возврат...",
                        noLang: "Пожалуйста, настройте язык в вашем боте и попробуйте снова"
                    },
                    ar: {
                        title: "Aviator Predictor",
                        subtitle: "مولد إشارات متقدم",
                        version: "الإصدار 2.0 برو",
                        coefficient: "المعامل",
                        generate: "إنشاء إشارة",
                        back: "رجوع",
                        analysis: "تحليل",
                        calculation: "حساب",
                        validation: "التحقق",
                        analyzing: "جارٍ تحليل البيانات...",
                        generated: "تم إنشاء الإشارة: {0}x في {1}",
                        ready: "جاهز لإنشاء إشارة",
                        returning: "جارٍ الرجوع...",
                        noLang: "يرجى تكوين اللغة في البوت الخاص بك وإعادة المحاولة"
                    }
                };

                // Vérifier la langue
                if (!this.language) {
                    this.handleNoLanguage();
                    return;
                }

                this.updateLanguage(this.language);
                this.initializeEventListeners();
                this.showStatus(this.translations[this.language].ready, 2000);
            }

            getLanguageFromURL() {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get('lang');
            }

            handleNoLanguage() {
                this.title.textContent = "Language Not Set";
                this.subtitle.textContent = "";
                this.version.textContent = "";
                this.predictionValue.textContent = "";
                this.predictionLabel.textContent = "";
                this.generateBtn.style.display = "none";
                this.backBtn.style.display = "none";
                
                const message = this.translations.fr.noLang; // Message par défaut en français
                this.showStatus(message);

                // Redirection vers le bot Telegram après 3 secondes
                setTimeout(() => {
                    window.location.href = "https://t.me/PREDBOX2ROBOT?start=user22476018";
                    // Fermer la page si possible
                    setTimeout(() => {
                        window.close();
                    }, 500);
                }, 3000);
            }

            updateLanguage(lang) {
                document.documentElement.lang = lang;
                const t = this.translations[lang] || this.translations.fr; // Français par défaut
                this.title.textContent = t.title;
                this.subtitle.textContent = t.subtitle;
                this.version.textContent = t.version;
                this.predictionLabel.textContent = t.coefficient;
                this.btnText.textContent = t.generate;
                this.backBtn.textContent = t.back;
            }

            initializeEventListeners() {
                this.generateBtn.addEventListener('click', () => {
                    if (navigator.vibrate) {
                        navigator.vibrate(200);
                    }
                    this.generateSignal();
                });
                this.backBtn.addEventListener('click', () => {
                    if (navigator.vibrate) {
                        navigator.vibrate(200);
                    }
                    this.goBack();
                });
            }

            async generateSignal() {
                if (this.isGenerating) return;
                
                this.isGenerating = true;
                this.setLoadingState(true);
                this.showStatus(this.translations[this.language].analyzing);

                await this.simulateAnalysis();
                
                const coefficient = this.calculateCoefficient();
                this.displayResult(coefficient);
                
                this.timeOffset += 1; // Changed to 1 minute interval
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() + this.timeOffset);
                const formattedTime = currentTime.toLocaleTimeString(this.language === 'ar' ? 'ar-EG' : this.language === 'ru' ? 'ru-RU' : this.language === 'en' ? 'en-US' : 'fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                this.setLoadingState(false);
                this.isGenerating = false;
                this.showStatus(this.translations[this.language].generated.replace('{0}', coefficient).replace('{1}', formattedTime), 3000);
            }

            async simulateAnalysis() {
                const stages = [
                    { text: this.translations[this.language].analysis, duration: 600 },
                    { text: this.translations[this.language].calculation, duration: 800 },
                    { text: this.translations[this.language].validation, duration: 600 }
                ];

                for (let stage of stages) {
                    this.predictionValue.innerHTML = `
                        ${stage.text}
                        <div class="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    `;
                    await this.delay(stage.duration);
                }
            }

            calculateCoefficient() {
                const base = Math.random();
                let coefficient;
                
                if (base < 0.75) {
                    coefficient = 1 + Math.random() * 2; // 1.0 - 3.0 (75% de chance)
                } else if (base < 0.92) {
                    coefficient = 3 + Math.random() * 5; // 3.0 - 8.0 (17% de chance)
                } else {
                    coefficient = 8 + Math.random() * 42; // 8.0 - 50.0 (8% de chance)
                }
                
                return coefficient.toFixed(2);
            }

            displayResult(coefficient) {
                this.predictionValue.textContent = `${coefficient}x`;
                this.predictionValue.style.transform = 'scale(1.1)';
                
                setTimeout(() => {
                    this.predictionValue.style.transform = 'scale(1)';
                }, 300);
            }

            setLoadingState(loading) {
                if (loading) {
                    this.predictionCircle.classList.add('loading');
                    this.generateBtn.disabled = true;
                    this.btnText.innerHTML = `
                        ${this.translations[this.language].generate}
                        <div class="loading-dots" style="margin-left: 8px;">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    `;
                } else {
                    this.predictionCircle.classList.remove('loading');
                    this.generateBtn.disabled = false;
                    this.btnText.textContent = this.translations[this.language].generate;
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
                this.showStatus(this.translations[this.language].returning, 1000);
                setTimeout(() => {
                    if (window.history.length > 1) {
                        window.history.back();
                    } else {
                        window.close();
                    }
                }, 500);
            }

            delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            new AviatorPredictor();
        });

        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transform = 'translateY(20px)';
            document.body.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
                document.body.style.transform = 'translateY(0)';
            }, 100);
        });
