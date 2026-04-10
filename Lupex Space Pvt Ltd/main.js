/* ════════════════════════════════════════════════
   LUPEX SPACE v3.1 — MAIN.JS
   Production-ready. Every interaction polished.
   01 Utilities  02 Loader  03 Cursor  04 Progress
   05 Nav+Active  06 Mobile Menu  07 Smooth Scroll
   08 Cosmos Canvas  09 Scroll Reveal  10 Counters
   11 Hero Parallax  12 Pipeline  13 Card Tilt
   14 Founder Card FX  15 Music  16 Contact/EmailJS
   17 Marquee  18 Timeline  19 Orbital Parallax
════════════════════════════════════════════════ */
'use strict';

/* 01 UTILITIES */
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const lerp  = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const easeOut3 = t => 1 - Math.pow(1 - t, 3);
const easeOut4 = t => 1 - Math.pow(1 - t, 4);
const raf = requestAnimationFrame;

/* 02 LOADER */
(function initLoader() {
  const loader = $('#loader');
  const bar    = $('#loaderBar');
  const status = $('#loaderStatus');
  if (!loader) return;
  const stages = [
    [15,  'Loading assets…'],
    [40,  'Calibrating systems…'],
    [64,  'Initializing mission control…'],
    [84,  'Preparing launch sequence…'],
    [100, 'All systems go 🚀'],
  ];
  let current = 0, idx = 0;
  function animateTo(target, cb) {
    const from = current;
    const dur  = 350 + (target - from) * 7;
    const t0   = performance.now();
    (function tick(now) {
      const p = clamp((now - t0) / dur, 0, 1);
      current = Math.round(lerp(from, target, easeOut3(p)));
      if (bar) bar.style.width = current + '%';
      if (p < 1) raf(tick);
      else { current = target; cb && setTimeout(cb, 180 + Math.random() * 120); }
    })(t0);
  }
  function next() {
    if (idx >= stages.length) { finish(); return; }
    const [pct, msg] = stages[idx++];
    if (status) status.textContent = msg;
    animateTo(pct, next);
  }
  function finish() {
    setTimeout(() => {
      loader.classList.add('done');
      document.body.classList.remove('is-loading');
      kickReveal();
      setTimeout(() => loader.remove(), 1000);
    }, 260);
  }
  setTimeout(next, 320);
})();

/* 03 CUSTOM CURSOR */
(function initCursor() {
  const dot  = $('#cursor-dot');
  const ring = $('#cursor-ring');
  if (!dot || window.matchMedia('(hover: none)').matches) return;
  let mx = -200, my = -200, rx = -200, ry = -200;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  }, { passive: true });
  const interactable = 'a,button,input,select,textarea,.svc-card,.mv-card,.ig-tile,.founder-card,.school-card,.tl-card,[role=button]';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactable)) {
      ring.style.cssText += ';width:52px;height:52px;border-color:rgba(56,189,248,.2);background:rgba(56,189,248,.04)';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactable)) {
      ring.style.cssText += ';width:36px;height:36px;border-color:rgba(56,189,248,.4);background:';
    }
  });
  (function lag() {
    rx = lerp(rx, mx, 0.12); ry = lerp(ry, my, 0.12);
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    raf(lag);
  })();
})();

/* 04 PAGE PROGRESS BAR */
(function initProgress() {
  const bar = $('#pageProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const d = document.documentElement;
    bar.style.width = clamp((d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100, 0, 100) + '%';
  }, { passive: true });
})();

/* 05 NAVIGATION — scroll-aware + active nav links */
(function initNav() {
  const nav = $('#nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Inject active style
  const st = document.createElement('style');
  st.textContent = '.nav-active{color:var(--sky)!important}.nav-active::after{transform:scaleX(1)!important}';
  document.head.appendChild(st);

  // Active link tracker
  const sections = $$('section[id]');
  const links    = $$('.nav-item, .mm-link');
  const setActive = id => links.forEach(l => l.classList.toggle('nav-active', l.getAttribute('href') === '#' + id));
  const sObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
  }, { threshold: 0.32, rootMargin: '-60px 0px -40% 0px' });
  sections.forEach(s => sObs.observe(s));
})();

