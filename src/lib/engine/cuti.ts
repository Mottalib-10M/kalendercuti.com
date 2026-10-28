/**
 * Long weekend, perencana cuti dan hari kerja.
 *
 * Tahun dipecah menjadi blok bergantian : blok libur (akhir pekan, hari libur nasional, dan — bila dipilih — cuti
 * bersama) dan blok kerja. Mengambil cuti pada semua hari satu blok kerja menyambung dua blok libur di kiri dan kanannya.
 *
 * - `jembatan` : setiap blok kerja paling lama `max` hari yang bersebelahan dengan hari libur, dengan hasilnya
 *   (hari libur berturut-turut per hari cuti), diurutkan dari yang terbaik.
 * - `optimalkan` : pilihan terbaik untuk sejumlah hari cuti. Pemrograman dinamis atas blok kerja yang berurutan
 *   (dipilih / tidak, hari terpakai) : memaksimalkan hari libur di blok yang terbentuk ; bila sama, menang yang
 *   memakai lebih sedikit cuti. Tepat, bukan perkiraan.
 * - `longWeekend` : setiap blok libur ≥ 3 hari yang memuat hari libur atau cuti bersama, tanpa mengambil cuti.
 *
 * Pilihan : `cb` = cuti bersama dihitung libur (ASN, banyak perusahaan) atau hari kerja (perusahaan yang tidak
 * menerapkannya ; SKB Diktum KEENAM menyerahkannya kepada pimpinan) ; `sabtu` = Sabtu hari kerja (enam hari kerja seminggu).
 */
import { petaLibur, fromIso, toIso, weekday, dayNum, type Libur } from './libur';

export interface Opsi { /** Cuti bersama dihitung hari libur (bawaan : ya). */ cb?: boolean; /** Sabtu hari kerja. */ sabtu?: boolean }
interface Blok { libur: boolean; start: number; len: number; hariLibur: boolean }

const opsi = (o: Opsi = {}) => ({ cb: o.cb !== false, sabtu: !!o.sabtu });
/** Apakah hari ini hari libur bagi pekerja dengan opsi ini, dan karena hari libur (bukan sekadar akhir pekan)? */
export function status(d: number, peta: Map<string, Libur[]>, o: Opsi = {}) {
  const { cb, sabtu } = opsi(o), w = weekday(d), ls = peta.get(toIso(d)) ?? [];
  const resmi = ls.some((l) => l.jenis === 'nasional') || (cb && ls.some((l) => l.jenis === 'cuti'));
  const akhirPekan = w === 0 || (w === 6 && !sabtu);
  return { libur: resmi || akhirPekan, hariLibur: resmi && !akhirPekan, resmi, akhirPekan };
}

/** Blok libur dan kerja dari awal Desember tahun sebelumnya sampai akhir Januari tahun berikutnya. */
export function blok(y: number, o: Opsi = {}): Blok[] {
  const peta = petaLibur([y - 1, y, y + 1]);
  const a = dayNum(y - 1, 12, 1), b = dayNum(y + 1, 1, 31), out: Blok[] = [];
  for (let d = a; d <= b; d++) {
    const s = status(d, peta, o), last = out[out.length - 1];
    if (last && last.libur === s.libur) { last.len++; last.hariLibur ||= s.hariLibur; }
    else out.push({ libur: s.libur, start: d, len: 1, hariLibur: s.hariLibur });
  }
  return out;
}

