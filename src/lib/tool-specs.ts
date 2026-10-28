/**
 * Alat-alat situs. Setiap angka dan tanggal berasal dari mesin (engine/libur.ts, engine/cuti.ts, engine/hijri.ts);
 * tidak ada yang diketik tangan. Satu spec = daftar kolom (yang tampak dulu, `adv` dilipat) dan fungsi `run`
 * yang mengembalikan kartu hasil. Kalender tahunan dan hitung mundur adalah komponen sendiri.
 */
import type { ToolSpec, V, ToolOut, Opt } from './tool-types';
import { resolve } from './tool-types';
import { formatNumber, formatDecimal, type Lang } from './format';
import { liburTahun, nasional, cutiBersama, adaSkb, TAHUN_RESMI, fromIso, toIso, weekday, dayNum, addDays, paskah, NAMA, liburTetap, type Libur, type HariId } from './engine/libur';
import { optimalkan, jembatan, longWeekend, hariKerja, hariKerjaAntara, tambahHariKerja, hariKerjaKotor, type Opsi } from './engine/cuti';
import { hijriah, awalBulan, panjangBulan, BULAN_HIJRIAH, BULAN_HIJRIAH_EN, weton, PASARAN, ijtimakSetelah, wib } from './engine/hijri';

export type Args = Record<string, number | string>;
const T = (l: Lang, id: string, en: string) => (l === 'id' ? id: en);
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k] ?? '');
const num = (x: number, l: Lang) => formatNumber(x, 0, l);
export const TAG = (l: Lang) => (l === 'id' ? 'id-ID' : 'en-GB');
const fmt = (iso: string, l: Lang, o: Intl.DateTimeFormatOptions) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(TAG(l), { ...o, timeZone: 'UTC' });
/** “10 Maret 2027” / “10 March 2027” */
export const dLong = (iso: string, l: Lang) => fmt(iso, l, { day: 'numeric', month: 'long', year: 'numeric' });
/** “Rabu, 10 Maret 2027” */
export const dWeek = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
/** “Rab, 10 Maret” / “Wed 10 March” */
export const dShort = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'short', day: 'numeric', month: 'long' });
export const wdName = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'long' });
export const span = (a: string, b: string, l: Lang) => (a === b ? dShort(a, l): `${dShort(a, l)} – ${dShort(b, l)}`);
const hari = (x: number, l: Lang) => `${num(x, l)} ${T(l, 'hari', x === 1 ? 'day' : 'days')}`;
export const jenisLabel = (j: Libur['jenis'], l: Lang) => (j === 'nasional' ? T(l, 'Libur nasional', 'National holiday'): T(l, 'Cuti bersama', 'Collective leave'));
export const namaLibur = (x: Libur, l: Lang) => `${x.name[l]}${x.ket ? ` ${x.ket}` : ''}`;
const uniqNama = (ls: Libur[], l: Lang) => [...new Set(ls.map((x) => x.name[l]))].join(', ');
export const BULAN = (l: Lang) => Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(2027, i, 15)).toLocaleDateString(TAG(l), { month: 'long', timeZone: 'UTC' }));
export const namaHijriah = (hm: number, l: Lang) => (l === 'id' ? BULAN_HIJRIAH: BULAN_HIJRIAH_EN)[hm - 1];
export const fmtHijriah = (iso: string, l: Lang) => { const h = hijriah(iso); return `${h.hd} ${namaHijriah(h.hm, l)} ${h.hy} ${T(l, 'H', 'AH')}`; };

/* ------------------------------------------------------------------ Kolom */
const yearRange = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const fTahun = (l: Lang, def: number, ys = TAHUN_RESMI) => ({ kind: 'select' as const, id: 'tahun', label: T(l, 'Tahun', 'Year'), def: String(def), options: ys.map((y) => ({ value: String(y), label: String(y) })) });
const fCb = (l: Lang, adv = true) => ({ kind: 'choice' as const, id: 'cb', label: T(l, 'Cuti bersama', 'Collective leave days'), def: 'libur', adv, options: [{ value: 'libur', label: T(l, 'Libur', 'Days off') }, { value: 'kerja', label: T(l, 'Tetap kerja', 'Working days') }] });
const fSabtu = (l: Lang, adv = true) => ({ kind: 'choice' as const, id: 'sabtu', label: T(l, 'Hari kerja per minggu', 'Working days per week'), def: '5', adv, options: [{ value: '5', label: T(l, '5 hari', '5 days') }, { value: '6', label: T(l, '6 hari', '6 days') }] });
const opsiDari = (v: V): Opsi => ({ cb: s(v, 'cb') !== 'kerja', sabtu: s(v, 'sabtu') === '6' });
const bulanOpts = (l: Lang, ys = [2026, 2027]): Opt[] => ys.flatMap((y) => BULAN(l).map((m, i) => ({ value: `${y}-${String(i + 1).padStart(2, '0')}`, label: `${m} ${y}` })));
const fTgl = (id: string, label: string, def: number) => ({ id, label, def, max: 31 });
/** Tanggal dari kolom bulan (AAAA-MM) dan hari; hari dibatasi pada panjang bulan. */
const tglDari = (ym: string, d: number) => { const [y, m] = ym.split('-').map(Number); const max = dayNum(y, m + 1, 1) - dayNum(y, m, 1); return toIso(dayNum(y, m, Math.min(Math.max(1, Math.round(d)), max))); };

