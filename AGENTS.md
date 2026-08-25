# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Current approved direction

- The former Draft 2, “White editorial,” is the only active website direction and the source of truth for production. Treat it as the website, not as one option among several.
- Preserve the homepage's intentional color rhythm: white conversion hero, warm process/story surfaces, cool mist payout section, deep Soni-blue CSR section, and a light peach support band. Avoid merging the middle of the page into one uninterrupted cream or white block.
- Drafts 1 and 3 are archived. Do not expose alternate-draft routes, comparison controls, or review-mode switchers in local, staging, or production builds.
- Use `Send money across Africa with confidence.` as the approved hero headline and `Fast, secure and reliable transfers.` as its subheading.
- Remove fixed-£1-fee messaging from all website copy and UI. Calculator fees must come dynamically from the transfer API.
- Remove references to The Gambia and Gambian-specific positioning from production website copy so the product can expand to additional African receiving countries.
- Lead with secure transfers, competitive exchange rates, accurate FCA registration wording, and multiple payout options.
- Use `Send money in three simple steps.` for the process-section heading and `Payout method` for step two.
- Always use the supplied Soni Transfer logo asset without regenerating, redrawing, warping, or altering it.
- The calculator is not an estimate. Label the output as `Recipient receives exactly`; the amount and destination currency must come from the live quotation API.
- Use `Live rates` as the calculator's successful rate-status label; do not show `Live quotation` in the customer-facing interface.
- Do not show estimated-arrival information in the calculator.
- Include a `Payout method` selector populated with the methods returned by the transfer API.
- Show the current transfer fee returned by the API without hard-coding a fixed amount.
- Never present fallback or sample rates as a live quotation. If the Remitec service cannot provide a current quotation, disable continuation and show a clear retry state.
- Keep the header logo compact and polished. Avoid a large rectangular white logo block; use a restrained rounded support surface only when the blue background requires it.
- Keep calculators visually lighter than the hero message. Draft 1 should use the most compact calculator treatment.
- Draft 1 must have no whitespace between the navigation band and blue hero. Its hero message and transfer panel should sit side by side on desktop and stack only at responsive breakpoints.
- The `/v2/` deployment and local preview must open the selected White editorial website directly.
- Primary navigation contains only `Community` and `Contact` alongside the login and send-money actions. Do not restore `How it works`, `Ways to receive`, or `Help` as header navigation items.
- The homepage includes a concise community preview. `/community` owns the full diaspora story and Family Fun Day content; `/contact` owns support channels and office details.
- The three legacy CSR stories and all associated photographs are migrated into this codebase. Story cards on both the homepage and `/community` must link to their internal `/community/<story-slug>` pages and must not send readers back to the legacy website.
- Use the supplied Soni Transfer phone mockups as product UI visuals: the send-money, payout-method, and payment-method screens form an interactive three-step homepage walkthrough. The app download card uses a genuine transparent-background cutout of the supplied Soni ambassador portrait instead of the cash-pickup-location phone mockup, so no rectangular photo background is visible. Do not add CSS drop shadows to phone mockups; trim only transparent outer canvas when needed for consistent presentation. Preserve authentic community and CSR photographs rather than replacing them with product renders.
- The homepage `Ways to receive money` section uses the supplied angled send-money phone attachment in a tightly cropped, enlarged branded product showcase instead of a customer portrait. Keep the phone large and lowered within the panel so `Total to pay` is the final visible app detail and unnecessary content beneath it is cropped away. Keep the device shadow-free and the country-availability disclosure visible above it.
- The homepage `Ways to receive money` list covers every payout method the transfer API returns: Cash pickup, Bank deposit, Wave - Mobile Wallet, Cash Power and Mobile Credit. Name the wallet method `Wave - Mobile Wallet`, not `Mobile wallet`.
- The app download block and the customer reviews are two separate full-width bands, not two columns of one row. The download band is a short grey banner with the copy and both store badges on the left and the ambassador cutout standing on its floor. Below it, `What our customers say` runs full width: a soft-blue rating panel on the left carrying the 5.0, the stars, the review count and the Google link, and a two-by-two grid of quote cards on the right.
- The reviews are verbatim five-star reviews from the Soni Transfer Google Business listing. Never reword, shorten or invent a review; refresh them only by re-reading the listing, and re-check the count and rating at the same time. State the star rating once in the rating panel rather than repeating a star row on every card.
- The app download card uses the official Apple and Google store badge artwork (`public/assets/brand/app-store-badge.svg` and `google-play-badge.svg`, both the white outlined variant) at equal height. Do not redraw the badges from icon glyphs or restyle their colour, wording or proportions.
- Keep the hero calculator visually plain at its perimeter: no orange top rule and no connector line or animated dots between the hero copy and calculator.
- Use `Send support securely to anyone who counts on you.` in the family story panel and `Review the rate, fee and exact amount they’ll receive before you send.` beneath `Clarity from the start`. The homepage Our Story block has no `Join the family` link.
- Keep the two homepage Our Story paragraphs free of em dashes; use ordinary sentence punctuation for their narrative pauses.
- Retain the main website's legal and compliance documents, regulatory disclosures, and partner disclosures as accessible Option 2 routes linked from the footer. Legal content changes require compliance review before production publication.

## Languages

- The website ships in English, French and Spanish. English is served at the root; French and Spanish sit behind a `/fr/` and `/es/` path prefix so each language is a separate indexable URL. Page slugs are translated too (`/fr/communaute`, `/es/contacto`); CSR story slugs and legal slugs are not, because a story slug names a real event and the legal documents are English.
- All copy lives in `src/i18n/{en,fr,es}.js`. `en.js` is the source catalogue; the other two mirror its shape exactly. Never put user-visible text back into a component. `npm run test:i18n` fails on a missing key, an empty string, a changed array length, a lost `{method}` placeholder, or a long string that is still identical to English.
- There is no automatic redirect by browser language. The URL is the single source of truth for locale, and the header switcher is three real links so the translations stay crawlable. Adding a redirect would trap crawlers on one variant, which is what Google advises against.
- The seven legal documents, the footer's regulatory disclosures and the legal link labels stay in English in every language, and non-English legal pages carry a notice saying the English version governs. Translating FCA and HMRC wording requires compliance review first. `legalContent.ts` is structured so certified translations can be added later without touching components.
- `FCA` and `Small Payment Institution` are not translated: they name a UK regulator and a UK regulatory category.
- Google reviews are quoted verbatim in English in every language, under a translated line saying they appear as written on Google. Their dates are stored as `{ value, unit }` in `src/reviews.js` and rendered with `Intl.RelativeTimeFormat`.
- Country names come from the API in English and are localised through `Intl.DisplayNames` using the `CountryISO` in the same payload, falling back to the API's name. Payout methods are translated through the `payoutMethods` lookup keyed on the API's lowercased name, falling back to the API's own wording so a newly added method still appears.
- Store badge artwork stays English in every language: Google publishes no white-variant Play badge in Spanish, and localising one badge but not the other looks worse than localising neither. The alt and aria text are translated.
- `npm run build` writes `dist/client/index.html`, `dist/client/fr/index.html` and `dist/client/es/index.html`, each with its own `lang`, title, description, canonical and reciprocal `hreflang` set. The worker serves the matching shell for a deep link, so `/fr/communaute` gets the French `<head>`. Set `SITE_ORIGIN` when building for a domain other than `https://sonitransfer.com`.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
