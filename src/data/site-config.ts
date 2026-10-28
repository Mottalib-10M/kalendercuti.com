/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://kalendercuti.com";
export const SITE_NAMES: Record<string, string> = {"id": "Kalender Cuti", "en": "Kalender Cuti"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), “” pour aucune.
export const BRAND_ACCENT = "Kalender";
/** Locale des nombres et des dates : anglais britannique pour la version anglaise. */
export const NUM_TAGS: Record<string, string> = {"id": "id-ID", "en": "en-GB"};
export const LANG_TAGS: Record<string, string> = {"id": "id-ID", "en": "en-ID"};
export const OG_LOCALES: Record<string, string> = {"id": "id_ID", "en": "en_GB"};
export const LOCALE_TAG = 'id-ID';
export const CURRENCY = 'IDR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-28';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"id": "Penerbit independen kalender hari libur Indonesia yang membaca langsung SKB tiga menteri tentang hari libur nasional dan cuti bersama", "en": "Independent publisher of an Indonesian public holiday calendar built from the joint ministerial decrees on national holidays and collective leave"};
export const AUTHOR_DESC: Record<string, string> = {"id": "Radif Partners adalah penerbit independen, tidak terkait dengan pemerintah, kementerian, atau perusahaan mana pun. Untuk Kalender Cuti kami membaca naskah resmi SKB Menteri Agama, Menteri Ketenagakerjaan, dan Menteri PANRB tentang hari libur nasional dan cuti bersama 2026 dan 2027, serta Keppres Nomor 8 Tahun 2024 tentang Hari-Hari Libur. Tanggal Paskah dihitung dengan algoritme yang diuji, dan semua hitungan berjalan di peramban Anda. Tidak ada yang Anda ketik yang dikirim ke mana pun.", "en": "Radif Partners is an independent publisher with no tie to any government, ministry or company. For Kalender Cuti we read the official text of the joint decrees of the Ministers of Religious Affairs, Manpower and Administrative Reform on national holidays and collective leave for 2026 and 2027, and Presidential Decree 8 of 2024 on public holidays. Easter is computed by a tested algorithm, and every calculation runs in your browser. Nothing you type is sent anywhere."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"id": ["Hari libur nasional Indonesia", "Cuti bersama menurut SKB 3 Menteri", "Penetapan awal Ramadan, Idul Fitri, dan Idul Adha", "Perhitungan hari kerja dan long weekend", "Kalender Hijriah dan pasaran Jawa"], "en": ["Indonesian national public holidays", "Collective leave under the joint ministerial decree", "How the start of Ramadan, Eid al-Fitr and Eid al-Adha is set", "Counting working days and long weekends", "The Hijri calendar and the Javanese market week"]};
export const CONTACT_EMAIL = "contact@kalendercuti.com";
export const THEME_COLOR = '#B91C1C';
export const LOGO_SYMBOL = '31';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = '2199530b96c1c572465c351d344f5ae1';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "Prancis / France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "VAT",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city']; // legalForm vide à dessein, comme les autres sites du portefeuille

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
