import type { Locale } from './routes';
const id = {
  updatedOn: 'Diperbarui', editorialPolicy: 'Kebijakan redaksi', contactLabel: 'Kontak', reviewedBy: 'Disusun oleh',
  skipToContent: 'Langsung ke isi', mainNav: 'Navigasi utama', breadcrumbLabel: 'Jejak halaman', breadcrumbHome: 'Beranda', menuOpen: 'Buka menu',
  faqTitle: 'Pertanyaan umum', relatedCalculators: 'Lanjutkan ke', sourcesTitle: 'Sumber resmi halaman ini', writtenBy: 'Disusun oleh',
  asOf: 'Per', lastUpdated: 'SKB libur nasional dan cuti bersama dibaca ulang pada', footerValidated: 'Sumber: SKB 3 Menteri tentang hari libur nasional dan cuti bersama 2026 dan 2027, Keppres 8/2024, UU Cipta Kerja',
  footerBrowser: 'Semua berjalan di peramban Anda · tidak ada yang Anda ketik dikirim atau disimpan · tanpa akun',
  footerDisclaimer: 'Situs independen terbitan Radif Partners, tidak terkait dengan pemerintah, kementerian, atau lembaga mana pun. Pelaksanaan cuti bersama di perusahaan swasta diatur pimpinan perusahaan; hasil alat bersifat panduan dan situs ini bukan nasihat hukum (<span lang="en">for guidance only, not legal advice</span>).',
  footerPopular: 'Alat',
  notFound: 'Tidak ada halaman di alamat ini. Di beranda ada kalender 2027 dengan tanggal merah, cuti bersama, long weekend, dan hitung mundur Lebaran.',
  readMore: 'Baca selengkapnya',
  moreOptions: 'Pilihan lain', copyLink: 'Salin tautan', copied: 'Tautan disalin', print: 'Cetak', howComputed: 'Cara menghitung', openFull: 'Buka alat lengkap',
  countdownTo: 'Menuju', days: 'hari', hours: 'jam', minutes: 'menit', seconds: 'detik', tzNote: 'Memakai jam perangkat Anda, zona waktu', passed: 'Tanggal ini sudah lewat.',
};
const en: typeof id = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Prepared by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'Keep going', sourcesTitle: 'Official sources for this page', writtenBy: 'Prepared by',
  asOf: 'As of', lastUpdated: 'joint decrees on holidays and collective leave reread on', footerValidated: 'Sources: joint ministerial decrees on national holidays and collective leave 2026 and 2027, Presidential Decree 8/2024, Job Creation Law',
  footerBrowser: 'Everything runs in your browser · nothing you type is sent or stored · no account',
  footerDisclaimer: 'Independent site published by Radif Partners, not affiliated with any government, ministry or agency. Private employers decide how collective leave applies; this site is not legal advice.',
  footerPopular: 'Tools',
  notFound: 'Nothing lives at this address. The home page has the 2027 calendar with public holidays, collective leave, long weekends and the Eid countdown.',
  readMore: 'Read more',
  moreOptions: 'More options', copyLink: 'Copy share link', copied: 'Link copied', print: 'Print', howComputed: 'How this is calculated', openFull: 'Open the full tool',
  countdownTo: 'Time left until', days: 'days', hours: 'hrs', minutes: 'min', seconds: 'sec', tzNote: 'Uses your device clock, time zone', passed: 'This date has passed.',
};
const ALL = { id, en };
export function t(lang: Locale) { return ALL[lang] ?? id; }
