/** Beranda, bahasa Indonesia dan Inggris. Tanggal dan angka: mesin (src/lib/engine) lewat KIT, tidak pernah diketik tangan. */
import { KIT as K } from '../lib/kit';
import type { FAQ, Helpers } from '../lib/page-types';
import { dWeek, dLong } from '../lib/tool-specs';
import { tabelTahun } from '../lib/bausteine';

interface HomeLang {
  title: string; description: string; h1: string; intro: string; resume: string;
  facts: Array<{ k: string; v: string }>; toolsTitle: string; foldTitle: string; faqs: FAQ[];
  why: (h: Helpers) => string; sections: (h: Helpers) => Array<{ title: string; html: string }>;
}
const Y = 2027;
const nas = K.nasional(Y), cb = K.cutiBersama(Y), kerja = K.diHariKerja(nas).length;
const lw = K.longWeekend(Y), top = lw.reduce((a, b) => (b.hari > a.hari ? b: a));
const o1 = K.optimalkan(Y, 1), o4 = K.optimalkan(Y, 4), o8 = K.optimalkan(Y, 8);
const hk = K.hariKerja(Y).reduce((a, b) => a + b, 0), hk26 = K.hariKerja(2026).reduce((a, b) => a + b, 0);
const leb = K.raya('idul-fitri', Y)!.date, adha = K.raya('idul-adha', Y)!.date, puasa = K.raya('puasa', Y)!.date;
const tg = (id: Parameters<typeof K.tanggalHari>[1]) => K.tanggalHari(Y, id)!;
const I = (iso: string) => dWeek(iso, 'id'), E = (iso: string) => dWeek(iso, 'en');
const MIN = K.P.cuti_tahunan.min_hari;

