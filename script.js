document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-ready');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const expanded = navLinks.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', String(expanded));
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon && icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.sticky-nav');
        if (!navbar) {
            return;
        }
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = target / speed;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => startCounter(counter));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    const revealCards = document.querySelectorAll('.card, .case-card, .industry-card, .security-card, .stat-box, .tech-column, .process-step');
    if (revealCards.length) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('card-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.16,
            rootMargin: '0px 0px -40px 0px'
        });

        revealCards.forEach((card, index) => {
            card.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
            revealObserver.observe(card);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') {
                return;
            }
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const blob = document.getElementById('cursor-blob');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const blobDisabled = !blob || prefersReducedMotion || window.innerWidth < 768;

    if (!blobDisabled) {
        const blobSize = 420;
        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 3;
        let currentX = targetX;
        let currentY = targetY;

        const lerp = (start, end, factor) => start + (end - start) * factor;

        const handleMouseMove = (event) => {
            targetX = event.clientX;
            targetY = event.clientY;
        };

        const animateBlob = () => {
            currentX = lerp(currentX, targetX, 0.08);
            currentY = lerp(currentY, targetY, 0.08);
            const x = currentX - blobSize / 2;
            const y = currentY - blobSize / 2;
            blob.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            requestAnimationFrame(animateBlob);
        };

        document.addEventListener('mousemove', handleMouseMove);
        animateBlob();
    } else if (blob) {
        blob.style.display = 'none';
    }

    if (window.AOS) {
        window.AOS.init({
            duration: 500,
            once: true,
            offset: 120,
            easing: 'ease-out-cubic'
        });
    }
});
