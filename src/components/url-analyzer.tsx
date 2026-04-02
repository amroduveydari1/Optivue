"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { isValidUrl } from "@/lib/url";

export function UrlAnalyzer() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Analysis failed");
      }

      const result = await response.json();

      // Store result in sessionStorage for the results page
      sessionStorage.setItem("optivue-result", JSON.stringify(result));
      router.push("/results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-3">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Enter a website URL..."
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError("");
          }}
          disabled={isLoading}
          className="h-14 rounded-2xl border-border/50 bg-card pl-5 pr-[120px] text-[15px] shadow-xs placeholder:text-muted-foreground/40 focus-visible:border-border focus-visible:ring-2 focus-visible:ring-foreground/5 transition-shadow"
        />
        <div className="absolute right-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="h-10 rounded-xl px-5 text-[13px] font-medium shadow-none"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Analyze
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>
      </div>
      {error && (
        <p className="text-[13px] text-red-500/90 pl-1">{error}</p>
      )}
      {isLoading && (
        <div className="flex items-center gap-2 pl-1">
          <div className="h-1 w-1 animate-pulse rounded-full bg-muted-foreground/40" />
          <p className="text-[12px] text-muted-foreground/60">
            Running full Lighthouse audit. This may take 15–30 seconds.
          </p>
        </div>
      )}
    </form>
  );
}
