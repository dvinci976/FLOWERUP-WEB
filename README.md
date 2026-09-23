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

The production build is generated in `dist/`, ready for a static host. First Bloom capture requires the two browser-safe Supabase variables in `.env.local`; see Phase C below.

## Experience

- Responsive homepage with a multicolour wordmark, original generated bouquet photography and lightweight sustainability notes.
- Seven-step onboarding: style, colours, frequency, bouquet quantity, delivery, summary, confirmation.
- Reusable circular selector: tap, swipe horizontally, use previous/next controls, or use arrow keys while a wheel button is focused.
- Selections persist when moving forward, back, or editing from the summary. Closing the flow or refreshing resets state. Street address and personal bouquet message stay in page memory. First Bloom signup separately saves first name, email, postcode and flower preferences after submission.
- Required name, street and postcode. Prototype service area: Lucerne city postcodes 6000–6009. This is not production address verification.
- Provisional CHF 24.90 per bouquet per delivery. `4+` estimates four bouquets, with final quantity to be agreed. Delivery is included in the provisional offer.
- No real orders, payments or customer accounts. Supabase records First Bloom interest only.
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

## Phase C — real First Bloom data capture

Create `.env.local` using `.env.example` as a template and supply your project's `VITE_SUPABASE_URL` and browser-safe `VITE_SUPABASE_PUBLISHABLE_KEY`. Restart Vite after changes. Never put a secret/service-role key here. `.env.local` is ignored; the example contains placeholders only. Missing configuration gives a development warning and a friendly save error rather than crashing.

- `src/lib/supabase.js`: reusable anonymous client, without persisted auth sessions.
- `src/founders/capture.js`: allowlisted payload, source tracking, RPC/intent writes and synchronous duplicate-click guards.
- `src/founders/state.js`: validation and React state including `signupId`, saving/error states and retained selections.
- `src/founders/FoundersLaunch.jsx`: accessible loading/error/retry feedback in all six languages.
- `tests/capture.test.js`: pricing payloads, exact API calls, duplicate clicks, failures/retries and safe logging.

Signup calls `create_first_bloom_signup({p_signup: ...})` and stores the returned UUID in React state. It never selects from `first_bloom_signups`. Choosing `absolutely`, `maybe` or `not_yet` inserts `{signup_id, purchase_intent}` into `first_bloom_intents` without requesting returned rows. The existing SECURITY INVOKER RPC and RLS remain authoritative; this implementation adds no database permissions or policies. The reviewed SQL is kept for reference in `docs/phase-c-signup-rpc-proposal.sql` and has already been applied by the project owner.

Captured fields: first name, email, postcode, language at submission, style, palette, order type, frequency, numeric bouquet quantity, actual price per bouquet and source. Source is a sanitized, bounded `utm_source` label or `direct`; no full URL is stored. `4+` is stored as the estimate 4. Street address and bouquet message are not sent. No personal data is stored in localStorage; only the chosen language persists there. No automated emails or payments are configured.

Both saves must succeed before their next screen appears. Failures retain inputs and allow retry. An intent retry always reuses the successful signup UUID and never invokes signup. Saved signup fields become read-only on Back; returning forward reuses the saved record. A saved intent cannot be changed through this insert-only flow. Pending actions block duplicate clicks and exit navigation. SDK automatic write retries are disabled.

Duplicate protection lasts for the current in-memory journey. Refresh/close starts a new journey. The current RPC does not support an idempotency token: if the server commits but its response is lost, a manual retry can create another record. Fully eliminating that ambiguity requires a separately approved database/RPC change.

### First real end-to-end test

1. Run `npm run dev` and open the printed URL with `?utm_source=manual_test`.
2. Choose a style, palette and recurring frequency, one bouquet, and a Lucerne delivery address. Check the personal summary shows CHF 24.90.
3. Finish the prototype confirmation, choose **I'M IN!**, enter your first name, email and postcode, then **FLOWER ME UP!**.
4. Wait for **YOU'RE IN!**; select any intent flower and wait for the final thank-you.
5. In your Supabase dashboard, verify the signup's configuration/source and a linked intent with matching `signup_id`. The app itself performs no SELECT.
6. Start a fresh journey, select **One Little Bloom**, and repeat. Its personal summary and saved price must be CHF 34.90; marketing and the intent question still use From CHF 24.90.
7. Change language and use Back before submitting to check retained entries. After saving, Back/forward must reuse the signup, not insert another.

Automated checks: `npm test`. Production check: `npm run build`. Preview: `npm run preview -- --port 4173`.

## One-time bouquet trial

The frequency wheel remains recurring-only. Beneath it, **ONE LITTLE BLOOM** selects a one-time order and immediately opens quantity, then continues through the same quantity, delivery, summary, confirmation and First Bloom flow.

`src/pricing.js` is the shared provisional CHF price configuration: recurring CHF 24.90 or one-time CHF 34.90 per bouquet, delivery included, no quantity discounts. `getOrder` derives `orderType`, `frequency`, `pricePerBouquet`, numeric `bouquetQuantity`, `quantityIsEstimate` and `total` from the current choices. These fields accompany the in-memory onboarding data; changing frequency automatically recalculates them. `4+` remains an estimate for four bouquets, with the final quantity to be agreed. First Bloom signup captures these preferences in Supabase only when submitted.

To test locally:
1. Choose a style and palette. On frequency, select weekly, every two weeks or monthly. Continue to quantity and check CHF 24.90 / 49.80 / 74.70 / 99.60 for 1 / 2 / 3 / 4+.
2. Go Back and choose **ONE LITTLE BLOOM**. No recurring petal should remain selected. Quantity should now show CHF 34.90 / 69.80 / 104.70 / 139.60.
3. Continue with a prototype Lucerne address (6000–6009). Check the one-time summary, confirmation and First Bloom configuration, then submit the local signup form to see the shared purchase-intent question.
4. Back navigation and language switching should preserve selections and prices. Return to frequency and select a recurring petal to restore recurring prices and copy.

`tests/pricing.test.js` covers every frequency and quantity, estimate metadata and switching back to recurring pricing.

Navigation uses `src/journey.js`: recurring has seven numbered screens and one-time has six. Quantity → Back restores the one-time selection state without the frequency wheel; choosing recurring clears frequency and requires a new petal selection. The revisited one-time choice is not an additional numbered step.

The First Bloom purchase-intent question always tests the marketing entry offer (`marketingFromPrice`), regardless of the configured order type. Personal summaries continue to use the configured recurring or one-time price.