/* ------------------------------------------------------------------ Perencana cuti (long weekend) */
function lwSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fTahun(l, Number(a.tahun ?? 2027)), { id: 'cuti', label: T(l, 'Hari cuti yang ingin dipakai', 'Leave days you want to use'), def: Number(a.cuti ?? 4), unit: T(l, 'hari', 'days'), max: 40 }, fCb(l), fSabtu(l)],
    run: (v) => {
      const y = n(v, 'tahun'), o = opsiDari(v), p = optimalkan(y, Math.round(n(v, 'cuti')), o);
      const all = jembatan(y, o), faktor = p.cuti ? p.libur / p.cuti: 0;
      return {
        label: T(l, `Long weekend ${y} dengan ${num(p.cuti, l)} hari cuti`, `Long weekends ${y} with ${num(p.cuti, l)} leave days`),
        value: T(l, `${num(p.libur, l)} hari libur`, `${num(p.libur, l)} days off`),
        sub: p.cuti ? T(l, `Setiap hari cuti menghasilkan ${formatDecimal(faktor, 1, l)} hari libur berturut-turut.`, `Each leave day buys ${formatDecimal(faktor, 1, l)} days off in a row.`): T(l, 'Masukkan paling sedikit satu hari cuti.', 'Enter at least one leave day.'),
        rows: p.blok.slice(0, 6).map((b) => [span(b.liburDari, b.liburSampai, l), T(l, `${num(b.cuti, l)} → ${num(b.libur, l)} hari`, `${num(b.cuti, l)} → ${num(b.libur, l)} days`), b.libur] as [string, string, number]),
        table: p.blok.length ? {
          caption: T(l, `Rencana Anda untuk ${y} : ambil cuti, dapat libur panjang`, `Your plan for ${y}: take leave, get a long break`),
          headers: [T(l, 'Ambil cuti', 'Take leave'), T(l, 'Hari cuti', 'Leave days'), T(l, 'Libur berturut-turut', 'Off in a row'), T(l, 'Hari libur', 'Days off'), T(l, 'Karena', 'Thanks to')],
          rows: p.blok.map((b) => [span(b.cutiDari, b.cutiSampai, l), num(b.cuti, l), span(b.liburDari, b.liburSampai, l), num(b.libur, l), uniqNama(b.sebab, l)]),
          align: ['l', 'r', 'l', 'r', 'l'],
        } : undefined,
        tables: all.length ? [{
          caption: T(l, `Semua peluang cuti ${y}, yang terbaik dulu`, `Every bridge in ${y}, best first`),
          headers: [T(l, 'Ambil cuti', 'Take leave'), T(l, 'Hari cuti', 'Leave days'), T(l, 'Libur berturut-turut', 'Off in a row'), T(l, 'Hari libur', 'Days off'), T(l, 'Hari libur di dalamnya', 'Holidays inside')],
          rows: all.map((b) => [span(b.cutiDari, b.cutiSampai, l), num(b.cuti, l), span(b.liburDari, b.liburSampai, l), num(b.libur, l), uniqNama(b.sebab, l)]),
          align: ['l', 'r', 'l', 'r', 'l'],
        }]: undefined,
        note: p.sisa > 0 ? T(l, `${hari(p.sisa, l)} tidak lagi memperpanjang libur: bebas Anda pakai kapan saja.`, `${hari(p.sisa, l)} no longer lengthen a break: use them whenever you like.`): undefined,
      };
    },
  };
}

