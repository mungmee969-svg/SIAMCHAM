# SIAMCHAM — seven-day MVP delivery plan
Start: 2026-10-25 (Asia/Bangkok). Target review: 2026-11-01. This is a target, not a guarantee of unattended delivery.

## Fixed business scope
Managed cross-border Thai product catalogue. Thai suppliers retain stock, refrigeration and fulfillment. Buyers browse multiple suppliers' sample products and submit a single RFQ; SIAMCHAM staff confirm availability, shipping and destination import requirements, then issue a manual quotation. No automatic checkout, escrow, or logistics guarantees. Retail and wholesale buyers are both supported.

## Roles
- Buyer: account, catalogue, favorites, multi-product RFQ, status/history.
- Supplier: application, own product CRUD, images/video metadata, compliance documents, supply confirmation, cannot edit platform GP.
- Admin: supplier approval, product approval, per-product negotiated GP, quotation draft/approval, notes and audit trail.

## Day-by-day checkpoints
- Day 1 (Oct 25): architecture, data model, acceptance tests, work branch, verify current static demo; preserve original approved logo.
- Day 2 (Oct 26): mobile navigation, six-language translation coverage including Arabic RTL, product discovery and clear demonstration labels.
- Day 3 (Oct 27): Supabase schema/auth/RLS or equivalent audited backend; users, organizations, supplier approval; migrations must be reviewed before execution.
- Day 4 (Oct 28): supplier product CRUD, image/video metadata & upload controls, document status, product-level GP admin-only with audit history.
- Day 5 (Oct 29): buyer RFQ cart, quantity/unit and destination, multi-supplier split, server-side validation and RFQ persistence, buyer history.
- Day 6 (Oct 30): admin quotation workflow, item-level GP snapshots, pricing and shipping lines, approval/versioning and buyer display.
- Day 7 (Oct 31–Nov 1): end-to-end QA, accessibility, security/RLS, six-language smoke tests, demo walkthrough, release decision.

## Definition of done
- All core flows work with authenticated test users; no fake completion/success for demo-only actions.
- Customer GP hidden server-side (not merely hidden in UI); only admin can change per-product GP. Historical approved quotes retain GP snapshot.
- Buyer can request multiple products from multiple suppliers; fresh/frozen are clearly flagged and never silently combined into an unvalidated shipping quote.
- Media stored as separate original assets with type/size validation, image thumbnails, alt text, and placeholder for unavailable video; no cropped mockup images used as product photos.
- Thai, English, Chinese, Japanese, Malay, Arabic navigation and forms work; Arabic RTL layout checked.
- Authorization, audit, validation and error states covered; no secrets in repository.
- Manual QA notes with pass/fail evidence; do not deploy or merge unless explicitly approved.

## Out of scope for this 7-day MVP
Real payments, licensed escrow, FX settlement, automated export clearance, automated cold-chain bookings, complex AI recommendations, native mobile apps, full live supplier onboarding.

## Risk / blockers
Backend environment credentials/configuration, payment/legal model, real supplier media and export documents, testing on browsers and country-specific import rules. Treat absence as NO-GO rather than inventing production readiness.

## Repo process
Implement on feature branches and submit pull requests for review. Keep main intact; never commit secrets. Existing draft PR #1 contains frontend improvements and is not yet merged.
