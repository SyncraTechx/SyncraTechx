document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar-wrapper');
    const toggle = document.querySelector('.navbar-toggle');
    const mobileMenu = document.querySelector('.navbar-mobile-menu');
    const desktopLinks = document.querySelectorAll('.navbar-menu a');
    const mobileLinks = document.querySelectorAll('.navbar-mobile-menu a');

    if (!navbar) {
        return;
    }

    const setMenuState = (isOpen) => {
        if (!toggle || !mobileMenu) {
            return;
        }

        toggle.classList.toggle('active', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        mobileMenu.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
    };

    const normalizeHref = (href) => {
        if (!href) {
            return 'index.html';
        }

        const [pathPart, hashPart = ''] = href.split('#');
        const cleanPath = pathPart.split('?')[0];
        const filename = cleanPath.split('/').pop() || 'index.html';
        return `${filename}${hashPart ? `#${hashPart}` : ''}`;
    };

    const syncActiveLinks = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const currentHash = window.location.hash || '';
        const currentRoute = `${currentPage}${currentHash}`;

        [...desktopLinks, ...mobileLinks].forEach((link) => {
            const normalized = normalizeHref(link.getAttribute('href'));
            const isHome = currentPage === 'index.html' || currentPage === '';
            const isMatch = normalized === currentRoute
                || (!currentHash && normalized === currentPage)
                || (isHome && !currentHash && normalized === 'index.html');

            link.classList.toggle('active', isMatch);
        });
    };

    const handleScroll = () => {
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
    };

    toggle?.addEventListener('click', () => {
        const isOpen = !toggle.classList.contains('active');
        setMenuState(isOpen);
    });

    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => setMenuState(false));
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            setMenuState(false);
        }
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', syncActiveLinks);
    syncActiveLinks();
    handleScroll();
});