/* ------------------------------------------------------------------ Daftar libur satu tahun */
function lnSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fTahun(l, Number(a.tahun ?? 2027)), { kind: 'choice', id: 'jenis', label: T(l, 'Tampilkan', 'Show'), def: String(a.jenis ?? 'semua'), options: [{ value: 'semua', label: T(l, 'Semua', 'All') }, { value: 'nasional', label: T(l, 'Libur nasional', 'Holidays') }, { value: 'cuti', label: T(l, 'Cuti bersama', 'Leave') }] }, fSabtu(l)],
    run: (v) => {
      const y = n(v, 'tahun'), j = s(v, 'jenis'), sabtu = s(v, 'sabtu') === '6';
      const all = liburTahun(y), list = j === 'semua' ? all: all.filter((x) => x.jenis === j);
      const nas = nasional(y), cb = cutiBersama(y);
      const kerja = (x: Libur) => { const w = weekday(fromIso(x.date)); return w !== 0 && (sabtu || w !== 6); };
      return {
        label: T(l, `Hari libur nasional dan cuti bersama ${y}`, `Public holidays and collective leave ${y}`),
        value: T(l, `${num(nas.length + cb.length, l)} hari`, `${num(nas.length + cb.length, l)} days`),
        sub: T(l, `${num(nas.length, l)} libur nasional dan ${num(cb.length, l)} cuti bersama menurut SKB 3 Menteri.`, `${num(nas.length, l)} national holidays and ${num(cb.length, l)} collective leave days under the joint decree.`),
        rows: [
          [T(l, 'Libur nasional di hari kerja', 'Holidays on working days'), num(nas.filter(kerja).length, l)],
          [T(l, 'Libur nasional di akhir pekan', 'Holidays at weekends'), num(nas.length - nas.filter(kerja).length, l)],
          [T(l, 'Cuti bersama', 'Collective leave days'), num(cb.length, l)],
          [T(l, 'Long weekend tanpa cuti', 'Long weekends with no leave'), num(longWeekend(y, { sabtu }).length, l)],
        ],
        table: {
          caption: T(l, `Daftar ${y} (lampiran SKB)`, `List for ${y} (decree annex)`),
          headers: [T(l, 'Tanggal', 'Date'), T(l, 'Hari', 'Day'), T(l, 'Keterangan', 'Holiday'), T(l, 'Jenis', 'Type')],
          rows: list.map((x) => [dLong(x.date, l), wdName(x.date, l), namaLibur(x, l), jenisLabel(x.jenis, l)]),
          align: ['l', 'l', 'l', 'l'],
        },
      };
    },
  };
}

