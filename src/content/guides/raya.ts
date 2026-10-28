/** Hari raya: tanggal 2026–2028 (resmi, dihitung, perkiraan), hitung mundur WIB, latar singkat. Tanggal dari engine. */
import { defineGuide, type Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dWeek, NAMA_RAYA, type Raya } from '../../lib/tool-specs';

const I = (iso: string) => dWeek(iso, 'id'), E = (iso: string) => dWeek(iso, 'en');
const r = (id: Raya, y: number) => K.raya(id, y);
const d = (id: Raya, y: number) => r(id, y)!.date;
const ST = { resmi: { id: 'resmi (SKB)', en: 'official (decree)' }, hitung: { id: 'dihitung', en: 'computed' }, perkiraan: { id: 'perkiraan', en: 'estimate' } };
/** Tanggal satu hari raya 2026–2028, dengan statusnya. */
const tabelRaya = (h: Helpers, id: Raya, extra: Array<[string, string, string]> = []) => {
  const T = (a: string, b: string) => (h.lang === 'id' ? a: b);
  const rows: Array<Array<string | number>> = [2026, 2027, 2028].map((y) => { const x = r(id, y); return [String(y), x ? h.wday(x.date): T('belum ada SKB 2028', 'no 2028 decree yet'), x ? ST[x.status][h.lang]: '–']; });
  for (const [a, b, c] of extra) rows.push([a, b, c]);
  return h.table([T('Tahun', 'Year'), T('Tanggal', 'Date'), T('Status', 'Status')], rows, T(`${NAMA_RAYA(id, 'id')} 2026–2028`, `${NAMA_RAYA(id, 'en')} 2026–2028`), ['l', 'l', 'l']);
};
const cd = (date: string, id: string, en: string) => ({ date, label: { id, en } });
const lebaran = d('idul-fitri', 2027), puasa = d('puasa', 2027), adha = d('idul-adha', 2027);
const ijRamadan = K.wib(K.ijtimakSetelah(Date.UTC(2027, 0, 25))), ijSyawal = K.wib(K.ijtimakSetelah(Date.UTC(2027, 1, 25)));
const pjRamadan = K.panjangBulan(1448, 9);

