/**
 * Kalender Hijriah, pasaran Jawa dan ijtimak (bulan baru).
 *
 * Hijriah : dasar perhitungan adalah kalender Umm al-Qura bawaan peramban (Intl, calendar “islamic-umalqura”).
 * Indonesia tidak memakai Umm al-Qura : awal bulan ditetapkan Menteri Agama setelah sidang isbat (SKB, Diktum KEDUA).
 * Karena itu awal bulan yang tersirat dalam SKB (27 Rajab = Isra Mikraj, 1 Syawal = Idul Fitri, 10 Zulhijah = Idul Adha,
 * 1 Muharam, 12 Rabiulawal = Maulid) menggantikan awal bulan Umm al-Qura ; bulan lain diberi tanda “perhitungan”.
 *
 * Pasaran : siklus lima hari Legi, Pahing, Pon, Wage, Kliwon yang berjalan tanpa putus. Titik acuan : 17 Agustus 1945,
 * hari Proklamasi, jatuh pada Jumat Legi.
 *
 * Ijtimak : rumus bulan baru Jean Meeus, Astronomical Algorithms (2e éd., bab 49), dengan suku periodik utama ;
 * ketelitian beberapa menit, cukup untuk menjelaskan sidang isbat, bukan untuk menggantikannya.
 */
import { dayNum, fromIso, toIso, weekday } from './libur';

export const BULAN_HIJRIAH = ['Muharam', 'Safar', 'Rabiulawal', 'Rabiulakhir', 'Jumadilawal', 'Jumadilakhir', 'Rajab', 'Syakban', 'Ramadan', 'Syawal', 'Zulkaidah', 'Zulhijah'];
export const BULAN_HIJRIAH_EN = ['Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' al-Thani", 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban", 'Ramadan', 'Shawwal', "Dhu al-Qa'dah", 'Dhu al-Hijjah'];

/** Awal bulan yang tersirat dalam SKB : [tahun H, bulan (1–12), tanggal Masehi hari pertama, hari raya acuan]. */
export const ACUAN_SKB: Array<[number, number, string, string]> = [
  [1447, 7, '2025-12-21', 'Isra Mikraj 27 Rajab 1447 H = 2026-01-16'],
  [1447, 10, '2026-03-21', 'Idul Fitri 1 Syawal 1447 H = 2026-03-21'],
  [1447, 12, '2026-05-18', 'Idul Adha 10 Zulhijah 1447 H = 2026-05-27'],
  [1448, 1, '2026-06-16', '1 Muharam 1448 H = 2026-06-16'],
  [1448, 3, '2026-08-14', 'Maulid 12 Rabiulawal 1448 H = 2026-08-25'],
  [1448, 7, '2026-12-10', 'Isra Mikraj 27 Rajab 1448 H = 2027-01-05'],
  [1448, 10, '2027-03-10', 'Idul Fitri 1 Syawal 1448 H = 2027-03-10'],
  [1448, 12, '2027-05-08', 'Idul Adha 10 Zulhijah 1448 H = 2027-05-17'],
  [1449, 1, '2027-06-06', '1 Muharam 1449 H = 2027-06-06'],
  [1449, 3, '2027-08-04', 'Maulid 12 Rabiulawal 1449 H = 2027-08-15'],
  [1449, 7, '2027-11-30', 'Isra Mikraj 27 Rajab 1449 H = 2027-12-26'],
];

let fmt: Intl.DateTimeFormat | null = null;
/** Tanggal Umm al-Qura (Intl) : tahun, bulan 1–12, hari. */
export function umalqura(iso: string): { hy: number; hm: number; hd: number } {
  fmt ??= new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' });
  const p = fmt.formatToParts(new Date(`${iso}T12:00:00Z`));
  const g = (t: string) => parseInt(p.find((x) => x.type === t)?.value ?? '0', 10);
  return { hy: g('year'), hm: g('month'), hd: g('day') };
}

interface Awal { hy: number; hm: number; start: number; resmi: boolean }
let TABEL: Awal[] | null = null;
const A = dayNum(2024, 12, 1), Z = dayNum(2029, 1, 31);
/** Awal setiap bulan Hijriah 2025–2028 : Umm al-Qura, lalu diganti acuan SKB bila ada. */
function tabel(): Awal[] {
  if (TABEL) return TABEL;
  const out: Awal[] = [];
  for (let d = A; d <= Z; d++) { const u = umalqura(toIso(d)); if (u.hd === 1) out.push({ hy: u.hy, hm: u.hm, start: d, resmi: false }); }
  for (const [hy, hm, iso] of ACUAN_SKB) { const x = out.find((m) => m.hy === hy && m.hm === hm); if (x) { x.start = fromIso(iso); x.resmi = true; } }
  return (TABEL = out.sort((a, b) => a.start - b.start));
}
export interface TglHijriah { hy: number; hm: number; hd: number; /** Awal bulan ini ditetapkan lewat tanggal SKB. */ resmi: boolean; /** Di luar tabel 2025–2028 : Umm al-Qura murni. */ murni: boolean }
/** Tanggal Hijriah versi Indonesia (awal bulan SKB bila diketahui). */
export function hijriah(iso: string): TglHijriah {
  const d = fromIso(iso), t = tabel();
  if (d < t[0].start || d > Z) { const u = umalqura(iso); return { ...u, resmi: false, murni: true }; }
  let m = t[0]; for (const x of t) { if (x.start <= d) m = x; else break; }
  return { hy: m.hy, hm: m.hm, hd: d - m.start + 1, resmi: m.resmi, murni: false };
}
/** Hari pertama bulan Hijriah (versi Indonesia bila ada di tabel). */
export function awalBulan(hy: number, hm: number): { date: string; resmi: boolean } | null {
  const x = tabel().find((m) => m.hy === hy && m.hm === hm);
  return x ? { date: toIso(x.start), resmi: x.resmi } : null;
}
/** Panjang bulan Hijriah (29 atau 30) menurut tabel. */
export function panjangBulan(hy: number, hm: number): number | null {
  const t = tabel(), i = t.findIndex((m) => m.hy === hy && m.hm === hm);
  return i >= 0 && i + 1 < t.length ? t[i + 1].start - t[i].start : null;
}

