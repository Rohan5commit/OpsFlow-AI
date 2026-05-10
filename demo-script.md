# Demo Script (2-3 min)

## 0:00-0:20 — Problem
"Internal requests are slow because triage and routing are manual. OpsFlow AI cuts this by auto-classifying requests, flagging missing info, and routing to the right approver immediately."

## 0:20-1:05 — Employee flow
1. Open `/` and submit three request examples:
   - software access: "Datadog editor access"
   - purchase approval: "Buy webinar add-on"
   - travel request: "Urgent travel to NYC"
2. Click **Analyze** before submit to show AI output (type, urgency, missing fields, route team, approver).
3. Submit and show generated request ID + status.

## 1:05-1:40 — Approver + Ops flow
1. Open `/approvals` and show queue visibility.
2. Open one request detail page to show summary, missing info, history/comments.
3. Open `/dashboard` and walk through:
   - total requests
   - average turnaround
   - handoffs reduced
   - monthly hours saved
   - current bottleneck insight

## 1:40-2:10 — Business impact
"For 400 requests/month, cutting triage from 12 to 4 minutes saves ~53 hours/month and reduces manual handoffs by ~42%."

## 2:10-2:40 — Technical credibility
- Next.js + TypeScript + Tailwind
- API routes for analysis/requests/metrics
- deterministic workflow engine with required fields + routing logic
- NVIDIA NIM integration with safe fallback

## 2:40-3:00 — Close
"OpsFlow AI is deployable Monday morning: minimal dependencies, explainable AI outputs, clear approval trail, and immediate ROI."
