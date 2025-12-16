
        const EkaterinburgHelplinesAPI = {
            getAllHelplines: function() {
                return {
                    success: true,
                    last_updated: "2024-01-15",
                    count: 12,
                    data: [
                        {
                            id: 1,
                            name: "Кризисный центр для женщин",
                            organization: "ГБУ СОН СО 'Кризисный центр'",
                            phone: "+7 (343) 385-73-83",
                            phone_secondary: "8-800-100-83-05",
                            hours: "круглосуточно",
                            description: "Психологическая, юридическая и социальная помощь женщинам, пострадавшим от насилия. Конфиденциально, бесплатно.",
                            address: "Екатеринбург, ул. Белинского, 14",
                            website: "https://krizis-centr.ru",
                            specialization: ["домашнее насилие", "женщины", "кризисная помощь"],
                            verified: true
                        },
                        {
                            id: 2,
                            name: "Телефон доверия психологической помощи",
                            organization: "МБУ 'Центр социально-психологической помощи'",
                            phone: "+7 (343) 307-40-40",
                            hours: "круглосуточно",
                            description: "Анонимная психологическая поддержка в кризисных ситуациях. Консультации психологов.",
                            address: "Екатеринбург, ул. 8 Марта, 78а",
                            specialization: ["психологическая помощь", "кризис", "поддержка"],
                            verified: true
                        },
                        {
                            id: 3,
                            name: "Детский телефон доверия",
                            organization: "Фонд поддержки детей в трудной жизненной ситуации",
                            phone: "8-800-2000-122",
                            hours: "круглосуточно",
                            description: "Бесплатная анонимная помощь детям, подросткам и их родителям. Конфликты, насилие, буллинг.",
                            website: "https://telefon-doveria.ru",
                            specialization: ["дети", "подростки", "родители", "буллинг"],
                            verified: true
                        },
                        {
                            id: 4,
                            name: "Горячая линия для женщин",
                            organization: "Всероссийское движение 'Помощь женщинам'",
                            phone: "8-800-7000-600",
                            hours: "круглосуточно",
                            description: "Всероссийский телефон доверия для женщин, подвергшихся домашнему насилию. Юридическая консультация.",
                            specialization: ["домашнее насилие", "женщины", "юридическая помощь"],
                            verified: true
                        },
                        {
                            id: 5,
                            name: "Телефон доверия УМВД",
                            organization: "Управление МВД России по Екатеринбургу",
                            phone: "+7 (343) 358-71-61",
                            phone_secondary: "102",
                            hours: "круглосуточно",
                            description: "Прием сообщений о фактах насилия, жестокого обращения, правонарушениях. Экстренный вызов полиции.",
                            address: "Екатеринбург, ул. Ленина, 55",
                            specialization: ["полиция", "правонарушения", "экстренная помощь"],
                            verified: true
                        },
                        {
                            id: 6,
                            name: "Центр социально-психологической помощи 'Диалог'",
                            organization: "МАУ 'ЦСПП 'Диалог'",
                            phone: "+7 (343) 251-29-04",
                            hours: "пн-пт 9:00-18:00, сб 10:00-15:00",
                            description: "Консультации психологов, социальных работников, юристов. Группы поддержки, тренинги.",
                            address: "Екатеринбург, ул. 8 Марта, 55",
                            website: "https://dialog-edu.ru",
                            specialization: ["психологи", "юристы", "группы поддержки"],
                            verified: true
                        }
                    ]
                };
            }
        };

        class PageNavigation {
            constructor() {
                this.currentPage = 'home';
                this.pages = document.querySelectorAll('.page-content');
                this.navLinks = document.querySelectorAll('.nav-link');
                this.init();
            }
            
            init() {
                this.loadHelplines();
                
                this.navLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const page = link.getAttribute('data-page');
                        this.navigateTo(page);
                        const nav = document.getElementById('mainNav');
                        nav.classList.remove('show');
                    });
                });

                document.querySelectorAll('button[data-page]').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const page = button.getAttribute('data-page');
                        this.navigateTo(page);
                    });
                });

                document.querySelectorAll('.read-more').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const article = link.getAttribute('data-article');
                        this.showArticle(article);
                    });
                });

                document.getElementById('mobileMenuBtn').addEventListener('click', () => {
                    const nav = document.getElementById('mainNav');
                    nav.classList.toggle('show');
                });

                document.getElementById('sendMessageBtn').addEventListener('click', () => {
                    this.sendContactMessage();
                });
            }
            
            navigateTo(page) {
                this.pages.forEach(p => p.classList.remove('active'));

                const targetPage = document.getElementById(page);
                if (targetPage) {
                    targetPage.classList.add('active');
                    this.currentPage = page;
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-page') === page) {
                            link.classList.add('active');
                        }
                    });
                    window.scrollTo(0, 0);
                    if (page === 'helplines') {
                        this.loadHelplines();
                    }
                }
            }
            
            loadHelplines() {
                const helplinesContainer = document.getElementById('helplinesContainer');
                if (!helplinesContainer) return;
                
                helplinesContainer.innerHTML = '<div class="loading"><div class="loading-spinner"></div><p>Загружаем информацию о телефонах доверия...</p></div>';
                setTimeout(() => {
                    const apiData = EkaterinburgHelplinesAPI.getAllHelplines();
                    this.displayHelplines(apiData.data);
                }, 800);
            }
            
            displayHelplines(helplines) {
                const container = document.getElementById('helplinesContainer');
                if (!container) return;
                
                container.innerHTML = '';
                
                helplines.forEach(helpline => {
                    const card = document.createElement('div');
                    card.className = 'helpline-card';
                    card.innerHTML = `
                        <h3><i class="fas fa-phone-alt"></i> ${helpline.name}</h3>
                        <div class="phone">${helpline.phone}</div>
                        ${helpline.phone_secondary ? `<div class="phone" style="color: var(--secondary-color); font-size: 1.2rem;">${helpline.phone_secondary}</div>` : ''}
                        <div class="hours"><i class="far fa-clock"></i> ${helpline.hours}</div>
                        <p>${helpline.description}</p>
                        ${helpline.address ? `<p><i class="fas fa-map-marker-alt"></i> ${helpline.address}</p>` : ''}
                        <div style="margin-top: 1rem;">
                            <button class="cta-button" style="padding: 8px 20px; font-size: 0.9rem;" onclick="callNumber('${helpline.phone}')">
                                <i class="fas fa-phone"></i> Позвонить
                            </button>
                            ${helpline.website ? `<a href="${helpline.website}" target="_blank" class="secondary-button" style="margin-left: 10px; padding: 8px 15px;"><i class="fas fa-external-link-alt"></i> Сайт</a>` : ''}
                        </div>
                    `;
                    container.appendChild(card);
                });
            }
            
            showArticle(articleId) {
                alert(`Открывается статья: "${articleId}". В реальном приложении здесь будет загрузка полного текста статьи.`);
            }
            
            sendContactMessage() {
                const name = document.getElementById('contactName').value;
                const email = document.getElementById('contactEmail').value;
                const message = document.getElementById('contactMessage').value;
                
                if (!name || !email || !message) {
                    alert('Пожалуйста, заполните все поля формы.');
                    return;
                }
                alert(`Спасибо, ${name}! Ваше сообщение отправлено. Мы свяжемся с вами по email ${email} в ближайшее время.`);
                document.getElementById('contactName').value = '';
                document.getElementById('contactEmail').value = '';
                document.getElementById('contactMessage').value = '';
            }
        }
        document.addEventListener('DOMContentLoaded', () => {
            const navigation = new PageNavigation();
            initModals();
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                navigation.navigateTo(hash);
            }
        });
        function initModals() {
            const emergencyBtn = document.getElementById('emergencyBtn');
            const emergencyModal = document.getElementById('emergencyModal');
            const closeModalButtons = document.querySelectorAll('.close-modal');
            
            if (emergencyBtn && emergencyModal) {
                emergencyBtn.addEventListener('click', () => openModal(emergencyModal));
            }
            
            closeModalButtons.forEach(button => {
                button.addEventListener('click', closeAllModals);
            });
            
            window.addEventListener('click', (event) => {
                if (event.target.classList.contains('modal')) {
                    closeAllModals();
                }
            });
        }

        function openModal(modal) {
            document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeAllModals() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }

        function openSafetyPlanModal() {
            alert('Открывается модальное окно плана безопасности. В полной версии здесь будет функционал из предыдущего кода.');
        }

        function openRelaxationModal() {
            alert('Открывается модальное окно техник релаксации. В полной версии здесь будет функционал из предыдущего кода.');
        }

        function openJournalModal() {
            alert('Открывается модальное окно дневника эмоций. В полной версии здесь будет функционал из предыдущего кода.');
        }

        function callNumber(phoneNumber) {
            alert(`Имитация звонка на номер: ${phoneNumber}\n\nВ реальном приложении здесь будет инициирован настоящий звонок.`);
        }
