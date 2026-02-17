/* Combined application scripts (auto-generated) */

// --- falling-cats.js ---
(function(){
  const container = document.querySelector('.falling-cats');
  if(!container) return;
  const count = 7;
  for(let i=0;i<count;i++){
    const s = document.createElement('span');
    s.className = 'cat';
    s.textContent = '🌸';
    const left = Math.random()*100;
    const delay = Math.random()*-10;
    const dur = 6 + Math.random()*8;
    const scale = 0.6 + Math.random()*0.9;
    s.style.left = left + '%';
    s.style.animationDelay = delay + 's';
    s.style.animationDuration = dur + 's';
    s.style.transform = `translateY(-10vh) scale(${scale})`;
    container.appendChild(s);
  }
})();

// --- envelope-hearts.js ---
(function(){
  const container = document.querySelector('.falling-cats');
  if(!container) return;
  const count = 7;
  for(let i=0;i<count;i++){
    const s = document.createElement('span');
    s.className = 'cat';
    s.textContent = '🌸';
    const left = Math.random()*100;
    const delay = Math.random()*-10;
    const dur = 6 + Math.random()*8;
    const scale = 0.6 + Math.random()*0.9;
    s.style.left = left + '%';
    s.style.animationDelay = delay + 's';
    s.style.animationDuration = dur + 's';
    s.style.transform = `translateY(-10vh) scale(${scale})`;
    container.appendChild(s);
  }
})();

// --- open-envelope.js ---
(function(){
  const envelope = document.getElementById('envelope');

  if(!envelope) return;

  function openInvitation(){
    envelope.classList.add('opening');
    // small delay for visual effect
    setTimeout(()=>{
      window.location.href = 'invitation.html';
    }, 300);
  }

  envelope.addEventListener('click', openInvitation);
  envelope.addEventListener('keydown', (e)=>{ 
    if(e.key === 'Enter' || e.key === ' ') { 
      e.preventDefault(); 
      openInvitation(); 
    }
  });
})();

// --- countdown.js ---
(function(){
    function pad(n){ return String(n).padStart(2,'0'); }
    const hero = document.getElementById('hero');
    if(!hero) return;
    const dateAttr = hero.dataset.date;
    if(!dateAttr) return;
    const target = new Date(dateAttr);
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownEl = document.getElementById('countdown');

    function computeParts(ms){
        const s = Math.floor(ms/1000);
        const days = Math.floor(s/86400);
        const hours = Math.floor((s % 86400)/3600);
        const minutes = Math.floor((s % 3600)/60);
        const seconds = s % 60;
        return { days, hours, minutes, seconds };
    }

    function update(){
        const now = new Date();
        let diff = target - now;
        const isFuture = diff >= 0;
        if(!isFuture) diff = Math.abs(diff);

        const parts = computeParts(diff);
        if(daysEl) daysEl.textContent = pad(parts.days);
        if(hoursEl) hoursEl.textContent = pad(parts.hours);
        if(minutesEl) minutesEl.textContent = pad(parts.minutes);
        if(secondsEl) secondsEl.textContent = pad(parts.seconds);

        if(countdownEl){
            if(isFuture){
                countdownEl.classList.remove('past');
                countdownEl.classList.add('future');
            } else {
                countdownEl.classList.remove('future');
                countdownEl.classList.add('past');
            }
        }
    }

    update();
    setInterval(update, 1000);
})();

// --- calendar.js ---
document.addEventListener('DOMContentLoaded', function() {
  try {
    var hero = document.getElementById('hero');
    if (!hero) return;
    var startIso = hero.dataset.date;
    if (!startIso) return;
    var title = hero.datasetTitle || hero.dataset.title || (document.querySelector('.couple')?.textContent || 'Save the Date');
    var location = hero.datasetLocation || hero.dataset.location || (document.querySelector('.venue-name')?.textContent || '');

    var start = new Date(startIso);
    if (isNaN(start)) return;
    var end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

    function fmtUTC(d){
      var s = d.toISOString().split('.')[0];
      return s.replace(/[-:]/g,'') + 'Z';
    }

    var startStr = fmtUTC(start);
    var endStr = fmtUTC(end);

    var text = encodeURIComponent(title);
    var details = encodeURIComponent('You are invited — ' + (document.title || 'Save the date') + '\n\nVisit: ' + window.location.href);
    var loc = encodeURIComponent(location);

    var gcalUrl = 'https://www.google.com/calendar/render?action=TEMPLATE'
      + '&text=' + text
      + '&dates=' + startStr + '/' + endStr
      + '&details=' + details
      + (loc ? '&location=' + loc : '')
      + '&sprop=&sprop=name:';

    var buttons = document.querySelectorAll('.hero-cta, .save-date');
    buttons.forEach(function(cta){
      cta.style.cursor = 'pointer';
      cta.addEventListener('click', function(e){
        e.preventDefault();
        window.open(gcalUrl, '_blank');
      });
    });
  } catch (err) {
    console.error('calendar init error', err);
  }
});

