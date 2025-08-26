(function(){
  // خلفية متحركة بدوائر/نغمات
  const canvas = document.getElementById('bg');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  window.addEventListener('resize', resize);
  resize();

  const dots = Array.from({length: 60}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    r: 2 + Math.random()*3,
    a: .15 + Math.random()*.25,
    vx: -0.4 + Math.random()*0.8,
    vy: -0.4 + Math.random()*0.8,
    hue: Math.random() < .5 ? 210 : 150
  }));

  function step(){
    ctx.clearRect(0,0,w,h);
    for(const d of dots){
      d.x += d.vx; d.y += d.vy;
      if(d.x < -20) d.x = w+20; if(d.x > w+20) d.x = -20;
      if(d.y < -20) d.y = h+20; if(d.y > h+20) d.y = -20;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.fillStyle = `hsla(${d.hue}, 80%, 60%, ${d.a})`;
      ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();

  // كشف تدريجي للعناصر عند التمرير
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('route-enter-active');
        reveal.unobserve(e.target);
      }
    });
  }, { threshold: .08 });

  function applyReveals(){
    document.querySelectorAll('.page, .card, .panel').forEach(el => {
      el.classList.add('route-enter');
      reveal.observe(el);
    });
  }

  window.addEventListener('hashchange', () => setTimeout(applyReveals, 0));
  window.addEventListener('load', () => setTimeout(applyReveals, 0));
})();

