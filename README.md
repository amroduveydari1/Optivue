# Optivue

A website audit tool. Paste a URL and get a clear report on its **performance, SEO, accessibility and best practices**, powered by Google Lighthouse.

Built with Next.js, React and TypeScript.

## What it does

- Takes a URL, normalizes it, and runs a headless Lighthouse audit against it.
- Scores four categories from 0 to 100: Performance, SEO, Accessibility and Best Practices.
- Reports Core Web Vitals and related timings: LCP, CLS, FCP, Speed Index, Total Blocking Time, Time to Interactive and Max Potential FID.
- Surfaces the lowest-scoring audits (anything under 0.9, worst first, top 8) as an issue list.
- Lists the highest-impact opportunities (Lighthouse "opportunity" audits, worst first, top 6) as recommendations.
- Shows everything in a results dashboard with score rings, metric cards and issue lists.

## How it works

`URL input -> POST /api/analyze -> runLighthouse(url) -> AnalysisResult -> /results dashboard`

- `src/app/api/analyze/route.ts` is the API route that receives the URL.
- `src/lib/lighthouse.ts` runs the Lighthouse CLI as a child process (headless Chrome, 90 second timeout), parses the JSON report and maps it into a typed `AnalysisResult`.
- `src/lib/url.ts` handles URL normalization.
- `src/types/` holds the shared TypeScript types for results, metrics and issues.
- `src/components/` contains the UI: URL form, score rings, metric cards, issue list and the results dashboard.

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4, shadcn/ui components, lucide-react icons
- Lighthouse 13 and chrome-launcher

## Getting started

Requirements: Node.js 20 or newer and a local Chrome or Chromium install (Lighthouse needs it).

```bash
git clone https://github.com/amroduveydari1/Optivue.git
cd Optivue
npm install
npm run dev
```

Open http://localhost:3000, enter a URL and run the audit.

## Notes

Audits run on the machine that hosts the app, so Chrome must be available there. Serverless platforms that cannot run headless Chrome would need changes.

## Author

Built by [Amro Duveydari](https://github.com/amroduveydari1). Portfolio: https://heyamro.com
