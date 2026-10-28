/** Blocs de contenu calculés, partagés par plusieurs pages (tableaux: hors contrôle d'unicité). */
import type { Helpers } from './page-types';
import { liburTahun, nasional, cutiBersama, dayNum, weekday, toIso, type Libur } from './engine/libur';
import { longWeekend, jembatan, hariKerja, optimalkan } from './engine/cuti';
import { dLong, dShort, wdName, namaLibur, jenisLabel, span, BULAN } from './tool-specs';

const T = (h: Helpers, id: string, en: string) => (h.lang === 'id' ? id: en);
/** Tabel lengkap satu tahun: tanggal, hari, keterangan, jenis. */
export function tabelTahun(h: Helpers, y: number, jenis?: Libur['jenis']) {
  const list = liburTahun(y).filter((x) => !jenis || x.jenis === jenis);
  return h.table([T(h, 'Tanggal', 'Date'), T(h, 'Hari', 'Day'), T(h, 'Keterangan', 'Holiday'), T(h, 'Jenis', 'Type')], list.map((x) => [dLong(x.date, h.lang), wdName(x.date, h.lang), namaLibur(x, h.lang), jenisLabel(x.jenis, h.lang)]),
    T(h, `${jenis === 'cuti' ? 'Cuti bersama' : jenis === 'nasional' ? 'Hari libur nasional' : 'Hari libur nasional dan cuti bersama'} ${y} menurut lampiran SKB`, `${jenis === 'cuti' ? 'Collective leave' : jenis === 'nasional' ? 'National holidays' : 'National holidays and collective leave'} ${y} per the decree annex`), ['l', 'l', 'l', 'l']);
}
/** Long weekend tanpa cuti. */
export function tabelLongWeekend(h: Helpers, y: number) {
  const lw = longWeekend(y);
  return h.table([T(h, 'Dari', 'From'), T(h, 'Sampai', 'To'), T(h, 'Hari', 'Days'), T(h, 'Karena', 'Because of')], lw.map((x) => [dShort(x.dari, h.lang), dShort(x.sampai, h.lang), x.hari, [...new Set(x.sebab.map((s) => s.name[h.lang]))].join(', ')]),
    T(h, `Long weekend ${y} tanpa mengambil cuti (5 hari kerja, cuti bersama dihitung libur)`, `Long weekends ${y} without taking leave (five-day week, collective leave counted as days off)`), ['l', 'l', 'r', 'l']);
}
/** Peluang cuti terbaik. */
export function tabelJembatan(h: Helpers, y: number, max = 8) {
  const rows = jembatan(y).slice(0, max).map((b) => [span(b.cutiDari, b.cutiSampai, h.lang), b.cuti, span(b.liburDari, b.liburSampai, h.lang), b.libur]);
  return h.table([T(h, 'Ambil cuti', 'Take leave'), T(h, 'Hari cuti', 'Leave days'), T(h, 'Libur berturut-turut', 'Off in a row'), T(h, 'Hari libur', 'Days off')], rows, T(h, `Peluang cuti terbaik ${y}`, `Best leave opportunities ${y}`), ['l', 'r', 'l', 'r']);
}
/** Hasil perencana untuk beberapa anggaran cuti. */
export function tabelAnggaran(h: Helpers, y: number, budgets = [1, 2, 3, 5, 8, 12]) {
  return h.table([T(h, 'Hari cuti', 'Leave days'), T(h, 'Hari libur', 'Days off'), T(h, 'Hari libur per hari cuti', 'Days off per leave day')], budgets.map((b) => { const p = optimalkan(y, b); return [b, p.libur, h.n(p.libur / Math.max(1, p.cuti), 1)]; }),
    T(h, `Hasil perencana ${y} (5 hari kerja, cuti bersama dihitung libur)`, `Planner results ${y} (five-day week, collective leave counted as days off)`), ['r', 'r', 'r']);
}
/** Hari kerja per bulan untuk tiga pola kerja. */
export function tabelHariKerja(h: Helpers, y: number) {
  const a = hariKerja(y), b = hariKerja(y, { cb: false }), c = hariKerja(y, { sabtu: true });
  return h.table([T(h, 'Bulan', 'Month'), T(h, '5 hari, cuti bersama libur', '5 days, leave off'), T(h, '5 hari, cuti bersama kerja', '5 days, leave worked'), T(h, '6 hari kerja', '6-day week')], BULAN(h.lang).map((m, i) => [m, a[i], b[i], c[i]]),
    T(h, `Hari kerja per bulan ${y}`, `Working days per month, ${y}`), ['l', 'r', 'r', 'r']);
}
/** Kalender satu bulan dalam HTML (Minggu di kiri, seperti kalender cetak Indonesia), tanggal merah ditandai. */
export function kalenderBulan(h: Helpers, ym: string) {
  const [y, m] = ym.split('-').map(Number), ls = new Map(liburTahun(y).map((x) => [x.date, x]));
  const first = dayNum(y, m, 1), last = dayNum(y, m + 1, 1) - 1, lead = weekday(first);
  const cells: Array<number | null> = [...Array(lead).fill(null)]; for (let d = first; d <= last; d++) cells.push(d); while (cells.length % 7) cells.push(null);
  const head = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2027, 1, 7 + i)).toLocaleDateString(h.lang === 'id' ? 'id-ID' : 'en-GB', { weekday: 'short', timeZone: 'UTC' }));
  let rows = ''; for (let i = 0; i < cells.length; i += 7) rows += `<tr>${cells.slice(i, i + 7).map((d, j) => { if (d === null) return '<td></td>'; const iso = toIso(d), x = ls.get(iso); const cls = x ? (x.jenis === 'nasional' ? 'ft' : 'tf'): j === 0 ? 'we' : ''; return `<td class="${cls}"${x ? ` title="${x.name[h.lang]}"` : ''}>${new Date(d * 864e5).getUTCDate()}</td>`; }).join('')}</tr>`;
  return `<div class="not-prose my-6 max-w-sm"><div><table class="kal-month"><caption class="mb-1 text-left text-sm font-semibold text-navy-900">${BULAN(h.lang)[m - 1]} ${y}</caption><thead><tr>${head.map((x) => `<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div><p class="mt-2 text-xs text-navy-700">${T(h, 'Merah: libur nasional · abu-abu: cuti bersama', 'Red: national holiday · grey: collective leave')}</p></div>`;
}
export { nasional, cutiBersama };
