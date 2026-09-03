<?php
/**
 * Content data — ported 1:1 from the former app.js template layer.
 * Nothing here is new: every string is byte-identical to the JS original.
 */

const ICONS = [
    'arrow'  => '↗',
    'check'  => '✓',
    'plus'   => '+',
    'shield' => '✦',
    'close'  => '×',
    'chat'   => '◌',
];

const INVESTOR_DATA = [
    'eyebrow' => '',
    'title'   => 'An unbiased review of your entire financial life.',
    'copy'    => 'Nine pages. Six areas. One 45-minute conversation with a SEBI-registered, fee-only planner (SEBI Registration Number: INA000010996). No products, no switching, no commission.',
    'cta'     => 'Get Your Checkup 999',
    'proof'   => '',
    'theme'   => 'investor',
];

const DOCTOR_DATA = [
    'eyebrow' => '',
    'title'   => 'India’s Financial Health Check,<br><em>Built for Doctors</em>',
    'copy'    => 'Helping doctors assess their complete financial health across six key areas, with a personalised score, 9-page report, and expert review',
    'cta'     => 'Get Your Checkup 999',
    'proof'   => '',
    'theme'   => 'doctor',
];

/** Footer promise list (appShell). */
const FOOTER_PROMISES = [
    'Your financial information stays private and confidential.',
    'We never ask for banking passwords or transaction OTPs.',
    'Fee-only guidance, with no commission-led product recommendations.',
];

/** Hero ticker items. */
const TICKER_ITEMS = ['Goals', 'Tax', 'Investments', 'Insurance', 'Estate Planning'];

/**
 * heroFitnessReport() metric rows: [label, value, colour, animation-delay].
 * The delay was `index * 0.13` in JS; the resulting strings are listed literally
 * here so PHP float formatting can never drift from the original output.
 */
const HERO_REPORT_ROWS = [
    ['Goal Planning', 78, '#009b62', '0'],
    ['Budgeting & Tax', 81, '#08a665', '0.13'],
    ['Loan Management', 100, '#009b62', '0.26'],
    ['Insurance', 38, '#d25b39', '0.39'],
    ['Investment Planning', 55, '#ffb82e', '0.52'],
    ['Estate Planning', 20, '#c94f30', '0.65'],
];

/** reportJourneySection() process steps. */
const PROCESS_STEPS = [
    ['An In-depth Diagnosis', 'We spend the first 24–48 hours understanding every answer you give. So your 45 minutes is spent on findings, not on gathering information.'],
    ['Retirement Target Clarity', 'In the meeting, we calculate your retirement target corpus and the yearly savings required to stay on track.'],
    ['Investment Visibility', 'We help you download our app and fetch your existing investments so you can see everything in one place.'],
    ['Insurance Gap Check', 'Based on your income, expenses and lifestyle, we suggest adequate term and health cover.'],
    ['Portfolio Performance', 'See how your investments have actually performed, and whether that performance is doing the job your goals need it to do.'],
    ['Estate Planning', 'We review how your assets are held and who they pass to. So your wealth reaches the right people, in the way you intended.'],
    ['Financial Health Score', 'You receive a structured score based on the 6 pillars of financial fitness showing strengths and gaps.'],
    ['Recommendation and Tracking', 'You get an all-in-one tracker to monitor family-level investments with benchmark comparison.'],
];

/** investorPage() six-area grid: [title, question, image]. */
const INVESTOR_SIX = [
    ['Goal Planning', 'Is your money aligned with what you want it to achieve?', 'goals.png'],
    ['Budgeting & Tax', 'Is your income being used as efficiently as it could be?', 'cashflow-tax.png'],
    ['Loan Management', 'Are your liabilities helping or holding back your plans?', 'practice-loans.png'],
    ['Insurance', 'Is what you have built properly protected?', 'insurance.png'],
    ['Investment Planning', 'Are your investments performing, diversified and allocated the way they should be?', 'investing.png'],
    ['Estate Planning', 'Is your wealth organised for the people it is meant for?', 'estate-legacy.png'],
];

