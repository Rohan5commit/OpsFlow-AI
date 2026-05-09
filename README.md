# OpsFlow AI

OpsFlow AI is an internal operations request-routing and approval tool built for Internal Tools Hacks.

## Features
- Employee submission form
- AI-assisted request classification + urgency + missing info detection
- Deterministic routing to correct approver/team
- Approver queue + request detail trail
- Metrics dashboard with ROI estimates
- Seeded demo workflows: software access, purchase approval, travel request

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy to Vercel
```bash
npm i -g vercel
vercel login
vercel --prod
```

Set env vars:
- `NEXT_PUBLIC_BASE_URL`
- `NVIDIA_NIM_API_KEY`
