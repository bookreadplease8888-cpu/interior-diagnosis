export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function currency(value: number | null | undefined) {
  if (!value && value !== 0) return "価格未設定";
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(value);
}

export function sanitizeBudget(value: string | number) {
  const raw = typeof value === "number" ? String(value) : value;
  const num = Number(String(raw).replace(/[^\d]/g, ""));
  if (!Number.isFinite(num)) return 30000;
  return Math.min(5_000_000, Math.max(1_000, num));
}

export function buildShareUrl(text: string, url: string) {
  const params = new URLSearchParams({ text, url });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}
