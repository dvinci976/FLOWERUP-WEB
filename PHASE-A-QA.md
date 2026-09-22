# Phase A — visual consistency QA

Reviewed the existing homepage, compact flower language menu, Style, Colours, Frequency, Number of bouquets, Delivery, Summary and Confirmation. The previously rejected full-screen language welcome remains removed.

## Corrections

- Unified onboarding backgrounds with the confirmation's warm cream canvas; retained colour in flowers, photography, selection states and smaller surfaces.
- Standardized active onboarding CTAs to accessible pink/white, matching the existing outlined, offset button treatment. Back remains directly beside Continue. Disabled buttons stay visibly distinct.
- Kept progress consistently pink across all seven steps.
- Moved cropped onboarding flowers to the viewport edge, away from headings.
- Increased small supporting copy on mobile (palette descriptions, seasonal note, sustainability captions, wheel hints and form privacy text).
- Fixed homepage horizontal overflow at 320px and 768px by sizing rotated bouquet art within the layout. Removed an invisible decorative flower that expanded the desktop page width.
- Corrected logo navigation to use instant scrolling when reduced motion is requested.

## Verification

- All six languages checked on the homepage and every onboarding step at 390px. Progress and selections persisted through language switches; images loaded and headings/actions had no detected text clipping.
- Homepage checked in all six languages at 320px, 768px and 1280px after overflow corrections: page width matched viewport width.
- All seven onboarding steps checked at 320px (German), 768px and 1280px: no horizontal overflow or detected heading/action clipping.
- Back traversed confirmation through Style, preserving bouquet style, palette, monthly frequency, quantity 3 and entered delivery fields. The summary retained CHF 74.70.
- Style and Colours require a selection before Continue activates. Delivery validation remains functional.
- Language menu keyboard navigation and manual language persistence across reload verified.
- Reduced-motion guards inspected in the loaded browser styles: animations/transitions are disabled, including pseudo-elements; poster and wheel guards are present. Explicit smooth logo scrolling now respects the preference too. The host OS preference was not changed; its active setting during visual tests was no preference.
- `npm test`: four passing tests covering language detection, dictionary completeness, interpolation and delivery validation.
- Production build and whitespace validation passed.

## Final refinements after the QA pass

At the user's request, soft coloured backgrounds were restored on steps 1–6; confirmation retains the cream poster canvas. The overflow, readability, button, progress and reduced-motion fixes remain.

An optional summary message was subsequently added, retained through Back and language switching and displayed on confirmation. The headline is now the fixed English brand phrase “YOU HAVE BEEN FLOWERUPPED!” in every locale; supporting copy remains translated. These final changes passed the translation tests and production build.

No integrations, authentication or payments were added.
