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

## Engineering status and limitations

This is an experimental, self-hosted auditing tool—not a hardened public scanning service.

- **Untrusted URLs:** The current URL normalization checks basic formatting but does not establish that a destination is safe to fetch. Before exposing the analysis endpoint publicly, add request-level access controls, strict URL validation, DNS/IP range checks, redirect and DNS-rebinding defenses, and isolation for the Chrome process. **Do not deploy the current endpoint as an unrestricted public service.**
- **Resource usage:** Lighthouse launches headless Chrome and can consume significant CPU and memory. Production operation needs rate limits, concurrency limits, abuse controls, and explicit infrastructure capacity limits.
- **Deployment:** The server needs a compatible Chrome/Chromium runtime. Generic serverless deployments are not necessarily supported.
- **Testing:** No automated test script is currently declared in package.json. Test coverage and safe URL-handling checks are engineering priorities, not completed features.

## Quality checks

Run the available checks before opening a pull request:

```bash
npm ci
npm run lint
npx tsc --noEmit
npm run build
```

A GitHub Actions workflow runs these checks on proposed changes. A passing workflow checks code quality and buildability; it does **not** certify that URL scanning is secure.

## Suggested next engineering milestones

1. Design and test a secure, isolated URL scanning boundary before enabling public use.
2. Add unit tests for normalization, domain handling, and result mapping, plus integration tests around rejected destinations.
3. Add rate limiting and concurrency controls to protect the analysis endpoint.
4. Introduce structured error categories, operational logging without leaking sensitive inputs, and a deployment guide.
5. Publish real screenshots and a short architectural decision record explaining the Lighthouse execution model.

## Author

Built by [Amro Duveydari](https://github.com/amroduveydari1). Portfolio: https://heyamro.com
