# OpsFlow AI

OpsFlow AI is an intelligent internal operations request-routing and approval platform built for Internal Tools Hacks. It uses **NVIDIA NIM (Llama 3.3 70B)** to automatically classify, route, and prioritize internal requests.

## Live Demo
[https://opsflow-ai-hazel.vercel.app](https://opsflow-ai-hazel.vercel.app)

## The Problem
Internal ops teams (IT, Finance, HR) are often overwhelmed by "triage overhead"—manual, repetitive tasks involving request classification and data gathering.

## Our Solution
OpsFlow AI acts as a smart gateway:
- **Intelligent Triage:** Uses NVIDIA NIM to analyze free-text descriptions.
- **Auto-Routing:** Deterministically routes requests to the correct team (e.g., Mia Brooks for IT, Noah Patel for Finance).
- **Data Completeness:** Automatically identifies missing information (like vendor quotes) and dynamically asks the requester for it.
- **ROI Tracking:** Provides a real-time dashboard tracking operational efficiency and hours saved.

## Architecture
- **Frontend:** Next.js 16 (App Router), Tailwind CSS.
- **AI Core:** NVIDIA NIM inference (Llama 3.3 70B Instruct).
- **Workflow:** Dynamic, JSON-based structured data extraction.
- **Deployment:** Vercel.

## Run Locally
1. Clone the repo.
2. `npm install`.
3. Set your `NVIDIA_NIM_API_KEY` in `.env.local`.
4. `npm run dev`.
