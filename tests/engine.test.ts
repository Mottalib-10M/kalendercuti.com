import { describe, it, expect } from 'vitest';
import { paskah, paskahMeeus, liburTahun, nasional, cutiBersama, SKB, fromIso, weekday, addDays, liburTetap, tanggalHari } from '../src/lib/engine/libur';
import { optimalkan, jembatan, longWeekend, hariKerja, hariKerjaAntara, tambahHariKerja } from '../src/lib/engine/cuti';
import { hijriah, umalqura, awalBulan, weton, pasaranIdx, ijtimakSetelah, wib, ACUAN_SKB } from '../src/lib/engine/hijri';

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const hari = (iso: string) => HARI[weekday(fromIso(iso))];

describe('Paskah', () => {
  it('sama dengan tabel Paskah PTB', () => {
    expect(paskah(2024)).toBe('2024-03-31');
    expect(paskah(2025)).toBe('2025-04-20');
    expect(paskah(2026)).toBe('2026-04-05');
    expect(paskah(2027)).toBe('2027-03-28');
    expect(paskah(2028)).toBe('2028-04-16');
  });
  it('sama dengan algoritme Meeus 1600–2600', () => {
    for (let y = 1600; y <= 2600; y++) expect(paskah(y)).toBe(paskahMeeus(y));
  });
  it('Wafat, Paskah dan Kenaikan di SKB sama dengan hitungan', () => {
    for (const y of [2026, 2027]) {
      const p = paskah(y);
      expect(tanggalHari(y, 'paskah')).toBe(p);
      expect(tanggalHari(y, 'wafat-yesus')).toBe(addDays(p, -2));
      expect(tanggalHari(y, 'kenaikan')).toBe(addDays(p, 39));
    }
  });
});

describe('Lampiran SKB', () => {
  // Kolom « HARI » di lampiran SKB, dibaca dari naskah resmi.
  const hari2026 = ['Kamis', 'Jumat', 'Selasa', 'Kamis', 'Sabtu', 'Minggu', 'Jumat', 'Minggu', 'Jumat', 'Kamis', 'Rabu', 'Minggu', 'Senin', 'Selasa', 'Senin', 'Selasa', 'Jumat'];
  const cuti2026 = ['Senin', 'Rabu', 'Jumat', 'Senin', 'Selasa', 'Jumat', 'Kamis', 'Kamis'];
  const hari2027 = ['Jumat', 'Selasa', 'Sabtu', 'Senin', 'Rabu', 'Kamis', 'Jumat', 'Minggu', 'Sabtu', 'Kamis', 'Senin', 'Kamis', 'Selasa', 'Minggu', 'Minggu', 'Selasa', 'Sabtu', 'Minggu'];
  const cuti2027 = ['Jumat', 'Selasa', 'Jumat', 'Senin', 'Kamis', 'Selasa', 'Rabu', 'Jumat'];
  it('nama hari setiap tanggal 2026 sama dengan SKB', () => {
    expect(SKB[2026].nasional.map((r) => hari(r[0]))).toEqual(hari2026);
    expect(SKB[2026].cuti.map((r) => hari(r[0]))).toEqual(cuti2026);
  });
  it('nama hari setiap tanggal 2027 sama dengan SKB', () => {
    expect(SKB[2027].nasional.map((r) => hari(r[0]))).toEqual(hari2027);
    expect(SKB[2027].cuti.map((r) => hari(r[0]))).toEqual(cuti2027);
  });
  it('17 libur nasional dan 8 cuti bersama 2026 ; 18 dan 8 pada 2027', () => {
    expect(nasional(2026).length).toBe(17); expect(cutiBersama(2026).length).toBe(8);
    expect(nasional(2027).length).toBe(18); expect(cutiBersama(2027).length).toBe(8);
    expect(liburTahun(2028)).toEqual([]);
  });
  it('tanggal tetap Keppres', () => {
    expect(liburTetap(2028).map((l) => l.date)).toEqual(['2028-01-01', '2028-05-01', '2028-06-01', '2028-08-17', '2028-12-25']);
  });
});

