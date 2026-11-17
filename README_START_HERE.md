# OneLedger 1.0 — Next.js + FastAPI migration starter

**Phase 1: running UI and genuine page navigation.** This is a separate web app, not an upgrade to `main.py`.

## What works now

- Enterprise-style dashboard, navy navigation sidebar, separate pages, breadcrumb and responsive layout.
- **Trial Balance account amounts are links to `/general-ledger/{account}`**, with reporting context in the URL.
- **General Ledger batch numbers are links to `/batches/{batch_id}`**, with a back link to the account.
- The Journal Entries page uses an AG Grid Community worksheet with 25 rows and exactly: Subsidiary ID, Account, Description, Debit, Credit, Notes, Date.
- Account descriptions from the **small demo catalog** populate when the account changes.
- Save Draft validates the demo sheet and stores a local-browser copy so you can refresh without losing edits.
- Minimal FastAPI server exposes a health check and status only.

## What does NOT work yet (deliberately)

- **No Supabase connection; no real login or permission enforcement; no real journal posting; no financial reports from actual records.**
- Screens show DEMO DATA badges; local draft is not submitted to Supabase, not shared, and not audited.
- Don't deploy this scaffold publicly as a finance system or use it with real credentials/data.
- The admin, subsidiary and ERP mapping pages are routed design shells, not live modules.
- Example batch IDs are entirely illustrative; they are not your real stored batches.

## Installation on Mac / VS Code

1. Keep your existing Streamlit project as-is. Create a **new folder** named `oneledger-next` and unzip this package into it. Do not overwrite your existing `main.py` or `.streamlit`.
2. Open the folder in VS Code. In terminal 1:

```bash
cd frontend
npm install
npm run dev
```

3. Visit **http://localhost:3000**. Test: Trial Balance → Cash balance → Batch #1042 → Back.
4. In terminal 2 (optional API test):

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

5. Visit **http://127.0.0.1:8000/health** to confirm API is running.

## Source control

Make a new `nextjs-migration` branch, or use a separate repository; do **not** replace your working Streamlit production branch.

## Migration plan from v0.3.1

1. **Navigation and UI prototype:** this package.
2. **Auth and authorizations:** secure sign-in, server-side roles and subsidiary scope, audit of access; do not trust UI-based role checks. Old Streamlit password hashes need a safe migration plan.
3. **Read-only accounting endpoints:** corporate chart, registry, GL, trial balance, batch detail. Preserve source ERP code, mapped code, batch lineage, permission filtering.
4. **Transactional write endpoints:** validated draft save, mappings, approvals and posting using existing accounting behavior and concurrency-safe database transactions; regression test against the old app.
5. **Deployment and cutover:** staging backend/frontend, environment secrets, smoke tests and database backup; keep old app until parity is confirmed.

## Technology

- Frontend: Next.js App Router, React, TypeScript, AG Grid Community, Lucide icons.
- Backend: FastAPI; currently only health/status endpoints.
- Intended DB: existing Supabase PostgreSQL when access-control and migrations are carefully designed.

No migrations and no data changes are performed by this package.