export default [
  defineGuide({
    id: 'lebaran-2027', group: 'hari-raya', order: 60, tool: 'hr', toolArg: { hari: 'idul-fitri', tahun: 2027 },
    countdown: cd(lebaran, 'Menuju Idul Fitri 1448 H', 'Until Eid al-Fitr 1448'),
    related: ['hitung-mundur-lebaran', 'puasa-2027', 'libur-maret-2027', 'cuti-bersama-2027', 'idul-adha-2027'],
    sources: ['skb-2027', 'setkab-isbat', 'setkab-idulfitri-1447', 'nasa-fase-bulan'],
    idn: {
      slug: 'lebaran-2027', nav: 'Lebaran 2027', card: 'Idul Fitri 1448 H, 10–11 Maret 2027',
      title: 'Lebaran 2027 tanggal berapa? Idul Fitri 1448 H, 10 Maret',
      description: 'Lebaran 2027 jatuh pada Rabu 10 Maret menurut SKB: Idul Fitri 1448 H 10–11 Maret, cuti bersama 9, 12 dan 15 Maret, libur sepuluh hari, dan hitung mundur WIB.',
      h1: 'Lebaran 2027: Idul Fitri 1448 H pada 10 Maret',
      intro: 'Hitung mundur menuju Idul Fitri 1448 H dan tanggal Lebaran tahun 2026 sampai 2028, lengkap dengan statusnya: resmi, dihitung atau perkiraan.',
      resume: `Idul Fitri 1 Syawal 1448 H jatuh pada ${I(lebaran)} menurut SKB tiga menteri tentang hari libur 2027, dan hari berikutnya, Kamis 11 Maret, juga libur nasional. Pemerintah menetapkan cuti bersama pada Selasa 9, Jumat 12 dan Senin 15 Maret. Karena Nyepi jatuh pada Senin 8 Maret, libur Lebaran 2027 berlangsung sepuluh hari, dari Sabtu 6 sampai Senin 15 Maret, tanpa cuti pribadi. Tanggal ini sejalan dengan perhitungan astronomi: ijtimak menjelang Syawal terjadi pada ${I(ijSyawal.date)} pukul ${ijSyawal.jam} WIB, terlalu dekat dengan matahari terbenam untuk hilal terlihat, sehingga Ramadan digenapkan tiga puluh hari. Tanggal pasti tetap diumumkan Menteri Agama setelah sidang isbat pada 29 Ramadan. Lebaran 2027 datang sebelas hari lebih awal dari Lebaran 2026 yang jatuh pada 21 Maret, dan Lebaran 2028 diperkirakan jatuh pada akhir Februari 2028.`,
      faqs: [
        { q: 'Lebaran 2027 hari apa?', a: `Rabu. Idul Fitri 1448 H jatuh pada ${I(lebaran)}, dan hari kedua Lebaran pada Kamis 11 Maret 2027. Keduanya libur nasional menurut SKB 2027. Malam takbiran jatuh pada Selasa malam 9 Maret, yang juga hari cuti bersama. Hitung mundur di halaman ini menuju hari itu.` },
        { q: 'Kapan sebaiknya mudik Lebaran 2027?', a: 'Libur dimulai Sabtu 6 Maret. Bila cuti bersama diterapkan di tempat kerja Anda, berangkat pada akhir pekan itu memberi waktu empat hari sebelum Idul Fitri. Arus balik biasanya padat pada akhir pekan setelah hari raya, 13 sampai 15 Maret; cuti pada 16 Maret dan sesudahnya membantu menghindarinya.' },
        { q: 'Kapan Lebaran 2028?', a: `Diperkirakan ${I(d('idul-fitri', 2028))} menurut kalender Umm al-Qura, tetapi SKB 2028 belum terbit dan tanggal Indonesia bisa berbeda satu hari. Idul Fitri bergeser sekitar sebelas hari lebih awal setiap tahun, sehingga mulai 2028 Lebaran jatuh di bulan Februari. Tanggal resmi akan ditambahkan ke tabel begitu SKB 2028 terbit.` },
      ],
      body: (h) => `<h2>Tanggal Lebaran 2026, 2027 dan 2028</h2>
${tabelRaya(h, 'idul-fitri')}
<p>Tanggal 2026 telah dikonfirmasi pemerintah setelah sidang isbat, sebagaimana diberitakan ${h.src('setkab-idulfitri-1447', 'Sekretariat Kabinet')}. Tanggal 2027 berasal dari ${h.src('skb-2027', 'SKB 2027')}. Tanggal 2028 adalah perkiraan.</p>
<h2>Dari hisab ke sidang isbat</h2>
<p>Awal Syawal ditentukan oleh hilal, bulan sabit pertama yang terlihat setelah ijtimak. Kami menghitung ijtimak dengan rumus Meeus dan mencocokkannya dengan ${h.src('nasa-fase-bulan', 'tabel fase bulan NASA')} : ${h.wday(ijSyawal.date)} pukul ${ijSyawal.jam} WIB. Saat matahari terbenam di Jakarta sore itu, bulan baru berumur sekitar satu setengah jam dan berada sangat dekat dengan ufuk. Kriteria visibilitas yang dipakai pemerintah tidak terpenuhi, sehingga 29 Ramadan disusul 30 Ramadan, dan 1 Syawal jatuh pada Rabu. Sidang isbat yang dipimpin Menteri Agama akan mengumumkannya pada petang 8 Maret, seperti ${h.src('setkab-isbat', 'penetapan tahun-tahun sebelumnya')}.</p>
<h2>Libur Lebaran dalam kalender Maret</h2>
<p>Dengan Nyepi, dua hari Idul Fitri dan tiga cuti bersama, pekan Lebaran 2027 hampir sepenuhnya libur. Rinciannya, beserta peluang cuti sesudahnya, ada di ${h.a('libur-maret-2027', 'libur Maret 2027')} dan ${h.a('cuti-bersama-2027', 'cuti bersama 2027')}. Hitung mundur untuk semua hari raya ada di ${h.a('hitung-mundur-lebaran', 'hitung mundur Lebaran')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 4 }, c: 'Perpanjang libur Lebaran' })}`,
    },
    en: {
      slug: 'eid-al-fitr-2027', nav: 'Eid al-Fitr 2027', card: 'Eid al-Fitr 1448, 10–11 March 2027',
      title: 'Eid al-Fitr 2027 Indonesia: Lebaran on Wednesday 10 March',
      description: 'Eid al-Fitr 2027 in Indonesia falls on Wednesday 10 March: holidays on 10–11 March, collective leave on 9, 12 and 15 March, a ten-day break and a countdown.',
      h1: 'Eid al-Fitr 2027 in Indonesia: Lebaran on 10 March',
      intro: 'A countdown to Eid al-Fitr 1448 and the Eid dates for 2026 to 2028, each with its status: official, computed or estimate.',
      resume: `Eid al-Fitr, 1 Shawwal 1448, falls on ${E(lebaran)} under the three-minister decree on 2027 holidays, and the following day, Thursday 11 March, is also a national holiday. The government set collective leave on Tuesday 9, Friday 12 and Monday 15 March. Because Nyepi falls on Monday 8 March, the 2027 Eid break lasts ten days, from Saturday 6 to Monday 15 March, with no personal leave. The date agrees with astronomy: the conjunction before Shawwal occurs on ${E(ijSyawal.date)} at ${ijSyawal.jam} WIB, too close to sunset for the crescent to be seen, so Ramadan is completed at thirty days. The final date is still announced by the Minister of Religious Affairs after the isbat session on 29 Ramadan. Eid 2027 comes eleven days earlier than Eid 2026, which fell on 21 March, and Eid 2028 is expected in late February 2028.`,
      faqs: [
        { q: 'What day is Eid al-Fitr 2027 in Indonesia?', a: `A Wednesday. Eid al-Fitr 1448 falls on ${E(lebaran)}, and the second day on Thursday 11 March 2027. Both are national holidays under the 2027 decree. The takbiran evening falls on Tuesday evening 9 March, which is also a collective leave day.` },
        { q: 'When is the best time to travel home for Eid 2027?', a: 'The break starts on Saturday 6 March. If your workplace applies collective leave, leaving that weekend gives four days before Eid. The return rush is usually heaviest on the weekend after the festival, 13 to 15 March; leave on 16 March and after helps avoid it.' },
        { q: 'When is Eid al-Fitr 2028?', a: `Expected on ${E(d('idul-fitri', 2028))} by the Umm al-Qura calendar, but the 2028 decree has not been published and the Indonesian date may differ by a day. Eid moves about eleven days earlier each year, so from 2028 it falls in February.` },
      ],
      body: (h) => `<h2>Eid dates 2026, 2027 and 2028</h2>
${tabelRaya(h, 'idul-fitri')}
<p>The 2026 date was confirmed by the government after the isbat session, as reported by the ${h.src('setkab-idulfitri-1447', 'Cabinet Secretariat')}. The 2027 date comes from the ${h.src('skb-2027', '2027 joint decree')}. The 2028 date is an estimate.</p>
<h2>From computation to the isbat session</h2>
<p>The start of Shawwal depends on the hilal, the first crescent visible after the conjunction. We compute the conjunction with Meeus's formula and check it against ${h.src('nasa-fase-bulan', "NASA's moon phase tables")}: ${h.wday(ijSyawal.date)} at ${ijSyawal.jam} WIB. At sunset in Jakarta that afternoon the new moon is about an hour and a half old and very close to the horizon. The visibility criteria the government uses are not met, so 29 Ramadan is followed by 30 Ramadan, and 1 Shawwal falls on Wednesday. The isbat session chaired by the Minister of Religious Affairs will announce it on the evening of 8 March, as in ${h.src('setkab-isbat', 'previous years')}.</p>
<h2>The Eid break on the March calendar</h2>
<p>With Nyepi, two days of Eid and three collective leave days, Eid week 2027 is almost entirely off. The details, with leave opportunities afterwards, are on ${h.a('libur-maret-2027', 'March 2027 holidays')} and ${h.a('cuti-bersama-2027', 'collective leave 2027')}. The countdown for every festival is on ${h.a('hitung-mundur-lebaran', 'Eid countdown')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 4 }, c: 'Stretch your Eid break' })}`,
    },
  }),
  defineGuide({
    id: 'puasa-2027', group: 'hari-raya', order: 61, tool: 'ij', toolArg: { bulan: '1448-9' },
    countdown: cd(puasa, 'Menuju 1 Ramadan 1448 H (perkiraan)', 'Until 1 Ramadan 1448 (estimate)'),
    related: ['lebaran-2027', 'kalender-hijriah', 'libur-februari-2027', 'hitung-mundur-lebaran'],
    sources: ['setkab-isbat', 'nasa-fase-bulan', 'ummulqura', 'skb-2027'],
    idn: {
      slug: 'puasa-2027', nav: 'Puasa 2027', card: 'Awal Ramadan 1448 H: perkiraan dan isbat',
      title: 'Puasa 2027 mulai tanggal berapa? Awal Ramadan 1448 H',
      description: 'Puasa 2027 diperkirakan mulai Senin 8 Februari 2027: ijtimak 6 Februari pukul 22.56 WIB, kriteria hilal, sidang isbat, dan lama puasa sampai Lebaran 2027.',
      h1: 'Puasa 2027: kapan awal Ramadan 1448 H',
      intro: 'Alat di bawah menghitung ijtimak dan perkiraan awal bulan Hijriah. Hitung mundur menuju 1 Ramadan 1448 H memakai tanggal perkiraan.',
      resume: `Awal puasa Ramadan 1448 H diperkirakan jatuh pada ${I(puasa)}. Tanggal ini belum resmi: SKB 2027 tidak memuat awal Ramadan karena bukan hari libur, dan Menteri Agama menetapkannya setelah sidang isbat pada petang 29 Syakban. Perhitungannya begini. Ijtimak, saat bulan baru, terjadi pada ${I(ijRamadan.date)} pukul ${ijRamadan.jam} WIB, setelah matahari terbenam. Pada petang hari itu hilal belum ada. Sehari kemudian, petang ${I('2027-02-07')}, umur bulan sekitar sembilan belas jam, dan menurut perhitungan kami ketinggiannya kemungkinan besar sudah memenuhi kriteria yang dipakai pemerintah. Karena itu 1 Ramadan diperkirakan Senin 8 Februari, dan salat tarawih pertama pada Minggu malam 7 Februari. Bila hilal tidak terlihat, Syakban digenapkan dan puasa dimulai Selasa 9 Februari. Dengan Idul Fitri pada 10 Maret menurut SKB, puasa 2027 berlangsung ${pjRamadan ?? 30} hari bila dimulai 8 Februari.`,
      faqs: [
        { q: 'Tanggal berapa 1 Ramadan 2027?', a: `Perkiraannya ${I(puasa)}. Tanggal resmi diumumkan Menteri Agama setelah sidang isbat pada petang 29 Syakban 1448 H, sekitar 7 Februari 2027. Bila hilal tidak terlihat malam itu, puasa dimulai sehari kemudian, Selasa 9 Februari 2027. Muhammadiyah biasanya mengumumkan tanggalnya lebih awal berdasarkan hisab.` },
        { q: 'Berapa hari puasa Ramadan 2027?', a: `Bila puasa dimulai Senin 8 Februari dan Idul Fitri jatuh Rabu 10 Maret sesuai SKB, Ramadan 1448 H berlangsung ${pjRamadan ?? 30} hari. Bila puasa dimulai 9 Februari, Ramadan berlangsung 29 hari. Bulan Hijriah selalu berumur 29 atau 30 hari. Jumlah pastinya baru diketahui setelah sidang isbat.` },
        { q: 'Apakah Muhammadiyah dan pemerintah bisa berbeda awal puasa 2027?', a: 'Bisa. Organisasi kemasyarakatan memakai metode dan kriteria sendiri, dan pada beberapa tahun terakhir awal Ramadan pernah berbeda satu hari. Untuk 2027 ijtimak terjadi setelah matahari terbenam pada 6 Februari, sehingga perbedaan lebih kecil kemungkinannya. Situs ini menampilkan perkiraan dan menunggu penetapan pemerintah.' },
      ],
      body: (h) => `<h2>Ijtimak dan awal bulan sekitar Ramadan 1448 H</h2>
${h.table(['Peristiwa', 'Tanggal', 'Status'], [['Ijtimak menjelang Ramadan', `${h.wday(ijRamadan.date)}, ${ijRamadan.jam} WIB`, 'dihitung (Meeus)'], ['1 Ramadan 1448 H', h.wday(puasa), 'perkiraan'], ['Ijtimak menjelang Syawal', `${h.wday(ijSyawal.date)}, ${ijSyawal.jam} WIB`, 'dihitung (Meeus)'], ['1 Syawal 1448 H (Idul Fitri)', h.wday(lebaran), 'resmi (SKB)'], ['1 Ramadan 1449 H', h.wday(d('puasa', 2028)), 'perkiraan']], 'Ramadan 1448 H dalam angka', ['l', 'l', 'l'])}
<h2>Mengapa tanggal puasa baru pasti sehari sebelumnya</h2>
<p>Pemerintah memadukan hisab dan rukyat. Tim hisab menghitung posisi bulan, lalu petugas di puluhan titik pengamatan mencoba melihat hilal pada petang 29 Syakban. Hasilnya dibahas dalam sidang isbat dan diumumkan pada malam yang sama; contohnya ${h.src('setkab-isbat', 'penetapan Idul Fitri 1446 H')}. Kriteria visibilitas yang dipakai Indonesia, Malaysia, Brunei dan Singapura menuntut ketinggian dan elongasi minimum. Waktu ijtimak di tabel kami dihitung dengan rumus Meeus dan dicocokkan dengan ${h.src('nasa-fase-bulan', 'tabel NASA')} ; ketinggian hilal di setiap lokasi tidak kami hitung.</p>
<p>Kalender ${h.src('ummulqura', 'Umm al-Qura')} juga menempatkan 1 Ramadan 1448 H pada 8 Februari 2027. Tanggal Idul Fitri berasal dari ${h.src('skb-2027', 'SKB 2027')}. Lihat juga ${h.a('lebaran-2027', 'Lebaran 2027')} dan ${h.a('kalender-hijriah', 'kalender Hijriah')}.</p>
${h.mini('hr', { p: ['hari'], d: { hari: 'puasa', tahun: 2028 }, c: 'Lihat perkiraan puasa 2028' })}`,
    },
    en: {
      slug: 'ramadan-2027', nav: 'Ramadan 2027', card: 'Start of Ramadan 1448: estimate and isbat',
      title: 'Ramadan 2027 Indonesia: when does the fast start? 1448 AH',
      description: 'Ramadan 2027 in Indonesia is expected to start on Monday 8 February: conjunction on 6 February at 22:56 WIB, crescent criteria and the isbat ruling day.',
      h1: 'Ramadan 2027 in Indonesia: when the fast begins',
      intro: 'The tool below computes the conjunction and the expected start of a Hijri month. The countdown to 1 Ramadan 1448 uses the estimated date.',
      resume: `The start of Ramadan 1448 is expected on ${E(puasa)}. The date is not official: the 2027 decree does not list it because it is not a holiday, and the Minister of Religious Affairs sets it after the isbat session on the evening of 29 Sha'ban. The computation runs as follows. The conjunction, or new moon, occurs on ${E(ijRamadan.date)} at ${ijRamadan.jam} WIB, after sunset. On that evening there is no crescent yet. A day later, on the evening of ${E('2027-02-07')}, the moon is about nineteen hours old, and by our computation its altitude is very likely to meet the criteria the government uses. So 1 Ramadan is expected on Monday 8 February, with the first tarawih prayer on Sunday evening 7 February. If the crescent is not seen, Sha'ban is completed and the fast starts on Tuesday 9 February. With Eid on 10 March under the decree, Ramadan 2027 lasts ${pjRamadan ?? 30} days if it starts on 8 February.`,
      faqs: [
        { q: 'What is the date of 1 Ramadan 2027 in Indonesia?', a: `The estimate is ${E(puasa)}. The official date is announced by the Minister of Religious Affairs after the isbat session on the evening of 29 Sha'ban 1448, around 7 February 2027. If the crescent is not seen that night, the fast starts a day later, on Tuesday 9 February 2027.` },
        { q: 'How many days is the Ramadan 2027 fast?', a: `If the fast starts on Monday 8 February and Eid falls on Wednesday 10 March as in the decree, Ramadan 1448 lasts ${pjRamadan ?? 30} days. If it starts on 9 February, it lasts 29 days. A Hijri month always has 29 or 30 days.` },
        { q: 'Can Muhammadiyah and the government start Ramadan 2027 on different days?', a: 'They can. Civil society organisations use their own methods and criteria, and in recent years the start of Ramadan has sometimes differed by a day. In 2027 the conjunction occurs after sunset on 6 February, which makes a difference less likely. This site shows an estimate and waits for the government ruling.' },
      ],
      body: (h) => `<h2>Conjunctions and month starts around Ramadan 1448</h2>
${h.table(['Event', 'Date', 'Status'], [['Conjunction before Ramadan', `${h.wday(ijRamadan.date)}, ${ijRamadan.jam} WIB`, 'computed (Meeus)'], ['1 Ramadan 1448', h.wday(puasa), 'estimate'], ['Conjunction before Shawwal', `${h.wday(ijSyawal.date)}, ${ijSyawal.jam} WIB`, 'computed (Meeus)'], ['1 Shawwal 1448 (Eid al-Fitr)', h.wday(lebaran), 'official (decree)'], ['1 Ramadan 1449', h.wday(d('puasa', 2028)), 'estimate']], 'Ramadan 1448 in figures', ['l', 'l', 'l'])}
<h2>Why the start date is only certain the day before</h2>
<p>The government combines computation (hisab) with sighting (rukyat). A computation team works out the moon's position, then observers at dozens of sites try to see the crescent on the evening of 29 Sha'ban. The results are discussed in the isbat session and announced the same night; an example is the ${h.src('setkab-isbat', 'Eid al-Fitr 1446 ruling')}. The visibility criteria used by Indonesia, Malaysia, Brunei and Singapore require a minimum altitude and elongation. The conjunction times in our table use Meeus's formula, checked against ${h.src('nasa-fase-bulan', 'NASA tables')}; we do not compute the crescent's altitude at each site.</p>
<p>The ${h.src('ummulqura', 'Umm al-Qura')} calendar also puts 1 Ramadan 1448 on 8 February 2027. The Eid date comes from the ${h.src('skb-2027', '2027 joint decree')}. See also ${h.a('lebaran-2027', 'Eid 2027')} and the ${h.a('kalender-hijriah', 'Hijri calendar')}.</p>
${h.mini('hr', { p: ['hari'], d: { hari: 'puasa', tahun: 2028 }, c: 'See the 2028 Ramadan estimate' })}`,
    },
  }),
  defineGuide({
    id: 'idul-adha-2027', group: 'hari-raya', order: 62, tool: 'hr', toolArg: { hari: 'idul-adha', tahun: 2027 },
    countdown: cd(adha, 'Menuju Idul Adha 1448 H', 'Until Eid al-Adha 1448'),
    related: ['libur-mei-2027', 'waisak-2027', 'lebaran-2027', 'kalender-hijriah'],
    sources: ['skb-2027', 'setkab-iduladha-1447'],
    idn: {
      slug: 'idul-adha-2027', nav: 'Idul Adha 2027', card: 'Senin 17 Mei 2027, libur enam hari',
      title: 'Idul Adha 2027: Senin 17 Mei, puasa Arafah dan cuti bersama',
      description: 'Idul Adha 1448 H jatuh Senin 17 Mei 2027 menurut SKB: cuti bersama 18 Mei, puasa Arafah Minggu 16 Mei, libur enam hari bersama Waisak, dan hitung mundur WIB.',
      h1: 'Idul Adha 2027: 10 Zulhijah 1448 H',
      intro: 'Hitung mundur menuju Idul Adha 1448 H, tanggal 2026 sampai 2028, dan hari-hari penting di sekitarnya.',
      resume: `Idul Adha 10 Zulhijah 1448 H jatuh pada ${I(adha)} menurut SKB 2027. Pemerintah menambahkan cuti bersama pada Selasa 18 Mei, dan karena Waisak jatuh pada Kamis 20 Mei dengan cuti bersama Waisak pada Rabu 19 Mei, pekan itu libur dari Sabtu 15 sampai Kamis 20 Mei. Puasa Arafah, 9 Zulhijah, jatuh pada Minggu 16 Mei, dan hari tasyrik, saat penyembelihan hewan kurban masih boleh dilakukan, berlangsung 11 sampai 13 Zulhijah, yaitu Selasa 18 sampai Kamis 20 Mei. Awal Zulhijah, 1 Zulhijah 1448 H, jatuh pada ${I(K.awalBulan(1448, 12)!.date)} ; tanggal ini dihitung mundur dari Idul Adha di SKB dan akan dipastikan oleh sidang isbat akhir Zulkaidah. Idul Adha 2027 datang sepuluh hari lebih awal dari Idul Adha 2026 pada 27 Mei. Jemaah haji Indonesia melaksanakan wukuf di Arafah sehari sebelumnya menurut kalender Arab Saudi, yang bisa berbeda satu hari dengan Indonesia.`,
      faqs: [
        { q: 'Kapan puasa Arafah 2027?', a: 'Puasa Arafah dilaksanakan pada 9 Zulhijah, sehari sebelum Idul Adha. Menurut tanggal SKB, itu jatuh pada Minggu 16 Mei 2027. Puasa Tarwiyah, 8 Zulhijah, jatuh pada Sabtu 15 Mei. Tanggal pastinya mengikuti penetapan awal Zulhijah oleh Menteri Agama. Puasa Arafah tidak termasuk hari libur.' },
        { q: 'Sampai kapan hewan kurban boleh disembelih pada 2027?', a: 'Penyembelihan dimulai setelah salat Idul Adha pada 10 Zulhijah dan berlangsung sampai akhir hari tasyrik, 13 Zulhijah. Pada 2027 itu berarti Senin 17 sampai Kamis 20 Mei, bertepatan dengan cuti bersama dan Waisak. Panitia kurban di masjid biasanya mengumumkan jadwal penyembelihan sendiri.' },
        { q: 'Kapan Idul Adha 2028?', a: `Diperkirakan ${I(d('idul-adha', 2028))} menurut kalender Umm al-Qura. SKB 2028 belum terbit, sehingga tanggal Indonesia bisa berbeda satu hari. Idul Adha bergeser sekitar sebelas hari lebih awal setiap tahun. Tabel di halaman ini akan memuat tanggal resmi setelah SKB 2028 terbit, biasanya sekitar bulan September tahun sebelumnya.` },
      ],
      body: (h) => `<h2>Tanggal Idul Adha 2026–2028</h2>
${tabelRaya(h, 'idul-adha')}
<p>Idul Adha 2026 jatuh pada 27 Mei sesuai penetapan pemerintah, sebagaimana diberitakan ${h.src('setkab-iduladha-1447', 'Sekretariat Kabinet')}. Tanggal 2027 berasal dari ${h.src('skb-2027', 'SKB 2027')}.</p>
<h2>Hari-hari Zulhijah 1448 H</h2>
${h.table(['Hari', 'Tanggal Hijriah', 'Tanggal Masehi'], [['Awal Zulhijah', '1 Zulhijah 1448 H', h.wday(K.awalBulan(1448, 12)!.date)], ['Puasa Tarwiyah', '8 Zulhijah', h.wday(K.addDays(adha, -2))], ['Puasa Arafah', '9 Zulhijah', h.wday(K.addDays(adha, -1))], ['Idul Adha', '10 Zulhijah', h.wday(adha)], ['Akhir hari tasyrik', '13 Zulhijah', h.wday(K.addDays(adha, 3))]], 'Zulhijah 1448 H menurut tanggal SKB', ['l', 'l', 'l'])}
<p>Libur pekan Idul Adha dan Waisak dijelaskan di ${h.a('libur-mei-2027', 'libur Mei 2027')}, termasuk jembatan Jumat 21 Mei yang memberi sembilan hari libur dengan satu hari cuti.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 1 }, c: 'Hitung libur Idul Adha' })}`,
    },
    en: {
      slug: 'eid-al-adha-2027', nav: 'Eid al-Adha 2027', card: 'Monday 17 May 2027, a six-day break',
      title: 'Eid al-Adha 2027 Indonesia: Monday 17 May and Arafah fast',
      description: 'Eid al-Adha 1448 in Indonesia falls on Monday 17 May 2027: collective leave on 18 May, the Arafah fast on 16 May, a six-day break with Vesak, and a countdown.',
      h1: 'Eid al-Adha 2027: 10 Dhu al-Hijjah 1448',
      intro: 'A countdown to Eid al-Adha 1448, the dates for 2026 to 2028, and the key days around it.',
      resume: `Eid al-Adha, 10 Dhu al-Hijjah 1448, falls on ${E(adha)} under the 2027 decree. The government added collective leave on Tuesday 18 May, and since Vesak falls on Thursday 20 May with Vesak collective leave on Wednesday 19 May, the week is off from Saturday 15 to Thursday 20 May. The Arafah fast, 9 Dhu al-Hijjah, falls on Sunday 16 May, and the tashriq days, when sacrificial animals may still be slaughtered, run from 11 to 13 Dhu al-Hijjah, Tuesday 18 to Thursday 20 May. The month begins, 1 Dhu al-Hijjah 1448, on ${E(K.awalBulan(1448, 12)!.date)}; this is counted back from the decree's Eid date and will be confirmed by the isbat session at the end of Dhu al-Qa'dah. Eid al-Adha 2027 comes ten days earlier than Eid al-Adha 2026 on 27 May. Indonesian pilgrims stand at Arafah the day before by the Saudi calendar, which may differ from Indonesia's by one day.`,
      faqs: [
        { q: 'When is the Arafah fast in 2027 in Indonesia?', a: 'The Arafah fast is on 9 Dhu al-Hijjah, the day before Eid al-Adha. By the decree dates, that is Sunday 16 May 2027. The Tarwiyah fast, 8 Dhu al-Hijjah, falls on Saturday 15 May. The final dates follow the Minister of Religious Affairs\' ruling on the start of Dhu al-Hijjah.' },
        { q: 'Until when can sacrificial animals be slaughtered in 2027?', a: 'Slaughter starts after the Eid al-Adha prayer on 10 Dhu al-Hijjah and runs to the end of the tashriq days, 13 Dhu al-Hijjah. In 2027 that means Monday 17 to Thursday 20 May, which coincides with collective leave and Vesak.' },
        { q: 'When is Eid al-Adha 2028?', a: `Expected on ${E(d('idul-adha', 2028))} by the Umm al-Qura calendar. The 2028 decree has not been published, so the Indonesian date may differ by one day. Eid al-Adha moves about eleven days earlier each year. The table on this page will show the official date once the 2028 decree is out.` },
      ],
      body: (h) => `<h2>Eid al-Adha dates 2026–2028</h2>
${tabelRaya(h, 'idul-adha')}
<p>Eid al-Adha 2026 fell on 27 May as set by the government, as reported by the ${h.src('setkab-iduladha-1447', 'Cabinet Secretariat')}. The 2027 date comes from the ${h.src('skb-2027', '2027 joint decree')}.</p>
<h2>The days of Dhu al-Hijjah 1448</h2>
${h.table(['Day', 'Hijri date', 'Gregorian date'], [['Start of Dhu al-Hijjah', '1 Dhu al-Hijjah 1448', h.wday(K.awalBulan(1448, 12)!.date)], ['Tarwiyah fast', '8 Dhu al-Hijjah', h.wday(K.addDays(adha, -2))], ['Arafah fast', '9 Dhu al-Hijjah', h.wday(K.addDays(adha, -1))], ['Eid al-Adha', '10 Dhu al-Hijjah', h.wday(adha)], ['End of tashriq days', '13 Dhu al-Hijjah', h.wday(K.addDays(adha, 3))]], 'Dhu al-Hijjah 1448 by the decree dates', ['l', 'l', 'l'])}
<p>The Eid al-Adha and Vesak break is explained on ${h.a('libur-mei-2027', 'May 2027 holidays')}, including the Friday 21 May bridge that gives nine days off for one leave day.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 1 }, c: 'Work out your Eid al-Adha break' })}`,
    },
  }),
  defineGuide({
    id: 'imlek-2027', group: 'hari-raya', order: 63, tool: 'hr', toolArg: { hari: 'imlek', tahun: 2027 },
    countdown: cd(d('imlek', 2027), 'Menuju Tahun Baru Imlek 2578', 'Until Chinese New Year 2578'),
    related: ['libur-februari-2027', 'cuti-bersama-2027', 'puasa-2027', 'nyepi-2027'],
    sources: ['skb-2027', 'skb-2026', 'keppres-8-2024'],
    idn: {
      slug: 'imlek-2027', nav: 'Imlek 2027', card: 'Sabtu 6 Februari 2027, cuti bersama Jumat',
      title: 'Imlek 2027: Sabtu 6 Februari, Tahun Baru 2578 Kongzili',
      description: 'Imlek 2027 jatuh Sabtu 6 Februari, Tahun Baru 2578 Kongzili, dengan cuti bersama Jumat 5 Februari menurut SKB. Tanggal Cap Go Meh dan hitung mundur WIB.',
      h1: 'Imlek 2027: Tahun Baru 2578 Kongzili',
      intro: 'Hitung mundur menuju Tahun Baru Imlek 2578 dan tanggal Imlek 2026 sampai 2028 menurut SKB.',
      resume: `Tahun Baru Imlek 2578 Kongzili jatuh pada ${I(d('imlek', 2027))} menurut SKB 2027. Karena jatuh pada Sabtu, pemerintah menetapkan cuti bersama pada hari sebelumnya, Jumat 5 Februari, sehingga pekerja yang mengikuti cuti bersama mendapat libur tiga hari. Tahun 2027 dalam penanggalan Tionghoa adalah tahun Kambing. Cap Go Meh, hari kelima belas tahun baru, jatuh pada Sabtu 20 Februari 2027; hari itu bukan libur nasional, tetapi dirayakan meriah di Singkawang, Pontianak, Bogor dan kota lain. Imlek ditetapkan sebagai hari libur nasional sejak 2003, dan kini tercantum dalam Keppres tentang hari-hari libur. Pada 2026, Imlek 2577 jatuh pada Selasa 17 Februari dengan cuti bersama Senin 16 Februari, sehingga libur berlangsung empat hari. Tanggal Imlek mengikuti bulan baru kedua setelah titik balik matahari musim dingin, selalu antara akhir Januari dan pertengahan Februari.`,
      faqs: [
        { q: 'Imlek 2027 shio apa?', a: 'Tahun 2578 Kongzili, yang dimulai Sabtu 6 Februari 2027, adalah tahun Kambing dalam penanggalan Tionghoa. Orang yang lahir antara 6 Februari 2027 dan malam Imlek berikutnya bershio Kambing. Tahun 2026 adalah tahun Kuda. Tahun Kambing berikutnya jatuh pada 2039, dua belas tahun kemudian. Tahun 2028 adalah tahun Monyet.' },
        { q: 'Kapan Cap Go Meh 2027?', a: 'Sabtu 20 Februari 2027, hari kelima belas setelah Imlek. Cap Go Meh bukan libur nasional dan tidak tercantum di SKB. Perayaannya, dengan arak-arakan dan lampion, terkenal di Singkawang dan beberapa kota lain, dan biasanya menutup rangkaian Tahun Baru Imlek. Tanggalnya mengikuti Imlek.' },
        { q: 'Mengapa cuti bersama Imlek 2027 jatuh sebelum hari raya?', a: 'Karena Imlek 2027 jatuh pada Sabtu. Cuti bersama ditempatkan pada Jumat 5 Februari agar terbentuk libur tiga hari. Pada 2026, Imlek jatuh pada Selasa, sehingga cuti bersama ditempatkan pada Senin sebagai jembatan menuju akhir pekan. Bagi swasta, pelaksanaannya diatur pimpinan perusahaan masing-masing.' },
      ],
      body: (h) => `<h2>Tanggal Imlek 2026–2028</h2>
${tabelRaya(h, 'imlek')}
<p>Tanggal 2026 dan 2027 berasal dari ${h.src('skb-2026', 'SKB 2026')} dan ${h.src('skb-2027', 'SKB 2027')}. Situs ini tidak menghitung kalender Tionghoa sendiri; tanggal 2028 akan ditambahkan setelah SKB 2028 terbit.</p>
<h2>Imlek dalam kalender libur Indonesia</h2>
<p>Imlek adalah satu dari enam belas hari libur dalam ${h.src('keppres-8-2024', 'Keppres Nomor 8 Tahun 2024')}. Seperti hari raya agama lain, pemerintah menempatkan cuti bersama di sampingnya bila hal itu menyambung akhir pekan. Pada 2027, Imlek juga menjadi libur terakhir sebelum Ramadan, yang diperkirakan dimulai dua hari kemudian, Senin 8 Februari.</p>
<p>Rincian bulan Februari, termasuk jembatan cuti 1 sampai 4 Februari yang memberi sembilan hari libur, ada di ${h.a('libur-februari-2027', 'libur Februari 2027')}.</p>
${h.mini('bl', { p: ['bln'], d: { bln: '2027-02' }, c: 'Lihat kalender Februari 2027' })}`,
    },
    en: {
      slug: 'chinese-new-year-2027', nav: 'Chinese New Year 2027', card: 'Saturday 6 February 2027, leave on Friday',
      title: 'Chinese New Year 2027 Indonesia: Imlek on Saturday 6 Feb',
      description: 'Chinese New Year 2027 in Indonesia falls on Saturday 6 February, year 2578, with collective leave on Friday 5 February. Past dates, Cap Go Meh and a countdown.',
      h1: 'Chinese New Year 2027 in Indonesia: Imlek 2578',
      intro: 'A countdown to Chinese New Year 2578 and the Imlek dates for 2026 to 2028 under the decree.',
      resume: `Chinese New Year 2578 (Imlek) falls on ${E(d('imlek', 2027))} under the 2027 decree. Because it falls on a Saturday, the government set collective leave on the day before, Friday 5 February, so workers who follow collective leave get a three-day break. 2027 is the year of the Goat in the Chinese calendar. Cap Go Meh, the fifteenth day of the new year, falls on Saturday 20 February 2027; it is not a national holiday but is celebrated with spirit in Singkawang, Pontianak, Bogor and other cities. Imlek has been a national holiday since 2003 and is now listed in the presidential decree on public holidays. In 2026, Imlek 2577 fell on Tuesday 17 February with collective leave on Monday 16 February, making a four-day break. The date follows the second new moon after the winter solstice and always falls between late January and mid-February.`,
      faqs: [
        { q: 'Which zodiac year is Chinese New Year 2027?', a: 'The year 2578, starting on Saturday 6 February 2027, is the year of the Goat in the Chinese calendar. People born between 6 February 2027 and the next Chinese New Year\'s Eve are Goats. 2026 is the year of the Horse.' },
        { q: 'When is Cap Go Meh 2027?', a: 'Saturday 20 February 2027, the fifteenth day after Chinese New Year. Cap Go Meh is not a national holiday and is not in the decree. Its celebrations, with parades and lanterns, are famous in Singkawang and several other cities, and usually close the New Year festivities.' },
        { q: 'Why is the 2027 Imlek collective leave before the festival?', a: 'Because Imlek 2027 falls on a Saturday. Collective leave is placed on Friday 5 February to make a three-day break. In 2026 Imlek fell on a Tuesday, so the collective leave was put on the Monday as a bridge to the weekend.' },
      ],
      body: (h) => `<h2>Chinese New Year dates 2026–2028</h2>
${tabelRaya(h, 'imlek')}
<p>The 2026 and 2027 dates come from the ${h.src('skb-2026', '2026 decree')} and the ${h.src('skb-2027', '2027 decree')}. This site does not compute the Chinese calendar itself; the 2028 date will be added once the 2028 decree is published.</p>
<h2>Imlek in the Indonesian holiday calendar</h2>
<p>Imlek is one of the sixteen holidays in ${h.src('keppres-8-2024', 'Presidential Decree 8 of 2024')}. As with other religious holidays, the government places collective leave next to it when that joins a weekend. In 2027 Imlek is also the last holiday before Ramadan, which is expected to begin two days later, on Monday 8 February.</p>
<p>The February details, including the leave bridge of 1 to 4 February that gives nine days off, are on ${h.a('libur-februari-2027', 'February 2027 holidays')}.</p>
${h.mini('bl', { p: ['bln'], d: { bln: '2027-02' }, c: 'See the February 2027 calendar' })}`,
    },
  }),
  defineGuide({
    id: 'nyepi-2027', group: 'hari-raya', order: 64, tool: 'hr', toolArg: { hari: 'nyepi', tahun: 2027 },
    countdown: cd(d('nyepi', 2027), 'Menuju Nyepi Tahun Baru Saka 1949', 'Until Nyepi, Saka New Year 1949'),
    related: ['libur-maret-2027', 'lebaran-2027', 'imlek-2027', 'waisak-2027'],
    sources: ['skb-2027', 'skb-2026'],
    idn: {
      slug: 'nyepi-2027', nav: 'Nyepi 2027', card: 'Senin 8 Maret 2027, Tahun Baru Saka 1949',
      title: 'Nyepi 2027: Senin 8 Maret, Tahun Baru Saka 1949 di Bali',
      description: 'Hari Suci Nyepi 2027 jatuh Senin 8 Maret, Tahun Baru Saka 1949, dua hari sebelum Lebaran. Pengerupukan, catur brata penyepian, dan libur panjang Maret.',
      h1: 'Nyepi 2027: Tahun Baru Saka 1949',
      intro: 'Hitung mundur menuju Hari Suci Nyepi dan tanggal Nyepi 2026 sampai 2028 menurut SKB.',
      resume: `Hari Suci Nyepi, Tahun Baru Saka 1949, jatuh pada ${I(d('nyepi', 2027))} menurut SKB 2027. Nyepi 2027 hanya dua hari sebelum Idul Fitri pada Rabu 10 Maret, sehingga Nyepi menjadi bagian dari libur Lebaran sepuluh hari, dari Sabtu 6 sampai Senin 15 Maret. Di Bali, Nyepi dijalankan selama dua puluh empat jam sejak pagi hari dengan catur brata penyepian: tidak menyalakan api atau lampu, tidak bekerja, tidak bepergian, dan tidak bersenang-senang. Jalan-jalan sepi dan bandara di Bali biasanya tidak melayani penerbangan selama Nyepi. Sehari sebelumnya, Minggu 7 Maret, adalah hari Pengerupukan dengan pawai ogoh-ogoh pada petang hari. Pada 2026, Nyepi Saka 1948 jatuh pada Kamis 19 Maret, dengan cuti bersama sehari sebelumnya. Kalender Saka Bali memadukan bulan dan matahari, sehingga Nyepi selalu jatuh pada bulan Maret atau awal April.`,
      faqs: [
        { q: 'Apakah bandara Bali tutup saat Nyepi 2027?', a: 'Biasanya ya. Selama Nyepi, bandara di Bali tidak melayani penerbangan dari pagi hari Nyepi sampai pagi berikutnya, dan wisatawan diminta tetap di hotel. Pengumuman resmi diterbitkan otoritas bandara menjelang hari raya. Untuk 2027, rencanakan perjalanan Lebaran ke atau dari Bali di luar 8 Maret.' },
        { q: 'Kapan pawai ogoh-ogoh 2027?', a: 'Pada hari Pengerupukan, sehari sebelum Nyepi: Minggu 7 Maret 2027 petang. Ogoh-ogoh, patung raksasa yang melambangkan sifat buruk, diarak keliling desa lalu dibakar atau dimusnahkan. Pengerupukan bukan libur nasional, tetapi pada 2027 jatuh pada hari Minggu. Pawai biasanya dimulai menjelang matahari terbenam dan berakhir sebelum tengah malam.' },
        { q: 'Berapa tahun Saka pada Nyepi 2027?', a: 'Nyepi 2027 menandai Tahun Baru Saka 1949. Tahun Saka tertinggal 78 tahun dari tahun Masehi dan dimulai sekitar bulan Maret. Pada 2026 Nyepi menandai Tahun Baru Saka 1948, dan pada 2028 Saka 1950. Nyepi 2027 jatuh pada Senin 8 Maret dan merupakan libur nasional.' },
      ],
      body: (h) => `<h2>Tanggal Nyepi 2026–2028</h2>
${tabelRaya(h, 'nyepi')}
<p>Tanggal 2026 dan 2027 berasal dari ${h.src('skb-2026', 'SKB 2026')} dan ${h.src('skb-2027', 'SKB 2027')}. Situs ini tidak menghitung kalender Saka Bali; tanggal 2028 menunggu SKB berikutnya.</p>
<h2>Rangkaian hari Nyepi</h2>
<p>Nyepi didahului upacara Melasti, penyucian di laut atau sumber air, beberapa hari sebelumnya, lalu Tawur Kesanga dan Pengerupukan pada hari terakhir tahun Saka. Setelah Nyepi ada Ngembak Geni, hari saling mengunjungi dan bermaaf-maafan, yang pada 2027 jatuh pada Selasa 9 Maret, bertepatan dengan cuti bersama nasional.</p>
<p>Di luar Bali, umat Hindu di Lombok, Jawa dan daerah lain merayakan Nyepi di pura dan rumah masing-masing, tanpa penutupan wilayah. Rincian libur pekan itu ada di ${h.a('libur-maret-2027', 'libur Maret 2027')} dan ${h.a('lebaran-2027', 'Lebaran 2027')}.</p>
${h.mini('bl', { p: ['bln'], d: { bln: '2027-03' }, c: 'Lihat kalender Maret 2027' })}`,
    },
    en: {
      slug: 'nyepi-2027', nav: 'Nyepi 2027', card: 'Monday 8 March 2027, Saka New Year 1949',
      title: 'Nyepi 2027 Bali: Monday 8 March, Saka New Year 1949',
      description: 'Nyepi 2027, the Balinese Day of Silence, falls on Monday 8 March, Saka New Year 1949, two days before Eid. Pengerupukan, the four prohibitions, the long break.',
      h1: 'Nyepi 2027: the Saka New Year 1949',
      intro: 'A countdown to Nyepi and the Nyepi dates for 2026 to 2028 under the decree.',
      resume: `Nyepi, the Saka New Year 1949, falls on ${E(d('nyepi', 2027))} under the 2027 decree. Nyepi 2027 comes only two days before Eid al-Fitr on Wednesday 10 March, so it is part of the ten-day Eid break from Saturday 6 to Monday 15 March. In Bali, Nyepi is observed for twenty-four hours from the morning with four prohibitions (catur brata penyepian): no fire or lights, no work, no travel and no entertainment. Streets fall silent and Bali's airport usually handles no flights during Nyepi. The day before, Sunday 7 March, is Pengerupukan, with ogoh-ogoh parades in the evening. In 2026, Nyepi Saka 1948 fell on Thursday 19 March, with collective leave the day before. The Balinese Saka calendar combines moon and sun, so Nyepi always falls in March or early April.`,
      faqs: [
        { q: 'Is Bali airport closed on Nyepi 2027?', a: 'Usually, yes. During Nyepi, Bali\'s airport handles no flights from the morning of Nyepi until the next morning, and visitors are asked to stay in their hotels. The official notice is issued by the airport authority before the day. For 2027, plan Eid travel to or from Bali outside 8 March.' },
        { q: 'When is the ogoh-ogoh parade in 2027?', a: 'On Pengerupukan, the day before Nyepi: Sunday evening 7 March 2027. Ogoh-ogoh, giant effigies representing evil traits, are paraded around the village and then burned or destroyed. Pengerupukan is not a national holiday, but in 2027 it falls on a Sunday.' },
        { q: 'Which Saka year does Nyepi 2027 begin?', a: 'Nyepi 2027 marks the Saka New Year 1949. The Saka year runs 78 years behind the Gregorian year and begins around March. In 2026 Nyepi marked Saka 1948, and in 2028 it marks Saka 1950. Nyepi 2027 falls on Monday 8 March.' },
      ],
      body: (h) => `<h2>Nyepi dates 2026–2028</h2>
${tabelRaya(h, 'nyepi')}
<p>The 2026 and 2027 dates come from the ${h.src('skb-2026', '2026 decree')} and the ${h.src('skb-2027', '2027 decree')}. This site does not compute the Balinese Saka calendar; the 2028 date awaits the next decree.</p>
<h2>The days around Nyepi</h2>
<p>Nyepi is preceded by Melasti, a purification ceremony at the sea or a spring, a few days before, then Tawur Kesanga and Pengerupukan on the last day of the Saka year. After Nyepi comes Ngembak Geni, a day of visits and forgiveness, which in 2027 falls on Tuesday 9 March, the same day as national collective leave.</p>
<p>Outside Bali, Hindus in Lombok, Java and elsewhere observe Nyepi at their temples and homes, without any regional shutdown. The holidays of that week are detailed on ${h.a('libur-maret-2027', 'March 2027 holidays')} and ${h.a('lebaran-2027', 'Eid 2027')}.</p>
${h.mini('bl', { p: ['bln'], d: { bln: '2027-03' }, c: 'See the March 2027 calendar' })}`,
    },
  }),
  defineGuide({
    id: 'waisak-2027', group: 'hari-raya', order: 65, tool: 'hr', toolArg: { hari: 'waisak', tahun: 2027 },
    countdown: cd(d('waisak', 2027), 'Menuju Waisak 2571 BE', 'Until Vesak 2571 BE'),
    related: ['libur-mei-2027', 'idul-adha-2027', 'nyepi-2027', 'long-weekend-2027'],
    sources: ['skb-2027', 'skb-2026'],
    idn: {
      slug: 'waisak-2027', nav: 'Waisak 2027', card: 'Kamis 20 Mei 2027, cuti bersama 19 Mei',
      title: 'Waisak 2027: Kamis 20 Mei, 2571 BE, cuti bersama 19 Mei',
      description: 'Hari Raya Waisak 2571 BE jatuh Kamis 20 Mei 2027 dengan cuti bersama Rabu 19 Mei. Libur enam hari bersama Idul Adha, jembatan Jumat 21 Mei, hitung mundur.',
      h1: 'Waisak 2027: 2571 Buddhist Era',
      intro: 'Hitung mundur menuju Hari Raya Waisak 2571 BE dan tanggal Waisak 2026 sampai 2028 menurut SKB.',
      resume: `Hari Raya Waisak 2571 BE jatuh pada ${I(d('waisak', 2027))} menurut SKB 2027, dengan cuti bersama pada Rabu 19 Mei. Waisak memperingati tiga peristiwa dalam kehidupan Buddha Gautama: kelahiran, pencapaian penerangan sempurna dan wafat, yang menurut tradisi terjadi pada purnama di bulan Waisak. Pada 2027 Waisak jatuh tiga hari setelah Idul Adha pada Senin 17 Mei, dan cuti bersama 18 serta 19 Mei menyambung keduanya. Hasilnya libur enam hari dari Sabtu 15 sampai Kamis 20 Mei, dan dengan satu hari cuti pada Jumat 21 Mei, sembilan hari sampai Minggu 23 Mei, peluang cuti terbaik sepanjang 2027. Perayaan nasional Waisak biasanya dipusatkan di kompleks Candi Mendut dan Borobudur di Jawa Tengah, dengan prosesi dari Mendut ke Borobudur dan pelepasan lampion. Pada 2026 Waisak 2570 BE jatuh pada Minggu 31 Mei, sehari sebelum Hari Lahir Pancasila.`,
      faqs: [
        { q: 'Apakah 21 Mei 2027 libur setelah Waisak?', a: 'Tidak. Jumat 21 Mei 2027 adalah hari kerja biasa. Karena terjepit di antara Waisak pada Kamis dan akhir pekan, satu hari cuti pada tanggal itu menyambung libur Idul Adha dan Waisak menjadi sembilan hari, dari Sabtu 15 sampai Minggu 23 Mei.' },
        { q: 'Berapa tahun Buddhis pada Waisak 2027?', a: 'Waisak 2027 memperingati tahun 2571 Buddhist Era (BE). Penanggalan Buddhis di Indonesia dihitung sejak parinibbana Buddha. Waisak 2026 menandai 2570 BE, dan Waisak 2028 akan menandai 2572 BE. Waisak 2027 jatuh pada Kamis 20 Mei dan merupakan libur nasional, sehingga menjadi bagian dari libur panjang di akhir Mei.' },
        { q: 'Di mana perayaan Waisak nasional 2027?', a: 'Perayaan nasional Waisak biasanya diselenggarakan di Candi Mendut, Candi Pawon dan Candi Borobudur di Kabupaten Magelang, Jawa Tengah, dengan prosesi berjalan kaki antara ketiga candi. Jadwal dan aturan kunjungan diumumkan panitia dan pengelola candi menjelang hari raya. Puncak acara biasanya mengikuti detik-detik Waisak, saat purnama tepat terjadi.' },
      ],
      body: (h) => `<h2>Tanggal Waisak 2026–2028</h2>
${tabelRaya(h, 'waisak')}
<p>Tanggal 2026 dan 2027 berasal dari ${h.src('skb-2026', 'SKB 2026')} dan ${h.src('skb-2027', 'SKB 2027')}. Tanggal Waisak di Indonesia ditentukan bersama majelis-majelis agama Buddha; situs ini tidak menghitungnya sendiri, sehingga tanggal 2028 menunggu SKB berikutnya.</p>
<h2>Waisak dan Idul Adha dalam satu pekan</h2>
<p>Pertemuan Idul Adha dan Waisak dalam satu pekan tidak akan berulang lama: Idul Adha bergeser sebelas hari lebih awal setiap tahun, sedangkan Waisak tetap di sekitar Mei. Pada 2028 Idul Adha sudah jatuh pada awal Mei. Bagi pekerja, pekan 15 sampai 23 Mei 2027 adalah kesempatan langka untuk libur panjang dengan satu hari cuti.</p>
<p>Seluruh peluang cuti bulan itu ada di ${h.a('libur-mei-2027', 'libur Mei 2027')}, dan rencana untuk setahun penuh di ${h.a('long-weekend-2027', 'long weekend 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 1 }, c: 'Hitung libur pekan Waisak' })}`,
    },
    en: {
      slug: 'vesak-2027', nav: 'Vesak 2027', card: 'Thursday 20 May 2027, collective leave on 19 May',
      title: 'Vesak 2027 Indonesia: Waisak on Thursday 20 May, 2571 BE',
      description: 'Vesak (Waisak) 2571 BE falls on Thursday 20 May 2027 in Indonesia, with collective leave on 19 May: a six-day break with Eid al-Adha and the 21 May bridge.',
      h1: 'Vesak 2027 in Indonesia: 2571 Buddhist Era',
      intro: 'A countdown to Vesak 2571 BE and the Vesak dates for 2026 to 2028 under the decree.',
      resume: `Vesak (Waisak) 2571 BE falls on ${E(d('waisak', 2027))} under the 2027 decree, with collective leave on Wednesday 19 May. Vesak marks three events in the life of the Buddha: his birth, his enlightenment and his passing, which tradition places on the full moon of the month of Vesak. In 2027 Vesak falls three days after Eid al-Adha on Monday 17 May, and collective leave on 18 and 19 May joins the two. The result is a six-day break from Saturday 15 to Thursday 20 May, and with one leave day on Friday 21 May, nine days to Sunday 23 May, the best leave opportunity of 2027. The national Vesak celebration is usually centred on the Mendut and Borobudur temples in Central Java, with a procession from Mendut to Borobudur and a lantern release. In 2026, Vesak 2570 BE fell on Sunday 31 May, the day before Pancasila Day.`,
      faqs: [
        { q: 'Is 21 May 2027 a day off after Vesak?', a: 'No. Friday 21 May 2027 is an ordinary working day. Because it sits between Vesak on Thursday and the weekend, one leave day on that date joins the Eid al-Adha and Vesak holidays into nine days, from Saturday 15 to Sunday 23 May.' },
        { q: 'Which Buddhist year does Vesak 2027 mark?', a: 'Vesak 2027 marks the year 2571 of the Buddhist Era (BE). The Buddhist calendar in Indonesia counts from the Buddha\'s parinibbana. Vesak 2026 marked 2570 BE, and Vesak 2028 will mark 2572 BE. Vesak 2027 falls on Thursday 20 May and is a national holiday.' },
        { q: 'Where is the national Vesak celebration in 2027?', a: 'The national Vesak celebration is usually held at the Mendut, Pawon and Borobudur temples in Magelang regency, Central Java, with a walking procession between the three temples. Schedules and visiting rules are announced by the organisers and temple management before the day.' },
      ],
      body: (h) => `<h2>Vesak dates 2026–2028</h2>
${tabelRaya(h, 'waisak')}
<p>The 2026 and 2027 dates come from the ${h.src('skb-2026', '2026 decree')} and the ${h.src('skb-2027', '2027 decree')}. The Vesak date in Indonesia is set with the Buddhist councils; this site does not compute it, so the 2028 date awaits the next decree.</p>
<h2>Vesak and Eid al-Adha in one week</h2>
<p>Eid al-Adha and Vesak in the same week will not happen again for a long time: Eid al-Adha moves eleven days earlier each year, while Vesak stays around May. By 2028 Eid al-Adha falls in early May. For workers, the week of 15 to 23 May 2027 is a rare chance of a long break for a single leave day.</p>
<p>All the leave opportunities of that month are on ${h.a('libur-mei-2027', 'May 2027 holidays')}, and the plan for a full year on ${h.a('long-weekend-2027', 'long weekends 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 1 }, c: 'Work out your Vesak week break' })}`,
    },
  }),
  defineGuide({
    id: 'paskah-2027', group: 'hari-raya', order: 66, tool: 'hr', toolArg: { hari: 'paskah', tahun: 2027 },
    countdown: cd(d('paskah', 2027), 'Menuju Paskah 2027', 'Until Easter 2027'),
    related: ['libur-maret-2027', 'natal-2026', 'lebaran-2027', 'libur-mei-2027'],
    sources: ['skb-2027', 'paskah-ptb'],
    idn: {
      slug: 'paskah-2027', nav: 'Paskah 2027', card: 'Jumat Agung 26 Maret, Paskah 28 Maret',
      title: 'Paskah 2027: Jumat Agung 26 Maret dan Kenaikan 6 Mei',
      description: 'Paskah 2027 jatuh Minggu 28 Maret: Wafat Yesus Kristus Jumat 26 Maret dengan cuti bersama Kamis 25 Maret, Kenaikan Kamis 6 Mei, dan tanggal Paskah 2028.',
      h1: 'Paskah 2027: Jumat Agung, Paskah dan Kenaikan',
      intro: 'Hitung mundur menuju Paskah 2027, dan tanggal Jumat Agung, Paskah dan Kenaikan Yesus Kristus 2026 sampai 2028.',
      resume: `Paskah, Kebangkitan Yesus Kristus, jatuh pada ${I(d('paskah', 2027))}. Jumat Agung, yang di Indonesia disebut Wafat Yesus Kristus, jatuh dua hari sebelumnya pada ${I(d('wafat-yesus', 2027))}, dan pemerintah menambahkan cuti bersama pada Kamis Putih, 25 Maret. Hasilnya libur empat hari dari Kamis 25 sampai Minggu 28 Maret, hanya sepuluh hari setelah libur Lebaran. Kenaikan Yesus Kristus, empat puluh hari setelah Paskah, jatuh pada ${I(d('kenaikan', 2027))}, dan Jumat 7 Mei sesudahnya menjadi jembatan satu hari. Tanggal Paskah tidak tetap: Paskah jatuh pada hari Minggu pertama setelah purnama pertama yang terjadi pada atau setelah 21 Maret, menurut aturan gerejawi. Kami menghitungnya dengan rumus Gauss dan memeriksanya dengan algoritme kedua untuk seribu tahun. Pada 2026 Paskah jatuh pada 5 April, dan pada 2028 pada 16 April.`,
      faqs: [
        { q: 'Apakah Kamis Putih 2027 libur?', a: 'Kamis Putih, 25 Maret 2027, bukan libur nasional, tetapi SKB 2027 menetapkannya sebagai cuti bersama. Bersama Jumat Agung pada 26 Maret dan akhir pekan Paskah, terbentuk libur empat hari bagi pekerja yang mengikuti cuti bersama. Paskah 2027 sendiri jatuh pada Minggu 28 Maret.' },
        { q: 'Kapan Kenaikan Yesus Kristus 2027?', a: `${I(d('kenaikan', 2027))}, empat puluh hari setelah Paskah bila hari Paskah dihitung sebagai hari pertama. Kenaikan adalah libur nasional. Jumat 7 Mei sesudahnya adalah hari kerja; satu hari cuti di sana memberi empat hari libur. Pada 2026, Kenaikan jatuh pada Kamis 14 Mei.` },
        { q: 'Bagaimana tanggal Paskah dihitung?', a: 'Paskah jatuh pada hari Minggu setelah purnama gerejawi pertama pada atau sesudah 21 Maret. Aturan ini dirumuskan menjadi rumus aritmetika oleh Carl Friedrich Gauss. Tanggal Paskah selalu antara 22 Maret dan 25 April, dan Jumat Agung serta Kenaikan mengikutinya. Alat di halaman ini memakai rumus yang sama.' },
      ],
      body: (h) => `<h2>Tanggal Paskah dan hari terkait 2026–2028</h2>
${h.table(['Tahun', 'Jumat Agung', 'Paskah', 'Kenaikan'], [2026, 2027, 2028].map((y) => [String(y), h.wday(d('wafat-yesus', y)), h.wday(d('paskah', y)), h.wday(d('kenaikan', y))]), 'Hari raya Paskah 2026–2028', ['l', 'l', 'l', 'l'])}
<p>Tanggal 2026 dan 2027 sama dengan ${h.src('skb-2027', 'SKB')} ; tanggal 2028 dihitung dengan ${h.src('paskah-ptb', 'rumus Paskah Gauss')} dan akan dicocokkan dengan SKB 2028 setelah terbit.</p>
<h2>Pekan Suci 2027</h2>
<p>Minggu Palma jatuh pada 21 Maret 2027, Kamis Putih pada 25 Maret, Jumat Agung pada 26 Maret dan Sabtu Suci pada 27 Maret. Bagi pekerja yang ingin libur panjang, tujuh hari cuti dari 16 sampai 24 Maret menyambung libur Lebaran dengan libur Paskah, dua puluh tiga hari libur berturut-turut.</p>
${tabelRaya(h, 'paskah')}
<p>Rincian bulan itu ada di ${h.a('libur-maret-2027', 'libur Maret 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 7 }, c: 'Sambungkan Lebaran dan Paskah' })}`,
    },
    en: {
      slug: 'easter-2027', nav: 'Easter 2027', card: 'Good Friday 26 March, Easter 28 March',
      title: 'Easter 2027 Indonesia: Good Friday 26 March, Ascension 6 May',
      description: 'Easter 2027 in Indonesia is Sunday 28 March: Good Friday on 26 March, collective leave on Maundy Thursday, Ascension Day on 6 May, and dates up to 2028.',
      h1: 'Easter 2027 in Indonesia: Good Friday, Easter and Ascension',
      intro: 'A countdown to Easter 2027, and the dates of Good Friday, Easter and Ascension Day for 2026 to 2028.',
      resume: `Easter Sunday falls on ${E(d('paskah', 2027))}. Good Friday, called Wafat Yesus Kristus in Indonesia, is two days earlier on ${E(d('wafat-yesus', 2027))}, and the government added collective leave on Maundy Thursday, 25 March. That makes a four-day break from Thursday 25 to Sunday 28 March, only ten days after the Eid break. Ascension Day, forty days after Easter, falls on ${E(d('kenaikan', 2027))}, and the following Friday, 7 May, is a one-day bridge. Easter has no fixed date: under church rules it falls on the first Sunday after the first full moon on or after 21 March. We compute it with Gauss's formula and check it against a second algorithm over a thousand years. In 2026 Easter fell on 5 April, and in 2028 it falls on 16 April.`,
      faqs: [
        { q: 'Is Maundy Thursday 2027 a day off in Indonesia?', a: 'Maundy Thursday, 25 March 2027, is not a national holiday, but the 2027 decree makes it a collective leave day. With Good Friday on 26 March and the Easter weekend, it gives a four-day break for workers who follow collective leave.' },
        { q: 'When is Ascension Day 2027 in Indonesia?', a: 'Thursday 6 May 2027, forty days after Easter counting Easter Sunday as the first day. Ascension Day is a national holiday. The following Friday, 7 May, is a working day; one leave day there gives four days off. The long weekend planner counts that bridge automatically.' },
        { q: 'How is the date of Easter calculated?', a: 'Easter falls on the Sunday after the first ecclesiastical full moon on or after 21 March. Carl Friedrich Gauss turned this rule into an arithmetic formula. Easter always falls between 22 March and 25 April, and Good Friday and Ascension Day follow it.' },
      ],
      body: (h) => `<h2>Easter and related days 2026–2028</h2>
${h.table(['Year', 'Good Friday', 'Easter', 'Ascension'], [2026, 2027, 2028].map((y) => [String(y), h.wday(d('wafat-yesus', y)), h.wday(d('paskah', y)), h.wday(d('kenaikan', y))]), 'Easter holidays 2026–2028', ['l', 'l', 'l', 'l'])}
<p>The 2026 and 2027 dates match the ${h.src('skb-2027', 'decree')}; the 2028 dates are computed with ${h.src('paskah-ptb', "Gauss's Easter formula")} and will be checked against the 2028 decree once published.</p>
<h2>Holy Week 2027</h2>
<p>Palm Sunday falls on 21 March 2027, Maundy Thursday on 25 March, Good Friday on 26 March and Holy Saturday on 27 March. For a long break, seven leave days from 16 to 24 March join the Eid break to the Easter break, twenty-three days off in a row.</p>
${tabelRaya(h, 'paskah')}
<p>The month is detailed on ${h.a('libur-maret-2027', 'March 2027 holidays')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 7 }, c: 'Join Eid and Easter' })}`,
    },
  }),
  defineGuide({
    id: 'natal-2026', group: 'hari-raya', order: 67, tool: 'hr', toolArg: { hari: 'natal', tahun: 2026 },
    countdown: cd(d('natal', 2026), 'Menuju Natal 2026', 'Until Christmas 2026'),
    related: ['libur-desember-2026', 'tahun-baru-2027', 'cuti-bersama-2026', 'libur-desember-2027'],
    sources: ['skb-2026', 'skb-2027'],
    idn: {
      slug: 'natal-2026', nav: 'Natal 2026', card: 'Jumat 25 Desember, libur empat hari',
      title: 'Natal 2026: Jumat 25 Desember, cuti bersama dan libur Nataru',
      description: 'Natal 2026 jatuh Jumat 25 Desember dengan cuti bersama Kamis 24 Desember: libur empat hari, hitung mundur WIB, dan rencana cuti Nataru sampai 3 Januari.',
      h1: 'Natal 2026 dan libur Natal-Tahun Baru',
      intro: 'Hitung mundur menuju Natal 2026 dan tanggal Natal 2026 sampai 2028, dengan cuti bersama dan rencana libur akhir tahun.',
      resume: `Natal 2026, Kelahiran Yesus Kristus, jatuh pada ${I(d('natal', 2026))}. SKB 2026 menetapkan cuti bersama pada Kamis 24 Desember, sehingga libur Natal berlangsung empat hari, dari Kamis 24 sampai Minggu 27 Desember. Masa Natal dan Tahun Baru, yang sering disingkat Nataru, berlanjut dengan Tahun Baru 2027 pada Jumat 1 Januari. Di antara keduanya hanya ada empat hari kerja, Senin 28 sampai Kamis 31 Desember. Empat hari cuti di sana memberi sebelas hari libur berturut-turut, dari 24 Desember 2026 sampai 3 Januari 2027. Bagi pemudik dan wisatawan, ini masa perjalanan tersibuk kedua setelah Lebaran. Natal 2027 jatuh pada Sabtu, dengan cuti bersama pada Jumat 24 Desember dan Isra Mikraj pada Minggu 26 Desember, sehingga libur Natal 2027 hanya tiga hari. Natal 2028 jatuh pada Senin.`,
      faqs: [
        { q: 'Berapa hari cuti yang dibutuhkan untuk libur Nataru 2026–2027?', a: 'Empat hari, Senin 28 sampai Kamis 31 Desember 2026, untuk sebelas hari libur dari Kamis 24 Desember sampai Minggu 3 Januari 2027. Dengan dua hari cuti, 30 dan 31 Desember, Anda mendapat lima hari libur dari 30 Desember sampai 3 Januari, terpisah dari libur Natal.' },
        { q: 'Hari apa Natal 2027?', a: 'Sabtu. Natal 2027 jatuh pada Sabtu 25 Desember, dengan cuti bersama pada Jumat 24 Desember dan Isra Mikraj pada Minggu 26 Desember. Bagi pekerja lima hari, libur Natal 2027 berlangsung tiga hari, satu hari lebih pendek dari 2026. Natal 2026 jatuh pada hari Jumat.' },
        { q: 'Apakah 26 Desember 2026 libur?', a: 'Sabtu 26 Desember 2026 adalah akhir pekan, bukan libur nasional. Indonesia tidak mengenal Boxing Day atau hari Natal kedua sebagai libur nasional. Pada 2027, 26 Desember kebetulan libur nasional karena Isra Mikraj, tetapi jatuh pada hari Minggu. Libur Natal 2026 berlangsung empat hari, Kamis 24 sampai Minggu 27 Desember.' },
      ],
      body: (h) => `<h2>Tanggal Natal 2026–2028</h2>
${tabelRaya(h, 'natal')}
<p>Tanggal 2026 dan 2027 serta cuti bersamanya berasal dari ${h.src('skb-2026', 'SKB 2026')} dan ${h.src('skb-2027', 'SKB 2027')}. Natal adalah hari libur bertanggal tetap, sehingga tanggal 2028 sudah pasti walaupun SKB 2028 belum terbit.</p>
<h2>Merencanakan libur Nataru</h2>
${h.table(['Cuti', 'Hari cuti', 'Libur', 'Hari libur'], [['Tanpa cuti', 0, '24–27 Des 2026', 4], ['31 Des', 1, '31 Des – 3 Jan', 4], ['30–31 Des', 2, '30 Des – 3 Jan', 5], ['28–31 Des', 4, '24 Des – 3 Jan', 11]], 'Pilihan cuti akhir 2026 (cuti bersama 24 Desember diliburkan)', ['l', 'r', 'l', 'r'])}
<p>Pilihan empat hari jauh lebih menguntungkan karena menyambung dua libur sekaligus. Rinciannya, beserta kalender bulan Desember, ada di ${h.a('libur-desember-2026', 'libur Desember 2026')} dan ${h.a('tahun-baru-2027', 'Tahun Baru 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2026, cuti: 4 }, c: 'Rencanakan libur Nataru' })}`,
    },
    en: {
      slug: 'christmas-2026', nav: 'Christmas 2026', card: 'Friday 25 December, a four-day break',
      title: 'Christmas 2026 Indonesia: Friday 25 December, Nataru break',
      description: 'Christmas 2026 in Indonesia falls on Friday 25 December, with collective leave on Thursday 24: a four-day break, a countdown and a year-end plan to 3 January.',
      h1: 'Christmas 2026 and the Christmas-New Year break',
      intro: 'A countdown to Christmas 2026 and the Christmas dates for 2026 to 2028, with collective leave and the year-end leave plan.',
      resume: `Christmas 2026 falls on ${E(d('natal', 2026))}. The 2026 decree sets collective leave on Thursday 24 December, so the Christmas break runs four days, from Thursday 24 to Sunday 27 December. The Christmas and New Year season, often shortened to Nataru in Indonesia, continues with New Year 2027 on Friday 1 January. Between the two there are only four working days, Monday 28 to Thursday 31 December. Four leave days there give eleven days off in a row, from 24 December 2026 to 3 January 2027. For people travelling home and tourists, it is the second busiest travel season after Eid. Christmas 2027 falls on a Saturday, with collective leave on Friday 24 December and Isra Mi'raj on Sunday 26 December, so the 2027 Christmas break is only three days. Christmas 2028 falls on a Monday.`,
      faqs: [
        { q: 'How many leave days do I need for the 2026–2027 year-end break?', a: 'Four, Monday 28 to Thursday 31 December 2026, for eleven days off from Thursday 24 December to Sunday 3 January 2027. With two leave days, 30 and 31 December, you get five days off from 30 December to 3 January, separate from the Christmas break.' },
        { q: 'What day is Christmas 2027?', a: 'A Saturday. Christmas 2027 falls on Saturday 25 December, with collective leave on Friday 24 December and Isra Mi\'raj on Sunday 26 December. For five-day workers the 2027 Christmas break lasts three days, one day shorter than in 2026. The 2026 break runs from Thursday 24 to Sunday 27 December.' },
        { q: 'Is 26 December 2026 a holiday in Indonesia?', a: 'Saturday 26 December 2026 is a weekend day, not a national holiday. Indonesia has no Boxing Day or second Christmas Day holiday. In 2027, 26 December happens to be a national holiday because of Isra Mi\'raj, but it falls on a Sunday.' },
      ],
      body: (h) => `<h2>Christmas dates 2026–2028</h2>
${tabelRaya(h, 'natal')}
<p>The 2026 and 2027 dates and their collective leave come from the ${h.src('skb-2026', '2026 decree')} and the ${h.src('skb-2027', '2027 decree')}. Christmas has a fixed date, so the 2028 date is certain even though the 2028 decree has not been published.</p>
<h2>Planning the Nataru break</h2>
${h.table(['Leave', 'Leave days', 'Break', 'Days off'], [['No leave', 0, '24–27 Dec 2026', 4], ['31 Dec', 1, '31 Dec – 3 Jan', 4], ['30–31 Dec', 2, '30 Dec – 3 Jan', 5], ['28–31 Dec', 4, '24 Dec – 3 Jan', 11]], 'Year-end 2026 leave options (collective leave on 24 December off)', ['l', 'r', 'l', 'r'])}
<p>The four-day option pays off far better because it joins two breaks at once. The details, with the December calendar, are on ${h.a('libur-desember-2026', 'December 2026 holidays')} and ${h.a('tahun-baru-2027', 'New Year 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2026, cuti: 4 }, c: 'Plan your Nataru break' })}`,
    },
  }),
  defineGuide({
    id: 'tahun-baru-islam-2027', group: 'hari-raya', order: 68, tool: 'hr', toolArg: { hari: 'muharam', tahun: 2027 },
    countdown: cd(d('muharam', 2027), 'Menuju 1 Muharam 1449 H', 'Until 1 Muharram 1449'),
    related: ['libur-juni-2027', 'kalender-hijriah', 'maulid-nabi-2027', 'idul-adha-2027'],
    sources: ['skb-2027', 'skb-2026', 'ummulqura'],
    idn: {
      slug: 'tahun-baru-islam-2027', nav: 'Tahun Baru Islam 2027', card: '1 Muharam 1449 H, Minggu 6 Juni',
      title: 'Tahun Baru Islam 2027: 1 Muharam 1449 H, Minggu 6 Juni',
      description: 'Tahun Baru Islam 1 Muharam 1449 H jatuh Minggu 6 Juni 2027 menurut SKB, dengan malam satu Suro pada Sabtu 5 Juni dan puasa Asyura pada Selasa 15 Juni.',
      h1: 'Tahun Baru Islam 2027: 1 Muharam 1449 H',
      intro: 'Hitung mundur menuju 1 Muharam 1449 H dan tanggal Tahun Baru Islam 2026 sampai 2028.',
      resume: `Tahun Baru Islam 1 Muharam 1449 H jatuh pada ${I(d('muharam', 2027))} menurut SKB 2027. Karena jatuh pada hari Minggu, libur ini tidak menambah hari libur bagi pekerja. Tahun Hijriah 1448 berakhir pada Sabtu 5 Juni, dan malam 1 Muharam, yang dalam tradisi Jawa disebut malam satu Suro, jatuh pada Sabtu malam itu setelah matahari terbenam. Hari Asyura, 10 Muharam, jatuh pada ${I(K.addDays(d('muharam', 2027), 9))} ; puasa Tasua dan Asyura dianjurkan pada 9 dan 10 Muharam. Kalender Hijriah dimulai dari hijrah Nabi Muhammad SAW dari Makkah ke Madinah, dan penetapannya sebagai awal penanggalan terjadi pada masa Khalifah Umar bin Khattab. Tahun Baru Islam 2026, 1 Muharam 1448 H, jatuh pada Selasa 16 Juni. Tahun Baru Islam 2028, 1 Muharam 1450 H, diperkirakan jatuh pada akhir Mei 2028.`,
      faqs: [
        { q: 'Kapan malam satu Suro 2027?', a: 'Sabtu malam 5 Juni 2027, setelah matahari terbenam. Dalam penanggalan Jawa, 1 Suro bertepatan dengan 1 Muharam, dan pada 2027 jatuh pada Minggu 6 Juni. Malam satu Suro diperingati dengan berbagai tradisi, antara lain kirab pusaka di keraton Yogyakarta dan Surakarta.' },
        { q: 'Kapan puasa Asyura 2027?', a: `Menurut tanggal SKB, 10 Muharam 1449 H jatuh pada ${I(K.addDays(d('muharam', 2027), 9))}, dan Tasua, 9 Muharam, sehari sebelumnya. Keduanya bukan hari libur. Tanggal pastinya mengikuti awal Muharam yang tersirat dalam SKB, yaitu 6 Juni 2027. Kalender Hijriah di situs ini menampilkan kedua tanggal itu.` },
        { q: 'Tahun Hijriah berapa yang dimulai pada 2027?', a: 'Tahun 1449 Hijriah, dimulai pada 6 Juni 2027. Karena tahun Hijriah lebih pendek sekitar sebelas hari, tahun Masehi 2027 mencakup bagian akhir tahun 1448 dan sebagian besar tahun 1449, dan tahun 1450 baru dimulai pada 2028. Tahun 1450 diperkirakan dimulai sekitar 25 Mei 2028.' },
      ],
      body: (h) => `<h2>Tanggal Tahun Baru Islam 2026–2028</h2>
${tabelRaya(h, 'muharam')}
<p>Tanggal 2026 dan 2027 berasal dari ${h.src('skb-2026', 'SKB 2026')} dan ${h.src('skb-2027', 'SKB 2027')}. Tanggal 2028 dihitung dengan kalender ${h.src('ummulqura', 'Umm al-Qura')} sebagai perkiraan.</p>
<h2>Bulan Muharam 1449 H</h2>
${h.table(['Hari', 'Tanggal Hijriah', 'Tanggal Masehi'], [['Malam satu Suro', '1 Muharam (malam)', h.wday(K.addDays(d('muharam', 2027), -1))], ['Tahun Baru Islam', '1 Muharam 1449 H', h.wday(d('muharam', 2027))], ['Tasua', '9 Muharam', h.wday(K.addDays(d('muharam', 2027), 8))], ['Asyura', '10 Muharam', h.wday(K.addDays(d('muharam', 2027), 9))]], 'Muharam 1449 H menurut tanggal SKB', ['l', 'l', 'l'])}
<p>Konversi tanggal lain ada di ${h.a('kalender-hijriah', 'kalender Hijriah 2027')}, dan kalender bulan Juni di ${h.a('libur-juni-2027', 'libur Juni 2027')}.</p>
${h.mini('hj', { p: ['bln', 'tgl'], d: { bln: '2027-06', tgl: 15 }, c: 'Ubah tanggal ke Hijriah' })}`,
    },
    en: {
      slug: 'islamic-new-year-2027', nav: 'Islamic New Year 2027', card: '1 Muharram 1449, Sunday 6 June',
      title: 'Islamic New Year 2027 Indonesia: 1 Muharram 1449, 6 June',
      description: 'The Islamic New Year, 1 Muharram 1449, falls on Sunday 6 June 2027 in Indonesia, with malam satu Suro on Saturday 5 June and Ashura on Tuesday 15 June.',
      h1: 'Islamic New Year 2027: 1 Muharram 1449',
      intro: 'A countdown to 1 Muharram 1449 and the Islamic New Year dates for 2026 to 2028.',
      resume: `The Islamic New Year, 1 Muharram 1449, falls on ${E(d('muharam', 2027))} under the 2027 decree. Because it falls on a Sunday, it adds no day off for workers. The Hijri year 1448 ends on Saturday 5 June, and the eve of 1 Muharram, called malam satu Suro in Javanese tradition, falls on that Saturday evening after sunset. Ashura, 10 Muharram, falls on ${E(K.addDays(d('muharam', 2027), 9))}; fasting is recommended on Tasua and Ashura, 9 and 10 Muharram. The Hijri calendar counts from the Prophet Muhammad's migration from Mecca to Medina, and it was adopted as the start of the era under Caliph Umar ibn al-Khattab. The 2026 Islamic New Year, 1 Muharram 1448, fell on Tuesday 16 June. The 2028 Islamic New Year, 1 Muharram 1450, is expected in late May 2028.`,
      faqs: [
        { q: 'When is malam satu Suro in 2027?', a: 'Saturday evening 5 June 2027, after sunset. In the Javanese calendar, 1 Suro coincides with 1 Muharram, which in 2027 is Sunday 6 June. Malam satu Suro is marked with various traditions, including processions of heirlooms at the Yogyakarta and Surakarta palaces.' },
        { q: 'When is the Ashura fast in 2027 in Indonesia?', a: `By the decree dates, 10 Muharram 1449 falls on ${E(K.addDays(d('muharam', 2027), 9))}, and Tasua, 9 Muharram, the day before. Neither is a holiday. The final dates follow the start of Muharram implied by the decree, which is 6 June 2027.` },
        { q: 'Which Hijri year begins in 2027?', a: 'The year 1449, starting on 6 June 2027. Because the Hijri year is about eleven days shorter, the Gregorian year 2027 covers the end of 1448 and most of 1449, and 1450 only begins in 2028. Hijri 1450 is expected to begin around 25 May 2028.' },
      ],
      body: (h) => `<h2>Islamic New Year dates 2026–2028</h2>
${tabelRaya(h, 'muharam')}
<p>The 2026 and 2027 dates come from the ${h.src('skb-2026', '2026 decree')} and the ${h.src('skb-2027', '2027 decree')}. The 2028 date is an estimate from the ${h.src('ummulqura', 'Umm al-Qura')} calendar.</p>
<h2>The month of Muharram 1449</h2>
${h.table(['Day', 'Hijri date', 'Gregorian date'], [['Malam satu Suro', '1 Muharram (eve)', h.wday(K.addDays(d('muharam', 2027), -1))], ['Islamic New Year', '1 Muharram 1449', h.wday(d('muharam', 2027))], ['Tasua', '9 Muharram', h.wday(K.addDays(d('muharam', 2027), 8))], ['Ashura', '10 Muharram', h.wday(K.addDays(d('muharam', 2027), 9))]], 'Muharram 1449 by the decree dates', ['l', 'l', 'l'])}
<p>Other dates can be converted on the ${h.a('kalender-hijriah', 'Hijri calendar 2027')}, and the June calendar is on ${h.a('libur-juni-2027', 'June 2027 holidays')}.</p>
${h.mini('hj', { p: ['bln', 'tgl'], d: { bln: '2027-06', tgl: 15 }, c: 'Convert a date to Hijri' })}`,
    },
  }),
  defineGuide({
    id: 'maulid-nabi-2027', group: 'hari-raya', order: 69, tool: 'hr', toolArg: { hari: 'maulid', tahun: 2027 },
    countdown: cd(d('maulid', 2027), 'Menuju Maulid Nabi 1449 H', 'Until the Prophet\'s Birthday 1449'),
    related: ['libur-agustus-2027', 'hut-ri-2027', 'tahun-baru-islam-2027', 'kalender-hijriah'],
    sources: ['skb-2027', 'skb-2026', 'ummulqura'],
    idn: {
      slug: 'maulid-nabi-2027', nav: 'Maulid Nabi 2027', card: '12 Rabiulawal 1449 H, Minggu 15 Agustus',
      title: 'Maulid Nabi 2027: Minggu 15 Agustus, 12 Rabiulawal 1449 H',
      description: 'Maulid Nabi Muhammad SAW 2027 jatuh Minggu 15 Agustus, 12 Rabiulawal 1449 H, dua hari sebelum 17 Agustus. Tanggal 2028, Sekaten dan hitung mundur WIB.',
      h1: 'Maulid Nabi 2027: 12 Rabiulawal 1449 H',
      intro: 'Hitung mundur menuju Maulid Nabi Muhammad SAW dan tanggalnya dari 2026 sampai 2028.',
      resume: `Maulid Nabi Muhammad SAW, 12 Rabiulawal 1449 H, jatuh pada ${I(d('maulid', 2027))} menurut SKB 2027. Karena jatuh pada hari Minggu, Maulid tidak menambah hari libur bagi pekerja, tetapi pekan itu tetap istimewa: dua hari kemudian, Selasa 17 Agustus, adalah Hari Kemerdekaan. Pada 2026 Maulid jatuh pada Selasa 25 Agustus 1448 H, delapan hari setelah Hari Kemerdekaan. Maulid diperingati dengan pengajian, pembacaan sirah dan selawat di masjid, sekolah dan rumah. Di Yogyakarta dan Surakarta, Maulid ditandai dengan Sekaten dan Grebeg Maulud, tradisi keraton yang mempertemukan dakwah dengan budaya Jawa. Awal bulan Rabiulawal 1449 H, menurut tanggal SKB, jatuh pada ${I(K.awalBulan(1449, 3)!.date)}. Maulid 2028 diperkirakan jatuh pada awal Agustus 2028, kembali bergeser sekitar sebelas hari lebih awal, sehingga peringatannya kelak juga jatuh di bulan Juli.`,
      faqs: [
        { q: 'Apakah Maulid Nabi 2027 menambah libur?', a: 'Tidak bagi pekerja lima atau enam hari, karena Maulid 2027 jatuh pada hari Minggu, 15 Agustus. Indonesia tidak memindahkan libur yang jatuh pada akhir pekan. Libur berikutnya, Hari Kemerdekaan pada Selasa 17 Agustus, jatuh pada hari kerja. Long weekend terdekat adalah Sabtu 14 sampai Selasa 17 Agustus dengan satu hari cuti pada Senin 16.' },
        { q: 'Kapan Grebeg Maulud 2027?', a: 'Grebeg Maulud diselenggarakan keraton Yogyakarta dan Surakarta pada 12 Rabiulawal menurut kalender Jawa, yang bisa berbeda satu hari dengan tanggal pemerintah. Pada 2027 itu sekitar 15 Agustus. Jadwal resmi diumumkan keraton menjelang perayaan. Gunungan hasil bumi diarak dari keraton ke masjid agung dan diperebutkan warga.' },
        { q: 'Mengapa Maulid jatuh di bulan yang berbeda setiap tahun?', a: 'Karena Maulid ditetapkan pada 12 Rabiulawal dalam kalender Hijriah, yang sekitar sebelas hari lebih pendek dari kalender Masehi. Setiap tahun Maulid maju sekitar sebelas hari; dalam tiga puluh tiga tahun, Maulid melewati semua bulan Masehi. Pada 2028 Maulid diperkirakan jatuh pada awal Agustus.' },
      ],
      body: (h) => `<h2>Tanggal Maulid Nabi 2026–2028</h2>
${tabelRaya(h, 'maulid')}
<p>Tanggal 2026 dan 2027 berasal dari ${h.src('skb-2026', 'SKB 2026')} dan ${h.src('skb-2027', 'SKB 2027')} ; tanggal 2028 adalah perkiraan menurut kalender ${h.src('ummulqura', 'Umm al-Qura')}.</p>
<h2>Pekan Maulid dan Hari Kemerdekaan</h2>
<p>Pada 2027 Maulid dan Hari Kemerdekaan berada dalam pekan yang sama. Satu hari cuti pada Senin 16 Agustus memberi empat hari libur dari Sabtu 14 sampai Selasa 17 Agustus. Kalender lengkap bulan itu ada di ${h.a('libur-agustus-2027', 'libur Agustus 2027')}, dan hitung mundur 17 Agustus di ${h.a('hut-ri-2027', 'HUT RI 2027')}.</p>
<p>Untuk menghitung tanggal Hijriah lain di bulan Rabiulawal, gunakan ${h.a('kalender-hijriah', 'konverter Hijriah')}.</p>
${h.mini('hj', { p: ['bln', 'tgl'], d: { bln: '2027-08', tgl: 15 }, c: 'Lihat tanggal Hijriah Agustus' })}`,
    },
    en: {
      slug: 'prophets-birthday-2027', nav: 'Prophet\'s Birthday 2027', card: '12 Rabi\' al-Awwal 1449, Sunday 15 August',
      title: 'Prophet\'s Birthday 2027 Indonesia: Mawlid on 15 August',
      description: 'The Prophet\'s Birthday (Mawlid) 2027 falls on Sunday 15 August in Indonesia, 12 Rabi\' al-Awwal 1449, two days before 17 August. Dates to 2028 and Sekaten.',
      h1: 'The Prophet\'s Birthday 2027: 12 Rabi\' al-Awwal 1449',
      intro: 'A countdown to the Prophet Muhammad\'s Birthday and its dates from 2026 to 2028.',
      resume: `The Prophet Muhammad's Birthday (Maulid Nabi), 12 Rabi' al-Awwal 1449, falls on ${E(d('maulid', 2027))} under the 2027 decree. Because it falls on a Sunday it adds no day off for workers, but the week is still special: two days later, Tuesday 17 August, is Independence Day. In 2026 the Mawlid fell on Tuesday 25 August (1448), eight days after Independence Day. It is marked with religious gatherings, readings of the Prophet's life and salawat in mosques, schools and homes. In Yogyakarta and Surakarta the Mawlid is marked with Sekaten and Grebeg Maulud, palace traditions that bring together religious teaching and Javanese culture. The month of Rabi' al-Awwal 1449 begins, by the decree dates, on ${E(K.awalBulan(1449, 3)!.date)}. The 2028 Mawlid is expected in early August 2028, again about eleven days earlier.`,
      faqs: [
        { q: 'Does the 2027 Prophet\'s Birthday add a day off in Indonesia?', a: 'Not for five- or six-day workers, because the 2027 Mawlid falls on a Sunday, 15 August. Indonesia does not move holidays that fall on a weekend. The next holiday, Independence Day on Tuesday 17 August, falls on a working day.' },
        { q: 'When is Grebeg Maulud 2027?', a: 'Grebeg Maulud is held by the Yogyakarta and Surakarta palaces on 12 Rabi\' al-Awwal by the Javanese calendar, which can differ by a day from the government date. In 2027 that is around 15 August. The palaces announce the official schedule before the celebration.' },
        { q: 'Why does the Mawlid fall in a different month each year?', a: 'Because it is fixed on 12 Rabi\' al-Awwal in the Hijri calendar, which is about eleven days shorter than the Gregorian calendar. Each year the Mawlid comes about eleven days earlier; over thirty-three years it passes through every Gregorian month.' },
      ],
      body: (h) => `<h2>Prophet's Birthday dates 2026–2028</h2>
${tabelRaya(h, 'maulid')}
<p>The 2026 and 2027 dates come from the ${h.src('skb-2026', '2026 decree')} and the ${h.src('skb-2027', '2027 decree')}; the 2028 date is an estimate from the ${h.src('ummulqura', 'Umm al-Qura')} calendar.</p>
<h2>Mawlid and Independence Day in one week</h2>
<p>In 2027 the Mawlid and Independence Day fall in the same week. One leave day on Monday 16 August gives four days off from Saturday 14 to Tuesday 17 August. The full calendar for that month is on ${h.a('libur-agustus-2027', 'August 2027 holidays')}, and the 17 August countdown on ${h.a('hut-ri-2027', 'Independence Day 2027')}.</p>
<p>To work out other Hijri dates in Rabi' al-Awwal, use the ${h.a('kalender-hijriah', 'Hijri converter')}.</p>
${h.mini('hj', { p: ['bln', 'tgl'], d: { bln: '2027-08', tgl: 15 }, c: 'See the August Hijri dates' })}`,
    },
  }),
  defineGuide({
    id: 'isra-mikraj-2027', group: 'hari-raya', order: 70, tool: 'hr', toolArg: { hari: 'isra-mikraj', tahun: 2027 },
    countdown: cd(d('isra-mikraj', 2027), 'Menuju Isra Mikraj 1448 H', 'Until Isra Mi\'raj 1448'),
    related: ['libur-januari-2027', 'libur-desember-2027', 'tahun-baru-2027', 'kalender-hijriah'],
    sources: ['skb-2027', 'skb-2026', 'ummulqura'],
    idn: {
      slug: 'isra-mikraj-2027', nav: 'Isra Mikraj 2027', card: 'Dua kali: 5 Januari dan 26 Desember 2027',
      title: 'Isra Mikraj 2027: dua kali, 5 Januari dan 26 Desember 2027',
      description: 'Isra Mikraj 2027 diperingati dua kali: Selasa 5 Januari (1448 H) dan Minggu 26 Desember (1449 H) menurut SKB. Mengapa terjadi dan jembatan 4 Januari 2027.',
      h1: 'Isra Mikraj 2027: dua tanggal dalam satu tahun',
      intro: 'Hitung mundur menuju Isra Mikraj berikutnya dan semua tanggal Isra Mikraj dari 2026 sampai 2028.',
      resume: `Tahun 2027 punya dua libur Isra Mikraj Nabi Muhammad SAW. Yang pertama, 27 Rajab 1448 H, jatuh pada ${I(d('isra-mikraj', 2027))} ; yang kedua, 27 Rajab 1449 H, pada ${I('2027-12-26')}, sehari setelah Natal. Keduanya tercantum dalam SKB 2027, dan itulah sebabnya 2027 memiliki delapan belas libur nasional, satu lebih banyak dari 2026. Isra Mikraj pertama jatuh pada hari kerja dan dapat disambung dengan Tahun Baru melalui satu hari cuti pada Senin 4 Januari, sehingga terbentuk libur lima hari. Isra Mikraj kedua jatuh pada hari Minggu dan, bersama Natal pada Sabtu serta cuti bersama pada Jumat 24 Desember, membentuk libur tiga hari. Isra Mikraj memperingati perjalanan malam Nabi Muhammad SAW dari Masjidilharam ke Masjidilaqsa dan naik ke Sidratulmuntaha, saat perintah salat lima waktu diterima. Pada 2026 Isra Mikraj jatuh pada Jumat 16 Januari.`,
      faqs: [
        { q: 'Kapan Isra Mikraj berikutnya setelah Desember 2027?', a: 'Isra Mikraj 1450 H diperkirakan jatuh pada pertengahan Desember 2028 menurut kalender Umm al-Qura, sekitar sebelas hari lebih awal dari 26 Desember 2027. Tahun 2028 hanya punya satu Isra Mikraj. Tanggal pastinya menunggu SKB 2028. Sampai saat itu, tanggal yang tampil di sini adalah hasil perhitungan.' },
        { q: 'Apakah dua Isra Mikraj di 2027 sama-sama libur nasional?', a: 'Ya. SKB 2027 mencantumkan keduanya sebagai libur nasional: Selasa 5 Januari untuk 1448 H dan Minggu 26 Desember untuk 1449 H. Hanya yang pertama mengurangi hari kerja, karena yang kedua jatuh pada hari Minggu. SKB 2027 tidak menambahkan cuti bersama untuk kedua tanggal itu.' },
        { q: 'Apa yang diperingati pada Isra Mikraj?', a: 'Isra adalah perjalanan malam Nabi Muhammad SAW dari Masjidilharam di Makkah ke Masjidilaqsa di Yerusalem; Mikraj adalah kenaikan beliau ke langit sampai Sidratulmuntaha. Dalam peristiwa itu umat Islam menerima perintah salat lima waktu. Peringatannya jatuh pada 27 Rajab. Tanggal Masehinya bergeser setiap tahun.' },
      ],
      body: (h) => `<h2>Tanggal Isra Mikraj 2026–2028</h2>
${tabelRaya(h, 'isra-mikraj', [['2027 (1449 H)', h.wday('2027-12-26'), ST.resmi.id]])}
<p>Tanggal berasal dari ${h.src('skb-2026', 'SKB 2026')} dan ${h.src('skb-2027', 'SKB 2027')} ; tanggal 2028 adalah perkiraan menurut kalender ${h.src('ummulqura', 'Umm al-Qura')}.</p>
<h2>Mengapa satu hari raya bisa muncul dua kali</h2>
<p>Tahun Hijriah terdiri dari dua belas bulan bulan, sekitar 354 atau 355 hari. Selisihnya dengan tahun Masehi sekitar sebelas hari setahun. Bila sebuah hari raya Islam jatuh pada awal Januari, sebelas hari sebelum akhir tahun berikutnya hari raya yang sama sudah datang lagi. Peristiwa ini terjadi untuk setiap hari raya Islam kira-kira sekali dalam tiga puluh tiga tahun.</p>
<p>Kedua tanggal 2027 dibahas dalam konteks bulannya di ${h.a('libur-januari-2027', 'libur Januari 2027')} dan ${h.a('libur-desember-2027', 'libur Desember 2027')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 1 }, c: 'Hitung jembatan 4 Januari' })}`,
    },
    en: {
      slug: 'isra-miraj-2027', nav: 'Isra Mi\'raj 2027', card: 'Twice: 5 January and 26 December 2027',
      title: 'Isra Mi\'raj 2027 Indonesia: twice, 5 Jan and 26 Dec 2027',
      description: 'Isra Mi\'raj is a holiday twice in 2027 in Indonesia: Tuesday 5 January (1448) and Sunday 26 December (1449). Why it happens, the 4 January bridge, a countdown.',
      h1: 'Isra Mi\'raj 2027: two dates in one year',
      intro: 'A countdown to the next Isra Mi\'raj and every Isra Mi\'raj date from 2026 to 2028.',
      resume: `2027 has two Isra Mi'raj holidays. The first, 27 Rajab 1448, falls on ${E(d('isra-mikraj', 2027))}; the second, 27 Rajab 1449, on ${E('2027-12-26')}, the day after Christmas. Both are listed in the 2027 decree, which is why 2027 has eighteen national holidays, one more than 2026. The first falls on a working day and can be joined to New Year with one leave day on Monday 4 January, making a five-day break. The second falls on a Sunday and, with Christmas on Saturday and collective leave on Friday 24 December, makes a three-day break. Isra Mi'raj commemorates the Prophet Muhammad's night journey from the Sacred Mosque in Mecca to al-Aqsa and his ascent to the highest heaven, when the five daily prayers were ordained. In 2026 Isra Mi'raj fell on Friday 16 January.`,
      faqs: [
        { q: 'When is the next Isra Mi\'raj after December 2027?', a: 'Isra Mi\'raj 1450 is expected in mid-December 2028 by the Umm al-Qura calendar, about eleven days earlier than 26 December 2027. 2028 has only one Isra Mi\'raj. The final date awaits the 2028 decree. Until then, the date shown here is a calculation, not an official date.' },
        { q: 'Are both 2027 Isra Mi\'raj dates national holidays?', a: 'Yes. The 2027 decree lists both as national holidays: Tuesday 5 January for 1448 and Sunday 26 December for 1449. Only the first reduces the number of working days, because the second falls on a Sunday. Neither date has collective leave attached in the decree.' },
        { q: 'What does Isra Mi\'raj commemorate?', a: 'Isra is the Prophet Muhammad\'s night journey from the Sacred Mosque in Mecca to al-Aqsa in Jerusalem; Mi\'raj is his ascent through the heavens to the Lote Tree of the Utmost Boundary. During that journey Muslims received the five daily prayers. It is commemorated on 27 Rajab.' },
      ],
      body: (h) => `<h2>Isra Mi'raj dates 2026–2028</h2>
${tabelRaya(h, 'isra-mikraj', [['2027 (1449 AH)', h.wday('2027-12-26'), ST.resmi.en]])}
<p>The dates come from the ${h.src('skb-2026', '2026 decree')} and the ${h.src('skb-2027', '2027 decree')}; the 2028 date is an estimate from the ${h.src('ummulqura', 'Umm al-Qura')} calendar.</p>
<h2>Why one festival can come twice</h2>
<p>A Hijri year has twelve lunar months, about 354 or 355 days. That is some eleven days a year shorter than the Gregorian year. When an Islamic festival falls in early January, the same festival comes round again eleven days before the end of the following year. This happens for each Islamic festival roughly once every thirty-three years.</p>
<p>Both 2027 dates are discussed in their months on ${h.a('libur-januari-2027', 'January 2027 holidays')} and ${h.a('libur-desember-2027', 'December 2027 holidays')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 1 }, c: 'Work out the 4 January bridge' })}`,
    },
  }),
  defineGuide({
    id: 'hut-ri-2027', group: 'hari-raya', order: 71, tool: 'hr', toolArg: { hari: 'kemerdekaan', tahun: 2027 },
    countdown: cd(d('kemerdekaan', 2027), 'Menuju HUT RI ke-82', 'Until the 82nd Independence Day'),
    related: ['libur-agustus-2027', 'maulid-nabi-2027', 'weton', 'long-weekend-2027'],
    sources: ['skb-2027', 'keppres-8-2024'],
    idn: {
      slug: 'hut-ri-2027', nav: 'HUT RI ke-82', card: 'Selasa 17 Agustus 2027, jembatan Senin',
      title: '17 Agustus 2027: HUT RI ke-82 jatuh hari Selasa, cuti Senin',
      description: 'HUT RI ke-82 jatuh Selasa 17 Agustus 2027. Cuti Senin 16 Agustus memberi libur empat hari bersama Maulid. Hitung mundur WIB dan weton hari Proklamasi.',
      h1: 'HUT RI ke-82: 17 Agustus 2027',
      intro: 'Hitung mundur menuju Hari Kemerdekaan ke-82 dan hari jatuhnya 17 Agustus dari 2026 sampai 2028.',
      resume: `Hari Ulang Tahun Kemerdekaan Republik Indonesia ke-82 jatuh pada ${I(d('kemerdekaan', 2027))}. Hari Proklamasi Kemerdekaan adalah libur nasional bertanggal tetap menurut Keppres tentang hari-hari libur, sehingga tanggalnya tidak pernah berubah, hanya harinya. Pada 2027, 17 Agustus jatuh pada Selasa, sehingga Senin 16 Agustus menjadi hari kerja yang terjepit. Satu hari cuti pada hari itu memberi libur empat hari dari Sabtu 14 sampai Selasa 17 Agustus, dan Maulid Nabi pada Minggu 15 Agustus berada di tengahnya. Proklamasi dibacakan pada Jumat 17 Agustus 1945, yang dalam penanggalan Jawa jatuh pada Jumat Legi, dan pada bulan Ramadan 1364 H. Upacara kenegaraan biasanya digelar pagi hari, disusul lomba dan acara di tingkat kampung. Pada 2026 HUT RI ke-81 jatuh pada Senin, dan pada 2028 HUT RI ke-83 akan jatuh pada Kamis, dengan Jumat 18 Agustus sebagai jembatan.`,
      faqs: [
        { q: 'HUT RI 2027 yang ke berapa?', a: 'Yang ke-82. Kemerdekaan diproklamasikan pada 17 Agustus 1945, sehingga 17 Agustus 2027 adalah ulang tahun ke-82. Pada 2026 Indonesia memperingati HUT ke-81, dan pada 2028 akan memperingati HUT ke-83. Setiap tahun pemerintah mengumumkan logo dan tema resmi peringatan kemerdekaan, dan upacara utama dipimpin Presiden.' },
        { q: 'Apakah 16 Agustus 2027 cuti bersama?', a: 'Tidak. SKB 2027 tidak menetapkan cuti bersama di bulan Agustus, sehingga Senin 16 Agustus adalah hari kerja biasa. Bagi yang ingin libur panjang, satu hari cuti di sana memberi empat hari libur. Perencana di halaman ini menampilkan pilihan itu, dari Sabtu 14 sampai Selasa 17 Agustus.' },
        { q: 'Proklamasi 17 Agustus 1945 jatuh pada weton apa?', a: 'Jumat Legi. Hari Proklamasi kami pakai sebagai titik acuan perhitungan pasaran Jawa di situs ini, karena tanggal dan hari pasarannya tercatat luas. Neptunya 11: Jumat bernilai 6 dan Legi bernilai 5. Kalkulator weton di situs ini memakai acuan yang sama untuk tanggal mana pun, termasuk tanggal lahir Anda.' },
      ],
      body: (h) => `<h2>Hari jatuhnya 17 Agustus, 2026–2028</h2>
${tabelRaya(h, 'kemerdekaan')}
<p>Tanggal 17 Agustus tetap setiap tahun menurut ${h.src('keppres-8-2024', 'Keppres Nomor 8 Tahun 2024')}, dan tercantum dalam ${h.src('skb-2027', 'SKB 2027')}. Hanya hari dalam seminggu yang berubah, dan itulah yang menentukan ada tidaknya jembatan.</p>
<h2>Merencanakan libur 17 Agustus</h2>
<p>Hari Selasa memberi jembatan pada Senin. Bila Anda ingin pulang kampung untuk upacara dan lomba, empat hari cuti, Senin 16 dan Rabu 18 sampai Jumat 20 Agustus, memberi sembilan hari libur dari 14 sampai 22 Agustus. Detailnya di ${h.a('libur-agustus-2027', 'libur Agustus 2027')}. Weton tanggal mana pun, termasuk hari Proklamasi, dapat dihitung di ${h.a('weton', 'kalkulator weton')}.</p>
${h.mini('wt', { p: ['tgl', 'bln', 'thn'], d: { tgl: 17, bln: 8, thn: 1945 }, c: 'Hitung weton Proklamasi' })}`,
    },
    en: {
      slug: 'independence-day-2027', nav: 'Independence Day 2027', card: 'Tuesday 17 August 2027, Monday bridge',
      title: 'Independence Day 2027 Indonesia: 17 August is a Tuesday',
      description: 'Indonesia\'s 82nd Independence Day falls on Tuesday 17 August 2027. Leave on Monday 16 August gives four days off with the Mawlid. A countdown and the weton.',
      h1: 'Indonesia\'s 82nd Independence Day: 17 August 2027',
      intro: 'A countdown to the 82nd Independence Day and the weekday of 17 August from 2026 to 2028.',
      resume: `Indonesia's 82nd Independence Day falls on ${E(d('kemerdekaan', 2027))}. Proclamation Day is a fixed-date national holiday under the presidential decree on public holidays, so the date never changes, only the weekday. In 2027, 17 August falls on a Tuesday, so Monday 16 August is a working day caught in between. One leave day there gives a four-day break from Saturday 14 to Tuesday 17 August, with the Prophet's Birthday on Sunday 15 August in the middle. The Proclamation was read on Friday 17 August 1945, a Jumat Legi in the Javanese calendar, during Ramadan 1364 AH. The state ceremony is usually held in the morning, followed by games and events in every neighbourhood. In 2026 the 81st Independence Day fell on a Monday, and in 2028 the 83rd falls on a Thursday, with Friday 18 August as a bridge.`,
      faqs: [
        { q: 'Which anniversary is Indonesia\'s Independence Day in 2027?', a: 'The 82nd. Independence was proclaimed on 17 August 1945, so 17 August 2027 is the 82nd anniversary. In 2026 Indonesia marked its 81st, and in 2028 it will mark its 83rd. Each year the government publishes an official logo and theme for the anniversary.' },
        { q: 'Is 16 August 2027 a collective leave day?', a: 'No. The 2027 decree sets no collective leave in August, so Monday 16 August is an ordinary working day. For a long break, one leave day there gives four days off. The planner on this page shows that option, from Saturday 14 to Tuesday 17 August.' },
        { q: 'What was the weton of the 17 August 1945 Proclamation?', a: 'Jumat Legi. We use Proclamation Day as the reference point for computing the Javanese pasaran on this site, because both its date and its market day are widely recorded. Its neptu is 11: Friday counts 6 and Legi counts 5.' },
      ],
      body: (h) => `<h2>The weekday of 17 August, 2026–2028</h2>
${tabelRaya(h, 'kemerdekaan')}
<p>17 August is fixed every year under ${h.src('keppres-8-2024', 'Presidential Decree 8 of 2024')} and is listed in the ${h.src('skb-2027', '2027 joint decree')}. Only the weekday changes, and that decides whether there is a bridge.</p>
<h2>Planning the 17 August break</h2>
<p>A Tuesday gives a bridge on the Monday. If you want to go home for the ceremony and the games, four leave days, Monday 16 and Wednesday 18 to Friday 20 August, give nine days off from 14 to 22 August. Details are on ${h.a('libur-agustus-2027', 'August 2027 holidays')}. The weton of any date, including Proclamation Day, can be worked out in the ${h.a('weton', 'weton calculator')}.</p>
${h.mini('wt', { p: ['tgl', 'bln', 'thn'], d: { tgl: 17, bln: 8, thn: 1945 }, c: 'Work out the Proclamation weton' })}`,
    },
  }),
  defineGuide({
    id: 'tahun-baru-2027', group: 'hari-raya', order: 72, tool: 'hr', toolArg: { hari: 'tahun-baru', tahun: 2027 },
    countdown: cd('2027-01-01', 'Menuju Tahun Baru 2027', 'Until New Year 2027'),
    related: ['natal-2026', 'libur-januari-2027', 'libur-desember-2026', 'isra-mikraj-2027'],
    sources: ['skb-2027', 'keppres-8-2024'],
    idn: {
      slug: 'tahun-baru-2027', nav: 'Tahun Baru 2027', card: 'Jumat 1 Januari 2027, libur tiga hari',
      title: 'Tahun Baru 2027: Jumat 1 Januari, hitung mundur tiga zona',
      description: 'Tahun Baru 2027 jatuh Jumat 1 Januari: hitung mundur ke pukul 00.00 WIB, kapan WITA dan WIT tiba lebih dulu, libur tiga hari, dan jembatan cuti 4 Januari.',
      h1: 'Tahun Baru 2027: hitung mundur dan libur awal tahun',
      intro: 'Hitung mundur detik demi detik menuju 1 Januari 2027 pukul 00.00 WIB, dan tanggal Tahun Baru 2026 sampai 2028.',
      resume: `Tahun Baru Masehi 2027 jatuh pada ${I('2027-01-01')}. Karena jatuh pada hari Jumat, libur Tahun Baru langsung membentuk long weekend tiga hari sampai Minggu 3 Januari. Indonesia punya tiga zona waktu, sehingga tahun baru tiba tiga kali: pukul 00.00 WIT di Papua dan Maluku, satu jam kemudian di zona WITA seperti Bali, Nusa Tenggara, Kalimantan Timur dan Sulawesi, dan dua jam kemudian di zona WIB, Sumatra, Jawa dan Kalimantan Barat. Hitung mundur di atas menghitung sampai pukul 00.00 WIB. Malam pergantian tahun, Kamis 31 Desember 2026, adalah hari kerja biasa. Empat hari setelah Tahun Baru, pada Selasa 5 Januari, menyusul Isra Mikraj, sehingga satu hari cuti pada Senin 4 Januari menyambung keduanya menjadi lima hari libur. Tahun Baru 2028 jatuh pada Sabtu dan tidak menambah hari libur bagi pekerja lima hari.`,
      faqs: [
        { q: 'Di mana tahun baru 2027 tiba pertama kali di Indonesia?', a: 'Di zona Waktu Indonesia Timur: Papua, Papua Barat, Maluku dan provinsi lain di zona WIT. Pukul 00.00 WIT sama dengan pukul 22.00 WIB, dua jam sebelum Jakarta. Zona WITA menyusul satu jam kemudian, lalu zona WIB. Hitung mundur di halaman ini mengikuti Waktu Indonesia Barat (WIB).' },
        { q: 'Apakah 31 Desember 2026 libur?', a: 'Tidak. Malam Tahun Baru, Kamis 31 Desember 2026, adalah hari kerja biasa menurut SKB 2026. Liburnya baru dimulai Jumat 1 Januari 2027. Banyak kantor mempersingkat jam kerja sore itu, tetapi tidak ada ketentuan nasional tentang hal itu. SKB 2026 juga tidak menetapkan cuti bersama pada tanggal itu.' },
        { q: 'Hari apa Tahun Baru 2028?', a: 'Sabtu. Tahun Baru 2028 jatuh pada Sabtu 1 Januari, sehingga tidak menambah hari libur bagi pekerja lima hari, karena Indonesia tidak memindahkan libur yang jatuh pada akhir pekan. Tahun 2028 juga tahun kabisat dengan 366 hari. Tahun 2027 sendiri berakhir pada hari Jumat.' },
      ],
      body: (h) => `<h2>Tanggal Tahun Baru 2026–2028</h2>
${tabelRaya(h, 'tahun-baru')}
<p>Tahun Baru Masehi adalah libur bertanggal tetap menurut ${h.src('keppres-8-2024', 'Keppres Nomor 8 Tahun 2024')} dan tercantum dalam ${h.src('skb-2027', 'SKB 2027')}.</p>
<h2>Pergantian tahun di tiga zona waktu</h2>
${h.table(['Zona', 'Wilayah', 'Pukul 00.00 setempat = pukul WIB'], [['WIT (UTC+9)', 'Papua, Maluku', '22.00'], ['WITA (UTC+8)', 'Bali, Nusa Tenggara, Kalimantan Timur dan Selatan, Sulawesi', '23.00'], ['WIB (UTC+7)', 'Sumatra, Jawa, Kalimantan Barat dan Tengah', '00.00']], 'Tahun baru di tiga zona waktu Indonesia', ['l', 'l', 'l'])}
<p>Libur awal Januari, termasuk Isra Mikraj pada 5 Januari, dibahas di ${h.a('libur-januari-2027', 'libur Januari 2027')}. Untuk pekan sebelum Tahun Baru, lihat ${h.a('natal-2026', 'Natal 2026')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 1 }, c: 'Hitung jembatan awal tahun' })}`,
    },
    en: {
      slug: 'new-year-2027', nav: 'New Year 2027', card: 'Friday 1 January 2027, a three-day weekend',
      title: 'New Year 2027 Indonesia: Friday 1 January, WIB countdown',
      description: 'New Year 2027 in Indonesia falls on Friday 1 January: a countdown to 00:00 WIB, why Eastern Indonesia gets there first, the long weekend, the 4 January bridge.',
      h1: 'New Year 2027 in Indonesia: countdown and early-January holidays',
      intro: 'A second-by-second countdown to 1 January 2027 at 00:00 WIB, and the New Year dates for 2026 to 2028.',
      resume: `New Year's Day 2027 falls on ${E('2027-01-01')}. Because it is a Friday, the holiday makes a three-day weekend straight away, to Sunday 3 January. Indonesia has three time zones, so the new year arrives three times: at 00:00 WIT in Papua and Maluku, an hour later in the WITA zone, such as Bali, Nusa Tenggara, East Kalimantan and Sulawesi, and two hours later in the WIB zone, Sumatra, Java and West Kalimantan. The countdown above counts to 00:00 WIB. New Year's Eve, Thursday 31 December 2026, is an ordinary working day. Four days after New Year, on Tuesday 5 January, comes Isra Mi'raj, so one leave day on Monday 4 January joins the two into five days off. New Year 2028 falls on a Saturday and adds no day off for five-day workers.`,
      faqs: [
        { q: 'Where in Indonesia does 2027 arrive first?', a: 'In the Eastern Indonesia Time zone: Papua, West Papua, Maluku and the other WIT provinces. 00:00 WIT is 22:00 WIB, two hours before Jakarta. The WITA zone follows an hour later, then the WIB zone. The countdown on this page follows Western Indonesia Time (WIB).' },
        { q: 'Is New Year\'s Eve 2026 a day off in Indonesia?', a: 'No. New Year\'s Eve, Thursday 31 December 2026, is an ordinary working day under the 2026 decree. The holiday starts on Friday 1 January 2027. Many offices shorten the working day that afternoon, but there is no national rule on it.' },
        { q: 'What day is New Year 2028?', a: 'A Saturday. New Year 2028 falls on Saturday 1 January, so it adds no day off for five-day workers, since Indonesia does not move holidays that fall on a weekend. 2028 is also a leap year with 366 days. 2027 itself ends on a Friday.' },
      ],
      body: (h) => `<h2>New Year dates 2026–2028</h2>
${tabelRaya(h, 'tahun-baru')}
<p>New Year's Day is a fixed-date holiday under ${h.src('keppres-8-2024', 'Presidential Decree 8 of 2024')} and is listed in the ${h.src('skb-2027', '2027 joint decree')}.</p>
<h2>The new year in three time zones</h2>
${h.table(['Zone', 'Region', 'Local 00:00 = WIB time'], [['WIT (UTC+9)', 'Papua, Maluku', '22:00'], ['WITA (UTC+8)', 'Bali, Nusa Tenggara, East and South Kalimantan, Sulawesi', '23:00'], ['WIB (UTC+7)', 'Sumatra, Java, West and Central Kalimantan', '00:00']], 'New Year across Indonesia\'s three time zones', ['l', 'l', 'l'])}
<p>The early-January holidays, including Isra Mi'raj on 5 January, are covered on ${h.a('libur-januari-2027', 'January 2027 holidays')}. For the week before New Year, see ${h.a('natal-2026', 'Christmas 2026')}.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: 1 }, c: 'Work out the New Year bridge' })}`,
    },
  }),
];
