const ICONS = {
  arrow: '↗', check: '✓', plus: '+', shield: '✦', close: '×', chat: '◌'
};

const investorData = {
  eyebrow: '',
  title: 'An unbiased review of your entire financial life.',
  copy: 'Nine pages. Six areas. One 45-minute conversation with a SEBI-registered, fee-only planner (SEBI Registration Number: INA000010996). No products, no switching, no commission.',
  cta: 'Get Your Checkup 999',
  proof: '',
  theme: 'investor'
};

const doctorData = {
  eyebrow: '',
  title: 'India’s Financial Health Check,<br><em>Built for Doctors</em>',
  copy: 'Helping doctors assess their complete financial health across six key areas, with a personalised score, 9-page report, and expert review',
  cta: 'Get Your Checkup 999',
  proof: '',
  theme: 'doctor'
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

function logo(placement = 'header') {
  const source = '/assets/brand/finnovate-logo-brandkit-footer.png';
  return `<a href="/" class="logo logo-${placement}" aria-label="Finnovate home"><img class="brand-logo-image" src="${source}" alt="Finnovate, Be Financially Fit"></a>`;
}
function button(text, cls = 'button primary') {
  const classes = cls.split(/\s+/);
  const arrow = classes.includes('primary') || classes.includes('light') ? '' : `<span>${ICONS.arrow}</span>`;
  return `<button class="${cls}" data-open-modal>${text}${arrow}</button>`;
}
function themeToggle() { return `<button class="theme-toggle" type="button" aria-label="Switch to dark mode"><span class="theme-toggle-icon" aria-hidden="true">☾</span><span class="theme-toggle-label">Dark mode</span></button>`; }

function appShell(data, inner) {
  const audienceHref = data.theme === 'doctor' ? '/investors' : '/';
  const audienceLabel = data.theme === 'doctor' ? 'For investors' : 'For doctors';
  const promises = ['Your financial information stays private and confidential.','We never ask for banking passwords or transaction OTPs.','Fee-only guidance, with no commission-led product recommendations.'];
  const footer = `<footer class="doctor-footer"><div class="shell doctor-footer-grid footer-without-cta"><div><div class="doctor-footer-logo">${logo('footer')}</div><p>A structured, data driven methodology for your financial health.</p><small>⌾ &nbsp; SEBI-Registered Investment Adviser (SEBI Registration Number: INA000010996)</small></div><nav><p>DIAGNOSIS</p><a href="#how">How it works</a><a href="#stories">Stories</a><a href="#why">Our approach</a></nav><div><p>OUR PROMISES</p><ul>${promises.map(item=>`<li>${item}</li>`).join('')}</ul></div></div><div class="shell doctor-footer-bottom"><p>Finnovate Financial Services Pvt. Ltd. Investments are subject to market risks. Please read all related documents carefully before investing.</p><div><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><span>© 2026 Finnovate</span></div></div></footer>`
  return `<header class="nav"><div class="shell nav-inner">${logo()}<nav><a href="#how">How it works</a><a href="#why">Why Finnovate</a><a href="#stories">Stories</a></nav><div class="nav-actions"><a class="audience-switch" href="${audienceHref}">${audienceLabel} <span>↗</span></a>${themeToggle()}${button('Talk to us', 'button nav-cta')}</div><button class="menu" type="button" aria-label="Open navigation" aria-controls="mobile-navigation" aria-expanded="false"><span class="menu-icon" aria-hidden="true">☰</span></button></div><div class="mobile-nav" id="mobile-navigation" aria-hidden="true"><nav><a href="#how">How it works</a><a href="#why">Why Finnovate</a><a href="#stories">Stories</a></nav><a class="mobile-audience" href="${audienceHref}">${audienceLabel} <span>↗</span></a>${themeToggle()}${button('Talk to us', 'button mobile-nav-cta')}</div></header>${inner}${footer}${chatbot()}${modal(data.theme)}`;
}

function reportVisual() {
  return `<div class="report-visual reveal-scale" aria-label="Illustration of a financial health report"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit orbit-three"></div><div class="report-sheet back-sheet"></div><div class="report-sheet"><div class="report-top"><span>FINNOVATE / PRIVATE</span></div><h3>Your financial<br>health report</h3><div class="score"><small>YOUR SCORE</small><strong data-live-score>76</strong><i>/100</i></div><div class="mini-bars" aria-label="Financial health chart"><span></span><span></span><span></span><span></span><span></span></div><div class="report-foot">Clarity is a strategy.</div></div><span class="floating-pill pill-a"><b>Goals</b></span><span class="floating-pill pill-b">✦ <b>Unbiased</b></span></div>`;
}

function heroFitnessReport() {
 const rows = [['Goal Planning',78,'#009b62'],['Budgeting & Tax',81,'#08a665'],['Loan Management',100,'#009b62'],['Insurance',38,'#d25b39'],['Investment Planning',55,'#ffb82e'],['Estate Planning',20,'#c94f30']];
 return `<div class="hero-fitness-report" aria-hidden="true"><div class="hero-report-head"><div><small>FINANCIAL FITNESS REPORT</small><b>Finnovate</b></div><span>Live · Today</span></div><div class="hero-report-profile"><b>Your financial snapshot</b><small>Designed for a busy medical professional</small></div><div class="hero-report-body"><div class="hero-report-score"><div class="hero-score-ring" style="--hero-score:259deg"><strong data-hero-score>72</strong><small>/100</small></div><span>Live score</span></div><div class="hero-report-bars">${rows.map((row,i)=>`<div style="--metric:${row[1]}%;--metric-color:${row[2]};--metric-delay:${i*.13}s"><span>${row[0]} <b>${row[1]}</b></span><i></i></div>`).join('')}</div></div><p class="hero-priority-label">TOP 3 PRIORITY ACTIONS</p><div class="hero-priorities"><article><b>1</b><div><small>INSURANCE</small><strong>Increase term cover by ₹1.5 Cr</strong></div></article><article><b>2</b><div><small>INVESTMENT PLANNING</small><strong>Consolidate 14 schemes to reduce overlap</strong></div></article><article><b>3</b><div><small>ESTATE PLANNING</small><strong>Create a will and update nominees</strong></div></article></div><div class="hero-report-foot"><span>Finnovate Financial Services</span><span>Interactive preview</span></div></div>`;
}

function doctorVisual() {
 return `<div class="doctor-visual reveal-scale"><div class="pulse p1"></div><div class="pulse p2"></div><div class="doctor-orbit"><span>+</span><span>₹</span><span>✦</span></div><div class="phone" tabindex="0" aria-label="Hover to preview your Financial Fitness Report"><div class="phone-notch"></div><div class="phone-screen"><small>FINNOVATE CARE</small><h3>Your plan is<br><em>on track.</em></h3><div class="heart-line">⌁⌁⌁⌁⌁⌁⌁</div><div class="next-card"><small>YOUR FINANCIAL</small><b>Fitness Report</b><span>Live score preview</span></div></div></div>${heroFitnessReport()}<svg class="hero-steth hero-steth-front" viewBox="0 0 340 440" aria-hidden="true" focusable="false"><g class="steth-outline"><path d="M68 110C40 144 42 210 86 250C98 260 112 264 122 262"/><path d="M278 170C268 214 212 252 158 261C144 263 132 264 122 262"/><path d="M122 262C106 284 88 302 70 316C48 334 20 336 12 316C4 296 18 280 40 280"/></g><g class="steth-core"><path d="M68 110C40 144 42 210 86 250C98 260 112 264 122 262"/><path d="M278 170C268 214 212 252 158 261C144 263 132 264 122 262"/><path d="M122 262C106 284 88 302 70 316C48 334 20 336 12 316C4 296 18 280 40 280"/></g><circle class="steth-tip" cx="68" cy="110" r="7"/><circle class="steth-tip" cx="278" cy="170" r="7"/><circle class="steth-bell" cx="54" cy="278" r="14"/><circle class="steth-bell-inner" cx="54" cy="278" r="6"/></svg></div>`;
}

function hero(data) {
 const tickerItems = ['Goals', 'Tax', 'Investments', 'Insurance', 'Estate Planning'];
 const tickerSet = tickerItems.map(item => `<span>${item}</span>`).join('');
 return `<main><section class="hero ${data.theme}"><div class="shell hero-grid"><div class="hero-copy"><h1>${data.title}</h1><p class="lead">${data.copy}</p><div class="hero-actions">${button(data.cta)}<a href="#how" class="text-link">See how it works <span>↓</span></a></div>${data.proof ? `<p class="trust-line">${data.proof}</p>` : ''}</div>${data.theme === 'doctor' ? doctorVisual() : reportVisual()}</div><section class="ticker" aria-label="Areas covered in your financial plan"><div class="ticker-intro"><strong>Every part, in one view.</strong></div><div class="ticker-window"><div class="ticker-track"><div class="ticker-set">${tickerSet}</div><div class="ticker-set" aria-hidden="true">${tickerSet}</div></div></div></section></section>`;
}

function reportJourneySection(isDoctor=false) {
 const processSteps = [
  ['An In-depth Diagnosis','We spend the first 24–48 hours understanding every answer you give. So your 45 minutes is spent on findings, not on gathering information.'],
  ['Retirement Target Clarity','In the meeting, we calculate your retirement target corpus and the yearly savings required to stay on track.'],
  ['Investment Visibility','We help you download our app and fetch your existing investments so you can see everything in one place.'],
  ['Insurance Gap Check','Based on your income, expenses and lifestyle, we suggest adequate term and health cover.'],
  ['Portfolio Performance','See how your investments have actually performed, and whether that performance is doing the job your goals need it to do.'],
  ['Estate Planning','We review how your assets are held and who they pass to. So your wealth reaches the right people, in the way you intended.'],
  ['Financial Health Score','You receive a structured score based on the 6 pillars of financial fitness showing strengths and gaps.'],
  ['Recommendation and Tracking','You get an all-in-one tracker to monitor family-level investments with benchmark comparison.']
 ];
 const pages = Array.from({length:12},(_,index) => {
  const page = index + 1;
  const number = String(page).padStart(2,'0');
  const initialClass = index === 0 ? 'is-active' : index < 4 ? `is-next-${index}` : '';
  return `<figure class="report-slide ${initialClass}" data-report-page="${index}" aria-hidden="${index===0?'false':'true'}"><img src="/assets/reports/financial-fitness-page-${number}.webp" alt="Financial fitness report page ${page} of 12" ${index===0?'fetchpriority="high"':'loading="lazy"'} decoding="async"><span class="report-privacy-mask mask-one" aria-hidden="true"></span><span class="report-privacy-mask mask-two" aria-hidden="true"></span><span class="report-privacy-mask mask-three" aria-hidden="true"></span></figure>`;
 }).join('');
 const processCards = processSteps.map((step,index) => `<article class="fleet-card${index === 6 ? ' fleet-card-highlight' : ''}" data-fleet-step="${index}"><span class="fleet-number">${index+1}</span><h3>${step[0]}</h3><p>${step[1]}</p></article>`).join('');
 return `<section id="how" class="report-journey ${isDoctor ? 'doctor-report-journey' : ''}"><div class="shell"><section class="report-process"><div class="report-process-heading reveal"><h2>How we build your<br><em>Financial Fitness Report</em></h2><p>See how we turn your numbers into a clear score, insights, and a focused action plan.</p></div><div class="process-fleet" aria-label="Eight step financial report process">${processCards}</div></section><div class="report-preview-heading reveal"><h2>Preview your<br><em>Financial Fitness Report</em></h2><p>The same 9-page PDF your advisor prepares is based entirely on your numbers, not templates.</p></div><div class="report-journey-grid"><div class="report-phone-carousel is-playing reveal-scale" data-report-carousel aria-label="Twelve page financial fitness report preview"><div class="report-phone-stage"><div class="report-phone-shell" aria-hidden="true"><span class="report-phone-speaker"></span><span class="report-phone-home"></span></div><div class="report-slide-deck">${pages}</div></div></div><div class="report-download-cta reveal">${button('Get Your Report - 999','button primary report-download-button')}</div></div></div></section>`;
}

function investorPage() {
 const six = [
  ['Goal Planning','Is your money aligned with what you want it to achieve?','goals.png'],
  ['Budgeting & Tax','Is your income being used as efficiently as it could be?','cashflow-tax.png'],
  ['Loan Management','Are your liabilities helping or holding back your plans?','practice-loans.png'],
  ['Insurance','Is what you have built properly protected?','insurance.png'],
  ['Investment Planning','Are your investments performing, diversified and allocated the way they should be?','investing.png'],
  ['Estate Planning','Is your wealth organised for the people it is meant for?','estate-legacy.png']
 ];
 return appShell(investorData, hero(investorData) + `
<section class="investor-next-actions"><div class="shell"><div class="next-actions-heading reveal"><h2>What will you do, in 3 steps</h2></div><div class="next-actions-card reveal" aria-label="What you will do in three steps"><div class="next-actions-line" aria-hidden="true"></div><article class="next-action-step"><span class="next-action-number">1</span><div class="next-action-icon"><img src="/assets/investors/step-checkup-hourglass-realistic.png" alt="" aria-hidden="true"></div><div><h3>Start Your Financial Checkup</h3><p>Pay ₹999 securely and begin your Financial Fitness Checkup.</p></div></article><article class="next-action-step"><span class="next-action-number">2</span><div class="next-action-icon"><img src="/assets/investors/step-review-analysis-realistic.png" alt="" aria-hidden="true"></div><div><h3>Share Your Financial Snapshot</h3><p>You fill a short form (or get a callback). Our team reviews your numbers within 24-48 hours.</p></div></article><article class="next-action-step"><span class="next-action-number">3</span><div class="next-action-icon"><img src="/assets/investors/step-action-plan-realistic.png" alt="" aria-hidden="true"></div><div><h3>Review Your Financial Position</h3><p>Receive your Financial Fitness Score, 9-page personalised report and three priority actions, then walk through them in a 45-minute one-to-one expert review.</p></div></article></div></div></section>
 ${reportJourneySection()}
 <section id="financial-health" class="investor-health-grid-section"><div class="shell"><div class="section-heading investor-health-heading reveal"><h2>Returns tell one part,<br>Your financial health tells <em>the whole story.</em></h2></div><div class="investor-health-grid" aria-label="Six connected areas of financial health">${six.map(x=>`<article class="investor-health-card reveal"><div><h3>${x[0]}</h3><p>${x[1]}</p></div><img src="assets/framework/${x[2]}" alt="" aria-hidden="true" loading="lazy" decoding="async"></article>`).join('')}</div></div></section>
 <section id="why" class="checkup-details"><div class="shell"><div class="checkup-form-card"><h2>What we ask in the checkup form</h2><p>It takes exactly 4 minutes. You'll need a rough estimate of your finances. (No exact account details needed.)</p><ul><li>Basic income and expense ranges</li><li>How much you save monthly</li><li>Lumpsum estimates of investments</li><li>Existing health &amp; life cover amounts</li><li>Target retirement age &amp; major goals</li><li>Any outstanding loans</li></ul></div><div class="cost-of-ignorance"><p>46% people do not have enough Emergency Fund <small>(source FinnFit quiz)</small><br>Without that buffer, one hospital bill or job loss can jeopardise your family’s future.</p></div></div></section>
 <section id="stories" class="stories luxury-reviews investor-reviews"><div class="shell luxury-review-grid"><div class="review-intro"><h2>Not a louder opinion.<br><em>A clearer one.</em></h2><div class="review-nav"><button data-review-prev aria-label="Previous review">↑</button><button data-review-next aria-label="Next review">↓</button><span><b data-review-count>01</b> / 07</span></div></div><div class="review-orbit" tabindex="0" aria-label="Scrollable investor reviews"><svg class="review-curve" viewBox="0 0 330 650" aria-hidden="true"><path d="M250 15 C65 120 55 520 250 635"/><circle cx="178" cy="84" r="5"/><circle cx="108" cy="205" r="5"/><circle cx="88" cy="326" r="6"/><circle cx="108" cy="447" r="5"/><circle cx="178" cy="568" r="5"/></svg>${[
 ['“I thought my SIPs were fine. This showed I was under saving for my biggest goal. The next steps were simple.”','Amrita S.','Mumbai','A'],
 ['“No product pushing. They showed what was clutter in my portfolio and what actually mattered.”','Rohit K.','Pune','R'],
 ['“Insurance gaps were a blind spot for me. Now I know the minimum protection I should have.”','Shreya M.','Nashik','S'],
 ['“It felt like a proper checkup. Clear score, clear gaps, and a clean plan. Worth more than ₹999.”','Vivek P.','Ahmedabad','V'],
 ['“My CA handles tax and my bank pushes products. Someone finally looked at everything, with nothing to sell.”','Ananya R.','Bengaluru','A'],
 ['“They pinpointed overlapping funds and unnecessary fees. In 45 minutes, I had total clarity on what to fix.”','Karan D.','Delhi NCR','K'],
 ['“Direct, unbiased, and completely transparent. The roadmap gave my family real confidence in our finances.”','Nikhil T.','Hyderabad','N']
 ].map((x,i)=>`<article class="orbit-review" data-review-index="${i}"><span class="review-number">0${i+1}</span><blockquote>${x[0]}</blockquote><figcaption><span class="review-avatar">${x[3]}</span><span><b>${x[1]}</b><small>${x[2]}</small></span></figcaption></article>`).join('')}</div></div></section>
 ${pricing('₹999','A complete, honest read on your money in one 45 minute session.', 'Get Your Checkup')}${faq()}</main>`);
}

function doctorPage() {
 const frameworkItems = [
  ['Goal Planning','Are your investments aligned with your goal?','goals.png'],
  ['Budgeting & Tax','Are your savings, emergency fund and debt levels sufficient?','cashflow-tax.png'],
  ['Loan Management','Is your current loan burden manageable?','practice-loans.png'],
  ['Insurance','Do you have enough term and health cover for the protection you actually need?','insurance.png'],
  ['Investment Planning','Are your investments performing, diversified and allocated the way they should be?','investing.png'],
  ['Estate Planning','Is your wealth arranged to reach the right people, the way you intend it to?','estate-legacy.png']
 ];
 return appShell(doctorData, hero(doctorData) + `
<section class="investor-next-actions doctor-next-actions"><div class="shell"><div class="next-actions-heading reveal"><h2>What will you do, in 3 steps</h2></div><div class="next-actions-card reveal" aria-label="What you will do in three steps"><div class="next-actions-line" aria-hidden="true"></div><article class="next-action-step"><span class="next-action-number">1</span><div class="next-action-icon"><img src="/assets/investors/step-checkup-hourglass-realistic.png" alt="" aria-hidden="true"></div><div><h3>Start Your Financial Checkup</h3><p>Pay ₹999 securely and begin your Financial Fitness Checkup.</p></div></article><article class="next-action-step"><span class="next-action-number">2</span><div class="next-action-icon"><img src="/assets/investors/step-review-analysis-realistic.png" alt="" aria-hidden="true"></div><div><h3>Share Your Financial Snapshot</h3><p>You fill a short form (or get a callback). Our team reviews your numbers within 24-48 hours.</p></div></article><article class="next-action-step"><span class="next-action-number">3</span><div class="next-action-icon"><img src="/assets/investors/step-action-plan-realistic.png" alt="" aria-hidden="true"></div><div><h3>Review Your Financial Position</h3><p>Receive your Financial Fitness Score, 9-page personalised report and three priority actions, then walk through them in a 45-minute one-to-one expert review.</p></div></article></div></div></section>
 ${reportJourneySection(true)}
 <section id="whole-picture" class="doctor-medical-planning"><div class="shell doctor-medical-card"><div class="doctor-medical-copy reveal"><span class="doctor-medical-badge">FINNOVATE · FOR DOCTORS</span><h2>Financial Planning for<br>Medical Professionals</h2><ul><li>Doctor-centric investment portfolios</li><li>Professional indemnity &amp; health insurance</li><li>Tax planning for clinical income</li></ul>${button('Review My Financial Position')}</div><div class="doctor-medical-visual reveal-scale"><img src="/assets/doctors/doctor-cutout-v2.png" alt="Doctor supported by specialist financial planning"></div></div></section>
 <section class="framework shell"><div class="section-heading"><h2>6 areas. <em>1 vital view.</em></h2></div><div class="doctor-pillars">${frameworkItems.map(x=>`<button class="doctor-pillar"><img src="/assets/framework/${x[2]}" alt="" aria-hidden="true" loading="lazy" decoding="async"><b>${x[0]}</b><small>${x[1]}</small></button>`).join('')}</div></section>
 <section class="doctor-proof"><div class="shell"><div class="proof-window"><div class="proof-track"><div class="proof-set"><div class="proof-stat"><strong>18+</strong><span>years</span></div><div class="proof-stat"><strong>3,500+</strong><span>families</span></div><div class="proof-stat"><strong>₹1,200 Cr+</strong><span>assets under advice</span></div></div><div class="proof-set" aria-hidden="true"><div class="proof-stat"><strong>18+</strong><span>years</span></div><div class="proof-stat"><strong>3,500+</strong><span>families</span></div><div class="proof-stat"><strong>₹1,200 Cr+</strong><span>assets under advice</span></div></div></div></div></div></section>
 <section id="stories" class="stories doctor-stories luxury-reviews"><div class="shell luxury-review-grid"><div class="review-intro"><h2>Doctors on <em>Clarity</em></h2><p class="review-support">Different specialties. Different goals.<br>One shared outcome: <strong>financial clarity.</strong></p><div class="review-nav"><button data-review-prev aria-label="Previous review">↑</button><button data-review-next aria-label="Next review">↓</button><span><b data-review-count>01</b> / 07</span></div></div><div class="review-orbit" tabindex="0" aria-label="Scrollable doctor reviews"><svg class="review-curve" viewBox="0 0 330 650" aria-hidden="true"><path d="M250 15 C65 120 55 520 250 635"/><circle cx="178" cy="84" r="5"/><circle cx="108" cy="205" r="5"/><circle cx="88" cy="326" r="6"/><circle cx="108" cy="447" r="5"/><circle cx="178" cy="568" r="5"/></svg>${[
 ['“I thought my SIPs were fine. This showed I was under saving for my biggest goal. The next steps were simple.”','Dr. Amrita S.','Mumbai','A'],
 ['“No product pushing. They showed what was clutter in my portfolio and what actually mattered.”','Dr. Rohit K.','Pune','R'],
 ['“Insurance gaps were a blind spot for me. Now I know the minimum protection I should have.”','Dr. Shreya M.','Nashik','S'],
 ['“It felt like a proper checkup. Clear score, clear gaps, and a clean plan. Worth more than ₹999.”','Dr. Vivek P.','Ahmedabad','V'],
 ['“My CA handles tax and my bank pushes products. Someone finally looked at everything, with nothing to sell.”','Dr. Ananya R.','Bengaluru','A'],
 ['“They pinpointed overlapping funds and unnecessary fees. In 45 minutes, I had total clarity on what to fix.”','Dr. Karan D.','Delhi NCR','K'],
 ['“Direct, unbiased, and completely transparent. The roadmap gave my family real confidence in our finances.”','Dr. Nikhil T.','Hyderabad','N']
 ].map((x,i)=>`<article class="orbit-review" data-review-index="${i}"><span class="review-number">0${i+1}</span><blockquote>${x[0]}</blockquote><figcaption><span class="review-avatar">${x[3]}</span><span><b>${x[1]}</b><small>${x[2]}</small></span></figcaption></article>`).join('')}</div></div></section>
 ${doctorCheckupPricing()}${faq(true)}</main>`);
}

function pricing(price, subtitle, label) { return `<section class="pricing"><div class="shell pricing-card"><div><h2>${price}</h2><p>${subtitle}</p></div><div class="price-includes"><span>${ICONS.check} Clear next steps</span><span>${ICONS.check} Private & confidential</span><span>${ICONS.check} No product sales</span></div><div>${button(label, 'button light')}</div></div></section>`; }
function doctorCheckupPricing() { return `<section id="why" class="doctor-checkup-pricing"><div class="shell doctor-checkup-card"><span class="doctor-fee-label">ONE-TIME FEE</span><div class="doctor-checkup-main"><h2>The Financial Health<br>Checkup</h2><p class="doctor-checkup-price">₹999 <small>only</small></p><ul><li>Comprehensive Financial Health Score</li><li>Savings &amp; Protection Gap Analysis</li><li>Priority 'Top 3 Actions' List</li><li>1:1 Expert Review Call (45 mins)</li></ul>${button('Pay ₹999 Securely','button primary doctor-pay-button')}<p class="doctor-privacy-note">100% Data Privacy guaranteed. No spam.</p></div></div></section>`; }
function doctorDifference() { return `<section class="doctor-difference"><svg class="difference-stethoscope" viewBox="0 0 240 500" aria-hidden="true"><path d="M54 12v112c0 62 116 62 116 0V18M55 119c-40 53-34 129 29 152 73 26 105 84 62 145-27 38-79 28-79-16 0-38 50-55 76-26"/><circle cx="69" cy="404" r="23"/><circle cx="69" cy="404" r="10"/></svg><div class="difference-grid" aria-hidden="true"></div><div class="shell difference-inner"><h2>From “Where You Are” to<br><em>“Where You Want to Be”</em></h2><p class="difference-quote-tail">A Roadmap for Doctors</p></div><svg class="difference-doctor" viewBox="0 0 430 520" aria-hidden="true"><g><rect x="20" y="28" width="165" height="115" rx="12"/><path d="M44 104l34-31 29 19 43-42M48 54h45M207 63h118M207 92h88M207 121h132"/><circle cx="306" cy="208" r="49"/><path d="M282 202c18-24 49-23 64 3M287 221c14 17 39 19 54 0M301 254v38l-58 31-41 174M322 254v38l60 33 31 172M244 323l72 43 67-41M316 366v132M263 374l-18 124M368 374l19 124M276 301c5 44 77 45 84 0"/><path d="M263 285c-23 5-41 22-49 49M359 285c25 5 42 21 49 49"/></g></svg></section>`; }
function faq(isDoctor=false) {
  const investorQs = [
    ['What exactly do I receive for ₹999?','You receive a personalised Financial Fitness Score, a 9-page report, three priority actions and a 45-minute expert review.'],
    ['How much time does the assessment take?','The initial assessment takes around four minutes to complete.'],
    ['Is my information kept confidential?','Your financial information is handled privately for the purpose of preparing your Financial Fitness Checkup.'],
    ['Will you calculate my FI number and required yearly investment?',"Yes. You'll get your target corpus and the yearly fresh investment needed to reach it."],
    ['What is Finnovative?','We are a SEBI-registered, tech-enabled wealth management firm (SEBI Registration Number: INA000010996), operating since 2007 and managing assets for thousands of families across India and globally.'],
    ['Do i need to prepare a lot of documents before starting?','You begin with a short assessment. You can also download the Finnovate app to share the complete financial picture with us, before the call. This will make the analysis more in-depth and faster.']
  ];
  const doctorQs = [
    ['What exactly do I receive for ₹999?','You receive a personalised Financial Fitness Score, a 9-page report, three priority actions and a 45-minute expert review.'],
    ['How much time does the assessment take?','The initial assessment takes around four minutes to complete.'],
    ['Is my information kept confidential?','Your financial information is handled privately for the purpose of preparing your Financial Fitness Checkup.'],
    ['Do I need to prepare a lot of documents before starting?','You begin with a short assessment. You can also download the Finnovate app to share the complete financial picture with us, before the call. This will make the analysis more in-depth and faster.'],
    ['What is Finnovate?','We are a SEBI-registered, tech-enabled wealth management firm (SEBI Registration Number: INA000010996), operating since 2007 and managing assets for thousands of families across India and globally.'],
    ['What if I already have an advisor or a bank RM?','This checkup acts as a brilliant second opinion. Many clients discover hidden fees or inadequate insurance that their bank RMs missed.']
  ];
  const qs = isDoctor ? doctorQs : investorQs;
  const prefix = isDoctor ? 'doctor' : 'investor';
  const section = `<section class="faq shell plain-faq faq-${prefix}"><div class="faq-copy"><h2>Clarity starts with a good question.</h2></div><div class="faq-list">${qs.map((q,i)=>`<article class="faq-item"><button type="button" aria-expanded="false" aria-controls="${prefix}-faq-answer-${i}">${q[0]}<span aria-hidden="true">${ICONS.plus}</span></button><p id="${prefix}-faq-answer-${i}">${q[1]}</p></article>`).join('')}</div></section>`;
  return isDoctor ? doctorDifference() + section : section;
}
function chatbot() { return `<div class="chat-wrap"><div class="chat-pop"><button class="chat-x" aria-label="Close chat">${ICONS.close}</button><p><b>Need a quick answer?</b><br>Ask about the checkup, pricing or how Finnovate works.</p><div class="quick-questions"><button>What do I get?</button><button>Is it really unbiased?</button></div></div><button class="chat-button" aria-label="Open chat"><span>${ICONS.chat}</span><i></i></button></div>`; }
function modal(theme) {
  const investorOptions = ['I want the ₹999 checkup','I have questions before I book','A specific question about my money','Ongoing financial advice','Something else'];
  const doctorOptions = ['I want the ₹999 checkup','I have questions before I book','I am looking for ongoing advice','Ongoing advice for my practice and family','Something else'];
  const options = theme === 'investor' ? investorOptions : doctorOptions;
  const enquiryLabel = theme === 'investor' ? 'What would you like us to look at?' : "What's on your mind?";
  return `<dialog class="modal"><button class="modal-close" aria-label="Close">${ICONS.close}</button><h2>A clear next step<br>starts here.</h2><form><label>Your name<input placeholder="Dr. / Mr. / Ms. Name" required></label><label>Email address<input type="email" placeholder="you@example.com" required></label><div class="modal-field"><span class="modal-field-label">${enquiryLabel}</span><div class="custom-select" data-custom-select><button class="custom-select-trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-controls="enquiry-options"><span>What would you like us to look at?</span><i aria-hidden="true"></i></button><div class="custom-select-menu" id="enquiry-options" role="listbox" aria-label="${enquiryLabel}" hidden>${options.map(option=>`<button class="custom-select-option" type="button" role="option" aria-selected="false" data-value="${option}"><span>${option}</span><i aria-hidden="true">✓</i></button>`).join('')}</div><input class="custom-select-value" type="hidden" name="enquiry" value=""></div></div><button class="button primary" type="submit">Request a callback</button><p class="form-note">Demo form only. No information is submitted.</p></form></dialog>`;
}

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
  const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); } }), {threshold:.12}); $$('.reveal, .reveal-scale, .pillar-card, .deliverables article, .timeline article').forEach(x=>observer.observe(x));
  const score = $('[data-live-score]');
  if (score) { let value = 61, direction = 1; setInterval(() => { value += direction; if (value >= 76 || value <= 61) direction *= -1; score.textContent = value; }, 180); }
}
document.documentElement.dataset.theme = localStorage.getItem('finnovate-theme') || 'light';
const page = location.pathname.toLowerCase().includes('investor') ? investorPage() : doctorPage();
$('#app').innerHTML = page; bindInteractions();