// --- audio-player.js ---
document.addEventListener('DOMContentLoaded', function(){
  var audio = document.getElementById('page-audio');
  if(!audio){
    audio = document.createElement('audio');
    audio.id = 'page-audio';
    audio.src = 'assets/melody.mp3';
    audio.preload = 'auto';
    audio.loop = true;
    document.body.appendChild(audio);
  }

  audio.loop = true;

  var btn = document.getElementById('audio-toggle');
  if(!btn){
    btn = document.createElement('button');
    btn.id = 'audio-toggle';
    btn.className = 'audio-toggle';
    btn.setAttribute('aria-label','Play music');
    btn.innerHTML = '▶';
    document.body.appendChild(btn);
  }

  function setPlaying(playing){
    if(playing){
      btn.classList.add('playing');
      if(audio.muted) {
        btn.innerHTML = '🔈';
        btn.setAttribute('aria-label','Playing (muted). Click to unmute');
      } else {
        btn.innerHTML = '⏸';
        btn.setAttribute('aria-label','Pause music');
      }
    } else {
      btn.classList.remove('playing');
      btn.innerHTML = '▶';
      btn.setAttribute('aria-label','Play music');
    }
  }

  function tryAutoplay(){
    audio.play().then(function(){
      setPlaying(true);
    }).catch(function(){
      audio.muted = true;
      audio.play().then(function(){
        setPlaying(true);
        setTimeout(function(){
          audio.muted = false;
          audio.play().then(function(){
            setPlaying(true);
          }).catch(function(){
            audio.muted = true;
            setPlaying(true);
          });
        }, 300);
      }).catch(function(){
        audio.muted = true;
        setPlaying(false);
      });
    });
  }

  tryAutoplay();

  btn.addEventListener('click', function(){
    if(audio.paused){
      audio.muted = false;
      audio.play().then(function(){ setPlaying(true); }).catch(function(){ setPlaying(false); });
    } else {
      if(audio.muted){
        audio.muted = false;
        setPlaying(true);
        return;
      }
      audio.pause();
      setPlaying(false);
    }
  });

  document.addEventListener('visibilitychange', function(){
    if(document.hidden){
      if(!audio.paused){ audio.pause(); btn.dataset._wasPlaying = '1'; setPlaying(false); }
    } else {
      if(btn.dataset._wasPlaying === '1'){
        audio.play().then(function(){ setPlaying(true); btn.dataset._wasPlaying = ''; }).catch(function(){});
      }
    }
  });
});

// --- scroll-init.js ---
document.addEventListener('DOMContentLoaded', function() {
  try {
    var el = document.querySelector('.default-scroll');
    if (!el) return;
    setTimeout(function() {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  } catch (e) {
    console.error('scroll-init error', e);
  }
});

// --- gallery-init.js ---
(function(){
  function buildGrid(items){
    var grid = document.querySelector('.gallery-grid');
    if(!grid) return;
    grid.innerHTML = '';
    items.forEach(function(it){
      var a = document.createElement('a');
      a.className = 'gallery-item';
      a.href = it.src;
      a.setAttribute('aria-label', it.alt || 'Gallery image');

      var img = document.createElement('img');
      img.src = it.thumb || it.src;
      img.alt = it.alt || '';
      img.loading = 'lazy';
      try { img.style.objectPosition = it.position || 'center'; } catch (e) {}

      a.appendChild(img);
      grid.appendChild(a);
    });
  }

  function load(){
    fetch('assets/gallery.json', {cache: 'no-cache'})
      .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
      .then(function(data){ if(Array.isArray(data)) buildGrid(data); else console.warn('gallery.json: not an array'); })
      .catch(function(err){ console.warn('Could not load gallery.json', err); });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load); else load();
})();

// --- gallery-lightbox.js ---
(function(){
  function createOverlay() {
    var overlay = document.createElement('div');
    overlay.className = 'gl-overlay';
    overlay.tabIndex = -1;
    return overlay;
  }

  function openLightboxAt(index, items) {
    if (!items || !items.length) return;
    index = (index + items.length) % items.length;
    var overlay = createOverlay();

    var img = document.createElement('img');
    img.src = items[index].href || items[index].dataset.src;
    img.alt = items[index].querySelector('img')?.alt || '';

    var btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.className = 'gl-close';
    btnClose.setAttribute('aria-label','Close');
    btnClose.innerHTML = '✕';

    var btnPrev = document.createElement('button');
    btnPrev.type = 'button';
    btnPrev.className = 'gl-prev';
    btnPrev.setAttribute('aria-label','Previous');
    btnPrev.innerHTML = '‹';

    var btnNext = document.createElement('button');
    btnNext.type = 'button';
    btnNext.className = 'gl-next';
    btnNext.setAttribute('aria-label','Next');
    btnNext.innerHTML = '›';

    overlay.appendChild(img);
    overlay.appendChild(btnClose);
    overlay.appendChild(btnPrev);
    overlay.appendChild(btnNext);

    function close(){
      window.removeEventListener('keydown', onKey);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }

    function show(i){
      index = (i + items.length) % items.length;
      img.src = items[index].href || items[index].dataset.src;
      img.alt = items[index].querySelector('img')?.alt || '';
      overlay.focus();
    }

    function prev(){ show(index - 1); }
    function next(){ show(index + 1); }

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', prev);
    btnNext.addEventListener('click', next);

    overlay.addEventListener('click', function(e){ if (e.target === overlay) close(); });

    function onKey(e){
      if (e.key === 'Escape') return close();
      if (e.key === 'ArrowLeft') return prev();
      if (e.key === 'ArrowRight') return next();
    }

    window.addEventListener('keydown', onKey);
    document.body.appendChild(overlay);
    overlay.focus();
  }

  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('.gallery-item');
    if (!a) return;
    e.preventDefault();
    var items = Array.from(document.querySelectorAll('.gallery-item'));
    if (!items.length) return;
    var idx = items.indexOf(a);
    if (idx === -1) idx = 0;
    openLightboxAt(idx, items);
  });
})();
