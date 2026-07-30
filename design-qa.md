# Design QA — Soni Transfer Selected Split Draft

## Comparison target

- Source visual truth: `/Users/mbah/.codex/generated_images/019fafc4-80b2-79e1-b9dc-7319175c3c06/call_SeyH5494YaN3qQ4bsUwG7TyH.png`
- Brand-logo override: `/Volumes/MADANI-HD/Developer/Soni2/prototype/public/assets/soni-logo-crop.png`, cropped without distortion from the supplied Soni Transfer artwork.
- Implementation: `http://localhost:4173/#/3`
- Implementation screenshot: `/Volumes/MADANI-HD/Developer/Soni2/prototype/qa/logo-calculator-v3-final.png`
- Draft 1 screenshot: `/Volumes/MADANI-HD/Developer/Soni2/prototype/qa/logo-calculator-v1-final.png`
- Draft 1 mobile screenshot: `/Volumes/MADANI-HD/Developer/Soni2/prototype/qa/logo-calculator-v1-mobile-final.png`
- Full comparison evidence: `/Volumes/MADANI-HD/Developer/Soni2/prototype/qa/source-vs-implementation-refined.png`
- Focused logo evidence: `/Volumes/MADANI-HD/Developer/Soni2/prototype/qa/logo-source-vs-implementation.png`

## Normalization

- Intended desktop viewport: 1440 × 1024 CSS pixels at device scale factor 1.
- Source pixels: 1487 × 1058.
- Implementation capture pixels: 1425 × 1013 after the browser viewport's scrollbar/chrome inset.
- Full-view comparison: source downsampled proportionally to 1013 px high; implementation kept at its native capture height. A 24 px neutral gutter separates both frames.
- Mobile check for draft 1: 390 × 844 viewport override; document client width and scroll width both measured 375 px, confirming no horizontal overflow.
- State: route `#/3`, £100 GBP, 8,950 GMD, Cash pickup selected, confirmation hidden before submission.

## Findings

- No actionable P0, P1, or P2 mismatch remains.

- [P3] Prototype comparison control remains visible
  - Location: fixed draft switcher.
  - Evidence: the control is visible in the desktop comparison and is not part of the source marketing design.
  - Impact: useful for comparing all three drafts; should be removed for a production release.
  - Follow-up: hide it behind a development flag when the concept is approved for production.

## Required fidelity surfaces

- Fonts and typography: Inter is used consistently. Display and UI weights, line height, amount hierarchy, and headline wrapping are close to the selected visual. No clipping or truncation is visible.
- Spacing and layout rhythm: two-column split, header spacing, hero balance, dividers, benefit rows, and rounded corners match the selected direction. The selected panel was intentionally reduced and draft 1 received a stronger compact treatment in response to user feedback. Responsive stacking preserves hierarchy.
- Colors and visual tokens: Soni blue, navy, white, and orange are consistent. The orange CTA uses navy text for stronger contrast.
- Image quality and asset fidelity: the supplied logo artwork is used rather than a generated/redrawn logo. A clean white navigation band allows the original blue/orange logo to render without a surrounding tile. Real PNG flag assets are used for GBP and GMD. No placeholder or CSS-drawn imagery is present.
- Copy and content: “Recipient gets exactly,” “Receive by,” and “£1 included” are present. Estimated-arrival and indicative-rate wording is absent from the calculator.

## Interaction and browser checks

- Amount input: changing £100 to £200 recalculated the recipient amount to 17,900 GMD.
- Receive method: Cash pickup changed successfully to Bank deposit through the native selector.
- Primary action: Send money displayed “Ready for bank deposit. Sign in to continue.”
- Console: no browser warnings or errors.
- Text assertions:
  - Estimate/estimated-arrival/indicative language in calculator: absent.
  - Exact-recipient label: present.
  - Receive-by selector: present.
- Production build: passed.
- Sites worker tests: 4/4 passed.

## Comparison history

### Iteration 1

- [P2] The fixed comparison switcher obscured calculator content at the mobile breakpoint.
- Fix: moved and reduced the switcher within the unused right side of the compact mobile header.
- Post-fix evidence: `/Volumes/MADANI-HD/Developer/Soni2/prototype/qa/selected-draft-mobile-final.png`.
- Result: the transfer panel and exact-amount confirmation are no longer obscured.

### Iteration 2

- [P2] The logo still appeared as artwork placed inside a separate white capsule on the blue hero.
- [P2] The selected calculator remained visually dominant, while the draft 1 calculator was substantially oversized relative to its headline.
- Fixes:
  - Moved the header onto a full-width white navigation band in drafts 1 and 3, allowing the supplied logo artwork to render naturally without a container.
  - Reduced selected-panel width, padding, row height, amount size, radius, and hero height.
  - Reduced draft 1 calculator width to 830 px, tightened padding and facts, and shortened payout and CTA controls.
- Post-fix evidence:
  - `/Volumes/MADANI-HD/Developer/Soni2/prototype/qa/logo-calculator-v3-final.png`
  - `/Volumes/MADANI-HD/Developer/Soni2/prototype/qa/logo-calculator-v1-final.png`
  - `/Volumes/MADANI-HD/Developer/Soni2/prototype/qa/logo-calculator-v1-mobile-final.png`
- Result: the logo reads as part of the navigation rather than a badge, the selected panel is balanced against the message, and draft 1's calculator no longer dominates its hero.

### Iteration 3

- [P1] Draft 1 had a visible white gap between the navigation band and blue hero because the first hero child's top margin collapsed outside its parent.
- [P1] Draft 1 still stacked its headline above the calculator at desktop widths, contrary to the requested two-column composition.
- Fixes:
  - Replaced the collapsing top margin with internal hero-grid padding.
  - Rebuilt draft 1 around a desktop two-column grid.
  - Placed the message on the left and the compact exact-amount panel on the right.
  - Removed the redundant hero CTA, leaving the calculator action as the primary conversion control.
  - Preserved responsive stacking below the tablet breakpoint.
- Post-fix evidence: `/Volumes/MADANI-HD/Developer/Soni2/prototype/qa/version1-side-by-side-crop.png`.
- Geometry verification:
  - Navigation-to-hero gap: 0 px.
  - Desktop headline box: x 493, width 508.
  - Desktop calculator box: x 1133, width 600.
  - The two boxes do not overlap and are horizontally side by side.
  - Responsive view stacks the panel below the copy with document scroll width equal to client width.
- Result: the blue hero begins immediately below navigation, and the headline and calculator share one desktop row.

## Follow-up polish

- Remove the draft switcher before a production launch.
- Consider an approved reversed/white logo lockup only if Soni later wants the navigation returned to a blue background.

final result: passed
