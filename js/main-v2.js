// Hudson Skincare V2 - Enhanced Premium Interactions
// Inspired by Shiseido, Aestura, Dr. Loretta, Face Reality
// Pharmaceutical Heritage & Luxury Experience

class HudsonSkincarePremium {
    constructor() {
        this.isLoading = true;
        this.scrollPosition = 0;
        this.isMobile = window.innerWidth <= 768;
        this.animationElements = new Map();
        this.particles = [];
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupEventListeners();
        this.initNavigation();
        this.initHeroAnimations();
        this.initScrollAnimations();
        this.initProductInteractions();
        this.initSearchFunctionality();
        this.initParticleSystem();
        this.initCounterAnimations();
        this.setupIntersectionObserver();
        this.initPreloader();
    }

    // === LOADING SCREEN ===
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingProgress = document.querySelector('.loading-progress');
        
        if (!loadingScreen) return;

        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    this.isLoading = false;
                    this.startHeroAnimations();
                }, 500);
            }
            
            if (loadingProgress) {
                loadingProgress.style.width = `${progress}%`;
            }
        }, 100);

        // Fallback - ensure loading screen disappears
        setTimeout(() => {
            if (this.isLoading) {
                loadingScreen.classList.add('hidden');
                this.isLoading = false;
                this.startHeroAnimations();
            }
        }, 3000);
    }

    initPreloader() {
        // Preload critical images for smooth experience
        const criticalImages = [
            'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600&q=80',
            'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // === EVENT LISTENERS ===
    setupEventListeners() {
        // Navigation
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        const searchToggle = document.querySelector('.search-toggle');
        const searchOverlay = document.getElementById('searchOverlay');
        const searchClose = document.querySelector('.search-close');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        if (searchToggle && searchOverlay) {
            searchToggle.addEventListener('click', () => this.toggleSearch());
        }

        if (searchClose && searchOverlay) {
            searchClose.addEventListener('click', () => this.closeSearch());
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });

        // Window events
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Button interactions
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', (e) => this.addButtonHover(e.target));
            btn.addEventListener('mouseleave', (e) => this.removeButtonHover(e.target));
            btn.addEventListener('click', (e) => this.handleButtonClick(e));
        });

        // Product interactions
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mouseenter', () => this.animateProductCard(card, 'enter'));
            card.addEventListener('mouseleave', () => this.animateProductCard(card, 'leave'));
        });

        // Quick view buttons
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openQuickView(btn.closest('.product-card'));
            });
        });
    }

    // === NAVIGATION ===
    initNavigation() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        // Add scroll effect
        this.updateNavbarOnScroll();
    }

    toggleMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (menuToggle && navMenu) {
            const isOpen = navMenu.classList.contains('active');
            
            if (isOpen) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                navMenu.classList.add('active');
                menuToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    }

    updateNavbarOnScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // === SEARCH ===
    initSearchFunctionality() {
        const searchInput = document.querySelector('.search-input');
        if (!searchInput) return;

        searchInput.addEventListener('input', this.debounce((e) => {
            this.handleSearch(e.target.value);
        }, 300));

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch(e.target.value);
            }
        });
    }

    toggleSearch() {
        const searchOverlay = document.getElementById('searchOverlay');
        const searchInput = document.querySelector('.search-input');
        
        if (searchOverlay) {
            searchOverlay.classList.add('active');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 300);
            }
        }
    }

    closeSearch() {
        const searchOverlay = document.getElementById('searchOverlay');
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    }

    handleSearch(query) {
        if (!query.trim()) return;
        
        // Implement search suggestions here
        console.log('Searching for:', query);
        this.trackEvent('Search', 'Query', query);
    }

    performSearch(query) {
        if (!query.trim()) return;
        
        console.log('Performing search for:', query);
        this.trackEvent('Search', 'Submit', query);
        this.closeSearch();
        
        // In production, this would redirect to search results
        alert(`Search results for: "${query}"`);
    }

    // === HERO ANIMATIONS ===
    initHeroAnimations() {
        // Initialize hero elements for animation
        const heroElements = {
            title1: document.querySelector('.title-line-1'),
            title2: document.querySelector('.title-line-2'),
            subtitle: document.querySelector('.hero-subtitle'),
            cta: document.querySelector('.hero-cta'),
            stats: document.querySelector('.hero-stats'),
            scrollIndicator: document.querySelector('.scroll-indicator')
        };

        // Store references for later animation
        this.heroElements = heroElements;
    }

    startHeroAnimations() {
        if (!this.heroElements) return;

        // Enhanced entrance animations with stagger effect
        const timeline = [
            { element: this.heroElements.title1, delay: 500 },
            { element: this.heroElements.title2, delay: 800 },
            { element: this.heroElements.subtitle, delay: 1200 },
            { element: this.heroElements.cta, delay: 1500 },
            { element: this.heroElements.stats, delay: 1800 },
            { element: this.heroElements.scrollIndicator, delay: 2500 }
        ];

        timeline.forEach(({ element, delay }) => {
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }

    // === SCROLL ANIMATIONS ===
    initScrollAnimations() {
        // Add scroll-triggered animations
        this.observedElements = document.querySelectorAll(
            '.timeline-item, .principle-item, .process-step, .product-card, .topic-item, .layer'
        );

        this.observedElements.forEach(el => {
            el.classList.add('scroll-animate');
        });
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Trigger counter animations for stats
                    if (entry.target.classList.contains('professional-stats')) {
                        this.animateCounters(entry.target);
                    }
                }
            });
        }, options);

        // Observe elements
        this.observedElements.forEach(el => {
            this.observer.observe(el);
        });

        // Observe stats sections
        document.querySelectorAll('.hero-stats, .professional-stats').forEach(el => {
            this.observer.observe(el);
        });
    }

    // === COUNTER ANIMATIONS ===
    initCounterAnimations() {
        this.counters = document.querySelectorAll('[data-count]');
    }

    animateCounters(container) {
        const counters = container.querySelectorAll('[data-count], .stat-number');
        
        counters.forEach(counter => {
            const target = counter.dataset.count || counter.textContent.replace(/\D/g, '');
            const finalValue = parseInt(target);
            
            if (isNaN(finalValue)) return;
            
            this.animateCounter(counter, finalValue);
        });
    }

    animateCounter(element, finalValue) {
        if (element.hasAttribute('data-animated')) return;
        element.setAttribute('data-animated', 'true');

        const duration = 2000;
        const steps = 60;
        const stepValue = finalValue / steps;
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += stepValue;
            
            if (currentValue >= finalValue) {
                element.textContent = finalValue.toString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(currentValue).toString();
            }
        }, duration / steps);
    }

    // === PARTICLE SYSTEM ===
    initParticleSystem() {
        if (this.isMobile) return; // Skip particles on mobile for performance
        
        const heroProduct = document.querySelector('.hero-product');
        if (!heroProduct) return;

        this.createParticles();
        this.animateParticles();
    }

    createParticles() {
        const particleContainer = document.querySelector('.product-particles');
        if (!particleContainer) return;

        // Create additional floating particles
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: var(--accent-gold);
                border-radius: 50%;
                opacity: ${Math.random() * 0.6 + 0.2};
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
            `;
            
            particleContainer.appendChild(particle);
            this.particles.push({
                element: particle,
                x: Math.random() * 100,
                y: Math.random() * 100,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2
            });
        }
    }

    animateParticles() {
        if (!this.particles.length) return;

        const animate = () => {
            this.particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Bounce off edges
                if (particle.x <= 0 || particle.x >= 100) particle.speedX *= -1;
                if (particle.y <= 0 || particle.y >= 100) particle.speedY *= -1;
                
                particle.element.style.left = `${particle.x}%`;
                particle.element.style.top = `${particle.y}%`;
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    // === PRODUCT INTERACTIONS ===
    initProductInteractions() {
        // Enhanced product card animations
        document.querySelectorAll('.hero-product-card').forEach(card => {
            card.addEventListener('mouseenter', () => this.enhanceProductCard(card));
            card.addEventListener('mouseleave', () => this.resetProductCard(card));
        });

        // Ingredient spotlight interactions
        document.querySelectorAll('.ingredient-item').forEach(item => {
            item.addEventListener('click', () => this.showIngredientDetails(item));
        });
    }

    animateProductCard(card, action) {
        const image = card.querySelector('img');
        const overlay = card.querySelector('.product-overlay');
        
        if (action === 'enter') {
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            if (overlay) {
                overlay.style.opacity = '1';
            }
            this.trackEvent('Product', 'Hover', this.getProductName(card));
        } else {
            if (image) {
                image.style.transform = 'scale(1)';
            }
            if (overlay) {
                overlay.style.opacity = '0';
            }
        }
    }

    enhanceProductCard(card) {
        const glowEffect = card.querySelector('.product-glow-effect');
        if (glowEffect) {
            glowEffect.style.opacity = '0.3';
            glowEffect.style.filter = 'blur(30px)';
        }
    }

    resetProductCard(card) {
        const glowEffect = card.querySelector('.product-glow-effect');
        if (glowEffect) {
            glowEffect.style.opacity = '0.1';
            glowEffect.style.filter = 'blur(20px)';
        }
    }

    openQuickView(card) {
        const productName = this.getProductName(card);
        
        // Enhanced quick view modal (simplified for demo)
        const modalContent = `
            <div class="quick-view-modal">
                <div class="modal-content">
                    <h3>${productName}</h3>
                    <p>Detailed product information would be displayed here.</p>
                    <div class="modal-features">
                        <div class="feature">✓ Dermatologist Tested</div>
                        <div class="feature">✓ Pharmaceutical Grade</div>
                        <div class="feature">✓ Non-Comedogenic</div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-primary">Add to Cart</button>
                        <button class="btn btn-outline modal-close">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        // Create modal
        const modal = document.createElement('div');
        modal.innerHTML = modalContent;
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Close functionality
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
        }
        
        this.trackEvent('Product', 'Quick View', productName);
    }

    showIngredientDetails(item) {
        const ingredientName = item.querySelector('span').textContent;
        
        // Simple ingredient spotlight
        alert(`${ingredientName}\n\nDetailed information about this pharmaceutical-grade ingredient would be displayed here, including:\n\n• Mechanism of action\n• Clinical benefits\n• Scientific studies\n• Safety profile`);
        
        this.trackEvent('Ingredient', 'Details', ingredientName);
    }

    // === BUTTON INTERACTIONS ===
    addButtonHover(button) {
        if (this.isMobile) return;
        
        button.style.transform = 'translateY(-2px)';
    }

    removeButtonHover(button) {
        if (this.isMobile) return;
        
        button.style.transform = 'translateY(0)';
    }

    handleButtonClick(e) {
        const button = e.currentTarget;
        const buttonText = button.textContent.trim();
        
        // Add click animation
        button.style.transform = 'scale(0.98)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Track different button types
        this.trackButtonInteraction(buttonText, button);
    }

    trackButtonInteraction(text, button) {
        const buttonTypes = {
            'Discover Our Story': { category: 'Hero', action: 'Discover Story' },
            'Watch Our Journey': { category: 'Hero', action: 'Watch Video' },
            'Shop': { category: 'Navigation', action: 'Shop' },
            'Add to Cart': { category: 'Product', action: 'Add to Cart' },
            'Explore Resources': { category: 'Education', action: 'Explore' },
            'Professional Resources': { category: 'Professional', action: 'Resources' },
            'Shop Collections': { category: 'CTA', action: 'Shop Collections' },
            'Book Consultation': { category: 'CTA', action: 'Book Consultation' }
        };
        
        const tracking = buttonTypes[text] || { category: 'Button', action: text };
        this.trackEvent(tracking.category, tracking.action, window.location.pathname);
    }

    // === SCROLL HANDLING ===
    handleScroll() {
        this.scrollPosition = window.pageYOffset;
        
        // Update navbar
        this.updateNavbarOnScroll();
        
        // Parallax effects (desktop only)
        if (!this.isMobile) {
            this.updateParallaxEffects();
        }
        
        // Progress indicator
        this.updateScrollProgress();
    }

    updateParallaxEffects() {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage && this.scrollPosition < window.innerHeight) {
            const speed = this.scrollPosition * 0.3;
            heroImage.style.transform = `translateY(${speed}px)`;
        }
    }

    updateScrollProgress() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = this.scrollPosition;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        
        // Create progress bar if it doesn't exist
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: var(--accent-gold);
                z-index: 9999;
                transition: width 0.1s ease;
                pointer-events: none;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = `${Math.min(scrollPercent * 100, 100)}%`;
    }

    // === UTILITIES ===
    smoothScrollTo(target) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        
        // Close mobile menu on resize to desktop
        if (wasMobile && !this.isMobile) {
            const navMenu = document.getElementById('navMenu');
            const menuToggle = document.getElementById('menuToggle');
            
            if (navMenu && menuToggle) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Reinitialize particles if switching to desktop
        if (wasMobile && !this.isMobile) {
            this.initParticleSystem();
        }
    }

    getProductName(card) {
        const nameElement = card.querySelector('.product-name, h4, h3');
        return nameElement ? nameElement.textContent.trim() : 'Unknown Product';
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    trackEvent(category, action, label = '') {
        // Enhanced analytics tracking
        console.log(`📊 Event: ${category} | ${action} | ${label}`);
        
        // Integration with Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                custom_map: { 'brand': 'Hudson Skincare' }
            });
        }
        
        // Integration with Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', action, {
                content_category: category,
                content_name: label
            });
        }
    }

    // === PERFORMANCE MONITORING ===
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
                    
                    console.log(`⚡ Performance Metrics:
                        - Page Load: ${Math.round(loadTime)}ms
                        - DOM Ready: ${Math.round(domContentLoaded)}ms
                        - First Paint: ${Math.round(performance.getEntriesByType('paint')[0]?.startTime || 0)}ms`);
                    
                    this.trackEvent('Performance', 'Page Load Time', `${Math.round(loadTime)}ms`);
                    
                    // Track Core Web Vitals
                    this.measureCoreWebVitals();
                }, 0);
            });
        }
    }

    measureCoreWebVitals() {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log(`🎯 LCP: ${Math.round(lastEntry.startTime)}ms`);
        }).observe({type: 'largest-contentful-paint', buffered: true});

        // First Input Delay
        new PerformanceObserver((entryList) => {
            const firstInput = entryList.getEntries()[0];
            if (firstInput) {
                const fid = firstInput.processingStart - firstInput.startTime;
                console.log(`⚡ FID: ${Math.round(fid)}ms`);
            }
        }).observe({type: 'first-input', buffered: true});
    }
}

// Initialize the enhanced Hudson experience
document.addEventListener('DOMContentLoaded', () => {
    const hudsonExperience = new HudsonSkincarePremium();
    
    // Performance monitoring
    hudsonExperience.measurePerformance();
    
    // Global error handling
    window.addEventListener('error', (event) => {
        console.error('Hudson Website Error:', event.error);
        hudsonExperience.trackEvent('Error', 'JavaScript Error', event.error.message);
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HudsonSkincarePremium;
}