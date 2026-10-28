/**
 * Kalender tahunan: dua belas bulan, Minggu di kiri dan merah (seperti kalender cetak Indonesia), libur nasional dan
 * cuti bersama menurut SKB, dengan tanggal Hijriah atau pasaran Jawa bila dipilih.
 * Render pertama = nilai bawaan saat build; alamat yang dibagikan dibaca setelah dipasang (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { ResultCard, Rows, ShareRow } from '../calc/parts';
import { readParams, updateURL } from '../../lib/url-state';
import { liburTahun, dayNum, weekday, toIso, TAHUN_RESMI } from '../../lib/engine/libur';
import { hariKerja, longWeekend } from '../../lib/engine/cuti';
import { hijriah, pasaranIdx, PASARAN } from '../../lib/engine/hijri';
import { dLong, namaLibur, BULAN, namaHijriah } from '../../lib/tool-specs';
import { t } from '../../i18n/ui';
import type { Lang } from '../../lib/format';

interface Props { lang: Lang; year: number; methodHref?: string; idPrefix?: string; cetak?: boolean }
const TAG = (l: Lang) => (l === 'id' ? 'id-ID' : 'en-GB');
type Extra = 'none' | 'hijriah' | 'pasaran';

export default function Kalender({ lang, year: y0, methodHref, idPrefix = 'k', cetak = false }: Props) {
  const ui = t(lang), T = (id: string, en: string) => (lang === 'id' ? id: en);
  const [year, setYear] = useState(y0);
  const [extra, setExtra] = useState<Extra>('none');
  const [cb, setCb] = useState<'tandai' | 'sembunyi'>('tandai');
  useEffect(() => {
    const u = readParams(window.location.search);
    const y = Number(u.get('tahun')); if (TAHUN_RESMI.includes(y)) setYear(y);
    const e = u.get('extra') as Extra | null; if (e === 'hijriah' || e === 'pasaran') setExtra(e);
    if (u.get('cb') === 'sembunyi') setCb('sembunyi');
  }, []);
  useEffect(() => updateURL({ tahun: year, extra, cb }), [year, extra, cb]);
  const list = useMemo(() => liburTahun(year).filter((x) => cb === 'tandai' || x.jenis === 'nasional'), [year, cb]);
  const byDate = useMemo(() => { const m = new Map<string, typeof list>(); for (const x of list) m.set(x.date, [...(m.get(x.date) ?? []), x]); return m; }, [list]);
  const hk = useMemo(() => hariKerja(year).reduce((a, b) => a + b, 0), [year]);
  const lw = useMemo(() => longWeekend(year).length, [year]);
  const nas = list.filter((x) => x.jenis === 'nasional').length, cut = list.filter((x) => x.jenis === 'cuti').length;
  const head = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2027, 1, 7 + i)).toLocaleDateString(TAG(lang), { weekday: 'short', timeZone: 'UTC' }).replace('.', ''));
  const months = Array.from({ length: 12 }, (_, m) => {
    const first = dayNum(year, m + 1, 1), last = dayNum(year, m + 2, 1) - 1;
    const cells: Array<number | null> = [...Array(weekday(first)).fill(null)];
    for (let d = first; d <= last; d++) cells.push(d);
    while (cells.length % 7) cells.push(null);
    const weeks: Array<Array<number | null>> = []; for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    const h1 = hijriah(toIso(first)), h2 = hijriah(toIso(last));
    return { name: BULAN(lang)[m], weeks, hij: h1.hm === h2.hm ? `${namaHijriah(h1.hm, lang)} ${h1.hy}` : `${namaHijriah(h1.hm, lang)} – ${namaHijriah(h2.hm, lang)} ${h2.hy}` };
  });
  const sub = (d: number) => { const iso = toIso(d); if (extra === 'hijriah') return String(hijriah(iso).hd); if (extra === 'pasaran') return PASARAN[pasaranIdx(iso)]; return ''; };
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="no-print grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]">
        <form className="grid content-start grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-tahun`} label={T('Tahun', 'Year')} value={String(year)} onChange={(v) => setYear(Number(v))} options={TAHUN_RESMI.map((x) => ({ value: String(x), label: String(x) }))} />
          <SelectField id={`${idPrefix}-extra`} label={T('Keterangan di bawah tanggal', 'Shown under each date')} value={extra} onChange={(v) => setExtra(v as Extra)} options={[{ value: 'none', label: T('Tidak ada', 'Nothing') }, { value: 'hijriah', label: T('Tanggal Hijriah', 'Hijri date') }, { value: 'pasaran', label: T('Pasaran Jawa', 'Javanese market day') }]} />
          <SelectField id={`${idPrefix}-cb`} label={T('Cuti bersama', 'Collective leave')} value={cb} onChange={(v) => setCb(v as 'tandai' | 'sembunyi')} options={[{ value: 'tandai', label: T('Tandai di kalender', 'Mark on the calendar') }, { value: 'sembunyi', label: T('Hanya libur nasional', 'National holidays only') }]} />
        </form>
        <ResultCard label={T(`Kalender ${year} Indonesia`, `Indonesia calendar ${year}`)} value={T(`${nas} libur nasional`, `${nas} national holidays`)} sub={cb === 'tandai' ? T(`ditambah ${cut} cuti bersama`, `plus ${cut} collective leave days`): undefined}>
          <Rows rows={[[T('Hari kerja (5 hari, cuti bersama libur)', 'Working days (5-day week, leave off)'), String(hk)], [T('Long weekend tanpa cuti', 'Long weekends with no leave'), String(lw)]]} />
          <ShareRow methodHref={methodHref} labels={ui} />
        </ResultCard>
      </div>
      {cetak && <h2 className="mt-4 hidden text-xl font-bold print:block">{T(`Kalender ${year} — tanggal merah dan cuti bersama`, `Calendar ${year}: holidays and collective leave`)}</h2>}
      <div className="kal-grid mt-6">
        {months.map((mo) => (
          <table key={mo.name}>
            <caption className="mb-1 text-left text-sm font-semibold text-navy-900">{mo.name} {year} <span className="font-normal text-navy-600">· {mo.hij}</span></caption>
            <thead><tr>{head.map((h, i) => <th key={h} scope="col" className={`font-medium ${i === 0 ? 'text-accent-700' : 'text-navy-700'}`}>{h}</th>)}</tr></thead>
            <tbody>{mo.weeks.map((w, i) => (
              <tr key={i}>{w.map((d, j) => {
                if (d === null) return <td key={j} />;
                const iso = toIso(d), f = byDate.get(iso);
                const cls = f ? (f.some((x) => x.jenis === 'nasional') ? 'ft' : 'tf'): j === 0 ? 'we' : '';
                const s = sub(d);
                return <td key={j} className={cls} title={f ? f.map((x) => x.name[lang]).join(' · '): undefined}>{new Date(d * 864e5).getUTCDate()}{s && <span className="hj">{s}</span>}</td>;
              })}</tr>
            ))}</tbody>
          </table>
        ))}
      </div>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy-700"><span><span className="mr-1 inline-block h-3 w-3 rounded bg-accent-100 align-middle" aria-hidden="true" />{T('libur nasional', 'national holiday')}</span><span><span className="mr-1 inline-block h-3 w-3 rounded bg-navy-100 align-middle" aria-hidden="true" />{T('cuti bersama', 'collective leave')}</span><span className="text-accent-700">{T('Minggu', 'Sunday')}</span></p>
      <ul className="mt-4 grid gap-x-6 gap-y-1 text-sm text-navy-800 sm:grid-cols-2">
        {list.map((f) => <li key={f.date + f.jenis}><span className="tabular-nums">{dLong(f.date, lang)}</span> · {namaLibur(f, lang)}{f.jenis === 'cuti' ? ` (${T('cuti bersama', 'collective leave')})` : ''}</li>)}
      </ul>
    </div>
  );
}
