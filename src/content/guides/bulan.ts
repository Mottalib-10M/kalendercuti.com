/** Tanggal merah per bulan: Desember 2026, lalu bulan-bulan 2027 yang punya libur. Data: SKB (engine), prosa khas tiap bulan. */
import { defineGuide, type Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dWeek, dLong, span, namaLibur, jenisLabel } from '../../lib/tool-specs';
import { kalenderBulan } from '../../lib/bausteine';

const I = (iso: string) => dWeek(iso, 'id'), E = (iso: string) => dWeek(iso, 'en');
const di = (ym: string) => K.liburTahun(Number(ym.slice(0, 4))).filter((l) => l.date.startsWith(ym));
const hk = (ym: string) => K.hariKerja(Number(ym.slice(0, 4)))[Number(ym.slice(5, 7)) - 1];
const hkNoCb = (ym: string) => K.hariKerja(Number(ym.slice(0, 4)), { cb: false })[Number(ym.slice(5, 7)) - 1];
const T = (h: Helpers, id: string, en: string) => (h.lang === 'id' ? id: en);
/** Hari libur bulan itu dalam tabel. */
const tabelBulan = (h: Helpers, ym: string) => h.table([T(h, 'Tanggal', 'Date'), T(h, 'Keterangan', 'Holiday'), T(h, 'Jenis', 'Type')], di(ym).map((x) => [h.wday(x.date), namaLibur(x, h.lang), jenisLabel(x.jenis, h.lang)]), T(h, `Hari libur ${h.my(ym)} menurut SKB`, `Holidays in ${h.my(ym)} under the decree`), ['l', 'l', 'l']);
/** Peluang cuti yang menyentuh bulan itu. */
const tabelPeluang = (h: Helpers, ym: string) => {
  const y = Number(ym.slice(0, 4));
  const rows = K.jembatan(y).filter((b) => b.cutiDari.startsWith(ym) || b.liburDari.startsWith(ym) || b.liburSampai.startsWith(ym)).slice(0, 5)
    .map((b) => [span(b.cutiDari, b.cutiSampai, h.lang), b.cuti, span(b.liburDari, b.liburSampai, h.lang), b.libur]);
  return rows.length ? h.table([T(h, 'Ambil cuti', 'Take leave'), T(h, 'Hari cuti', 'Leave days'), T(h, 'Libur berturut-turut', 'Off in a row'), T(h, 'Hari libur', 'Days off')], rows, T(h, `Peluang cuti di sekitar ${h.my(ym)}`, `Leave opportunities around ${h.my(ym)}`), ['l', 'r', 'l', 'r']): '';
};
const blok = (h: Helpers, ym: string) => `${kalenderBulan(h, ym)}\n${tabelBulan(h, ym)}`;
const tg = (y: number, id: Parameters<typeof K.tanggalHari>[1]) => K.tanggalHari(y, id)!;

