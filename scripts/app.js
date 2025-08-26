(function(){
  // صفحات بسيطة
  function Home(el, ctx){
    // عرض قائمة المقامات مباشرة دون تكرار أقسام أخرى
    MaqamList(el, ctx);
  }

  function About(el){
    el.innerHTML = `
      <section class="page">
        <h1>عن الموقع</h1>
        <p class="lead">هذا الموقع يجمع المقامات الأساسية ويعرض معلومات مبسّطة عنها بغرض التعلم والاستكشاف.</p>
        <ul>
          <li>بيانات منظمة لكل مقام</li>
          <li>بحث وفلاتر بحسب درجة الركوز</li>
          <li>روابط مباشرة لمشاركة صفحة أي مقام</li>
          <li>دعم الوضع الليلي</li>
        </ul>
      </section>
    `;
  }

  function Contact(el){
    el.innerHTML = `
      <section class="page">
        <h1>تواصل</h1>
        <p class="lead">يسعدنا اقتراحاتك أو ملاحظاتك.</p>
        <p>راسلنا عبر البريد: <a href="mailto:feedback@example.com">feedback@example.com</a></p>
      </section>
    `;
  }

  function NotFound(el){
    el.innerHTML = `
      <section class="page">
        <h1>الصفحة غير موجودة</h1>
        <p class="lead">تحقق من الرابط أو عُد إلى <a href="#/">الصفحة الرئيسية</a>.</p>
      </section>
    `;
  }

  // إعداد الراوتر
  Router.add('#/', (el, ctx) => Home(el, ctx));
  Router.add('#/maqamat', (el, ctx) => MaqamList(el, ctx));
  Router.add('#/maqam/:id', (el, { key }) => MaqamDetail(el, { key }));
  Router.add('#/about', (el) => About(el));
  Router.add('#/contact', (el) => Contact(el));
  Router.add('#/404', (el) => NotFound(el));

  // سنة الفوتر
  document.getElementById('year').textContent = new Date().getFullYear();

  // تبديل الثيم
  const themeBtn = document.getElementById('themeToggle');
  const PREF_KEY = 'rast-theme';
  function applyTheme(mode){
    if(mode === 'light') document.documentElement.classList.add('light');
    else document.documentElement.classList.remove('light');
  }
  const saved = localStorage.getItem(PREF_KEY);
  const preferLight = saved ? saved : (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(preferLight);
  themeBtn.textContent = preferLight === 'light' ? '🌙' : '🌞';
  themeBtn.addEventListener('click', () => {
    const now = document.documentElement.classList.contains('light') ? 'dark' : 'light';
    applyTheme(now);
    localStorage.setItem(PREF_KEY, now);
    themeBtn.textContent = now === 'light' ? '🌙' : '🌞';
  });

  // تشغيل الراوتر
  Router.start();
})();

