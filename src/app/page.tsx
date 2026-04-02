import { UrlAnalyzer } from "@/components/url-analyzer";
import { Activity } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-8">
      <div className="flex flex-col items-center gap-10 text-center -mt-12">
        <div className="flex flex-col items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-card shadow-xs">
            <Activity className="h-6 w-6 text-foreground/70" strokeWidth={1.5} />
          </div>
          <div className="space-y-3">
            <h1 className="text-5xl font-semibold tracking-[-0.035em] sm:text-6xl">
              Optivue
            </h1>
            <p className="max-w-sm text-base text-muted-foreground/80 leading-relaxed tracking-[-0.01em]">
              Analyze any website&#39;s performance, SEO, accessibility,
              and best practices &#8212; with clarity.
            </p>
          </div>
        </div>

        <UrlAnalyzer />

        <div className="mt-2 flex items-center gap-5 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/40">
          <span>Performance</span>
          <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/20" />
          <span>SEO</span>
          <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/20" />
          <span>Accessibility</span>
          <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/20" />
          <span>Best Practices</span>
        </div>
      </div>
    </main>
  );
}