export default [
  defineGuide({
    id: 'libur-desember-2026', group: 'bulan', order: 40, tool: 'bl', toolArg: { bln: '2026-12' },
    related: ['natal-2026', 'cuti-bersama-2026', 'libur-januari-2027', 'tahun-baru-2027'],
    sources: ['skb-2026'],
    idn: {
      slug: 'libur-desember-2026', nav: 'Libur Desember 2026', card: 'Natal, cuti bersama dan akhir tahun',
      title: 'Libur Desember 2026: Natal, cuti bersama 24 Des, akhir tahun',
      description: 'Tanggal merah Desember 2026: cuti bersama Kamis 24 dan Natal Jumat 25 Desember, libur empat hari, 21 hari kerja, dan cara menyambungnya sampai Tahun Baru 2027.',
      h1: 'Libur Desember 2026: Natal dan pergantian tahun',
      intro: 'Kalender Desember 2026 dengan tanggal merah dan cuti bersama. Ubah bulan pada alat untuk melihat hari kerja dan libur bulan lain.',
      resume: `Desember 2026 punya satu libur nasional dan satu cuti bersama. Natal jatuh pada ${I(tg(2026, 'natal'))}, dan pemerintah menetapkan cuti bersama pada ${I('2026-12-24')}. Bersama Sabtu 26 dan Minggu 27 Desember, terbentuk libur empat hari berturut-turut tanpa mengambil cuti. Bulan ini punya ${hk('2026-12')} hari kerja untuk pola lima hari, atau ${hkNoCb('2026-12')} bila perusahaan Anda tidak meliburkan cuti bersama. Pekan terakhir tahun ini, Senin 28 sampai Kamis 31 Desember, hanya berisi empat hari kerja sebelum Tahun Baru 2027 yang jatuh pada Jumat. Empat hari cuti di pekan itu menghasilkan sebelas hari libur dari 24 Desember sampai 3 Januari 2027, salah satu pertukaran terbaik dalam dua tahun ini. Bagi yang hanya punya dua hari cuti tersisa, 30 dan 31 Desember memberi lima hari libur. Hari Ibu pada 22 Desember diperingati tetapi bukan hari libur.`,
      faqs: [
        { q: 'Apakah 31 Desember 2026 hari libur?', a: 'Tidak. Kamis 31 Desember 2026 adalah hari kerja biasa menurut SKB 2026. Libur baru dimulai Jumat 1 Januari 2027, Tahun Baru Masehi. Banyak kantor pulang lebih awal pada malam pergantian tahun, tetapi itu kebijakan masing-masing, bukan ketetapan pemerintah. Malam itu juga tidak ada cuti bersama.' },
        { q: 'Berapa hari libur Natal 2026?', a: 'Empat hari, dari Kamis 24 sampai Minggu 27 Desember 2026, bila perusahaan Anda menerapkan cuti bersama. Tanpa cuti bersama, liburnya tiga hari dari Jumat 25 sampai Minggu 27 Desember. Dengan cuti 28 sampai 31 Desember, libur bersambung sampai 3 Januari 2027.' },
        { q: 'Apakah Hari Ibu 22 Desember tanggal merah?', a: 'Bukan. Hari Ibu adalah hari nasional yang diperingati setiap 22 Desember, tetapi tidak termasuk hari libur dalam Keppres maupun SKB. Pada 2026 tanggal itu jatuh pada Selasa dan merupakan hari kerja biasa. Pada 2027, 22 Desember jatuh pada Rabu dan juga hari kerja biasa.' },
      ],
      body: (h) => `<h2>Kalender Desember 2026</h2>
${blok(h, '2026-12')}
<h2>Dari Natal ke Tahun Baru</h2>
<p>Desember 2026 adalah kesempatan terakhir memakai sisa cuti tahunan. Natal dan cuti bersama sudah memberi empat hari libur. Di antara Minggu 27 Desember dan Tahun Baru pada Jumat 1 Januari hanya ada empat hari kerja. Rencana yang menyambung semuanya membutuhkan empat hari cuti dan memberi sebelas hari libur. Rencana yang lebih hemat, cuti hanya pada 31 Desember, memberi empat hari libur dari Kamis 31 Desember sampai Minggu 3 Januari.</p>
${tabelPeluang(h, '2026-12')}
<p>Daftar libur dan cuti bersama sepanjang 2026 ada di ${h.src('skb-2026', 'SKB 2026')} dan di halaman ${h.a('cuti-bersama-2026', 'cuti bersama 2026')}. Bulan berikutnya: ${h.a('libur-januari-2027', 'libur Januari 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2026, cuti: 4 }, c: 'Rencanakan libur akhir tahun' })}`,
    },
    en: {
      slug: 'holidays-december-2026', nav: 'December 2026 holidays', card: 'Christmas, collective leave and year end',
      title: 'December 2026 holidays Indonesia: Christmas and year end',
      description: 'Indonesia holidays in December 2026: collective leave on Thursday 24, Christmas on Friday 25 December, a four-day break, 21 working days and a bridge to 2027.',
      h1: 'December 2026 holidays in Indonesia: Christmas and New Year',
      intro: 'The December 2026 calendar with holidays and collective leave. Change the month in the tool to see the working days and holidays of another month.',
      resume: `December 2026 has one national holiday and one collective leave day. Christmas falls on ${E(tg(2026, 'natal'))}, and the government set collective leave on ${E('2026-12-24')}. With Saturday 26 and Sunday 27 December, that makes a four-day break without any leave. The month has ${hk('2026-12')} working days on a five-day week, or ${hkNoCb('2026-12')} if your employer does not give collective leave. The last week of the year, Monday 28 to Thursday 31 December, holds only four working days before New Year 2027, which falls on a Friday. Four leave days that week give eleven days off from 24 December to 3 January 2027, one of the best trades of these two years. With only two leave days left, 30 and 31 December give five days off. Mother's Day on 22 December is marked but is not a holiday.`,
      faqs: [
        { q: 'Is 31 December 2026 a holiday in Indonesia?', a: 'No. Thursday 31 December 2026 is an ordinary working day under the 2026 decree. The holiday starts on Friday 1 January 2027, New Year\'s Day. Many offices close early on New Year\'s Eve, but that is each employer\'s choice, not a government rule.' },
        { q: 'How long is the 2026 Christmas break in Indonesia?', a: 'Four days, from Thursday 24 to Sunday 27 December 2026, if your employer applies collective leave. Without it, the break is three days from Friday 25 to Sunday 27 December. With leave from 28 to 31 December, the break runs on to 3 January 2027.' },
        { q: 'Is Mother\'s Day on 22 December a public holiday?', a: 'No. Mother\'s Day (Hari Ibu) is a national day marked every 22 December, but it is not a holiday in the presidential decree or the joint decree. In 2026 it falls on a Tuesday and is an ordinary working day.' },
      ],
      body: (h) => `<h2>December 2026 calendar</h2>
${blok(h, '2026-12')}
<h2>From Christmas to New Year</h2>
<p>December 2026 is the last chance to use leftover annual leave. Christmas and collective leave already give four days off. Between Sunday 27 December and New Year on Friday 1 January there are only four working days. The plan that joins everything needs four leave days and gives eleven days off. A thriftier plan, leave on 31 December only, gives four days off from Thursday 31 December to Sunday 3 January.</p>
${tabelPeluang(h, '2026-12')}
<p>The holidays and collective leave for all of 2026 are in the ${h.src('skb-2026', '2026 joint decree')} and on ${h.a('cuti-bersama-2026', 'collective leave 2026')}. Next month: ${h.a('libur-januari-2027', 'January 2027 holidays')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2026, cuti: 4 }, c: 'Plan your year-end break' })}`,
    },
  }),
  defineGuide({
    id: 'libur-januari-2027', group: 'bulan', order: 41, tool: 'bl', toolArg: { bln: '2027-01' },
    related: ['tahun-baru-2027', 'isra-mikraj-2027', 'libur-februari-2027', 'long-weekend-2027'],
    sources: ['skb-2027'],
    idn: {
      slug: 'libur-januari-2027', nav: 'Libur Januari 2027', card: 'Tahun Baru dan Isra Mikraj, satu jembatan',
      title: 'Libur Januari 2027: Tahun Baru, Isra Mikraj dan cuti Senin',
      description: 'Tanggal merah Januari 2027: Tahun Baru Jumat 1 Januari dan Isra Mikraj Selasa 5 Januari. Cuti Senin 4 Januari memberi lima hari libur. 19 hari kerja bulan ini.',
      h1: 'Libur Januari 2027: dua tanggal merah dalam lima hari',
      intro: 'Kalender Januari 2027 dengan tanggal merahnya. Alat di atas menghitung hari kerja bulan ini untuk pola lima atau enam hari.',
      resume: `Januari 2027 dibuka dengan dua tanggal merah yang berdekatan. Tahun Baru Masehi jatuh pada ${I(tg(2027, 'tahun-baru'))}, dan Isra Mikraj Nabi Muhammad SAW 1448 H pada ${I(tg(2027, 'isra-mikraj'))}. Di antara keduanya hanya ada akhir pekan dan satu hari kerja, Senin 4 Januari. Mengambil cuti pada hari itu memberi lima hari libur berturut-turut, dari Jumat 1 sampai Selasa 5 Januari, dengan satu hari cuti saja. Itu jembatan terbaik kedua sepanjang 2027 setelah 21 Mei. Tanpa cuti, Tahun Baru tetap memberi long weekend tiga hari. Tidak ada cuti bersama di bulan Januari 2027. Bulan ini punya ${hk('2027-01')} hari kerja untuk lima hari seminggu. Bagi yang ingin libur lebih panjang, cuti Rabu 6 sampai Jumat 8 Januari menambah tiga hari lagi dan menyambung libur sampai Minggu 10 Januari, sepuluh hari dengan empat hari cuti.`,
      faqs: [
        { q: 'Kapan Isra Mikraj Januari 2027?', a: `Selasa 5 Januari 2027, 27 Rajab 1448 H, menurut SKB 2027. Isra Mikraj muncul lagi pada Minggu 26 Desember 2027 untuk tahun 1449 H, sehingga 2027 punya dua libur Isra Mikraj. Yang pertama jatuh pada hari kerja, yang kedua pada akhir pekan.` },
        { q: 'Apakah 4 Januari 2027 cuti bersama?', a: 'Tidak. Senin 4 Januari 2027 adalah hari kerja biasa; SKB 2027 tidak menetapkan cuti bersama di bulan Januari. Hari itu justru tempat terbaik untuk cuti pribadi, karena menyambung Tahun Baru dengan Isra Mikraj menjadi lima hari libur. Cuti satu hari itu memberi libur dari Jumat 1 sampai Selasa 5 Januari.' },
        { q: 'Berapa hari kerja di Januari 2027?', a: `${hk('2027-01')} hari untuk pola Senin sampai Jumat. Januari 2027 punya 21 hari Senin sampai Jumat, dikurangi Tahun Baru dan Isra Mikraj. Untuk enam hari kerja seminggu, alat di halaman ini menampilkan angkanya dengan memilih “6 hari”. Kedua libur itu jatuh pada hari kerja: Jumat 1 Januari dan Selasa 5 Januari.` },
      ],
      body: (h) => `<h2>Kalender Januari 2027</h2>
${blok(h, '2027-01')}
<h2>Jembatan awal tahun</h2>
<p>Awal 2027 jarang terjadi: dua libur nasional terpisah satu hari kerja. Penyebabnya Isra Mikraj yang bergeser sebelas hari setiap tahun; pada 2026 jatuh 16 Januari, pada 2027 tanggal 5 Januari, dan pada akhir tahun yang sama sudah kembali lagi. Tabel berikut menunjukkan cara memanfaatkannya.</p>
${tabelPeluang(h, '2027-01')}
<p>Semua tanggal berasal dari ${h.src('skb-2027', 'SKB 2027')}. Rencana cuti terbaik sepanjang tahun ada di ${h.a('long-weekend-2027', 'long weekend 2027')}. Bulan berikutnya: ${h.a('libur-februari-2027', 'libur Februari 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 1 }, c: 'Hitung jembatan Anda' })}`,
    },
    en: {
      slug: 'holidays-january-2027', nav: 'January 2027 holidays', card: 'New Year and Isra Mi\'raj, one bridge',
      title: 'January 2027 holidays Indonesia: New Year and Isra Mi\'raj',
      description: 'Indonesia holidays in January 2027: New Year on Friday 1 January and Isra Mi\'raj on Tuesday 5 January. Leave on Monday 4 January gives five days off in a row.',
      h1: 'January 2027 holidays: two red dates in five days',
      intro: 'The January 2027 calendar with its holidays. The tool above counts this month\'s working days on a five- or six-day week.',
      resume: `January 2027 opens with two holidays close together. New Year's Day falls on ${E(tg(2027, 'tahun-baru'))}, and Isra Mi'raj 1448 on ${E(tg(2027, 'isra-mikraj'))}. Between them lie only a weekend and one working day, Monday 4 January. Taking that day off gives five days in a row, from Friday 1 to Tuesday 5 January, for a single leave day. It is the second-best bridge of 2027 after 21 May. Without leave, New Year still gives a three-day weekend. There is no collective leave in January 2027. The month has ${hk('2027-01')} working days on a five-day week. For a longer break, leave from Wednesday 6 to Friday 8 January adds three more days and runs the break to Sunday 10 January: ten days for four days of leave.`,
      faqs: [
        { q: 'When is Isra Mi\'raj in January 2027?', a: `Tuesday 5 January 2027, 27 Rajab 1448, under the 2027 decree. Isra Mi'raj comes round again on Sunday 26 December 2027 for 1449, so 2027 has two Isra Mi'raj holidays. The first falls on a working day, the second on a weekend.` },
        { q: 'Is 4 January 2027 a collective leave day?', a: 'No. Monday 4 January 2027 is an ordinary working day; the 2027 decree sets no collective leave in January. That makes it the best place for a personal leave day, since it joins New Year to Isra Mi\'raj for five days off.' },
        { q: 'How many working days are in January 2027?', a: `${hk('2027-01')} on a Monday-to-Friday week. January 2027 has 21 weekdays, minus New Year and Isra Mi'raj. For a six-day week, the tool on this page shows the figure when you choose "6 days". Both holidays fall on weekdays: Friday 1 January and Tuesday 5 January.` },
      ],
      body: (h) => `<h2>January 2027 calendar</h2>
${blok(h, '2027-01')}
<h2>A bridge at the start of the year</h2>
<p>The start of 2027 is unusual: two national holidays one working day apart. The cause is Isra Mi'raj, which moves eleven days each year; in 2026 it fell on 16 January, in 2027 on 5 January, and by the end of the same year it is back again. The table shows how to make use of it.</p>
${tabelPeluang(h, '2027-01')}
<p>All dates come from the ${h.src('skb-2027', '2027 joint decree')}. The best leave plan for the whole year is on ${h.a('long-weekend-2027', 'long weekends 2027')}. Next month: ${h.a('libur-februari-2027', 'February 2027 holidays')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 1 }, c: 'Work out your bridge' })}`,
    },
  }),
  defineGuide({
    id: 'libur-februari-2027', group: 'bulan', order: 42, tool: 'bl', toolArg: { bln: '2027-02' },
    related: ['imlek-2027', 'puasa-2027', 'libur-maret-2027', 'libur-januari-2027'],
    sources: ['skb-2027'],
    idn: {
      slug: 'libur-februari-2027', nav: 'Libur Februari 2027', card: 'Imlek pada Sabtu, cuti bersama Jumat 5 Februari',
      title: 'Libur Februari 2027: Imlek, cuti bersama 5 Februari, puasa',
      description: 'Tanggal merah Februari 2027: cuti bersama Jumat 5 Februari dan Imlek Sabtu 6 Februari memberi libur tiga hari. Puasa Ramadan diperkirakan mulai 8 Februari.',
      h1: 'Libur Februari 2027: Imlek dan awal Ramadan',
      intro: 'Kalender Februari 2027 dengan tanggal merah dan cuti bersamanya. Gunakan alat di atas untuk melihat hari kerja dengan atau tanpa cuti bersama.',
      resume: `Februari 2027 hanya punya satu libur nasional, dan libur itu jatuh pada Sabtu: Tahun Baru Imlek 2578 Kongzili pada ${I(tg(2027, 'imlek'))}. Pemerintah menambahkan cuti bersama pada hari sebelumnya, ${I('2027-02-05')}, sehingga pekerja yang mengikuti cuti bersama tetap mendapat libur tiga hari dari Jumat sampai Minggu. Yang tidak mendapat cuti bersama hanya merasakan akhir pekan biasa. Bulan ini juga menjadi awal Ramadan 1448 H: menurut perhitungan, 1 Ramadan jatuh pada ${I(K.raya('puasa', 2027)!.date)}, tetapi tanggal pastinya menunggu sidang isbat. Februari 2027 punya ${hk('2027-02')} hari kerja dengan cuti bersama atau ${hkNoCb('2027-02')} tanpa. Untuk libur lebih panjang, cuti Senin 1 sampai Kamis 4 Februari memberi sembilan hari libur dari Sabtu 30 Januari sampai Minggu 7 Februari, sebelum puasa dimulai.`,
      faqs: [
        { q: 'Kapan Imlek 2027 dan apakah ada cuti bersama?', a: 'Tahun Baru Imlek 2578 Kongzili jatuh pada Sabtu 6 Februari 2027. SKB 2027 menetapkan cuti bersama pada Jumat 5 Februari, sehingga terbentuk libur tiga hari dari Jumat sampai Minggu bagi pekerja yang mengikuti cuti bersama. Pada 2026, Imlek jatuh pada Selasa 17 Februari.' },
        { q: 'Apakah ada libur nasional pada hari kerja di Februari 2027?', a: 'Tidak ada. Satu-satunya libur nasional, Imlek, jatuh pada Sabtu. Hari kerja yang libur di bulan ini hanya cuti bersama Jumat 5 Februari, yang pelaksanaannya di perusahaan swasta ditentukan oleh pimpinan perusahaan. Februari 2027 punya 20 hari Senin sampai Jumat, sehingga tersisa 19 hari kerja bila cuti bersama berlaku.' },
        { q: 'Kapan puasa 2027 dimulai?', a: `Perhitungan menunjukkan 1 Ramadan 1448 H jatuh pada ${I(K.raya('puasa', 2027)!.date)}. Ijtimak terjadi Sabtu malam 6 Februari, sehingga hilal kemungkinan sudah memenuhi kriteria pada petang 7 Februari. Tanggal resmi diumumkan Menteri Agama setelah sidang isbat. Hari pertama puasa bukan hari libur nasional.` },
      ],
      body: (h) => `<h2>Kalender Februari 2027</h2>
${blok(h, '2027-02')}
<h2>Sebelum Ramadan dimulai</h2>
<p>Februari 2027 adalah bulan terakhir sebelum puasa. Bagi yang ingin pulang kampung atau berlibur sebelum Ramadan, pekan pertama bulan ini paling cocok: empat hari cuti dari Senin 1 sampai Kamis 4 Februari menyambung akhir pekan 30 dan 31 Januari dengan cuti bersama dan Imlek. Hasilnya sembilan hari libur.</p>
${tabelPeluang(h, '2027-02')}
<p>Tanggal libur berasal dari ${h.src('skb-2027', 'SKB 2027')}. Tanggal awal puasa dan cara penetapannya dijelaskan di ${h.a('puasa-2027', 'awal puasa 2027')}. Bulan dengan libur terbanyak tahun ini menyusul: ${h.a('libur-maret-2027', 'libur Maret 2027')}.</p>
${h.mini('ij', { p: ['bulan'], d: { bulan: '1448-9' }, c: 'Lihat perhitungan awal Ramadan' })}`,
    },
    en: {
      slug: 'holidays-february-2027', nav: 'February 2027 holidays', card: 'Chinese New Year on a Saturday, leave on 5 February',
      title: 'February 2027 holidays Indonesia: Imlek and leave on 5 Feb',
      description: 'Indonesia holidays in February 2027: collective leave on Friday 5 and Chinese New Year on Saturday 6 February make a three-day break. Ramadan starts about 8 Feb',
      h1: 'February 2027 holidays: Chinese New Year and Ramadan',
      intro: 'The February 2027 calendar with its holiday and collective leave. Use the tool above to see the working days with or without collective leave.',
      resume: `February 2027 has only one national holiday, and it falls on a Saturday: Chinese New Year 2578 on ${E(tg(2027, 'imlek'))}. The government added collective leave on the day before, ${E('2027-02-05')}, so workers who follow collective leave still get a three-day break from Friday to Sunday. Those without collective leave get an ordinary weekend. This month also sees the start of Ramadan 1448: by computation, 1 Ramadan falls on ${E(K.raya('puasa', 2027)!.date)}, but the final date awaits the isbat session. February 2027 has ${hk('2027-02')} working days with collective leave or ${hkNoCb('2027-02')} without. For a longer break, leave from Monday 1 to Thursday 4 February gives nine days off from Saturday 30 January to Sunday 7 February, before the fast begins.`,
      faqs: [
        { q: 'When is Chinese New Year 2027 in Indonesia, and is there collective leave?', a: 'Chinese New Year 2578 falls on Saturday 6 February 2027. The 2027 decree sets collective leave on Friday 5 February, so there is a three-day break from Friday to Sunday for workers who follow collective leave. Chinese New Year 2026 fell on Tuesday 17 February.' },
        { q: 'Is there a weekday national holiday in February 2027?', a: 'No. The only national holiday, Chinese New Year, falls on a Saturday. The only weekday off this month is the collective leave on Friday 5 February, which private employers may or may not apply. February 2027 therefore has 19 or 20 working days on a five-day week.' },
        { q: 'When does Ramadan 2027 start in Indonesia?', a: `By computation, 1 Ramadan 1448 falls on ${E(K.raya('puasa', 2027)!.date)}. The conjunction occurs on the night of Saturday 6 February, so the crescent is likely to meet the criteria on the evening of 7 February. The official date is announced by the Minister of Religious Affairs after the isbat session.` },
      ],
      body: (h) => `<h2>February 2027 calendar</h2>
${blok(h, '2027-02')}
<h2>Before Ramadan begins</h2>
<p>February 2027 is the last month before the fast. For a trip home or a holiday before Ramadan, the first week of the month suits best: four leave days from Monday 1 to Thursday 4 February join the weekend of 30 and 31 January to the collective leave and Chinese New Year. The result is nine days off.</p>
${tabelPeluang(h, '2027-02')}
<p>Holiday dates come from the ${h.src('skb-2027', '2027 joint decree')}. The start of Ramadan and how it is set are explained on ${h.a('puasa-2027', 'Ramadan 2027')}. The month with the most holidays this year comes next: ${h.a('libur-maret-2027', 'March 2027 holidays')}.</p>
${h.mini('ij', { p: ['bulan'], d: { bulan: '1448-9' }, c: 'See the Ramadan start computation' })}`,
    },
  }),
  defineGuide({
    id: 'libur-maret-2027', group: 'bulan', order: 43, tool: 'bl', toolArg: { bln: '2027-03' },
    related: ['lebaran-2027', 'nyepi-2027', 'paskah-2027', 'cuti-bersama-2027'],
    sources: ['skb-2027'],
    idn: {
      slug: 'libur-maret-2027', nav: 'Libur Maret 2027', card: 'Nyepi, Lebaran dan Paskah: 15 hari kerja saja',
      title: 'Libur Maret 2027: Nyepi, Lebaran, Paskah dan 4 cuti bersama',
      description: 'Tanggal merah Maret 2027: Nyepi 8 Maret, Idul Fitri 10-11 Maret, Wafat Yesus Kristus 26 Maret, empat cuti bersama, libur Lebaran 10 hari, 15 hari kerja.',
      h1: 'Libur Maret 2027: bulan dengan libur terbanyak',
      intro: 'Kalender Maret 2027 dengan semua tanggal merah dan cuti bersamanya. Alat di atas menghitung hari kerja bulan ini untuk pola kerja Anda.',
      resume: `Maret 2027 adalah bulan dengan libur terbanyak tahun ini. Hari Suci Nyepi jatuh pada ${I(tg(2027, 'nyepi'))}, Idul Fitri 1448 H pada ${I(tg(2027, 'idul-fitri'))} dan Kamis 11 Maret, Wafat Yesus Kristus pada ${I(tg(2027, 'wafat-yesus'))}, dan Paskah pada Minggu 28 Maret. SKB menambahkan empat cuti bersama: Selasa 9, Jumat 12, Senin 15 dan Kamis 25 Maret. Hasilnya dua libur panjang tanpa cuti: sepuluh hari dari Sabtu 6 sampai Senin 15 Maret, dan empat hari dari Kamis 25 sampai Minggu 28 Maret. Di antaranya hanya tujuh hari kerja. Bulan ini punya ${hk('2027-03')} hari kerja dengan cuti bersama, atau ${hkNoCb('2027-03')} tanpa. Dengan cuti 16 sampai 24 Maret, tujuh hari kerja, kedua libur menyatu menjadi dua puluh tiga hari, dari 6 sampai 28 Maret. Bagi perusahaan dan kantor layanan, inilah bulan yang perlu direncanakan paling awal.`,
      faqs: [
        { q: 'Berapa hari libur Lebaran 2027?', a: 'Sepuluh hari, dari Sabtu 6 sampai Senin 15 Maret 2027, bila cuti bersama diterapkan. Libur itu terdiri dari akhir pekan, Nyepi pada 8 Maret, cuti bersama 9, 12 dan 15 Maret, serta Idul Fitri pada 10 dan 11 Maret, lalu akhir pekan 13 dan 14 Maret.' },
        { q: 'Mengapa Nyepi dan Lebaran berdekatan pada 2027?', a: 'Nyepi mengikuti kalender Saka yang berpatokan pada bulan dan matahari, sedangkan Idul Fitri mengikuti kalender Hijriah murni. Idul Fitri maju sekitar sebelas hari setiap tahun. Pada 2026 dan 2027 keduanya kebetulan jatuh dalam pekan yang sama; pada 2028 Idul Fitri sudah bergeser ke akhir Februari.' },
        { q: 'Berapa hari kerja di Maret 2027?', a: `${hk('2027-03')} hari untuk lima hari kerja dengan cuti bersama, ${hkNoCb('2027-03')} tanpa cuti bersama. Itu angka terendah dalam setahun: bulan ini kehilangan delapan hari kerja karena Nyepi, dua hari Idul Fitri, Wafat Yesus Kristus dan empat cuti bersama. Untuk enam hari kerja seminggu, alat di halaman ini menampilkan angkanya.` },
      ],
      body: (h) => `<h2>Kalender Maret 2027</h2>
${blok(h, '2027-03')}
<h2>Dua libur panjang dan tujuh hari kerja di antaranya</h2>
<p>Pekan kedua Maret hampir seluruhnya libur, dan pekan keempat berakhir dengan Jumat Agung dan Paskah. Di tengahnya hanya ada Selasa 16 sampai Jumat 19 Maret dan Senin 22 sampai Rabu 24 Maret. Dua pilihan cuti berikut paling menguntungkan.</p>
${tabelPeluang(h, '2027-03')}
<p>Bagi pemudik, arus balik setelah Lebaran biasanya memuncak pada akhir pekan setelah hari raya. Pada 2027 itu jatuh pada 13 sampai 15 Maret, hari terakhir libur panjang. Cuti beberapa hari setelah 15 Maret dapat menghindari puncak itu.</p>
<p>Daftar resmi berasal dari ${h.src('skb-2027', 'SKB 2027')}. Rincian per hari raya ada di ${h.a('lebaran-2027', 'Lebaran 2027')}, ${h.a('nyepi-2027', 'Nyepi 2027')} dan ${h.a('paskah-2027', 'Paskah 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 4 }, c: 'Hitung libur Lebaran Anda' })}`,
    },
    en: {
      slug: 'holidays-march-2027', nav: 'March 2027 holidays', card: 'Nyepi, Eid and Easter: only 15 working days',
      title: 'March 2027 holidays Indonesia: Nyepi, Eid and Good Friday',
      description: 'Indonesia holidays in March 2027: Nyepi on 8 March, Eid al-Fitr on 10-11 March, Good Friday on 26 March, four collective leave days and a ten-day Eid break.',
      h1: 'March 2027 holidays: the month with the most days off',
      intro: 'The March 2027 calendar with every holiday and collective leave day. The tool above counts this month\'s working days for your work pattern.',
      resume: `March 2027 has the most holidays of the year. Nyepi falls on ${E(tg(2027, 'nyepi'))}, Eid al-Fitr 1448 on ${E(tg(2027, 'idul-fitri'))} and Thursday 11 March, Good Friday on ${E(tg(2027, 'wafat-yesus'))} and Easter on Sunday 28 March. The decree adds four collective leave days: Tuesday 9, Friday 12, Monday 15 and Thursday 25 March. The result is two long breaks without leave: ten days from Saturday 6 to Monday 15 March, and four days from Thursday 25 to Sunday 28 March. Between them lie only seven working days. The month has ${hk('2027-03')} working days with collective leave, or ${hkNoCb('2027-03')} without. With leave from 16 to 24 March, seven working days, the two breaks merge into twenty-three days, from 6 to 28 March. For companies and service offices, this is the month to plan earliest.`,
      faqs: [
        { q: 'How long is the 2027 Eid break in Indonesia?', a: 'Ten days, from Saturday 6 to Monday 15 March 2027, if collective leave applies. The break is made up of the weekend, Nyepi on 8 March, collective leave on 9, 12 and 15 March, Eid al-Fitr on 10 and 11 March, and the weekend of 13 and 14 March.' },
        { q: 'Why are Nyepi and Eid so close together in 2027?', a: 'Nyepi follows the Saka calendar, which tracks both moon and sun, while Eid follows the purely lunar Hijri calendar. Eid moves about eleven days earlier each year. In 2026 and 2027 the two happen to fall in the same week; by 2028 Eid has moved to late February.' },
        { q: 'How many working days are in March 2027?', a: `${hk('2027-03')} on a five-day week with collective leave, ${hkNoCb('2027-03')} without it. That is the lowest figure of the year: the month loses eight working days to Nyepi, two days of Eid, Good Friday and four collective leave days. The working-days tool gives the figure for a six-day week.` },
      ],
      body: (h) => `<h2>March 2027 calendar</h2>
${blok(h, '2027-03')}
<h2>Two long breaks and seven working days between them</h2>
<p>The second week of March is almost entirely off, and the fourth ends with Good Friday and Easter. In between there are only Tuesday 16 to Friday 19 March and Monday 22 to Wednesday 24 March. These two leave options pay off most.</p>
${tabelPeluang(h, '2027-03')}
<p>For people travelling home, the return rush usually peaks on the weekend after Eid. In 2027 that falls on 13 to 15 March, the last days of the long break. A few days of leave after 15 March can avoid that peak.</p>
<p>The official list comes from the ${h.src('skb-2027', '2027 joint decree')}. Details for each festival are on ${h.a('lebaran-2027', 'Eid 2027')}, ${h.a('nyepi-2027', 'Nyepi 2027')} and ${h.a('paskah-2027', 'Easter 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 4 }, c: 'Work out your Eid break' })}`,
    },
  }),
  defineGuide({
    id: 'libur-mei-2027', group: 'bulan', order: 44, tool: 'bl', toolArg: { bln: '2027-05' },
    related: ['idul-adha-2027', 'waisak-2027', 'libur-juni-2027', 'long-weekend-2027'],
    sources: ['skb-2027'],
    idn: {
      slug: 'libur-mei-2027', nav: 'Libur Mei 2027', card: 'Kenaikan, Idul Adha, Waisak: jembatan 21 Mei',
      title: 'Libur Mei 2027: Idul Adha, Waisak, Kenaikan dan cuti 21 Mei',
      description: 'Tanggal merah Mei 2027: Kenaikan Yesus Kristus 6 Mei, Idul Adha 17 Mei, Waisak 20 Mei, dua cuti bersama, dan cuti 21 Mei yang memberi sembilan hari libur.',
      h1: 'Libur Mei 2027: empat hari raya dan jembatan terbaik tahun ini',
      intro: 'Kalender Mei 2027 dengan tanggal merah dan cuti bersamanya. Alat di atas menghitung hari kerja bulan ini.',
      resume: `Mei 2027 punya empat libur nasional dan dua cuti bersama. Hari Buruh jatuh pada Sabtu 1 Mei, Kenaikan Yesus Kristus pada ${I(tg(2027, 'kenaikan'))}, Idul Adha 1448 H pada ${I(tg(2027, 'idul-adha'))}, dan Waisak 2571 BE pada ${I(tg(2027, 'waisak'))}. Cuti bersama jatuh pada Selasa 18 dan Rabu 19 Mei, sehingga pekan ketiga Mei libur dari Sabtu 15 sampai Kamis 20 Mei, enam hari tanpa cuti. Hanya Jumat 21 Mei yang tersisa sebagai hari kerja sebelum akhir pekan. Satu hari cuti di sana memberi sembilan hari libur berturut-turut, dari 15 sampai 23 Mei: jembatan terbaik di seluruh 2027. Jumat 7 Mei, setelah Kenaikan, memberi empat hari libur dengan satu hari cuti, dan Senin 31 Mei menyambung akhir pekan dengan Hari Lahir Pancasila pada Selasa 1 Juni. Mei 2027 punya ${hk('2027-05')} hari kerja dengan cuti bersama. Tiga cuti pribadi di bulan ini memberi tujuh belas hari libur dalam tiga blok.`,
      faqs: [
        { q: 'Kapan Idul Adha 2027 dan berapa hari liburnya?', a: 'Idul Adha 1448 H jatuh pada Senin 17 Mei 2027 menurut SKB. Ditambah cuti bersama 18 dan 19 Mei serta Waisak pada Kamis 20 Mei, terbentuk libur enam hari dari Sabtu 15 sampai Kamis 20 Mei. Dengan cuti Jumat 21 Mei, libur menjadi sembilan hari.' },
        { q: 'Apakah 21 Mei 2027 cuti bersama?', a: 'Tidak. Jumat 21 Mei 2027 adalah hari kerja biasa, terjepit antara Waisak pada Kamis dan akhir pekan. Karena itu hari ini menjadi hari cuti pribadi yang paling menguntungkan di 2027: satu hari cuti untuk sembilan hari libur. Tanyakan lebih awal kepada atasan, karena banyak rekan kerja akan mengincar hari yang sama.' },
        { q: 'Apakah Hari Buruh 2027 jatuh pada hari kerja?', a: 'Tidak. Hari Buruh Internasional, 1 Mei 2027, jatuh pada Sabtu. Indonesia tidak memindahkan libur yang jatuh pada akhir pekan, sehingga pekerja lima hari tidak mendapat hari libur tambahan dari Hari Buruh tahun itu. Pada 2026, Hari Buruh jatuh pada Jumat dan memberi akhir pekan tiga hari.' },
      ],
      body: (h) => `<h2>Kalender Mei 2027</h2>
${blok(h, '2027-05')}
<h2>Tiga jembatan dalam satu bulan</h2>
<p>Mei 2027 menawarkan tiga jembatan satu hari: Jumat 7 Mei, Jumat 21 Mei dan Senin 31 Mei. Ketiganya bersama menghabiskan tiga hari cuti dan memberi tujuh belas hari libur. Jumat 21 Mei paling berharga karena menyambung libur enam hari dengan akhir pekan.</p>
${tabelPeluang(h, '2027-05')}
<p>Libur Idul Adha dan Waisak 2027 berdekatan karena Waisak mengikuti bulan purnama di bulan Waisak menurut penanggalan Buddha, sedangkan Idul Adha bergeser sebelas hari setiap tahun. Daftar resmi berasal dari ${h.src('skb-2027', 'SKB 2027')}. Rinciannya di ${h.a('idul-adha-2027', 'Idul Adha 2027')} dan ${h.a('waisak-2027', 'Waisak 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 3 }, c: 'Hitung jembatan Mei Anda' })}`,
    },
    en: {
      slug: 'holidays-may-2027', nav: 'May 2027 holidays', card: 'Ascension, Eid al-Adha, Vesak: the 21 May bridge',
      title: 'May 2027 holidays Indonesia: Eid al-Adha, Vesak, Ascension',
      description: 'Indonesia holidays in May 2027: Ascension Day on 6 May, Eid al-Adha on 17 May, Vesak on 20 May, two collective leave days and leave on 21 May for nine days off.',
      h1: 'May 2027 holidays: four festivals and the best bridge of the year',
      intro: 'The May 2027 calendar with its holidays and collective leave. The tool above counts this month\'s working days.',
      resume: `May 2027 has four national holidays and two collective leave days. Labour Day falls on Saturday 1 May, Ascension Day on ${E(tg(2027, 'kenaikan'))}, Eid al-Adha 1448 on ${E(tg(2027, 'idul-adha'))} and Vesak 2571 BE on ${E(tg(2027, 'waisak'))}. Collective leave falls on Tuesday 18 and Wednesday 19 May, so the third week of May is off from Saturday 15 to Thursday 20 May, six days without leave. Only Friday 21 May remains as a working day before the weekend. One leave day there gives nine days off in a row, from 15 to 23 May: the best bridge in all of 2027. Friday 7 May, after Ascension Day, gives four days off for one leave day, and Monday 31 May joins the weekend to Pancasila Day on Tuesday 1 June. May 2027 has ${hk('2027-05')} working days with collective leave. Three personal leave days this month give seventeen days off in three blocks.`,
      faqs: [
        { q: 'When is Eid al-Adha 2027 in Indonesia, and how long is the break?', a: 'Eid al-Adha 1448 falls on Monday 17 May 2027 under the decree. With collective leave on 18 and 19 May and Vesak on Thursday 20 May, there is a six-day break from Saturday 15 to Thursday 20 May. With leave on Friday 21 May, the break becomes nine days.' },
        { q: 'Is 21 May 2027 a collective leave day?', a: 'No. Friday 21 May 2027 is an ordinary working day, caught between Vesak on Thursday and the weekend. That makes it the most rewarding personal leave day of 2027: one day of leave for nine days off. Ask early, since many colleagues will want the same day.' },
        { q: 'Does Labour Day 2027 fall on a working day?', a: 'No. International Labour Day, 1 May 2027, falls on a Saturday. Indonesia does not move holidays that fall on a weekend, so five-day workers get no extra day off from Labour Day that year. In 2026, Labour Day fell on a Friday and gave a three-day weekend.' },
      ],
      body: (h) => `<h2>May 2027 calendar</h2>
${blok(h, '2027-05')}
<h2>Three bridges in one month</h2>
<p>May 2027 offers three one-day bridges: Friday 7 May, Friday 21 May and Monday 31 May. Together they use three leave days and give seventeen days off. Friday 21 May is worth most because it joins a six-day break to the weekend.</p>
${tabelPeluang(h, '2027-05')}
<p>Eid al-Adha and Vesak are close together in 2027 because Vesak follows the full moon of the month of Vesak in the Buddhist calendar, while Eid al-Adha moves eleven days a year. The official list comes from the ${h.src('skb-2027', '2027 joint decree')}. Details are on ${h.a('idul-adha-2027', 'Eid al-Adha 2027')} and ${h.a('waisak-2027', 'Vesak 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 3 }, c: 'Work out your May bridges' })}`,
    },
  }),
  defineGuide({
    id: 'libur-juni-2027', group: 'bulan', order: 45, tool: 'bl', toolArg: { bln: '2027-06' },
    related: ['tahun-baru-islam-2027', 'libur-mei-2027', 'libur-agustus-2027', 'hari-kerja-2027'],
    sources: ['skb-2027'],
    idn: {
      slug: 'libur-juni-2027', nav: 'Libur Juni 2027', card: 'Pancasila dan 1 Muharam, libur sekolah',
      title: 'Libur Juni 2027: Hari Lahir Pancasila dan Tahun Baru Islam',
      description: 'Tanggal merah Juni 2027: Hari Lahir Pancasila Selasa 1 Juni dan 1 Muharam 1449 H Minggu 6 Juni. Cuti Senin 31 Mei memberi empat hari libur berturut-turut.',
      h1: 'Libur Juni 2027: Pancasila dan Tahun Baru Islam',
      intro: 'Kalender Juni 2027 dengan dua tanggal merahnya. Alat di atas menghitung hari kerja bulan ini untuk pola lima atau enam hari.',
      resume: `Juni 2027 punya dua libur nasional. Hari Lahir Pancasila jatuh pada ${I(tg(2027, 'pancasila'))}, dan Tahun Baru Islam 1 Muharam 1449 H pada ${I(tg(2027, 'muharam'))}. Libur pertama jatuh pada hari kerja, yang kedua pada akhir pekan, dan tidak ada cuti bersama bulan ini. Senin 31 Mei menjadi jembatan: satu hari cuti memberi empat hari libur dari Sabtu 29 Mei sampai Selasa 1 Juni. Sebaliknya, cuti Rabu 2 sampai Jumat 4 Juni menyambung Pancasila dengan akhir pekan berikutnya, enam hari libur dengan tiga hari cuti, dan berakhir tepat pada Tahun Baru Islam. Juni 2027 punya ${hk('2027-06')} hari kerja. Bulan ini juga awal masa libur kenaikan kelas di banyak daerah, yang diatur kalender pendidikan masing-masing provinsi, bukan SKB. Setelah 6 Juni, tidak ada libur nasional lagi sampai pertengahan Agustus.`,
      faqs: [
        { q: 'Apakah 1 Juni 2027 tanggal merah?', a: 'Ya. Hari Lahir Pancasila, Selasa 1 Juni 2027, adalah libur nasional. Karena jatuh pada Selasa, Senin 31 Mei menjadi hari kerja yang terjepit. Cuti pada hari itu memberi empat hari libur dari Sabtu 29 Mei sampai Selasa 1 Juni. Pada 2026, Hari Lahir Pancasila jatuh pada Senin.' },
        { q: 'Kapan Tahun Baru Islam 2027?', a: '1 Muharam 1449 H jatuh pada Minggu 6 Juni 2027 menurut SKB 2027. Karena jatuh pada hari Minggu, libur itu tidak menambah hari libur bagi pekerja lima atau enam hari. Malam 1 Muharam, atau malam satu Suro dalam tradisi Jawa, jatuh pada Sabtu malam 5 Juni.' },
        { q: 'Apakah libur sekolah Juni 2027 termasuk libur nasional?', a: 'Tidak. Libur kenaikan kelas ditetapkan dalam kalender pendidikan yang diterbitkan dinas pendidikan provinsi atau kabupaten dan kota, dan tanggalnya berbeda antardaerah. SKB tiga menteri hanya mengatur libur nasional dan cuti bersama. Periksa kalender pendidikan daerah Anda untuk tanggal pastinya, karena jadwal sekolah negeri, swasta dan madrasah bisa berbeda.' },
      ],
      body: (h) => `<h2>Kalender Juni 2027</h2>
${blok(h, '2027-06')}
<h2>Pancasila dan satu Suro</h2>
<p>Tahun Baru Islam dan malam satu Suro dalam tradisi Jawa jatuh pada malam yang sama: Sabtu 5 Juni 2027 setelah matahari terbenam. Dalam kalender Jawa, 1 Suro menandai pergantian tahun Jawa dan diperingati dengan berbagai tradisi di Yogyakarta, Surakarta dan daerah lain.</p>
${tabelPeluang(h, '2027-06')}
<p>Setelah Juni, bulan Juli 2027 tidak punya tanggal merah sama sekali. Libur berikutnya adalah Maulid Nabi dan Hari Kemerdekaan di bulan Agustus. Daftar resmi berasal dari ${h.src('skb-2027', 'SKB 2027')} ; lanjutkan ke ${h.a('libur-agustus-2027', 'libur Agustus 2027')}.</p>
${h.mini('hj', { p: ['bln', 'tgl'], d: { bln: '2027-06', tgl: 6 }, c: 'Lihat tanggal Hijriah' })}`,
    },
    en: {
      slug: 'holidays-june-2027', nav: 'June 2027 holidays', card: 'Pancasila Day and Islamic New Year',
      title: 'June 2027 holidays Indonesia: Pancasila and Islamic New Year',
      description: 'Indonesia holidays in June 2027: Pancasila Day on Tuesday 1 June and Islamic New Year 1449 on Sunday 6 June. Leave on Monday 31 May gives four days off.',
      h1: 'June 2027 holidays: Pancasila Day and the Islamic New Year',
      intro: 'The June 2027 calendar with its two holidays. The tool above counts this month\'s working days on a five- or six-day week.',
      resume: `June 2027 has two national holidays. Pancasila Day falls on ${E(tg(2027, 'pancasila'))}, and the Islamic New Year, 1 Muharram 1449, on ${E(tg(2027, 'muharam'))}. The first falls on a working day, the second on a weekend, and there is no collective leave this month. Monday 31 May becomes a bridge: one leave day gives four days off from Saturday 29 May to Tuesday 1 June. Alternatively, leave from Wednesday 2 to Friday 4 June joins Pancasila Day to the next weekend, six days off for three leave days, ending exactly on the Islamic New Year. June 2027 has ${hk('2027-06')} working days. The month is also the start of the end-of-year school holidays in many regions, which are set by each province's education calendar, not by the decree. After 6 June there is no national holiday until mid-August.`,
      faqs: [
        { q: 'Is 1 June 2027 a public holiday in Indonesia?', a: 'Yes. Pancasila Day, Tuesday 1 June 2027, is a national holiday. Because it falls on a Tuesday, Monday 31 May is a working day caught in between. Leave on that day gives four days off from Saturday 29 May to Tuesday 1 June.' },
        { q: 'When is the Islamic New Year 2027 in Indonesia?', a: '1 Muharram 1449 falls on Sunday 6 June 2027 under the 2027 decree. Since it falls on a Sunday, it adds no day off for five- or six-day workers. The eve of 1 Muharram, called malam satu Suro in Javanese tradition, falls on Saturday evening 5 June.' },
        { q: 'Are the June 2027 school holidays national holidays?', a: 'No. End-of-year school holidays are set in the education calendars published by provincial, regency or city education offices, and the dates differ from region to region. The three-minister decree only covers national holidays and collective leave. Check your regional education office for the exact dates.' },
      ],
      body: (h) => `<h2>June 2027 calendar</h2>
${blok(h, '2027-06')}
<h2>Pancasila Day and satu Suro</h2>
<p>The Islamic New Year and the Javanese malam satu Suro fall on the same night: Saturday 5 June 2027 after sunset. In the Javanese calendar, 1 Suro marks the Javanese new year and is observed with various traditions in Yogyakarta, Surakarta and elsewhere.</p>
${tabelPeluang(h, '2027-06')}
<p>After June, July 2027 has no holiday at all. The next holidays are the Prophet's Birthday and Independence Day in August. The official list comes from the ${h.src('skb-2027', '2027 joint decree')}; continue to ${h.a('libur-agustus-2027', 'August 2027 holidays')}.</p>
${h.mini('hj', { p: ['bln', 'tgl'], d: { bln: '2027-06', tgl: 6 }, c: 'See the Hijri date' })}`,
    },
  }),
  defineGuide({
    id: 'libur-agustus-2027', group: 'bulan', order: 46, tool: 'bl', toolArg: { bln: '2027-08' },
    related: ['hut-ri-2027', 'maulid-nabi-2027', 'libur-juni-2027', 'libur-desember-2027'],
    sources: ['skb-2027'],
    idn: {
      slug: 'libur-agustus-2027', nav: 'Libur Agustus 2027', card: 'Maulid dan 17 Agustus, jembatan 16 Agustus',
      title: 'Libur Agustus 2027: 17 Agustus, Maulid Nabi dan cuti Senin',
      description: 'Tanggal merah Agustus 2027: Maulid Nabi Minggu 15 Agustus dan HUT RI ke-82 Selasa 17 Agustus. Cuti Senin 16 Agustus memberi empat hari libur berturut-turut.',
      h1: 'Libur Agustus 2027: Maulid Nabi dan Hari Kemerdekaan',
      intro: 'Kalender Agustus 2027 dengan dua tanggal merahnya. Alat di atas menghitung hari kerja bulan ini.',
      resume: `Agustus 2027 punya dua libur nasional yang terpisah dua hari. Maulid Nabi Muhammad SAW jatuh pada ${I(tg(2027, 'maulid'))}, dan Proklamasi Kemerdekaan ke-82 pada ${I(tg(2027, 'kemerdekaan'))}. Maulid jatuh pada hari Minggu dan tidak menambah hari libur. Hari Kemerdekaan jatuh pada Selasa, sehingga Senin 16 Agustus menjadi hari kerja yang terjepit. Cuti pada hari itu memberi empat hari libur dari Sabtu 14 sampai Selasa 17 Agustus, cukup untuk mengikuti upacara di kampung halaman. Tidak ada cuti bersama di bulan Agustus 2027, dan bulan ini punya ${hk('2027-08')} hari kerja. Ini libur nasional terakhir sebelum Natal: September, Oktober dan November 2027 tidak punya tanggal merah. Bagi yang menyimpan cuti, akhir Agustus adalah saat yang baik untuk merencanakan sisa tahun, termasuk libur panjang Natal 2027.`,
      faqs: [
        { q: 'Hari apa 17 Agustus 2027?', a: 'Selasa. Hari Kemerdekaan ke-82 Republik Indonesia jatuh pada Selasa 17 Agustus 2027 dan merupakan libur nasional. Senin 16 Agustus tetap hari kerja; SKB 2027 tidak menetapkan cuti bersama di bulan Agustus. Bagi yang ingin libur panjang, satu hari cuti pada Senin itu memberi empat hari libur, dari Sabtu 14 sampai Selasa 17 Agustus.' },
        { q: 'Kapan Maulid Nabi 2027?', a: 'Minggu 15 Agustus 2027, 12 Rabiulawal 1449 H, menurut SKB 2027. Karena jatuh pada hari Minggu, Maulid tidak menambah hari libur. Pada 2028 Maulid diperkirakan jatuh sekitar awal Agustus, kembali bergeser sebelas hari lebih awal. Pada 2026, Maulid jatuh pada Selasa 25 Agustus.' },
        { q: 'Apakah ada tanggal merah setelah Agustus 2027?', a: 'Ada, tetapi baru pada akhir Desember: cuti bersama Jumat 24 Desember, Natal Sabtu 25 Desember dan Isra Mikraj Minggu 26 Desember. September, Oktober dan November 2027 tidak memiliki libur nasional maupun cuti bersama. Ketiga hari itu membentuk long weekend terakhir di tahun 2027.' },
      ],
      body: (h) => `<h2>Kalender Agustus 2027</h2>
${blok(h, '2027-08')}
<h2>Jembatan Hari Kemerdekaan</h2>
<p>Hari Kemerdekaan yang jatuh pada Selasa memberi satu jembatan klasik. Bila Anda ingin libur lebih panjang, cuti Rabu 18 sampai Jumat 20 Agustus menyambung 17 Agustus dengan akhir pekan berikutnya; bersama Senin 16, empat hari cuti memberi sembilan hari libur dari 14 sampai 22 Agustus.</p>
${tabelPeluang(h, '2027-08')}
<p>Tanggal libur berasal dari ${h.src('skb-2027', 'SKB 2027')}. Hitung mundur dan sejarah singkat ada di ${h.a('hut-ri-2027', 'HUT RI 2027')} dan ${h.a('maulid-nabi-2027', 'Maulid Nabi 2027')}. Libur berikutnya: ${h.a('libur-desember-2027', 'libur Desember 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 1 }, c: 'Hitung jembatan Agustus' })}`,
    },
    en: {
      slug: 'holidays-august-2027', nav: 'August 2027 holidays', card: 'Mawlid and 17 August, bridge on 16 August',
      title: 'August 2027 holidays Indonesia: Independence Day and Mawlid',
      description: 'Indonesia holidays in August 2027: the Prophet\'s Birthday on Sunday 15 August and Independence Day on Tuesday 17 August. Leave on 16 August gives four days off.',
      h1: 'August 2027 holidays: Mawlid and Independence Day',
      intro: 'The August 2027 calendar with its two holidays. The tool above counts this month\'s working days.',
      resume: `August 2027 has two national holidays two days apart. The Prophet Muhammad's Birthday falls on ${E(tg(2027, 'maulid'))}, and the 82nd Independence Day on ${E(tg(2027, 'kemerdekaan'))}. The Mawlid falls on a Sunday and adds no day off. Independence Day falls on a Tuesday, so Monday 16 August is a working day caught in between. Leave on that day gives four days off from Saturday 14 to Tuesday 17 August, enough to attend the flag ceremony back home. There is no collective leave in August 2027, and the month has ${hk('2027-08')} working days. This is the last national holiday before Christmas: September, October and November 2027 have no holidays. If you have saved leave, the end of August is a good time to plan the rest of the year.`,
      faqs: [
        { q: 'What day of the week is 17 August 2027?', a: 'A Tuesday. The 82nd Independence Day of the Republic of Indonesia falls on Tuesday 17 August 2027 and is a national holiday. Monday 16 August remains a working day; the 2027 decree sets no collective leave in August. One leave day on that Monday gives a four-day break.' },
        { q: 'When is the Prophet\'s Birthday 2027 in Indonesia?', a: 'Sunday 15 August 2027, 12 Rabi\' al-Awwal 1449, under the 2027 decree. Because it falls on a Sunday, it adds no day off. In 2028 the Mawlid is expected around early August, moving eleven days earlier again. Mawlid 2026 fell on Tuesday 25 August.' },
        { q: 'Are there any holidays after August 2027?', a: 'Yes, but not until late December: collective leave on Friday 24 December, Christmas on Saturday 25 December and Isra Mi\'raj on Sunday 26 December. September, October and November 2027 have no national holidays or collective leave. Those three days form the last long weekend of the year.' },
      ],
      body: (h) => `<h2>August 2027 calendar</h2>
${blok(h, '2027-08')}
<h2>The Independence Day bridge</h2>
<p>Independence Day on a Tuesday gives a classic bridge. For a longer break, leave from Wednesday 18 to Friday 20 August joins 17 August to the following weekend; with Monday 16, four leave days give nine days off from 14 to 22 August.</p>
${tabelPeluang(h, '2027-08')}
<p>Holiday dates come from the ${h.src('skb-2027', '2027 joint decree')}. A countdown and short history are on ${h.a('hut-ri-2027', 'Independence Day 2027')} and ${h.a('maulid-nabi-2027', 'Mawlid 2027')}. Next holidays: ${h.a('libur-desember-2027', 'December 2027 holidays')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 1 }, c: 'Work out your August bridge' })}`,
    },
  }),
  defineGuide({
    id: 'libur-desember-2027', group: 'bulan', order: 47, tool: 'bl', toolArg: { bln: '2027-12' },
    related: ['isra-mikraj-2027', 'libur-agustus-2027', 'libur-desember-2026', 'sisa-cuti-tahunan'],
    sources: ['skb-2027'],
    idn: {
      slug: 'libur-desember-2027', nav: 'Libur Desember 2027', card: 'Natal dan Isra Mikraj di akhir pekan',
      title: 'Libur Desember 2027: Natal, Isra Mikraj dan cuti 24 Desember',
      description: 'Tanggal merah Desember 2027: cuti bersama Jumat 24, Natal Sabtu 25 dan Isra Mikraj Minggu 26 Desember. Libur tiga hari, 22 hari kerja dan sisa cuti Anda.',
      h1: 'Libur Desember 2027: Natal dan Isra Mikraj berurutan',
      intro: 'Kalender Desember 2027 dengan tanggal merah dan cuti bersamanya. Alat di atas menghitung hari kerja bulan ini.',
      resume: `Desember 2027 menutup tahun dengan tiga hari libur berurutan. Cuti bersama jatuh pada ${I('2027-12-24')}, Natal pada ${I(tg(2027, 'natal'))}, dan Isra Mikraj Nabi Muhammad SAW 1449 H pada Minggu 26 Desember. Dua libur nasional itu jatuh pada akhir pekan, sehingga bagi pekerja lima hari hanya cuti bersama yang menambah hari libur. Hasilnya long weekend tiga hari. Isra Mikraj 1449 H adalah libur kedua dengan nama yang sama di 2027, setelah 5 Januari. Desember 2027 punya ${hk('2027-12')} hari kerja dengan cuti bersama, atau ${hkNoCb('2027-12')} tanpa. Tahun Baru 2028 jatuh pada Sabtu, sehingga pekan terakhir tahun tidak menghasilkan jembatan alami. Empat hari cuti dari Senin 20 sampai Kamis 23 Desember memberi sembilan hari libur, dari Sabtu 18 sampai Minggu 26 Desember. SKB 2028 belum terbit; tanggal libur 2028 akan ditambahkan setelah naskahnya tersedia.`,
      faqs: [
        { q: 'Apakah 24 Desember 2027 cuti bersama?', a: 'Ya. Jumat 24 Desember 2027 adalah cuti bersama Natal menurut SKB 2027. Bersama Natal pada Sabtu dan Isra Mikraj pada Minggu, terbentuk libur tiga hari. Di perusahaan swasta, pelaksanaan cuti bersama ditentukan pimpinan perusahaan. Kalender Desember di halaman ini menandai ketiga hari itu.' },
        { q: 'Mengapa ada dua Isra Mikraj di tahun 2027?', a: 'Tahun Hijriah sekitar sebelas hari lebih pendek dari tahun Masehi. Pada 2027, 27 Rajab 1448 H jatuh pada 5 Januari dan 27 Rajab 1449 H pada 26 Desember. Peristiwa ini berulang kira-kira setiap tiga puluh tiga tahun untuk setiap hari raya Islam.' },
        { q: 'Kapan SKB libur 2028 terbit?', a: 'Belum ada tanggal resmi. SKB 2027 ditandatangani pada 15 September 2026 dan SKB 2026 pada 19 September 2025, sehingga SKB 2028 kemungkinan terbit sekitar September 2027. Sampai saat itu, hanya tanggal libur tetap dan perkiraan yang dapat disebut. Tanggal libur tetap seperti 17 Agustus sudah pasti; tanggal Hijriah dan Imlek masih perkiraan.' },
      ],
      body: (h) => `<h2>Kalender Desember 2027</h2>
${blok(h, '2027-12')}
<h2>Akhir tahun 2027 dan awal 2028</h2>
<p>Berbeda dengan 2026, pekan antara Natal dan Tahun Baru 2027 tidak terjepit libur di kedua ujungnya: Tahun Baru 2028 jatuh pada Sabtu. Cuti 27 sampai 31 Desember menghasilkan sepuluh hari libur, dari 24 Desember sampai 2 Januari 2028, dengan lima hari cuti. Pekan sebelum Natal memberi hasil serupa dengan satu hari cuti lebih sedikit.</p>
${tabelPeluang(h, '2027-12')}
<p>Untuk tanggal 2028, hanya hari libur tetap yang pasti: 1 Januari, 1 Mei, 1 Juni, 17 Agustus dan 25 Desember. Daftar lengkap menunggu SKB 2028. Tanggal 2027 berasal dari ${h.src('skb-2027', 'SKB 2027')}. Sisa cuti Anda dapat dihitung di ${h.a('sisa-cuti-tahunan', 'sisa cuti tahunan')}.</p>
${h.mini('ct', { p: ['hak', 'pakai'], d: { tahun: 2027, hak: 12, pakai: 2 }, c: 'Hitung sisa cuti akhir tahun' })}`,
    },
    en: {
      slug: 'holidays-december-2027', nav: 'December 2027 holidays', card: 'Christmas and Isra Mi\'raj on the weekend',
      title: 'December 2027 holidays Indonesia: Christmas and Isra Mi\'raj',
      description: 'Indonesia holidays in December 2027: collective leave on Friday 24, Christmas on Saturday 25 and Isra Mi\'raj on Sunday 26 December, a three-day break.',
      h1: 'December 2027 holidays: Christmas and Isra Mi\'raj back to back',
      intro: 'The December 2027 calendar with its holidays and collective leave. The tool above counts this month\'s working days.',
      resume: `December 2027 closes the year with three days off in a row. Collective leave falls on ${E('2027-12-24')}, Christmas on ${E(tg(2027, 'natal'))} and Isra Mi'raj 1449 on Sunday 26 December. Both national holidays fall on the weekend, so for five-day workers only the collective leave adds a day off. The result is a three-day weekend. Isra Mi'raj 1449 is the second holiday of that name in 2027, after 5 January. December 2027 has ${hk('2027-12')} working days with collective leave, or ${hkNoCb('2027-12')} without. New Year 2028 falls on a Saturday, so the last week of the year gives no natural bridge. Four leave days from Monday 20 to Thursday 23 December give nine days off, from Saturday 18 to Sunday 26 December. The 2028 decree has not been published; 2028 holiday dates will be added once its text is available.`,
      faqs: [
        { q: 'Is 24 December 2027 collective leave in Indonesia?', a: 'Yes. Friday 24 December 2027 is collective leave for Christmas under the 2027 decree. With Christmas on Saturday and Isra Mi\'raj on Sunday, it makes a three-day break. In private companies, whether collective leave applies is up to the employer.' },
        { q: 'Why are there two Isra Mi\'raj holidays in 2027?', a: 'The Hijri year is about eleven days shorter than the Gregorian year. In 2027, 27 Rajab 1448 falls on 5 January and 27 Rajab 1449 on 26 December. This happens roughly every thirty-three years for each Islamic holiday. Both dates are listed in the 2027 decree.' },
        { q: 'When will the 2028 holiday decree be published?', a: 'There is no official date yet. The 2027 decree was signed on 15 September 2026 and the 2026 decree on 19 September 2025, so the 2028 decree is likely around September 2027. Until then, only fixed holidays and estimates can be given.' },
      ],
      body: (h) => `<h2>December 2027 calendar</h2>
${blok(h, '2027-12')}
<h2>The end of 2027 and the start of 2028</h2>
<p>Unlike 2026, the week between Christmas and New Year 2027 is not framed by holidays at both ends: New Year 2028 falls on a Saturday. Leave from 27 to 31 December gives ten days off, from 24 December to 2 January 2028, for five leave days. The week before Christmas gives a similar result for one leave day less.</p>
${tabelPeluang(h, '2027-12')}
<p>For 2028, only the fixed holidays are certain: 1 January, 1 May, 1 June, 17 August and 25 December. The full list awaits the 2028 decree. The 2027 dates come from the ${h.src('skb-2027', '2027 joint decree')}. You can work out your remaining leave on ${h.a('sisa-cuti-tahunan', 'annual leave balance')}.</p>
${h.mini('ct', { p: ['hak', 'pakai'], d: { tahun: 2027, hak: 12, pakai: 2 }, c: 'Work out your year-end leave' })}`,
    },
  }),
];
