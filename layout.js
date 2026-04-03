document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate on Scroll)
    if (window.AOS) {
        window.AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // 2. Premium Magnetic Cursor Blob
    const blob = document.getElementById('cursor-blob');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = mouseX;
    let blobY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateBlob = () => {
        // Smooth interpolation (lerp)
        blobX += (mouseX - blobX) * 0.1;
        blobY += (mouseY - blobY) * 0.1;
        
        blob.style.transform = `translate(${blobX}px, ${blobY}px)`;
        requestAnimationFrame(animateBlob);
    };
    animateBlob();

    // 3. Optimized Counter Animation
    const counters = document.querySelectorAll('.counter');
    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const update = () => {
                    current += step;
                    if (current < target) {
                        entry.target.innerText = Math.floor(current);
                        requestAnimationFrame(update);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                update();
                observer.unobserve(entry.target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(animateCounters, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // 4. Header Scroll Effect
    const navbar = document.querySelector('.sticky-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // 5. Active Link Tracking
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('is-active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('is-active');
            }
        });
    });

    // 6. Signal Visual Interaction
    const signalVisual = document.querySelector('.hero-signal-visual');
    if (signalVisual) {
        signalVisual.addEventListener('mousemove', (e) => {
            const rect = signalVisual.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Subtle tilt effect
            const moveX = (x / rect.width - 0.5) * 10;
            const moveY = (y / rect.height - 0.5) * 10;
            
            signalVisual.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
        });

        signalVisual.addEventListener('mouseleave', () => {
            signalVisual.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
        });
    }
});