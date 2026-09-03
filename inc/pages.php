<?php
/**
 * Page composition — ported 1:1 from investorPage() / doctorPage() in the former app.js.
 *
 * NOTE ON WHITESPACE: the original JS template literal placed a newline + single space
 * between top-level sections. That whitespace is part of the emitted HTML, so it is
 * reproduced here verbatim via the SECTION_GAP constant. Do not "tidy" it.
 */

const SECTION_GAP = "\n ";

/** Shared review markup. $prefix is '' for investors, 'Dr. ' for doctors. */
function reviewCards($namePrefix = '')
{
    $out = '';
    foreach (REVIEWS as $i => $x) {
        $out .= '<article class="orbit-review" data-review-index="' . $i . '"><span class="review-number">0' . ($i + 1) . '</span><blockquote>' . $x[0] . '</blockquote><figcaption><span class="review-avatar">' . $x[3] . '</span><span><b>' . $namePrefix . $x[1] . '</b><small>' . $x[2] . '</small></span></figcaption></article>';
    }
    return $out;
}

/** Shared decorative curve inside the review orbit. */
function reviewCurve()
{
    return '<svg class="review-curve" viewBox="0 0 330 650" aria-hidden="true"><path d="M250 15 C65 120 55 520 250 635"/><circle cx="178" cy="84" r="5"/><circle cx="108" cy="205" r="5"/><circle cx="88" cy="326" r="6"/><circle cx="108" cy="447" r="5"/><circle cx="178" cy="568" r="5"/></svg>';
}

/** Shared prev/next/count control block. */
function reviewNav()
{
    return '<div class="review-nav"><button data-review-prev aria-label="Previous review">↑</button><button data-review-next aria-label="Next review">↓</button><span><b data-review-count>01</b> / 07</span></div>';
}

function investorPage()
{
    $healthCards = '';
    foreach (INVESTOR_SIX as $x) {
        $healthCards .= '<article class="investor-health-card reveal"><div><h3>' . $x[0] . '</h3><p>' . $x[1] . '</p></div><img src="assets/framework/' . $x[2] . '" alt="" aria-hidden="true" loading="lazy" decoding="async"></article>';
    }

    $healthSection = <<<HTML
<section id="financial-health" class="investor-health-grid-section"><div class="shell"><div class="section-heading investor-health-heading reveal"><h2>Returns tell one part,<br>Your financial health tells <em>the whole story.</em></h2></div><div class="investor-health-grid" aria-label="Six connected areas of financial health">{$healthCards}</div></div></section>
HTML;

    $checkupSection = <<<HTML
<section id="why" class="checkup-details"><div class="shell"><div class="checkup-form-card"><h2>What we ask in the checkup form</h2><p>It takes exactly 4 minutes. You'll need a rough estimate of your finances. (No exact account details needed.)</p><ul><li>Basic income and expense ranges</li><li>How much you save monthly</li><li>Lumpsum estimates of investments</li><li>Existing health &amp; life cover amounts</li><li>Target retirement age &amp; major goals</li><li>Any outstanding loans</li></ul></div><div class="cost-of-ignorance"><p>46% people do not have enough Emergency Fund <small>(source FinnFit quiz)</small><br>Without that buffer, one hospital bill or job loss can jeopardise your family’s future.</p></div></div></section>
HTML;

    $curve = reviewCurve();
    $nav = reviewNav();
    $cards = reviewCards();
    $storiesSection = <<<HTML
<section id="stories" class="stories luxury-reviews investor-reviews"><div class="shell luxury-review-grid"><div class="review-intro"><h2>Not a louder opinion.<br><em>A clearer one.</em></h2>{$nav}</div><div class="review-orbit" tabindex="0" aria-label="Scrollable investor reviews">{$curve}{$cards}</div></div></section>
HTML;

    $inner = hero(INVESTOR_DATA)
        . SECTION_GAP . nextActionsSection()
        . SECTION_GAP . reportJourneySection()
        . SECTION_GAP . $healthSection
        . SECTION_GAP . $checkupSection
        . SECTION_GAP . $storiesSection
        . SECTION_GAP . pricing('₹999', 'A complete, honest read on your money in one 45 minute session.', 'Get Your Checkup')
        . faq()
        . '</main>';

    return appShell(INVESTOR_DATA, $inner);
}

function doctorPage()
{
    $medicalCta = button('Review My Financial Position');
    $medicalSection = <<<HTML
<section id="whole-picture" class="doctor-medical-planning"><div class="shell doctor-medical-card"><div class="doctor-medical-copy reveal"><span class="doctor-medical-badge">FINNOVATE · FOR DOCTORS</span><h2>Financial Planning for<br>Medical Professionals</h2><ul><li>Doctor-centric investment portfolios</li><li>Professional indemnity &amp; health insurance</li><li>Tax planning for clinical income</li></ul>{$medicalCta}</div><div class="doctor-medical-visual reveal-scale"><img src="/assets/doctors/doctor-cutout-v2.png" alt="Doctor supported by specialist financial planning"></div></div></section>
HTML;

    $pillars = '';
    foreach (DOCTOR_FRAMEWORK as $x) {
        $pillars .= '<button class="doctor-pillar"><img src="/assets/framework/' . $x[2] . '" alt="" aria-hidden="true" loading="lazy" decoding="async"><b>' . $x[0] . '</b><small>' . $x[1] . '</small></button>';
    }

    $frameworkSection = <<<HTML
<section class="framework shell"><div class="section-heading"><h2>6 areas. <em>1 vital view.</em></h2></div><div class="doctor-pillars">{$pillars}</div></section>
HTML;

    $proofSet = '<div class="proof-stat"><strong>18+</strong><span>years</span></div><div class="proof-stat"><strong>3,500+</strong><span>families</span></div><div class="proof-stat"><strong>₹1,200 Cr+</strong><span>assets under advice</span></div>';
    $proofSection = <<<HTML
<section class="doctor-proof"><div class="shell"><div class="proof-window"><div class="proof-track"><div class="proof-set">{$proofSet}</div><div class="proof-set" aria-hidden="true">{$proofSet}</div></div></div></div></section>
HTML;

    $curve = reviewCurve();
    $nav = reviewNav();
    $cards = reviewCards('Dr. ');
    $storiesSection = <<<HTML
<section id="stories" class="stories doctor-stories luxury-reviews"><div class="shell luxury-review-grid"><div class="review-intro"><h2>Doctors on <em>Clarity</em></h2><p class="review-support">Different specialties. Different goals.<br>One shared outcome: <strong>financial clarity.</strong></p>{$nav}</div><div class="review-orbit" tabindex="0" aria-label="Scrollable doctor reviews">{$curve}{$cards}</div></div></section>
HTML;

    $inner = hero(DOCTOR_DATA)
        . SECTION_GAP . nextActionsSection(true)
        . SECTION_GAP . reportJourneySection(true)
        . SECTION_GAP . $medicalSection
        . SECTION_GAP . $frameworkSection
        . SECTION_GAP . $proofSection
        . SECTION_GAP . $storiesSection
        . SECTION_GAP . doctorCheckupPricing()
        . faq(true)
        . '</main>';

    return appShell(DOCTOR_DATA, $inner);
}
