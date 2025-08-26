window.MaqamList = (container, { params } = {}) => {
  const q = params.get('q') || '';
  const group = params.get('group') || 'all';

  container.innerHTML = `
    <section class="page">
      <h1>المقامات</h1>
      <p class="lead">نظام لحني عربي مبني على أجناس وأبعاد. استكشف المقامات الأساسية واقرأ نبذة سريعة، مع جرافيك تعبيري لكل مقام.</p>
      <div class="search-bar">
        <input id="searchInput" type="search" placeholder="ابحث عن مقام..." value="${q}">
      </div>
      <div class="chips" id="groupChips"></div>
      <div class="grid" id="cards"></div>
    </section>
  `;

  const groups = ['all',
    'درجة الركوز راست — نغمة دو',
    'درجة الركوز دوكاه — نغمة ري',
    'درجة الركوز سيكاه — نغمة مي',
    'درجة الركوز عجم عشيران — سي♭ القرار'
  ];

  const chips = document.getElementById('groupChips');
  chips.innerHTML = groups.map(g => `
    <span class="chip ${group===g?'active':''}" data-group="${g}">${g==='all'?'الكل':g}</span>
  `).join('');

  function renderCards(){
    const list = window.MAQAMAT.all
      .filter(m => group==='all' ? true : m.group===group)
      .filter(m => m.name.includes(search.value) || m.id.includes(search.value));

    cards.innerHTML = list.map(m => `
      <article class="card">
        <img src="${m.image || ''}" alt="${m.name}" style="width:100%;height:140px;object-fit:cover;border-radius:10px;margin-bottom:10px;background:#0a0f18" onerror="this.style.display='none'"/>
        <h3>${m.name}</h3>
        <div class="meta">${m.group} — الركوز: ${m.tonic}</div>
        <p style="margin:8px 0 10px; color:var(--muted); font-size:14px">${m.article || ''}</p>
        <a href="#/maqam/${m.id}">التفاصيل →</a>
      </article>
    `).join('');
  }

  const cards = document.getElementById('cards');
  const search = document.getElementById('searchInput');
  search.addEventListener('input', () => {
    const url = new URL(location.href);
    url.hash = `#/maqamat?q=${encodeURIComponent(search.value)}&group=${encodeURIComponent(group)}`;
    history.replaceState(null, '', url);
    renderCards();
  });

  chips.addEventListener('click', (e) => {
    const el = e.target.closest('.chip');
    if(!el) return;
    const g = el.getAttribute('data-group');
    const url = new URL(location.href);
    url.hash = `#/maqamat?q=${encodeURIComponent(search.value)}&group=${encodeURIComponent(g)}`;
    location.replace(url);
  });

  renderCards();


  // أزلنا التشغيل الصوتي من الصفحة الرئيسية بناءً على طلبك
};

