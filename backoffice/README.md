# SIAMCHAM Backoffice Foundation

## View
Open `backoffice/index.html` on the feature branch (or `http://localhost:3000/backoffice/` using the local static server).

The role switcher is for **preview only**. It is not authentication or authorization. All sample records and metrics are fictional. All write/payment controls are intentionally disabled.

## Implemented static views
- Admin: overview, RFQs, orders, payments, supplier payouts, products and OTOP, supplier verification, financial reports, settings
- Operations: overview, RFQs, orders, products, suppliers
- Finance: overview, orders, incoming payments, payouts, financial reports
- Supplier: product/OTOP content preview, orders, settlement status
- Buyer: RFQ, order and payment status preview

## Required before any production use
1. Connected database with approved migrations, data model and real tenant ownership
2. Supabase Auth or equivalent, secured server-side role checks and tested RLS
3. Invoice/quotation version snapshots, supplier per-SKU GP terms, order and settlement ledger
4. Real verified bank receipt matching (not receipt image alone), currency/FX and fee reconciliation
5. Two-person payout approval, duplicate-payment prevention, immutable audit logs
6. Corporate contracts, regulatory and tax review for collecting international customer funds and remitting suppliers
7. Real supplier onboarding, document verification and media storage with consent
8. Integration tests, authorization tests, browser/mobile QA and deployment gates

**No real bank API, bank account, funds, SQL migrations, role enforcement, payout, email or production system is connected.**
