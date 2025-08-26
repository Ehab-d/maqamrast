(function(){
  let ctx;
  function getCtx(){
    if(!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function freqFromC4(steps){
    return 261.63 * Math.pow(2, steps/12);
  }

  function playSequence(stepsArray, { tempo = 90 } = {}){
    const ac = getCtx();
    const now = ac.currentTime + 0.05;
    const beat = 60/tempo;
    let t = 0;
    stepsArray.forEach((steps) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = 'sine';
      o.frequency.value = freqFromC4(steps);
      g.gain.value = 0.0001;
      g.gain.setTargetAtTime(0.25, now + t, 0.02);
      g.gain.setTargetAtTime(0.0001, now + t + beat*0.8, 0.08);
      o.connect(g).connect(ac.destination);
      o.start(now + t);
      o.stop(now + t + beat);
      t += beat;
    });
  }

  function playSequenceWithProgress(stepsArray, tempo = 100, onProgress){
    const ac = getCtx();
    const start = ac.currentTime;
    const beat = 60/tempo;
    let stopped = false;
    let osc = null, gain = null;
    let idx = 0;
    function scheduleNext(){
      if(stopped) return;
      if(idx >= stepsArray.length){ if(onProgress) onProgress(100); return; }
      const when = ac.currentTime + 0.02;
      osc = ac.createOscillator();
      gain = ac.createGain();
      osc.type = 'sine';
      osc.frequency.value = freqFromC4(stepsArray[idx]);
      gain.gain.value = 0.0001;
      gain.gain.setTargetAtTime(0.22, when, 0.02);
      gain.gain.setTargetAtTime(0.0001, when + beat*0.8, 0.06);
      osc.connect(gain).connect(ac.destination);
      osc.start(when);
      osc.stop(when + beat);
      const total = stepsArray.length;
      const localIdx = idx;
      setTimeout(() => {
        if(onProgress) onProgress(Math.min(99, Math.round((localIdx+1)/total*100)));
        scheduleNext();
      }, beat*1000);
      idx++;
    }
    scheduleNext();
    return () => { stopped = true; try{ osc && osc.stop(); }catch(e){} };
  }

  window.AudioMaqam = { playSequence, playSequenceWithProgress };
})();

