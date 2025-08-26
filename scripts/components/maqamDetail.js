window.MaqamDetail = (container, { key } = {}) => {
  const m = window.MAQAMAT.byId(key);
  if(!m){
    container.innerHTML = `
      <section class="page">
        <h1>غير موجود</h1>
        <p class="lead">لم يتم العثور على المقام المطلوب.</p>
        <p><a href="#/maqamat">عودة لقائمة المقامات</a></p>
      </section>
    `;
    return;
  }

  container.innerHTML = `
    <section class="page detail">
      <div>
        <h1>${m.name}</h1>
        <p class="lead">${m.group} — الركوز: ${m.tonic}</p>
      </div>
      <div class="panel">
        <div class="kv"><div>جنس الأصل</div><div>${m.jinsAsl}</div></div>
        <div class="kv"><div>جنس الفرع</div><div>${m.jinsFar}</div></div>
        <div class="kv"><div>نوع الجمع</div><div>${m.jamType}</div></div>
        <div class="kv"><div>الدليل</div><div><span class="kbd">${m.dalil}</span></div></div>
        <div class="kv"><div>الأبعاد</div><div><span class="kbd">${m.intervals}</span></div></div>
        ${m.example ? `<div class="kv"><div>مثال</div><div>${m.example} 🎵</div></div>` : ''}
        <div class="actions">
          <button class="btn" id="playAsc">تشغيل صعود</button>
          <button class="btn" id="playDesc">تشغيل نزول</button>
        </div>
      </div>
      <div>
        <a href="#/maqamat" class="nav-link">← الرجوع للقائمة</a>
      </div>
    </section>
  `;
  function intervalsToSemitoneSteps(intervals){
    const parts = String(intervals).split(/\s+/).filter(Boolean).map(n => parseInt(n,10));
    let acc = 0; const steps = [0];
    for(const p of parts){ acc += Math.round(p/2); steps.push(acc); }
    return steps;
  }
  const steps = intervalsToSemitoneSteps(m.intervals);
  const asc = document.getElementById('playAsc');
  const desc = document.getElementById('playDesc');
  if(asc) asc.addEventListener('click', () => AudioMaqam.playSequence(steps));
  if(desc) desc.addEventListener('click', () => AudioMaqam.playSequence([...steps].reverse()));
};

