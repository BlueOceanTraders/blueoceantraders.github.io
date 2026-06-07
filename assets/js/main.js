
(function(){
  const root = document.documentElement;
  const langButtons = document.querySelectorAll('.lang-btn');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-nav');
  let currentLang = localStorage.getItem('bot_lang') || 'th';

  function setLang(lang){
    currentLang = lang;
    root.lang = lang;
    localStorage.setItem('bot_lang', lang);
    document.querySelectorAll('[data-th][data-en]').forEach((el)=>{
      const next = el.getAttribute(lang === 'en' ? 'data-en' : 'data-th');
      if(next !== null) el.textContent = next;
    });
    document.querySelectorAll('[data-placeholder-th][data-placeholder-en]').forEach((el)=>{
      const next = el.getAttribute(lang === 'en' ? 'data-placeholder-en' : 'data-placeholder-th');
      if(next !== null) el.setAttribute('placeholder', next);
    });
    langButtons.forEach(btn=>btn.classList.toggle('active', btn.dataset.lang === lang));
  }

  langButtons.forEach(btn=>btn.addEventListener('click',()=>setLang(btn.dataset.lang)));

  if(menuButton && nav){
    menuButton.addEventListener('click',()=>{
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      menuButton.classList.toggle('active', open);
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('open');
      menuButton.classList.remove('active');
      menuButton.setAttribute('aria-expanded','false');
    }));
  }

  const form = document.getElementById('inquiry-form');
  if(form){
    form.addEventListener('submit', function(event){
      event.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const contact = document.getElementById('form-contact').value.trim();
      const message = document.getElementById('form-message').value.trim();
      const subject = currentLang === 'en' ? 'Product inquiry from website' : 'สอบถามสินค้า จากเว็บไซต์';
      const bodyLines = currentLang === 'en'
        ? ['Name / Company: '+name, 'Contact: '+contact, '', 'Requirement:', message]
        : ['ชื่อ / บริษัท: '+name, 'ช่องทางติดต่อ: '+contact, '', 'รายละเอียดสินค้า:', message];
      const mailto = 'mailto:admin@blueoceantraders.co.th?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyLines.join('\n'));
      window.location.href = mailto;
    });
  }

  setLang(currentLang);
})();