/* ------------------------------------------------------------------ Pasaran Jawa */
export const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'] as const;
export const HARI_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
/** Neptu menurut tradisi primbon : hari (Minggu … Sabtu) dan pasaran. */
export const NEPTU_HARI = [5, 4, 3, 7, 8, 6, 9];
export const NEPTU_PASARAN = [5, 9, 7, 4, 8];
const ACUAN_JAWA = dayNum(1945, 8, 17); // Jumat Legi
export const pasaranIdx = (iso: string) => (((fromIso(iso) - ACUAN_JAWA) % 5) + 5) % 5;
export function weton(iso: string) {
  const w = weekday(fromIso(iso)), p = pasaranIdx(iso);
  return { hari: HARI_ID[w], pasaran: PASARAN[p], neptu: NEPTU_HARI[w] + NEPTU_PASARAN[p], neptuHari: NEPTU_HARI[w], neptuPasaran: NEPTU_PASARAN[p] };
}
/** Weton yang sama berulang setiap 35 hari (7 × 5). */
export const wetonBerikut = (iso: string, dari: string) => { const d = fromIso(dari), x = fromIso(iso); const k = Math.ceil((d - x) / 35); return toIso(x + Math.max(0, k) * 35); };

/* ------------------------------------------------------------------ Ijtimak (Meeus bab 49) */
const rad = (x: number) => (x * Math.PI) / 180;
/** Saat ijtimak (bulan baru) ke-k sejak 6 Januari 2000, dalam milidetik UTC. */
export function ijtimakK(k: number): number {
  const T = k / 1236.85;
  let jde = 2451550.09766 + 29.530588861 * k + 0.00015437 * T * T - 0.00000015 * T ** 3 + 0.00000000073 * T ** 4;
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  const M = rad(2.5534 + 29.1053567 * k - 0.0000014 * T * T);
  const Mp = rad(201.5643 + 385.81693528 * k + 0.0107582 * T * T);
  const F = rad(160.7108 + 390.67050284 * k - 0.0016118 * T * T);
  const Om = rad(124.7746 - 1.56375588 * k + 0.0020672 * T * T);
  jde += -0.4072 * Math.sin(Mp) + 0.17241 * E * Math.sin(M) + 0.01608 * Math.sin(2 * Mp) + 0.01039 * Math.sin(2 * F)
    + 0.00739 * E * Math.sin(Mp - M) - 0.00514 * E * Math.sin(Mp + M) + 0.00208 * E * E * Math.sin(2 * M)
    - 0.00111 * Math.sin(Mp - 2 * F) - 0.00057 * Math.sin(Mp + 2 * F) + 0.00056 * E * Math.sin(2 * Mp + M)
    - 0.00042 * Math.sin(3 * Mp) + 0.00042 * E * Math.sin(M + 2 * F) + 0.00038 * E * Math.sin(M - 2 * F)
    - 0.00024 * E * Math.sin(2 * Mp - M) - 0.00017 * Math.sin(Om) - 0.00007 * Math.sin(Mp + 2 * M)
    + 0.00004 * Math.sin(2 * Mp - 2 * F) + 0.00004 * Math.sin(3 * M) + 0.00003 * Math.sin(Mp + M - 2 * F)
    + 0.00003 * Math.sin(2 * Mp + 2 * F) - 0.00003 * Math.sin(Mp + M + 2 * F) + 0.00003 * Math.sin(Mp - M + 2 * F)
    - 0.00002 * Math.sin(Mp - M - 2 * F) - 0.00002 * Math.sin(3 * Mp + M) + 0.00002 * Math.sin(4 * Mp);
  // TD → UT : ΔT ≈ 69 s pour 2020-2030 (IERS, ordre de grandeur), négligeable devant la précision visée.
  return (jde - 2440587.5) * 864e5 - 69e3;
}
/** Ijtimak pertama setelah (atau pada) instan t (ms UTC). */
export function ijtimakSetelah(t: number): number {
  let k = Math.floor((t / 864e5 + 2440587.5 - 2451550.09766) / 29.530588861) - 1;
  while (ijtimakK(k) < t) k++;
  return ijtimakK(k);
}
/** Instan → “2027-02-06 22.56 WIB” (UTC+7). */
export const wib = (ms: number) => { const d = new Date(ms + 7 * 3600e3); return { date: d.toISOString().slice(0, 10), jam: d.toISOString().slice(11, 16).replace(':', '.') }; };
