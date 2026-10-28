/**
 * Hari libur nasional dan cuti bersama Indonesia.
 *
 * Sumber satu-satunya untuk tanggal resmi: lampiran Keputusan Bersama (SKB) Menteri Agama, Menteri Ketenagakerjaan
 * dan Menteri PANRB untuk tiap tahun (params-2026.json > sources: skb-2026, skb-2027). Tanggal di bawah disalin dari
 * lampiran itu; tes (tests/engine.test.ts) memeriksa bahwa nama hari tiap tanggal sama dengan kolom “HARI” di SKB,
 * dan bahwa Wafat Yesus Kristus, Paskah dan Kenaikan sama dengan Paskah yang dihitung (algoritme Gauss dan Meeus).
 *
 * Tahun yang SKB-nya belum terbit tidak punya daftar resmi : `liburTahun` mengembalikan daftar kosong dan halaman
 * menulis “belum terbit”. Untuk perhitungan yang melintasi tahun (blok libur akhir Desember – awal Januari),
 * `liburTetap` memberi hanya tanggal yang tetap menurut Keppres 8/2024 (1 Januari, 1 Mei, 1 Juni, 17 Agustus, 25 Desember).
 */

/* ------------------------------------------------------------------ Hari sebagai bilangan bulat (UTC) */
const MS = 86400000;
export const dayNum = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d) / MS;
export const fromIso = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return dayNum(y, m, d); };
export const toIso = (n: number) => new Date(n * MS).toISOString().slice(0, 10);
/** 0 = Minggu … 6 = Sabtu */
export const weekday = (n: number) => new Date(n * MS).getUTCDay();
export const addDays = (iso: string, d: number) => toIso(fromIso(iso) + d);
export const diffDays = (a: string, b: string) => fromIso(b) - fromIso(a);

/** Minggu Paskah menurut rumus Gauss (versi PTB, Lichtenberg 1997). */
export function paskah(x: number): string {
  const K = Math.floor(x / 100);
  const M = 15 + Math.floor((3 * K + 3) / 4) - Math.floor((8 * K + 13) / 25);
  const S = 2 - Math.floor((3 * K + 3) / 4);
  const A = x % 19;
  const D = (19 * A + M) % 30;
  const R = Math.floor((D + Math.floor(A / 11)) / 29);
  const OG = 21 + D - R;
  const SZ = 7 - ((x + Math.floor(x / 4) + S) % 7);
  const OE = 7 - (((OG - SZ) % 7) + 7) % 7;
  return toIso(dayNum(x, 3, 1) + OG + OE - 1);
}
/** Hitungan kedua yang independen (Meeus/Jones/Butcher), untuk tes. */
export function paskahMeeus(y: number): string {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return toIso(dayNum(y, month, day));
}

/* ------------------------------------------------------------------ Nama hari libur */
export type HariId = 'tahun-baru' | 'isra-mikraj' | 'imlek' | 'nyepi' | 'idul-fitri' | 'wafat-yesus' | 'paskah' | 'hari-buruh' | 'kenaikan'
  | 'idul-adha' | 'waisak' | 'pancasila' | 'muharam' | 'kemerdekaan' | 'maulid' | 'natal';