const id: HomeLang = {
  title: 'Kalender 2027 lengkap: tanggal merah, cuti bersama, Hijriah',
  description: `Kalender 2027 Indonesia dengan ${nas.length} tanggal merah dan ${cb.length} cuti bersama resmi SKB, tanggal Hijriah dan Jawa, long weekend, perencana cuti dan hitung mundur Lebaran.`,
  h1: 'Kalender 2027 dengan tanggal merah dan cuti bersama',
  intro: 'Dua belas bulan 2027 dengan libur nasional dan cuti bersama menurut SKB tiga menteri. Tampilkan tanggal Hijriah atau pasaran Jawa, lalu cetak bila perlu.',
  resume: `Kalender 2027 Indonesia memuat ${nas.length} hari libur nasional dan ${cb.length} hari cuti bersama, sesuai SKB Menteri Agama, Menteri Ketenagakerjaan dan Menteri PANRB yang ditandatangani pada ${dLong(K.SKB[Y].ditetapkan, 'id')}. Dari ${nas.length} tanggal merah itu, ${kerja} jatuh pada hari kerja dan ${nas.length - kerja} pada Sabtu atau Minggu. Idul Fitri 1448 H jatuh pada ${I(leb)} dan Kamis 11 Maret, sehingga dengan Nyepi pada 8 Maret dan tiga hari cuti bersama, libur Lebaran 2027 berlangsung ${top.hari} hari, dari ${dLong(top.dari, 'id')} sampai ${dLong(top.sampai, 'id')}. Idul Adha jatuh pada ${I(adha)}, Natal pada Sabtu 25 Desember, dan Isra Mikraj diperingati dua kali, pada 5 Januari dan 26 Desember. Awal puasa diperkirakan ${I(puasa)}, menunggu sidang isbat. Pekerja lima hari seminggu punya ${hk} hari kerja. Cuti paling menguntungkan adalah ${I(o1.blok[0].cutiDari)} : satu hari cuti memberi ${o1.libur} hari libur berturut-turut.`,
  facts: [
    { k: 'Libur nasional 2027', v: `${nas.length} hari` },
    { k: 'Cuti bersama 2027', v: `${cb.length} hari` },
    { k: 'Idul Fitri 1448 H', v: dLong(leb, 'id') },
    { k: 'Hari kerja 2027', v: `${hk} hari` },
    { k: 'Libur terpanjang tanpa cuti', v: `${top.hari} hari` },
  ],
  toolsTitle: 'Alat lain untuk libur, cuti dan tanggal',
  foldTitle: 'Memahami kalender libur Indonesia',
  faqs: [
    { q: 'Berapa total tanggal merah di kalender 2027?', a: `${nas.length} hari libur nasional dan ${cb.length} hari cuti bersama, jadi ${nas.length + cb.length} hari bertanda di kalender. Tidak semuanya menambah hari libur: ${nas.length - kerja} libur nasional jatuh pada Sabtu atau Minggu. Bagi pekerja lima hari seminggu, libur nasional dan cuti bersama mengurangi ${K.hariKerjaKotor(Y) - hk} hari kerja.` },
    { q: 'Apa beda libur nasional dan cuti bersama?', a: 'Libur nasional adalah hari libur resmi bagi semua orang, ditetapkan Keppres dan SKB. Cuti bersama adalah hari kerja yang diliburkan bersama-sama, biasanya di samping libur nasional, dan mengurangi hak cuti tahunan. Bagi swasta, pelaksanaan cuti bersama ditentukan pimpinan perusahaan. Kalender di atas menandai libur nasional merah dan cuti bersama abu-abu.' },
    { q: 'Kapan SKB libur nasional 2027 ditetapkan?', a: `SKB tentang hari libur nasional dan cuti bersama 2027 ditandatangani pada ${dLong(K.SKB[Y].ditetapkan, 'id')} oleh Menteri Agama, Menteri Ketenagakerjaan dan Menteri PANRB, dengan Nomor ${K.SKB[Y].nomor}. Naskahnya diunggah di laman Kemenko PMK.` },
    { q: 'Kalender 2027 dimulai hari apa?', a: 'Jumat 1 Januari 2027, yang juga libur Tahun Baru Masehi. Tahun 2027 adalah tahun biasa dengan 365 hari, sehingga berakhir pada Jumat 31 Desember. Tahun 2028 dimulai pada Sabtu dan merupakan tahun kabisat. Kalender di atas menampilkan seluruh minggu sepanjang tahun 2027.' },
    { q: 'Apakah tanggal Hijriah di kalender ini sama dengan kalender Kemenag?', a: 'Untuk bulan-bulan yang memuat hari raya, kami memakai tanggal yang tersirat dalam SKB, yang disusun bersama Kementerian Agama. Untuk bulan lain kami memakai perhitungan Umm al-Qura dan menandainya sebagai perhitungan. Selisih satu hari dengan kalender lain bisa terjadi pada bulan-bulan itu.' },
    { q: 'Apakah saya bisa memasang kalender ini di situs kantor?', a: 'Bisa, gratis. Halaman pasang alat menyediakan kode sematan untuk kalender 2027 dan perencana cuti. Kalender yang dipasang mengikuti pembaruan di situs ini, sehingga SKB perubahan langsung terlihat tanpa Anda mengubah apa pun di situs Anda. Tidak perlu mendaftar atau meminta izin terlebih dahulu.' },
    { q: 'Apakah data yang saya masukkan disimpan?', a: 'Tidak. Semua hitungan, termasuk perencana cuti, weton dan hari kerja, berjalan di peramban Anda. Tidak ada akun, formulir atau server yang menerima isian Anda. Pilihan Anda hanya ditulis ke alamat halaman agar tautannya bisa dibagikan. Menutup halaman berarti isian Anda hilang dari perangkat, kecuali tautan yang Anda simpan.' },
  ],
  why: (h) => `<h2>Semua libur nasional dan cuti bersama 2027</h2>
<p>Tabel ini adalah isi lampiran A dan B ${h.src('skb-2027', 'SKB 2027')}, diurutkan menurut tanggal. Setiap tanggal diperiksa otomatis terhadap kolom nama hari di naskah resmi sebelum situs diterbitkan.</p>
${tabelTahun(h, Y)}
<p>Hari-hari libur itu sendiri ditetapkan dalam ${h.src('keppres-8-2024', 'Keppres Nomor 8 Tahun 2024')}. SKB setiap tahun menentukan tanggal persisnya, terutama untuk hari raya yang mengikuti kalender bulan, dan menambahkan cuti bersama. Hak cuti tahunan yang dipotong cuti bersama diatur dalam ${h.src('uu-6-2023', 'UU Nomor 6 Tahun 2023')} : paling sedikit ${MIN} hari kerja setelah dua belas bulan bekerja.</p>
<h2>Tahun dengan dua Isra Mikraj dan Lebaran yang panjang</h2>
<p>Tahun 2027 punya satu tanggal merah lebih banyak dari 2026. Penyebabnya Isra Mikraj, yang jatuh pada ${h.wday(tg('isra-mikraj'))} untuk tahun 1448 H dan kembali pada ${h.wday('2027-12-26')} untuk tahun 1449 H. Kalender Hijriah sekitar sebelas hari lebih pendek dari kalender Masehi, sehingga setiap hari raya Islam sesekali muncul dua kali dalam satu tahun Masehi.</p>
<p>Libur Lebaran 2027 juga lebih panjang dari 2026. Nyepi jatuh pada Senin 8 Maret, dua hari sebelum Idul Fitri, dan cuti bersama pada 9, 12 dan 15 Maret menutup semua celah. Hasilnya ${top.hari} hari libur berturut-turut tanpa cuti pribadi. Pada 2026 libur Lebaran berlangsung tujuh hari.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: Y, cuti: 4 }, c: 'Rencanakan long weekend 2027' })}
<p>Perencana di atas memilih tanggal cuti yang memberi hari libur terbanyak. Dengan empat hari cuti, Anda mendapat ${o4.libur} hari libur; dengan delapan, ${o8.libur}. Rincian setiap blok ada di ${h.a('long-weekend-2027', 'long weekend 2027')}.</p>`,
  sections: (h) => [
    { title: 'Libur 2027 bulan demi bulan', html: `<p><strong>Januari.</strong> Tahun Baru jatuh pada Jumat 1 Januari dan Isra Mikraj pada Selasa 5 Januari. Satu hari cuti pada Senin 4 Januari memberi lima hari libur. Lihat ${h.a('libur-januari-2027', 'libur Januari 2027')}.</p>
<p><strong>Februari.</strong> Imlek 2578 Kongzili jatuh pada Sabtu 6 Februari, dengan cuti bersama pada Jumat 5 Februari. Puasa Ramadan diperkirakan dimulai Senin 8 Februari. Lihat ${h.a('libur-februari-2027', 'libur Februari 2027')}.</p>
<p><strong>Maret.</strong> Bulan terpadat: Nyepi, Idul Fitri, Wafat Yesus Kristus pada Jumat 26 Maret, Paskah pada Minggu 28 Maret dan empat cuti bersama. Hanya ${K.hariKerja(Y)[2]} hari kerja. Lihat ${h.a('libur-maret-2027', 'libur Maret 2027')}.</p>
<p><strong>April.</strong> Tidak ada tanggal merah; ${K.hariKerja(Y)[3]} hari kerja.</p>
<p><strong>Mei.</strong> Hari Buruh jatuh pada Sabtu. Kenaikan Yesus Kristus pada Kamis 6 Mei, Idul Adha pada Senin 17 Mei, Waisak pada Kamis 20 Mei, dengan cuti bersama 18 dan 19 Mei. Jumat 21 Mei adalah jembatan terbaik tahun ini. Lihat ${h.a('libur-mei-2027', 'libur Mei 2027')}.</p>
<p><strong>Juni.</strong> Hari Lahir Pancasila jatuh pada Selasa 1 Juni dan Tahun Baru Islam 1449 H pada Minggu 6 Juni. Lihat ${h.a('libur-juni-2027', 'libur Juni 2027')}.</p>
<p><strong>Juli.</strong> Tidak ada tanggal merah; ${K.hariKerja(Y)[6]} hari kerja.</p>
<p><strong>Agustus.</strong> Maulid Nabi jatuh pada Minggu 15 Agustus dan HUT RI ke-82 pada Selasa 17 Agustus. Lihat ${h.a('libur-agustus-2027', 'libur Agustus 2027')}.</p>
<p><strong>September sampai November.</strong> Tiga bulan tanpa libur nasional dan tanpa cuti bersama.</p>
<p><strong>Desember.</strong> Cuti bersama pada Jumat 24 Desember, Natal pada Sabtu 25 dan Isra Mikraj pada Minggu 26 Desember. Lihat ${h.a('libur-desember-2027', 'libur Desember 2027')}.</p>` },
    { title: 'Cara membaca kalender di atas', html: `<p>Angka merah adalah libur nasional, kotak abu-abu adalah cuti bersama, dan setiap Minggu ditulis merah seperti kalender dinding. Arahkan kursor atau ketuk tanggal untuk melihat nama hari liburnya. Pilihan “Hijriah” menampilkan tanggal Hijriah di bawah setiap tanggal Masehi; pilihan “pasaran Jawa” menampilkan Legi, Pahing, Pon, Wage atau Kliwon.</p>
<p>Tanggal Hijriah berganti saat matahari terbenam. Kalender ini menampilkan tanggal yang berlaku pada siang hari. Untuk bulan Ramadan, Syawal dan Zulhijah, tanggalnya mengikuti SKB; tanggal pasti tetap menunggu sidang isbat, seperti dijelaskan di ${h.a('kalender-hijriah', 'kalender Hijriah 2027')} dan ${h.a('puasa-2027', 'awal puasa 2027')}.</p>
<p>Untuk versi kertas, gunakan ${h.a('kalender-cetak', 'kalender 2027 untuk dicetak')} : dua belas bulan dalam satu halaman A4, tanpa iklan.</p>` },
    { title: 'Cuti bersama, ASN dan karyawan swasta', html: `<p>Cuti bersama berlaku bagi aparatur sipil negara sesuai ketentuan kepegawaian. Bagi karyawan swasta, SKB menyerahkan pelaksanaannya kepada pimpinan perusahaan. Akibatnya dua karyawan bisa mendapat jumlah hari libur yang berbeda pada tahun yang sama. Semua alat di situs ini punya pilihan “cuti bersama: tetap kerja” untuk keadaan itu.</p>
<p>Karena cuti bersama mengurangi hak cuti tahunan, pekerja dengan hak minimal ${MIN} hari yang perusahaannya menerapkan semua cuti bersama 2027 hanya memegang ${MIN - cb.length} hari untuk diatur sendiri. Hitung angka Anda di ${h.a('sisa-cuti-tahunan', 'sisa cuti tahunan')}.</p>` },
    { title: 'Hari kerja 2027 dan 2026', html: `<p>Dengan lima hari kerja seminggu dan cuti bersama sebagai libur, 2027 punya ${hk} hari kerja dan 2026 punya ${hk26}. Selisihnya kecil walaupun 2027 punya satu libur nasional lebih banyak, karena lebih banyak libur 2027 jatuh pada akhir pekan. Angka per bulan untuk pola lima dan enam hari ada di ${h.a('hari-kerja-2027', 'hari kerja 2027')}, dan hitungan antara dua tanggal di ${h.a('hitung-hari-kerja', 'kalkulator hari kerja')}.</p>
<p>Untuk sisa 2026, libur yang tersisa adalah cuti bersama Kamis 24 Desember dan Natal Jumat 25 Desember. Kalender 2026 lengkap ada di ${h.a('kalender-2026', 'kalender 2026')}.</p>` },
    { title: 'Tahun 2028: yang sudah pasti', html: `<p>SKB 2028 belum terbit; berdasarkan dua tahun terakhir, naskahnya kemungkinan ditandatangani sekitar September 2027. Yang sudah pasti adalah libur bertanggal tetap: Tahun Baru pada Sabtu 1 Januari, Hari Buruh pada Senin 1 Mei, Hari Lahir Pancasila pada Kamis 1 Juni, Hari Kemerdekaan pada Kamis 17 Agustus, dan Natal pada Senin 25 Desember 2028. Paskah 2028 jatuh pada 16 April menurut perhitungan.</p>
<p>Hari raya Islam 2028 bergeser sekitar sebelas hari lebih awal: Idul Fitri sekitar akhir Februari dan Idul Adha sekitar awal Mei 2028. Kami menampilkannya sebagai perkiraan di halaman masing-masing dan menggantinya dengan tanggal resmi begitu SKB 2028 diunggah. Sidang isbat tetap menjadi penentu akhir untuk awal Ramadan, Syawal dan Zulhijah, seperti pada ${h.src('setkab-isbat', 'penetapan tahun-tahun sebelumnya')}.</p>` },
  ],
};