/** doctorPage() framework pillars: [title, question, image]. */
const DOCTOR_FRAMEWORK = [
    ['Goal Planning', 'Are your investments aligned with your goal?', 'goals.png'],
    ['Budgeting & Tax', 'Are your savings, emergency fund and debt levels sufficient?', 'cashflow-tax.png'],
    ['Loan Management', 'Is your current loan burden manageable?', 'practice-loans.png'],
    ['Insurance', 'Do you have enough term and health cover for the protection you actually need?', 'insurance.png'],
    ['Investment Planning', 'Are your investments performing, diversified and allocated the way they should be?', 'investing.png'],
    ['Estate Planning', 'Is your wealth arranged to reach the right people, the way you intend it to?', 'estate-legacy.png'],
];

/** Reviews: [quote, name, city, initial]. Investor names; doctor variant prefixes "Dr. ". */
const REVIEWS = [
    ['“I thought my SIPs were fine. This showed I was under saving for my biggest goal. The next steps were simple.”', 'Amrita S.', 'Mumbai', 'A'],
    ['“No product pushing. They showed what was clutter in my portfolio and what actually mattered.”', 'Rohit K.', 'Pune', 'R'],
    ['“Insurance gaps were a blind spot for me. Now I know the minimum protection I should have.”', 'Shreya M.', 'Nashik', 'S'],
    ['“It felt like a proper checkup. Clear score, clear gaps, and a clean plan. Worth more than ₹999.”', 'Vivek P.', 'Ahmedabad', 'V'],
    ['“My CA handles tax and my bank pushes products. Someone finally looked at everything, with nothing to sell.”', 'Ananya R.', 'Bengaluru', 'A'],
    ['“They pinpointed overlapping funds and unnecessary fees. In 45 minutes, I had total clarity on what to fix.”', 'Karan D.', 'Delhi NCR', 'K'],
    ['“Direct, unbiased, and completely transparent. The roadmap gave my family real confidence in our finances.”', 'Nikhil T.', 'Hyderabad', 'N'],
];

/** faq() question sets. */
const INVESTOR_FAQS = [
    ['What exactly do I receive for ₹999?', 'You receive a personalised Financial Fitness Score, a 9-page report, three priority actions and a 45-minute expert review.'],
    ['How much time does the assessment take?', 'The initial assessment takes around four minutes to complete.'],
    ['Is my information kept confidential?', 'Your financial information is handled privately for the purpose of preparing your Financial Fitness Checkup.'],
    ['Will you calculate my FI number and required yearly investment?', "Yes. You'll get your target corpus and the yearly fresh investment needed to reach it."],
    ['What is Finnovative?', 'We are a SEBI-registered, tech-enabled wealth management firm (SEBI Registration Number: INA000010996), operating since 2007 and managing assets for thousands of families across India and globally.'],
    ['Do i need to prepare a lot of documents before starting?', 'You begin with a short assessment. You can also download the Finnovate app to share the complete financial picture with us, before the call. This will make the analysis more in-depth and faster.'],
];

const DOCTOR_FAQS = [
    ['What exactly do I receive for ₹999?', 'You receive a personalised Financial Fitness Score, a 9-page report, three priority actions and a 45-minute expert review.'],
    ['How much time does the assessment take?', 'The initial assessment takes around four minutes to complete.'],
    ['Is my information kept confidential?', 'Your financial information is handled privately for the purpose of preparing your Financial Fitness Checkup.'],
    ['Do I need to prepare a lot of documents before starting?', 'You begin with a short assessment. You can also download the Finnovate app to share the complete financial picture with us, before the call. This will make the analysis more in-depth and faster.'],
    ['What is Finnovate?', 'We are a SEBI-registered, tech-enabled wealth management firm (SEBI Registration Number: INA000010996), operating since 2007 and managing assets for thousands of families across India and globally.'],
    ['What if I already have an advisor or a bank RM?', 'This checkup acts as a brilliant second opinion. Many clients discover hidden fees or inadequate insurance that their bank RMs missed.'],
];

/** modal() enquiry options. */
const INVESTOR_MODAL_OPTIONS = [
    'I want the ₹999 checkup',
    'I have questions before I book',
    'A specific question about my money',
    'Ongoing financial advice',
    'Something else',
];

const DOCTOR_MODAL_OPTIONS = [
    'I want the ₹999 checkup',
    'I have questions before I book',
    'I am looking for ongoing advice',
    'Ongoing advice for my practice and family',
    'Something else',
];