export const NAMA: Record<HariId, { id: string; en: string }> = {
  'tahun-baru': { id: 'Tahun Baru Masehi', en: "New Year's Day" },
  'isra-mikraj': { id: 'Isra Mikraj Nabi Muhammad SAW', en: "Isra and Mi'raj" },
  imlek: { id: 'Tahun Baru Imlek', en: 'Chinese New Year (Imlek)' },
  nyepi: { id: 'Hari Suci Nyepi (Tahun Baru Saka)', en: 'Nyepi, the Balinese Day of Silence' },
  'idul-fitri': { id: 'Idul Fitri', en: 'Eid al-Fitr (Idul Fitri)' },
  'wafat-yesus': { id: 'Wafat Yesus Kristus', en: 'Good Friday' },
  paskah: { id: 'Kebangkitan Yesus Kristus (Paskah)', en: 'Easter Sunday' },
  'hari-buruh': { id: 'Hari Buruh Internasional', en: 'International Labour Day' },
  kenaikan: { id: 'Kenaikan Yesus Kristus', en: 'Ascension Day' },
  'idul-adha': { id: 'Idul Adha', en: 'Eid al-Adha (Idul Adha)' },
  waisak: { id: 'Hari Raya Waisak', en: 'Vesak (Waisak)' },
  pancasila: { id: 'Hari Lahir Pancasila', en: 'Pancasila Day' },
  muharam: { id: '1 Muharam Tahun Baru Islam', en: 'Islamic New Year (1 Muharram)' },
  kemerdekaan: { id: 'Proklamasi Kemerdekaan', en: 'Independence Day' },
  maulid: { id: 'Maulid Nabi Muhammad SAW', en: "Prophet Muhammad's Birthday (Mawlid)" },
  natal: { id: 'Kelahiran Yesus Kristus (Natal)', en: 'Christmas Day' },
};

export type Jenis = 'nasional' | 'cuti';
export interface Libur { date: string; id: HariId; jenis: Jenis; ket: string; name: { id: string; en: string } }

/** Lampiran SKB, tahun demi tahun. [tanggal, hari libur, keterangan tahun (Hijriah, Kongzili, Saka, BE)] */
type Row = [string, HariId, string?];
interface Skb { nomor: string; ditetapkan: string; nasional: Row[]; cuti: Row[] }
export const SKB: Record<number, Skb> = {
  2026: {
    nomor: '1497 Tahun 2025, Nomor 2 Tahun 2025, Nomor 5 Tahun 2025',
    ditetapkan: '2025-09-19',
    nasional: [
      ['2026-01-01', 'tahun-baru', '2026'], ['2026-01-16', 'isra-mikraj', '1447 H'], ['2026-02-17', 'imlek', '2577 Kongzili'],
      ['2026-03-19', 'nyepi', 'Saka 1948'], ['2026-03-21', 'idul-fitri', '1447 H'], ['2026-03-22', 'idul-fitri', '1447 H'],
      ['2026-04-03', 'wafat-yesus'], ['2026-04-05', 'paskah'], ['2026-05-01', 'hari-buruh'], ['2026-05-14', 'kenaikan'],
      ['2026-05-27', 'idul-adha', '1447 H'], ['2026-05-31', 'waisak', '2570 BE'], ['2026-06-01', 'pancasila'],
      ['2026-06-16', 'muharam', '1448 H'], ['2026-08-17', 'kemerdekaan'], ['2026-08-25', 'maulid'], ['2026-12-25', 'natal'],
    ],
    cuti: [
      ['2026-02-16', 'imlek', '2577 Kongzili'], ['2026-03-18', 'nyepi', 'Saka 1948'], ['2026-03-20', 'idul-fitri', '1447 H'],
      ['2026-03-23', 'idul-fitri', '1447 H'], ['2026-03-24', 'idul-fitri', '1447 H'], ['2026-05-15', 'kenaikan'],
      ['2026-05-28', 'idul-adha', '1447 H'], ['2026-12-24', 'natal'],
    ],
  },
  2027: {
    nomor: '1205 Tahun 2026, Nomor 3 Tahun 2026, Nomor 2 Tahun 2026',
    ditetapkan: '2026-09-15',
    nasional: [
      ['2027-01-01', 'tahun-baru', '2027'], ['2027-01-05', 'isra-mikraj', '1448 H'], ['2027-02-06', 'imlek', '2578 Kongzili'],
      ['2027-03-08', 'nyepi', 'Saka 1949'], ['2027-03-10', 'idul-fitri', '1448 H'], ['2027-03-11', 'idul-fitri', '1448 H'],
      ['2027-03-26', 'wafat-yesus'], ['2027-03-28', 'paskah'], ['2027-05-01', 'hari-buruh'], ['2027-05-06', 'kenaikan'],
      ['2027-05-17', 'idul-adha', '1448 H'], ['2027-05-20', 'waisak', '2571 BE'], ['2027-06-01', 'pancasila'],
      ['2027-06-06', 'muharam', '1449 H'], ['2027-08-15', 'maulid'], ['2027-08-17', 'kemerdekaan'], ['2027-12-25', 'natal'],
      ['2027-12-26', 'isra-mikraj', '1449 H'],
    ],
    cuti: [
      ['2027-02-05', 'imlek', '2578 Kongzili'], ['2027-03-09', 'idul-fitri', '1448 H'], ['2027-03-12', 'idul-fitri', '1448 H'],
      ['2027-03-15', 'idul-fitri', '1448 H'], ['2027-03-25', 'wafat-yesus'], ['2027-05-18', 'idul-adha', '1448 H'],
      ['2027-05-19', 'waisak', '2571 BE'], ['2027-12-24', 'natal'],
    ],
  },
};
export const TAHUN_RESMI = Object.keys(SKB).map(Number).sort();
export const adaSkb = (y: number) => !!SKB[y];