const en: HomeLang = {
  title: 'Calendar 2027 Indonesia: holidays and collective leave days',
  description: `Indonesia calendar 2027 with all ${nas.length} public holidays and ${cb.length} collective leave days from the decree, Hijri and Javanese dates, long weekends and an Eid countdown.`,
  h1: 'Indonesia calendar 2027 with public holidays and collective leave',
  intro: 'All twelve months of 2027 with national holidays and collective leave under the three-minister decree. Show Hijri dates or the Javanese pasaran, then print if you like.',
  resume: `The 2027 Indonesia calendar has ${nas.length} national holidays and ${cb.length} collective leave days, as set by the joint decree of the Ministers of Religious Affairs, Manpower and Administrative Reform signed on ${dLong(K.SKB[Y].ditetapkan, 'en')}. Of the ${nas.length} holidays, ${kerja} fall on a weekday and ${nas.length - kerja} on a Saturday or Sunday. Eid al-Fitr 1448 falls on ${E(leb)} and Thursday 11 March, so with Nyepi on 8 March and three collective leave days the 2027 Eid break lasts ${top.hari} days, from ${dLong(top.dari, 'en')} to ${dLong(top.sampai, 'en')}. Eid al-Adha falls on ${E(adha)}, Christmas on Saturday 25 December, and Isra Mi'raj is observed twice, on 5 January and 26 December. Ramadan is expected to start on ${E(puasa)}, pending the isbat session. Workers on a five-day week have ${hk} working days. The most rewarding leave day is ${E(o1.blok[0].cutiDari)}: one day of leave gives ${o1.libur} days off in a row.`,
  facts: [
    { k: 'National holidays 2027', v: `${nas.length} days` },
    { k: 'Collective leave 2027', v: `${cb.length} days` },
    { k: 'Eid al-Fitr 1448', v: dLong(leb, 'en') },
    { k: 'Working days 2027', v: `${hk} days` },
    { k: 'Longest break without leave', v: `${top.hari} days` },
  ],
  toolsTitle: 'More tools for holidays, leave and dates',
  foldTitle: 'Understanding the Indonesian holiday calendar',
  faqs: [
    { q: 'How many red dates are on the 2027 Indonesia calendar?', a: `${nas.length} national holidays and ${cb.length} collective leave days, so ${nas.length + cb.length} marked days. Not all of them add a day off: ${nas.length - kerja} national holidays fall on a Saturday or Sunday. For five-day workers, national holidays and collective leave remove ${K.hariKerjaKotor(Y) - hk} working days.` },
    { q: 'What is the difference between a national holiday and collective leave?', a: 'A national holiday is an official day off for everyone, set by presidential decree and the joint decree. Collective leave is a working day taken off together, usually next to a national holiday, and it is deducted from annual leave. For private employers, applying collective leave is up to management.' },
    { q: 'When was the 2027 holiday decree issued?', a: `The joint decree on 2027 national holidays and collective leave was signed on ${dLong(K.SKB[Y].ditetapkan, 'en')} by the Ministers of Religious Affairs, Manpower and Administrative Reform, numbered ${K.SKB[Y].nomor}. The text is published on the Coordinating Ministry's website.` },
    { q: 'What day does 2027 start on?', a: 'Friday 1 January 2027, which is also the New Year holiday. 2027 is a common year of 365 days, so it ends on Friday 31 December. 2028 starts on a Saturday and is a leap year. The calendar above shows every week of the year.' },
    { q: 'Are the Hijri dates on this calendar the same as the Ministry\'s?', a: 'For months that contain a holiday we use the dates implied by the decree, which is drawn up with the Ministry of Religious Affairs. For other months we use the Umm al-Qura computation and mark it as such. A one-day difference from other calendars can occur in those months.' },
    { q: 'Can I embed this calendar on my office website?', a: 'Yes, free of charge. The embed page provides code for the 2027 calendar and the leave planner. An embedded calendar follows the updates on this site, so an amending decree shows up without you changing anything on your own site.' },
    { q: 'Is anything I enter stored?', a: 'No. Every calculation, including the leave planner, weton and working days, runs in your browser. There is no account, form or server that receives your input. Your choices are only written into the page address so the link can be shared.' },
  ],
  why: (h) => `<h2>All national holidays and collective leave 2027</h2>
<p>This table is the content of annexes A and B of the ${h.src('skb-2027', '2027 joint decree')}, sorted by date. Each date is checked automatically against the weekday column of the official text before the site is published.</p>
${tabelTahun(h, Y)}
<p>The holidays themselves are set by ${h.src('keppres-8-2024', 'Presidential Decree 8 of 2024')}. Each year the decree fixes the exact dates, especially for festivals that follow the lunar calendar, and adds collective leave. The annual leave from which collective leave is deducted is governed by ${h.src('uu-6-2023', 'Law 6 of 2023')}: at least ${MIN} working days after twelve months of service.</p>
<h2>A year with two Isra Mi'raj holidays and a long Eid break</h2>
<p>2027 has one more holiday than 2026. The reason is Isra Mi'raj, which falls on ${h.wday(tg('isra-mikraj'))} for 1448 and comes back on ${h.wday('2027-12-26')} for 1449. The Hijri calendar is about eleven days shorter than the Gregorian one, so every Islamic festival occasionally appears twice in one Gregorian year.</p>
<p>The 2027 Eid break is also longer than in 2026. Nyepi falls on Monday 8 March, two days before Eid, and collective leave on 9, 12 and 15 March closes every gap. The result is ${top.hari} days off in a row without personal leave. In 2026 the Eid break lasted seven days.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: Y, cuti: 4 }, c: 'Plan your 2027 long weekends' })}
<p>The planner above picks the leave dates that give the most days off. With four leave days you get ${o4.libur} days off; with eight, ${o8.libur}. Each block is detailed on ${h.a('long-weekend-2027', 'long weekends 2027')}.</p>`,
  sections: (h) => [
    { title: '2027 holidays month by month', html: `<p><strong>January.</strong> New Year falls on Friday 1 January and Isra Mi'raj on Tuesday 5 January. One leave day on Monday 4 January gives five days off. See ${h.a('libur-januari-2027', 'January 2027 holidays')}.</p>
<p><strong>February.</strong> Chinese New Year 2578 falls on Saturday 6 February, with collective leave on Friday 5 February. Ramadan is expected to begin on Monday 8 February. See ${h.a('libur-februari-2027', 'February 2027 holidays')}.</p>
<p><strong>March.</strong> The busiest month: Nyepi, Eid al-Fitr, Good Friday on 26 March, Easter on Sunday 28 March and four collective leave days. Only ${K.hariKerja(Y)[2]} working days. See ${h.a('libur-maret-2027', 'March 2027 holidays')}.</p>
<p><strong>April.</strong> No holidays; ${K.hariKerja(Y)[3]} working days.</p>
<p><strong>May.</strong> Labour Day falls on a Saturday. Ascension Day on Thursday 6 May, Eid al-Adha on Monday 17 May, Vesak on Thursday 20 May, with collective leave on 18 and 19 May. Friday 21 May is the best bridge of the year. See ${h.a('libur-mei-2027', 'May 2027 holidays')}.</p>
<p><strong>June.</strong> Pancasila Day falls on Tuesday 1 June and the Islamic New Year 1449 on Sunday 6 June. See ${h.a('libur-juni-2027', 'June 2027 holidays')}.</p>
<p><strong>July.</strong> No holidays; ${K.hariKerja(Y)[6]} working days.</p>
<p><strong>August.</strong> The Prophet's Birthday falls on Sunday 15 August and the 82nd Independence Day on Tuesday 17 August. See ${h.a('libur-agustus-2027', 'August 2027 holidays')}.</p>
<p><strong>September to November.</strong> Three months with no national holiday and no collective leave.</p>
<p><strong>December.</strong> Collective leave on Friday 24 December, Christmas on Saturday 25 and Isra Mi'raj on Sunday 26 December. See ${h.a('libur-desember-2027', 'December 2027 holidays')}.</p>` },
    { title: 'How to read the calendar above', html: `<p>Red figures are national holidays, grey boxes are collective leave, and every Sunday is red as on a wall calendar. Hover over or tap a date to see the holiday's name. The "Hijri" option shows the Hijri date under each Gregorian date; the "Javanese pasaran" option shows Legi, Pahing, Pon, Wage or Kliwon.</p>
<p>A Hijri date changes at sunset. This calendar shows the date in force during the daytime. For Ramadan, Shawwal and Dhu al-Hijjah the dates follow the decree; the final date still awaits the isbat session, as explained on ${h.a('kalender-hijriah', 'Hijri calendar 2027')} and ${h.a('puasa-2027', 'Ramadan 2027')}.</p>
<p>For a paper version, use the ${h.a('kalender-cetak', 'printable 2027 calendar')}: twelve months on one A4 page, with no ads.</p>` },
    { title: 'Collective leave, civil servants and private employees', html: `<p>Collective leave applies to civil servants under civil service rules. For private sector employees, the decree leaves it to management. As a result two employees can get a different number of days off in the same year. Every tool on this site has a "collective leave: working days" option for that case.</p>
<p>Because collective leave is deducted from annual leave, a worker with the minimum ${MIN} days whose employer applies all of the 2027 collective leave keeps only ${MIN - cb.length} days to plan. Work out your own figure on ${h.a('sisa-cuti-tahunan', 'annual leave balance')}.</p>` },
    { title: 'Working days in 2027 and 2026', html: `<p>On a five-day week with collective leave off, 2027 has ${hk} working days and 2026 has ${hk26}. The difference is small even though 2027 has one more national holiday, because more of the 2027 holidays fall on a weekend. Monthly figures for five- and six-day weeks are on ${h.a('hari-kerja-2027', 'working days 2027')}, and counts between two dates on the ${h.a('hitung-hari-kerja', 'working days calculator')}.</p>
<p>For the rest of 2026, the remaining days off are collective leave on Thursday 24 December and Christmas on Friday 25 December. The full 2026 calendar is on ${h.a('kalender-2026', 'calendar 2026')}.</p>` },
    { title: '2028: what is already certain', html: `<p>The 2028 decree has not been published; based on the last two years, it is likely to be signed around September 2027. What is certain are the fixed-date holidays: New Year on Saturday 1 January, Labour Day on Monday 1 May, Pancasila Day on Thursday 1 June, Independence Day on Thursday 17 August and Christmas on Monday 25 December 2028. Easter 2028 falls on 16 April by computation.</p>
<p>Islamic festivals in 2028 move about eleven days earlier: Eid al-Fitr around late February and Eid al-Adha around early May 2028. We show them as estimates on their pages and replace them with the official dates once the 2028 decree is published. The isbat session remains the final word on the start of Ramadan, Shawwal and Dhu al-Hijjah, as in ${h.src('setkab-isbat', 'previous rulings')}.</p>` },
  ],
};

export const HOME = { id, en, sources: ['skb-2027', 'skb-2026', 'keppres-8-2024', 'uu-6-2023', 'setkab-isbat', 'ummulqura'] };