/* 06 MOBILE MENU */
(function initMobileMenu() {
  const ham  = $('#hamburger');
  const menu = $('#mobileMenu');
  if (!ham || !menu) return;
  let open = false;

  function openMenu() {
    open = true;
    ham.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $$('.mm-link', menu).forEach((l, i) => {
      l.style.cssText = `opacity:0;transform:translateX(22px);transition:opacity .4s ${i * .07}s ease,transform .4s ${i * .07}s cubic-bezier(.22,1,.36,1)`;
      raf(() => { l.style.opacity = '1'; l.style.transform = 'none'; });
    });
  }
  function closeMenu() {
    open = false;
    ham.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    $$('.mm-link', menu).forEach(l => l.style.cssText = '');
  }

  ham.addEventListener('click', () => open ? closeMenu() : openMenu());
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) closeMenu(); });
  menu.addEventListener('click', e => { if (e.target === menu) closeMenu(); });
  $$('[data-close]', menu).forEach(el => el.addEventListener('click', closeMenu));
})();

/* 07 SMOOTH ANCHOR SCROLL */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  });
});

/* 08 COSMOS CANVAS */
(function initCosmos() {
  const canvas = $('#cosmos');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dpr, stars = [], nebulas = [];
  let mx = 0.5, my = 0.5, sy = 0;

  function build() {
    stars = []; nebulas = [];
    const n = Math.min(Math.floor(W * H / 4000), 360);
    for (let i = 0; i < n; i++) {
      const layer = Math.random();
      stars.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.5 + 0.15, a: Math.random() * .7 + .1, da: (Math.random() - .5) * .0038, layer, hue: Math.random() > .88 ? 195 + Math.random() * 20 : 215 + Math.random() * 20 });
    }
    [[.18,.22,195],[.72,.6,218],[.48,.8,250]].forEach(([bx,by,hue]) =>
      nebulas.push({ bx, by, hue, r: 150 + Math.random()*220, a: .011 + Math.random()*.016, phase: Math.random()*Math.PI*2, speed: .00028 + Math.random()*.00018 })
    );
  }

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = canvas.offsetWidth; H = canvas.offsetHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.scale(dpr, dpr); build();
  }

  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('mousemove', e => { mx = e.clientX / window.innerWidth; my = e.clientY / window.innerHeight; }, { passive: true });
  window.addEventListener('scroll', () => { sy = window.scrollY; }, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    nebulas.forEach(n => {
      n.phase += n.speed;
      const nx = n.bx + Math.sin(n.phase) * .05, ny = n.by + Math.cos(n.phase * .75) * .032;
      const g = ctx.createRadialGradient(nx*W, ny*H, 0, nx*W, ny*H, n.r);
      g.addColorStop(0, `hsla(${n.hue},70%,65%,${n.a})`); g.addColorStop(1, `hsla(${n.hue},70%,65%,0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(nx*W, ny*H, n.r, 0, Math.PI*2); ctx.fill();
    });
    stars.forEach(s => {
      s.a += s.da; if (s.a <= .05 || s.a >= .92) s.da *= -1;
      const px = (mx-.5) * s.layer * 26, py = (my-.5) * s.layer * 16 + sy * s.layer * .055;
      const x = ((s.x*W+px)%W+W)%W, y = ((s.y*H+py)%H+H)%H;
      ctx.beginPath(); ctx.arc(x, y, s.r, 0, Math.PI*2);
      ctx.fillStyle = `hsla(${s.hue},80%,85%,${s.a})`; ctx.fill();
      if (s.r > 1.1 && s.a > .52) { ctx.beginPath(); ctx.arc(x, y, s.r*3, 0, Math.PI*2); ctx.fillStyle = `hsla(${s.hue},80%,85%,${s.a*.065})`; ctx.fill(); }
    });
    raf(draw);
  }

  function shootStar() {
    const sx = Math.random()*W*.75, sy2 = Math.random()*H*.4, len = 120+Math.random()*200;
    const ang = Math.PI*.25+(Math.random()-.5)*.35, dur = 680+Math.random()*520, t0 = performance.now();
    (function frame(now) {
      const p = clamp((now-t0)/dur,0,1), ea = easeOut3(p), al = Math.sin(p*Math.PI)*.9;
      const x0 = sx+Math.cos(ang)*len*Math.max(0,ea-.28), y0 = sy2+Math.sin(ang)*len*Math.max(0,ea-.28);
      const x1 = sx+Math.cos(ang)*len*ea, y1 = sy2+Math.sin(ang)*len*ea;
      ctx.save(); ctx.globalAlpha = al;
      const gr = ctx.createLinearGradient(x0,y0,x1,y1);
      gr.addColorStop(0,'rgba(56,189,248,0)'); gr.addColorStop(.6,`rgba(200,235,255,${al*.9})`); gr.addColorStop(1,`rgba(255,255,255,${al})`);
      ctx.strokeStyle = gr; ctx.lineWidth = 1.5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1); ctx.stroke(); ctx.restore();
      if (p < 1) raf(frame);
    })(t0);
    setTimeout(shootStar, 5500 + Math.random()*9000);
  }

  resize(); draw(); setTimeout(shootStar, 2800);
})();

/* 09 SCROLL REVEAL */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    setTimeout(() => e.target.classList.add('in-view'), parseInt(e.target.dataset.delay || 0));
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.09, rootMargin: '0px 0px -36px 0px' });

function kickReveal() { $$('.reveal').forEach(el => revealObs.observe(el)); }

/* 10 ANIMATED COUNTERS */
(function initCounters() {
  function fmt(n) {
    if (n >= 1e6) { const v=n/1e6; return (Number.isInteger(v)?v:v.toFixed(1))+'M'; }
    if (n >= 1e3) return Math.round(n/1000)+'K';
    return Math.round(n).toString();
  }
  function run(el, target, dur=2400) {
    const t0=performance.now();
    (function tick(now) {
      const p=clamp((now-t0)/dur,0,1);
      el.textContent=fmt(Math.round(easeOut4(p)*target));
      if(p<1) raf(tick); else el.textContent=fmt(target);
    })(t0);
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const t = parseInt(e.target.dataset.count);
      if (!isNaN(t)) run(e.target, t);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.55 });
  $$('[data-count]').forEach(el => { el.textContent='—'; obs.observe(el); });
})();

/* 11 HERO PARALLAX */
(function initHeroParallax() {
  const content = $('.hero-content');
  const bar     = $('.hero-stats');
  if (!content) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    raf(() => {
      const y = window.scrollY;
      content.style.transform = `translateY(${clamp(y*.19,0,130)}px)`;
      content.style.opacity   = clamp(1-y/520,0,1);
      if (bar) bar.style.opacity = clamp(1-y/300,0,1);
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();

/* 12 PIPELINE STEP REVEAL */
(function initPipeline() {
  const steps = $$('.pip-step');
  if (!steps.length) return;
  const container = steps[0].closest('.pipeline');
  if (!container) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      steps.forEach((s,i) => setTimeout(() => s.classList.add('visible'), parseInt(s.dataset.pip||i)*180));
      obs.unobserve(e.target);
    });
  }, { threshold: 0.28 });
  obs.observe(container);
})();

/* 13 CARD 3D TILT */
(function initCardTilt() {
  [
    ['.svc-card',   7],
    ['.mv-card',    6],
    ['.ig-tile',    5],
    ['.school-card',5],
    ['.tl-card',    4],
  ].forEach(([sel, maxTilt]) => {
    $$(sel).forEach(card => {
      let cx=.5, cy=.5, tx=.5, ty=.5, active=false, rafId=null;
      card.addEventListener('mouseenter', () => { active=true; if(!rafId) loop(); });
      card.addEventListener('mousemove', e => {
        const r=card.getBoundingClientRect();
        tx=(e.clientX-r.left)/r.width; ty=(e.clientY-r.top)/r.height;
      });
      card.addEventListener('mouseleave', () => { active=false; tx=.5; ty=.5; });
      function loop() {
        cx=lerp(cx,tx,.1); cy=lerp(cy,ty,.1);
        const atRest=!active&&Math.abs(cx-.5)<.004&&Math.abs(cy-.5)<.004;
        if(atRest){card.style.transform='';rafId=null;return;}
        card.style.transform=`perspective(900px) rotateX(${(cy-.5)*-maxTilt}deg) rotateY(${(cx-.5)*maxTilt}deg) translateZ(5px)`;
        rafId=raf(loop);
      }
    });
  });
})();

/* 14 FOUNDER CARD SPECIAL FX — deeper tilt + spark particles */
(function initFounderCards() {
  // Inject spark CSS
  const sty = document.createElement('style');
  sty.textContent = `
    .fc-spark {
      position: absolute;
      width: 4px; height: 4px;
      background: var(--sky);
      border-radius: 50%;
      pointer-events: none;
      box-shadow: 0 0 6px var(--sky);
      animation: fc-spark-anim .55s ease-out forwards;
      z-index: 10;
      transform: translate(-50%, -50%);
    }
    @keyframes fc-spark-anim {
      0%   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%,-50%) scale(0) translateY(-12px); }
    }
  `;
  document.head.appendChild(sty);

  $$('.founder-card').forEach(card => {
    let cx=.5, cy=.5, tx=.5, ty=.5, active=false, rafId=null;

    card.addEventListener('mouseenter', () => {
      active=true; if(!rafId) loop(); spawnSparks();
    });
    card.addEventListener('mousemove', e => {
      const r=card.getBoundingClientRect();
      tx=(e.clientX-r.left)/r.width; ty=(e.clientY-r.top)/r.height;
    });
    card.addEventListener('mouseleave', () => { active=false; tx=.5; ty=.5; });

    function loop() {
      cx=lerp(cx,tx,.09); cy=lerp(cy,ty,.09);
      const atRest=!active&&Math.abs(cx-.5)<.003&&Math.abs(cy-.5)<.003;
      if(atRest){card.style.transform='';rafId=null;return;}
      card.style.transform=`perspective(850px) rotateX(${(cy-.5)*-10}deg) rotateY(${(cx-.5)*10}deg) translateZ(10px)`;
      rafId=raf(loop);
    }

    function spawnSparks() {
      const photo = card.querySelector('.fc-photo-ring');
      if (!photo) return;
      const pr = photo.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        spark.className = 'fc-spark';
        const ang  = (i / 8) * Math.PI * 2;
        const dist = 32 + Math.random() * 22;
        spark.style.left = ((pr.left - cr.left) + pr.width/2 + Math.cos(ang)*dist) + 'px';
        spark.style.top  = ((pr.top  - cr.top)  + pr.height/2 + Math.sin(ang)*dist) + 'px';
        card.appendChild(spark);
        setTimeout(() => spark.remove(), 600);
      }
    }
  });
})();

/* 15 MUSIC PLAYER */
(function initMusic() {
  const btn   = $('#mpBtn');
  const audio = $('#bgAudio');
  if (!btn || !audio) return;
  audio.volume = 0.18;
  btn.addEventListener('click', async () => {
    if (audio.paused) {
      try {
        await audio.play();
        btn.classList.add('playing');
        btn.setAttribute('aria-label', 'Pause ambient music');
      } catch(e) { btn.title = 'Click anywhere on page first, then try again.'; }
    } else {
      audio.pause();
      btn.classList.remove('playing');
      btn.setAttribute('aria-label', 'Play ambient music');
    }
  });
  audio.addEventListener('play', () => {
    let v = 0; audio.volume = 0;
    const fade = setInterval(() => { v = Math.min(v+.012, .18); audio.volume=v; if(v>=.18) clearInterval(fade); }, 80);
  });
})();

/* 16 CONTACT FORM — EmailJS + mailto fallback
   ─────────────────────────────────────────────
   SETUP:
   1. emailjs.com → sign up (free: 200 msgs/month)
   2. Add Email Service → copy SERVICE_ID
   3. Create Template with vars:
      {{from_name}} {{from_email}} {{organisation}}
      {{type}} {{message}}
      "To" = info@lupexspace.com
      → copy TEMPLATE_ID
   4. Account → General → copy PUBLIC_KEY
   5. Replace the three strings below.
   ───────────────────────────────────────────── */
(function initContactForm() {
  const EJS_KEY      = 'YOUR_PUBLIC_KEY';   // ← replace
  const EJS_SERVICE  = 'YOUR_SERVICE_ID';   // ← replace
  const EJS_TEMPLATE = 'YOUR_TEMPLATE_ID';  // ← replace

  const form      = $('#contactForm');
  const submitBtn = $('#cfSubmit');
  const feedback  = $('#cfFeedback');
  const btnTxt    = submitBtn?.querySelector('.cf-submit-txt');
  if (!form) return;

  const ejsReady = EJS_KEY !== 'YOUR_PUBLIC_KEY' && typeof emailjs !== 'undefined';
  if (ejsReady) try { emailjs.init({ publicKey: EJS_KEY }); } catch(e) {}

  function fb(msg, cls) { if(feedback){ feedback.textContent=msg; feedback.className='cf-feedback'+(cls?' '+cls:''); } }
  function btnState(s) {
    if (!submitBtn || !btnTxt) return;
    submitBtn.classList.remove('loading','success','error'); submitBtn.disabled = false;
    const ico=submitBtn.querySelector('.cf-submit-ico'), spn=submitBtn.querySelector('.cf-spinner');
    if(ico) ico.style.display=''; if(spn) spn.style.display='none';
    if(s==='loading'){submitBtn.classList.add('loading');submitBtn.disabled=true;btnTxt.textContent='Sending…';if(ico)ico.style.display='none';if(spn)spn.style.display='block';}
    else if(s==='success'){submitBtn.classList.add('success');btnTxt.textContent='✓ Message Sent!';}
    else if(s==='error'){submitBtn.classList.add('error');btnTxt.textContent='Try Again';}
    else btnTxt.textContent='Send Message';
  }

  form.addEventListener('submit', async e => {
    e.preventDefault(); fb('');
    const name  = ($('#cf-name')?.value||'').trim();
    const email = ($('#cf-email')?.value||'').trim();
    const msg   = ($('#cf-msg')?.value||'').trim();
    if (!name)  { fb('Please enter your name.','err'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { fb('Please enter a valid email.','err'); return; }
    if (!msg)   { fb('Please write a message.','err'); return; }
    btnState('loading');
    const p = { from_name: name, from_email: email, organisation: ($('#cf-org')?.value||'').trim()||'—', type: $('#cf-type')?.value||'—', message: msg };
    if (ejsReady) {
      try {
        await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, p);
        btnState('success'); fb("Thank you! We'll be in touch within 24 hours.",'ok'); form.reset();
        setTimeout(()=>btnState('default'), 6000); return;
      } catch(err) { console.warn('EmailJS error:', err); }
    }
    // Mailto fallback
    const sub  = encodeURIComponent(`[Lupex Space] Enquiry from ${p.from_name}`);
    const body = encodeURIComponent(`Name: ${p.from_name}\nEmail: ${p.from_email}\nOrg: ${p.organisation}\nType: ${p.type}\n\n${p.message}`);
    window.location.href = `mailto:info@lupexspace.com?subject=${sub}&body=${body}`;
    btnState('success'); fb('Opening your email client… For direct delivery, configure EmailJS (see README).','ok');
  });
})();

/* 17 MARQUEE PAUSE ON HOVER */
(function initMarquee() {
  const track = $('#marqueeTrack') || $('.marquee-track');
  const band  = track?.parentElement;
  if (!band) return;
  band.addEventListener('mouseenter', ()=>{ if(track) track.style.animationPlayState='paused'; });
  band.addEventListener('mouseleave', ()=>{ if(track) track.style.animationPlayState='running'; });
})();

/* 18 TIMELINE NODE PULSE */
(function initTimeline() {
  const rows = $$('.tl-row');
  if (!rows.length) return;
  // Inject pulse CSS
  const s = document.createElement('style');
  s.textContent = `.tln-dot.tln-active{box-shadow:0 0 0 3px rgba(56,189,248,.2),0 0 16px rgba(56,189,248,.5)!important;animation:tln-pulse 2s ease-in-out infinite}.founder-card{transform-style:preserve-3d}@keyframes tln-pulse{0%,100%{box-shadow:0 0 0 3px rgba(56,189,248,.2),0 0 16px rgba(56,189,248,.4)}50%{box-shadow:0 0 0 6px rgba(56,189,248,.1),0 0 28px rgba(56,189,248,.7)}}`;
  document.head.appendChild(s);
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const dot = e.target.querySelector('.tln-dot');
      if (dot) setTimeout(()=>dot.classList.add('tln-active'), 300);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  rows.forEach(r => obs.observe(r));
})();

/* 19 ORBITAL SYSTEM MOUSE PARALLAX */
(function initOrbitalParallax() {
  const sys = $('#orbitalSystem');
  if (!sys) return;
  let tx=0, ty=0, cx=0, cy=0;
  sys.style.transformStyle = 'preserve-3d';
  document.addEventListener('mousemove', e => {
    tx = (e.clientX/window.innerWidth  - .5) * 14;
    ty = (e.clientY/window.innerHeight - .5) * 10;
  }, { passive: true });
  (function loop() {
    cx=lerp(cx,tx,.07); cy=lerp(cy,ty,.07);
    sys.style.transform = `rotateY(${cx}deg) rotateX(${-cy}deg)`;
    raf(loop);
  })();
})();
