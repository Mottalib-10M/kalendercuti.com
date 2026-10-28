/**
 * Perangkat tulis: setiap angka dan tanggal di halaman berasal dari sini, tidak pernah diketik tangan.
 *   K.P                         parameter bertanggal (params-2026.json)
 *   K.liburTahun, K.nasional …  hari libur menurut SKB (engine/libur.ts)
 *   K.optimalkan, K.longWeekend, K.hariKerja …   perencana cuti (engine/cuti.ts)
 *   K.hijriah, K.weton, K.ijtimakSetelah …       Hijriah, Jawa, ijtimak (engine/hijri.ts)
 *   K.tool(kind, lang, args, nilai)               menjalankan alat dari tool-specs.ts
 */
import P from '../data/params-2026.json';
import * as L from './engine/libur';
import * as C from './engine/cuti';
import * as H from './engine/hijri';
import { runTool, tanggalRaya } from './tool-specs';
import { LAST_UPDATED } from '../data/site-config';

export const KIT = { P, ...L, ...C, ...H, tool: runTool, raya: tanggalRaya, TGL_BACA: LAST_UPDATED };
export type Kit = typeof KIT;
