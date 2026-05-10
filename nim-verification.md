# NVIDIA NIM Verification Checklist

## 1) Local `.env.local`
Create `.env.local` (not committed):

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NVIDIA_NIM_API_KEY=<YOUR_REAL_KEY>
```

## 2) Start app
```bash
npm install
npm run dev
```

## 3) Verify API behavior
Call analyze endpoint:
```bash
curl -s -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"employeeName":"Ava","title":"Urgent travel to NYC","description":"Need flight today for client onsite"}'
```
Expected:
- includes routing fields (`type`, `urgency`, `routeTeam`, `approver`)
- includes `provider: "nvidia-nim"` when key and network are valid
- falls back to `provider: "local-rules"` if NIM unavailable

## 4) Vercel env setup
Set `NVIDIA_NIM_API_KEY` and `NEXT_PUBLIC_BASE_URL` in Vercel project env vars, redeploy, then re-run `/api/analyze` check on production URL.
