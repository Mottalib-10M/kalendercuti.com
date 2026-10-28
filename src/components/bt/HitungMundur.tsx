/**
 * Hitung mundur hari raya: pilih hari raya, lihat sisa hari, jam, menit dan detik menuju pukul 00.00 WIB, dan daftar
 * semua hari raya berikutnya. Render pertama = hari build (__BUILD_DAY__); jam perangkat mengambil alih setelah dipasang.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { ResultCard, Rows, ShareRow } from '../calc/parts';
import { readParams, updateURL } from '../../lib/url-state';
import { tanggalRaya, NAMA_RAYA, dWeek, type Raya } from '../../lib/tool-specs';
import { t } from '../../i18n/ui';
import type { Lang } from '../../lib/format';

interface Props { lang: Lang; def?: string; methodHref?: string; idPrefix?: string }
const LIST: Raya[] = ['idul-fitri', 'puasa', 'idul-adha', 'natal', 'tahun-baru', 'imlek', 'nyepi', 'paskah', 'waisak', 'muharam', 'maulid', 'kemerdekaan', 'isra-mikraj'];
const wib0 = (iso: string) => Date.parse(`${iso}T00:00:00+07:00`);

export default function HitungMundur({ lang, def = 'idul-fitri', methodHref, idPrefix = 'hm' }: Props) {
  const ui = t(lang), T = (id: string, en: string) => (lang === 'id' ? id: en);
  const [now, setNow] = useState<number>(() => Date.parse(`${__BUILD_DAY__}T00:00:00Z`));
  const [pick, setPick] = useState<Raya>(def as Raya);
  useEffect(() => {
    setNow(Date.now());
    const u = readParams(window.location.search).get('hari') as Raya | null; if (u && LIST.includes(u)) setPick(u);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => updateURL({ hari: pick }), [pick]);
  const events = useMemo(() => LIST.map((r) => {
    for (const y of [2026, 2027, 2028]) { const x = tanggalRaya(r, y); if (x && wib0(x.date) + 864e5 > now) return { r, ...x }; }
    return null;
  }).filter((e): e is NonNullable<typeof e> => !!e).sort((a, b) => a.date.localeCompare(b.date)), [Math.floor(now / 36e5)]);
  const ev = events.find((e) => e.r === pick) ?? events[0];
  const left = ev ? wib0(ev.date) - now: 0;
  const s = Math.max(0, Math.floor(left / 1000)), d = Math.floor(s / 86400);
  const st = (x: string) => (x === 'resmi' ? T('resmi (SKB)', 'official (decree)'): x === 'hitung' ? T('dihitung', 'computed'): T('perkiraan', 'estimate'));
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]">
        <form className="grid content-start grid-cols-1 gap-x-4 gap-y-3" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-hari`} label={T('Hari raya', 'Festival')} value={pick} onChange={(v) => setPick(v as Raya)} options={LIST.map((r) => ({ value: r, label: NAMA_RAYA(r, lang) }))} />
        </form>
        {ev && (
          <ResultCard label={T(`Berapa hari lagi ${NAMA_RAYA(ev.r, lang)}?`, `How long until ${NAMA_RAYA(ev.r, lang)}?`)} value={left > 0 ? T(`${d} hari lagi`, `${d} days`): T('Hari ini', 'Today')} sub={`${dWeek(ev.date, lang)} · ${st(ev.status)}`}>
            <Rows rows={[[T('Jam', 'Hours'), String(Math.floor((s % 86400) / 3600))], [T('Menit', 'Minutes'), String(Math.floor((s % 3600) / 60))], [T('Detik', 'Seconds'), String(s % 60)], [T('Total jam', 'Total hours'), new Intl.NumberFormat(lang === 'id' ? 'id-ID' : 'en-GB').format(Math.floor(s / 3600))]]} />
            <ShareRow methodHref={methodHref} labels={ui} />
          </ResultCard>
        )}
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <caption className="mb-2 text-left text-sm text-navy-700">{T('Hari raya berikutnya, dari yang terdekat (00.00 WIB)', 'Upcoming festivals, nearest first (midnight WIB)')}</caption>
          <thead><tr><th scope="col" className="border-b border-navy-300 px-2 py-1.5 text-left font-semibold text-navy-900">{T('Hari raya', 'Festival')}</th><th scope="col" className="border-b border-navy-300 px-2 py-1.5 text-left font-semibold text-navy-900">{T('Tanggal', 'Date')}</th><th scope="col" className="border-b border-navy-300 px-2 py-1.5 text-right font-semibold text-navy-900">{T('Hari lagi', 'Days left')}</th><th scope="col" className="border-b border-navy-300 px-2 py-1.5 text-left font-semibold text-navy-900">Status</th></tr></thead>
          <tbody>{events.map((e) => <tr key={e.r}><td className="border-b border-navy-100 px-2 py-1.5 text-navy-800">{NAMA_RAYA(e.r, lang)}</td><td className="tabular-nums border-b border-navy-100 px-2 py-1.5 text-navy-800">{dWeek(e.date, lang)}</td><td className="tabular-nums border-b border-navy-100 px-2 py-1.5 text-right text-navy-800">{Math.max(0, Math.ceil((wib0(e.date) - now) / 864e5))}</td><td className="border-b border-navy-100 px-2 py-1.5 text-navy-800">{st(e.status)}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
