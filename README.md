# FLOWERUP!

Make your home bloom. An original, mobile-first React + Vite prototype for a joyful flower subscription service in Lucerne, Switzerland.

## Local setup

Requires Node.js 22.12+ (Node 24 recommended) and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

```sh
npm run build
npm run preview
```

The production build is generated in `dist/`, ready for a static host. No environment variables or API keys are required.

## Experience

- Responsive homepage with a multicolour wordmark, original generated bouquet photography and lightweight sustainability notes.
- Seven-step onboarding: style, colours, frequency, bouquet quantity, delivery, summary, confirmation.
- Reusable circular selector: tap, swipe horizontally, use previous/next controls, or use arrow keys while a wheel button is focused.
- Selections persist when moving forward, back, or editing from the summary. Closing the flow or refreshing resets state. Address data stays in page memory; it is never sent to a server or saved in browser storage.
- Required name, street and postcode. Prototype service area: Lucerne city postcodes 6000–6009. This is not production address verification.
- Provisional CHF 24.90 per bouquet per delivery. `4+` estimates four bouquets, with final quantity to be agreed. Delivery fees and commercial terms are not yet set.
- No real orders, payments, accounts, Supabase, Stripe, analytics or backend. Confirmation clearly labels the demo.
- Keyboard controls, visible focus, labelled fields, pressed states, progress and heading focus management, plus reduced-motion support.

## Structure

- `src/main.jsx` and `src/App.jsx`: application entry and screen navigation.
- `src/Home.jsx` and `src/Onboarding.jsx`: homepage and seven-step flow.
- `src/components/`: reusable FlowerupLogo, PetalWheel, BouquetCard, SustainabilityBadge, ProgressIndicator and shared UI components.
- `src/data.js`: choices, palettes and currency formatting.
- `src/styles.css` and `src/redesign.css`: base styling and reference-inspired visual redesign.
- `public/favicon.svg`: original flower mark.

All application code and assets were created for this repository. Bouquet images are generated visual placeholders, not guaranteed delivered products; prompts and provenance are in `public/images/PROVENANCE.md`. No assets or code were copied from another repository. DM Sans, Outfit, Nunito and Patrick Hand load through Google Fonts with system sans-serif fallbacks. React, Vite and Lucide are npm dependencies.

## Manual verification

1. At mobile and desktop sizes, start onboarding and select a style and colour.
2. Use wheel options, previous/next controls and keyboard arrows.
3. Go back and verify choices remain selected.
4. Try an empty delivery form and an out-of-area postcode; verify progression is prevented.
5. Enter a Lucerne address and review the summary. 1/2/3 bouquets cost CHF 24.90/49.80/74.70 per delivery; `4+` estimates from CHF 99.60.
6. Edit from the summary; verify the address remains when returning.
7. Complete the demo and verify “You have been Flowerupped!” and the no-order notice.

Before launch, confirm service area, fulfillment, sourcing standards, delivery fees, subscription terms and handling of 4+ bouquets.

### Languages

English, German (Swiss spelling), Italian, French, Spanish and Portuguese are available from the flower language menu on both the homepage and onboarding header. The homepage opens immediately. Browser preferences choose the initial supported language; English is the fallback. A compact flower-themed header menu lets visitors change languages. Manual choices are saved under `flowerup.language` in localStorage. No delivery details are saved there.

`src/i18n/I18nProvider.jsx` provides `useI18n()` with `t(key, variables)`, `language`, and `changeLanguage(code)`. Add future copy to all six JSON dictionaries in `src/i18n/locales/`; use translation keys in components. Selection values remain language-independent IDs, so switching languages preserves the active step, address fields and bouquet preferences. Delivery validation uses translated error keys rather than browser-language messages.

Run `npm test` to check language detection, dictionary coverage, interpolation and delivery validation. Back returns to the previous onboarding step with choices intact; on Step 1 it returns home. Closing the flow retains the language preference but starts a fresh selection next time.

