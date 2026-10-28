import { makeRouter, type RouteDef } from './routes-core';
import { GUIDES } from '../lib/pages';
/** Bahasa Indonesia dulu, bahasa Inggris di setiap halaman (RECETTE : bahasa lokal + Inggris). */
export const LOCALES = ['id', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'id';
const R = (id: string, idn: string, en: string, noindex = false) => ({ id, paths: { id: `/id/${idn}/`, en: `/en/${en}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { id: '/id/', en: '/en/' } },
  R('method', 'metode', 'method'),
  R('about', 'about', 'about'),
  R('widget', 'widget', 'widget', true),
  R('contact', 'kontak', 'contact', true),
  R('editorial', 'kebijakan-redaksi', 'editorial-policy', true),
  R('privacy', 'privacy-policy', 'privacy', true),
  R('terms', 'legal', 'legal-notice', true),
  R('cookies', 'cookie', 'cookies', true),
];
const G = (g: (typeof GUIDES)[number]): RouteDef<Locale> => ({ id: g.id, paths: { id: `/id/${g.idn.slug}/`, en: `/en/${g.en.slug}/` } });
export const ROUTES: RouteDef<Locale>[] = [CORE[0], ...GUIDES.map(G), ...CORE.slice(1)];
export const { NOINDEX_PATHS, route, hasRoute, altPaths } = makeRouter(LOCALES, ROUTES);