describe('Perencana cuti', () => {
  it('long weekend 2027 tanpa cuti mencakup Idul Fitri', () => {
    const lw = longWeekend(2027);
    expect(lw.some((x) => x.dari <= '2027-03-10' && x.sampai >= '2027-03-15')).toBe(true);
    for (const x of lw) expect(x.hari).toBeGreaterThanOrEqual(3);
  });
  it('rencana tidak melebihi anggaran dan libur ≥ cuti', () => {
    for (const b of [1, 3, 5, 8, 12]) {
      const p = optimalkan(2027, b);
      expect(p.cuti).toBeLessThanOrEqual(b);
      expect(p.libur).toBeGreaterThan(p.cuti);
    }
  });
  it('lebih banyak cuti tidak pernah memberi lebih sedikit libur', () => {
    let prev = 0; for (let b = 0; b <= 15; b++) { const p = optimalkan(2027, b); expect(p.libur).toBeGreaterThanOrEqual(prev); prev = p.libur; }
  });
  it('jembatan satu hari 2027', () => {
    const j = jembatan(2027, {}, 1);
    expect(j.every((x) => x.cuti === 1)).toBe(true);
    // Jumat 7 Mei 2027, setelah Kenaikan Kamis 6 Mei : 4 hari libur dengan 1 hari cuti.
    expect(j.some((x) => x.cutiDari === '2027-05-07' && x.libur === 4)).toBe(true);
  });
  it('hari kerja', () => {
    const hk = hariKerja(2027); expect(hk.length).toBe(12);
    const tot = hk.reduce((a, b) => a + b, 0);
    const tanpaCb = hariKerja(2027, { cb: false }).reduce((a, b) => a + b, 0);
    expect(tanpaCb - tot).toBe(8); // delapan cuti bersama 2027 semua di hari kerja
    expect(hariKerjaAntara('2027-03-08', '2027-03-15').kerja).toBe(0);
    expect(tambahHariKerja('2027-03-05', 1)).toBe('2027-03-16');
  });
});

describe('Hijriah dan Jawa', () => {
  it('acuan SKB dipakai', () => {
    expect(hijriah('2027-03-10')).toMatchObject({ hy: 1448, hm: 10, hd: 1, resmi: true });
    expect(hijriah('2027-05-17')).toMatchObject({ hy: 1448, hm: 12, hd: 10 });
    expect(hijriah('2026-01-16')).toMatchObject({ hy: 1447, hm: 7, hd: 27 });
    expect(hijriah('2027-12-26')).toMatchObject({ hy: 1449, hm: 7, hd: 27 });
    expect(hijriah('2027-08-15')).toMatchObject({ hy: 1449, hm: 3, hd: 12 });
    for (const [hy, hm, iso] of ACUAN_SKB) expect(awalBulan(hy, hm)?.date).toBe(iso);
  });
  it('Umm al-Qura berbeda satu hari pada Idul Fitri 1448', () => {
    expect(umalqura('2027-03-09')).toMatchObject({ hy: 1448, hm: 10, hd: 1 });
  });
  it('pasaran', () => {
    expect(weton('1945-08-17')).toMatchObject({ hari: 'Jumat', pasaran: 'Legi', neptu: 11 });
    expect(pasaranIdx('1945-08-22')).toBe(0);
  });
  it('ijtimak (Meeus) dalam beberapa menit', () => {
    // Bulan baru 11 Januari 2024 11.57 UTC dan 29 Maret 2025 10.58 UTC.
    expect(Math.abs(ijtimakSetelah(Date.UTC(2024, 0, 5)) - Date.UTC(2024, 0, 11, 11, 57)) / 6e4).toBeLessThan(5);
    expect(Math.abs(ijtimakSetelah(Date.UTC(2025, 2, 20)) - Date.UTC(2025, 2, 29, 10, 58)) / 6e4).toBeLessThan(5);
    expect(wib(Date.UTC(2027, 1, 6, 15, 56)).date).toBe('2027-02-06');
  });
});