/* ------------------------------------------------------------------ Hari kerja */
function hkSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fTahun(l, Number(a.tahun ?? 2027)), fSabtu(l, false), fCb(l, false)],
    run: (v) => {
      const y = n(v, 'tahun'), o = opsiDari(v), m = hariKerja(y, o), sum = m.reduce((x, z) => x + z, 0), kotor = hariKerjaKotor(y, o.sabtu);
      return {
        label: T(l, `Hari kerja ${y}`, `Working days ${y}`),
        value: T(l, `${num(sum, l)} hari`, `${num(sum, l)} days`),
        sub: T(l, `${o.sabtu ? 'Senin–Sabtu' : 'Senin–Jumat'}, dikurangi libur nasional${o.cb ? ' dan cuti bersama' : ''}.`, `${o.sabtu ? 'Monday to Saturday' : 'Monday to Friday'}, minus national holidays${o.cb ? ' and collective leave' : ''}.`),
        rows: [
          [T(l, 'Hari kerja kotor dalam setahun', 'Working weekdays in the year'), num(kotor, l)],
          [T(l, 'Dikurangi libur dan cuti bersama', 'Minus holidays and leave days'), num(kotor - sum, l)],
          [T(l, 'Semester pertama', 'First half'), num(m.slice(0, 6).reduce((x, z) => x + z, 0), l)],
          [T(l, 'Semester kedua', 'Second half'), num(m.slice(6).reduce((x, z) => x + z, 0), l)],
        ],
        table: { caption: T(l, `Hari kerja per bulan ${y}`, `Working days per month, ${y}`), headers: [T(l, 'Bulan', 'Month'), T(l, 'Hari kerja', 'Working days')], rows: BULAN(l).map((mn, i) => [mn, num(m[i], l)]), align: ['l', 'r'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Hitung hari kerja antara dua tanggal */
function hhSpec(l: Lang, a: Args = {}): ToolSpec {
  const ms = bulanOpts(l, [2026, 2027]);
  return {
    inputs: [
      { kind: 'select', id: 'bln1', label: T(l, 'Bulan mulai', 'Start month'), def: String(a.bln1 ?? '2027-03'), options: ms },
      fTgl('tgl1', T(l, 'Tanggal mulai', 'Start day'), Number(a.tgl1 ?? 1)),
      { kind: 'select', id: 'bln2', label: T(l, 'Bulan selesai', 'End month'), def: String(a.bln2 ?? '2027-03'), options: ms },
      fTgl('tgl2', T(l, 'Tanggal selesai', 'End day'), Number(a.tgl2 ?? 31)),
      { id: 'tambah', label: T(l, 'Tambah hari kerja dari tanggal mulai', 'Add working days to the start date'), def: Number(a.tambah ?? 14), unit: T(l, 'hari', 'days'), max: 250, adv: true },
      fSabtu(l), fCb(l),
    ],
    run: (v) => {
      const d1 = tglDari(s(v, 'bln1'), n(v, 'tgl1')), d2 = tglDari(s(v, 'bln2'), n(v, 'tgl2')), o = opsiDari(v);
      const r = hariKerjaAntara(d1, d2, o), [a1, a2] = d1 <= d2 ? [d1, d2]: [d2, d1];
      const tambah = Math.round(n(v, 'tambah')), hasil = tambah > 0 ? tambahHariKerja(d1, tambah, o): d1;
      const ls = liburTahun(Number(a1.slice(0, 4))).concat(a1.slice(0, 4) !== a2.slice(0, 4) ? liburTahun(Number(a2.slice(0, 4))): []).filter((x) => x.date >= a1 && x.date <= a2);
      return {
        label: T(l, `Hari kerja ${dLong(a1, l)} – ${dLong(a2, l)}`, `Working days ${dLong(a1, l)} to ${dLong(a2, l)}`),
        value: T(l, `${num(r.kerja, l)} hari kerja`, `${num(r.kerja, l)} working days`),
        sub: T(l, `Dari ${num(r.kalender, l)} hari kalender, tanggal awal dan akhir ikut dihitung.`, `Out of ${num(r.kalender, l)} calendar days, both ends included.`),
        rows: [
          [T(l, 'Hari kalender', 'Calendar days'), num(r.kalender, l)],
          [T(l, 'Akhir pekan', 'Weekend days'), num(r.akhirPekan, l)],
          [T(l, 'Libur nasional dan cuti bersama di hari kerja', 'Holidays and leave on working days'), num(r.libur, l)],
          [T(l, `${num(tambah, l)} hari kerja setelah tanggal mulai`, `${num(tambah, l)} working days after the start`), dShort(hasil, l)],
        ],
        table: ls.length ? { caption: T(l, 'Hari libur di dalam rentang ini', 'Holidays inside this range'), headers: [T(l, 'Tanggal', 'Date'), T(l, 'Keterangan', 'Holiday'), T(l, 'Jenis', 'Type')], rows: ls.map((x) => [dShort(x.date, l), namaLibur(x, l), jenisLabel(x.jenis, l)]), align: ['l', 'l', 'l'] } : undefined,
      };
    },
  };
}

/* ------------------------------------------------------------------ Satu bulan */
function blSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [{ kind: 'select', id: 'bln', label: T(l, 'Bulan', 'Month'), def: String(a.bln ?? '2027-03'), options: bulanOpts(l) }, fSabtu(l), fCb(l)],
    run: (v) => {
      const ym = s(v, 'bln'), [y, m] = ym.split('-').map(Number), o = opsiDari(v);
      const ls = liburTahun(y).filter((x) => x.date.startsWith(ym));
      const hk = hariKerja(y, o)[m - 1], hari0 = dayNum(y, m + 1, 1) - dayNum(y, m, 1);
      const lw = longWeekend(y, o).filter((x) => x.dari.slice(0, 7) === ym || x.sampai.slice(0, 7) === ym);
      const nm = `${BULAN(l)[m - 1]} ${y}`;
      return {
        label: T(l, `Tanggal merah ${nm}`, `Holidays in ${nm}`),
        value: ls.length ? T(l, `${num(ls.filter((x) => x.jenis === 'nasional').length, l)} libur, ${num(ls.filter((x) => x.jenis === 'cuti').length, l)} cuti bersama`, `${num(ls.filter((x) => x.jenis === 'nasional').length, l)} holidays, ${num(ls.filter((x) => x.jenis === 'cuti').length, l)} leave days`): T(l, 'Tidak ada tanggal merah', 'No public holiday'),
        sub: T(l, `${num(hk, l)} hari kerja dari ${num(hari0, l)} hari.`, `${num(hk, l)} working days out of ${num(hari0, l)}.`),
        rows: [
          [T(l, 'Hari kerja', 'Working days'), num(hk, l)],
          [T(l, 'Long weekend bulan ini', 'Long weekends this month'), lw.length ? lw.map((x) => span(x.dari, x.sampai, l)).join(' ; '): T(l, 'tidak ada', 'none')],
          [T(l, 'Awal bulan Hijriah', 'Hijri date on the 1st'), fmtHijriah(`${ym}-01`, l)],
        ],
        table: ls.length ? { caption: T(l, `Hari libur ${nm}`, `Days off in ${nm}`), headers: [T(l, 'Tanggal', 'Date'), T(l, 'Keterangan', 'Holiday'), T(l, 'Jenis', 'Type')], rows: ls.map((x) => [dWeek(x.date, l), namaLibur(x, l), jenisLabel(x.jenis, l)]), align: ['l', 'l', 'l'] } : undefined,
      };
    },
  };
}

/* ------------------------------------------------------------------ Hari raya: tanggal beberapa tahun */
export type Raya = HariId | 'puasa' | 'tahun-baru-masehi';
/** Tanggal satu hari raya pada tahun y: resmi (SKB), dihitung (Paskah, tanggal tetap) atau perkiraan (Umm al-Qura). */
export function tanggalRaya(id: Raya, y: number): { date: string; status: 'resmi' | 'hitung' | 'perkiraan' } | null {
  const fixed: Partial<Record<Raya, [number, number]>> = { 'tahun-baru': [1, 1], 'hari-buruh': [5, 1], pancasila: [6, 1], kemerdekaan: [8, 17], natal: [12, 25] };
  if (id === 'puasa') {
    const hy = (y - 622) * 33 / 32 | 0; // perkiraan tahun Hijriah yang bulan Ramadannya jatuh di tahun y
    for (const h of [hy, hy + 1, hy + 2]) { const a = awalBulan(h, 9); if (a && a.date.startsWith(String(y))) return { date: a.date, status: 'perkiraan' }; }
    return null;
  }
  if (adaSkb(y)) { const x = nasional(y).find((l) => l.id === id); if (x) return { date: x.date, status: 'resmi' }; }
  const f = fixed[id]; if (f) return { date: toIso(dayNum(y, f[0], f[1])), status: 'hitung' };
  const p = paskah(y);
  if (id === 'paskah') return { date: p, status: 'hitung' };
  if (id === 'wafat-yesus') return { date: addDays(p, -2), status: 'hitung' };
  if (id === 'kenaikan') return { date: addDays(p, 39), status: 'hitung' };
  const hijri: Partial<Record<Raya, [number, number]>> = { 'idul-fitri': [10, 1], 'idul-adha': [12, 10], muharam: [1, 1], maulid: [3, 12], 'isra-mikraj': [7, 27] };
  const h = hijri[id];
  if (h) {
    for (let hy = 1446; hy <= 1452; hy++) { const a = awalBulan(hy, h[0]); if (a) { const d = addDays(a.date, h[1] - 1); if (d.startsWith(String(y))) return { date: d, status: 'perkiraan' }; } }
  }
  return null;
}
export const NAMA_RAYA = (id: Raya, l: Lang) => (id === 'puasa' ? T(l, 'Awal puasa Ramadan', 'First day of Ramadan'): NAMA[id as HariId][l]);
const statusLabel = (st: string, l: Lang) => ({ resmi: T(l, 'resmi (SKB)', 'official (decree)'), hitung: T(l, 'dihitung', 'computed'), perkiraan: T(l, 'perkiraan', 'estimate') }[st] ?? st);
const RAYA_OPTS: Raya[] = ['idul-fitri', 'puasa', 'idul-adha', 'imlek', 'nyepi', 'waisak', 'paskah', 'kenaikan', 'natal', 'muharam', 'maulid', 'isra-mikraj', 'kemerdekaan', 'tahun-baru', 'pancasila', 'hari-buruh'];
function hrSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [{ kind: 'select', id: 'hari', label: T(l, 'Hari raya', 'Holiday'), def: String(a.hari ?? 'idul-fitri'), options: RAYA_OPTS.map((r) => ({ value: r, label: NAMA_RAYA(r, l) })) }, fTahun(l, Number(a.tahun ?? 2027), [2026, 2027, 2028])],
    run: (v) => {
      const id = s(v, 'hari') as Raya, y = n(v, 'tahun'), t = tanggalRaya(id, y);
      const rowsYears = [2026, 2027, 2028].map((z) => { const q = tanggalRaya(id, z); return q ? [String(z), dWeek(q.date, l), statusLabel(q.status, l)]: [String(z), '–', T(l, 'tidak jatuh di tahun ini', 'does not fall this year')]; });
      if (!t) return { label: NAMA_RAYA(id, l), value: '–', rows: [], table: { headers: [T(l, 'Tahun', 'Year'), T(l, 'Tanggal', 'Date'), T(l, 'Status', 'Status')], rows: rowsYears } };
      const cb = cutiBersama(y).filter((c) => c.id === id || (id === 'puasa' && false));
      const lw = longWeekend(y).find((x) => x.dari <= t.date && x.sampai >= t.date);
      const h = hijriah(t.date), wt = weton(t.date);
      return {
        label: T(l, `${NAMA_RAYA(id, l)} ${y}`, `${NAMA_RAYA(id, l)} ${y}`),
        value: dLong(t.date, l),
        sub: `${wdName(t.date, l)} · ${statusLabel(t.status, l)}`,
        rows: [
          [T(l, 'Tanggal Hijriah', 'Hijri date'), `${h.hd} ${namaHijriah(h.hm, l)} ${h.hy} ${T(l, 'H', 'AH')}`],
          [T(l, 'Pasaran Jawa', 'Javanese market day'), `${wt.hari} ${wt.pasaran}`],
          [T(l, 'Cuti bersama terkait', 'Linked collective leave'), cb.length ? cb.map((c) => dShort(c.date, l)).join(', '): T(l, 'tidak ada', 'none')],
          [T(l, 'Libur berturut-turut', 'Days off in a row'), lw ? `${span(lw.dari, lw.sampai, l)} (${hari(lw.hari, l)})` : T(l, 'tidak ada long weekend', 'no long weekend')],
        ],
        table: { caption: T(l, `${NAMA_RAYA(id, l)} 2026 sampai 2028`, `${NAMA_RAYA(id, l)} 2026 to 2028`), headers: [T(l, 'Tahun', 'Year'), T(l, 'Tanggal', 'Date'), T(l, 'Status', 'Status')], rows: rowsYears, align: ['l', 'l', 'l'] },
        note: t.status === 'perkiraan' ? T(l, 'Perkiraan dari kalender Umm al-Qura yang disesuaikan dengan tanggal SKB; tanggal resmi ditetapkan Menteri Agama setelah sidang isbat.', 'Estimate from the Umm al-Qura calendar adjusted to the decree dates; the official date is set by the Minister of Religious Affairs after the isbat session.'): undefined,
      };
    },
  };
}

