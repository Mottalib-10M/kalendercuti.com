/** Libur nasional dan cuti bersama 2026 dan 2027, kalender 2026. Semua tanggal dibaca dari lampiran SKB (engine/libur.ts). */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dWeek, dLong } from '../../lib/tool-specs';
import { tabelTahun, tabelLongWeekend, kalenderBulan } from '../../lib/bausteine';

const I = (iso: string) => dWeek(iso, 'id'), E = (iso: string) => dWeek(iso, 'en');
const tg = (y: number, id: Parameters<typeof K.tanggalHari>[1]) => K.tanggalHari(y, id)!;
const nas27 = K.nasional(2027), nas26 = K.nasional(2026), cb27 = K.cutiBersama(2027), cb26 = K.cutiBersama(2026);
const kerja27 = K.diHariKerja(nas27).length, kerja26 = K.diHariKerja(nas26).length;
const akhirPekan27 = nas27.length - kerja27, akhirPekan26 = nas26.length - kerja26;
const lw27 = K.longWeekend(2027), lw26 = K.longWeekend(2026);
const terpanjang27 = lw27.reduce((a, b) => (b.hari > a.hari ? b: a));
const terpanjang26 = lw26.reduce((a, b) => (b.hari > a.hari ? b: a));
const hk27 = K.hariKerja(2027).reduce((a, b) => a + b, 0), hk26 = K.hariKerja(2026).reduce((a, b) => a + b, 0);
const sisa26 = K.liburTahun(2026).filter((l) => l.date >= '2026-10-28');

