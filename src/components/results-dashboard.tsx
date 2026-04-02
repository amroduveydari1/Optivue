"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AnalysisResult } from "@/types";
import { ScoreRing } from "@/components/score-ring";
import { MetricCard } from "@/components/metric-card";
import { IssueList } from "@/components/issue-list";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Clock } from "lucide-react";

const METRIC_DESCRIPTIONS: Record<string, string> = {
  lcp: "Largest Contentful Paint measures loading performance. To provide a good user experience, LCP should occur within 2.5s.",
  fid: "Max Potential First Input Delay measures interactivity. Pages should have a FID of 100ms or less.",
  cls: "Cumulative Layout Shift measures visual stability. Pages should maintain a CLS of 0.1 or less.",
  fcp: "First Contentful Paint marks the time at which the first text or image is painted.",
  si: "Speed Index shows how quickly the contents of a page are visibly populated.",
  tbt: "Total Blocking Time measures the total amount of time between FCP and TTI where the main thread was blocked.",
  tti: "Time to Interactive is the amount of time it takes for the page to become fully interactive.",
};

const METRIC_LABELS: Record<string, string> = {
  lcp: "LCP",
  fid: "FID",
  cls: "CLS",
  fcp: "FCP",
  si: "Speed Index",
  tbt: "TBT",
  tti: "TTI",
};

export function ResultsDashboard() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("optivue-result");
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
      </div>
    );
  }

  const fetchDate = new Date(result.fetchTime);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className="mb-2 -ml-2 text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            New Analysis
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">
            Analysis Results
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              {result.url}
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {fetchDate.toLocaleDateString()} at{" "}
              {fetchDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>

      {/* Score Cards */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Scores
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {Object.entries(result.categories).map(([key, category]) => (
            <div
              key={key}
              className="flex flex-col items-center rounded-2xl border border-border/60 bg-card p-6 transition-colors hover:border-border"
            >
              <ScoreRing score={category.score} label={category.title} />
            </div>
          ))}
        </div>
      </section>

      {/* Core Web Vitals */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Core Web Vitals
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Object.entries(result.coreWebVitals).map(([key, metric]) => (
            <MetricCard
              key={key}
              label={METRIC_LABELS[key] || key.toUpperCase()}
              metric={metric}
              description={METRIC_DESCRIPTIONS[key]}
            />
          ))}
        </div>
      </section>

      {/* Issues & Recommendations */}
      <div className="grid gap-10 lg:grid-cols-2">
        <IssueList
          title="Top Issues"
          items={result.issues}
          variant="issues"
        />
        <IssueList
          title="Recommendations"
          items={result.recommendations}
          variant="recommendations"
        />
      </div>
    </div>
  );
}