export interface Jembatan {
  cutiDari: string; cutiSampai: string; cuti: number;
  liburDari: string; liburSampai: string; libur: number;
  /** Hari libur dan cuti bersama di dalam blok yang terbentuk. */
  sebab: Libur[];
}
const sebabDalam = (dari: number, sampai: number, y: number) => {
  const peta = petaLibur([y - 1, y, y + 1]), out: Libur[] = [];
  for (let d = dari; d <= sampai; d++) for (const l of peta.get(toIso(d)) ?? []) if (!out.some((x) => x.id === l.id && x.jenis === l.jenis)) out.push(l);
  return out;
};
const buat = (bl: Blok[], i: number, j: number, y: number): Jembatan => {
  const pre = bl[i - 1], post = bl[j + 1];
  const dari = pre ? pre.start : bl[i].start, sampai = post ? post.start + post.len - 1 : bl[j].start + bl[j].len - 1;
  let cuti = 0; for (let k = i; k <= j; k++) if (!bl[k].libur) cuti += bl[k].len;
  return { cutiDari: toIso(bl[i].start), cutiSampai: toIso(bl[j].start + bl[j].len - 1), cuti, liburDari: toIso(dari), liburSampai: toIso(sampai), libur: sampai - dari + 1, sebab: sebabDalam(dari, sampai, y) };
};
const diTahun = (b: Blok, y: number) => b.start >= dayNum(y, 1, 1) && b.start + b.len - 1 <= dayNum(y, 12, 31);

/** Semua jembatan satu tahun : blok kerja paling lama `max` hari di samping hari libur, terbaik dulu. */
export function jembatan(y: number, o: Opsi = {}, max = 4): Jembatan[] {
  const bl = blok(y, o), out: Jembatan[] = [];
  for (let i = 1; i < bl.length - 1; i++) {
    const b = bl[i];
    if (b.libur || b.len > max || !diTahun(b, y)) continue;
    if (!bl[i - 1].hariLibur && !bl[i + 1].hariLibur) continue;
    out.push(buat(bl, i, i, y));
  }
  return out.sort((a, b) => b.libur / b.cuti - a.libur / a.cuti || b.libur - a.libur || a.cutiDari.localeCompare(b.cutiDari));
}

export interface Rencana { blok: Jembatan[]; cuti: number; libur: number; /** Hari cuti yang tidak lagi memperpanjang libur : bebas dipakai. */ sisa: number }
/** Pembagian terbaik `budget` hari cuti pada tahun y (hanya hari di tahun y memakai cuti). */
export function optimalkan(y: number, budget: number, o: Opsi = {}): Rencana {
  const B = Math.max(0, Math.min(40, Math.floor(budget)));
  const bl = blok(y, o);
  const runs: number[] = []; for (let i = 0; i < bl.length; i++) if (!bl[i].libur) runs.push(i);
  const n = runs.length, NEG = -1e9;
  const ok = (r: number) => { const i = runs[r]; return i > 0 && i < bl.length - 1 && diTahun(bl[i], y) && bl[i].len <= 10; };
  const fr = (i: number) => (bl[i] && bl[i].libur ? bl[i].len : 0);
  const hol = (i: number) => !!(bl[i] && bl[i].libur && bl[i].hariLibur);
  // dp[r][s][c] : nilai terbaik setelah blok r dengan c hari terpakai. s = 0 : blok r tidak dipilih ;
  // 1 : dipilih, rantai sudah menyentuh hari libur ; 2 : dipilih, belum menyentuh hari libur (tidak boleh berakhir begitu).
  const dp: Float64Array[][] = [], from: Int32Array[][] = [];
  for (let r = 0; r <= n; r++) { dp.push([0, 1, 2].map(() => new Float64Array(B + 1).fill(NEG))); from.push([0, 1, 2].map(() => new Int32Array(B + 1).fill(-1))); }
  dp[0][0][0] = 0;
  for (let r = 0; r < n; r++) {
    const i = runs[r], cost = bl[i].len;
    for (let c = 0; c <= B; c++) for (let s = 0; s < 3; s++) {
      const v = dp[r][s][c]; if (v <= NEG / 2) continue;
      if (s !== 2 && v > dp[r + 1][0][c]) { dp[r + 1][0][c] = v; from[r + 1][0][c] = s; }
      if (ok(r) && c + cost <= B) {
        const gain = s ? cost + fr(i + 1) : fr(i - 1) + cost + fr(i + 1);
        const has = s === 1 || (s === 0 && hol(i - 1)) || hol(i + 1);
        const t = has ? 1 : 2, nv = v + 100 * gain - cost;
        if (nv > dp[r + 1][t][c + cost]) { dp[r + 1][t][c + cost] = nv; from[r + 1][t][c + cost] = s; }
      }
    }
  }
  let best = 0, bc = 0, bs = 0;
  for (let c = 0; c <= B; c++) for (let s = 0; s < 2; s++) if (dp[n][s][c] > best) { best = dp[n][s][c]; bc = c; bs = s; }
  const chosen: boolean[] = new Array(n).fill(false);
  for (let r = n, c = bc, s = bs; r > 0; r--) { const p = from[r][s][c]; if (s) { chosen[r - 1] = true; c -= bl[runs[r - 1]].len; } s = p < 0 ? 0 : p; }
  const plan: Jembatan[] = [];
  for (let r = 0; r < n; r++) {
    if (!chosen[r]) continue;
    let e = r; while (e + 1 < n && chosen[e + 1]) e++;
    plan.push(buat(bl, runs[r], runs[e], y)); r = e;
  }
  const cuti = plan.reduce((a, b) => a + b.cuti, 0);
  return { blok: plan, cuti, libur: plan.reduce((a, b) => a + b.libur, 0), sisa: B - cuti };
}

