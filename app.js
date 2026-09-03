/**
 * Finnovate — behaviour layer.
 *
 * Page markup is rendered server-side by PHP (index.php + inc/*.php).
 * This file keeps only the interactive behaviour, unchanged from the original app.js.
 */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

function bindInteractions() {
  $$('button:not(.doctor-pillar)').forEach(button => {
    if (button.closest('.faq-item') || button.matches('.menu,.chat-button,.chat-x,.modal-close,.review-nav button,.signboard-hit,.custom-select-trigger,.custom-select-option,[data-report-prev],[data-report-next],[data-report-toggle]')) return;
    const textNodes = [...button.childNodes].filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    if (!textNodes.length) return;
    const label = textNodes.map(node => node.textContent.trim()).join(' ');
    const roller = document.createElement('span'), track = document.createElement('span'), current = document.createElement('span'), next = document.createElement('span');
    roller.className = 'roll-label'; track.className = 'roll-label-track'; current.className = 'roll-label-copy'; next.className = 'roll-label-copy';
    current.textContent = label; next.textContent = label; next.setAttribute('aria-hidden','true');
    track.append(current,next); roller.append(track); button.insertBefore(roller,textNodes[0]); textNodes.forEach(node => node.remove());
    button.classList.add('roll-button'); button.dataset.rollLabel = label;
  });
  const navHeader = $('.nav'), menuButton = $('.menu'), mobileNav = $('.mobile-nav'), menuIcon = $('.menu-icon');
  const setTheme = theme => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('finnovate-theme',theme);
    const isDark = theme === 'dark';
    $$('.theme-toggle').forEach(toggle => {
      toggle.setAttribute('aria-label',isDark ? 'Switch to light mode' : 'Switch to dark mode');
      const icon = $('.theme-toggle-icon',toggle), label = $('.theme-toggle-label',toggle);
      if (icon) icon.textContent = isDark ? '☀' : '☾';
      if (label) label.textContent = isDark ? 'Light mode' : 'Dark mode';
    });
  };
  $$('.theme-toggle').forEach(toggle => toggle.addEventListener('click',() => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }));
  setTheme(document.documentElement.dataset.theme || 'light');
  $$('[data-report-carousel]').forEach(carousel => {
    const slides = $$('.report-slide',carousel), currentLabel = $('[data-report-current]',carousel);
    const previousButton = $('[data-report-prev]',carousel), nextButton = $('[data-report-next]',carousel);
    const toggleButton = $('[data-report-toggle]',carousel), toggleLabel = $('[data-report-toggle-label]',carousel);
    const toggleIcon = $('[data-report-icon]',carousel), stateLabel = $('[data-report-state]',carousel);
    const previewStage = $('.report-phone-stage',carousel);
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rotationDelay = 1000, readingDelay = 9000;
    let currentPage = 0, rotationTimer, readingTimer, transitionTimer;
    let manuallyPaused = reducedMotion, interactionPaused = false, readingPaused = false;
    const renderPage = (nextPage,direction=1) => {
      const outgoingPage = currentPage;
      currentPage = (nextPage + slides.length) % slides.length;
      clearTimeout(transitionTimer);
      slides.forEach((slide,index) => {
        const active = index === currentPage;
        const distance = (index - currentPage + slides.length) % slides.length;
        slide.className = 'report-slide';
        if (active) slide.classList.add('is-active');
        else if (index === outgoingPage && outgoingPage !== currentPage) slide.classList.add('is-leaving',direction < 0 ? 'is-leaving-reverse' : 'is-leaving-forward');
        else if (distance >= 1 && distance <= 3) slide.classList.add(`is-next-${distance}`);
        slide.setAttribute('aria-hidden',String(!active));
      });
      transitionTimer = setTimeout(() => {
        slides.forEach((slide,index) => {
          if (!slide.classList.contains('is-leaving')) return;
          slide.className = 'report-slide';
          const distance = (index - currentPage + slides.length) % slides.length;
          if (distance >= 1 && distance <= 3) slide.classList.add(`is-next-${distance}`);
        });
      },230);
      if (currentLabel) currentLabel.textContent = String(currentPage + 1).padStart(2,'0');
    };
    const restartProgress = () => {
      carousel.classList.remove('is-playing');
      void carousel.offsetWidth;
      carousel.classList.add('is-playing');
    };
    const applyPlayback = () => {
      clearTimeout(rotationTimer);
      const paused = manuallyPaused || interactionPaused || readingPaused || document.hidden;
      carousel.classList.toggle('is-paused',paused);
      carousel.classList.toggle('is-playing',!paused);
      if (toggleButton) {
        toggleButton.setAttribute('aria-pressed',String(manuallyPaused));
        toggleButton.setAttribute('aria-label',manuallyPaused ? 'Resume automatic page preview' : 'Pause automatic page preview');
      }
      if (toggleLabel) toggleLabel.textContent = manuallyPaused ? 'Resume' : 'Pause';
      if (toggleIcon) toggleIcon.textContent = manuallyPaused ? '▶' : 'Ⅱ';
      if (stateLabel) stateLabel.textContent = manuallyPaused ? 'Paused for reading' : interactionPaused ? 'Holding this page' : readingPaused ? 'Reading pause · resumes shortly' : 'Auto playing';
      if (!paused) {
        restartProgress();
        rotationTimer = setTimeout(() => { renderPage(currentPage + 1,1); applyPlayback(); },rotationDelay);
      }
    };
    const moveManually = offset => {
      clearTimeout(readingTimer);
      readingPaused = true;
      renderPage(currentPage + offset,offset);
      readingTimer = setTimeout(() => { readingPaused = false; applyPlayback(); },readingDelay);
      applyPlayback();
    };
    previousButton?.addEventListener('click',() => moveManually(-1));
    nextButton?.addEventListener('click',() => moveManually(1));
    toggleButton?.addEventListener('click',() => {
      manuallyPaused = !manuallyPaused;
      readingPaused = false;
      clearTimeout(readingTimer);
      applyPlayback();
    });
    document.addEventListener('visibilitychange',applyPlayback);
    renderPage(0); applyPlayback();
  });
  const setMobileMenu = open => {
    if (!navHeader || !menuButton || !mobileNav) return;
    navHeader.classList.toggle('mobile-open',open);
    document.body.classList.toggle('mobile-nav-open',open);
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',open ? 'Close navigation' : 'Open navigation');
    mobileNav.setAttribute('aria-hidden',String(!open));
    if (menuIcon) menuIcon.textContent = open ? '×' : '☰';
  };
  menuButton?.addEventListener('click',() => setMobileMenu(!navHeader.classList.contains('mobile-open')));
  $$('a,button',mobileNav).forEach(control => control.addEventListener('click',() => setMobileMenu(false)));
  document.addEventListener('keydown',event => { if (event.key === 'Escape') setMobileMenu(false); });
  addEventListener('resize',() => { if (innerWidth > 800) setMobileMenu(false); },{passive:true});
  const glow = $('.cursor-glow');
  if (glow) {
    let glowFrame, glowX = innerWidth / 2 - 180, glowY = innerHeight / 2 - 180, targetX = glowX, targetY = glowY;
    const renderGlow = () => {
      glowX += (targetX-glowX) * .18; glowY += (targetY-glowY) * .18;
      glow.style.transform = `translate3d(${glowX.toFixed(2)}px,${glowY.toFixed(2)}px,0)`;
      if (Math.abs(targetX-glowX) + Math.abs(targetY-glowY) > .25) glowFrame = requestAnimationFrame(renderGlow); else glowFrame = null;
    };
    document.addEventListener('pointermove', e => { targetX = e.clientX-180; targetY = e.clientY-180; if (!glowFrame) glowFrame = requestAnimationFrame(renderGlow); },{passive:true});
  }
  const wayfindingSection = $('.investor-wayfinding');
  if (wayfindingSection) {
    $$('[data-wayfinding-choice]',wayfindingSection).forEach(board => board.addEventListener('click', () => {
      const choice = board.dataset.wayfindingChoice;
      wayfindingSection.dataset.wayfindingTheme = choice;
      wayfindingSection.classList.remove('wayfinding-changed');
      void wayfindingSection.offsetWidth;
      wayfindingSection.classList.add('wayfinding-changed');
      $$('[data-wayfinding-choice]',wayfindingSection).forEach(item => item.setAttribute('aria-pressed',String(item === board)));
    }));
  }
  $$('.faq-item button').forEach(button => button.addEventListener('click', () => {
    const item = button.parentElement, list = item.parentElement, willOpen = !item.classList.contains('open');
    $$('.faq-item',list).forEach(entry => {
      entry.classList.remove('open');
      $('button',entry)?.setAttribute('aria-expanded','false');
    });
    item.classList.toggle('open',willOpen);
    button.setAttribute('aria-expanded',String(willOpen));
  }));
  const dialog = $('.modal');
  const customSelect = $('[data-custom-select]',dialog);
  if (customSelect) {
    const trigger = $('.custom-select-trigger',customSelect), menu = $('.custom-select-menu',customSelect), value = $('.custom-select-value',customSelect), choices = $$('.custom-select-option',customSelect);
    const setSelectOpen = open => {
      const roomNeeded = Math.min(286,choices.length * 47 + 18), triggerBox = trigger.getBoundingClientRect();
      customSelect.classList.toggle('drop-up',open && innerHeight - triggerBox.bottom < roomNeeded && triggerBox.top > roomNeeded);
      customSelect.classList.toggle('open',open);
      dialog.classList.toggle('select-open',open);
      trigger.setAttribute('aria-expanded',String(open));
      menu.hidden = !open;
    };
    trigger.addEventListener('click',() => setSelectOpen(!customSelect.classList.contains('open')));
    trigger.addEventListener('keydown',event => {
      if (!['ArrowDown','ArrowUp'].includes(event.key)) return;
      event.preventDefault(); setSelectOpen(true);
      choices[event.key === 'ArrowUp' ? choices.length - 1 : 0]?.focus();
    });
    choices.forEach((choice,index) => {
      choice.addEventListener('click',() => {
        value.value = choice.dataset.value;
        $('span',trigger).textContent = choice.dataset.value;
        trigger.classList.add('has-value');
        trigger.removeAttribute('aria-invalid');
        choices.forEach(item => item.setAttribute('aria-selected',String(item === choice)));
        setSelectOpen(false); trigger.focus();
      });
      choice.addEventListener('keydown',event => {
        if (event.key === 'Escape') { event.preventDefault(); setSelectOpen(false); trigger.focus(); return; }
        if (!['ArrowDown','ArrowUp'].includes(event.key)) return;
        event.preventDefault();
        const step = event.key === 'ArrowDown' ? 1 : -1;
        choices[(index + step + choices.length) % choices.length].focus();
      });
    });
    document.addEventListener('pointerdown',event => { if (!customSelect.contains(event.target)) setSelectOpen(false); });
  }
  $$('[data-open-modal]').forEach(b => b.addEventListener('click', () => dialog.showModal()));
  $('.modal-close').addEventListener('click', () => dialog.close());
  $('form').addEventListener('submit', e => {
    e.preventDefault();
    const enquiry = $('.custom-select-value',e.target), enquiryTrigger = $('.custom-select-trigger',e.target);
    if (enquiry && !enquiry.value) { enquiryTrigger.setAttribute('aria-invalid','true'); enquiryTrigger.focus(); return; }
    e.target.innerHTML = '<div class="submitted">Thank you. In the full experience, a Finnovate specialist would be in touch shortly.</div>';
  });
  const chat = $('.chat-wrap'); $('.chat-button').addEventListener('click', () => chat.classList.toggle('open')); $('.chat-x').addEventListener('click', () => chat.classList.remove('open'));
  $$('.quick-questions button').forEach(b => b.addEventListener('click', () => { const label = b.dataset.rollLabel || b.textContent; $('.chat-pop p').innerHTML = `<b>${label}</b><br>${label.includes('unbiased') ? 'Finnovate follows a fee only approach and does not earn product commissions.' : 'A private expert conversation, a clear report and focused actions tailored to your financial picture.'}`; }));
  const heroDoctorVisual = $('.doctor-visual'), heroPhone = $('.doctor-visual .phone'), heroReport = $('.hero-fitness-report'), heroScore = $('[data-hero-score]');
  if (heroDoctorVisual && heroPhone && heroReport && heroScore) {
    let heroScoreTimer;
    const setHeroReport = open => {
      if (heroDoctorVisual.classList.contains('hero-report-open') === open) return;
      heroDoctorVisual.classList.toggle('hero-report-open',open);
      heroReport.setAttribute('aria-hidden',String(!open));
      clearInterval(heroScoreTimer);
      if (open && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let value = 1, direction = 1;
        heroScore.textContent = value;
        heroReport.style.setProperty('--hero-score',`${value * 3.6}deg`);
        heroScoreTimer = setInterval(() => {
          value += direction;
          if (value >= 100 || value <= 1) direction *= -1;
          heroScore.textContent = value;
          heroReport.style.setProperty('--hero-score',`${value * 3.6}deg`);
        },55);
      }
    };
    heroPhone.addEventListener('mouseenter', () => setHeroReport(true));
    heroPhone.addEventListener('focus', () => setHeroReport(true));
    heroPhone.addEventListener('click', () => { if (matchMedia('(hover: none)').matches) setHeroReport(!heroDoctorVisual.classList.contains('hero-report-open')); });
    heroDoctorVisual.addEventListener('mouseleave', () => setHeroReport(false));
    document.addEventListener('pointerdown', e => { if (!heroDoctorVisual.contains(e.target)) setHeroReport(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setHeroReport(false); });
  }
  const slides = $$('.adv-slide'); let active = 0, advantageTimer;
  if (slides.length) {
    const advantageBubble = $('.advantage-carousel');
    const advanceAdvantage = () => {
      slides[active].classList.remove('active');
      active=(active+1)%slides.length;
      slides[active].classList.add('active');
      $$('.adv-dots i').forEach((x,i)=>x.classList.toggle('active',i===active));
      advantageBubble?.classList.remove('bubble-pop');
      void advantageBubble?.offsetWidth;
      advantageBubble?.classList.add('bubble-pop');
      const pieStage = $('.adv-pie-stage');
      if (pieStage) { pieStage.classList.remove('pie-pulse'); void pieStage.offsetWidth; pieStage.classList.add('pie-pulse'); }
    };
    const startAdvantage = () => { clearInterval(advantageTimer); advantageTimer = setInterval(advanceAdvantage, 4200); };
    startAdvantage();
  }
  const hookStage = $('[data-hook-stage]');
  if (hookStage && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const hookPhases = ['phase-front','phase-back','phase-merge'], hookHolds = [2600,2900,3700];
    let hookIndex = 0, hookTimer = null, hookFirstEntry = true, hookFirstFlipTimer = null;
    const runHook = () => {
      const isFirstFront = hookFirstEntry && hookIndex === 0;
      hookStage.classList.remove(...hookPhases);
      void hookStage.offsetWidth;
      hookStage.classList.add(hookPhases[hookIndex]);
      hookTimer = setTimeout(() => {
        if (isFirstFront) {
          hookFirstEntry = false;
          hookStage.classList.add('first-flip-fast');
          clearTimeout(hookFirstFlipTimer);
          hookFirstFlipTimer = setTimeout(() => hookStage.classList.remove('first-flip-fast'), 800);
        }
        hookIndex = (hookIndex + 1) % hookPhases.length;
        runHook();
      }, isFirstFront ? 1750 : hookHolds[hookIndex]);
    };
    new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { if (!hookTimer) runHook(); }
      else { clearTimeout(hookTimer); clearTimeout(hookFirstFlipTimer); hookTimer = null; hookFirstFlipTimer = null; hookIndex = 0; hookFirstEntry = true; hookStage.classList.remove(...hookPhases,'first-flip-fast'); hookStage.classList.add(hookPhases[0]); }
    }), { threshold: .15 }).observe(hookStage);
  }
  const treeSection = $('.financial-tree-section');
  if (treeSection) {
    const treeCanvas = $('.financial-tree',treeSection), treeCards = $$('.tree-card',treeSection), treeBranches = $$('.tree-branch',treeSection), treeTrunk = $('.tree-trunk',treeSection), treePulse = $('.tree-pulse',treeSection);
    let treeFrame, targetProgress = 0, displayProgress = 0;
    treeCards.forEach(card => $('div > span',card)?.remove());
    const clamp = value => Math.max(0,Math.min(1,value));
    const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
    const mix = (a,b,t) => Math.round(a + (b-a) * t);
    treeBranches.forEach(branch => branch.setAttribute('marker-end','url(#treeArrow)'));
    const measureTree = () => {
      const rect = treeSection.getBoundingClientRect();
      const travel = Math.max(1,rect.height - innerHeight);
      targetProgress = clamp(-rect.top / travel);
      if (!treeFrame) treeFrame = requestAnimationFrame(updateTree);
    };
    const updateTree = () => {
      const difference = targetProgress-displayProgress;
      displayProgress += difference * .14;
      if (Math.abs(difference) < .00012) displayProgress = targetProgress;
      const progress = displayProgress;
      let trunkDraw;
      if (progress < .44) trunkDraw = smooth(progress / .38);
      else if (progress < .5) trunkDraw = 1-smooth((progress-.44)/.06);
      else if (progress < .82) trunkDraw = smooth((progress-.5)/.25);
      else trunkDraw = 1-smooth((progress-.82)/.18);
      const curve = smooth((progress - .43) / .14);
      const a = [420,125,600,210,485,300,410,370,540,440,500,505], b = [580,125,400,210,515,300,590,370,460,440,500,505];
      const c = a.map((value,index) => mix(value,b[index],curve));
      treeTrunk.setAttribute('d',`M500 12 C${c[0]} ${c[1]} ${c[2]} ${c[3]} ${c[4]} ${c[5]} C${c[6]} ${c[7]} ${c[8]} ${c[9]} ${c[10]} ${c[11]}`);
      treeTrunk.style.strokeDashoffset = String(1-trunkDraw);
      treeTrunk.style.opacity = String(trunkDraw);
      const trunkLength = treeTrunk.getTotalLength();
      const headDistance = trunkLength * trunkDraw;
      const head = treeTrunk.getPointAtLength(headDistance), tail = treeTrunk.getPointAtLength(Math.max(0,headDistance-4));
      const headAngle = Math.atan2(head.y-tail.y,head.x-tail.x) * 180 / Math.PI;
      treePulse.style.opacity = String(trunkDraw > .015 ? Math.min(1,trunkDraw*5) : 0);
      treePulse.style.left = `${head.x/10}%`;
      treePulse.style.top = `${head.y/5.2}%`;
      treePulse.style.transform = `translate(-50%,-50%) rotate(${headAngle}deg)`;
      treeCards.forEach((card,index) => {
        const slot = index % 3;
        let amount;
        if (index < 3) {
          const enter = smooth((progress / .4 - slot * .18) / .46);
          const exit = smooth(((progress - .42) / .08 - slot * .18) / .48);
          amount = enter * (1-exit);
        } else {
          const enter = smooth(((progress - .5) / .3 - slot * .18) / .46);
          const exit = smooth(((progress - .82) / .18 - slot * .18) / .48);
          amount = enter * (1-exit);
        }
        // Let the connector arrive before the card resolves into view.
        const lineAmount = smooth(amount/.54);
        const cardAmount = smooth((amount-.28)/.72);
        const direction = card.classList.contains('tree-left') ? -1 : 1;
        card.style.setProperty('--tree-card-progress',cardAmount.toFixed(3));
        card.style.setProperty('--tree-icon-y',`${((1-cardAmount)*5).toFixed(2)}px`);
        card.style.setProperty('--tree-icon-rotate',`${(-2+cardAmount*2).toFixed(2)}deg`);
        card.style.setProperty('--tree-icon-scale',(.97+cardAmount*.03).toFixed(3));
        card.style.opacity = cardAmount.toFixed(3);
        card.style.filter = `blur(${((1-cardAmount)*8).toFixed(2)}px)`;
        card.style.pointerEvents = cardAmount > .9 ? 'auto' : 'none';
        card.style.transform = `translate3d(${direction * (1-cardAmount) * 15}px,${(1-cardAmount) * 15}px,0) scale(${(.96 + cardAmount*.04).toFixed(3)})`;
        const branch = treeBranches[index];
        const anchor = treeTrunk.getPointAtLength(trunkLength * [.155,.5,.845][slot]);
        const canvasWidth = Math.max(1,treeCanvas.clientWidth), canvasHeight = Math.max(1,treeCanvas.clientHeight);
        const endX = (card.offsetLeft + (direction < 0 ? card.offsetWidth : 0)) / canvasWidth * 1000;
        const endY = (card.offsetTop + card.offsetHeight/2) / canvasHeight * 520;
        branch.setAttribute('d',`M${anchor.x.toFixed(1)} ${anchor.y.toFixed(1)} C${(anchor.x+direction*66).toFixed(1)} ${anchor.y.toFixed(1)} ${(endX-direction*72).toFixed(1)} ${endY.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`);
        branch.style.strokeDashoffset = String(1-lineAmount);
        branch.style.opacity = lineAmount.toFixed(3);
      });
      if (displayProgress !== targetProgress) treeFrame = requestAnimationFrame(updateTree); else treeFrame = null;
    };
    measureTree();
    addEventListener('scroll',measureTree,{passive:true});
    addEventListener('resize',measureTree);
  }
  const orbitReviews = $$('.orbit-review');
  if (orbitReviews.length) {
    let reviewStart = 0, reviewTimer, wheelLocked = false;
    const renderReviews = (exitTop = -1, exitBottom = -1) => { orbitReviews.forEach((card, i) => { card.className = 'orbit-review'; if (i === exitTop) card.classList.add('review-exit-top'); else if (i === exitBottom) card.classList.add('review-exit-bottom'); else { const slot = (i - reviewStart + orbitReviews.length) % orbitReviews.length; if (slot < 5) card.classList.add(`review-slot-${slot}`); else card.classList.add('review-hidden'); } }); const count = $('[data-review-count]'); if (count) count.textContent = String(reviewStart + 1).padStart(2, '0'); };
    const moveReviews = direction => { const previousStart = reviewStart; if (direction > 0) { reviewStart = (reviewStart + 1) % orbitReviews.length; renderReviews(previousStart); setTimeout(() => renderReviews(), 720); } else { const incoming = (previousStart - 1 + orbitReviews.length) % orbitReviews.length; const outgoing = (previousStart + 4) % orbitReviews.length; orbitReviews[incoming].className = 'orbit-review review-hidden-above'; void orbitReviews[incoming].offsetWidth; reviewStart = incoming; renderReviews(-1, outgoing); setTimeout(() => renderReviews(), 720); } };
    const startReviews = () => { clearInterval(reviewTimer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) reviewTimer = setInterval(() => moveReviews(1), innerWidth <= 800 ? 4200 : 2600); };
    const stopReviews = () => clearInterval(reviewTimer);
    renderReviews(); startReviews();
    $('[data-review-prev]')?.addEventListener('click', () => moveReviews(-1));
    $('[data-review-next]')?.addEventListener('click', () => moveReviews(1));
    const reviewOrbit = $('.review-orbit');
    reviewOrbit?.addEventListener('mouseenter', stopReviews); reviewOrbit?.addEventListener('mouseleave', startReviews);
    reviewOrbit?.addEventListener('wheel', () => startReviews(), {passive:true});
    let reviewTouchX = 0;
    reviewOrbit?.addEventListener('touchstart',event => { reviewTouchX = event.changedTouches[0].clientX; stopReviews(); },{passive:true});
    reviewOrbit?.addEventListener('touchend',event => {
      const distance = event.changedTouches[0].clientX-reviewTouchX;
      if (Math.abs(distance) > 38) moveReviews(distance < 0 ? 1 : -1);
    },{passive:true});
    document.addEventListener('visibilitychange',() => document.hidden ? stopReviews() : startReviews());
  }
  const reportProcess = $('[data-report-process]');
  if (reportProcess) {
    const fleetCards = $$('.fleet-card',reportProcess), fleetLinks = $$('[data-fleet-link]',reportProcess);
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let fleetTimers = [], fleetRunning = false;
    fleetCards.forEach(card => { const status = $('small',card); if (status) status.dataset.idleLabel = status.textContent; });
    const scheduleFleet = (callback,delay) => { const timer = setTimeout(callback,delay); fleetTimers.push(timer); return timer; };
    const clearFleet = () => { fleetTimers.forEach(clearTimeout); fleetTimers = []; fleetRunning = false; };
    const resetFleet = () => {
      fleetCards.forEach(card => { card.classList.remove('is-working','is-complete'); const status = $('small',card); if (status) status.textContent = status.dataset.idleLabel; });
      fleetLinks.forEach(link => link.classList.remove('is-complete'));
    };
    const completeFleetStep = index => {
      if (!fleetRunning) return;
      if (index >= fleetCards.length) {
        scheduleFleet(() => { if (!fleetRunning) return; resetFleet(); scheduleFleet(() => completeFleetStep(0),520); },1800);
        return;
      }
      const card = fleetCards[index], status = $('small',card);
      card.classList.add('is-working');
      if (status) status.textContent = 'IN PROGRESS';
      scheduleFleet(() => {
        if (!fleetRunning) return;
        card.classList.remove('is-working');
        card.classList.add('is-complete');
        if (status) status.textContent = 'COMPLETE';
        scheduleFleet(() => {
          if (fleetLinks[index]) fleetLinks[index].classList.add('is-complete');
          scheduleFleet(() => completeFleetStep(index+1),430);
        },230);
      },620);
    };
    const startFleet = () => {
      if (fleetRunning) return;
      if (reducedMotion) { fleetCards.forEach(card => card.classList.add('is-complete')); fleetLinks.forEach(link => link.classList.add('is-complete')); return; }
      fleetRunning = true;
      resetFleet();
      scheduleFleet(() => completeFleetStep(0),350);
    };
    const stopFleet = () => { clearFleet(); resetFleet(); };
    new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting ? startFleet() : stopFleet()),{threshold:.18}).observe(reportProcess);
    document.addEventListener('visibilitychange',() => document.hidden ? stopFleet() : startFleet());
  }
  const doctorScene = $('.doctor-pop-scene');
  if (doctorScene) {
    let doctorFrame;
    const updateDoctorDepth = () => { doctorFrame = null; if (!doctorScene.classList.contains('doctor-scroll')) return; const rect = doctorScene.getBoundingClientRect(); const viewport = innerHeight; const distance = Math.abs(rect.top + rect.height / 2 - viewport / 2); const reach = viewport / 2 + rect.height / 2; const proximity = Math.max(0, 1 - distance / reach); doctorScene.style.setProperty('--doctor-scale', (1 + proximity * .13).toFixed(3)); doctorScene.style.setProperty('--doctor-y', `${Math.round((1 - proximity) * 14)}px`); };
    const depthObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting && !doctorScene.classList.contains('doctor-entered')) { doctorScene.classList.add('doctor-entered','doctor-entering'); setTimeout(() => { doctorScene.classList.remove('doctor-entering'); doctorScene.classList.add('doctor-scroll'); updateDoctorDepth(); }, 950); } }), {threshold:.3});
    depthObserver.observe(doctorScene);
    addEventListener('scroll', () => { if (!doctorFrame) doctorFrame = requestAnimationFrame(updateDoctorDepth); }, {passive:true});
    addEventListener('resize', updateDoctorDepth);
  }
  const naSteps = $$('.next-action-step');
  if (naSteps.length) {
    const naCard = $('.next-actions-card');
    const naReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    $$('.na-art').forEach(art => art.classList.add('is-armed'));
    // card-level: drives the desktop sand loop, and stops it off-screen or on a hidden tab
    new IntersectionObserver(entries => entries.forEach(entry => naCard.classList.toggle('is-onscreen', entry.isIntersecting)), {threshold:.15}).observe(naCard);
    document.addEventListener('visibilitychange', () => { if (document.hidden) naCard.classList.remove('is-onscreen'); });
    // one-shot: trace the line art in on arrival. Generous threshold so a step that never
    // crosses the midline (deep link, restored scroll) still draws instead of staying blank.
    const drawObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('has-drawn'); drawObserver.unobserve(entry.target); } }), {threshold:.25});
    naSteps.forEach(step => drawObserver.observe(step));
    // re-triggering: exactly one step is live - whichever sits nearest the viewport midline.
    // The band is deliberately wide (not a zero-height '-50% 0px -50%' root, which reports the
    // wrong element); exclusivity comes from picking a single winner, not from the geometry.
    if (!naReduced) {
      const naActive = new Set();
      let naFrame;
      const pickLive = () => {
        naFrame = null;
        let winner = null, best = Infinity;
        naActive.forEach(step => { const rect = step.getBoundingClientRect(); const distance = Math.abs(rect.top + rect.height / 2 - innerHeight / 2); if (distance < best) { best = distance; winner = step; } });
        naSteps.forEach(step => step.classList.toggle('is-live', step === winner));
      };
      const naLive = new IntersectionObserver(entries => { entries.forEach(entry => entry.isIntersecting ? naActive.add(entry.target) : naActive.delete(entry.target)); pickLive(); }, {rootMargin:'-40% 0px -40% 0px', threshold:0});
      naSteps.forEach(step => naLive.observe(step));
      addEventListener('scroll', () => { if (naActive.size && !naFrame) naFrame = requestAnimationFrame(pickLive); }, {passive:true});
    }
  }
  const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); } }), {threshold:.12}); $$('.reveal, .reveal-scale, .pillar-card, .deliverables article, .timeline article').forEach(x=>observer.observe(x));
  const score = $('[data-live-score]');
  if (score) { let value = 61, direction = 1; setInterval(() => { value += direction; if (value >= 76 || value <= 61) direction *= -1; score.textContent = value; }, 180); }
}

// Markup is already in the DOM (server-rendered); just wire up the behaviour.
// The theme is applied in <head> before first paint to avoid a flash.
bindInteractions();
