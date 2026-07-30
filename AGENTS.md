# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Current approved direction

- Draft 3 is the selected direction: a Wise-inspired split hero with Soni's deep blue, white, and orange brand palette.
- Always use the supplied Soni Transfer logo asset without regenerating, redrawing, warping, or altering it.
- The calculator is not an estimate. Label the output as `Recipient gets exactly`; the displayed GMD amount is the amount the recipient receives.
- Do not show estimated-arrival information in the calculator.
- Include a `Receive by` selector with Cash pickup, Bank deposit, and Mobile money.
- Show the £1 transfer fee clearly.
- Keep the header logo compact and polished. Avoid a large rectangular white logo block; use a restrained rounded support surface only when the blue background requires it.
- Keep calculators visually lighter than the hero message. Draft 1 should use the most compact calculator treatment.
- Draft 1 must have no whitespace between the navigation band and blue hero. Its hero message and transfer panel should sit side by side on desktop and stack only at responsive breakpoints.
- The client review deployment at `/v2/` must expose all three drafts through the comparison switcher and open Draft 1 by default.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
