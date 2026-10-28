/** Waktu Indonesia Barat (WIB, UTC+7, tanpa musim panas) → instan UTC. Untuk hitung mundur. */
export function wibInstant(dateIso: string, time = '00:00'): string {
  const [hh, mm] = time.split(':').map(Number);
  const [y, m, d] = dateIso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh, mm) - 7 * 3600e3).toISOString();
}