The confirmation headline always remains “YOU HAVE BEEN FLOWERUPPED!” in English as a brand phrase. The rest of the screen is translated. The optional summary message stays in page memory, survives Back and language changes, and appears on confirmation; it is not sent or saved to localStorage.

## Phase B — Lucerne Founders Launch (frontend preview)

Finish the existing seven-step onboarding and scroll below the Flowerupped celebration to **Want to make it real?** Choose **I’M IN!** to preview the signup, combined welcome/purchase-intent screen and thank-you. **Maybe later** returns home using the existing close behavior.

The signup asks only for first name, email and a four-digit Swiss postcode. First name and postcode are prefilled from the existing configuration; no surname or street address is added to the signup. The chosen bouquet, palette, frequency, quantity and provisional CHF 24.90-per-bouquet total are shown beside the form. Delivery included is a provisional launch offer; no checkout or subscription is created.

All signup values and the stable intent values (`absolutely`, `maybe`, `not_yet`) exist only in React memory. They survive Back and language changes; closing the flow or refreshing clears them, matching Phase A. No signup is sent, no email is sent and no personal data is written to localStorage. The UI explicitly identifies this as a preview.

- `src/founders/FoundersLaunch.jsx`: invitation, founding-bloom badge, signup and remaining launch screens.
- `src/founders/founders.css`: isolated Phase B styling and reduced-motion support.
- `src/founders/state.js`: pure validation and reducer. Named actions update a non-personal `lastEvent` value for future instrumentation; no analytics is connected.
- `tests/founders.test.js`: validation, intent values and Back-state coverage.
- New copy lives under `founders` in all six existing translation dictionaries.

Preview: run `npm install` if needed, then `npm run dev`, and open the local URL printed by Vite. For the production preview run `npm run build` followed by `npm run preview -- --port 4173`.

## One-time bouquet trial

The frequency wheel remains recurring-only. Beneath it, **ONE LITTLE BLOOM** selects a one-time order and immediately opens quantity, then continues through the same quantity, delivery, summary, confirmation and First Bloom flow.

`src/pricing.js` is the shared provisional CHF price configuration: recurring CHF 24.90 or one-time CHF 34.90 per bouquet, delivery included, no quantity discounts. `getOrder` derives `orderType`, `frequency`, `pricePerBouquet`, numeric `bouquetQuantity`, `quantityIsEstimate` and `total` from the current choices. These fields accompany the in-memory onboarding data; changing frequency automatically recalculates them. `4+` remains an estimate for four bouquets, with the final quantity to be agreed. No backend, conversion campaign or extra persistence is introduced.

To test locally:
1. Choose a style and palette. On frequency, select weekly, every two weeks or monthly. Continue to quantity and check CHF 24.90 / 49.80 / 74.70 / 99.60 for 1 / 2 / 3 / 4+.
2. Go Back and choose **ONE LITTLE BLOOM**. No recurring petal should remain selected. Quantity should now show CHF 34.90 / 69.80 / 104.70 / 139.60.
3. Continue with a prototype Lucerne address (6000–6009). Check the one-time summary, confirmation and First Bloom configuration, then submit the local signup form to see the shared purchase-intent question.
4. Back navigation and language switching should preserve selections and prices. Return to frequency and select a recurring petal to restore recurring prices and copy.

`tests/pricing.test.js` covers every frequency and quantity, estimate metadata and switching back to recurring pricing.

Navigation uses `src/journey.js`: recurring has seven numbered screens and one-time has six. Quantity → Back restores the one-time selection state without the frequency wheel; choosing recurring clears frequency and requires a new petal selection. The revisited one-time choice is not an additional numbered step.

The First Bloom purchase-intent question always tests the marketing entry offer (`marketingFromPrice`), regardless of the configured order type. Personal summaries continue to use the configured recurring or one-time price.
