"use client";

import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
}

function getScoreColor(score: number): string {
  if (score >= 90) return "text-emerald-600";
  if (score >= 50) return "text-amber-500";
  return "text-red-500";
}

function getStrokeColor(score: number): string {
  if (score >= 90) return "stroke-emerald-500";
  if (score >= 50) return "stroke-amber-400";
  return "stroke-red-400";
}

function getTrackColor(score: number): string {
  if (score >= 90) return "stroke-emerald-500/10";
  if (score >= 50) return "stroke-amber-400/10";
  return "stroke-red-400/10";
}

const sizeConfig = {
  sm: { dimension: 72, strokeWidth: 3, fontSize: "text-lg", labelSize: "text-[10px]" },
  md: { dimension: 100, strokeWidth: 3.5, fontSize: "text-[28px]", labelSize: "text-[10px]" },
  lg: { dimension: 140, strokeWidth: 4, fontSize: "text-4xl", labelSize: "text-xs" },
};

export function ScoreRing({ score, label, size = "md" }: ScoreRingProps) {
  const config = sizeConfig[size];
  const radius = (config.dimension - config.strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: config.dimension, height: config.dimension }}>
        <svg
          className="-rotate-90"
          width={config.dimension}
          height={config.dimension}
        >
          <circle
            cx={config.dimension / 2}
            cy={config.dimension / 2}
            r={radius}
            fill="none"
            strokeWidth={config.strokeWidth}
            className={getTrackColor(score)}
          />
          <circle
            cx={config.dimension / 2}
            cy={config.dimension / 2}
            r={radius}
            fill="none"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn("transition-all duration-1000 ease-out", getStrokeColor(score))}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-medium tracking-[-0.02em]", config.fontSize, getScoreColor(score))}>
            {score}
          </span>
        </div>
      </div>
      <span className={cn("font-medium text-muted-foreground/60 uppercase tracking-[0.08em]", config.labelSize)}>
        {label}
      </span>
    </div>
  );
}
