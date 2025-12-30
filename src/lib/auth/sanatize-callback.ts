export function sanitizeCallbackUrl(value: string | null, fallback = "/") {
  if (!value) return fallback
  if (!value.startsWith("/")) return fallback
  if (value.startsWith("//")) return fallback
  return value
}
