"use client";

import { cn } from "@/lib/utils";
import type { MetricValue } from "@/types";

interface MetricCardProps {
  label: string;
  metric: MetricValue;
  description?: string;
}

function getMetricScoreColor(score: number): string {
  if (score >= 0.9) return "bg-emerald-500";
  if (score >= 0.5) return "bg-amber-400";
  return "bg-red-400";
}

export function MetricCard({ label, metric, description }: MetricCardProps) {
  return (
    <div className="group rounded-2xl border border-border/40 bg-card p-6 transition-all duration-200 hover:border-border/80 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground/50">
            {label}
          </p>
          <p className="text-[22px] font-medium tracking-[-0.02em] text-foreground">
            {metric.displayValue}
          </p>
        </div>
        <div
          className={cn(
            "mt-1.5 h-2 w-2 rounded-full",
            getMetricScoreColor(metric.score)
          )}
        />
      </div>
      {description && (
        <p className="mt-4 text-[11px] leading-[1.6] text-muted-foreground/50">
          {description}
        </p>
      )}
    </div>
  );
}
