# OpsFlow AI

OpsFlow AI is an internal operations request-routing and approval tool that classifies requests, flags missing information, routes to the right approver, and tracks workflow status with transparent ROI metrics.

## Exact Repo Tree
```text
.
├── app
│   ├── api
│   │   ├── analyze/route.ts
│   │   ├── metrics/route.ts
│   │   └── requests/route.ts
│   ├── approvals/page.tsx
│   ├── dashboard/page.tsx
│   ├── requests/[id]/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── RequestForm.tsx
│   └── StatusBadge.tsx
├── data/demoData.ts
├── lib
│   ├── types.ts
│   └── workflow.ts
├── architecture.md
├── business-impact.md
├── demo-script.md
├── final-submission-checklist.md
├── submission-description.md
├── video-outline.md
├── .env.example
├── package.json
└── README.md
```

## Features
- Employee request submission form with AI analysis preview.
- AI-assisted structured output: `type`, `urgency`, `missingFields`, `routeTeam`, `approver`, `summary`.
- Seeded workflows: software access, purchase approval, travel request.
- Workflow states: submitted, needs info, in review, approved, rejected.
- Approver queue and request detail with comments/history.
- Metrics dashboard with request volume, turnaround, bottleneck, and estimated monthly hours saved.

## Local Setup
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Environment Variables
Copy `.env.example` and provide:
- `NEXT_PUBLIC_BASE_URL`
- `NVIDIA_NIM_API_KEY`

## Vercel Deploy
```bash
npx vercel --prod
```
If CLI dependency resolution fails, use:
```bash
npx vercel@50.14.1 --prod
```


## What to do now (with your NVIDIA key)
1. Put your key in `.env.local` as `NVIDIA_NIM_API_KEY=...`.
2. Run `npm run dev` and submit a request from `/`.
3. Click **Analyze**; response includes `provider: nvidia-nim` when live, or `local-rules` fallback if unavailable.
4. In Vercel, add env vars in Project Settings > Environment Variables, then redeploy.

> Security: never commit real API keys to git; keep keys only in local env or Vercel secrets.
