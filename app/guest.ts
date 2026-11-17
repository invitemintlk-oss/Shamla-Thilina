// Guest-name helpers shared by /admin (link generator) and /[guest] (personalized invitation).

export const PREFIXES = ["Mr.", "Mrs.", "Miss", "Mr. & Mrs.", "Family", "Dear"] as const;
export type Prefix = (typeof PREFIXES)[number];

const MAX_LEN = 80;

/** Combines prefix + name. "Dear" adds nothing here — the greeting already starts with "Dear". */
export function displayName(prefix: Prefix, name: string) {
  const n = name.trim().replace(/\s+/g, " ");
  if (!n) return "";
  switch (prefix) {
    case "Family":
      return `${n} and Family`;
    case "Dear":
      return n;
    default:
      return `${prefix} ${n}`;
  }
}

/** URL path segment for a display name; every special character (&, /, ?, #, spaces) is percent-encoded. */
export function guestPath(display: string) {
  return encodeURIComponent(display);
}

/** Reads a guest name back from a route segment. Returns null if it is empty or not text. */
export function guestFromSegment(segment: string) {
  let s = segment;
  try {
    s = decodeURIComponent(segment);
  } catch {
    // already decoded, or malformed — use as is
  }
  if (/\.(ico|png|jpe?g|gif|svg|webp|txt|xml|json|js|css|map|mp3)$/i.test(s)) return null; // stray asset requests
  s = s.replace(/[\u0000-\u001f<>]/g, "").trim().replace(/\s+/g, " ").slice(0, MAX_LEN);
  return s || null;
}