/* ------------------------------------------------------------------ Kalender Hijriah */
function hjSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [{ kind: 'select', id: 'bln', label: T(l, 'Bulan Masehi', 'Gregorian month'), def: String(a.bln ?? '2027-03'), options: bulanOpts(l, [2025, 2026, 2027, 2028]) }, fTgl('tgl', T(l, 'Tanggal', 'Day'), Number(a.tgl ?? 10))],
    run: (v) => {
      const d = tglDari(s(v, 'bln'), n(v, 'tgl')), h = hijriah(d), wt = weton(d);
      const y0 = h.hy, list: string[][] = [];
      for (const hy of [y0 - 1, y0, y0 + 1]) for (let hm = 1; hm <= 12; hm++) { const aw = awalBulan(hy, hm); if (aw && Math.abs(fromIso(aw.date) - fromIso(d)) < 200) list.push([`${namaHijriah(hm, l)} ${hy}`, dWeek(aw.date, l), String(panjangBulan(hy, hm) ?? '–'), aw.resmi ? T(l, 'dari tanggal SKB', 'from the decree dates'): T(l, 'perhitungan', 'computed')]); }
      return {
        label: dWeek(d, l),
        value: `${h.hd} ${namaHijriah(h.hm, l)} ${h.hy} ${T(l, 'H', 'AH')}`,
        sub: h.resmi ? T(l, 'Awal bulan ini mengikuti tanggal yang ditetapkan pemerintah (SKB).', 'This month starts on the date implied by the government decree.'): T(l, 'Perhitungan kalender Umm al-Qura; penetapan Kemenag bisa berbeda satu hari.', 'Computed with the Umm al-Qura calendar; the ministry can differ by one day.'),
        rows: [
          [T(l, 'Pasaran Jawa', 'Javanese market day'), `${wt.hari} ${wt.pasaran}`],
          [T(l, 'Hari ke-', 'Day of the month'), num(h.hd, l)],
          [T(l, 'Panjang bulan ini', 'Length of this month'), hari(panjangBulan(h.hy, h.hm) ?? 30, l)],
        ],
        table: { caption: T(l, 'Awal bulan Hijriah di sekitar tanggal ini', 'Hijri month starts around this date'), headers: [T(l, 'Bulan Hijriah', 'Hijri month'), T(l, 'Tanggal 1', 'First day'), T(l, 'Hari', 'Days'), T(l, 'Dasar', 'Basis')], rows: list, align: ['l', 'l', 'r', 'l'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Weton */
function wtSpec(l: Lang, a: Args = {}): ToolSpec {
  const ms = BULAN(l).map((m, i) => ({ value: String(i + 1), label: m }));
  return {
    inputs: [fTgl('tgl', T(l, 'Tanggal lahir', 'Day of birth'), Number(a.tgl ?? 17)), { kind: 'select', id: 'bln', label: T(l, 'Bulan', 'Month'), def: String(a.bln ?? 8), options: ms }, { id: 'thn', label: T(l, 'Tahun', 'Year'), def: Number(a.thn ?? 1995), max: 2030 }],
    run: (v) => {
      const y = Math.min(2030, Math.max(1900, Math.round(n(v, 'thn')))), m = Number(s(v, 'bln')) || 1;
      const d = toIso(dayNum(y, m, Math.min(Math.max(1, Math.round(n(v, 'tgl'))), dayNum(y, m + 1, 1) - dayNum(y, m, 1))));
      const w = weton(d);
      const next: string[][] = []; let x = fromIso(d); const start = dayNum(2027, 1, 1);
      while (x < start) x += 35;
      for (let i = 0; i < 6; i++) next.push([dWeek(toIso(x + 35 * i), l), `${w.hari} ${w.pasaran}`]);
      return {
        label: T(l, `Weton untuk ${dLong(d, l)}`, `Weton for ${dLong(d, l)}`),
        value: `${w.hari} ${w.pasaran}`,
        sub: T(l, `Neptu ${w.neptu} : hari ${w.neptuHari} + pasaran ${w.neptuPasaran}.`, `Neptu ${w.neptu}: day ${w.neptuHari} + market day ${w.neptuPasaran}.`),
        rows: [
          [T(l, 'Hari', 'Weekday'), w.hari],
          [T(l, 'Pasaran', 'Market day'), w.pasaran],
          [T(l, 'Neptu', 'Neptu'), num(w.neptu, l)],
          [T(l, 'Tanggal Hijriah', 'Hijri date'), y >= 2025 && y <= 2028 ? fmtHijriah(d, l): T(l, 'di luar 2025–2028', 'outside 2025–2028')],
        ],
        table: { caption: T(l, 'Weton yang sama pada 2027 (setiap 35 hari)', 'The same weton in 2027 (every 35 days)'), headers: [T(l, 'Tanggal', 'Date'), T(l, 'Weton', 'Weton')], rows: next, align: ['l', 'l'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Sisa cuti tahunan */
function ctSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fTahun(l, Number(a.tahun ?? 2027)), { id: 'hak', label: T(l, 'Hak cuti tahunan', 'Annual leave entitlement'), def: 12, unit: T(l, 'hari', 'days'), max: 40 }, { id: 'pakai', label: T(l, 'Cuti yang sudah/akan Anda ambil sendiri', 'Leave you take yourself'), def: 0, unit: T(l, 'hari', 'days'), max: 40 },
      { kind: 'choice', id: 'potong', label: T(l, 'Cuti bersama memotong cuti tahunan?', 'Does collective leave reduce your leave?'), def: 'ya', options: [{ value: 'ya', label: T(l, 'Ya', 'Yes') }, { value: 'tidak', label: T(l, 'Tidak', 'No') }] }, fSabtu(l)],
    run: (v) => {
      const y = n(v, 'tahun'), hak = Math.round(n(v, 'hak')), pakai = Math.round(n(v, 'pakai')), potong = s(v, 'potong') === 'ya', sabtu = s(v, 'sabtu') === '6';
      const cb = cutiBersama(y).filter((c) => { const w = weekday(fromIso(c.date)); return w !== 0 && (sabtu || w !== 6); });
      const dipotong = potong ? cb.length: 0, sisa = hak - dipotong - pakai;
      return {
        label: T(l, `Sisa cuti tahunan ${y}`, `Annual leave left in ${y}`),
        value: T(l, `${num(Math.max(0, sisa), l)} hari`, `${num(Math.max(0, sisa), l)} days`),
        sub: sisa < 0 ? T(l, `Kurang ${num(-sisa, l)} hari: cuti bersama dan cuti pribadi melebihi hak Anda.`, `${num(-sisa, l)} days short: collective and personal leave exceed your entitlement.`): T(l, `${num(hak, l)} hak − ${num(dipotong, l)} cuti bersama − ${num(pakai, l)} cuti pribadi.`, `${num(hak, l)} entitlement − ${num(dipotong, l)} collective − ${num(pakai, l)} personal.`),
        rows: [
          [T(l, 'Hak cuti tahunan', 'Entitlement'), num(hak, l)],
          [T(l, 'Cuti bersama di hari kerja', 'Collective leave on working days'), num(cb.length, l)],
          [T(l, 'Dipotong dari hak Anda', 'Deducted from you'), num(dipotong, l)],
          [T(l, 'Cuti pribadi', 'Personal leave'), num(pakai, l)],
        ],
        table: { caption: T(l, `Cuti bersama ${y} yang jatuh di hari kerja Anda`, `Collective leave ${y} on your working days`), headers: [T(l, 'Tanggal', 'Date'), T(l, 'Keterangan', 'Reason')], rows: cb.map((c) => [dWeek(c.date, l), namaLibur(c, l)]), align: ['l', 'l'] },
        note: T(l, 'Diktum KEEMPAT SKB: cuti bersama mengurangi hak cuti tahunan. Bagi swasta, pelaksanaannya diatur pimpinan perusahaan (Diktum KEENAM).', 'Decree clause four: collective leave counts against annual leave. Private employers decide how to apply it (clause six).'),
      };
    },
  };
}

/* ------------------------------------------------------------------ Ijtimak dan awal bulan */
function ijSpec(l: Lang, a: Args = {}): ToolSpec {
  const opts: Opt[] = [[1448, 9], [1448, 10], [1448, 12], [1449, 1], [1449, 9], [1449, 10]].map(([hy, hm]) => ({ value: `${hy}-${hm}`, label: `${namaHijriah(hm, l)} ${hy} ${T(l, 'H', 'AH')}` }));
  return {
    inputs: [{ kind: 'select', id: 'bulan', label: T(l, 'Bulan Hijriah', 'Hijri month'), def: String(a.bulan ?? '1448-9'), options: opts }],
    run: (v) => {
      const [hy, hm] = s(v, 'bulan').split('-').map(Number), aw = awalBulan(hy, hm);
      if (!aw) return { label: '', value: '–', rows: [] };
      const ij = ijtimakSetelah(Date.UTC(...(aw.date.split('-').map(Number) as [number, number, number])) - 3 * 864e5), w = wib(ij);
      const malam = addDays(w.date, 0), hariMaks = addDays(aw.date, 1);
      return {
        label: T(l, `1 ${namaHijriah(hm, l)} ${hy} H`, `1 ${namaHijriah(hm, l)} ${hy} AH`),
        value: dLong(aw.date, l),
        sub: aw.resmi ? T(l, 'Sesuai tanggal libur dalam SKB.', 'Matches the holiday date in the decree.'): T(l, 'Perkiraan; ditetapkan Menteri Agama setelah sidang isbat.', 'Estimate; set by the Minister of Religious Affairs after the isbat session.'),
        rows: [
          [T(l, 'Ijtimak (bulan baru astronomis)', 'Conjunction (astronomical new moon)'), `${dShort(w.date, l)}, ${w.jam} WIB`],
          [T(l, 'Pengamatan hilal (rukyat) pada petang', 'Crescent sighting on the evening of'), dShort(addDays(aw.date, -1), l)],
          [T(l, 'Bila hilal tidak terlihat', 'If the crescent is not seen'), dShort(hariMaks, l)],
        ],
        note: T(l, `Ijtimak dihitung dengan rumus Meeus (ketelitian beberapa menit). Malam ijtimak: ${dShort(malam, l)}.`, `Conjunction computed with Meeus's formula (accurate to a few minutes). Night of the conjunction: ${dShort(malam, l)}.`),
      };
    },
  };
}

export const SPECS: Record<string, (l: Lang, arg?: Args) => ToolSpec> = { lw: lwSpec, ln: lnSpec, hk: hkSpec, hh: hhSpec, bl: blSpec, hr: hrSpec, hj: hjSpec, wt: wtSpec, ct: ctSpec, ij: ijSpec };
export const TOOL_KINDS = [...Object.keys(SPECS), 'kalender', 'mundur'];
export function getTool(kind: string, l: Lang, arg?: Args): ToolSpec {
  const f = SPECS[kind]; if (!f) throw new Error(`alat tidak dikenal: ${kind}`);
  return f(l, arg);
}
/** Menjalankan satu alat dengan nilai bawaan (atau yang diberikan): untuk halaman dan tes. */
export function runTool(kind: string, l: Lang, arg?: Args, values?: V): ToolOut {
  const spec = getTool(kind, l, arg);
  const v = Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])) as V;
  return spec.run(resolve(spec.inputs, { ...v, ...(values ?? {}) }));
}
export { formatNumber, liburTetap, PASARAN };
