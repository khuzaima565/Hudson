// Hudson Skincare - Premium Website JavaScript
// Author: Created for Hudson Skincare Prototype
// Version: 1.0.0

class HudsonWebsite {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                this.initAnimations();
                this.initNavigation();
                this.initScrollEffects();
                this.initProductInteractions();
            });
        } else {
            this.setupEventListeners();
            this.initAnimations();
            this.initNavigation();
            this.initScrollEffects();
            this.initProductInteractions();
        }
    }

    setupEventListeners() {
        // Navigation toggle for mobile
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });

        // Search functionality
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.handleSearch());
        }

        // CTA buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCTAClick(e));
        });

        // Window scroll event
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

        // Window resize event
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    toggleMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            const isOpen = navMenu.classList.contains('active');
            
            if (isOpen) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            } else {
                navMenu.classList.add('active');
                menuToggle.classList.add('active');
                document.body.classList.add('menu-open');
            }
        }
    }

    smoothScrollTo(target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    handleSearch() {
        // Simple search modal implementation
        const searchQuery = prompt('Search for products, ingredients, or information:');
        if (searchQuery && searchQuery.trim()) {
            console.log(`Searching for: ${searchQuery}`);
            // In a real implementation, this would trigger actual search functionality
            alert(`Search functionality would look for: "${searchQuery}"`);
        }
    }

    handleCTAClick(e) {
        const button = e.currentTarget;
        const buttonText = button.textContent.trim();
        
        // Add click animation
        button.style.transform = 'scale(0.98)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        // Handle different CTA types
        switch (buttonText) {
            case 'Explore Products':
                this.trackEvent('CTA Click', 'Explore Products', 'Hero Section');
                break;
            case 'Our Science':
                this.trackEvent('CTA Click', 'Our Science', 'Hero Section');
                break;
            case 'Shop Now':
                this.trackEvent('CTA Click', 'Shop Now', 'Navigation/CTA');
                break;
            case 'Learn Our Science':
                this.trackEvent('CTA Click', 'Learn Our Science', 'Science Section');
                break;
            case 'Find a Dermatologist':
                this.trackEvent('CTA Click', 'Find a Dermatologist', 'Dermatologist Section');
                break;
            case 'Consult a Dermatologist':
                this.trackEvent('CTA Click', 'Consult a Dermatologist', 'CTA Section');
                break;
        }
    }

    initNavigation() {
        const navbar = document.querySelector('.navbar');
        
        // Add scroll effect to navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    initScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.product-item, .ingredient-card, .feature-item, .testimonial-card').forEach(el => {
            observer.observe(el);
        });

        // Stats counter animation
        this.initStatsCounter();
    }

    initStatsCounter() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(statNumber => {
                        this.animateCounter(statNumber);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const heroStats = document.querySelector('.hero-stats');
        const recommendationStats = document.querySelector('.recommendation-stats');
        
        if (heroStats) statsObserver.observe(heroStats);
        if (recommendationStats) statsObserver.observe(recommendationStats);
    }

    animateCounter(element) {
        const target = element.textContent.trim();
        const isNumber = !isNaN(target);
        
        if (isNumber) {
            const finalValue = parseInt(target);
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepValue = finalValue / steps;
            let currentValue = 0;
            
            const timer = setInterval(() => {
                currentValue += stepValue;
                if (currentValue >= finalValue) {
                    element.textContent = target; // Restore original text
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(currentValue).toString();
                }
            }, duration / steps);
        }
    }

    initProductInteractions() {
        // Product hover effects
        document.querySelectorAll('.product-item').forEach(product => {
            const quickView = product.querySelector('.quick-view');
            
            if (quickView) {
                quickView.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showProductQuickView(product);
                });
            }
        });

        // Ingredient card interactions
        document.querySelectorAll('.ingredient-card').forEach(card => {
            card.addEventListener('click', () => {
                this.showIngredientDetails(card);
            });
        });
    }

    showProductQuickView(productElement) {
        const productName = productElement.querySelector('.product-name')?.textContent;
        const productType = productElement.querySelector('.product-type')?.textContent;
        const productPrice = productElement.querySelector('.current-price')?.textContent;
        
        // Simple modal-like alert (in production, this would be a proper modal)
        const productInfo = `
Product: ${productName}
Type: ${productType}
Price: ${productPrice}

This would open a detailed product view with:
- High-resolution images
- Complete ingredient list
- Clinical study results
- Dermatologist recommendations
- Customer reviews
        `.trim();
        
        alert(productInfo);
        this.trackEvent('Product Interaction', 'Quick View', productName);
    }

    showIngredientDetails(cardElement) {
        const ingredientName = cardElement.querySelector('.ingredient-name')?.textContent;
        const ingredientDesc = cardElement.querySelector('.ingredient-description')?.textContent;
        
        // Simple modal-like alert (in production, this would be a proper modal)
        const ingredientInfo = `
${ingredientName}

${ingredientDesc}

Clinical Benefits:
- Scientifically proven efficacy
- Dermatologist tested
- Minimal irritation profile
- Pharmaceutical-grade purity

This would open detailed ingredient science page.
        `.trim();
        
        alert(ingredientInfo);
        this.trackEvent('Ingredient Interaction', 'Details View', ingredientName);
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero::before');
        
        // Parallax effect for hero background
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }

        // Progress indicator
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        
        // Update progress bar if it exists
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = `${scrollPercent * 100}%`;
        }
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (navMenu && menuToggle) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    }

    initAnimations() {
        // Add CSS classes for animations
        const style = document.createElement('style');
        style.textContent = `
            .product-item,
            .ingredient-card,
            .feature-item,
            .testimonial-card {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .product-item.animate-in,
            .ingredient-card.animate-in,
            .feature-item.animate-in,
            .testimonial-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .navbar.scrolled {
                background: rgba(255, 255, 255, 0.98);
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            }
            
            .menu-open {
                overflow: hidden;
            }
            
            @media (max-width: 768px) {
                .nav-menu {
                    position: fixed;
                    top: 70px;
                    left: 0;
                    right: 0;
                    background: white;
                    flex-direction: column;
                    padding: 32px 24px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                    z-index: 999;
                }
                
                .nav-menu.active {
                    transform: translateY(0);
                    opacity: 1;
                }
                
                .nav-menu .nav-link {
                    padding: 16px 0;
                    border-bottom: 1px solid var(--border-color);
                    font-size: 18px;
                }
                
                .menu-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .menu-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .menu-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            }
            
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: var(--accent-color);
                z-index: 9999;
                transition: width 0.3s ease;
            }
        `;
        document.head.appendChild(style);

        // Add scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }

    // Utility functions
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
        // Analytics tracking (would integrate with Google Analytics, etc.)
        console.log(`Event Tracked: ${category} | ${action} | ${label}`);
        
        // Example Google Analytics integration:
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', action, {
        //         event_category: category,
        //         event_label: label
        //     });
        // }
    }

    // Performance monitoring
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    console.log(`Page load time: ${loadTime}ms`);
                    this.trackEvent('Performance', 'Page Load Time', `${Math.round(loadTime)}ms`);
                }, 0);
            });
        }
    }
}

// Initialize the website
const hudsonWebsite = new HudsonWebsite();

// Performance monitoring
hudsonWebsite.measurePerformance();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HudsonWebsite;
}