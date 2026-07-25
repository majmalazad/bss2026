(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const topButton = document.querySelector('.back-to-top');
  if (topButton) {
    const updateButton = () => topButton.classList.toggle('visible', window.scrollY > 500);
    window.addEventListener('scroll', updateButton, { passive: true });
    updateButton();
    topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();

  const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
  if (heroSlides.length > 1) {
    let currentHeroSlide = 0;
    const showHeroSlide = (index) => {
      heroSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === index);
      });
    };
    window.setInterval(() => {
      currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
      showHeroSlide(currentHeroSlide);
    }, 4000);
  }


  const COOKIE_NOTICE_KEY = 'bss-cookie-notice-v1';
  const COOKIE_NAME = 'bss_cookie_notice';

  const hasCookieNoticeChoice = () => {
    try {
      if (window.localStorage.getItem(COOKIE_NOTICE_KEY) === 'accepted') return true;
    } catch (error) {
      // Continue with the cookie fallback when browser storage is unavailable.
    }
    return document.cookie.split('; ').some((item) => item.startsWith(`${COOKIE_NAME}=`));
  };

  const rememberCookieNoticeChoice = () => {
    try {
      window.localStorage.setItem(COOKIE_NOTICE_KEY, 'accepted');
    } catch (error) {
      // The consent cookie below provides a fallback.
    }
    document.cookie = `${COOKIE_NAME}=accepted; Max-Age=31536000; Path=/; SameSite=Lax`;
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
        <p>This website uses essential browser storage only to remember that you have dismissed this notice. It does not use analytics or advertising cookies.</p>
      </div>
      <button class="button button-dark" type="button" data-cookie-accept>Accept and continue</button>
    `;
    document.body.appendChild(notice);
    notice.querySelector('[data-cookie-accept]').addEventListener('click', () => {
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
