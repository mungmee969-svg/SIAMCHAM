# SIAMCHAM website preview

Static proof-of-concept. Open `index.html` locally or host with GitHub Pages. No backend or actual payments.

- Product and category images are new **scalable SVG illustrations** and remain crisp on retina displays. They are mock visuals, NOT actual supplier product photos. Replace with licensed supplier photography once verified.
- The approved SIAMCHAM brand mark is stored in `assets/siamcham-logo.png`.
- Language selector: Thai, English, Chinese, Japanese, Malay and Arabic (RTL). English may be used as fallback for untranslated secondary strings.
- Demo registration and RFQ do not transmit or persist buyer information.
- GP is not displayed in the buyer UI; production GP agreements and per-product rates require a private backend.

## GitHub Pages
Upload `index.html` and `assets/` preserving paths, then enable Pages from the default branch root.

## October 2026 preview fixes

- Language menu triggers full UI re-render for Thai, English, Chinese, Japanese, Malay, and Arabic. Arabic uses RTL layout.
- Responsive mobile navigation remains accessible on narrower screens.
- Changing language while the product-detail modal is open retains the selected product.
- This is still a static demo: registration and RFQ do not create real accounts or submit orders.

QA to complete before merging: check Safari desktop/mobile, six-language switching, RTL, RFQ, product cards and all local assets. Supplier product photographs and videos are not yet populated.
