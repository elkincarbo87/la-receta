export function parseQuantity(q: string): number | null {
  const trimmed = q.trim().replace(",", ".");
  if (trimmed.includes("/")) {
    const [numStr, denStr] = trimmed.split("/");
    const num = parseFloat(numStr);
    const den = parseFloat(denStr);
    if (!isNaN(num) && !isNaN(den) && den !== 0) return num / den;
  }
  const n = parseFloat(trimmed);
  return isNaN(n) ? null : n;
}

export function formatQuantity(n: number): string {
  if (Number.isInteger(n)) return String(n);
  const rounded = Math.round(n * 100) / 100;
  return String(rounded);
}
