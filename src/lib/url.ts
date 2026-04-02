export function normalizeUrl(input: string): string {
  let url = input.trim();

  if (!url) {
    throw new Error("URL is required");
  }

  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes(".")) {
      throw new Error("Invalid hostname");
    }
    return parsed.toString();
  } catch {
    throw new Error("Invalid URL format");
  }
}

export function isValidUrl(input: string): boolean {
  try {
    normalizeUrl(input);
    return true;
  } catch {
    return false;
  }
}
