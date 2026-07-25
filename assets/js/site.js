(() => {
  'use strict';

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  const closeNavigation = () => {
    if (!toggle || !nav) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open site navigation');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close site navigation' : 'Open site navigation');
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        closeNavigation();
        toggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (!nav.classList.contains('open')) return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeNavigation();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeNavigation();
    });
  }

  const topButton = document.querySelector('.back-to-top');
  if (topButton) {
    const updateButton = () => topButton.classList.toggle('visible', window.scrollY > 500);
    window.addEventListener('scroll', updateButton, { passive: true });
    updateButton();
    topButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.querySelector('main')?.focus({ preventScroll: true });
    });
  }

  document.querySelectorAll('[data-current-year]').forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
  const previousButton = document.querySelector('[data-hero-previous]');
  const nextButton = document.querySelector('[data-hero-next]');
  const toggleButton = document.querySelector('[data-hero-toggle]');

  if (heroSlides.length > 1) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentSlide = 0;
    let timer = null;
    let paused = reducedMotion.matches;

    const showSlide = (index) => {
      currentSlide = (index + heroSlides.length) % heroSlides.length;
      heroSlides.forEach((slide, slideIndex) => {
        const active = slideIndex === currentSlide;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
    };

    const updateToggle = () => {
      if (!toggleButton) return;
      toggleButton.textContent = paused ? 'Play' : 'Pause';
      toggleButton.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
      toggleButton.setAttribute('aria-pressed', String(paused));
    };

    const stopTimer = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    const startTimer = () => {
      stopTimer();
      if (!paused && !document.hidden) {
        timer = window.setInterval(() => showSlide(currentSlide + 1), 6000);
      }
    };

    const setPaused = (value) => {
      paused = value;
      updateToggle();
      startTimer();
    };

    previousButton?.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      startTimer();
    });

    nextButton?.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      startTimer();
    });

    toggleButton?.addEventListener('click', () => setPaused(!paused));

    document.addEventListener('visibilitychange', startTimer);
    reducedMotion.addEventListener?.('change', (event) => setPaused(event.matches));

    showSlide(0);
    updateToggle();
    startTimer();
  }

  const COOKIE_NOTICE_KEY = 'bss-cookie-notice-v1';
  const COOKIE_NAME = 'bss_cookie_notice';

  const hasCookieNoticeChoice = () => {
    try {
      if (window.localStorage.getItem(COOKIE_NOTICE_KEY) === 'accepted') return true;
    } catch (error) {
      // Use the first-party cookie fallback when browser storage is unavailable.
    }
    return document.cookie.split('; ').some((item) => item.startsWith(`${COOKIE_NAME}=`));
  };

  const rememberCookieNoticeChoice = () => {
    try {
      window.localStorage.setItem(COOKIE_NOTICE_KEY, 'accepted');
    } catch (error) {
      // The consent cookie below provides a fallback.
    }
    document.cookie = `${COOKIE_NAME}=accepted; Max-Age=31536000; Path=/; SameSite=Lax; Secure`;
  };

  const createCookieNotice = () => {
    const notice = document.createElement('section');
    notice.className = 'cookie-notice';
    notice.setAttribute('role', 'dialog');
    notice.setAttribute('aria-modal', 'false');
    notice.setAttribute('aria-labelledby', 'cookie-notice-title');
    notice.innerHTML = `
      <div class="cookie-notice-copy">
        <h2 id="cookie-notice-title">Cookie notice</h2>
        <p>This website uses essential browser storage only to remember that you dismissed this notice. It does not use analytics or advertising cookies.</p>
      </div>
      <button class="button button-dark" type="button" data-cookie-accept>Accept and continue</button>
    `;
    document.body.appendChild(notice);
    notice.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
      rememberCookieNoticeChoice();
      notice.remove();
    });
    return notice;
  };

  let cookieNotice = null;
  const openCookieNotice = () => {
    if (!cookieNotice || !document.body.contains(cookieNotice)) cookieNotice = createCookieNotice();
    cookieNotice.querySelector('[data-cookie-accept]')?.focus();
  };

  if (!hasCookieNoticeChoice()) cookieNotice = createCookieNotice();
  document.querySelectorAll('[data-cookie-settings]').forEach((button) => {
    button.addEventListener('click', openCookieNotice);
  });
})();
