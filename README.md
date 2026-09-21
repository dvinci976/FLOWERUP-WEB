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

- Responsive homepage with original SVG bouquets and sustainability integrated into the product story.
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
- `src/components/`: reusable Bouquet, Flower, Wheel, Button and Logo components.
- `src/data.js`: choices, palettes and currency formatting.
- `src/styles.css`: responsive styling.
- `public/favicon.svg`: original flower mark.

All application code and illustrations were created from scratch for this repository. No assets or code were copied from another repository. DM Sans and Outfit load through Google Fonts with system sans-serif fallbacks. React, Vite and Lucide are npm dependencies.

## Manual verification

1. At mobile and desktop sizes, start onboarding and select a style and colour.
2. Use wheel options, previous/next controls and keyboard arrows.
3. Go back and verify choices remain selected.
4. Try an empty delivery form and an out-of-area postcode; verify progression is prevented.
5. Enter a Lucerne address and review the summary. 1/2/3 bouquets cost CHF 24.90/49.80/74.70 per delivery; `4+` estimates from CHF 99.60.
6. Edit from the summary; verify the address remains when returning.
7. Complete the demo and verify “You have been Flowerupped!” and the no-order notice.

Before launch, confirm service area, fulfillment, sourcing standards, delivery fees, subscription terms and handling of 4+ bouquets.
