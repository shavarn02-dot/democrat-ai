export function publicSiteOrigin(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) return undefined;
    return url;
  } catch {
    return undefined;
  }
}
