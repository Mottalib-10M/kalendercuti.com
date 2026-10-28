/** llms.txt (RECETTE §21), généré à partir du registre des pages. */
import { GUIDES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { KIT as K } from '../lib/kit';
export function GET() {
  const p4 = K.optimalkan(2027, 4), hk = K.hariKerja(2027).reduce((a, b) => a + b, 0);
  const lebaran = K.raya('idul-fitri', 2027)!.date, adha = K.raya('idul-adha', 2027)!.date, puasa = K.raya('puasa', 2027)!.date;
  const lines = [
    `# ${SITE_NAMES.id}`, '',
    `> Indonesia public holiday calendar (kalender libur nasional dan cuti bersama) for 2026 and 2027, in Indonesian and English. Dates are taken from the annexes of the three-minister joint decrees (SKB ${K.SKB[2027].nomor} for 2027, signed ${K.SKB[2027].ditetapkan}; SKB ${K.SKB[2026].nomor} for 2026), checked against the weekday column of each annex (read on ${K.P.retrieved_at}). 2027: ${K.nasional(2027).length} national holidays and ${K.cutiBersama(2027).length} collective leave days; Idul Fitri 1448 H on ${lebaran}, Idul Adha on ${adha}; start of Ramadan 1448 H about ${puasa} (estimate, set by the isbat session). Easter by Gauss's formula, cross-checked over 1600-2600. Leave planner: exact dynamic programming over the year's working blocks; example 2027, ${p4.cuti} leave days give ${p4.libur} days off. ${hk} working days in 2027 (five-day week, collective leave off). Hijri dates follow the decree, otherwise Umm al-Qura; Javanese pasaran anchored on 17 August 1945 (Jumat Legi). 2028 decree not yet published. Everything runs in the browser; nothing entered is sent. Independent site by Radif Partners; no travel or affiliate offers; no school or regional holidays. Last updated ${LAST_UPDATED}.`, '',
    '## Kalender 2027', `- [Kalender 2027](${SITE_URL}${route('home', 'id')})`, `- [Indonesia calendar 2027](${SITE_URL}${route('home', 'en')})`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label.en} / ${g.label.id}`, ...GUIDES.filter((p) => p.group === g.id).flatMap((p) => [
      `- [${p.idn.nav}](${SITE_URL}${route(p.id, 'id')}): ${p.idn.card}`,
      `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`,
    ]), '']),
    '## About', `- [Metode](${SITE_URL}${route('method', 'id')})`, `- [Method](${SITE_URL}${route('method', 'en')})`, `- [Tentang kami](${SITE_URL}${route('about', 'id')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
