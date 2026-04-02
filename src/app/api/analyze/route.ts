import { NextRequest, NextResponse } from "next/server";
import { normalizeUrl } from "@/lib/url";
import { runLighthouse } from "@/lib/lighthouse";

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A valid URL is required" },
        { status: 400 }
      );
    }

    let normalizedUrl: string;
    try {
      normalizedUrl = normalizeUrl(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format. Please enter a valid website URL." },
        { status: 400 }
      );
    }

    const result = await runLighthouse(normalizedUrl);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis failed:", error);
    return NextResponse.json(
      {
        error: "Analysis failed",
        details:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
