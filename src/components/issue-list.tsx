"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { AuditIssue } from "@/types";

interface IssueListProps {
  title: string;
  items: AuditIssue[];
  variant?: "issues" | "recommendations";
}

function getIcon(score: number | null, variant: string) {
  const iconClass = "h-3.5 w-3.5 shrink-0 mt-[3px]";
  if (variant === "recommendations") {
    return <Info className={cn(iconClass, "text-foreground/25")} />;
  }
  if (score === null || score >= 0.9) {
    return <CheckCircle2 className={cn(iconClass, "text-emerald-500/60")} />;
  }
  if (score >= 0.5) {
    return <AlertTriangle className={cn(iconClass, "text-amber-400/70")} />;
  }
  return <AlertTriangle className={cn(iconClass, "text-red-400/70")} />;
}

function getScoreBadgeColor(score: number | null): string {
  if (score === null) return "bg-muted/60 text-muted-foreground/60";
  if (score >= 0.9) return "bg-emerald-50 text-emerald-600";
  if (score >= 0.5) return "bg-amber-50 text-amber-600";
  return "bg-red-50 text-red-600";
}

export function IssueList({ title, items, variant = "issues" }: IssueListProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-5">
      <h3 className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground/50">
        {title}
      </h3>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex items-start gap-3 rounded-xl border border-transparent bg-card/50 px-4 py-3.5 transition-all duration-200 hover:border-border/40 hover:bg-card"
          >
            {getIcon(item.score, variant)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[13px] font-medium leading-tight tracking-[-0.01em]">{item.title}</p>
                {item.displayValue && (
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                      getScoreBadgeColor(item.score)
                    )}
                  >
                    {item.displayValue}
                  </span>
                )}
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground/50 leading-[1.5] line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
