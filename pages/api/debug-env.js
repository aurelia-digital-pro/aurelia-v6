export default function handler(req, res) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  const keyAnalysis = {
    length: key.length,
    starts_with_eyJ: key.startsWith("eyJ"),
    first_12_chars: key.substring(0, 12),
    last_6_chars: key.substring(key.length - 6),
    has_newline: key.includes("\n"),
    has_carriage_return: key.includes("\r"),
    has_space_at_start: key.startsWith(" "),
    has_space_at_end: key.endsWith(" "),
    char_code_first: key.charCodeAt(0),
    char_code_last: key.charCodeAt(key.length - 1)
  };

  const urlAnalysis = {
    value: url,
    length: url.length,
    ends_with_slash: url.endsWith("/"),
    has_space: url.includes(" "),
    starts_with_https: url.startsWith("https://")
  };

  return res.status(200).json({
    url: urlAnalysis,
    key: keyAnalysis,
    verdict: !key
      ? "KEY IS EMPTY — not set in Vercel"
      : !key.startsWith("eyJ")
      ? "KEY DOES NOT START WITH eyJ — wrong key or corrupted"
      : key.includes("\n") || key.includes("\r")
      ? "KEY HAS HIDDEN NEWLINE — paste issue from iPhone"
      : key.startsWith(" ") || key.endsWith(" ")
      ? "KEY HAS LEADING/TRAILING SPACE — clean it in Vercel"
      : key.length < 100
      ? "KEY TOO SHORT — probably anon key or truncated"
      : "KEY LOOKS VALID — check if URL matches this key project"
  });
}
