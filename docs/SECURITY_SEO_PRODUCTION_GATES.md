# SIAMCHAM Production Security & SEO Gate

Status: **NO-GO for real users, credentials, bank transfers, and supplier payments**. The current UI uses static demo data and a client-side role switcher. Switching roles is NOT authentication, and `noindex` is NOT access control.

## Security requirements before deploying a production backoffice

1. **Separate private admin app**: protect every admin URL on the server/hosting layer; do not serve sensitive data to unauthenticated users. Disable demo role switching in production. Require MFA for Admin and Finance.
2. **Auth and authorization**: verified sessions; deny by default; server-side role and tenant authorization on every read/write. Supabase RLS per table, policy tests for Admin, Finance, Operations, Buyer; Supplier is internal-only unless explicitly approved later.
3. **Payments and ledger**: bank receipts verified independently from official bank statements/API; never trust a screenshot/MT103 alone. Use currency + minor units and explicit FX, fees, source references, immutable audit trail. Keep held/unverified balances out of available-to-pay funds.
4. **Payout controls**: dual approval (maker/checker), beneficiary verification, idempotency key per payout, duplicate detection, daily limits, reconciliation, reversal/refund workflow. Only create payouts server-side after receiving confirmed funds.
5. **Inputs and web security**: validate with strict schemas and maximum lengths at API boundary, encode output to stop XSS, sanitize media URLs, protect against CSRF for cookie-authenticated mutations, parameterized SQL only, rate limit RFQ/login/upload endpoints by user/IP, bot protection where needed.
6. **Upload security**: private upload staging, signed URLs, MIME and file-signature checks, strict image/video sizes, malware scanning, strip risky metadata, no executable content, content moderation and supplier consent.
7. **Infrastructure**: secrets in deployment secret manager only (never GitHub/browser/localStorage), key rotation, separate staging and production, TLS, security headers, narrowed CORS, backups with restore tests, alerts for abnormal logins/payouts. CSP should use nonces or external scripts/styles after removing inline JS; do not claim the current static prototype has strong CSP.
8. **Audit and testing**: audit bank account changes, invoice revisions, GP terms, approvals, payouts and login events; run dependency vulnerability scan, auth bypass/RLS negative tests, XSS tests, payout concurrency tests, monitoring and external penetration test before live banking.
9. **Regulatory review**: Thai legal/tax review of agency collections, payment-service licensing exposure, accounting for client funds, export documentation and AML/KYC responsibilities.

## SEO and long-term site quality

- Product pages need crawlable **unique URLs** (not modal-only JavaScript) with unique title/description and original verified details.
- OTOP region/producer pages must include real province, craft story, consented photos and evidence; do not assert verified status without proof.
- Determine the canonical production host before adding absolute canonical URLs, sitemap.xml or hreflang. Do not guess the domain.
- Support server-rendered/static generated product-category routes where possible, localized URLs and proper hreflang for six languages with Arabic RTL.
- Add Product/Breadcrumb/Organization structured data **only for facts actually present**. No fabricated ratings, prices, stock or certification.
- Optimize mobile Core Web Vitals, images (AVIF/WebP), responsive dimensions, font loading, accessibility and search/filter usability.
- Connect verified Google Search Console + privacy-compliant analytics before marketing funnel charts. Do not infer traffic or RFQ conversion from demo data.
- Track organic clicks, indexed pages, engaged buyers, repeat buyers, RFQ conversion, real OTOP product completeness and uptime. Distinguish GA/SEO measurements from finance metrics.

## Current commits: protection scope
- `vercel.json` provides baseline response headers **only if deployed on Vercel**. Hosting elsewhere requires equivalent config.
- Backoffice has `noindex` and visible demo warning. Neither secures the path.
- Current public website contains inline scripts/handlers; strict CSP is **not** enabled yet.
- No migrations, bank calls, live payment, login enforcement, or deployments have been performed.
