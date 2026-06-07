
(() => {
  const root = document.documentElement;
  const langButtons = document.querySelectorAll('.lang-btn');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-nav');
  const fallbackImages = document.querySelectorAll('img[data-fallback]');

  const setLanguage = (lang) => {
    root.lang = lang;
    document.querySelectorAll('[data-th][data-en]').forEach((el) => {
      const value = el.dataset[lang];
      if (typeof value === 'string') el.innerHTML = value;
    });
    langButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === lang));
    localStorage.setItem('blueOceanLang', lang);
  };

  langButtons.forEach((btn) => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));
  setLanguage(localStorage.getItem('blueOceanLang') || 'th');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  fallbackImages.forEach((img) => {
    img.addEventListener('error', () => {
      const fallback = img.dataset.fallback;
      if (fallback && img.src.indexOf(fallback) === -1) img.src = fallback;
    }, { once: true });
  });

  const form = document.getElementById('quoteForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent('Quotation Request - Blue Ocean Traders');
      const body = encodeURIComponent([
        `Contact name: ${data.get('name') || ''}`,
        `Email / Phone: ${data.get('contact') || ''}`,
        `Product category: ${data.get('category') || ''}`,
        '',
        'Project details:',
        data.get('message') || ''
      ].join('\n'));
      window.location.href = `mailto:admin@blueoceantraders.co.th?subject=${subject}&body=${body}`;
    });
  }
})();