export interface LongWeekend { dari: string; sampai: string; hari: number; sebab: Libur[] }
/** Libur panjang tanpa cuti : blok libur ≥ 3 hari yang memuat hari libur atau cuti bersama, yang dimulai di tahun y. */
export function longWeekend(y: number, o: Opsi = {}): LongWeekend[] {
  return blok(y, o).filter((b) => b.libur && b.len >= 3 && b.hariLibur && b.start >= dayNum(y, 1, 1) && b.start <= dayNum(y, 12, 31))
    .map((b) => ({ dari: toIso(b.start), sampai: toIso(b.start + b.len - 1), hari: b.len, sebab: sebabDalam(b.start, b.start + b.len - 1, y) }));
}

/** Hari kerja per bulan (Senin–Jumat atau Senin–Sabtu, dikurangi hari libur dan, bila dipilih, cuti bersama). */
export function hariKerja(y: number, o: Opsi = {}): number[] {
  const peta = petaLibur([y]), out: number[] = [];
  for (let m = 1; m <= 12; m++) {
    let c = 0; for (let d = dayNum(y, m, 1); d < dayNum(y, m + 1, 1); d++) if (!status(d, peta, o).libur) c++;
    out.push(c);
  }
  return out;
}
/** Hari kerja di antara dua tanggal, termasuk keduanya. */
export function hariKerjaAntara(a: string, b: string, o: Opsi = {}): { kerja: number; kalender: number; libur: number; akhirPekan: number } {
  let x = fromIso(a), z = fromIso(b); if (z < x) [x, z] = [z, x];
  const ys: number[] = []; for (let y = new Date(x * 864e5).getUTCFullYear(); y <= new Date(z * 864e5).getUTCFullYear(); y++) ys.push(y);
  const peta = petaLibur(ys);
  let kerja = 0, libur = 0, akhirPekan = 0;
  for (let d = x; d <= z; d++) { const s = status(d, peta, o); if (!s.libur) kerja++; else if (s.akhirPekan) akhirPekan++; else libur++; }
  return { kerja, kalender: z - x + 1, libur, akhirPekan };
}
/** Hari kerja ke-n setelah tanggal a (a tidak dihitung). */
export function tambahHariKerja(a: string, n: number, o: Opsi = {}): string {
  const y0 = Number(a.slice(0, 4)), peta = petaLibur([y0, y0 + 1, y0 + 2]);
  let d = fromIso(a), c = 0;
  while (c < n) { d++; if (!status(d, peta, o).libur) c++; }
  return toIso(d);
}
/** Senin–Jumat (atau Senin–Sabtu) dalam setahun, tanpa melihat hari libur. */
export const hariKerjaKotor = (y: number, sabtu = false) => { let c = 0; for (let d = dayNum(y, 1, 1); d <= dayNum(y, 12, 31); d++) { const w = weekday(d); if (w !== 0 && (sabtu || w !== 6)) c++; } return c; };
