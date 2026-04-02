import Link from "next/link";
import { Activity } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/90 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-70">
          <Activity className="h-[18px] w-[18px] text-foreground/80" strokeWidth={1.75} />
          <span className="text-[15px] font-medium tracking-[-0.01em]">Optivue</span>
        </Link>
        <nav className="flex items-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground/70">
            Performance Analysis
          </span>
        </nav>
      </div>
    </header>
  );
}
