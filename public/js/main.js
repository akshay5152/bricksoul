(function () {
  'use strict';

  window.__chkstepanScrollToTop = function () {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.__chkstepanLenis && typeof window.__chkstepanLenis.scrollTo === 'function') {
      window.__chkstepanLenis.scrollTo(0, { immediate: true, force: true });
    }
  };

  window.__chkstepanCleanup = function () {
    try {
      if (window.__chkstepanPreloaderInterval) {
        clearInterval(window.__chkstepanPreloaderInterval);
        window.__chkstepanPreloaderInterval = null;
      }
      if (typeof gsap !== 'undefined' && window.__chkstepanLenisTick) {
        gsap.ticker.remove(window.__chkstepanLenisTick);
      }
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(function (trigger) {
          trigger.kill();
        });
      }
      if (typeof gsap !== 'undefined') {
        gsap.killTweensOf('*');
        gsap.globalTimeline.clear();
      }
      if (window.__chkstepanLenis) {
        window.__chkstepanLenis.destroy();
        window.__chkstepanLenis = null;
      }
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      document.body.classList.remove('lenis', 'lenis-smooth');
      window.__chkstepanScrollToTop();
    } catch (error) {
      console.warn('chkstepan cleanup failed', error);
    }
  };

  // Report errors back to server for debugging
  if (typeof window !== 'undefined') {
    window.addEventListener('error', function (e) {
      var msg = encodeURIComponent(e.message || '');
      var url = encodeURIComponent(e.filename || '');
      var line = e.lineno || 0;
      var col = e.colno || 0;
      fetch('/log-error?msg=' + msg + '&url=' + url + '&line=' + line + '&col=' + col);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     1. IMMEDIATE DOM FIXES (before GSAP loads)
     ═══════════════════════════════════════════════════════════════════════════ */
  var injectedCSS = document.createElement('style');
  injectedCSS.textContent = [
    'body .screenContent{display:block!important}',
    'html.lenis,html.lenis body{height:auto}',
    '.lenis.lenis-smooth{scroll-behavior:auto}',
    '.lenis.lenis-smooth [data-lenis-prevent]{overscroll-behavior:contain}',
    // Arrow link hover
    '.style-module-scss-module__nquOPW__arrowLink:hover .style-module-scss-module__nquOPW__iconContainer:first-child{transform:translateX(7px) translateY(-7px) scale(0)!important}',
    '.style-module-scss-module__nquOPW__arrowLink:hover .style-module-scss-module__nquOPW__iconContainer:last-child{transform:none!important}',
    '.style-module-scss-module__nquOPW__iconContainer{transition:transform .35s cubic-bezier(.16,1,.3,1)}',
    // Button hover
    '.style-module-scss-module__dZgGeG__button:hover .style-module-scss-module__dZgGeG__buttonBackground{transform:translateY(0) scaleX(1)!important}',
    '.style-module-scss-module__dZgGeG__button:hover .style-module-scss-module__dZgGeG__buttonTitle{transform:translateY(-50px)!important}',
    '.style-module-scss-module__dZgGeG__button:hover .style-module-scss-module__dZgGeG__SecondButtonTitle{transform:translateY(0)!important}',
    '.style-module-scss-module__dZgGeG__buttonBackground{transition:transform .45s cubic-bezier(.16,1,.3,1)}',
    '.style-module-scss-module__dZgGeG__buttonTitle,.style-module-scss-module__dZgGeG__SecondButtonTitle{transition:transform .45s cubic-bezier(.16,1,.3,1)}',
    // Card link icon hover
    '.style-module-scss-module__UBLvha__cardLinkInner:hover .style-module-scss-module__UBLvha__cardLinkIconContainer:first-child{transform:translateX(7px) translateY(-7px) scale(0)!important}',
    '.style-module-scss-module__UBLvha__cardLinkInner:hover .style-module-scss-module__UBLvha__cardLinkIconContainer:last-child{transform:none!important}',
    '.style-module-scss-module__UBLvha__cardLinkIconContainer{transition:transform .35s cubic-bezier(.16,1,.3,1)}',
    // Typewriter cursor blink
    '@keyframes chkBlink{0%,100%{opacity:1}50%{opacity:0}}',
    '.style-module-scss-module__Z21nJG__cursor{animation:chkBlink 1s step-end infinite}',
    // Circular spinning text badge
    '@keyframes spinText{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}',
    '.style-module-scss-module__x_w73q__circularText{animation:spinText 20s linear infinite;transform-origin:center!important}',
    '.style-module-scss-module__x_w73q__circularTextContainer{transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);transform-origin:center!important}',
    '.style-module-scss-module__x_w73q__circularTextContainer:hover{transform:scale(1.15)!important}',
    '.style-module-scss-module__x_w73q__circularTextContainer:hover .style-module-scss-module__x_w73q__circularText{animation-duration:8s!important}',
    // SERVICES OVERVIEW STACK OVERRIDES
    '.style-module-scss-module__UBLvha__cards .style-module-scss-module__UBLvha__card:nth-child(1){z-index:1!important}',
    '.style-module-scss-module__UBLvha__cards .style-module-scss-module__UBLvha__card:nth-child(2){z-index:2!important}',
    '.style-module-scss-module__UBLvha__cards .style-module-scss-module__UBLvha__card:nth-child(3){z-index:3!important}',
    // MENU HOVER MARQUEE ANIMATION
    '@keyframes chkMenuMq{from{transform:translate3d(0,0,0)}to{transform:translate3d(-25%,0,0)}}',
    '.style-module-scss-module__e43Opa__marqueeInner{animation:chkMenuMq 14s linear infinite!important}',
    '.style-module-scss-module__e43Opa__marquee{transition:transform .5s cubic-bezier(.16,1,.3,1)!important;transform:translateY(101%)!important}',
    '.style-module-scss-module__e43Opa__textMask > div{transition:transform .5s cubic-bezier(.16,1,.3,1)!important}',
    '.style-module-scss-module__e43Opa__menuItem:hover .style-module-scss-module__e43Opa__marquee{transform:translateY(0%)!important}',
    '.style-module-scss-module__e43Opa__menuItem:hover .style-module-scss-module__e43Opa__textMask > div{transform:translateY(-100%)!important}',
    // Projects page: hide hero words before animation
    '.style-module-scss-module__xxZ7PW__word{transform:translateY(100%);display:inline-block}',
    '.style-module-scss-module__xxZ7PW__bottomWord{transform:translateY(100%);display:inline-block}',
    '.style-module-scss-module__xxZ7PW__navLabel{transform:translateY(140%)}',
    '.style-module-scss-module__xxZ7PW__line{transform:scaleX(0);transform-origin:left}',
    '.style-module-scss-module__xxZ7PW__underline{transform:scaleX(0);transform-origin:left}',
    // About page: hide hero elements before animation
    '.style-module-scss-module__i0_1Ga__lineOne{transform:translateY(110%)}',
    '.style-module-scss-module__i0_1Ga__lineTwo{transform:translateY(-110%)}',
    '.style-module-scss-module__i0_1Ga__statMask p{transform:translateY(140%)}',
    '.style-module-scss-module__i0_1Ga__statLine{transform:scaleX(0);transform-origin:left}',
    '.style-module-scss-module__i0_1Ga__underline{transform:scaleX(0);transform-origin:left}',
    '.style-module-scss-module__i0_1Ga__videoDescription{opacity:0;transform:translateY(10px)}',
    '.style-module-scss-module__i0_1Ga__textLine{transform:translateY(100%)}',
    '.style-module-scss-module__i0_1Ga__textLineMask{overflow:hidden}',
    // About page: Skills section overlay starts translated horizontally
    '.style-module-scss-module__FOyjoq__overlay{transform:translateX(100%);pointer-events:none!important}',
    '.style-module-scss-module__FOyjoq__overlayContent .container{height:auto!important}',
    '.style-module-scss-module__FOyjoq__overlayContent .style-module-scss-module__FOyjoq__content{height:auto!important}',
    '.style-module-scss-module__FOyjoq__dPinkCircle, .style-module-scss-module__FOyjoq__lPinkCircle{position:fixed!important}',
    '.style-module-scss-module__FOyjoq__skillsVision{height:300vh!important}',
    '@media (max-width:1000px){.style-module-scss-module__FOyjoq__skillsVision{height:auto!important}}',
    // About page: Vision section overlay starts translated horizontally
    '.style-module-scss-module__gDoBsa__visionPanel{transform:translateX(100%);pointer-events:none!important}',
    '.style-module-scss-module__gDoBsa__title{transform:translateY(100%)}',
    '.style-module-scss-module__gDoBsa__number{transform:translateY(108%)}',
    '.style-module-scss-module__gDoBsa__description{transform:translateY(108%)}',
    '.style-module-scss-module__gDoBsa__line{transform:scaleX(0);transform-origin:left}',
    '.style-module-scss-module__gDoBsa__mainDescription{transform:translateY(108%)}',
    '.style-module-scss-module__mTgFGa__faqPanel{pointer-events:none!important}',
    '.style-module-scss-module__mTgFGa__accordionTrigger{pointer-events:auto!important}',
    '.style-module-scss-module__mTgFGa__titleLink{pointer-events:auto!important}',
    '.style-module-scss-module__FOyjoq__topTitle{transform:translateY(118%)}',
    '.style-module-scss-module__FOyjoq__bottomTitle{transform:translateY(-118%)}',
    '.style-module-scss-module__FOyjoq__line{transform:scaleX(0);transform-origin:left}',
    '.style-module-scss-module__FOyjoq__descLine{transform:translateY(126%)}',
    '.style-module-scss-module__FOyjoq__animTitle{transform:translateY(108%)}',
    '.style-module-scss-module__FOyjoq__mobileScroll{transform:translateY(112%);opacity:0}',
    '.style-module-scss-module__FOyjoq__colNumber{transform:translateY(118%)}',
    '.style-module-scss-module__FOyjoq__colTitle{transform:translateY(110%)}',
    '.style-module-scss-module__FOyjoq__skill{transform:translateY(118%)}',
    '.style-module-scss-module__FOyjoq__scrollProgressBar{opacity:0;transform:translateY(10px)}',
    '.style-module-scss-module__FOyjoq__desktopScroll{transform:translateY(112%);opacity:0}',
    // Overflow hidden on masks (about page)
    '.style-module-scss-module__FOyjoq__numberMask{overflow:hidden}',
    '.style-module-scss-module__FOyjoq__colNumberMask{overflow:hidden}',
    '.style-module-scss-module__FOyjoq__colTitleMask{overflow:hidden}',
    '.style-module-scss-module__FOyjoq__skillMask{overflow:hidden}',
    '.style-module-scss-module__FOyjoq__animTitleMask{overflow:hidden}',
    '.style-module-scss-module__FOyjoq__mobileScrollMask{overflow:hidden}',
    '.style-module-scss-module__FOyjoq__desktopScrollInner{overflow:hidden}',
    '.style-module-scss-module__FOyjoq__lineMask{overflow:hidden}',
    '.style-module-scss-module__FOyjoq__topDescriptionWrapper .style-module-scss-module__FOyjoq__lineMask{overflow:hidden}',
    // Award hover: row hover accent line
    '.style-module-scss-module__nQLyka__award:hover{opacity:0.85}'
  ].join('\n');
  document.head.appendChild(injectedCSS);

  /* ═══════════════════════════════════════════════════════════════════════════
     2. LOAD GSAP + ScrollTrigger + Lenis from CDN
     ═══════════════════════════════════════════════════════════════════════════ */
  var gsapReady = false;
  function loadScript(src, cb) {
    var s = document.createElement('script');
    s.src = src; s.async = false;
    s.onload = cb;
    s.onerror = function () { console.warn('Failed to load: ' + src); if (cb) cb(); };
    document.head.appendChild(s);
  }

  loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', function () {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', function () {
      loadScript('https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js', function () {
        if (typeof gsap !== 'undefined') {
          if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
          gsapReady = true;
        }
        boot();
      });
    });
  });

  /* ═══════════════════════════════════════════════════════════════════════════
     2b. PRELOADER — runs immediately, no GSAP needed for the counter
     ═══════════════════════════════════════════════════════════════════════════ */
  var preloaderDone = false;
  var afterPreloaderQueue = []; // callbacks to run after preloader exits
  (function () {
    var wrapper = document.querySelector('.style-module-scss-module__Tuk-dW__wrapper');
    var grayBg  = document.querySelector('.style-module-scss-module__Tuk-dW__grayBg');
    var counterEl = document.querySelector('.style-module-scss-module__Tuk-dW__counter');

    if (!wrapper || !counterEl) {
      preloaderDone = true;
      return;
    }

    // Populate columns with rolling digit strips
    var cols = counterEl.querySelectorAll(':scope > div');
    if (cols.length >= 3) {
      // Column 0: Hundreds
      cols[0].innerHTML = '<div class="digit-strip" style="position:absolute;top:0;left:0;right:0;display:flex;flex-direction:column;transition:transform 0.45s cubic-bezier(0.16,1,0.3,1);will-change:transform">' +
        '<span class="style-module-scss-module__Tuk-dW__digit">&nbsp;</span>' +
        '<span class="style-module-scss-module__Tuk-dW__digit">1</span>' +
        '</div>';

      // Column 1: Tens
      var tensHtml = '<div class="digit-strip" style="position:absolute;top:0;left:0;right:0;display:flex;flex-direction:column;transition:transform 0.45s cubic-bezier(0.16,1,0.3,1);will-change:transform">' +
        '<span class="style-module-scss-module__Tuk-dW__digit">&nbsp;</span>';
      for (var i = 0; i <= 9; i++) {
        tensHtml += '<span class="style-module-scss-module__Tuk-dW__digit">' + i + '</span>';
      }
      tensHtml += '<span class="style-module-scss-module__Tuk-dW__digit">0</span></div>';
      cols[1].innerHTML = tensHtml;

      // Column 2: Ones
      var onesHtml = '<div class="digit-strip" style="position:absolute;top:0;left:0;right:0;display:flex;flex-direction:column;transition:transform 0.45s cubic-bezier(0.16,1,0.3,1);will-change:transform">';
      for (var i = 0; i <= 9; i++) {
        onesHtml += '<span class="style-module-scss-module__Tuk-dW__digit">' + i + '</span>';
      }
      onesHtml += '<span class="style-module-scss-module__Tuk-dW__digit">0</span></div>';
      cols[2].innerHTML = onesHtml;
    }

    var strips = counterEl.querySelectorAll('.digit-strip');

    // Add loader stripes
    var stripesContainer = document.querySelector('.style-module-scss-module__Tuk-dW__stripesContainer');
    var loaderStripes = [];
    if (stripesContainer) {
      for (var s = 0; s < 7; s++) {
        var stripe = document.createElement('div');
        stripe.className = 'style-module-scss-module__Tuk-dW__loaderStripe';
        stripe.style.left = ((s + 1) * (100 / 8)) + '%';
        stripe.style.transformOrigin = 'bottom';
        stripe.style.transform = 'scaleY(0)'; // Start at 0% height
        stripe.style.transition = 'transform 0.4s ease-out';
        stripesContainer.appendChild(stripe);
        loaderStripes.push(stripe);
      }
    }

    function updateCounter(P) {
      if (strips.length < 3) return;

      // Format P as "  0" to "100"
      var str = String(P);
      if (str.length === 1) str = '  ' + str;
      else if (str.length === 2) str = ' ' + str;

      var cHundreds = str[0];
      var cTens = str[1];
      var cOnes = str[2];

      var hundredsIdx = 0;
      if (cHundreds === '1') hundredsIdx = 1;

      var tensIdx = 0;
      if (cTens !== ' ') {
        if (P === 100) tensIdx = 11; // Last '0'
        else tensIdx = parseInt(cTens) + 1;
      }

      var onesIdx = parseInt(cOnes);
      if (P === 100) onesIdx = 10; // Last '0'

      // Safely get offsetTop to account for any CSS margins on digits
      var hOffset = strips[0].children[hundredsIdx] ? strips[0].children[hundredsIdx].offsetTop : 0;
      var tOffset = strips[1].children[tensIdx] ? strips[1].children[tensIdx].offsetTop : 0;
      var oOffset = strips[2].children[onesIdx] ? strips[2].children[onesIdx].offsetTop : 0;

      strips[0].style.transform = 'translate3d(0, -' + hOffset + 'px, 0)';
      strips[1].style.transform = 'translate3d(0, -' + tOffset + 'px, 0)';
      strips[2].style.transform = 'translate3d(0, -' + oOffset + 'px, 0)';
      
      // Update stripe heights to match percentage (growing from bottom)
      loaderStripes.forEach(function(stripe) {
        stripe.style.transform = 'scaleY(' + (P / 100) + ')';
      });
    }

    var count = 0;
    updateCounter(0);

    var iv = setInterval(function () {
      count = Math.min(count + Math.floor(Math.random() * 5) + 2, 100);
      updateCounter(count);
      
      if (count >= 100) {
        clearInterval(iv);
        window.__chkstepanPreloaderInterval = null;
        setTimeout(function () {
          // Slide away: use GSAP if available, otherwise CSS transition
          if (gsapReady && typeof gsap !== 'undefined') {
            // First fade out stripes
            gsap.to(loaderStripes, {
              scaleY: 0,
              transformOrigin: 'top',
              duration: 0.6,
              stagger: 0.05,
              ease: 'power3.inOut'
            });
            
            gsap.to([wrapper, grayBg].filter(Boolean), {
              y: '-101%', duration: 1.1, ease: 'power3.inOut', delay: 0.2,
              onComplete: function () { finishPreloader(); }
            });
          } else {
            // CSS fallback
            var t = 'transform 1.1s cubic-bezier(0.85,0,0.15,1)';
            wrapper.style.transition = t;
            wrapper.style.transform = 'translateY(-101%)';
            if (grayBg) { grayBg.style.transition = t; grayBg.style.transform = 'translateY(-101%)'; }
            setTimeout(finishPreloader, 1200);
          }
        }, 600);
      }
    }, 45);
    window.__chkstepanPreloaderInterval = iv;

    // Safety fallback: if stuck for 5s, force-hide preloader
    setTimeout(function () {
      if (!preloaderDone) {
        clearInterval(iv);
        window.__chkstepanPreloaderInterval = null;
        wrapper.style.display = 'none';
        if (grayBg) grayBg.style.display = 'none';
        finishPreloader();
      }
    }, 5000);

    function finishPreloader() {
      preloaderDone = true;
      afterPreloaderQueue.forEach(function (fn) { fn(); });
      afterPreloaderQueue = [];
    }

    window.__chkstepanDismissPreloader = function () {
      if (window.__chkstepanPreloaderInterval) {
        clearInterval(window.__chkstepanPreloaderInterval);
        window.__chkstepanPreloaderInterval = null;
      }
      if (wrapper) {
        wrapper.style.display = 'none';
        wrapper.style.transform = 'translateY(-101%)';
      }
      if (grayBg) {
        grayBg.style.display = 'none';
        grayBg.style.transform = 'translateY(-101%)';
      }
      preloaderDone = true;
    };
  })();

  /* ═══════════════════════════════════════════════════════════════════════════
     3. NON-GSAP: Cursor, Clock (run immediately)
     ═══════════════════════════════════════════════════════════════════════════ */

  // ── Custom cursor ──
  (function () {
    var dot = document.querySelector('.style-module-scss-module__GV1P3W__dot');
    var bdr = document.querySelector('.style-module-scss-module__GV1P3W__borderDot');
    if (!dot || !bdr) return;
    var mx = 0, my = 0, bx = 0, by = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    (function f() {
      bx += (mx - bx) * 0.12; by += (my - by) * 0.12;
      bdr.style.left = bx + 'px'; bdr.style.top = by + 'px';
      requestAnimationFrame(f);
    })();
    document.addEventListener('mouseover', function (e) {
      var s = e.target.closest('a,button,[role="button"]') ? 1.8 : 1;
      bdr.style.transform = 'translate(-50%,-50%) scale(' + s + ')';
    });
  })();

  // ── Live clock (Bucharest) ──
  (function () {
    function tick() {
      var tShort = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Europe/Bucharest', hour: '2-digit', minute: '2-digit'
      });
      var tFull = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Europe/Bucharest', hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
      document.querySelectorAll(
        '.style-module-scss-module__MjpYSW__bottom p span,' +
        '.style-module-scss-module__1eBtna__bottomText span'
      ).forEach(function (el) { el.textContent = tShort; });
      // Contact page time node shows full HH:MM:SS (EET)
      var timeNode = document.querySelector('[data-time-node="true"]');
      if (timeNode) timeNode.textContent = tFull + ' (EET)';
    }
    tick(); setInterval(tick, 1000);
  })();

  /* ═══════════════════════════════════════════════════════════════════════════
     4. MAIN BOOT (after GSAP is ready)
     ═══════════════════════════════════════════════════════════════════════════ */
  function boot() {
    var g = gsap;

    // Shorthand selectors
    function $(s)  { return document.querySelector(s); }
    function $$(s) { return Array.from(document.querySelectorAll(s)); }

    /* ─── Lenis smooth scrolling ──────────────────────────────────────────── */
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.__chkstepanScrollToTop();
    var lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    window.__chkstepanLenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    window.__chkstepanLenisTick = function (time) {
      if (window.__chkstepanLenis) {
        window.__chkstepanLenis.raf(time * 1000);
      }
    };
    gsap.ticker.remove(window.__chkstepanLenisTick);
    gsap.ticker.add(window.__chkstepanLenisTick);
    gsap.ticker.lagSmoothing(0);
    window.__chkstepanScrollToTop();

    /* ─── Perlin Noise Helper ─── */
    var Perlin = (function () {
      var p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
      var perm = new Array(512);
      var gradP = new Array(512);
      var grad3 = [
        {x:1, y:1}, {x:-1, y:1}, {x:1, y:-1}, {x:-1, y:-1},
        {x:1, y:0}, {x:-1, y:0}, {x:1, y:0}, {x:-1, y:0},
        {x:0, y:1}, {x:0, y:-1}, {x:0, y:1}, {x:0, y:-1}
      ];
      
      // Seed
      var seedVal = Math.random() * 65536;
      seedVal = Math.floor(seedVal);
      if (seedVal < 256) seedVal |= seedVal << 8;
      for (var i = 0; i < 256; i++) {
        var s = (i & 1) ? (p[i] ^ (255 & seedVal)) : (p[i] ^ ((seedVal >> 8) & 255));
        perm[i] = perm[i+256] = s;
        var g = grad3[s % 12];
        gradP[i] = gradP[i+256] = {
          dot2: function (x, y) { return this.x * x + this.y * y; },
          x: g.x, y: g.y
        };
      }

      function fade(t) { return t * t * t * (t * (6 * t - 15) + 10); }
      function lerp(a, b, t) { return (1 - t) * a + t * b; }

      return {
        noise2d: function (x, y) {
          var X = Math.floor(x), Y = Math.floor(y);
          x -= X; y -= Y;
          X &= 255; Y &= 255;
          var r = gradP[X + perm[Y]].dot2(x, y);
          var l = gradP[X + perm[Y+1]].dot2(x, y - 1);
          var n = gradP[X+1 + perm[Y]].dot2(x - 1, y);
          var i = gradP[X+1 + perm[Y+1]].dot2(x - 1, y - 1);
          var u = fade(x);
          return lerp(lerp(r, n, u), lerp(l, i, u), fade(y));
        }
      };
    })();

    /* ─── Interactive Perlin Noise waves canvas ────────────────────────── */
    (function () {
      var container = $('.style-module-scss-module__NLzJ3a__waves');
      var canvas = $('.style-module-scss-module__NLzJ3a__wavesCanvas');
      if (!canvas || !container) return;
      var ctx = canvas.getContext('2d');

      var w = 0, h = 0;
      var left = 0, top = 0;
      var grid = [];

      var cursor = { x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false };
      
      var config = {
        lineColor: 'rgba(253,253,253,0.12)',
        waveSpeedX: 0.0125,
        waveSpeedY: 0.005,
        waveAmpX: 32,
        waveAmpY: 16,
        friction: 0.925,
        tension: 0.005,
        maxCursorMove: 100,
        xGap: 10,
        yGap: 32
      };

      function resize() {
        var rect = container.getBoundingClientRect();
        w = canvas.width = rect.width;
        h = canvas.height = rect.height;
        left = rect.left;
        top = rect.top;

        // Initialize grid points
        grid = [];
        var cols = Math.ceil((w + 200) / config.xGap);
        var rows = Math.ceil((h + 30) / config.yGap);
        var startX = (w - config.xGap * cols) / 2;
        var startY = (h - config.yGap * rows) / 2;

        for (var c = 0; c <= cols; c++) {
          var col = [];
          for (var r = 0; r <= rows; r++) {
            col.push({
              x: startX + config.xGap * c,
              y: startY + config.yGap * r,
              wave: { x: 0, y: 0 },
              cursor: { x: 0, y: 0, vx: 0, vy: 0 }
            });
          }
          grid.push(col);
        }
      }

      resize();
      window.addEventListener('resize', resize);

      // Track mouse
      window.addEventListener('mousemove', function (e) {
        var rect = container.getBoundingClientRect();
        left = rect.left;
        top = rect.top;
        cursor.x = e.clientX - left;
        cursor.y = e.clientY - top;
        if (!cursor.set) {
          cursor.sx = cursor.x;
          cursor.sy = cursor.y;
          cursor.lx = cursor.x;
          cursor.ly = cursor.y;
          cursor.set = true;
        }
      });

      window.addEventListener('touchmove', function (e) {
        var rect = container.getBoundingClientRect();
        left = rect.left;
        top = rect.top;
        var t = e.touches[0];
        cursor.x = t.clientX - left;
        cursor.y = t.clientY - top;
        if (!cursor.set) {
          cursor.sx = cursor.x;
          cursor.sy = cursor.y;
          cursor.lx = cursor.x;
          cursor.ly = cursor.y;
          cursor.set = true;
        }
      }, { passive: false });

      // Helper to calculate coordinates
      function getPtCoords(pt, applyCursor) {
        var cx = applyCursor ? pt.cursor.x : 0;
        var cy = applyCursor ? pt.cursor.y : 0;
        return {
          x: Math.round(10 * (pt.x + pt.wave.x + cx)) / 10,
          y: Math.round(10 * (pt.y + pt.wave.y + cy)) / 10
        };
      }

      var frameId = null;
      function render(time) {
        if (!container) return;

        // Update cursor physics
        cursor.sx += (cursor.x - cursor.sx) * 0.1;
        cursor.sy += (cursor.y - cursor.sy) * 0.1;

        var dx = cursor.x - cursor.lx;
        var dy = cursor.y - cursor.ly;
        var dist = Math.hypot(dx, dy);

        cursor.v = dist;
        cursor.vs += (dist - cursor.vs) * 0.1;
        cursor.vs = Math.min(100, cursor.vs);
        cursor.lx = cursor.x;
        cursor.ly = cursor.y;
        cursor.a = Math.atan2(dy, dx);

        // Update grid points physics
        grid.forEach(function (col) {
          col.forEach(function (pt) {
            // Perlin wave noise
            var angle = 12 * Perlin.noise2d((pt.x + time * config.waveSpeedX) * 0.002, (pt.y + time * config.waveSpeedY) * 0.0015);
            pt.wave.x = Math.cos(angle) * config.waveAmpX;
            pt.wave.y = Math.sin(angle) * config.waveAmpY;

            // Cursor push force
            var m = Math.hypot(pt.x - cursor.sx, pt.y - cursor.sy);
            var maxDist = Math.max(175, cursor.vs);
            if (m < maxDist) {
              var force = Math.cos(0.001 * m) * (1 - m / maxDist);
              pt.cursor.vx += Math.cos(cursor.a) * force * maxDist * cursor.vs * 0.00065;
              pt.cursor.vy += Math.sin(cursor.a) * force * maxDist * cursor.vs * 0.00065;
            }

            // Spring return force
            pt.cursor.vx += (0 - pt.cursor.x) * config.tension;
            pt.cursor.vy += (0 - pt.cursor.y) * config.tension;
            pt.cursor.vx *= config.friction;
            pt.cursor.vy *= config.friction;
            pt.cursor.x += 2 * pt.cursor.vx;
            pt.cursor.y += 2 * pt.cursor.vy;
            pt.cursor.x = Math.min(config.maxCursorMove, Math.max(-config.maxCursorMove, pt.cursor.x));
            pt.cursor.y = Math.min(config.maxCursorMove, Math.max(-config.maxCursorMove, pt.cursor.y));
          });
        });

        // Draw grid lines
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.strokeStyle = config.lineColor;
        ctx.lineWidth = 1;

        grid.forEach(function (col) {
          var first = getPtCoords(col[0], false);
          ctx.moveTo(first.x, first.y);
          col.forEach(function (pt, idx) {
            var isLast = idx === col.length - 1;
            var current = getPtCoords(pt, !isLast);
            var next = getPtCoords(col[idx + 1] || col[col.length - 1], !isLast);
            ctx.lineTo(current.x, current.y);
            if (isLast) {
              ctx.moveTo(next.x, next.y);
            }
          });
        });

        ctx.stroke();
        frameId = requestAnimationFrame(render);
      }

      frameId = requestAnimationFrame(render);
    })();

    /* ─── Menu toggle ────────────────────────────────────────────────────── */
    (function () {
      var btn = $('.style-module-scss-module__MjpYSW__menuToggle');
      var menu = $('.style-module-scss-module__MjpYSW__menu');
      if (!btn || !menu) return;
      menu.style.pointerEvents = 'none';
      var navDivs   = $$('.style-module-scss-module__e43Opa__textMask > div');
      var descLines = Array.from(menu.querySelectorAll('.style-module-scss-module__MjpYSW__description .style-module-scss-module__MjpYSW__lineMask p'));
      var metaLines = Array.from(menu.querySelectorAll('.style-module-scss-module__jMWBMW__lineMask > div,.style-module-scss-module__MjpYSW__bottom .style-module-scss-module__MjpYSW__lineMask p,.style-module-scss-module__MjpYSW__col .style-module-scss-module__MjpYSW__lineMask p'));
      g.set(navDivs, { y: '100%', scale: 0.8, rotateX: 12, transformOrigin: 'bottom center' });
      g.set(descLines, { y: '106%', scale: 1.15, transformOrigin: 'bottom left' });
      g.set(metaLines, { y: '106%' });
      btn.addEventListener('click', function () {
        var open = btn.classList.toggle('style-module-scss-module__MjpYSW__opened');
        menu.classList.toggle('style-module-scss-module__MjpYSW__opened', open);
        document.body.style.overflow = open ? 'hidden' : '';
        menu.style.pointerEvents = open ? 'all' : 'none';
        if (open) {
          g.fromTo(menu, { clipPath: 'polygon(0% 100%,100% 100%,100% 100%,0% 100%)' },
            { clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)', duration: 0.9, ease: 'power4.inOut' });
          g.to(navDivs,   { y:'0%',scale:1,rotateX:0,duration:1,ease:'power3.out',stagger:0.1,delay:0.35 });
          g.to('.style-module-scss-module__e43Opa__itemNumber', { opacity: 1, duration: 0.8, delay: 0.5 });
          g.to(descLines, { y:'0%',scale:1,duration:0.9,ease:'power3.out',stagger:0.07,delay:0.55 });
          g.to(metaLines, { y:'0%',duration:0.8,ease:'power3.out',stagger:0.06,delay:0.65 });
        } else {
          g.to(menu, { clipPath:'polygon(0% 100%,100% 100%,100% 100%,0% 100%)',duration:0.7,ease:'power3.inOut' });
          g.set(navDivs,   { y:'100%',scale:0.8,rotateX:12,delay:0.7 });
          g.set('.style-module-scss-module__e43Opa__itemNumber', { opacity: 0, delay: 0.7 });
          g.set(descLines, { y:'106%',scale:1.15,delay:0.7 });
          g.set(metaLines, { y:'106%',delay:0.7 });
        }
      });
    })();

    /* ─── Project hover image preview ────────────────────────────────────── */
    (function () {
      var rows = $$('.style-module-scss-module__nQLyka__award');
      var preview = $('.style-module-scss-module__nQLyka__awardPreview');
      if (!rows.length || !preview) return;
      var s2 = document.createElement('style');
      s2.textContent = '.style-module-scss-module__nQLyka__awardPreview{position:fixed;width:280px;height:200px;border-radius:10px;pointer-events:none;z-index:500;opacity:0;background-size:cover;background-position:center;transform:translate(-50%,-50%) scale(.85);box-shadow:0 20px 50px rgba(0,0,0,.5)}';
      document.head.appendChild(s2);
      var tx=0,ty=0,cx=0,cy=0;
      (function tr(){cx+=(tx-cx)*0.1;cy+=(ty-cy)*0.1;preview.style.left=cx+'px';preview.style.top=cy+'px';requestAnimationFrame(tr)})();
      rows.forEach(function(row,i){
        var img='/images/projects/ProjectImage'+(i+1)+'.webp';
        row.addEventListener('mouseenter',function(e){preview.style.backgroundImage='url('+img+')';g.to(preview,{opacity:1,scale:1,duration:0.35,ease:'power2.out'});tx=e.clientX;ty=e.clientY});
        row.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY});
        row.addEventListener('mouseleave',function(){g.to(preview,{opacity:0,scale:0.85,duration:0.25,ease:'power2.in'})});
      });
    })();

    /* ─── Marquee ────────────────────────────────────────────────────────── */
    (function () {
      var jacket = $('.style-module-scss-module__4XAcvW__curvedLoopJacket');
      if (!jacket) return;
      jacket.style.visibility = 'visible';
      jacket.innerHTML = '<style>@keyframes chkMq{from{transform:translateX(0)}to{transform:translateX(-50%)}}</style>' +
        '<div style="overflow:hidden;width:100%;padding:28px 0;border-top:1px solid rgba(253,253,253,.1)">' +
        '<div style="display:flex;white-space:nowrap;animation:chkMq 22s linear infinite">' +
        '<span style="font-family:Dirtyline,sans-serif;font-size:2.6rem;color:#fdfdfd;padding-right:48px">Be ✱ Creative ✱ With ✱ Me ✱ Be ✱ Creative ✱ With ✱ Me ✱ Be ✱ Creative ✱ With ✱ Me ✱ </span>' +
        '<span style="font-family:Dirtyline,sans-serif;font-size:2.6rem;color:#fdfdfd;padding-right:48px">Be ✱ Creative ✱ With ✱ Me ✱ Be ✱ Creative ✱ With ✱ Me ✱ Be ✱ Creative ✱ With ✱ Me ✱ </span></div></div>';
    })();

    /* ─── Draggable and Interactive lanyard badge (About page) ─────────────── */
    (function () {
      var wrap = $('.style-module-scss-module__-80N3q__lanyardWrapper');
      if (!wrap) return;

      // Render official pink strap and card
      wrap.innerHTML =
        '<style>' +
        '#lanyard-fallback-container { position:absolute; left: 50%; transform: translateX(-50%); top: -20px; pointer-events: auto; display: flex; flex-direction: column; align-items: center; z-index: 10; }' +
        '@media (max-width: 1024px) { #lanyard-fallback-container { left: 50%; transform: translateX(-50%) scale(0.85); top: -40px; } }' +
        '@media (max-width: 768px) { #lanyard-fallback-container { left: 50%; transform: translateX(-50%) scale(0.65); top: -60px; } }' +
        '@media (max-width: 480px) { #lanyard-fallback-container { display: none; } }' +
        '</style>' +
        '<div id="lanyard-fallback-container" style="opacity:0">' +
          // Lanyard strap (outer wrapper)
          '<div id="lanyard-strap" style="width:18px;height:130px;transform-origin:top center;background:repeating-linear-gradient(45deg, #df7097, #df7097 8px, #fdfdfd 8px, #fdfdfd 16px);border-radius:0 0 2px 2px;box-shadow:0 10px 20px rgba(0,0,0,0.15);will-change:transform;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end">' +
            // Black loop connector (child of strap)
            '<div style="width:6px;height:12px;background:#18181c;margin-bottom:-6px;border-radius:2px;position:relative;z-index:2"></div>' +
            // Silver hook ring (child of strap)
            '<div id="lanyard-hook" style="width:14px;height:14px;border:2px solid #52525e;border-radius:50%;margin-bottom:-12px;position:relative;z-index:2">' +
              // Card container (nested child of hook ring so it never detaches!)
              '<div id="badge-card" style="width:200px;height:300px;position:absolute;top:10px;left:-93px;cursor:grab;background:#df7097;border:1px solid rgba(253,253,253,0.15);border-radius:12px;padding:26px 18px;box-sizing:border-box;box-shadow:0 35px 70px rgba(223,112,151,0.32), 0 12px 30px rgba(0,0,0,0.25);will-change:transform;user-select:none;transform-style:preserve-3d;perspective:800px;transform-origin:top center">' +
                // Inner content
                '<div style="font-family:Thunder-LC,sans-serif;font-size:2.35rem;font-weight:900;color:#fdfdfd;line-height:0.9;text-transform:uppercase;text-align:left;letter-spacing:-0.01em;transform:translateZ(10px)">' +
                  'I Build<br>What You<br>Can\'t<br>Imagine' +
                '</div>' +
                '<div style="font-family:Nohemi,sans-serif;font-size:0.5rem;font-weight:300;color:rgba(253,253,253,0.85);text-align:left;line-height:1.45;margin-top:16px;letter-spacing:0.01em;transform:translateZ(5px)">' +
                  'Turning complex ideas into seamless digital products, built with precision, motion, and modern tools.' +
                '</div>' +
                // Sticker logo bottom-right
                '<div style="position:absolute;bottom:18px;right:18px;width:38px;height:38px;background:#fdfdfd;border-radius:4px;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 14px rgba(0,0,0,0.18);transform:translateZ(12px)">' +
                  '<img src="/images/brand/LogoDark.svg" style="width:23px;height:23px" draggable="false"/>' +
                '</div>' +
                // Left-bottom web URL
                '<div style="position:absolute;bottom:18px;left:18px;font-family:Nohemi,sans-serif;font-size:0.42rem;color:rgba(253,253,253,0.5);letter-spacing:0.04em;text-transform:lowercase;transform:translateZ(5px)">' +
                  'about' +
                '</div>' +
                // Glassmorphism shine overlay
                '<div style="position:absolute;inset:0;border-radius:12px;background:linear-gradient(135deg, rgba(253,253,253,0.15) 0%, rgba(253,253,253,0) 50%, rgba(0,0,0,0.08) 100%);pointer-events:none;transform:translateZ(1px)"></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';

      var container = wrap.querySelector('#lanyard-fallback-container');
      var card = wrap.querySelector('#badge-card');
      var strap = wrap.querySelector('#lanyard-strap');
      if (!container || !card || !strap) return; // Safety guard
      var dragging = false;
      var idleTween = null;

      // Gentle idle swing
      function startIdle() {
        if (idleTween) idleTween.kill();
        idleTween = g.to(strap, {
          rotation: 3,
          duration: 2.2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          onUpdate: function () {
            var currAngle = g.getProperty(strap, 'rotation');
            g.set(card, { rotateY: currAngle * 0.5, rotateX: -currAngle * 0.3, scaleY: 1 });
          }
        });
      }

      // Springy drop-in when preloader finishes sliding up
      afterPreloaderQueue.push(function () {
        g.fromTo(container,
          { y: -650, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.8, ease: 'bounce.out', delay: 0.1, onComplete: startIdle }
        );
      });

      card.addEventListener('mousedown', function (e) {
        dragging = true;
        if (idleTween) idleTween.kill();
        g.killTweensOf([card, strap]);
        card.style.cursor = 'grabbing';
      });

      // Mouse interactive swing and vertical stretch/squash (top-to-bottom motion)
      document.addEventListener('mousemove', function (e) {
        var rect = container.getBoundingClientRect();
        var originX = rect.left + rect.width / 2;
        var originY = rect.top; // anchor point

        var dx = e.clientX - originX;
        var dy = e.clientY - originY;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dragging) {
          var angle = Math.atan2(dx, dy) * (180 / Math.PI);
          angle = Math.max(-50, Math.min(50, angle)); // Limit angle
          
          var scaleY = Math.max(0.6, Math.min(1.4, dist / 130));

          g.set(strap, { rotation: angle, scaleY: scaleY });
          g.set(card, { rotateY: angle * 0.6, rotateX: -angle * 0.4, scaleY: 1 / scaleY });
        } else {
          if (dist < 450) {
            if (idleTween) idleTween.pause();
            var factor = (1 - dist / 450);
            var angle = Math.atan2(dx, dy) * (180 / Math.PI);
            angle = Math.max(-32, Math.min(32, angle)) * factor;

            var targetScaleY = 1 + (dy / dist) * factor * 0.16; // up to 16% vertical bounce
            targetScaleY = Math.max(0.8, Math.min(1.2, targetScaleY));

            g.to(strap, { rotation: angle, scaleY: targetScaleY, duration: 0.75, ease: 'power2.out', overwrite: 'auto' });
            g.to(card, {
              rotateY: angle * 0.6,
              rotateX: -angle * 0.4,
              scaleY: 1 / targetScaleY,
              duration: 0.75,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          } else {
            if (idleTween && idleTween.paused()) {
              g.to(strap, { rotation: 0, scaleY: 1, duration: 1.1, ease: 'power2.out' });
              g.to(card, {
                rotateX: 0,
                rotateY: 0,
                scaleY: 1,
                duration: 1.1,
                ease: 'power2.out',
                onComplete: function () {
                  if (idleTween) idleTween.resume();
                }
              });
            }
          }
        }
      });

      document.addEventListener('mouseup', function () {
        if (!dragging) return;
        dragging = false;
        card.style.cursor = 'grab';

        g.to(strap, {
          rotation: 0,
          scaleY: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.45)',
          onUpdate: function () {
            var currAngle = g.getProperty(strap, 'rotation');
            var currScaleY = g.getProperty(strap, 'scaleY');
            g.set(card, { rotateY: currAngle * 0.5, rotateX: -currAngle * 0.3, scaleY: 1 / currScaleY });
          },
          onComplete: startIdle
        });
      });
    })();

    /* ─── About page: FAQ Accordion click handler ───────────────────────── */
    (function () {
      var triggers = $$('.style-module-scss-module__mTgFGa__accordionTrigger');
      triggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () {
          var isExpanded = trigger.getAttribute('aria-expanded') === 'true';
          
          // Collapse all other accordion items (live website allows multiple or single? Let's do single to be super clean)
          triggers.forEach(function (t) {
            if (t !== trigger) {
              t.setAttribute('aria-expanded', 'false');
              var body = t.nextElementSibling;
              if (body) body.style.height = '0px';
              var icon = t.querySelector('.style-module-scss-module__mTgFGa__accordionIcon');
              if (icon) g.to(icon, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            }
          });

          // Toggle current
          trigger.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
          var currentBody = trigger.nextElementSibling;
          if (currentBody) {
            currentBody.style.height = !isExpanded ? currentBody.scrollHeight + 'px' : '0px';
          }
          var currentIcon = trigger.querySelector('.style-module-scss-module__mTgFGa__accordionIcon');
          if (currentIcon) {
            g.to(currentIcon, { rotation: !isExpanded ? 45 : 0, duration: 0.3, ease: 'power2.out' });
          }
        });
      });
    })();

    /* ─── Contact page: Orbiting logo icons ─────────────────────────────── */
    (function () {
      var visual = $('.style-module-scss-module__IGrPbq__contactVisual');
      if (!visual) return;

      // The live site has 5 logo versions orbiting. Recreate them.
      var logoUrls = [
        '/images/contactLogos/LogoV1Contact.webp',
        '/images/contactLogos/LogoV2Contact.webp',
        '/images/contactLogos/LogoV3Contact.webp',
        '/images/contactLogos/LogoV4Contact.webp',
        '/images/contactLogos/LogoV5Contact.webp'
      ];

      // Remove the existing single icon
      visual.innerHTML = '';

      // Create orbit container
      var orbitContainer = document.createElement('div');
      orbitContainer.style.cssText = 'position:relative;width:clamp(3rem,2.706rem+1.47vw,5rem);height:clamp(3rem,2.706rem+1.47vw,5rem)';

      var iconSize = 'clamp(3rem,2.706rem+1.47vw,5rem)';
      var orbitRadius = 140; // px from center
      var icons = [];

      logoUrls.forEach(function (url, i) {
        var wrapper = document.createElement('div');
        var angle = (i / logoUrls.length) * Math.PI * 2;
        var ox = Math.cos(angle) * orbitRadius;
        var oy = Math.sin(angle) * orbitRadius;
        wrapper.className = 'style-module-scss-module__IGrPbq__contactIcon';
        wrapper.style.cssText = 'position:absolute;width:clamp(3rem,2.706rem+1.47vw,5rem);height:clamp(3rem,2.706rem+1.47vw,5rem);top:50%;left:50%;transform:translate(calc(-50% + ' + ox + 'px), calc(-50% + ' + oy + 'px));opacity:0';

        var img = document.createElement('img');
        img.src = url;
        img.alt = 'Logo 3D';
        img.style.cssText = 'position:absolute;width:100%;height:100%;object-fit:contain;top:0;left:0';
        wrapper.appendChild(img);
        visual.appendChild(wrapper);
        icons.push({ el: wrapper, baseAngle: angle, ox: ox, oy: oy });
      });

      // Animate icons in after preloader
      function animateIn() {
        icons.forEach(function (icon, i) {
          g.to(icon.el, {
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.4 + i * 0.08
          });
        });

        // Continuous slow orbit rotation
        var orbitAngle = 0;
        var mouseX = 0, mouseY = 0;
        var cx = window.innerWidth / 2, cy = window.innerHeight / 2;

        function orbitFrame() {
          orbitAngle += 0.003;
          icons.forEach(function (icon, i) {
            var a = icon.baseAngle + orbitAngle;
            var r = orbitRadius + Math.sin(orbitAngle * 2 + i) * 12;
            var ox = Math.cos(a) * r + (mouseX - cx) * 0.04;
            var oy = Math.sin(a) * r + (mouseY - cy) * 0.04;
            icon.el.style.transform = 'translate(calc(-50% + ' + ox + 'px), calc(-50% + ' + oy + 'px))';
          });
          requestAnimationFrame(orbitFrame);
        }
        requestAnimationFrame(orbitFrame);

        document.addEventListener('mousemove', function (e) {
          mouseX = e.clientX;
          mouseY = e.clientY;
        });
      }

      afterPreloaderQueue.push(animateIn);
    })();

    /* ─── Pinned card stack (Strategy section) ─────────────────────────── */
    (function () {
      var scroller = $('.style-module-scss-module__rdV7za__scroller');
      if (!scroller) return;
      var cards = Array.from(scroller.querySelectorAll('.style-module-scss-module__rdV7za__card'));
      var endEl = scroller.querySelector('.style-module-scss-module__rdV7za__end');
      if (!cards.length) return;

      // Set initial styles for the cards stacking
      cards.forEach(function (card, i) {
        if (i < cards.length - 1) {
          card.style.marginBottom = '50px';
        }
        card.style.willChange = 'transform, filter';
        card.style.transformOrigin = 'top center';
        card.style.backfaceVisibility = 'hidden';
        card.style.transform = 'translateZ(0)';
      });

      // Track last applied transforms to minimize DOM writes
      var prevValues = [];

      function updateCardStack() {
        var scrollTop = window.scrollY;
        var viewHeight = window.innerHeight;
        
        var stackPos = 0.3 * viewHeight; // n = 30%
        var scaleEndPos = 0.1 * viewHeight; // i = 10%
        var endTop = endEl ? (endEl.getBoundingClientRect().top + scrollTop) : 0;
        var endLimit = endTop - viewHeight / 2;

        cards.forEach(function (card, i) {
          var prev = prevValues[i] || { y: 0 };
          var initialTop = card.getBoundingClientRect().top + scrollTop - prev.y;
          
          var stackDistSpacing = 10; // itemStackDistance = 10
          var startScroll = initialTop - stackPos - stackDistSpacing * i;
          var endScaleScroll = initialTop - scaleEndPos;

          // Calculate translateY (k)
          var k = 0;
          if (scrollTop >= startScroll && scrollTop <= endLimit) {
            k = scrollTop - initialTop + stackPos + stackDistSpacing * i;
          } else if (scrollTop > endLimit) {
            k = endLimit - initialTop + stackPos + stackDistSpacing * i;
          }

          // Calculate progress fraction (g)
          var progress = 0;
          if (scrollTop >= startScroll) {
            if (scrollTop > endScaleScroll) {
              progress = 1;
            } else {
              progress = (scrollTop - startScroll) / (endScaleScroll - startScroll);
            }
          }

          // Calculate scale
          var targetScale = 0.85 + i * 0.03; // baseScale = 0.85, itemScale = 0.03
          var scale = 1 - progress * (1 - targetScale);

          // Calculate blur
          var blur = 0;
          var activePinIndex = -1;
          for (var a = 0; a < cards.length; a++) {
            var aPrev = prevValues[a] || { y: 0 };
            var aTop = cards[a].getBoundingClientRect().top + scrollTop - aPrev.y;
            var aStartScroll = aTop - stackPos - stackDistSpacing * a;
            if (scrollTop >= aStartScroll) {
              activePinIndex = a;
            }
          }
          if (i < activePinIndex) {
            blur = Math.max(0, (activePinIndex - i) * 3);
          }

          if (Math.abs(prev.y - k) > 0.5 || Math.abs(prev.scale - scale) > 0.002 || Math.abs(prev.blur - blur) > 0.1) {
            card.style.transform = 'translate3d(0, ' + Math.round(k * 100) / 100 + 'px, 0) scale(' + Math.round(scale * 1000) / 1000 + ')';
            card.style.filter = blur > 0 ? 'blur(' + Math.round(blur * 100) / 100 + 'px)' : '';
            prevValues[i] = { y: k, scale: scale, blur: blur };
          }
        });
      }

      // Sync updating with scroll event
      window.addEventListener('scroll', updateCardStack);
      window.addEventListener('resize', updateCardStack);
      
      // Initial trigger
      setTimeout(updateCardStack, 100);
      afterPreloaderQueue.push(function () {
        setTimeout(updateCardStack, 300);
      });
    })();

    /* ─── Typewriter effect for "Clarity Meets ___" ──────────────────────── */
    (function () {
      var typeEl = $('.style-module-scss-module__Z21nJG__textType');
      if (!typeEl) return;
      var textSpan = typeEl.querySelector('span[style*="color"]') || typeEl.querySelector('span:first-child');
      if (!textSpan) return;
      var words = ['Soul', 'Story', 'Design', 'Space', 'Home'];
      var wi = 0, ci = 0, deleting = false;
      function type() {
        var word = words[wi];
        if (!deleting) {
          ci++;
          textSpan.textContent = word.substring(0, ci);
          if (ci === word.length) { setTimeout(function () { deleting = true; type(); }, 2000); return; }
          setTimeout(type, 80 + Math.random() * 60);
        } else {
          ci--;
          textSpan.textContent = word.substring(0, ci);
          if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 500); return; }
          setTimeout(type, 40);
        }
      }
      setTimeout(type, 1500);
    })();

    /* ═══════════════════════════════════════════════════════════════════════
       PRELOADER → HERO ENTRANCE → SCROLL ANIMATIONS
       ═══════════════════════════════════════════════════════════════════════ */
    (function () {
      var wrapper = $('.style-module-scss-module__Tuk-dW__wrapper');
      var grayBg  = $('.style-module-scss-module__Tuk-dW__grayBg');
      var digitEl = $('.style-module-scss-module__Tuk-dW__digit');

      /* ── After preloader: Hero entrance ── */
      function heroEntrance() {
        // Detect current page
        var pageEl = document.querySelector('[data-page]');
        var page = pageEl ? pageEl.getAttribute('data-page') : 'index';

        // Header (all pages)
        var header = $('.style-module-scss-module__wVhsRa__header');
        if (header) g.from(header, { y:-80,opacity:0,duration:1,ease:'power3.out',delay:0.1 });

        // Background stripes (first set, in hero) - all pages
        g.to('.style-module-scss-module__TcbHra__backgroundStripes:not(.style-module-scss-module__TcbHra__darkTheme) .style-module-scss-module__TcbHra__stripe', {
          scaleY:1,duration:1.6,ease:'power3.inOut',stagger:0.05,transformOrigin:'top'
        });

        if (page === 'projects') {
          // ── Projects page hero ──
          // "Want To See" top row words
          g.to('.style-module-scss-module__xxZ7PW__word', { y:'0%',duration:1.2,ease:'power4.out',stagger:0.08,delay:0.15 });
          // "What I've Built?" bottom row words
          g.to('.style-module-scss-module__xxZ7PW__bottomWord', { y:'0%',duration:1.2,ease:'power4.out',stagger:0.08,delay:0.3 });
          // Preview image clip-path reveal
          g.to('.style-module-scss-module__xxZ7PW__imageWrapper', { clipPath:'inset(0% 0% 0% 0%)',duration:1.2,ease:'power3.out',delay:0.5 });
          // Underline
          g.to('.style-module-scss-module__xxZ7PW__underline', { scaleX:1,duration:1,ease:'power3.out',delay:0.8 });
          // Nav row labels & line
          g.to('.style-module-scss-module__xxZ7PW__navLabel', { y:'0%',duration:1,ease:'power3.out',stagger:0.1,delay:0.35 });
          g.to('.style-module-scss-module__xxZ7PW__line', { scaleX:1,duration:1,ease:'power3.out',delay:0.55 });

        } else if (page === 'about') {
          // ── About page hero ──
          // Stats bar labels & line
          g.to('.style-module-scss-module__i0_1Ga__statMask p', { y:'0%',duration:1,ease:'power3.out',stagger:0.1,delay:0.3 });
          g.to('.style-module-scss-module__i0_1Ga__statLine', { scaleX:1,duration:1,ease:'power3.out',delay:0.5 });
          // Big heading lines
          g.to('.style-module-scss-module__i0_1Ga__lineOne', { y:'0%',duration:1.2,ease:'power4.out',delay:0.15 });
          g.to('.style-module-scss-module__i0_1Ga__lineTwo', { y:'0%',duration:1.2,ease:'power4.out',delay:0.3 });
          // Underline on HUMANS
          g.to('.style-module-scss-module__i0_1Ga__underline', { scaleX:1,duration:1,ease:'power3.out',delay:0.8 });
          // Video description
          g.to('.style-module-scss-module__i0_1Ga__videoDescription', { opacity:1,y:0,duration:1,ease:'power3.out',delay:0.6 });
          // Info text lines
          g.to('.style-module-scss-module__i0_1Ga__textLine', { y:'0%',duration:1,ease:'power3.out',stagger:0.05,delay:0.5 });
          // Arrow link
          g.to('.style-module-scss-module__i0_1Ga__arrowLink .style-module-scss-module__nquOPW__text', { y:'0%',duration:1,ease:'power3.out',delay:0.85 });
          g.to('.style-module-scss-module__i0_1Ga__arrowLink .style-module-scss-module__nquOPW__iconWrapper', { x:0,y:0,scale:1,duration:1,ease:'power3.out',delay:0.9 });

        } else if (page === 'contact') {
          // ── Contact page hero ──
          // Meta items (Open to work, Response time) slide in
          var metaItems = Array.from(document.querySelectorAll('.style-module-scss-module__IGrPbq__metaItem'));
          g.to(metaItems, { opacity:1,y:0,scale:1,duration:0.9,ease:'back.out(1.4)',stagger:0.1,delay:0.3 });
          g.to('.style-module-scss-module__IGrPbq__metaInner', { y:'0%',duration:0.8,ease:'power3.out',stagger:0.05,delay:0.5 });
          // Pulse scale
          g.to('.style-module-scss-module__IGrPbq__pulse', { scale:1,duration:1,ease:'back.out(2)',delay:0.6 });
          // Contact icon drops in
          g.to('.style-module-scss-module__IGrPbq__contactIcon', {
            opacity:1,y:0,scale:1,rotation:0,duration:1.4,ease:'back.out(1.2)',delay:0.4
          });
          // Contact info rows slide in
          g.to('.style-module-scss-module__IGrPbq__cellMask p, .style-module-scss-module__IGrPbq__cellMask a', {
            y:'0%',duration:0.9,ease:'power3.out',stagger:0.05,delay:0.7
          });

        } else {
          // ── Home/Index page hero ──
          // Hero big words: I Build Modern Websites
          g.to('.style-module-scss-module__RsorJa__word', { y:'0%',duration:1.2,ease:'power4.out',stagger:0.1,delay:0.15 });

          // Subtitle: That Work
          g.to('.style-module-scss-module__RsorJa__subWord', { y:'0%',duration:1.2,ease:'power4.out',stagger:0.12,delay:0.4 });

          // Underline
          g.to('.style-module-scss-module__RsorJa__underline', { scaleX:1,duration:1,ease:'power3.out',delay:0.8 });

          // Stat rows
          g.to('.style-module-scss-module__RsorJa__statMask p', { y:'0%',duration:1,ease:'power3.out',stagger:0.1,delay:0.3 });
          g.to('.style-module-scss-module__RsorJa__line', { scaleX:1,duration:1.2,ease:'power3.out',stagger:0.15,delay:0.5 });

          // About section title + description lines
          g.to('.style-module-scss-module__RsorJa__about .style-module-scss-module__RsorJa__lineMask .style-module-scss-module__RsorJa__title', {
            y:'0%',duration:1,ease:'power3.out',delay:0.35
          });
          g.to('.style-module-scss-module__RsorJa__description .style-module-scss-module__RsorJa__lineMask p', {
            y:'0%',duration:1,ease:'power3.out',stagger:0.06,delay:0.45
          });

          // "Learn more" arrow text
          g.to('.style-module-scss-module__RsorJa__textBlock .style-module-scss-module__nquOPW__text', {
            y:'0%',duration:1,ease:'power3.out',delay:0.8
          });
          // Arrow icon wrapper
          g.to('.style-module-scss-module__RsorJa__textBlock .style-module-scss-module__nquOPW__iconWrapper', {
            x:0,y:0,scale:1,duration:1,ease:'power3.out',delay:0.85
          });

          // Circular badge (in strategy section visible area)
          g.to('.style-module-scss-module__x_w73q__circularTextContainer', {
            opacity:1,scale:1,duration:1.2,ease:'back.out(1.4)',delay:1
          });
        }

        // Start scroll-based animations
        setupScrollAnimations();
      }

      /* ── Scroll-triggered animations ── */
      function setupScrollAnimations() {

        // --- About page: Video expand on scroll ---
        var videoScrollSection = $('.style-module-scss-module__i0_1Ga__videoScrollSection');
        var video = videoScrollSection ? videoScrollSection.querySelector('.style-module-scss-module__i0_1Ga__video') : null;
        if (videoScrollSection && video) {
          // Initialize opacity animation on enter
          g.set(video, { opacity: 0 });
          ScrollTrigger.create({
            trigger: videoScrollSection, start: 'top 90%', once: true,
            onEnter: function () {
              g.to(video, { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 });
            }
          });

          // Exact scroll-linked timeline matching production
          var videoTimeline = g.timeline({
            scrollTrigger: {
              trigger: videoScrollSection,
              start: 'top 60%',
              end: '+=36%',
              scrub: 0.4,
              pin: videoScrollSection,
              pinSpacing: false,
              invalidateOnRefresh: true
            }
          });

          videoTimeline.to(video, { y: 52, duration: 0.3, ease: 'power1.out' });
          videoTimeline.to(video, {
            width: function () {
              var w = window.innerWidth;
              return w - 2 * (w >= 2500 ? 24 : w >= 1400 ? 18 : w >= 900 ? 16 : 12);
            },
            height: '70vh',
            x: function () {
              var w = window.innerWidth;
              return -video.getBoundingClientRect().left + (w >= 2500 ? 24 : w >= 1400 ? 18 : w >= 900 ? 16 : 12);
            },
            y: 0,
            ease: 'none',
            duration: 0.7
          });
        }

        // --- About page: Hero Content Parallax ---
        var aboutContent = $('.style-module-scss-module__i0_1Ga__content');
        var aboutHeading = $('.style-module-scss-module__i0_1Ga__headingWrapper');
        var aboutTexts = $('.style-module-scss-module__i0_1Ga__texts');
        var aboutArrowLink = $('.style-module-scss-module__i0_1Ga__arrowLink');
        if (aboutContent) {
          ScrollTrigger.create({
            trigger: aboutContent, start: 'top bottom', end: 'bottom top', scrub: 0.5,
            onUpdate: function (self) {
              var p = self.progress;
              if (aboutHeading) g.set(aboutHeading, { y: -0.14 * p * 220 });
              if (aboutTexts) g.set(aboutTexts, { y: 0.18 * p * 220 });
              if (aboutArrowLink) g.set(aboutArrowLink, { y: 0.14 * p * 220 });
            }
          });
        }

        // --- Strategy section ---
        // Title "Strategy" + subtitle "How I Approach Every Project?"
        var strategyHead = $('.style-module-scss-module__EDzIIq__head');
        if (strategyHead) {
          var headChildren = Array.from(strategyHead.querySelectorAll('.style-module-scss-module__EDzIIq__lineMask p, .style-module-scss-module__EDzIIq__lineMask span'));
          ScrollTrigger.create({
            trigger: strategyHead, start: 'top 92%', once: true,
            onEnter: function () {
              g.to(headChildren, { y: '0%', duration: 1, ease: 'power3.out', stagger: 0.08 });
            }
          });

          // Parallax slide for Title Wrapper and Circular Text Badge
          var titleWrapper = strategyHead.querySelector('.style-module-scss-module__EDzIIq__titleWrapper');
          var circularText = $('.style-module-scss-module__x_w73q__circularTextContainer');
          ScrollTrigger.create({
            trigger: strategyHead, start: 'top bottom', end: 'bottom top', scrub: 0.5,
            onUpdate: function (self) {
              var p = self.progress;
              var yVal = -0.48 * p * 220;
              if (titleWrapper) titleWrapper.style.transform = 'translate3d(0, ' + yVal + 'px, 0)';
              if (circularText) circularText.style.transform = 'translate3d(0, ' + yVal + 'px, 0)';
            }
          });
        }

        // --- "What You Get When Clarity Meets ___" section (bZf5Ta) ---
        var claritySection = $('.style-module-scss-module__bZf5Ta__contentWrapper');
        if (claritySection) {
          // Horizontal line
          ScrollTrigger.create({
            trigger: '.style-module-scss-module__bZf5Ta__horizontalLine', start: 'top 90%', once: true,
            onEnter: function () { g.to('.style-module-scss-module__bZf5Ta__horizontalLine', { scaleX:1,duration:1.4,ease:'power3.out' }); }
          });

          // Dark stripes (second set)
          ScrollTrigger.create({
            trigger: '.style-module-scss-module__TcbHra__darkTheme', start: 'top 85%', once: true,
            onEnter: function () {
              g.to('.style-module-scss-module__TcbHra__darkTheme .style-module-scss-module__TcbHra__stripe', {
                scaleY:1,duration:1.6,ease:'power3.inOut',stagger:0.05,transformOrigin:'top'
              });
            }
          });

          // Zoom reveal mask loop
          var stickyContainer = claritySection.querySelector('.style-module-scss-module__bZf5Ta__stickyContainer');
          var stickyMask      = claritySection.querySelector('.style-module-scss-module__bZf5Ta__stickyMask');
          if (stickyContainer && stickyMask) {
            var currentProgress = 0;
            var frameId = null;
            function maskTick() {
              var containerHeight = stickyContainer.getBoundingClientRect().height;
              var scrollRange = containerHeight - window.innerHeight;
              if (scrollRange > 0) {
                var targetProgress = stickyMask.offsetTop / scrollRange;
                currentProgress += 0.19 * (targetProgress - currentProgress);
                var zoomFactor = 120 * currentProgress;
                var maskSize = (0.976 + zoomFactor) * 100;
                stickyMask.style.webkitMaskSize = maskSize + '%';
                stickyMask.style.maskSize = maskSize + '%';
              }
              frameId = requestAnimationFrame(maskTick);
            }
            frameId = requestAnimationFrame(maskTick);
          }

          // Parallax for text (entranceText)
          var entranceText = claritySection.querySelector('.style-module-scss-module__bZf5Ta__entranceText');
          ScrollTrigger.create({
            trigger: claritySection, start: 'top bottom', end: 'bottom top', scrub: 0.5,
            onUpdate: function (self) {
              var p = self.progress;
              if (entranceText) {
                entranceText.style.transform = 'translate3d(0, ' + (0.28 * p * 220) + 'px, 0)';
              }
            }
          });

          // Plus icons fly in
          ScrollTrigger.create({
            trigger: '.style-module-scss-module__bZf5Ta__entranceText', start: 'top 85%', once: true,
            onEnter: function () {
              g.to('.style-module-scss-module__bZf5Ta__plusLeft', { opacity:1,x:0,rotation:0,duration:1,ease:'back.out(1.5)' });
              g.to('.style-module-scss-module__bZf5Ta__plusRight', { opacity:1,x:0,rotation:0,duration:1,ease:'back.out(1.5)',delay:0.1 });
            }
          });

          // Progress bar fill on scroll
          var progressFill = $('.style-module-scss-module__EUK54q__fill');
          var progressDot  = $('.style-module-scss-module__EUK54q__dot');
          if (progressFill) {
            ScrollTrigger.create({
              trigger: '.style-module-scss-module__EUK54q__bar', start:'top 80%', end:'bottom 20%', scrub:0.5,
              onUpdate: function (self) {
                var p = self.progress;
                progressFill.style.transform = 'scaleY(' + p + ')';
                if (progressDot) progressDot.style.top = (p * 100) + '%';
              }
            });
          }
        }

        // --- Service cards vertical pinning stack (UBLvha: Design, Engineering, Strategy) ---
        var serviceCards = $$('.style-module-scss-module__UBLvha__card');
        serviceCards.forEach(function (card, i) {
          // 1. Initial entrance animations (animate children only, not the card wrapper itself!)
          var num = card.querySelector('.style-module-scss-module__UBLvha__number');
          var sep = card.querySelector('.style-module-scss-module__UBLvha__separator');
          var descLines = Array.from(card.querySelectorAll('.style-module-scss-module__UBLvha__descriptionLine'));
          var label = card.querySelector('.style-module-scss-module__UBLvha__cardImageLabel');
          var image = card.querySelector('.style-module-scss-module__UBLvha__image');
          var title = card.querySelector('.style-module-scss-module__UBLvha__title');
          var btn = card.querySelector('.style-module-scss-module__dZgGeG__button');

          // Initialize states
          var inner = card.querySelector('.style-module-scss-module__UBLvha__cardInner');
          if (inner) {
            g.set(inner, { rotation: 3 });
            g.to(inner, {
              rotation: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true
              }
            });
          }
          if (num) g.set(num, { y: '108%' });
          if (sep) g.set(sep, { scaleY: 0 });
          if (label) g.set(label, { y: '100%' });
          if (title) g.set(title, { y: '108%' });
          if (btn) g.set(btn, { opacity: 0, y: 30 });
          
          if (image) {
            var isEng = card.classList.contains('style-module-scss-module__UBLvha__engineeringCard');
            g.set(image, { y: isEng ? '-108%' : '122%' });
          }

          // Trigger title/desc/separator animations
          ScrollTrigger.create({
            trigger: card, start: 'top 75%', once: true,
            onEnter: function () {
              if (num) g.to(num, { y: '0%', duration: 0.75, ease: 'power3.out' });
              if (sep) g.to(sep, { scaleY: 1, duration: 1, ease: 'power3.out', delay: 0.1 });
              if (descLines.length) g.from(descLines, { y: '100%', duration: 0.8, ease: 'power3.out', stagger: 0.06, delay: 0.15 });
              if (title) g.to(title, { y: '0%', duration: 0.75, ease: 'power3.out', delay: 0.2 });
              if (btn) g.to(btn, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 });
            }
          });

          // Trigger image slide animation (matches React trigger start bounds)
          if (image) {
            var isEng = card.classList.contains('style-module-scss-module__UBLvha__engineeringCard');
            ScrollTrigger.create({
              trigger: isEng ? card : image,
              start: isEng ? 'top 75%' : 'top 95%',
              once: true,
              onEnter: function () {
                g.to(image, { y: '0%', duration: 0.75, ease: 'power3.out' });
                if (label) g.to(label, { y: '0%', duration: 0.8, ease: 'power3.out', delay: 0.2 });
              }
            });
          }

          // 2. Scroll pinning stack (for all but the last card)
          if (i < serviceCards.length - 1) {
            ScrollTrigger.create({
              trigger: card,
              start: 'bottom bottom',
              end: 'bottom top',
              pin: true,
              pinSpacing: false
            });
            var overlay = card.querySelector('.style-module-scss-module__UBLvha__cardOverlay');
            if (overlay) {
              g.set(overlay, { opacity: 0 });
              g.to(overlay, {
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'bottom bottom',
                  end: 'bottom top',
                  scrub: true
                }
              });
            }
          }
        });

        // --- "Ready to build something" CTA (XTAiwa) ---
        var cta = $('.style-module-scss-module__XTAiwa__content');
        if (cta) {
          ScrollTrigger.create({
            trigger: cta, start: 'top 85%', once: true,
            onEnter: function () {
              g.to('.style-module-scss-module__XTAiwa__plusLeft', { opacity:1,x:0,rotation:0,duration:1,ease:'back.out(1.5)' });
              g.to('.style-module-scss-module__XTAiwa__plusRight', { opacity:1,x:0,rotation:0,duration:1,ease:'back.out(1.5)',delay:0.1 });
              g.from('.style-module-scss-module__XTAiwa__title', { y:40,opacity:0,duration:1,ease:'power3.out',delay:0.15 });
              g.from('.style-module-scss-module__XTAiwa__description', { y:30,opacity:0,duration:1,ease:'power3.out',delay:0.3 });
              g.from('.style-module-scss-module__dZgGeG__button', { y:20,opacity:0,duration:0.8,ease:'power3.out',delay:0.5 });
            }
          });
        }

        // --- Award rows ---
        $$('.style-module-scss-module__nQLyka__awardTextMask').forEach(function (mask) {
          ScrollTrigger.create({
            trigger: mask, start: 'top 88%', once: true,
            onEnter: function () { g.to(Array.from(mask.querySelectorAll('p')), { y:'0%',duration:0.8,ease:'power3.out',stagger:0.06 }); }
          });
        });
        ScrollTrigger.create({
          trigger: '.style-module-scss-module__nQLyka__awards', start: 'top 85%', once: true,
          onEnter: function () {
            g.to('.style-module-scss-module__nQLyka__awardBorderLine', { scaleX:1,duration:1.2,ease:'power3.out',stagger:0.1 });
          }
        });

        // --- About page: Skills & Vision overlay horizontal slide ---
        var skillsOverlay = $('.style-module-scss-module__FOyjoq__overlay');
        var skillsSection = $('.style-module-scss-module__FOyjoq__skillsVision');
        if (skillsOverlay && skillsSection) {
          g.set(skillsOverlay, { xPercent: 100, y: 0 });
          
          // Reparent pink circles to stickyStage so they stay fixed in the background of the viewport as the overlay scrolls
          var stickyStage = skillsOverlay.querySelector('.style-module-scss-module__FOyjoq__stickyStage');
          if (stickyStage) {
            var circles = skillsOverlay.querySelectorAll('.style-module-scss-module__FOyjoq__dPinkCircle, .style-module-scss-module__FOyjoq__lPinkCircle');
            circles.forEach(function (circle) {
              stickyStage.insertBefore(circle, stickyStage.firstChild);
            });
          }
          
          // Sync opacity of the sticky stage (titles and circles) based on the overlay's actual scroll position
          skillsOverlay.addEventListener('scroll', function () {
            var maxScroll = skillsOverlay.scrollHeight - skillsOverlay.clientHeight;
            var scrollRatio = maxScroll > 0 ? skillsOverlay.scrollTop / maxScroll : 0;
            var fadeOpacity = 1;
            if (scrollRatio > 0.45) {
              fadeOpacity = 1 - Math.min((scrollRatio - 0.45) / 0.15, 1);
            }
            g.set('.style-module-scss-module__FOyjoq__stickyStage', { opacity: fadeOpacity });
          });
          g.set('.style-module-scss-module__FOyjoq__animTitle', { opacity: 0, rotate: -45, x: -20, y: '108%' });
          g.set('.style-module-scss-module__FOyjoq__descLine', { opacity: 0, y: '106%' });
          g.set('.style-module-scss-module__FOyjoq__dPinkCircle, .style-module-scss-module__FOyjoq__lPinkCircle', { clipPath: 'inset(100% 0% 0% 0%)' });
          g.set('.style-module-scss-module__FOyjoq__topTitle, .style-module-scss-module__FOyjoq__bottomTitle', { y: '118%' });
          g.set('.style-module-scss-module__FOyjoq__line', { scaleX: 0 });
          
          var titleAnimated = false;
          var colsAnimated = false;

          ScrollTrigger.create({
            trigger: skillsSection, start: 'top bottom', end: 'bottom top', scrub: 0.5,
            onUpdate: function (self) {
              var p = self.progress;
              if (window.scrollY === 0) p = 0;
              var d = Math.min(p / 0.3, 1);
              
              if (window.innerWidth > 1000) {
                g.set(skillsOverlay, { xPercent: (1 - d) * 100, y: 0 });
                
                // Link the overlay scrollTop directly to scroll progress so sticky titles & columns scroll naturally
                var scrollProgress = p >= 0.3 ? Math.min((p - 0.3) / 0.7, 1) : 0;
                var maxScroll = skillsOverlay.scrollHeight - skillsOverlay.clientHeight;
                skillsOverlay.scrollTop = scrollProgress * maxScroll;

              } else {
                g.set(skillsOverlay, { xPercent: 0, y: 0 });
                skillsOverlay.scrollTop = 0;
              }

              if (d > 0.85 && !titleAnimated) {
                titleAnimated = true;
                g.to('.style-module-scss-module__FOyjoq__dPinkCircle', { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power3.out', delay: 0.1, overwrite: true });
                g.to('.style-module-scss-module__FOyjoq__lPinkCircle', { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power3.out', delay: 0.18, overwrite: true });
                g.to('.style-module-scss-module__FOyjoq__animTitle', { opacity: 1, rotate: 0, x: 0, y: '0%', duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.1, overwrite: true });
                g.to('.style-module-scss-module__FOyjoq__descLine', { opacity: 1, y: '0%', duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.1, overwrite: true });
                g.to('.style-module-scss-module__FOyjoq__topTitle, .style-module-scss-module__FOyjoq__bottomTitle', { y: '0%', duration: 0.8, ease: 'power3.out', overwrite: true });
                g.to('.style-module-scss-module__FOyjoq__line', { scaleX: 1, duration: 0.7, ease: 'power3.out', delay: 0.4, overwrite: true });
              }

              if (d > 0.7 && !colsAnimated) {
                colsAnimated = true;
                $$('.style-module-scss-module__FOyjoq__col').forEach(function (col, idx) {
                  var num = col.querySelector('.style-module-scss-module__FOyjoq__colNumber');
                  var title = col.querySelector('.style-module-scss-module__FOyjoq__colTitle');
                  var list = Array.from(col.querySelectorAll('.style-module-scss-module__FOyjoq__skill'));
                  if (num) g.to(num, { y: '0%', duration: 0.75, ease: 'power3.out', delay: 0.05 + 0.06 * idx, overwrite: true });
                  if (title) g.to(title, { y: '0%', duration: 0.75, ease: 'power3.out', delay: 0.1 + 0.06 * idx, overwrite: true });
                  if (list.length) g.to(list, { y: '0%', duration: 0.75, ease: 'power3.out', stagger: 0.05, delay: 0.2 + 0.06 * idx, overwrite: true });
                });
              }
            }
          });

          // Scroll progress bar for skills section
          var progressFill2 = skillsOverlay.querySelector('.style-module-scss-module__FOyjoq__scrollProgressFill');
          var desktopScroll = skillsOverlay.querySelector('.style-module-scss-module__FOyjoq__desktopScroll');
          if (desktopScroll) {
            ScrollTrigger.create({
              trigger: '.style-module-scss-module__FOyjoq__scrollSpace', start: 'top 80%', once: true,
              onEnter: function () {
                g.to('.style-module-scss-module__FOyjoq__scrollProgressBar', { opacity:1,y:0,duration:0.8,ease:'power3.out' });
                g.to(desktopScroll, { y:'0%',opacity:1,duration:0.8,ease:'power3.out',delay:0.2 });
              }
            });
            if (progressFill2) {
              ScrollTrigger.create({
                trigger: '.style-module-scss-module__FOyjoq__skills', start: 'top 80%', end: 'bottom 20%', scrub: 0.5,
                onUpdate: function (self) { progressFill2.style.transform = 'scaleX(' + self.progress + ')'; }
              });
            }
          }
        }

        // --- About page: FAQ section overlay horizontal slide ---
        var faqSection = $('.style-module-scss-module__mTgFGa__faqSection');
        var faqPanel = $('.style-module-scss-module__mTgFGa__faqPanel');
        if (faqSection && faqPanel) {
          g.set(faqPanel, { xPercent: 100 });
          g.set('.style-module-scss-module__mTgFGa__titleLetter', { y: '110%' });
          g.set('.style-module-scss-module__mTgFGa__accordionQuestion', { y: '110%' });
          g.set('.style-module-scss-module__mTgFGa__accordionIcon', { scale: 0, opacity: 0 });
          g.set('.style-module-scss-module__mTgFGa__accordionLine', { scaleX: 0 });

          var faqAnimated = false;

          ScrollTrigger.create({
            trigger: faqSection, start: 'top bottom', end: 'bottom top', scrub: 0.5,
            onUpdate: function (self) {
              var p = self.progress;
              if (window.scrollY === 0) p = 0;
              var d = Math.min(p / 0.3, 1);
              
              if (window.innerWidth > 1000) {
                g.set(faqPanel, { xPercent: (1 - d) * 100 });
              } else {
                g.set(faqPanel, { xPercent: 0 });
              }

              if (d > 0.7 && !faqAnimated) {
                faqAnimated = true;
                g.to('.style-module-scss-module__mTgFGa__titleLetter', { y: '0%', duration: 0.65, ease: 'power3.out', stagger: 0.055, overwrite: true });
                g.to('.style-module-scss-module__mTgFGa__accordionQuestion', { y: '0%', duration: 0.75, ease: 'power3.out', stagger: 0.05, overwrite: true });
                g.to('.style-module-scss-module__mTgFGa__accordionIcon', { scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.05, overwrite: true });
                g.to('.style-module-scss-module__mTgFGa__accordionLine', { scaleX: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1, overwrite: true });
              }
            }
          });
        }

        // --- About page: Vision section (image scroll + overlay slide) ---
        var visionSection = $('.style-module-scss-module__gDoBsa__visionSection');
        var visionPanel = $('.style-module-scss-module__gDoBsa__visionPanel');
        console.log("VISION_INIT: section=" + !!visionSection + " panel=" + !!visionPanel);
        if (visionSection && visionPanel) {
          visionPanel.style.transform = 'translateX(100%)';
          
          var imagesScroll = visionPanel.querySelector('.style-module-scss-module__gDoBsa__imagesScroll');
          if (imagesScroll) g.set(imagesScroll, { y: 0 });
          
          var titleWrapper = visionPanel.querySelector('.style-module-scss-module__gDoBsa__titleWrapper');
          var linesContent = visionPanel.querySelector('.style-module-scss-module__gDoBsa__linesContent');
          var mainDescription = visionPanel.querySelector('.style-module-scss-module__gDoBsa__mainDescription');
          var mainDescMask = mainDescription ? mainDescription.parentElement : null;
          
          var visionAnimated = false;
          
          ScrollTrigger.create({
            trigger: visionSection, start: 'top bottom', end: 'bottom top', scrub: 0.5,
            onUpdate: function (self) {
              var p = self.progress;
              if (window.scrollY === 0) p = 0;
              console.log("VISION_UPDATE: progress=" + p + " scrollY=" + window.scrollY + " innerWidth=" + window.innerWidth);
              var d = Math.min(p / 0.3, 1);
              
              if (window.innerWidth > 1000) {
                // Overlay horizontal slide
                visionPanel.style.transform = 'translateX(' + (1 - d) * 100 + '%)';
                
                // Images list scroll-linked vertical translation
                var scrollProgress = d >= 1 ? Math.min(Math.max((p - 0.3) / 0.3, 0), 1) : 0;
                if (imagesScroll) {
                  var firstChild = imagesScroll.firstElementChild;
                  var firstChildHeight = firstChild ? firstChild.getBoundingClientRect().height : 0;
                  var parentHeight = imagesScroll.parentElement.clientHeight;
                  if (firstChildHeight === 0) firstChildHeight = 220; // Fallback estimate
                  var maxScroll = Math.max(5 * firstChildHeight - parentHeight, 0);
                  g.set(imagesScroll, { y: -scrollProgress * maxScroll });
                }
                
                // Parallax offsets for title/content on desktop
                if (titleWrapper) g.set(titleWrapper, { y: -0.12 * p * 220 });
                if (linesContent) g.set(linesContent, { y: 0.16 * p * 220 });
                if (mainDescMask) g.set(mainDescMask, { y: 0.12 * p * 220 });
                
                // Entrance animations
                if (d > 0.85 && !visionAnimated) {
                  visionAnimated = true;
                  var letters = Array.from(visionPanel.querySelectorAll('.style-module-scss-module__gDoBsa__title'));
                  var numbers = Array.from(visionPanel.querySelectorAll('.style-module-scss-module__gDoBsa__number'));
                  var descs = Array.from(visionPanel.querySelectorAll('.style-module-scss-module__gDoBsa__description'));
                  var lines = Array.from(visionPanel.querySelectorAll('.style-module-scss-module__gDoBsa__line'));
                  
                  g.to(letters, { y: '0%', duration: 0.75, ease: 'power3.out', stagger: 0.06, overwrite: true });
                  g.to(numbers, { y: '0%', duration: 0.65, ease: 'power3.out', stagger: 0.07, delay: 0.2, overwrite: true });
                  g.to(descs, { y: '0%', duration: 0.75, ease: 'power3.out', stagger: 0.07, delay: 0.25, overwrite: true });
                  g.to(lines, { scaleX: 1, duration: 0.7, ease: 'power3.out', stagger: 0.07, delay: 0.3, overwrite: true });
                  if (mainDescription) g.to(mainDescription, { y: '0%', duration: 0.8, ease: 'power3.out', delay: 0.35, overwrite: true });
                }
              } else {
                visionPanel.style.transform = 'none';
                if (imagesScroll) g.set(imagesScroll, { y: 0 });
                if (titleWrapper) g.set(titleWrapper, { y: 0 });
                if (linesContent) g.set(linesContent, { y: 0 });
                if (mainDescMask) g.set(mainDescMask, { y: 0 });
              }
            }
          });
        }

        // --- About page: Logos section ---
        var logosSection = $('.style-module-scss-module__FOyjoq__desktopScrollInner');
        // Client logos reveal
        $$('.style-module-scss-module__i0_1Ga__logos img, .style-module-scss-module__FOyjoq__logos img').forEach(function (img, i) {
          ScrollTrigger.create({
            trigger: img, start: 'top 88%', once: true,
            onEnter: function () { g.from(img, { opacity:0,y:20,duration:0.7,ease:'power3.out',delay:i*0.08 }); }
          });
        });

        // --- Contact page: Info rows & scroll animations ---
        var contactWrapper = $('.style-module-scss-module__IGrPbq__wrapper');
        if (contactWrapper) {
          // Contact info rows - each row reveals on scroll
          $$('.style-module-scss-module__IGrPbq__contactInfoRow').forEach(function (row, i) {
            var cells = Array.from(row.querySelectorAll('.style-module-scss-module__IGrPbq__cellMask p, .style-module-scss-module__IGrPbq__cellMask a'));
            ScrollTrigger.create({
              trigger: row, start: 'top 88%', once: true,
              onEnter: function () {
                g.to(cells, { y:'0%',duration:0.85,ease:'power3.out',stagger:0.05,delay:i*0.03 });
              }
            });
          });

          // Section divider lines
          ScrollTrigger.create({
            trigger: contactWrapper, start: 'top 88%', once: true,
            onEnter: function () {
              g.to('.style-module-scss-module__IGrPbq__separator, .style-module-scss-module__IGrPbq__divider', {
                scaleX:1,duration:1.2,ease:'power3.out',stagger:0.1
              });
            }
          });
        }

        // --- Footer ---
        // Footer links reveal
        $$('.style-module-scss-module__1eBtna__footerInner .style-module-scss-module__jMWBMW__lineMask').forEach(function (mask) {
          ScrollTrigger.create({
            trigger: mask, start: 'top 92%', once: true,
            onEnter: function () {
              var links = Array.from(mask.querySelectorAll('a,span'));
              g.from(links, { y:20,opacity:0,duration:0.8,ease:'power3.out',stagger:0.05 });
            }
          });
        });

        // Footer horizontal line
        ScrollTrigger.create({
          trigger: '.style-module-scss-module__1eBtna__horizontalLine', start: 'top 92%', once: true,
          onEnter: function () { g.to('.style-module-scss-module__1eBtna__horizontalLine', { scaleX:1,duration:1.4,ease:'power3.out' }); }
        });

        // Footer wordmark image
        ScrollTrigger.create({
          trigger: '.style-module-scss-module__1eBtna__boldTextImage', start: 'top 92%', once: true,
          onEnter: function () { g.from('.style-module-scss-module__1eBtna__boldTextImage', { y:60,opacity:0,duration:1.2,ease:'power3.out' }); }
        });

        // (Circular spin text is handled via CSS animation)

        // --- Stats count-up ---
        var statsBox = $('.style-module-scss-module__RsorJa__stats');
        if (statsBox) {
          ScrollTrigger.create({
            trigger: statsBox, start: 'top 85%', once: true,
            onEnter: function () {
              function cu(sel, end, dec, dur) {
                var el = statsBox.querySelector(sel + ' .count-up-text') || statsBox.querySelector(sel);
                if (!el) return;
                g.to({ v: 0 }, { v: end, duration: dur, ease: 'power2.out',
                  onUpdate: function () { el.textContent = dec ? this._targets[0].v.toFixed(1) : Math.floor(this._targets[0].v); }
                });
              }
              cu('.style-module-scss-module__RsorJa__countFirst', 20, false, 2.2);
              cu('.style-module-scss-module__RsorJa__countSecond', 5, false, 1.8);
              cu('.style-module-scss-module__RsorJa__countDecimal', 100, false, 2.5);
            }
          });
        }

        // --- Footer reveal & explosion particles ──────────────────────────────
        (function () {
          var footer = $('footer.style-module-scss-module__1eBtna__footerWrapper');
          var footerInner = $('.style-module-scss-module__1eBtna__footerInner');
          var overlay = $('.style-module-scss-module__1eBtna__overlay');
          var expContainer = $('.style-module-scss-module__1eBtna__explosionContainer');
          if (!footer || !footerInner || !overlay) return;

          // 1. Scroll-linked overlay fade
          function updateFooterOverlay() {
            var rect = footerInner.getBoundingClientRect();
            var viewHeight = window.innerHeight;
            var range = (viewHeight + footerInner.offsetHeight) * 0.6;
            var progress = Math.min(Math.max((viewHeight - rect.top) / range, 0), 1);
            overlay.style.opacity = String(1 - progress);
          }
          window.addEventListener('scroll', updateFooterOverlay, { passive: true });
          window.addEventListener('resize', updateFooterOverlay);
          updateFooterOverlay();

          // 2. Explosion particles
          if (!expContainer) return;
          
          var particles = [];
          var isExploding = false;

          function Particle(el, w, h) {
            this.element = el;
            this.x = (Math.random() - 0.5) * w * 0.6;
            this.y = 0.5 * h;
            this.vx = (Math.random() - 0.5) * 25;
            this.vy = -20 - 18 * Math.random();
            this.rotation = 0;
            this.rotationSpeed = (Math.random() - 0.5) * 12;
            this.element.style.opacity = '1';
          }
          Particle.prototype.update = function () {
            this.vy += 0.3;
            this.vx *= 0.98;
            this.vy *= 0.98;
            this.rotationSpeed *= 0.98;
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;
            if (this.element) {
              this.element.style.transform = 'translate(-50%, -50%) translate(' + this.x + 'px, ' + this.y + 'px) rotate(' + this.rotation + 'deg)';
            }
          };

          function initParticles() {
            expContainer.innerHTML = '';
            particles = [];
            for (var i = 1; i <= 9; i++) {
              var img = document.createElement('img');
              img.src = '/images/footerExplosion/ProjectImage' + i + '.webp';
              img.className = 'style-module-scss-module__1eBtna__explosionParticle';
              img.style.width = 'clamp(6.375rem, 4.852rem + 7.61vw, 16.75rem)';
              img.style.opacity = '0';
              img.style.position = 'absolute';
              img.style.top = '50%';
              img.style.left = '50%';
              img.style.transform = 'translate(-50%, -50%)';
              expContainer.appendChild(img);
            }
          }

          function triggerExplosion() {
            if (isExploding) return;
            isExploding = true;
            
            var imgs = Array.from(expContainer.querySelectorAll('.style-module-scss-module__1eBtna__explosionParticle'));
            imgs.forEach(function (img) {
              img.style.transform = 'translate(-50%, -50%)';
            });

            var w = expContainer.offsetWidth;
            var h = expContainer.offsetHeight;
            particles = imgs.map(function (img) {
              return new Particle(img, w, h);
            });

            var done = false;
            function frame() {
              if (done) return;
              particles.forEach(function (p) { p.update(); });
              
              var allDown = particles.every(function (p) { return p.y > h / 2; });
              if (allDown) {
                done = true;
                particles.forEach(function (p) {
                  if (p.element) p.element.style.opacity = '0';
                });
                setTimeout(function () { isExploding = false; }, 500);
                return;
              }
              requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
          }

          initParticles();

          if (typeof IntersectionObserver !== 'undefined') {
            var obs = new IntersectionObserver(function (entries) {
              entries.forEach(function (entry) {
                if (entry.isIntersecting && !isExploding) {
                  triggerExplosion();
                }
              });
            }, { threshold: 0.6 });
            obs.observe(footer);
          }

          window.addEventListener('resize', function () {
            isExploding = false;
          });
        })();

        // Refresh
        ScrollTrigger.refresh();
      }

      /* ── Connect to preloader lifecycle ── */
      if (preloaderDone) {
        heroEntrance();
      } else {
        afterPreloaderQueue.push(heroEntrance);
      }
    })();
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('load', function () {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });

    window.__chkstepanRestart = function () {
      if (typeof window.__chkstepanDismissPreloader === 'function') {
        window.__chkstepanDismissPreloader();
      }
      if (typeof window.__chkstepanCleanup === 'function') {
        window.__chkstepanCleanup();
      }
      if (gsapReady && typeof boot === 'function') {
        boot();
      }
      if (typeof window.__chkstepanScrollToTop === 'function') {
        window.__chkstepanScrollToTop();
      }
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    };
  }
})();
