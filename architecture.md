# OpsFlow AI Architecture

- **Frontend (Next.js + Tailwind):** landing page, request form, dashboard, queue, request detail.
- **Workflow Engine (`lib/workflow.ts`):** deterministic routing + status model + ROI metrics.
- **AI Assist Layer (`/api/analyze`):** structured request analysis (type, urgency, missing fields, approver recommendation, summary).
- **Storage:** in-memory seeded store (`data/demoData.ts`) for hackathon demo stability.
- **APIs:** `/api/requests`, `/api/analyze`, `/api/metrics`.

## Workflow States
`submitted -> needs_info/in_review -> approved/rejected`

## Seeded Workflows
1. software access
2. purchase approval
3. travel request