export default [
  defineGuide({
    id: 'libur-nasional-2027', group: 'libur', order: 20, tool: 'ln', toolArg: { tahun: 2027, jenis: 'nasional' },
    related: ['home', 'cuti-bersama-2027', 'long-weekend-2027', 'lebaran-2027', 'libur-nasional-2026'],
    sources: ['skb-2027', 'skb-2027-halaman', 'keppres-8-2024'],
    idn: {
      slug: 'libur-nasional-2027', nav: 'Libur nasional 2027', card: `${nas27.length} tanggal merah menurut SKB 2027`,
      title: 'Libur nasional 2027: daftar 18 tanggal merah resmi SKB',
      description: 'Libur nasional 2027 menurut SKB 3 Menteri: 18 tanggal merah lengkap dengan hari, berapa yang jatuh di akhir pekan, dan long weekend yang terbentuk tanpa cuti.',
      h1: 'Libur nasional 2027: semua tanggal merah dan harinya',
      intro: 'Pilih tahun dan jenis libur: daftar di bawah langsung menampilkan setiap tanggal merah 2027, harinya, dan berapa yang jatuh pada hari kerja.',
      resume: `Pemerintah menetapkan ${nas27.length} hari libur nasional untuk 2027 dalam SKB Menteri Agama, Menteri Ketenagakerjaan dan Menteri PANRB Nomor ${K.SKB[2027].nomor}, yang ditandatangani pada ${dLong(K.SKB[2027].ditetapkan, 'id')}. Angka itu satu lebih banyak dari 2026 karena Isra Mikraj jatuh dua kali dalam setahun Masehi: ${I(tg(2027, 'isra-mikraj'))} untuk tahun 1448 H, dan ${I('2027-12-26')} untuk tahun 1449 H. Dari ${nas27.length} tanggal merah itu, ${kerja27} jatuh pada Senin sampai Jumat dan ${akhirPekan27} pada Sabtu atau Minggu, termasuk Hari Buruh, Natal dan Tahun Baru Imlek. Idul Fitri 1448 H ditetapkan ${I(tg(2027, 'idul-fitri'))} dan hari berikutnya, Idul Adha ${I(tg(2027, 'idul-adha'))}. Ditambah ${cb27.length} hari cuti bersama, pegawai yang bekerja lima hari seminggu mendapat libur terpanjang dari ${I(terpanjang27.dari)} sampai ${I(terpanjang27.sampai)}, ${terpanjang27.hari} hari berturut-turut tanpa mengambil cuti.`,
      faqs: [
        { q: 'Berapa jumlah libur nasional 2027?', a: `Ada ${nas27.length} hari libur nasional menurut SKB tiga menteri untuk 2027, ditambah ${cb27.length} hari cuti bersama. Jumlahnya lebih banyak satu dari 2026 karena Isra Mikraj diperingati dua kali dalam tahun Masehi 2027, pada Januari dan Desember. Dari semua tanggal merah itu, ${kerja27} jatuh pada hari kerja.` },
        { q: 'Tanggal merah 2027 mana yang jatuh di akhir pekan?', a: `${akhirPekan27} tanggal merah 2027 jatuh pada Sabtu atau Minggu, antara lain Tahun Baru Imlek, Hari Buruh pada Sabtu 1 Mei, 1 Muharam, Maulid Nabi, Natal pada Sabtu 25 Desember dan Isra Mikraj pada Minggu 26 Desember. Indonesia tidak mengganti libur yang jatuh pada akhir pekan dengan hari lain.` },
        { q: 'Apakah daftar libur nasional 2027 masih bisa berubah?', a: 'Bisa. Pemerintah pernah menerbitkan SKB perubahan, misalnya pada 2024. Tanggal hari raya Islam juga bergantung pada sidang isbat, walaupun SKB sudah menyebut tanggalnya. Bila ada perubahan resmi, daftar di halaman ini diperbarui dan tanggal pembaruan di bawah halaman ikut berganti.' },
        { q: 'Apa dasar hukum hari libur nasional?', a: 'Hari-hari libur ditetapkan dengan Keputusan Presiden, terakhir Keppres Nomor 8 Tahun 2024. Setiap tahun, tanggal persisnya dan cuti bersama diatur dalam SKB Menteri Agama, Menteri Ketenagakerjaan dan Menteri PANRB, yang terbit beberapa bulan sebelum tahun berjalan dimulai. Daftar sumber resmi ada di bagian bawah halaman ini.' },
      ],
      body: (h) => `<h2>Daftar lengkap libur nasional 2027</h2>
<p>Tabel ini disalin dari lampiran A ${h.src('skb-2027', 'SKB 2027')}. Nama hari diperiksa otomatis: setiap tanggal harus jatuh pada hari yang sama dengan kolom “hari” di naskah resmi.</p>
${tabelTahun(h, 2027, 'nasional')}
<h2>Mengapa 2027 punya ${nas27.length} tanggal merah</h2>
<p>Kalender Hijriah lebih pendek sekitar sebelas hari dari kalender Masehi. Karena itu setiap tiga puluh tiga tahun sekali, satu hari raya Islam muncul dua kali dalam satu tahun Masehi. Pada 2027 giliran Isra Mikraj: 27 Rajab 1448 H jatuh pada ${h.wday(tg(2027, 'isra-mikraj'))} dan 27 Rajab 1449 H pada ${h.wday('2027-12-26')}, sehari setelah Natal. Hari raya lain bergeser maju sekitar sebelas hari dibanding 2026: Idul Fitri dari 21 Maret menjadi ${h.day(tg(2027, 'idul-fitri'))}, Idul Adha dari 27 Mei menjadi ${h.day(tg(2027, 'idul-adha'))}.</p>
<p>Libur keagamaan lain mengikuti kalendernya sendiri. Tahun Baru Imlek 2578 Kongzili jatuh pada ${h.wday(tg(2027, 'imlek'))}, Nyepi Tahun Baru Saka 1949 pada ${h.wday(tg(2027, 'nyepi'))}, dan Waisak 2571 BE pada ${h.wday(tg(2027, 'waisak'))}. Wafat dan Kenaikan Yesus Kristus dihitung dari Paskah, yang jatuh pada ${h.wday(tg(2027, 'paskah'))}.</p>
<h2>Long weekend yang terbentuk tanpa cuti</h2>
<p>Bila cuti bersama ikut diliburkan, libur nasional 2027 menghasilkan ${lw27.length} libur panjang tanpa mengambil cuti sama sekali. Yang terpanjang adalah libur Lebaran, ${terpanjang27.hari} hari.</p>
${tabelLongWeekend(h, 2027)}
<p>Untuk memperpanjang libur dengan cuti tahunan, gunakan ${h.a('long-weekend-2027', 'perencana long weekend 2027')}. Daftar cuti bersama dengan penjelasannya ada di ${h.a('cuti-bersama-2027', 'cuti bersama 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 2 }, c: 'Hitung long weekend Anda' })}`,
    },
    en: {
      slug: 'public-holidays-2027', nav: 'Public holidays 2027', card: `${nas27.length} national holidays under the 2027 decree`,
      title: 'Public holidays 2027 Indonesia: all 18 official dates',
      description: 'Indonesia public holidays 2027 under the joint decree: all 18 national holidays with weekdays, which fall on a weekend, and the long weekends they create.',
      h1: 'Indonesia public holidays 2027: every date and weekday',
      intro: 'Pick the year and type of day off: the list below shows each 2027 national holiday, its weekday and how many fall on a working day.',
      resume: `Indonesia has ${nas27.length} national public holidays in 2027, set by the joint decree of the Ministers of Religious Affairs, Manpower and Administrative Reform numbered ${K.SKB[2027].nomor}, signed on ${dLong(K.SKB[2027].ditetapkan, 'en')}. That is one more than in 2026, because Isra Mi'raj falls twice in the same Gregorian year: on ${E(tg(2027, 'isra-mikraj'))} for 1448 AH and on ${E('2027-12-26')} for 1449 AH. Of the ${nas27.length} holidays, ${kerja27} fall on a weekday and ${akhirPekan27} on a Saturday or Sunday, including Labour Day, Christmas and Chinese New Year. Eid al-Fitr 1448 is set for ${E(tg(2027, 'idul-fitri'))} and the following day, Eid al-Adha for ${E(tg(2027, 'idul-adha'))}. Add the ${cb27.length} collective leave days and anyone on a five-day week gets the longest break from ${E(terpanjang27.dari)} to ${E(terpanjang27.sampai)}, ${terpanjang27.hari} days in a row without taking leave.`,
      faqs: [
        { q: 'How many public holidays does Indonesia have in 2027?', a: `There are ${nas27.length} national holidays under the 2027 joint decree, plus ${cb27.length} collective leave days. That is one more than in 2026 because Isra Mi'raj is observed twice in the 2027 Gregorian year, in January and in December. Of all these holidays, ${kerja27} fall on a working day.` },
        { q: 'Which 2027 holidays fall on a weekend in Indonesia?', a: `${akhirPekan27} holidays fall on a Saturday or Sunday in 2027, among them Chinese New Year, Labour Day on Saturday 1 May, Islamic New Year, the Prophet's Birthday, Christmas on Saturday 25 December and Isra Mi'raj on Sunday 26 December. Indonesia does not move a holiday that falls on a weekend to another day.` },
        { q: 'Can the 2027 holiday list still change?', a: 'Yes. The government has issued amending decrees before, for example in 2024. Islamic holiday dates also depend on the isbat session, even though the decree already names them. If an official change is made, the list on this page is updated and the update date at the bottom changes with it.' },
        { q: 'What is the legal basis for Indonesian public holidays?', a: 'The holidays themselves are set by presidential decree, most recently Presidential Decree 8 of 2024. Each year the exact dates and the collective leave days are fixed by a joint decree of the Ministers of Religious Affairs, Manpower and Administrative Reform, published a few months before the year begins.' },
      ],
      body: (h) => `<h2>Full list of national holidays 2027</h2>
<p>This table is copied from annex A of the ${h.src('skb-2027', '2027 joint decree')}. Weekdays are checked automatically: every date must fall on the same day as the weekday column in the official text.</p>
${tabelTahun(h, 2027, 'nasional')}
<h2>Why 2027 has ${nas27.length} holidays</h2>
<p>The Hijri calendar is about eleven days shorter than the Gregorian one. So roughly once every thirty-three years an Islamic holiday appears twice in one Gregorian year. In 2027 it is Isra Mi'raj's turn: 27 Rajab 1448 falls on ${h.wday(tg(2027, 'isra-mikraj'))} and 27 Rajab 1449 on ${h.wday('2027-12-26')}, the day after Christmas. The other Islamic holidays move about eleven days earlier than in 2026: Eid al-Fitr from 21 March to ${h.day(tg(2027, 'idul-fitri'))}, Eid al-Adha from 27 May to ${h.day(tg(2027, 'idul-adha'))}.</p>
<p>Other religious holidays follow their own calendars. Chinese New Year 2578 falls on ${h.wday(tg(2027, 'imlek'))}, Nyepi, the Saka New Year 1949, on ${h.wday(tg(2027, 'nyepi'))}, and Vesak 2571 BE on ${h.wday(tg(2027, 'waisak'))}. Good Friday and Ascension Day are counted from Easter, which is on ${h.wday(tg(2027, 'paskah'))}.</p>
<h2>Long weekends without taking leave</h2>
<p>If collective leave is also a day off, the 2027 holidays give ${lw27.length} long breaks without any leave at all. The longest is the Eid break, ${terpanjang27.hari} days.</p>
${tabelLongWeekend(h, 2027)}
<p>To stretch them with annual leave, use the ${h.a('long-weekend-2027', '2027 long weekend planner')}. The collective leave days and what they mean for you are on ${h.a('cuti-bersama-2027', 'collective leave 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 2 }, c: 'Work out your long weekends' })}`,
    },
  }),
  defineGuide({
    id: 'cuti-bersama-2027', group: 'libur', order: 21, tool: 'ct', toolArg: { tahun: 2027 },
    related: ['libur-nasional-2027', 'sisa-cuti-tahunan', 'long-weekend-2027', 'lebaran-2027'],
    sources: ['skb-2027', 'uu-6-2023', 'skb-2027-halaman'],
    idn: {
      slug: 'cuti-bersama-2027', nav: 'Cuti bersama 2027', card: `${cb27.length} hari cuti bersama dan siapa yang wajib`,
      title: 'Cuti bersama 2027: 8 tanggal resmi dan potongan cuti Anda',
      description: 'Cuti bersama 2027 menurut SKB: 8 tanggal lengkap dengan hari, berlaku untuk ASN dan swasta atau tidak, dan berapa sisa cuti tahunan Anda setelah dipotong.',
      h1: 'Cuti bersama 2027: tanggal, aturan dan sisa cuti Anda',
      intro: 'Masukkan hak cuti tahunan Anda: alat ini menghitung berapa hari yang terpakai oleh cuti bersama 2027 dan berapa yang tersisa untuk Anda atur sendiri.',
      resume: `SKB 2027 menetapkan ${cb27.length} hari cuti bersama, semuanya pada hari kerja: ${cb27.map((c) => dLong(c.date, 'id')).join(', ')}. Lima di antaranya menempel pada Idul Fitri, Idul Adha dan Waisak, satu sebelum Imlek, satu sebelum Wafat Yesus Kristus, dan satu pada Malam Natal. Cuti bersama bukan libur nasional. Menurut Diktum KEEMPAT SKB, cuti bersama mengurangi hak cuti tahunan, dan menurut Diktum KEENAM pelaksanaannya bagi pekerja swasta diatur oleh pimpinan perusahaan sesuai ketentuan yang berlaku. Bagi ASN, cuti bersama diatur tersendiri oleh Kementerian PANRB. Dengan hak cuti minimal ${K.P.cuti_tahunan.min_hari} hari menurut UU Ketenagakerjaan, pekerja yang perusahaannya menerapkan seluruh cuti bersama 2027 hanya memegang ${K.P.cuti_tahunan.min_hari - cb27.length} hari untuk diatur sendiri. Yang bekerja pada hari cuti bersama tidak kehilangan cuti tahunannya.`,
      faqs: [
        { q: 'Apakah cuti bersama 2027 memotong cuti tahunan?', a: `Ya, menurut Diktum KEEMPAT SKB, cuti bersama mengurangi hak cuti tahunan pegawai. Dengan ${cb27.length} hari cuti bersama dan hak minimal ${K.P.cuti_tahunan.min_hari} hari, sisanya ${K.P.cuti_tahunan.min_hari - cb27.length} hari. Pekerja yang tetap masuk pada hari cuti bersama tidak dipotong cutinya untuk hari itu. Alat sisa cuti menghitung angka ini untuk hak cuti Anda sendiri.` },
        { q: 'Apakah karyawan swasta wajib libur saat cuti bersama?', a: 'Tidak wajib. SKB menyerahkan pelaksanaan cuti bersama di perusahaan swasta kepada pimpinan masing-masing, dengan mengacu pada peraturan perundang-undangan. Banyak perusahaan meliburkan karyawan pada hari-hari itu, tetapi ada juga yang tetap bekerja, terutama sektor layanan, ritel dan produksi. Tanyakan ketentuannya kepada bagian personalia di kantor Anda.' },
        { q: 'Kapan saja cuti bersama Lebaran 2027?', a: `Untuk Idul Fitri 1448 H ada tiga hari cuti bersama: ${dLong('2027-03-09', 'id')}, ${dLong('2027-03-12', 'id')} dan ${dLong('2027-03-15', 'id')}. Bersama Nyepi pada 8 Maret, Idul Fitri pada 10 dan 11 Maret, serta akhir pekan, terbentuk libur sepuluh hari dari 6 sampai 15 Maret 2027.` },
      ],
      body: (h) => `<h2>Tanggal cuti bersama 2027</h2>
<p>Daftar ini berasal dari lampiran B ${h.src('skb-2027', 'SKB 2027')}. Setiap cuti bersama diletakkan di samping libur nasional, sehingga hari kerja yang terjepit di antara dua hari libur ikut diliburkan.</p>
${tabelTahun(h, 2027, 'cuti')}
<h2>Siapa yang libur pada hari cuti bersama</h2>
<p>Bagi aparatur sipil negara, cuti bersama berlaku sesuai ketentuan kepegawaian, dan instansi pelayanan publik tetap mengatur piket. Bagi pekerja swasta, keputusan ada di tangan pimpinan perusahaan. Karena itu dua pekerja di kota yang sama bisa mendapat libur Lebaran yang berbeda panjangnya.</p>
<p>Hak cuti tahunan minimal ${K.P.cuti_tahunan.min_hari} hari kerja diberikan setelah ${K.P.cuti_tahunan.setelah_bulan} bulan bekerja terus-menerus, menurut Pasal 79 UU Ketenagakerjaan sebagaimana diubah ${h.src('uu-6-2023', 'UU 6/2023')}. Perjanjian kerja atau peraturan perusahaan boleh memberi lebih. Alat di atas menghitung sisa hak Anda bila semua cuti bersama dipotong, dan menunjukkan berapa yang tersisa bila perusahaan Anda tidak menerapkannya.</p>
<h2>Berapa hari libur yang diberikan cuti bersama</h2>
<p>Tanpa cuti bersama, libur Lebaran 2027 hanya Sabtu 6 sampai Senin 8 Maret, lalu Rabu dan Kamis 10 sampai 11 Maret. Dengan cuti bersama pada Selasa 9, Jumat 12 dan Senin 15 Maret, kedua potongan itu tersambung menjadi sepuluh hari. Pola yang sama terjadi pada Idul Adha dan Waisak: cuti bersama 18 dan 19 Mei menyambung Senin 17 Mei dengan Kamis 20 Mei.</p>
<p>Bila perusahaan Anda tidak menerapkan cuti bersama, pilih “tetap kerja” di ${h.a('long-weekend-2027', 'perencana long weekend')} ; rencananya akan dihitung ulang tanpa hari-hari itu.</p>
${h.mini('ct', { p: ['hak'], d: { tahun: 2027, hak: 12 }, c: 'Hitung sisa cuti tahunan' })}`,
    },
    en: {
      slug: 'collective-leave-2027', nav: 'Collective leave 2027', card: `${cb27.length} collective leave days and who must take them`,
      title: 'Collective leave 2027 Indonesia: 8 dates and your balance',
      description: 'Indonesia collective leave (cuti bersama) 2027: all 8 dates with weekdays, whether they bind civil servants and private staff, and the leave you have left.',
      h1: 'Collective leave 2027: dates, rules and your leave balance',
      intro: 'Enter your annual leave entitlement: the tool works out how many days the 2027 collective leave uses and how many remain for you to plan.',
      resume: `The 2027 joint decree sets ${cb27.length} collective leave days (cuti bersama), all on working days: ${cb27.map((c) => dLong(c.date, 'en')).join(', ')}. Five of them sit next to Eid al-Fitr, Eid al-Adha and Vesak, one before Chinese New Year, one before Good Friday and one on Christmas Eve. Collective leave is not a public holiday. Under the decree's fourth provision it is deducted from annual leave, and under the sixth provision private employers decide how it applies to their staff, in line with the law. For civil servants it is regulated separately by the Ministry of Administrative Reform. With the minimum of ${K.P.cuti_tahunan.min_hari} days of annual leave under the Manpower Act, a worker whose employer applies every collective leave day in 2027 keeps only ${K.P.cuti_tahunan.min_hari - cb27.length} days to plan freely. Anyone who works on a collective leave day keeps that day of annual leave.`,
      faqs: [
        { q: 'Does collective leave in 2027 reduce annual leave?', a: `Yes. Under the fourth provision of the decree, collective leave is deducted from annual leave. With ${cb27.length} collective leave days and a minimum entitlement of ${K.P.cuti_tahunan.min_hari} days, ${K.P.cuti_tahunan.min_hari - cb27.length} days remain. If you work on a collective leave day, that day is not deducted.` },
        { q: 'Must private sector employees take collective leave?', a: 'No. The decree leaves collective leave in private companies to each employer, in line with the law. Many employers close on those days, but others keep working, especially in services, retail and manufacturing. Check your company regulations or employment contract to see which applies to you.' },
        { q: 'When is the Eid collective leave in 2027?', a: `There are three collective leave days for Eid al-Fitr 1448: ${dLong('2027-03-09', 'en')}, ${dLong('2027-03-12', 'en')} and ${dLong('2027-03-15', 'en')}. Together with Nyepi on 8 March, Eid on 10 and 11 March and the weekends, they make a ten-day break from 6 to 15 March 2027.` },
      ],
      body: (h) => `<h2>Collective leave dates 2027</h2>
<p>This list comes from annex B of the ${h.src('skb-2027', '2027 joint decree')}. Each collective leave day sits next to a national holiday, so a working day caught between two days off becomes a day off too.</p>
${tabelTahun(h, 2027, 'cuti')}
<h2>Who is off on a collective leave day</h2>
<p>For civil servants, collective leave applies under civil service rules, with public service offices keeping duty rosters. For private sector workers the decision lies with management. That is why two workers in the same city can get Eid breaks of different lengths.</p>
<p>The minimum annual leave of ${K.P.cuti_tahunan.min_hari} working days is earned after ${K.P.cuti_tahunan.setelah_bulan} months of continuous service, under Article 79 of the Manpower Act as amended by ${h.src('uu-6-2023', 'Law 6 of 2023')}. Contracts or company regulations may give more. The tool above works out your remaining entitlement if every collective leave day is deducted, and what is left if your employer does not apply them.</p>
<h2>How many days off collective leave creates</h2>
<p>Without collective leave, the 2027 Eid break is only Saturday 6 to Monday 8 March, then Wednesday and Thursday 10 to 11 March. With collective leave on Tuesday 9, Friday 12 and Monday 15 March, the two pieces join into ten days. The same happens around Eid al-Adha and Vesak: leave on 18 and 19 May links Monday 17 May with Thursday 20 May.</p>
<p>If your employer does not apply collective leave, choose "working days" in the ${h.a('long-weekend-2027', 'long weekend planner')}; the plan is recomputed without those days.</p>
${h.mini('ct', { p: ['hak'], d: { tahun: 2027, hak: 12 }, c: 'Work out your remaining leave' })}`,
    },
  }),
  defineGuide({
    id: 'libur-nasional-2026', group: 'libur', order: 22, tool: 'ln', toolArg: { tahun: 2026 },
    related: ['libur-nasional-2027', 'cuti-bersama-2026', 'natal-2026', 'kalender-2026'],
    sources: ['skb-2026', 'skb-2026-halaman', 'setkab-idulfitri-1447', 'setkab-iduladha-1447'],
    idn: {
      slug: 'libur-nasional-2026', nav: 'Libur nasional 2026', card: 'Tanggal merah 2026 dan yang masih tersisa',
      title: 'Libur nasional 2026: tanggal merah dan libur akhir tahun',
      description: 'Libur nasional dan cuti bersama 2026 menurut SKB 3 Menteri: 17 tanggal merah dan 8 cuti bersama, harinya, dan libur yang masih tersisa sampai akhir Desember.',
      h1: 'Libur nasional 2026: daftar lengkap dan yang masih tersisa',
      intro: 'Daftar di bawah memuat semua tanggal merah dan cuti bersama 2026; pilih “libur nasional” atau “cuti bersama” untuk menyaring.',
      resume: `Tahun 2026 punya ${nas26.length} hari libur nasional dan ${cb26.length} hari cuti bersama menurut SKB Nomor ${K.SKB[2026].nomor}. Sebagian besar sudah lewat. Idul Fitri 1447 H jatuh pada ${I(tg(2026, 'idul-fitri'))}, sesuai hasil sidang isbat, dan Idul Adha pada ${I(tg(2026, 'idul-adha'))}. Yang masih tersisa sampai akhir tahun hanya ${sisa26.length} hari: cuti bersama pada ${I('2026-12-24')} dan Natal pada ${I(tg(2026, 'natal'))}. Keduanya menempel pada akhir pekan, sehingga libur Natal 2026 berlangsung empat hari dari Kamis 24 sampai Minggu 27 Desember. Libur terpanjang 2026 adalah libur Lebaran, ${terpanjang26.hari} hari dari ${dLong(terpanjang26.dari, 'id')} sampai ${dLong(terpanjang26.sampai, 'id')}. Dengan pola lima hari kerja dan cuti bersama sebagai libur, 2026 punya ${hk26} hari kerja, dua lebih sedikit dari 2027. Dari ${nas26.length} tanggal merah, ${akhirPekan26} jatuh pada Sabtu atau Minggu.`,
      faqs: [
        { q: 'Libur apa saja yang tersisa di akhir 2026?', a: `Tinggal ${sisa26.length} hari: cuti bersama Natal pada Kamis 24 Desember dan Natal pada Jumat 25 Desember 2026. Bersama Sabtu dan Minggu, terbentuk libur empat hari dari 24 sampai 27 Desember. Tahun Baru 2027 jatuh pada Jumat, sehingga akhir pekan berikutnya juga menjadi libur tiga hari.` },
        { q: 'Kapan Idul Fitri 2026 dirayakan?', a: `Pemerintah menetapkan 1 Syawal 1447 H pada ${I(tg(2026, 'idul-fitri'))} setelah sidang isbat. Libur nasional Idul Fitri berlangsung 21 dan 22 Maret, ditambah cuti bersama 20, 23 dan 24 Maret, sehingga libur Lebaran 2026 menjadi tujuh hari, dari Rabu 18 Maret (cuti bersama Nyepi) sampai Selasa 24 Maret.` },
        { q: 'Berapa hari kerja di tahun 2026?', a: `Dengan lima hari kerja seminggu dan cuti bersama sebagai libur, 2026 punya ${hk26} hari kerja. Bila perusahaan Anda tidak menerapkan cuti bersama, jumlahnya ${K.hariKerja(2026, { cb: false }).reduce((a, b) => a + b, 0)}. Untuk enam hari kerja seminggu, alat hari kerja di situs ini menghitung angkanya per bulan. Angka ini sudah memperhitungkan semua libur nasional dalam SKB 2026.` },
      ],
      body: (h) => `<h2>Semua libur nasional dan cuti bersama 2026</h2>
<p>Tabel berikut berasal dari lampiran ${h.src('skb-2026', 'SKB 2026')}. Tanggal Idul Fitri dan Idul Adha telah dikonfirmasi oleh penetapan pemerintah setelah sidang isbat, sebagaimana diberitakan ${h.src('setkab-idulfitri-1447', 'Sekretariat Kabinet')} untuk Idul Fitri dan ${h.src('setkab-iduladha-1447', 'untuk Idul Adha')}.</p>
${tabelTahun(h, 2026)}
<h2>Akhir tahun 2026 di kalender</h2>
<p>Natal 2026 jatuh pada Jumat, dan pemerintah menambahkan cuti bersama pada Kamis 24 Desember. Hasilnya libur empat hari. Pekan berikutnya hanya punya empat hari kerja sebelum Tahun Baru 2027 pada Jumat 1 Januari. Mengambil cuti Senin 28 sampai Kamis 31 Desember menyambung keduanya: sebelas hari libur dari 24 Desember sampai 3 Januari dengan empat hari cuti.</p>
${kalenderBulan(h, '2026-12')}
<h2>Pelajaran 2026 untuk merencanakan 2027</h2>
<p>Pada 2026, libur Lebaran dimulai dengan cuti bersama Nyepi pada Rabu 18 Maret dan berlangsung tujuh hari. Pada 2027 Nyepi jatuh pada Senin 8 Maret dan Lebaran pada Rabu 10 Maret, sehingga liburnya lebih panjang: sepuluh hari. Perbandingan lengkapnya ada di ${h.a('libur-nasional-2027', 'libur nasional 2027')}, dan kalender bulan demi bulan untuk sisa tahun ini di ${h.a('kalender-2026', 'kalender 2026')}.</p>
${h.mini('ln', { p: ['jenis'], d: { tahun: 2026, jenis: 'cuti' }, c: 'Lihat cuti bersama 2026' })}`,
    },
    en: {
      slug: 'public-holidays-2026', nav: 'Public holidays 2026', card: '2026 holidays and those still to come',
      title: 'Public holidays 2026 Indonesia: dates and what is left',
      description: 'Indonesia public holidays and collective leave 2026: 17 national holidays and 8 leave days with weekdays, and the days off that remain until late December.',
      h1: 'Indonesia public holidays 2026: full list and what is left',
      intro: 'The list below holds every 2026 national holiday and collective leave day; choose "holidays" or "leave" to filter it.',
      resume: `Indonesia had ${nas26.length} national holidays and ${cb26.length} collective leave days in 2026 under decree ${K.SKB[2026].nomor}. Most have passed. Eid al-Fitr 1447 fell on ${E(tg(2026, 'idul-fitri'))}, as confirmed after the isbat session, and Eid al-Adha on ${E(tg(2026, 'idul-adha'))}. Only ${sisa26.length} days remain until the end of the year: collective leave on ${E('2026-12-24')} and Christmas on ${E(tg(2026, 'natal'))}. Both sit next to the weekend, so the 2026 Christmas break runs four days from Thursday 24 to Sunday 27 December. The longest break of 2026 was Eid, ${terpanjang26.hari} days from ${dLong(terpanjang26.dari, 'en')} to ${dLong(terpanjang26.sampai, 'en')}. On a five-day week with collective leave off, 2026 has ${hk26} working days, two fewer than 2027. Of the ${nas26.length} holidays, ${akhirPekan26} fell on a Saturday or Sunday.`,
      faqs: [
        { q: 'Which holidays are left at the end of 2026?', a: `Only ${sisa26.length}: collective leave for Christmas on Thursday 24 December and Christmas Day on Friday 25 December 2026. With the weekend they make a four-day break from 24 to 27 December. New Year 2027 falls on a Friday, so the following weekend is a three-day break as well.` },
        { q: 'When was Eid al-Fitr 2026 in Indonesia?', a: `The government set 1 Shawwal 1447 on ${E(tg(2026, 'idul-fitri'))} after the isbat session. The national Eid holiday ran on 21 and 22 March, with collective leave on 20, 23 and 24 March, so the 2026 Eid break lasted seven days, from Wednesday 18 March (collective leave for Nyepi) to Tuesday 24 March.` },
        { q: 'How many working days are there in 2026?', a: `On a five-day week with collective leave off, 2026 has ${hk26} working days. If your employer does not apply collective leave, it is ${K.hariKerja(2026, { cb: false }).reduce((a, b) => a + b, 0)}. For a six-day week, the working days tool on this site gives the figure month by month.` },
      ],
      body: (h) => `<h2>All national holidays and collective leave 2026</h2>
<p>The table comes from the annexes of the ${h.src('skb-2026', '2026 joint decree')}. The Eid al-Fitr and Eid al-Adha dates were confirmed by the government after the isbat session, as reported by the ${h.src('setkab-idulfitri-1447', 'Cabinet Secretariat')} for Eid al-Fitr and ${h.src('setkab-iduladha-1447', 'for Eid al-Adha')}.</p>
${tabelTahun(h, 2026)}
<h2>The end of 2026 on the calendar</h2>
<p>Christmas 2026 falls on a Friday, and the government added collective leave on Thursday 24 December. The result is a four-day break. The following week has only four working days before New Year 2027 on Friday 1 January. Taking leave from Monday 28 to Thursday 31 December joins the two: eleven days off from 24 December to 3 January for four days of leave.</p>
${kalenderBulan(h, '2026-12')}
<h2>What 2026 teaches for planning 2027</h2>
<p>In 2026 the Eid break started with collective leave for Nyepi on Wednesday 18 March and lasted seven days. In 2027 Nyepi falls on Monday 8 March and Eid on Wednesday 10 March, so the break is longer: ten days. The full comparison is on ${h.a('libur-nasional-2027', 'public holidays 2027')}, and the month-by-month calendar for the rest of this year on ${h.a('kalender-2026', 'calendar 2026')}.</p>
${h.mini('ln', { p: ['jenis'], d: { tahun: 2026, jenis: 'cuti' }, c: 'See the 2026 collective leave' })}`,
    },
  }),
  defineGuide({
    id: 'cuti-bersama-2026', group: 'libur', order: 23, tool: 'ct', toolArg: { tahun: 2026 },
    related: ['cuti-bersama-2027', 'libur-nasional-2026', 'sisa-cuti-tahunan', 'natal-2026'],
    sources: ['skb-2026', 'uu-6-2023'],
    idn: {
      slug: 'cuti-bersama-2026', nav: 'Cuti bersama 2026', card: 'Delapan hari cuti bersama 2026 dan sisa cuti',
      title: 'Cuti bersama 2026: 8 tanggal dan sisa cuti sebelum hangus',
      description: 'Cuti bersama 2026 menurut SKB: 8 tanggal dengan harinya, termasuk Malam Natal 24 Desember, dan berapa cuti tahunan 2026 yang masih bisa Anda ambil tahun ini.',
      h1: 'Cuti bersama 2026 dan sisa cuti tahunan Anda',
      intro: 'Masukkan hak cuti dan cuti yang sudah Anda ambil tahun ini: alat menghitung sisa cuti 2026 setelah dipotong cuti bersama.',
      resume: `SKB 2026 menetapkan ${cb26.length} hari cuti bersama: ${cb26.map((c) => dLong(c.date, 'id')).join(', ')}. Tiga di antaranya mengapit Idul Fitri 1447 H, sehingga libur Lebaran 2026 menjadi tujuh hari. Satu menyambung Kenaikan Yesus Kristus pada Kamis 14 Mei dengan akhir pekan, satu menempel pada Idul Adha, dan yang terakhir jatuh pada Kamis 24 Desember, sehari sebelum Natal. Cuti bersama mengurangi hak cuti tahunan menurut Diktum KEEMPAT SKB. Pekerja dengan hak minimal ${K.P.cuti_tahunan.min_hari} hari yang perusahaannya menerapkan semua cuti bersama memegang ${K.P.cuti_tahunan.min_hari - cb26.length} hari untuk diatur sendiri sepanjang 2026. Hampir akhir tahun, pertanyaan yang tersisa biasanya satu: berapa hari cuti yang masih ada, dan apakah bisa dipakai pada pekan antara Natal dan Tahun Baru. Alat di atas menjawabnya dalam beberapa detik.`,
      faqs: [
        { q: 'Apakah 24 Desember 2026 cuti bersama?', a: 'Ya. Kamis 24 Desember 2026 adalah cuti bersama Natal menurut SKB 2026. Bersama Natal pada Jumat 25 Desember dan akhir pekan, terbentuk libur empat hari. Bagi pekerja swasta, berlaku atau tidaknya cuti bersama itu ditentukan oleh pimpinan perusahaan. Kalender 2026 di situs ini menandainya dengan warna abu-abu.' },
        { q: 'Apakah sisa cuti tahunan 2026 hangus di akhir tahun?', a: 'Undang-undang mengatur hak cuti minimal, tetapi aturan pemindahan sisa cuti ke tahun berikutnya biasanya ada di perjanjian kerja, peraturan perusahaan atau perjanjian kerja bersama. Periksa dokumen itu. Bila sisa cuti tidak bisa dibawa, pekan 28 sampai 31 Desember 2026 adalah tempat yang paling menguntungkan untuk memakainya.' },
        { q: 'Berapa sisa cuti saya setelah cuti bersama 2026?', a: `Hak cuti tahunan dikurangi cuti bersama yang diterapkan perusahaan, dikurangi cuti yang sudah Anda ambil sendiri. Dengan hak ${K.P.cuti_tahunan.min_hari} hari dan delapan hari cuti bersama, tersisa ${K.P.cuti_tahunan.min_hari - cb26.length} hari sebelum cuti pribadi Anda. Alat di halaman ini menghitungnya dengan angka Anda sendiri.` },
      ],
      body: (h) => `<h2>Tanggal cuti bersama 2026</h2>
<p>Daftar berikut berasal dari lampiran B ${h.src('skb-2026', 'SKB 2026')}.</p>
${tabelTahun(h, 2026, 'cuti')}
<h2>Memakai sisa cuti sebelum tahun berganti</h2>
<p>Pekan terakhir 2026 dimulai Senin 28 Desember dan berakhir dengan Tahun Baru 2027 pada Jumat. Empat hari cuti, 28 sampai 31 Desember, memberi sebelas hari libur dari Kamis 24 Desember sampai Minggu 3 Januari 2027. Bila Anda hanya punya dua hari, 30 dan 31 Desember menyambung Tahun Baru dengan pertengahan pekan, tetapi hasilnya lebih kecil: lima hari libur.</p>
<p>Hak cuti tahunan menurut Pasal 79 UU Ketenagakerjaan sebagaimana diubah ${h.src('uu-6-2023', 'UU 6/2023')} paling sedikit ${K.P.cuti_tahunan.min_hari} hari kerja setelah ${K.P.cuti_tahunan.setelah_bulan} bulan bekerja terus-menerus. Undang-undang itu menyerahkan rincian pelaksanaannya kepada perjanjian kerja, peraturan perusahaan atau perjanjian kerja bersama.</p>
<h2>Melihat ke 2027</h2>
<p>Pada 2027 jumlah cuti bersama sama, delapan hari, tetapi letaknya berbeda: tiga untuk Lebaran, dua untuk Idul Adha dan Waisak, satu untuk Imlek, satu sebelum Wafat Yesus Kristus dan satu pada Malam Natal. Rinciannya ada di ${h.a('cuti-bersama-2027', 'cuti bersama 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2026, cuti: 4 }, c: 'Rencanakan cuti akhir 2026' })}`,
    },
    en: {
      slug: 'collective-leave-2026', nav: 'Collective leave 2026', card: 'Eight collective leave days in 2026 and your balance',
      title: 'Collective leave 2026 Indonesia: 8 dates and leave left',
      description: 'Indonesia collective leave 2026 under the decree: 8 dates with weekdays, including Christmas Eve on 24 December, and how much 2026 leave you can still use.',
      h1: 'Collective leave 2026 and your remaining annual leave',
      intro: 'Enter your entitlement and the leave you have taken this year: the tool works out your 2026 balance after collective leave.',
      resume: `The 2026 joint decree set ${cb26.length} collective leave days: ${cb26.map((c) => dLong(c.date, 'en')).join(', ')}. Three of them framed Eid al-Fitr 1447, turning the 2026 Eid break into seven days. One linked Ascension Day on Thursday 14 May to the weekend, one sat next to Eid al-Adha, and the last falls on Thursday 24 December, the day before Christmas. Collective leave is deducted from annual leave under the decree's fourth provision. A worker with the minimum ${K.P.cuti_tahunan.min_hari} days whose employer applies every collective leave day keeps ${K.P.cuti_tahunan.min_hari - cb26.length} days to plan over 2026. Near the end of the year, one question usually remains: how many days are left, and can they be used in the week between Christmas and New Year? The tool above answers it in a few seconds.`,
      faqs: [
        { q: 'Is 24 December 2026 a collective leave day?', a: 'Yes. Thursday 24 December 2026 is collective leave for Christmas under the 2026 decree. With Christmas on Friday 25 December and the weekend, it makes a four-day break. For private sector workers, whether that collective leave applies is decided by the employer.' },
        { q: 'Does unused 2026 annual leave expire at year end?', a: 'The law sets the minimum entitlement, but carry-over of unused leave is usually governed by your employment contract, company regulations or collective agreement. Check those documents. If leave cannot be carried over, the week of 28 to 31 December 2026 is the most rewarding place to use it.' },
        { q: 'How much leave do I have left after the 2026 collective leave?', a: `Your annual entitlement minus the collective leave your employer applies, minus the leave you took yourself. With ${K.P.cuti_tahunan.min_hari} days and eight collective leave days, ${K.P.cuti_tahunan.min_hari - cb26.length} days remain before any personal leave. The tool on this page works it out with your own figures.` },
      ],
      body: (h) => `<h2>Collective leave dates 2026</h2>
<p>The list comes from annex B of the ${h.src('skb-2026', '2026 joint decree')}.</p>
${tabelTahun(h, 2026, 'cuti')}
<h2>Using leftover leave before the year ends</h2>
<p>The last week of 2026 starts on Monday 28 December and ends with New Year 2027 on Friday. Four days of leave, 28 to 31 December, give eleven days off from Thursday 24 December to Sunday 3 January 2027. With only two days, 30 and 31 December join New Year to the middle of the week, but the gain is smaller: five days off.</p>
<p>Annual leave under Article 79 of the Manpower Act as amended by ${h.src('uu-6-2023', 'Law 6 of 2023')} is at least ${K.P.cuti_tahunan.min_hari} working days after ${K.P.cuti_tahunan.setelah_bulan} months of continuous service. The law leaves the details to employment contracts, company regulations or collective agreements.</p>
<h2>Looking ahead to 2027</h2>
<p>2027 has the same number of collective leave days, eight, but in different places: three for Eid, two for Eid al-Adha and Vesak, one for Chinese New Year, one before Good Friday and one on Christmas Eve. The details are on ${h.a('cuti-bersama-2027', 'collective leave 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2026, cuti: 4 }, c: 'Plan your end-of-2026 leave' })}`,
    },
  }),
  defineGuide({
    id: 'kalender-2026', group: 'libur', order: 24, tool: 'kalender', toolArg: { tahun: 2026 },
    related: ['home', 'libur-nasional-2026', 'libur-desember-2026', 'kalender-cetak'],
    sources: ['skb-2026', 'ummulqura'],
    idn: {
      slug: 'kalender-2026', nav: 'Kalender 2026', card: 'Kalender 2026 dengan tanggal merah dan Hijriah',
      title: 'Kalender 2026 lengkap: tanggal merah, Hijriah dan Jawa',
      description: 'Kalender 2026 lengkap dua belas bulan dengan tanggal merah dan cuti bersama SKB, tanggal Hijriah atau pasaran Jawa di setiap hari, untuk ponsel atau dicetak.',
      h1: 'Kalender 2026 dengan tanggal merah, Hijriah dan pasaran',
      intro: 'Pilih tahun dan tampilan tambahan: kalender menandai libur nasional dengan merah dan cuti bersama dengan abu-abu, lengkap dengan tanggal Hijriah atau pasaran Jawa.',
      resume: `Kalender 2026 di halaman ini memuat ${nas26.length} libur nasional dan ${cb26.length} cuti bersama menurut SKB tiga menteri, ditandai langsung di setiap bulan. Tahun 2026 dimulai pada hari Kamis dan berakhir pada hari Kamis, dengan 365 hari dan ${hk26} hari kerja bagi pekerja lima hari seminggu yang ikut cuti bersama. Di bawah setiap tanggal Anda dapat menampilkan tanggal Hijriah, yang mengikuti tanggal SKB untuk Idul Fitri, Idul Adha, 1 Muharam, Maulid dan Isra Mikraj, atau pasaran Jawa: Legi, Pahing, Pon, Wage dan Kliwon. Tahun Hijriah 1447 berakhir dan 1448 dimulai pada ${I(tg(2026, 'muharam'))}. Kalender ini juga bisa dicetak: tombol cetak menghasilkan satu halaman berisi dua belas bulan, tanpa iklan dan tanpa gambar. Untuk tahun depan, kalender 2027 ada di beranda, lengkap dengan perencana long weekend.`,
      faqs: [
        { q: 'Hari apa 1 Januari 2026 dan 31 Desember 2026?', a: 'Keduanya jatuh pada hari Kamis. Tahun biasa yang dimulai pada hari Kamis juga berakhir pada hari Kamis, karena 365 hari sama dengan 52 minggu ditambah satu hari. Tahun 2027 dimulai pada Jumat, dan 2028, tahun kabisat, pada Sabtu. Kalender di halaman ini menampilkan kedua tanggal itu.' },
        { q: 'Kapan Tahun Baru Islam 1448 H?', a: `Menurut SKB 2026, 1 Muharam 1448 H jatuh pada ${I(tg(2026, 'muharam'))} dan merupakan libur nasional. Tahun Baru Islam berikutnya, 1 Muharam 1449 H, jatuh pada Minggu 6 Juni 2027, sebelas hari lebih awal dalam kalender Masehi. Kalender di halaman ini menandainya dengan warna merah.` },
        { q: 'Bagaimana menampilkan pasaran Jawa di kalender?', a: 'Pilih “pasaran Jawa” pada pilihan tampilan di atas kalender. Setiap tanggal akan menampilkan salah satu dari lima pasaran. Untuk mengetahui weton dan neptu tanggal lahir, gunakan kalkulator weton yang menghitung hari, pasaran dan jumlah neptunya. Pasaran yang tampil dihitung dengan acuan Jumat Legi, 17 Agustus 1945.' },
      ],
      body: (h) => `<h2>Membaca kalender 2026</h2>
<p>Angka merah menandai libur nasional, kotak abu-abu menandai cuti bersama, dan Minggu selalu ditulis merah, seperti kebiasaan kalender cetak di Indonesia. Tanggal-tanggalnya dibaca dari ${h.src('skb-2026', 'SKB 2026')}. Tanggal Hijriah mengikuti tanggal resmi dalam SKB; di bulan-bulan lain kami memakai kalender ${h.src('ummulqura', 'Umm al-Qura')} sebagai perhitungan.</p>
<h2>Bulan-bulan dengan libur terbanyak</h2>
<p>Maret 2026 adalah bulan dengan libur terbanyak: Nyepi, dua hari Idul Fitri dan tiga hari cuti bersama, sehingga hanya ${K.hariKerja(2026)[2]} hari kerja tersisa. Mei 2026 menyusul dengan Hari Buruh, Kenaikan Yesus Kristus, Idul Adha dan Waisak, ditambah dua cuti bersama. Sebaliknya Juli 2026 tidak punya satu pun tanggal merah dan memiliki ${K.hariKerja(2026)[6]} hari kerja, angka tertinggi tahun ini.</p>
${h.table([h.lang === 'id' ? 'Bulan' : 'Month', h.lang === 'id' ? 'Hari kerja' : 'Working days'], ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((m, i) => [m, K.hariKerja(2026)[i]]), 'Hari kerja per bulan 2026 (5 hari, cuti bersama libur)', ['l', 'r'])}
<h2>Tanggal yang sering dicari</h2>
<p>Hari Kemerdekaan ke-81 jatuh pada ${h.wday(tg(2026, 'kemerdekaan'))}, sehingga akhir pekan sebelumnya menjadi libur tiga hari. Maulid Nabi jatuh pada ${h.wday(tg(2026, 'maulid'))}, delapan hari setelahnya. Untuk bulan terakhir tahun ini, lihat ${h.a('libur-desember-2026', 'libur Desember 2026')} ; untuk tahun depan, ${h.a('home', 'kalender 2027')}.</p>
${h.mini('bl', { p: ['bln'], d: { bln: '2026-12' }, c: 'Lihat satu bulan' })}`,
    },
    en: {
      slug: 'calendar-2026', nav: 'Calendar 2026', card: '2026 calendar with holidays and Hijri dates',
      title: 'Calendar 2026 Indonesia: holidays, Hijri and Javanese days',
      description: 'Full 2026 Indonesia calendar, all twelve months with national holidays and collective leave, Hijri dates or Javanese pasaran on each day, for phone or print.',
      h1: 'Indonesia calendar 2026 with holidays, Hijri and pasaran',
      intro: 'Pick the year and an extra layer: the calendar marks national holidays in red and collective leave in grey, with Hijri dates or Javanese pasaran.',
      resume: `This 2026 calendar shows the ${nas26.length} national holidays and ${cb26.length} collective leave days of the joint decree, marked on every month. 2026 starts on a Thursday and ends on a Thursday, with 365 days and ${hk26} working days for anyone on a five-day week who takes collective leave. Under each date you can show the Hijri date, which follows the decree for Eid al-Fitr, Eid al-Adha, 1 Muharram, the Prophet's Birthday and Isra Mi'raj, or the Javanese pasaran: Legi, Pahing, Pon, Wage and Kliwon. The Hijri year 1447 ends and 1448 begins on ${E(tg(2026, 'muharam'))}. The calendar can also be printed: the print button produces a single page with all twelve months, with no ads or images. For next year, the 2027 calendar is on the home page, together with the long weekend planner.`,
      faqs: [
        { q: 'What day of the week are 1 January and 31 December 2026?', a: 'Both fall on a Thursday. A common year that starts on a Thursday also ends on a Thursday, because 365 days are 52 weeks plus one day. 2027 starts on a Friday, and 2028, a leap year, on a Saturday.' },
        { q: 'When is the Islamic New Year 1448?', a: `Under the 2026 decree, 1 Muharram 1448 falls on ${E(tg(2026, 'muharam'))} and is a national holiday. The next Islamic New Year, 1 Muharram 1449, falls on Sunday 6 June 2027, eleven days earlier in the Gregorian calendar. The calendar on this page marks it in red.` },
        { q: 'How do I show the Javanese pasaran on the calendar?', a: 'Choose "Javanese pasaran" in the display option above the calendar. Each date then shows one of the five market days. To find the weton and neptu of a date of birth, use the weton calculator, which works out the weekday, pasaran and neptu total.' },
      ],
      body: (h) => `<h2>Reading the 2026 calendar</h2>
<p>Red figures mark national holidays, grey boxes mark collective leave, and Sundays are always red, as on printed Indonesian calendars. The dates are read from the ${h.src('skb-2026', '2026 joint decree')}. Hijri dates follow the official dates in the decree; in other months we use the ${h.src('ummulqura', 'Umm al-Qura')} calendar as a computation.</p>
<h2>The months with the most holidays</h2>
<p>March 2026 has the most days off: Nyepi, two days of Eid and three collective leave days, leaving only ${K.hariKerja(2026)[2]} working days. May 2026 follows with Labour Day, Ascension Day, Eid al-Adha and Vesak, plus two collective leave days. July 2026, by contrast, has no holiday at all and ${K.hariKerja(2026)[6]} working days, the most of the year.</p>
${h.table(['Month', 'Working days'], ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => [m, K.hariKerja(2026)[i]]), 'Working days per month 2026 (five-day week, collective leave off)', ['l', 'r'])}
<h2>Dates people look up</h2>
<p>The 81st Independence Day falls on ${h.wday(tg(2026, 'kemerdekaan'))}, so the weekend before became a three-day break. The Prophet's Birthday falls on ${h.wday(tg(2026, 'maulid'))}, eight days later. For the last month of the year, see ${h.a('libur-desember-2026', 'December 2026 holidays')}; for next year, the ${h.a('home', '2027 calendar')}.</p>
${h.mini('bl', { p: ['bln'], d: { bln: '2026-12' }, c: 'Show a single month' })}`,
    },
  }),
];