const mk = (r: Row, jenis: Jenis): Libur => ({ date: r[0], id: r[1], jenis, ket: r[2] ?? '', name: NAMA[r[1]] });
/** Semua hari libur nasional dan cuti bersama satu tahun menurut SKB, urut tanggal. Kosong bila SKB belum terbit. */
export function liburTahun(y: number): Libur[] {
  const s = SKB[y]; if (!s) return [];
  return [...s.nasional.map((r) => mk(r, 'nasional')), ...s.cuti.map((r) => mk(r, 'cuti'))].sort((a, b) => a.date.localeCompare(b.date) || (a.jenis === 'nasional' ? -1 : 1));
}
export const nasional = (y: number) => liburTahun(y).filter((l) => l.jenis === 'nasional');
export const cutiBersama = (y: number) => liburTahun(y).filter((l) => l.jenis === 'cuti');

/** Tanggal yang tetap setiap tahun menurut Keppres 8/2024 : dipakai hanya di tepi tahun tanpa SKB. */
export function liburTetap(y: number): Libur[] {
  const f = (m: number, d: number, id: HariId): Libur => ({ date: toIso(dayNum(y, m, d)), id, jenis: 'nasional', ket: '', name: NAMA[id] });
  return [f(1, 1, 'tahun-baru'), f(5, 1, 'hari-buruh'), f(6, 1, 'pancasila'), f(8, 17, 'kemerdekaan'), f(12, 25, 'natal')];
}
/** Daftar yang dipakai perhitungan : SKB bila ada, jika tidak hanya tanggal tetap. */
export const liburDipakai = (y: number) => (adaSkb(y) ? liburTahun(y) : liburTetap(y));

/** Peta tanggal → hari libur (nasional dan cuti bersama) untuk beberapa tahun. */
export function petaLibur(years: number[]): Map<string, Libur[]> {
  const m = new Map<string, Libur[]>();
  for (const y of years) for (const l of liburDipakai(y)) { const a = m.get(l.date) ?? []; a.push(l); m.set(l.date, a); }
  return m;
}

/** Hari libur yang jatuh pada hari kerja (Senin–Jumat, atau Senin–Sabtu bila Sabtu hari kerja). */
export const diHariKerja = (list: Libur[], sabtuKerja = false) => list.filter((l) => { const w = weekday(fromIso(l.date)); return w !== 0 && (sabtuKerja || w !== 6); });

/** Tanggal hari raya tertentu dalam satu tahun (hari pertama bila dua hari). */
export function tanggalHari(y: number, id: HariId): string | null {
  return nasional(y).find((l) => l.id === id)?.date ?? null;
}

/** Hari ke-n dalam pekan pada bulan tertentu (n = −1 : terakhir). wd 0 = Minggu. */
export function nthWeekday(y: number, m: number, wd: number, n: number): string {
  if (n > 0) { const first = dayNum(y, m, 1); return toIso(first + ((wd - weekday(first) + 7) % 7) + 7 * (n - 1)); }
  const last = dayNum(y, m + 1, 1) - 1; return toIso(last - ((weekday(last) - wd + 7) % 7));
}
