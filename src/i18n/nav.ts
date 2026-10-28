import { route, hasRoute, type Locale } from './routes';
import { GUIDES, guideById } from '../lib/pages';
import { lp, type Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  id: { home: 'Kalender 2027', method: 'Metode', about: 'Tentang kami', widget: 'Pasang alat', contact: 'Kontak', editorial: 'Kebijakan redaksi', privacy: 'Privasi', terms: 'Ketentuan', cookies: 'Cookie' },
  en: { home: 'Calendar 2027', method: 'Method', about: 'About', widget: 'Embed the tools', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
};
/** `short` : judul menu atas (satu atau dua kata, RECETTE §10.3) ; `label` : judul lengkap. */
export const GROUPS: Array<{ id: Group; label: Record<Locale, string>; short: Record<Locale, string> }> = [
  { id: 'alat', label: { id: 'Alat dan perencana cuti', en: 'Tools and leave planner' }, short: { id: 'Alat', en: 'Tools' } },
  { id: 'libur', label: { id: 'Libur nasional dan cuti bersama', en: 'Holidays and collective leave' }, short: { id: 'Libur', en: 'Holidays' } },
  { id: 'bulan', label: { id: 'Tanggal merah per bulan', en: 'Holidays month by month' }, short: { id: 'Per bulan', en: 'By month' } },
  { id: 'hari-raya', label: { id: 'Hari raya dan hitung mundur', en: 'Festivals and countdowns' }, short: { id: 'Hari raya', en: 'Festivals' } },
];
export const label = (id: string, lang: Locale) => CORE[lang][id] ?? (guideById(id) ? lp(guideById(id)!, lang).nav : id);
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => GUIDES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale, short = true): NavCategory[] {
  return GROUPS.map((g) => ({ label: (short ? g.short : g.label)[lang], links: g.id === 'alat' ? [link('home', lang), ...inGroup(g.id, lang)] : inGroup(g.id, lang) })).filter((c) => c.links.length);
}
/** La Méthode n'est pas dans le menu du haut (RECETTE §10.3) : sous le titre et en bas de page. */
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => {
  const site = { label: { id: 'Situs ini', en: 'This site' }[lang], links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) };
  return [
    { label: GROUPS[1].label[lang], links: [...inGroup('libur', lang), ...inGroup('bulan', lang)] },
    { label: GROUPS[3].label[lang], links: inGroup('hari-raya', lang) },
    { label: GROUPS[0].label[lang], links: inGroup('alat', lang) },
    site,
  ];
};
/** Les outils, à un clic de toute page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => [link('home', lang), ...inGroup('alat', lang)];
