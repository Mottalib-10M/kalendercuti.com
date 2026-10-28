/** Toutes les pages prévues (id = nom du fichier de src/content/guides, ou id d'une entrée d'un fichier à plusieurs pages).
 *  Les tests acceptent un lien vers ces ids pendant la rédaction; “toutes les pages existent” échoue tant qu'il en manque. */
export const BULAN_IDS = ['libur-desember-2026', 'libur-januari-2027', 'libur-februari-2027', 'libur-maret-2027', 'libur-mei-2027', 'libur-juni-2027', 'libur-agustus-2027', 'libur-desember-2027'];
export const RAYA_IDS = ['lebaran-2027', 'puasa-2027', 'idul-adha-2027', 'imlek-2027', 'nyepi-2027', 'waisak-2027', 'paskah-2027', 'natal-2026', 'tahun-baru-islam-2027', 'maulid-nabi-2027', 'isra-mikraj-2027', 'hut-ri-2027', 'tahun-baru-2027'];
export const PLANNED_GUIDES = [
  'long-weekend-2027', 'hari-kerja-2027', 'hitung-mundur-lebaran', 'kalender-hijriah', 'weton', 'hitung-hari-kerja', 'sisa-cuti-tahunan', 'kalender-cetak',
  'libur-nasional-2027', 'libur-nasional-2026', 'cuti-bersama-2027', 'cuti-bersama-2026', 'kalender-2026',
  ...BULAN_IDS, ...RAYA_IDS,
];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, 'home', 'method', 'about', 'widget', 'contact', 'editorial', 'privacy', 'terms', 'cookies']);
