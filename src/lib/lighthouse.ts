import type { AnalysisResult, AuditIssue, MetricValue } from "@/types";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const execFileAsync = promisify(execFile);

function extractMetric(
  audits: Record<string, Record<string, unknown>>,
  key: string
): MetricValue {
  const audit = audits[key];

  return {
    value: (audit?.numericValue as number) ?? 0,
    displayValue: (audit?.displayValue as string) ?? "N/A",
    score: (audit?.score as number) ?? 0,
  };
}

function extractIssues(
  audits: Record<string, Record<string, unknown>>,
  maxItems: number = 8
): AuditIssue[] {
  return Object.values(audits)
    .filter((a) => {
      return a.score !== null && a.score !== undefined && (a.score as number) < 0.9 && a.title;
    })
    .sort((a, b) => ((a.score as number) ?? 1) - ((b.score as number) ?? 1))
    .slice(0, maxItems)
    .map((a) => ({
      id: a.id as string,
      title: a.title as string,
      description: stripMarkdownLinks(a.description as string),
      score: a.score as number | null,
      displayValue: a.displayValue as string | undefined,
    }));
}

function extractRecommendations(
  audits: Record<string, Record<string, unknown>>,
  maxItems: number = 6
): AuditIssue[] {
  return Object.values(audits)
    .filter((a) => {
      const details = a.details as { type?: string } | undefined;
      return (
        a.score !== null &&
        a.score !== undefined &&
        (a.score as number) < 1 &&
        details?.type === "opportunity"
      );
    })
    .sort((a, b) => ((a.score as number) ?? 1) - ((b.score as number) ?? 1))
    .slice(0, maxItems)
    .map((a) => ({
      id: a.id as string,
      title: a.title as string,
      description: stripMarkdownLinks(a.description as string),
      score: a.score as number | null,
      displayValue: a.displayValue as string | undefined,
    }));
}

function stripMarkdownLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export async function runLighthouse(url: string): Promise<AnalysisResult> {
  const lighthouseCli = path.join(
    process.cwd(),
    "node_modules",
    "lighthouse",
    "cli",
    "index.js"
  );

  const { stdout } = await execFileAsync(
    "node",
    [
      lighthouseCli,
      url,
      "--output=json",
      "--quiet",
      "--chrome-flags=--headless --no-sandbox --disable-gpu",
      "--only-categories=performance,seo,accessibility,best-practices",
    ],
    { maxBuffer: 10 * 1024 * 1024, timeout: 90000 }
  );

  const lhr = JSON.parse(stdout);
  const { categories, audits } = lhr;

  return {
    url: lhr.finalDisplayedUrl || url,
    fetchTime: lhr.fetchTime,
    categories: {
      performance: {
        score: Math.round((categories.performance?.score ?? 0) * 100),
        title: "Performance",
      },
      seo: {
        score: Math.round((categories.seo?.score ?? 0) * 100),
        title: "SEO",
      },
      accessibility: {
        score: Math.round((categories.accessibility?.score ?? 0) * 100),
        title: "Accessibility",
      },
      bestPractices: {
        score: Math.round(
          (categories["best-practices"]?.score ?? 0) * 100
        ),
        title: "Best Practices",
      },
    },
    coreWebVitals: {
      lcp: extractMetric(audits, "largest-contentful-paint"),
      fid: extractMetric(audits, "max-potential-fid"),
      cls: extractMetric(audits, "cumulative-layout-shift"),
      fcp: extractMetric(audits, "first-contentful-paint"),
      si: extractMetric(audits, "speed-index"),
      tbt: extractMetric(audits, "total-blocking-time"),
      tti: extractMetric(audits, "interactive"),
    },
    issues: extractIssues(audits),
    recommendations: extractRecommendations(audits),
  };
}
