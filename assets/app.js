import './bootstrap.js';
import './styles/app.css';

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.site-nav');

    if (navToggle && nav) {
        const toggleNav = () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('is-open', !expanded);
        };

        navToggle.addEventListener('click', () => {
            toggleNav();
        });

        nav.addEventListener('click', (event) => {
            if (event.target instanceof HTMLAnchorElement && nav.classList.contains('is-open')) {
                toggleNav();
            }
        });
    }

    const animatedElements = document.querySelectorAll('[data-animate]');

    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        const delay = target.getAttribute('data-delay');

                        if (delay) {
                            target.style.transitionDelay = `${Number(delay) / 1000}s`;
                        }

                        target.classList.add('is-visible');
                        observer.unobserve(target);
                    }
                });
            },
            {
                threshold: 0.2,
            },
        );

        animatedElements.forEach((element) => observer.observe(element));
    } else {
        animatedElements.forEach((element) => element.classList.add('is-visible'));
    }

    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#' || targetId.length <= 1) {
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', targetId);
            }
        });
    });
});
