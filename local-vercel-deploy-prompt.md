# Prompt for Local AI Agent (with Vercel access)

You are a deployment engineer. Deploy the OpsFlow AI Next.js app from this repository to Vercel production.

## Context
- Repo: OpsFlow-AI
- Framework: Next.js (App Router)
- Required env vars:
  - NEXT_PUBLIC_BASE_URL (set to final Vercel URL, e.g. https://opsflow-ai.vercel.app)
  - NVIDIA_NIM_API_KEY (provided securely by operator)

## Tasks
1. Pull latest default branch from GitHub.
2. Confirm app builds locally:
   - npm install
   - npm run build
3. Create/Link Vercel project with lowercase-safe name: `opsflow-ai`.
4. Add env vars to Vercel project for **Production** and **Preview**:
   - NEXT_PUBLIC_BASE_URL
   - NVIDIA_NIM_API_KEY
5. Run production deploy:
   - vercel --prod --yes
6. After deploy, update `NEXT_PUBLIC_BASE_URL` in Vercel env to exact production URL and redeploy once.
7. Validate these endpoints return 200:
   - /
   - /dashboard
   - /approvals
   - /api/metrics
   - POST /api/analyze with sample JSON body
8. Confirm `/api/analyze` returns `provider: "nvidia-nim"` when key is valid.
9. Output final report:
   - production URL
   - deploy timestamp
   - git commit sha
   - endpoint test results
   - any warnings/errors and resolution

## Acceptance criteria
- Production URL live and accessible.
- App pages load and metrics render.
- NIM route verified (provider=nvidia-nim).
- No secrets committed to git.
