/** Alat: long weekend, hari kerja, hitung mundur, Hijriah, weton, hari kerja antara dua tanggal, sisa cuti, kalender cetak. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { dWeek, dLong, namaHijriah } from '../../lib/tool-specs';
import { tabelLongWeekend, tabelJembatan, tabelAnggaran, tabelHariKerja } from '../../lib/bausteine';

const I = (iso: string) => dWeek(iso, 'id'), E = (iso: string) => dWeek(iso, 'en');
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
const o1 = K.optimalkan(2027, 1), o4 = K.optimalkan(2027, 4), o8 = K.optimalkan(2027, 8), o12 = K.optimalkan(2027, 12);
const lw27 = K.longWeekend(2027);
const hk27 = K.hariKerja(2027), hkTot = sum(hk27), hkNoCb = sum(K.hariKerja(2027, { cb: false })), hkSabtu = sum(K.hariKerja(2027, { sabtu: true })), kotor = K.hariKerjaKotor(2027);
const lebaran = K.raya('idul-fitri', 2027)!.date, puasa = K.raya('puasa', 2027)!.date;
const hariKe = (iso: string) => K.diffDays('2026-10-28', iso);
const BLN_H: Array<[number, number]> = [[1448, 7], [1448, 8], [1448, 9], [1448, 10], [1448, 11], [1448, 12], [1449, 1], [1449, 2], [1449, 3], [1449, 4], [1449, 5], [1449, 6], [1449, 7]];
const tabelAwal = (lang: 'id' | 'en') => BLN_H.map(([hy, hm]) => { const a = K.awalBulan(hy, hm)!; return [`1 ${namaHijriah(hm, lang)} ${hy}`, dWeek(a.date, lang), K.panjangBulan(hy, hm) ?? '', a.resmi ? (lang === 'id' ? 'tersirat dalam SKB' : 'implied by the decree'): (lang === 'id' ? 'perhitungan' : 'computed')]; });
const w45 = K.weton('1945-08-17'), wLeb = K.weton(lebaran), wNow = K.weton('2026-10-28');
const neptuTabel = (lang: 'id' | 'en') => K.HARI_ID.map((hd, i) => [hd, K.NEPTU_HARI[i]]);
const pasTabel = () => K.PASARAN.map((p, i) => [p, K.NEPTU_PASARAN[i]]);
const hh1 = K.hariKerjaAntara('2027-03-01', '2027-03-31'), hh2 = K.hariKerjaAntara('2027-01-01', '2027-06-30');
const plus14 = K.tambahHariKerja('2027-03-05', 14);
const CB = K.cutiBersama(2027).length, MIN = K.P.cuti_tahunan.min_hari;

export default [
  defineGuide({
    id: 'long-weekend-2027', group: 'alat', order: 1, tool: 'lw', toolArg: { tahun: 2027, cuti: 4 },
    related: ['home', 'libur-nasional-2027', 'cuti-bersama-2027', 'sisa-cuti-tahunan', 'lebaran-2027'],
    sources: ['skb-2027', 'uu-6-2023'],
    idn: {
      slug: 'long-weekend-2027', nav: 'Long weekend 2027', card: 'Rencana cuti terbaik untuk jumlah cuti Anda',
      title: 'Long weekend 2027: rencana cuti terbaik, 1 cuti jadi 9 hari',
      description: 'Long weekend 2027 dan perencana cuti: masukkan jumlah cuti Anda dan lihat tanggal yang memberi libur terpanjang, dari 1 hari cuti untuk 9 hari sampai 23 hari.',
      h1: 'Long weekend 2027 dan perencana cuti',
      intro: 'Masukkan berapa hari cuti yang ingin Anda pakai: perencana menunjukkan tanggal cuti yang memberi libur terpanjang di 2027, lengkap dengan setiap blok liburnya.',
      resume: `Tanpa mengambil cuti sama sekali, 2027 memberi ${lw27.length} long weekend bila cuti bersama ikut diliburkan, termasuk libur Lebaran sepuluh hari dari 6 sampai 15 Maret. Dengan cuti, hasilnya jauh lebih besar. Satu hari cuti pada ${I(o1.blok[0].cutiDari)} memberi ${o1.libur} hari libur berturut-turut, dari ${dLong(o1.blok[0].liburDari, 'id')} sampai ${dLong(o1.blok[0].liburSampai, 'id')}, karena Idul Adha, dua cuti bersama dan Waisak sudah menutup hampir seluruh pekan itu. Empat hari cuti yang ditempatkan dengan benar memberi ${o4.libur} hari libur, delapan hari cuti ${o8.libur} hari, dan dua belas hari cuti ${o12.libur} hari. Perencana menghitung setiap kombinasi blok kerja dalam setahun dan memilih yang memberi hari libur terbanyak; bila sama, yang memakai cuti paling sedikit. Hasilnya tepat, bukan perkiraan. Bila perusahaan Anda tidak menerapkan cuti bersama atau Anda bekerja enam hari seminggu, ubah pilihan di bagian “detail lain”.`,
      faqs: [
        { q: 'Kapan long weekend terpanjang 2027?', a: 'Libur Idul Fitri: Sabtu 6 sampai Senin 15 Maret 2027, sepuluh hari tanpa cuti bila cuti bersama diterapkan. Nyepi pada Senin 8 Maret, cuti bersama 9, 12 dan 15 Maret serta Idul Fitri 10 dan 11 Maret menutup seluruh pekan. Dengan empat hari cuti tambahan, 16 sampai 19 Maret, libur menjadi enam belas hari.' },
        { q: 'Tanggal berapa cuti paling menguntungkan di 2027?', a: `Jumat 21 Mei 2027. Satu hari cuti itu menyambung Idul Adha, cuti bersama dan Waisak dengan akhir pekan: ${o1.libur} hari libur dari 15 sampai 23 Mei. Berikutnya Senin 4 Januari, Jumat 7 Mei, Senin 31 Mei dan Senin 16 Agustus, yang masing-masing memberi empat atau lima hari libur dengan satu hari cuti.` },
        { q: 'Apakah perencana ini berlaku untuk enam hari kerja seminggu?', a: 'Ya. Pilih “6 hari” pada jumlah hari kerja per minggu. Sabtu lalu dihitung sebagai hari kerja, sehingga sebagian long weekend menyusut dan hari cuti yang dibutuhkan bertambah. Rencana terbaik dihitung ulang dari awal untuk pola kerja itu. Pilihan Anda tersimpan di alamat halaman, sehingga tautannya bisa dibagikan.' },
        { q: 'Bagaimana bila kantor saya tidak libur saat cuti bersama?', a: 'Pilih “tetap kerja” untuk cuti bersama. Hari-hari itu lalu dianggap hari kerja biasa. Libur Lebaran 2027 tanpa cuti bersama terpecah menjadi dua bagian, dan perencana akan menyarankan cuti pada 9, 12 dan 15 Maret bila jumlah cuti Anda cukup. Hak cuti Anda juga tidak dipotong untuk hari-hari itu.' },
      ],
      body: (h) => `<h2>Hasil perencana untuk beberapa jumlah cuti</h2>
<p>Tabel ini menunjukkan berapa hari libur berturut-turut yang Anda dapat di 2027 bila cuti ditempatkan sebaik mungkin, dengan pola lima hari kerja dan cuti bersama sebagai libur.</p>
${tabelAnggaran(h, 2027)}
<p>Hari cuti pertama paling berharga. Sesudahnya, setiap hari tambahan memberi lebih sedikit, sampai titik di mana satu minggu cuti biasa hanya memberi sembilan hari libur untuk lima hari cuti. Karena itu rencana terbaik hampir selalu dimulai dari jembatan satu hari.</p>
<h2>Peluang cuti terbaik 2027</h2>
${tabelJembatan(h, 2027)}
<p>Angka di kolom terakhir sudah termasuk akhir pekan dan hari libur di sekitar cuti. Jembatan yang bersebelahan bisa digabung: cuti 16 sampai 24 Maret menyambung libur Lebaran dengan libur Paskah, ${K.optimalkan(2027, 12).blok.find((b) => b.cutiDari === '2027-03-16')?.libur ?? 23} hari libur dengan tujuh hari cuti.</p>
<h2>Long weekend tanpa cuti</h2>
${tabelLongWeekend(h, 2027)}
<p>Daftar resmi yang mendasari semua hitungan ini ada di ${h.a('libur-nasional-2027', 'libur nasional 2027')} dan ${h.a('cuti-bersama-2027', 'cuti bersama 2027')}. Hak cuti tahunan minimal ${MIN} hari mengikuti ${h.src('uu-6-2023', 'UU Ketenagakerjaan')} ; berapa yang tersisa setelah cuti bersama, hitung di ${h.a('sisa-cuti-tahunan', 'sisa cuti tahunan')}.</p>
${h.mini('ct', { p: ['hak'], d: { tahun: 2027, hak: 12 }, c: 'Hitung sisa cuti Anda' })}`,
    },
    en: {
      slug: 'long-weekends-2027', nav: 'Long weekends 2027', card: 'The best leave plan for your number of days',
      title: 'Long weekends 2027 Indonesia: best leave plan, 1 day for 9',
      description: 'Indonesia long weekends 2027 and leave planner: enter your leave days and see the dates that give the longest breaks, from 1 leave day for 9 days off to 23.',
      h1: 'Indonesia long weekends 2027 and leave planner',
      intro: 'Enter how many leave days you want to use: the planner shows the dates that give the longest breaks in 2027, with every block of days off.',
      resume: `Without taking any leave, 2027 gives ${lw27.length} long weekends if collective leave is a day off, including a ten-day Eid break from 6 to 15 March. With leave, the gain is much bigger. One leave day on ${E(o1.blok[0].cutiDari)} gives ${o1.libur} days off in a row, from ${dLong(o1.blok[0].liburDari, 'en')} to ${dLong(o1.blok[0].liburSampai, 'en')}, because Eid al-Adha, two collective leave days and Vesak already cover almost the whole week. Four well-placed leave days give ${o4.libur} days off, eight give ${o8.libur} and twelve give ${o12.libur}. The planner checks every combination of working blocks in the year and picks the one with the most days off; on a tie, the one using fewer leave days. The answer is exact, not an estimate. If your employer does not apply collective leave or you work a six-day week, change the options under "more details".`,
      faqs: [
        { q: 'When is the longest long weekend in Indonesia in 2027?', a: 'The Eid al-Fitr break: Saturday 6 to Monday 15 March 2027, ten days without leave if collective leave applies. Nyepi on Monday 8 March, collective leave on 9, 12 and 15 March and Eid on 10 and 11 March cover the whole week. Four more leave days, 16 to 19 March, stretch it to sixteen days.' },
        { q: 'Which single leave day pays off most in 2027?', a: `Friday 21 May 2027. That one leave day joins Eid al-Adha, collective leave and Vesak to the weekend: ${o1.libur} days off from 15 to 23 May. Next come Monday 4 January, Friday 7 May, Monday 31 May and Monday 16 August, each giving four or five days off for one leave day.` },
        { q: 'Does the planner work for a six-day week?', a: 'Yes. Choose "6 days" for working days per week. Saturday then counts as a working day, so some long weekends shrink and you need more leave days. The best plan is recomputed from scratch for that work pattern. Your choice is kept in the page address, so a shared link keeps it.' },
        { q: 'What if my office stays open on collective leave days?', a: 'Choose "working days" for collective leave. Those days then count as ordinary working days. Without collective leave the 2027 Eid break splits into two parts, and the planner will suggest leave on 9, 12 and 15 March if you have enough days.' },
      ],
      body: (h) => `<h2>Planner results for several leave budgets</h2>
<p>This table shows how many consecutive days off you get in 2027 when leave is placed as well as possible, on a five-day week with collective leave off.</p>
${tabelAnggaran(h, 2027)}
<p>The first leave day is the most valuable. After that each extra day gives less, down to the point where an ordinary week of leave buys only nine days off for five days of leave. That is why the best plan nearly always starts with one-day bridges.</p>
<h2>Best leave opportunities 2027</h2>
${tabelJembatan(h, 2027)}
<p>The last column already includes the weekends and holidays around the leave. Neighbouring bridges can be combined: leave from 16 to 24 March joins the Eid break to the Easter break, ${K.optimalkan(2027, 12).blok.find((b) => b.cutiDari === '2027-03-16')?.libur ?? 23} days off for seven leave days.</p>
<h2>Long weekends without leave</h2>
${tabelLongWeekend(h, 2027)}
<p>The official lists behind all of this are on ${h.a('libur-nasional-2027', 'public holidays 2027')} and ${h.a('cuti-bersama-2027', 'collective leave 2027')}. The minimum annual leave of ${MIN} days follows the ${h.src('uu-6-2023', 'Manpower Act')}; to see what remains after collective leave, use ${h.a('sisa-cuti-tahunan', 'annual leave balance')}.</p>
${h.mini('ct', { p: ['hak'], d: { tahun: 2027, hak: 12 }, c: 'Work out your leave balance' })}`,
    },
  }),
  defineGuide({
    id: 'hari-kerja-2027', group: 'alat', order: 2, tool: 'hk', toolArg: { tahun: 2027 },
    related: ['hitung-hari-kerja', 'libur-nasional-2027', 'cuti-bersama-2027', 'kalender-cetak'],
    sources: ['skb-2027', 'uu-6-2023'],
    idn: {
      slug: 'hari-kerja-2027', nav: 'Hari kerja 2027', card: `${hkTot} hari kerja, bulan demi bulan`,
      title: 'Hari kerja 2027: jumlah per bulan untuk 5 dan 6 hari kerja',
      description: `Jumlah hari kerja 2027 di Indonesia per bulan: ${hkTot} hari untuk lima hari kerja dengan cuti bersama, ${hkNoCb} tanpa cuti bersama, ${hkSabtu} untuk enam hari kerja seminggu.`,
      h1: 'Hari kerja 2027 per bulan',
      intro: 'Pilih pola kerja Anda: alat menghitung hari kerja 2027 per bulan, dikurangi libur nasional dan, bila berlaku, cuti bersama.',
      resume: `Tahun 2027 punya ${kotor} hari Senin sampai Jumat. Setelah dikurangi libur nasional yang jatuh pada hari kerja dan ${CB} hari cuti bersama, tersisa ${hkTot} hari kerja untuk pegawai yang bekerja lima hari seminggu. Bila perusahaan tidak menerapkan cuti bersama, jumlahnya ${hkNoCb} hari. Pegawai dengan enam hari kerja seminggu, Senin sampai Sabtu, bekerja ${hkSabtu} hari. Bulan dengan hari kerja paling sedikit adalah Maret, hanya ${hk27[2]} hari, karena Nyepi, Idul Fitri, Wafat Yesus Kristus dan empat cuti bersama jatuh di bulan itu. Mei menyusul dengan ${hk27[4]} hari. Bulan terpadat adalah April, Juli, September, November dan Desember dengan 22 hari. Angka ini dipakai untuk menghitung gaji harian, uang makan, target produksi, tenggat kontrak atau lembur. Untuk dua tanggal tertentu, gunakan kalkulator hari kerja antara dua tanggal.`,
      faqs: [
        { q: 'Berapa hari kerja dalam setahun 2027?', a: `${hkTot} hari untuk lima hari kerja seminggu bila cuti bersama diliburkan, ${hkNoCb} hari bila tidak, dan ${hkSabtu} hari untuk enam hari kerja seminggu. Dasarnya ${kotor} hari Senin sampai Jumat dikurangi libur nasional dan cuti bersama yang jatuh pada hari kerja.` },
        { q: 'Berapa hari kerja di bulan Maret 2027?', a: `${hk27[2]} hari untuk lima hari kerja dengan cuti bersama. Maret 2027 memuat Nyepi, dua hari Idul Fitri, Wafat Yesus Kristus dan empat hari cuti bersama, sehingga menjadi bulan dengan hari kerja paling sedikit dalam tahun itu. Tanpa cuti bersama, angkanya ${K.hariKerja(2027, { cb: false })[2]} hari.` },
        { q: 'Apakah hari kerja dipakai untuk menghitung gaji harian?', a: 'Sering, tetapi tidak selalu. Peraturan pengupahan membedakan pekerja dengan lima dan enam hari kerja seminggu; banyak perusahaan memakai pembagi tetap per bulan. Periksa perjanjian kerja Anda. Alat ini memberi jumlah hari kerja sebenarnya per bulan, yang bisa dipakai sebagai dasar.' },
      ],
      body: (h) => `<h2>Hari kerja 2027 untuk tiga pola kerja</h2>
<p>Tabel menghitung setiap bulan dengan tiga pola: lima hari kerja dengan cuti bersama sebagai libur, lima hari kerja tanpa cuti bersama, dan enam hari kerja. Libur nasional diambil dari ${h.src('skb-2027', 'SKB 2027')}.</p>
${tabelHariKerja(h, 2027)}
<h2>Mengapa Maret dan Mei 2027 begitu pendek</h2>
<p>Idul Fitri 2027 jatuh pada Rabu 10 Maret, dua hari setelah Nyepi. Bersama tiga cuti bersama Lebaran dan cuti bersama sebelum Wafat Yesus Kristus pada 26 Maret, bulan itu kehilangan delapan hari kerja. Mei kehilangan lima: Kenaikan Yesus Kristus, Idul Adha, Waisak dan dua cuti bersama, sementara Hari Buruh jatuh pada Sabtu dan tidak mengurangi hari kerja lima hari.</p>
<p>Bagi pekerja enam hari, Sabtu dihitung sebagai hari kerja. Tiga libur nasional 2027 yang jatuh pada Sabtu, yaitu Imlek, Hari Buruh dan Natal, mengurangi hari kerja mereka, tetapi tidak mengurangi hari kerja pekerja lima hari.</p>
<h2>Hari kerja dan cuti tahunan</h2>
<p>Hak cuti tahunan dihitung dalam hari kerja: paling sedikit ${MIN} hari setelah dua belas bulan bekerja, menurut ${h.src('uu-6-2023', 'UU 6/2023')}. Dengan ${CB} cuti bersama yang memotong hak itu, pekerja dengan hak minimal memegang ${MIN - CB} hari untuk diatur sendiri. Untuk menghitung hari kerja antara dua tanggal tertentu, gunakan ${h.a('hitung-hari-kerja', 'kalkulator hari kerja')}.</p>
${h.mini('hh', { p: ['bln1', 'tgl1', 'bln2', 'tgl2'], d: { bln1: '2027-01', tgl1: 1, bln2: '2027-06', tgl2: 30 }, c: 'Hitung hari kerja antara dua tanggal' })}`,
    },
    en: {
      slug: 'working-days-2027', nav: 'Working days 2027', card: `${hkTot} working days, month by month`,
      title: 'Working days 2027 Indonesia: monthly count, 5 or 6-day week',
      description: `Working days in Indonesia in 2027 by month: ${hkTot} on a five-day week with collective leave, ${hkNoCb} without collective leave, ${hkSabtu} on a six-day week, per the decree.`,
      h1: 'Indonesia working days 2027 by month',
      intro: 'Choose your work pattern: the tool counts the working days of 2027 month by month, minus national holidays and, where it applies, collective leave.',
      resume: `2027 has ${kotor} Mondays to Fridays. After subtracting national holidays on weekdays and the ${CB} collective leave days, ${hkTot} working days remain for staff on a five-day week. If the employer does not apply collective leave, the figure is ${hkNoCb}. Staff on a six-day week, Monday to Saturday, work ${hkSabtu} days. The month with the fewest working days is March, only ${hk27[2]}, because Nyepi, Eid al-Fitr, Good Friday and four collective leave days fall in it. May follows with ${hk27[4]}. The busiest months are April, July, September, November and December with 22 each. These figures are used for daily pay, meal allowances, production targets, contract deadlines or overtime. For two specific dates, use the working days calculator between two dates.`,
      faqs: [
        { q: 'How many working days are there in Indonesia in 2027?', a: `${hkTot} on a five-day week if collective leave is a day off, ${hkNoCb} if it is not, and ${hkSabtu} on a six-day week. The basis is ${kotor} Mondays to Fridays minus the national holidays and collective leave days that fall on working days.` },
        { q: 'Which month of 2027 has the fewest working days?', a: `March, with ${hk27[2]} on a five-day week with collective leave. The month contains Nyepi, two days of Eid al-Fitr, Good Friday and four collective leave days, making it the month with the fewest working days of the year. Without collective leave the figure is ${K.hariKerja(2027, { cb: false })[2]}.` },
        { q: 'Are working days used to compute daily pay?', a: 'Often, but not always. Wage regulations distinguish five-day and six-day weeks, and many employers use a fixed monthly divisor. Check your employment contract. This tool gives the actual number of working days per month, which you can use as a basis.' },
      ],
      body: (h) => `<h2>Working days 2027 for three work patterns</h2>
<p>The table counts each month in three ways: five days with collective leave off, five days without collective leave, and six days. National holidays come from the ${h.src('skb-2027', '2027 joint decree')}.</p>
${tabelHariKerja(h, 2027)}
<h2>Why March and May 2027 are so short</h2>
<p>Eid al-Fitr 2027 falls on Wednesday 10 March, two days after Nyepi. With three Eid collective leave days and the collective leave before Good Friday on 26 March, the month loses eight working days. May loses five: Ascension Day, Eid al-Adha, Vesak and two collective leave days, while Labour Day falls on a Saturday and costs a five-day worker nothing.</p>
<p>For six-day workers, Saturday is a working day. The three 2027 national holidays that fall on a Saturday, Chinese New Year, Labour Day and Christmas, reduce their working days but not those of five-day workers.</p>
<h2>Working days and annual leave</h2>
<p>Annual leave is counted in working days: at least ${MIN} after twelve months of service, under ${h.src('uu-6-2023', 'Law 6 of 2023')}. With ${CB} collective leave days deducted, a worker on the minimum keeps ${MIN - CB} days to plan. To count working days between two specific dates, use the ${h.a('hitung-hari-kerja', 'working days calculator')}.</p>
${h.mini('hh', { p: ['bln1', 'tgl1', 'bln2', 'tgl2'], d: { bln1: '2027-01', tgl1: 1, bln2: '2027-06', tgl2: 30 }, c: 'Count working days between two dates' })}`,
    },
  }),
  defineGuide({
    id: 'hitung-mundur-lebaran', group: 'alat', order: 3, tool: 'mundur', toolArg: { hari: 'idul-fitri' },
    countdown: { date: lebaran, label: { id: 'Menuju Idul Fitri 1448 H', en: 'Until Eid al-Fitr 1448' } },
    related: ['lebaran-2027', 'puasa-2027', 'idul-adha-2027', 'natal-2026'],
    sources: ['skb-2027', 'setkab-isbat'],
    idn: {
      slug: 'hitung-mundur-lebaran', nav: 'Hitung mundur Lebaran', card: 'Berapa hari lagi Lebaran, puasa dan Natal',
      title: 'Berapa hari lagi Lebaran 2027? Hitung mundur waktu WIB',
      description: 'Berapa hari lagi Lebaran 2027: hitung mundur langsung sampai Idul Fitri 1448 H pada 10 Maret 2027 pukul 00.00 WIB, ditambah puasa, Idul Adha, Natal dan Imlek.',
      h1: 'Berapa hari lagi Lebaran? Hitung mundur Idul Fitri 2027',
      intro: 'Hitung mundur berjalan detik demi detik sampai pukul 00.00 WIB pada hari raya. Pilih hari raya lain untuk melihat sisa waktunya.',
      resume: `Idul Fitri 1448 H ditetapkan dalam SKB 2027 pada ${I(lebaran)}. Dari tanggal pembaruan halaman ini, 28 Oktober 2026, jaraknya ${hariKe(lebaran)} hari. Awal puasa Ramadan diperkirakan ${I(puasa)}, ${hariKe(puasa)} hari dari tanggal yang sama, tetapi tanggal itu belum resmi: Menteri Agama menetapkannya setelah sidang isbat pada petang 29 Syakban. Hitung mundur di atas memakai jam perangkat Anda dan menghitung sampai pukul 00.00 Waktu Indonesia Barat, sehingga angka yang Anda lihat selalu terbaru. Pengguna di WITA dan WIT akan mencapai nol satu atau dua jam lebih awal menurut jam setempat mereka. Daftar di bawah hitung mundur menampilkan setiap hari raya berikutnya: puasa, Idul Fitri, Idul Adha, Natal, Tahun Baru, Imlek, Nyepi, Paskah, Waisak, Tahun Baru Islam, Maulid dan Hari Kemerdekaan, masing-masing dengan status resmi, dihitung atau perkiraan.`,
      faqs: [
        { q: 'Berapa hari lagi menuju Lebaran 2027?', a: `Dihitung dari 28 Oktober 2026, ${hariKe(lebaran)} hari menuju Idul Fitri pada ${I(lebaran)}. Hitung mundur di halaman ini menampilkan hari, jam, menit dan detik yang tersisa saat Anda membukanya, sampai pukul 00.00 WIB pada hari raya. Bila SKB berubah, tanggal sasaran hitung mundur ikut diperbarui.` },
        { q: 'Mengapa hitung mundur memakai waktu WIB?', a: 'Karena tanggal libur berlaku secara nasional dan sebagian besar penduduk tinggal di zona WIB. Hari raya dimulai pukul 00.00 di masing-masing zona; di Makassar atau Bali hari itu dimulai satu jam lebih awal dari Jakarta, dan di Jayapura dua jam lebih awal, menurut waktu universal.' },
        { q: 'Apakah tanggal Lebaran 2027 bisa berubah?', a: 'Tanggal di SKB adalah ketetapan awal. Tanggal pasti 1 Syawal 1448 H diumumkan Menteri Agama setelah sidang isbat pada 29 Ramadan. Untuk 2027, perhitungan astronomi menunjukkan bulan masih terlalu rendah pada petang 8 Maret, sehingga 10 Maret sejalan dengan kriteria yang dipakai pemerintah.' },
      ],
      body: (h) => `<h2>Hari raya berikutnya</h2>
<p>Tabel ini memakai tanggal resmi dari ${h.src('skb-2027', 'SKB 2027')} bila ada, tanggal yang dihitung untuk hari raya tetap dan Paskah, dan perkiraan untuk awal puasa. Angka “hari lagi” dihitung dari tanggal pembaruan halaman; hitung mundur di atas memakai waktu Anda saat ini.</p>
${h.table(['Hari raya', 'Tanggal', 'Hari lagi dari 28 Okt 2026'], (['natal', 'tahun-baru', 'imlek', 'puasa', 'nyepi', 'idul-fitri', 'paskah', 'idul-adha', 'waisak', 'muharam', 'kemerdekaan'] as const).map((r) => { const y = r === 'natal' ? 2026: 2027; const x = K.raya(r, y)!; return [r === 'puasa' ? 'Awal puasa Ramadan (perkiraan)' : K.NAMA[r].id, h.wday(x.date), hariKe(x.date)]; }), 'Hari raya sampai pertengahan 2027', ['l', 'l', 'r'])}
<h2>Bagaimana tanggal Lebaran ditetapkan</h2>
<p>Kalender Hijriah mengikuti bulan. Bulan Syawal dimulai saat hilal, bulan sabit pertama, terlihat setelah matahari terbenam. Pemerintah memadukan hisab, perhitungan astronomi, dan rukyat, pengamatan di puluhan titik, dalam sidang isbat yang dipimpin Menteri Agama. Penetapannya diumumkan pada malam yang sama, seperti ${h.src('setkab-isbat', 'penetapan Idul Fitri 1446 H')}. SKB yang terbit setahun sebelumnya sudah memuat tanggal hasil hisab, dan biasanya tanggal itu tidak berubah.</p>
<p>Ijtimak, saat bulan baru, terjadi pada ${h.wday('2027-03-08')} sore. Saat matahari terbenam hari itu umur bulan baru sekitar satu setengah jam, terlalu rendah untuk dilihat. Karena itu Ramadan 1448 H digenapkan tiga puluh hari dan 1 Syawal jatuh pada ${h.wday(lebaran)}. Rinciannya ada di ${h.a('lebaran-2027', 'Lebaran 2027')} dan ${h.a('puasa-2027', 'awal puasa 2027')}.</p>
${h.mini('hr', { p: ['hari'], d: { hari: 'idul-adha', tahun: 2027 }, c: 'Lihat tanggal hari raya lain' })}`,
    },
    en: {
      slug: 'eid-countdown', nav: 'Eid countdown', card: 'Days until Eid, Ramadan and Christmas',
      title: 'Eid al-Fitr 2027 countdown Indonesia: days left, WIB time',
      description: 'Eid al-Fitr 2027 countdown for Indonesia: live days, hours and minutes to 1 Shawwal 1448 on 10 March 2027 at 00:00 WIB, plus Ramadan, Christmas and more.',
      h1: 'Eid al-Fitr 2027 countdown: how many days left',
      intro: 'The countdown runs second by second to 00:00 Western Indonesia Time on the holiday. Pick another festival to see the time left to it.',
      resume: `Eid al-Fitr 1448 is set by the 2027 joint decree for ${E(lebaran)}. From this page's update date, 28 October 2026, that is ${hariKe(lebaran)} days away. The start of Ramadan is expected on ${E(puasa)}, ${hariKe(puasa)} days from the same date, but that date is not official: the Minister of Religious Affairs sets it after the isbat session on the evening of 29 Sha'ban. The countdown above uses your device clock and counts to 00:00 Western Indonesia Time (WIB), so the figure you see is always current. Users in Central and Eastern Indonesia Time reach zero one or two hours earlier on their local clocks. The list under the countdown shows every coming festival: Ramadan, Eid al-Fitr, Eid al-Adha, Christmas, New Year, Chinese New Year, Nyepi, Easter, Vesak, Islamic New Year, the Prophet's Birthday and Independence Day, each marked official, computed or estimated.`,
      faqs: [
        { q: 'How many days until Eid al-Fitr 2027 in Indonesia?', a: `Counted from 28 October 2026, ${hariKe(lebaran)} days until Eid al-Fitr on ${E(lebaran)}. The countdown on this page shows the days, hours, minutes and seconds left when you open it, up to 00:00 WIB on the day of the holiday.` },
        { q: 'Why does the countdown use WIB time?', a: 'Because holidays apply nationwide and most of the population lives in the WIB zone. A holiday starts at 00:00 in each zone; in Makassar or Bali it starts one hour before Jakarta, and in Jayapura two hours before, in universal time.' },
        { q: 'Can the date of Eid 2027 still change?', a: 'The decree date is the initial setting. The final date of 1 Shawwal 1448 is announced by the Minister of Religious Affairs after the isbat session on 29 Ramadan. For 2027, astronomy shows the moon still too low on the evening of 8 March, so 10 March fits the criteria the government uses.' },
      ],
      body: (h) => `<h2>Coming festivals</h2>
<p>This table uses the official dates of the ${h.src('skb-2027', '2027 joint decree')} where there are any, computed dates for fixed holidays and Easter, and an estimate for the start of Ramadan. The "days left" figure is counted from the page update date; the countdown above uses your current time.</p>
${h.table(['Festival', 'Date', 'Days from 28 Oct 2026'], (['natal', 'tahun-baru', 'imlek', 'puasa', 'nyepi', 'idul-fitri', 'paskah', 'idul-adha', 'waisak', 'muharam', 'kemerdekaan'] as const).map((r) => { const y = r === 'natal' ? 2026: 2027; const x = K.raya(r, y)!; return [r === 'puasa' ? 'First day of Ramadan (estimate)' : K.NAMA[r].en, h.wday(x.date), hariKe(x.date)]; }), 'Festivals up to mid-2027', ['l', 'l', 'r'])}
<h2>How the Eid date is set</h2>
<p>The Hijri calendar follows the moon. Shawwal begins when the hilal, the first crescent, is seen after sunset. The government combines hisab, astronomical computation, with rukyat, observation at dozens of sites, in an isbat session chaired by the Minister of Religious Affairs. The ruling is announced the same evening, as with the ${h.src('setkab-isbat', 'Eid al-Fitr 1446 ruling')}. The decree issued a year earlier already contains the computed date, and that date usually stands.</p>
<p>The conjunction, the new moon, occurs on the afternoon of ${h.wday('2027-03-08')}. At sunset that day the new moon is about an hour and a half old, too low to be seen. Ramadan 1448 is therefore completed at thirty days and 1 Shawwal falls on ${h.wday(lebaran)}. Details are on ${h.a('lebaran-2027', 'Eid 2027')} and ${h.a('puasa-2027', 'Ramadan 2027')}.</p>
${h.mini('hr', { p: ['hari'], d: { hari: 'idul-adha', tahun: 2027 }, c: 'See another festival date' })}`,
    },
  }),
  defineGuide({
    id: 'kalender-hijriah', group: 'alat', order: 4, tool: 'hj', toolArg: { bln: '2027-03', tgl: 10 },
    related: ['puasa-2027', 'lebaran-2027', 'tahun-baru-islam-2027', 'weton'],
    sources: ['ummulqura', 'skb-2027', 'nasa-fase-bulan'],
    idn: {
      slug: 'kalender-hijriah-2027', nav: 'Kalender Hijriah 2027', card: 'Konversi Masehi ke Hijriah, versi Indonesia',
      title: 'Kalender Hijriah 2027: konversi tanggal Masehi ke Hijriah',
      description: 'Kalender Hijriah 2027 versi Indonesia: ubah tanggal Masehi ke Hijriah, lihat awal setiap bulan 1448 dan 1449 H, dan mana yang resmi menurut SKB 2027 ini.',
      h1: 'Kalender Hijriah 2027 dan konversi tanggal',
      intro: 'Pilih bulan dan tanggal Masehi: alat menampilkan tanggal Hijriahnya, apakah awal bulan itu resmi menurut SKB atau perhitungan, dan pasaran Jawanya.',
      resume: `Tahun 2027 Masehi mencakup akhir tahun 1448 Hijriah dan sebagian besar tahun 1449. Tahun Baru Islam 1 Muharam 1449 jatuh pada ${I(K.awalBulan(1449, 1)!.date)}, menurut SKB 2027. Kalender Hijriah di Indonesia tidak sepenuhnya sama dengan kalender Umm al-Qura yang dipakai Arab Saudi: awal Ramadan, Syawal dan Zulhijah ditetapkan Menteri Agama setelah sidang isbat. Pada 2027 perbedaannya terlihat jelas. Umm al-Qura menempatkan 1 Syawal 1448 pada ${I('2027-03-09')}, sedangkan SKB menetapkan Idul Fitri pada ${I(lebaran)}. Konverter ini memakai tanggal yang tersirat dalam SKB untuk bulan-bulan yang memuat hari raya, dan perhitungan Umm al-Qura untuk bulan lainnya, ditandai dengan jelas. Tanggal Hijriah berganti saat matahari terbenam; tanggal yang ditampilkan adalah tanggal yang berlaku pada siang hari Masehi itu.`,
      faqs: [
        { q: 'Tanggal berapa 1 Muharam 1449 H?', a: `Menurut SKB 2027, 1 Muharam 1449 H jatuh pada ${I(K.awalBulan(1449, 1)!.date)} dan merupakan libur nasional. Karena jatuh pada hari Minggu, libur itu tidak menambah hari libur bagi pekerja lima hari. Tahun Baru Islam berikutnya, 1450 H, diperkirakan jatuh sekitar 25 Mei 2028.` },
        { q: 'Mengapa tanggal Hijriah Indonesia bisa berbeda dengan Arab Saudi?', a: 'Arab Saudi memakai kalender Umm al-Qura yang dihitung lebih dulu. Indonesia menetapkan awal bulan penting melalui sidang isbat dengan kriteria visibilitas hilal yang disepakati negara-negara MABIMS. Kedua cara bisa menghasilkan selisih satu hari, seperti pada Idul Fitri 1448 H. Konverter ini menandai tanggal hasil perhitungan.' },
        { q: 'Kapan tanggal Hijriah berganti dalam sehari?', a: 'Dalam penanggalan Islam, hari baru dimulai saat matahari terbenam, bukan tengah malam. Malam takbiran sebelum Idul Fitri, misalnya, sudah termasuk 1 Syawal. Konverter ini menampilkan tanggal Hijriah yang berlaku pada siang hari dari tanggal Masehi yang Anda pilih. Karena itu salat tarawih pertama dilaksanakan pada malam sebelum puasa pertama.' },
      ],
      body: (h) => `<h2>Awal bulan Hijriah, akhir 1448 sampai 1449 H</h2>
<p>Bulan yang ditandai “tersirat dalam SKB” dihitung mundur dari tanggal hari raya di ${h.src('skb-2027', 'SKB 2027')} : 27 Rajab untuk Isra Mikraj, 1 Syawal, 10 Zulhijah, 1 Muharam dan 12 Rabiulawal. Bulan lain mengikuti kalender ${h.src('ummulqura', 'Umm al-Qura')}.</p>
${h.table(['Awal bulan', 'Tanggal Masehi', 'Panjang (hari)', 'Dasar'], tabelAwal('id'), 'Awal bulan Hijriah versi Indonesia', ['l', 'l', 'r', 'l'])}
<h2>Hisab, rukyat dan ijtimak</h2>
<p>Bulan Hijriah berumur 29 atau 30 hari. Panjangnya bergantung pada kapan hilal dapat dilihat setelah ijtimak, saat bulan berada di antara bumi dan matahari. Kami menghitung waktu ijtimak dengan rumus Jean Meeus, yang selisihnya dengan ${h.src('nasa-fase-bulan', 'tabel fase bulan NASA')} hanya beberapa menit. Ijtimak menjelang Ramadan 1448 H terjadi pada 6 Februari 2027 malam waktu Indonesia; menjelang Syawal pada 8 Maret sore.</p>
<p>Tanggal Hijriah juga dapat ditampilkan di setiap hari pada ${h.a('home', 'kalender 2027')}, dan pasaran Jawa dihitung di ${h.a('weton', 'kalkulator weton')}.</p>
${h.mini('ij', { p: ['bulan'], d: { bulan: '1448-9' }, c: 'Lihat ijtimak dan awal bulan' })}`,
    },
    en: {
      slug: 'hijri-calendar-2027', nav: 'Hijri calendar 2027', card: 'Gregorian to Hijri, the Indonesian way',
      title: 'Hijri calendar 2027 Indonesia: Gregorian to Hijri converter',
      description: 'Hijri calendar 2027 as used in Indonesia: convert Gregorian dates to Hijri, see when each month of 1448 and 1449 AH begins, and which starts are official.',
      h1: 'Hijri calendar 2027 and date converter',
      intro: 'Pick a Gregorian month and day: the tool shows the Hijri date, whether that month start is official under the decree or computed, and the Javanese pasaran.',
      resume: `The Gregorian year 2027 covers the end of the Hijri year 1448 and most of 1449. The Islamic New Year, 1 Muharram 1449, falls on ${E(K.awalBulan(1449, 1)!.date)} under the 2027 decree. The Hijri calendar in Indonesia is not quite the same as the Umm al-Qura calendar used in Saudi Arabia: the start of Ramadan, Shawwal and Dhu al-Hijjah is set by the Minister of Religious Affairs after the isbat session. In 2027 the difference is plain to see. Umm al-Qura puts 1 Shawwal 1448 on ${E('2027-03-09')}, while the decree sets Eid al-Fitr on ${E(lebaran)}. This converter uses the dates implied by the decree for months that contain a holiday, and the Umm al-Qura computation for the others, clearly marked. A Hijri date changes at sunset; the date shown is the one in force during the daytime of that Gregorian day.`,
      faqs: [
        { q: 'When is 1 Muharram 1449 AH in Indonesia?', a: `Under the 2027 decree, 1 Muharram 1449 falls on ${E(K.awalBulan(1449, 1)!.date)} and is a national holiday. Because it falls on a Sunday, it adds no day off for five-day workers. The next Islamic New Year, 1450, is expected around 25 May 2028.` },
        { q: 'Why can Indonesian Hijri dates differ from Saudi Arabia?', a: 'Saudi Arabia uses the precomputed Umm al-Qura calendar. Indonesia sets the key month starts through the isbat session, using crescent visibility criteria agreed by the MABIMS countries. The two methods can be one day apart, as with Eid al-Fitr 1448.' },
        { q: 'When does the Hijri date change during the day?', a: 'In the Islamic calendar a new day begins at sunset, not midnight. The takbiran evening before Eid, for example, already belongs to 1 Shawwal. This converter shows the Hijri date that applies during the daytime of the Gregorian date you choose.' },
      ],
      body: (h) => `<h2>Hijri month starts, late 1448 to 1449 AH</h2>
<p>Months marked "implied by the decree" are counted back from the holiday dates in the ${h.src('skb-2027', '2027 joint decree')}: 27 Rajab for Isra Mi'raj, 1 Shawwal, 10 Dhu al-Hijjah, 1 Muharram and 12 Rabi' al-Awwal. Other months follow the ${h.src('ummulqura', 'Umm al-Qura')} calendar.</p>
${h.table(['Month start', 'Gregorian date', 'Length (days)', 'Basis'], tabelAwal('en'), 'Hijri month starts, Indonesian version', ['l', 'l', 'r', 'l'])}
<h2>Hisab, rukyat and the conjunction</h2>
<p>A Hijri month has 29 or 30 days. Its length depends on when the crescent can be seen after the conjunction, when the moon passes between the earth and the sun. We compute the conjunction with Jean Meeus's formula, which differs from ${h.src('nasa-fase-bulan', "NASA's moon phase tables")} by only a few minutes. The conjunction before Ramadan 1448 occurs on the night of 6 February 2027, Indonesian time; before Shawwal, on the afternoon of 8 March.</p>
<p>Hijri dates can also be shown under each day of the ${h.a('home', '2027 calendar')}, and the Javanese pasaran is worked out in the ${h.a('weton', 'weton calculator')}.</p>
${h.mini('ij', { p: ['bulan'], d: { bulan: '1448-9' }, c: 'See the conjunction and month start' })}`,
    },
  }),
  defineGuide({
    id: 'weton', group: 'alat', order: 5, tool: 'wt', toolArg: { tgl: 17, bln: 8, thn: 1995 },
    related: ['kalender-hijriah', 'kalender-cetak', 'hut-ri-2027', 'home'],
    sources: ['ummulqura', 'skb-2027'],
    idn: {
      slug: 'weton', nav: 'Kalkulator weton', card: 'Hari, pasaran dan neptu dari tanggal lahir',
      title: 'Weton dan neptu: hitung pasaran Jawa dari tanggal lahir',
      description: 'Kalkulator weton: masukkan tanggal lahir dan lihat hari, pasaran Jawa (Legi, Pahing, Pon, Wage, Kliwon), jumlah neptu, dan kapan weton yang sama datang lagi.',
      h1: 'Kalkulator weton: hari, pasaran dan neptu',
      intro: 'Masukkan tanggal, bulan dan tahun lahir: alat menghitung weton Anda, nilai neptunya, dan tanggal-tanggal berikutnya dengan weton yang sama.',
      resume: `Weton adalah gabungan hari dalam seminggu dan pasaran dalam siklus lima hari Jawa: Legi, Pahing, Pon, Wage dan Kliwon. Karena tujuh dan lima tidak punya faktor bersama, kombinasi yang sama berulang setiap ${7 * 5} hari. Hari Proklamasi, 17 Agustus 1945, jatuh pada ${w45.hari} ${w45.pasaran}, dan siklus pasaran tidak pernah terputus sejak itu, sehingga setiap tanggal dapat dihitung mundur atau maju dengan pasti. Neptu adalah nilai angka yang diberikan tradisi primbon kepada hari dan pasaran: Minggu 5, Senin 4, Selasa 3, Rabu 7, Kamis 8, Jumat 6, Sabtu 9; Legi 5, Pahing 9, Pon 7, Wage 4, Kliwon 8. Jumlahnya berkisar dari 7 sampai 18. Sebagai contoh, Idul Fitri 2027 jatuh pada ${wLeb.hari} ${wLeb.pasaran} dengan neptu ${wLeb.neptu}, dan hari pembaruan halaman ini, 28 Oktober 2026, adalah ${wNow.hari} ${wNow.pasaran}. Perhitungan weton di sini bersifat kalender; tafsir primbon atas neptu berada di luar cakupan situs ini.`,
      faqs: [
        { q: 'Bagaimana cara menghitung weton dari tanggal lahir?', a: 'Tentukan hari dalam seminggu, lalu pasarannya dengan menghitung selisih hari dari tanggal acuan yang pasarannya diketahui, dibagi lima. Sisa pembagian menunjukkan pasaran. Kalkulator ini memakai acuan 17 Agustus 1945, Jumat Legi, dan menghitung untuk tanggal apa pun dari tahun 1900 sampai 2030.' },
        { q: 'Berapa neptu tertinggi dan terendah?', a: 'Neptu tertinggi adalah 18, untuk Sabtu Pahing (9 ditambah 9). Neptu terendah adalah 7, untuk Selasa Wage (3 ditambah 4). Nilai ini mengikuti tabel neptu primbon yang paling umum; beberapa daerah memakai variasi kecil, terutama untuk penafsirannya. Kalkulator weton di halaman ini menampilkan neptu Anda.' },
        { q: 'Kapan weton saya datang lagi?', a: 'Setiap 35 hari, karena tujuh hari dan lima pasaran baru kembali ke pasangan yang sama setelah 35 hari. Kalkulator menampilkan tanggal weton berikutnya dihitung dari hari ini. Dalam setahun, satu weton muncul sepuluh atau sebelas kali. Weton berikutnya selalu jatuh pada hari dan pasaran yang sama.' },
      ],
      body: (h) => `<h2>Tabel neptu hari dan pasaran</h2>
${h.table(['Hari', 'Neptu'], neptuTabel('id'), 'Neptu hari', ['l', 'r'])}
${h.table(['Pasaran', 'Neptu'], pasTabel(), 'Neptu pasaran', ['l', 'r'])}
<p>Neptu weton adalah jumlah keduanya. Tabel ini dipakai dalam primbon untuk berbagai keperluan, dari memilih tanggal pernikahan sampai pindah rumah. Situs ini hanya menghitung; kami tidak memberi tafsir.</p>
<h2>Mengapa pasaran tidak pernah salah hitung</h2>
<p>Kalender Jawa menjalankan beberapa siklus sekaligus. Siklus lima hari pasaran adalah yang paling tua dan masih dipakai di pasar tradisional yang buka pada hari pasaran tertentu. Karena siklus itu tidak pernah disisipi atau dilompati, cukup satu tanggal acuan untuk menghitung semua tanggal lain. Kami memakai 17 Agustus 1945, ${w45.hari} ${w45.pasaran}, yang tercatat luas dalam sejarah.</p>
<p>Weton juga bisa dilihat untuk seluruh tahun: pilih “pasaran Jawa” pada ${h.a('kalender-cetak', 'kalender cetak 2027')} atau pada ${h.a('home', 'kalender di beranda')}. Untuk tanggal Hijriah, gunakan ${h.a('kalender-hijriah', 'konverter Hijriah')}.</p>
${h.mini('hj', { p: ['bln', 'tgl'], d: { bln: '2027-03', tgl: 10 }, c: 'Ubah tanggal ke Hijriah' })}`,
    },
    en: {
      slug: 'weton-calculator', nav: 'Weton calculator', card: 'Weekday, pasaran and neptu from a birth date',
      title: 'Weton calculator: Javanese pasaran and neptu from birth date',
      description: 'Weton calculator: enter a date of birth and see the weekday, Javanese pasaran (Legi, Pahing, Pon, Wage, Kliwon), the neptu total and the next date with it.',
      h1: 'Weton calculator: weekday, pasaran and neptu',
      intro: 'Enter the day, month and year of birth: the tool works out the weton, its neptu value, and the next dates with the same weton.',
      resume: `A weton combines the day of the week with the pasaran of the Javanese five-day cycle: Legi, Pahing, Pon, Wage and Kliwon. Since seven and five share no factor, the same pairing comes back every ${7 * 5} days. Proclamation Day, 17 August 1945, fell on ${w45.hari} ${w45.pasaran}, and the pasaran cycle has never been interrupted since, so any date can be counted back or forward with certainty. Neptu is the number that primbon tradition assigns to each weekday and pasaran: Sunday 5, Monday 4, Tuesday 3, Wednesday 7, Thursday 8, Friday 6, Saturday 9; Legi 5, Pahing 9, Pon 7, Wage 4, Kliwon 8. Totals range from 7 to 18. For example, Eid al-Fitr 2027 falls on ${wLeb.hari} ${wLeb.pasaran}, neptu ${wLeb.neptu}, and this page's update date, 28 October 2026, is ${wNow.hari} ${wNow.pasaran}. The weton computation here is a calendar matter; primbon readings of neptu are outside the scope of this site.`,
      faqs: [
        { q: 'How do you work out a weton from a date of birth?', a: 'Find the day of the week, then the pasaran by counting the days from a reference date whose pasaran is known and dividing by five. The remainder gives the pasaran. This calculator uses 17 August 1945, a Friday Legi, as reference and works for any date from 1900 to 2030.' },
        { q: 'What are the highest and lowest neptu values?', a: 'The highest neptu is 18, for Saturday Pahing (9 plus 9). The lowest is 7, for Tuesday Wage (3 plus 4). These values follow the most common primbon neptu table; some regions use small variations, mainly in how the totals are read.' },
        { q: 'When does my weton come round again?', a: 'Every 35 days, because seven weekdays and five pasaran only return to the same pair after 35 days. The calculator shows the next date with your weton counted from today. In a year, a given weton occurs ten or eleven times.' },
      ],
      body: (h) => `<h2>Neptu of weekdays and pasaran</h2>
${h.table(['Weekday', 'Neptu'], neptuTabel('en'), 'Weekday neptu (Indonesian names)', ['l', 'r'])}
${h.table(['Pasaran', 'Neptu'], pasTabel(), 'Pasaran neptu', ['l', 'r'])}
<p>A weton's neptu is the sum of the two. Primbon uses these tables for many purposes, from choosing a wedding date to moving house. This site only computes; we offer no readings.</p>
<h2>Why the pasaran is never miscounted</h2>
<p>The Javanese calendar runs several cycles at once. The five-day pasaran is the oldest and is still used by traditional markets that open on particular market days. Because the cycle has never had days inserted or skipped, a single reference date is enough to compute every other date. We use 17 August 1945, ${w45.hari} ${w45.pasaran}, which is widely recorded in history.</p>
<p>Weton can also be shown for a whole year: choose "Javanese pasaran" on the ${h.a('kalender-cetak', 'printable 2027 calendar')} or on the ${h.a('home', 'home page calendar')}. For Hijri dates, use the ${h.a('kalender-hijriah', 'Hijri converter')}.</p>
${h.mini('hj', { p: ['bln', 'tgl'], d: { bln: '2027-03', tgl: 10 }, c: 'Convert a date to Hijri' })}`,
    },
  }),
  defineGuide({
    id: 'hitung-hari-kerja', group: 'alat', order: 6, tool: 'hh', toolArg: { bln1: '2027-03', tgl1: 1, bln2: '2027-03', tgl2: 31 },
    related: ['hari-kerja-2027', 'sisa-cuti-tahunan', 'libur-nasional-2027', 'long-weekend-2027'],
    sources: ['skb-2027', 'skb-2026'],
    idn: {
      slug: 'hitung-hari-kerja', nav: 'Hitung hari kerja', card: 'Hari kerja antara dua tanggal, dan tenggat',
      title: 'Hitung hari kerja antara dua tanggal, libur SKB dikurangi',
      description: 'Hitung hari kerja antara dua tanggal, dikurangi akhir pekan, libur nasional dan cuti bersama SKB 2026 dan 2027, atau tambahkan hari kerja ke satu tanggal.',
      h1: 'Hitung hari kerja antara dua tanggal',
      intro: 'Pilih tanggal mulai dan tanggal selesai: alat menghitung hari kerja, hari libur dan akhir pekan di antaranya, atau tanggal jatuh tempo setelah sejumlah hari kerja.',
      resume: `Banyak tenggat di Indonesia dihitung dalam hari kerja: jangka waktu pembayaran, pengiriman dokumen, masa sanggah tender, atau masa percobaan. Menghitungnya dengan tangan mudah salah karena libur nasional dan cuti bersama tidak jatuh pada tanggal yang sama setiap tahun. Kalkulator ini memakai daftar resmi SKB 2026 dan 2027. Contohnya, Maret 2027 penuh punya ${hh1.kalender} hari kalender, tetapi hanya ${hh1.kerja} hari kerja: ${hh1.akhirPekan} hari akhir pekan dan ${hh1.libur} hari libur atau cuti bersama pada hari kerja. Semester pertama 2027, 1 Januari sampai 30 Juni, punya ${hh2.kerja} hari kerja. Tenggat empat belas hari kerja yang dimulai Jumat 5 Maret 2027 tidak jatuh pada 25 Maret seperti di bulan biasa, melainkan pada ${I(plus14)}, karena libur Lebaran dan Paskah menyela. Tanggal mulai dan selesai ikut dihitung bila keduanya hari kerja.`,
      faqs: [
        { q: 'Apakah tanggal mulai ikut dihitung sebagai hari kerja?', a: 'Dalam hitungan antara dua tanggal, ya: tanggal mulai dan tanggal selesai sama-sama dihitung bila keduanya hari kerja. Untuk menambah hari kerja ke satu tanggal, tanggal mulai tidak dihitung, seperti kebiasaan menghitung tenggat. Bila perjanjian Anda memakai cara lain, sesuaikan tanggal mulainya.' },
        { q: 'Berapa hari kerja di semester pertama 2027?', a: `${hh2.kerja} hari kerja dari 1 Januari sampai 30 Juni 2027 untuk pola lima hari dengan cuti bersama sebagai libur. Semester itu memuat sebagian besar libur tahun 2027, termasuk Lebaran, Paskah, Idul Adha dan Waisak, sehingga lebih pendek dari semester kedua.` },
        { q: 'Apakah kalkulator ini menghitung libur daerah?', a: 'Tidak. Hanya libur nasional dan cuti bersama menurut SKB yang dihitung. Libur daerah, misalnya hari jadi kota atau libur khusus provinsi, dan hari pemungutan suara yang ditetapkan tersendiri tidak termasuk. Kurangi sendiri hari-hari itu bila berlaku di tempat Anda. Hasil alat ini berlaku sama untuk seluruh provinsi.' },
      ],
      body: (h) => `<h2>Contoh hitungan 2027</h2>
${h.table(['Periode', 'Hari kalender', 'Hari kerja', 'Akhir pekan', 'Libur dan cuti bersama'], [['Maret 2027', hh1.kalender, hh1.kerja, hh1.akhirPekan, hh1.libur], ['Januari–Juni 2027', hh2.kalender, hh2.kerja, hh2.akhirPekan, hh2.libur], ['Juli–Desember 2027', ...(() => { const x = K.hariKerjaAntara('2027-07-01', '2027-12-31'); return [x.kalender, x.kerja, x.akhirPekan, x.libur]; })()]], 'Hari kerja per periode (5 hari, cuti bersama libur)', ['l', 'r', 'r', 'r', 'r'])}
<h2>Menghitung tenggat dalam hari kerja</h2>
<p>Pilih “tambah hari kerja” di bagian detail lain, lalu masukkan jumlah hari. Alat melompati akhir pekan, libur nasional dan, bila dipilih, cuti bersama, dan menampilkan tanggal jatuh temponya. Pada contoh 5 Maret 2027, empat belas hari kerja berakhir pada ${h.wday(plus14)}, bukan sekitar 25 Maret, karena pekan Lebaran dan Jumat Agung tidak dihitung.</p>
<p>Dasar hitungan adalah ${h.src('skb-2027', 'SKB 2027')} dan ${h.src('skb-2026', 'SKB 2026')}. Untuk tanggal setelah 2027, hanya libur tetap yang diketahui sebelum SKB berikutnya terbit, sehingga kalkulator ini dibatasi pada 2026 dan 2027.</p>
<p>Jumlah hari kerja per bulan untuk satu tahun penuh ada di ${h.a('hari-kerja-2027', 'hari kerja 2027')}.</p>
${h.mini('hk', { p: ['tahun'], d: { tahun: 2027 }, c: 'Lihat hari kerja per bulan' })}`,
    },
    en: {
      slug: 'working-days-calculator', nav: 'Working days calculator', card: 'Working days between two dates, and deadlines',
      title: 'Working days calculator Indonesia: between two dates',
      description: 'Count working days between two dates in Indonesia, minus weekends, national holidays and 2026–2027 collective leave, or add a number of working days to a date.',
      h1: 'Working days between two dates in Indonesia',
      intro: 'Pick a start and an end date: the tool counts the working days, holidays and weekend days between them, or the due date after a number of working days.',
      resume: `Many deadlines in Indonesia are counted in working days: payment terms, document submissions, tender objection periods or probation. Counting by hand is error-prone because national holidays and collective leave do not fall on the same dates each year. This calculator uses the official 2026 and 2027 decree lists. For example, the whole of March 2027 has ${hh1.kalender} calendar days but only ${hh1.kerja} working days: ${hh1.akhirPekan} weekend days and ${hh1.libur} holidays or collective leave days on weekdays. The first half of 2027, 1 January to 30 June, has ${hh2.kerja} working days. A fourteen-working-day deadline starting on Friday 5 March 2027 does not end on 25 March as in an ordinary month, but on ${E(plus14)}, because the Eid and Easter breaks get in the way. Start and end dates both count when they are working days.`,
      faqs: [
        { q: 'Does the start date count as a working day?', a: 'For a count between two dates, yes: the start and end dates both count when they are working days. When adding working days to a date, the start date is not counted, as is usual for deadlines. If your agreement counts differently, adjust the start date accordingly.' },
        { q: 'How many working days are in the first half of 2027?', a: `${hh2.kerja} working days from 1 January to 30 June 2027 on a five-day week with collective leave off. That half contains most of the 2027 holidays, including Eid al-Fitr, Easter, Eid al-Adha and Vesak, so it is shorter than the second half.` },
        { q: 'Does the calculator include regional holidays?', a: 'No. Only national holidays and collective leave under the joint decree are counted. Regional holidays, such as a city anniversary or a provincial holiday, and separately declared election days are not included. Subtract those days yourself if they apply where you work.' },
      ],
      body: (h) => `<h2>Sample counts for 2027</h2>
${h.table(['Period', 'Calendar days', 'Working days', 'Weekend days', 'Holidays and leave'], [['March 2027', hh1.kalender, hh1.kerja, hh1.akhirPekan, hh1.libur], ['January–June 2027', hh2.kalender, hh2.kerja, hh2.akhirPekan, hh2.libur], ['July–December 2027', ...(() => { const x = K.hariKerjaAntara('2027-07-01', '2027-12-31'); return [x.kalender, x.kerja, x.akhirPekan, x.libur]; })()]], 'Working days per period (five-day week, collective leave off)', ['l', 'r', 'r', 'r', 'r'])}
<h2>Counting a deadline in working days</h2>
<p>Choose "add working days" under more details and enter the number of days. The tool skips weekends, national holidays and, if chosen, collective leave, and shows the due date. In the 5 March 2027 example, fourteen working days end on ${h.wday(plus14)}, not around 25 March, because Eid week and Good Friday do not count.</p>
<p>The counts rest on the ${h.src('skb-2027', '2027 decree')} and the ${h.src('skb-2026', '2026 decree')}. For dates after 2027, only fixed holidays are known before the next decree is published, so this calculator is limited to 2026 and 2027.</p>
<p>The number of working days per month for a full year is on ${h.a('hari-kerja-2027', 'working days 2027')}.</p>
${h.mini('hk', { p: ['tahun'], d: { tahun: 2027 }, c: 'See working days per month' })}`,
    },
  }),
  defineGuide({
    id: 'sisa-cuti-tahunan', group: 'alat', order: 7, tool: 'ct', toolArg: { tahun: 2027 },
    related: ['cuti-bersama-2027', 'long-weekend-2027', 'hari-kerja-2027', 'cuti-bersama-2026'],
    sources: ['uu-6-2023', 'skb-2027'],
    idn: {
      slug: 'sisa-cuti-tahunan', nav: 'Sisa cuti tahunan', card: 'Hak cuti dikurangi cuti bersama dan cuti Anda',
      title: 'Sisa cuti tahunan 2027: hak 12 hari dikurangi cuti bersama',
      description: 'Hitung sisa cuti tahunan 2027: hak minimal 12 hari menurut UU Ketenagakerjaan, dikurangi 8 cuti bersama SKB dan cuti yang Anda ambil, lalu rencanakan sisanya.',
      h1: 'Sisa cuti tahunan 2027',
      intro: 'Masukkan hak cuti, cuti yang sudah atau akan Anda ambil, dan apakah cuti bersama memotong hak Anda: alat menghitung berapa hari yang masih bisa direncanakan.',
      resume: `Pekerja yang sudah bekerja ${K.P.cuti_tahunan.setelah_bulan} bulan terus-menerus berhak atas cuti tahunan paling sedikit ${MIN} hari kerja, menurut Pasal 79 UU Ketenagakerjaan sebagaimana diubah UU Nomor 6 Tahun 2023. Perjanjian kerja, peraturan perusahaan atau perjanjian kerja bersama boleh memberi lebih, dan banyak perusahaan memberi 12 sampai 15 hari. SKB 2027 menetapkan ${CB} hari cuti bersama, dan Diktum KEEMPAT SKB menyatakan cuti bersama mengurangi hak cuti tahunan. Bila perusahaan Anda menerapkan semuanya, hak minimal ${MIN} hari tinggal ${MIN - CB} hari. Dari sisa itu, empat hari yang ditempatkan dengan tepat sudah memberi ${o4.libur} hari libur berturut-turut sepanjang 2027. Bila perusahaan tidak menerapkan cuti bersama dan Anda tetap bekerja, hak Anda utuh. Alat di atas menghitung kedua keadaan dan menunjukkan rencana terbaik untuk sisa cuti Anda.`,
      faqs: [
        { q: 'Berapa hak cuti tahunan menurut undang-undang?', a: `Paling sedikit ${MIN} hari kerja setelah pekerja bekerja ${K.P.cuti_tahunan.setelah_bulan} bulan secara terus-menerus, menurut Pasal 79 UU Ketenagakerjaan yang diubah UU 6/2023. Pelaksanaannya diatur dalam perjanjian kerja, peraturan perusahaan atau perjanjian kerja bersama, yang boleh memberi hak lebih banyak. Masukkan hak cuti Anda sendiri ke alat di halaman ini bila lebih dari 12 hari.` },
        { q: 'Apakah karyawan baru langsung mendapat cuti tahunan?', a: `Menurut undang-undang, hak cuti tahunan timbul setelah ${K.P.cuti_tahunan.setelah_bulan} bulan bekerja terus-menerus. Banyak perusahaan memberi cuti secara proporsional lebih awal, tetapi itu kebijakan perusahaan. Cuti bersama yang jatuh sebelum hak itu timbul biasanya diatur tersendiri dalam peraturan perusahaan. Periksa perjanjian kerja Anda untuk aturan yang berlaku.` },
        { q: 'Berapa sisa cuti bila perusahaan menerapkan semua cuti bersama 2027?', a: `Dengan hak ${MIN} hari, tersisa ${MIN - CB} hari setelah ${CB} hari cuti bersama 2027 dipotong. Dengan hak 15 hari, tersisa ${15 - CB} hari. Kurangi lagi cuti pribadi yang sudah atau akan Anda ambil untuk mengetahui berapa yang masih bisa direncanakan. Alat di halaman ini menghitungnya untuk berapa pun hak cuti Anda.` },
      ],
      body: (h) => `<h2>Sisa cuti untuk beberapa hak cuti</h2>
${h.table(['Hak cuti', 'Cuti bersama 2027', 'Sisa', 'Hari libur dengan sisa itu'], [12, 14, 15, 18, 20].map((x) => [x, CB, x - CB, K.optimalkan(2027, x - CB).libur]), 'Sisa cuti 2027 bila semua cuti bersama memotong hak (5 hari kerja)', ['r', 'r', 'r', 'r'])}
<p>Kolom terakhir menunjukkan berapa hari libur berturut-turut yang bisa dibentuk dengan sisa cuti, bila ditempatkan sesuai ${h.a('long-weekend-2027', 'perencana long weekend')}.</p>
<h2>Dasar hukum</h2>
<p>Hak cuti tahunan diatur dalam ${h.src('uu-6-2023', 'UU 6/2023')}, yang mengubah Pasal 79 UU Ketenagakerjaan. Cuti bersama diatur dalam ${h.src('skb-2027', 'SKB 2027')} : Diktum KEEMPAT menyebut bahwa cuti bersama mengurangi hak cuti tahunan, dan Diktum KEENAM menyerahkan pelaksanaannya di perusahaan swasta kepada pimpinan masing-masing. Pegawai yang tetap bekerja pada hari cuti bersama karena tugas tidak kehilangan hak cutinya untuk hari itu.</p>
<h2>Saran penggunaan</h2>
<p>Gunakan sisa cuti pada jembatan satu hari lebih dulu: Senin 4 Januari, Jumat 7 Mei, Jumat 21 Mei, Senin 31 Mei dan Senin 16 Agustus 2027. Lima hari cuti itu memberi ${K.optimalkan(2027, 5).libur} hari libur. Bila masih ada sisa, pekan setelah Lebaran memberi libur terpanjang tahun ini.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: MIN - CB }, c: 'Rencanakan sisa cuti Anda' })}`,
    },
    en: {
      slug: 'annual-leave-balance', nav: 'Annual leave balance', card: 'Entitlement minus collective leave and your own',
      title: 'Annual leave balance 2027 Indonesia: 12 days minus cuti',
      description: 'Your 2027 annual leave balance in Indonesia: the 12-day legal minimum, minus the 8 collective leave days and the leave you take, then plan what is left.',
      h1: 'Annual leave balance 2027',
      intro: 'Enter your entitlement, the leave you have taken or will take, and whether collective leave is deducted: the tool works out how many days you can still plan.',
      resume: `Workers with ${K.P.cuti_tahunan.setelah_bulan} months of continuous service are entitled to at least ${MIN} working days of annual leave, under Article 79 of the Manpower Act as amended by Law 6 of 2023. Employment contracts, company regulations or collective agreements may give more, and many employers give 12 to 15 days. The 2027 joint decree sets ${CB} collective leave days, and its fourth provision states that collective leave reduces annual leave. If your employer applies all of them, the minimum ${MIN} days fall to ${MIN - CB}. Of those, four well-placed days already give ${o4.libur} consecutive days off across 2027. If your employer does not apply collective leave and you work on those days, your entitlement stays whole. The tool above works out both cases and shows the best plan for your remaining leave.`,
      faqs: [
        { q: 'What is the statutory annual leave in Indonesia?', a: `At least ${MIN} working days after ${K.P.cuti_tahunan.setelah_bulan} months of continuous service, under Article 79 of the Manpower Act as amended by Law 6 of 2023. The details are set in the employment contract, company regulations or collective agreement, which may give more days.` },
        { q: 'Do new employees get annual leave straight away?', a: `Under the law, annual leave arises after ${K.P.cuti_tahunan.setelah_bulan} months of continuous service. Many employers grant leave pro rata earlier, but that is company policy. Collective leave that falls before the entitlement arises is usually handled separately in company regulations. Check your employment contract or company regulations for the exact rule.` },
        { q: 'How much leave is left if my employer applies all 2027 collective leave?', a: `With ${MIN} days, ${MIN - CB} remain after the ${CB} collective leave days of 2027. With 15 days, ${15 - CB} remain. Subtract any personal leave you have taken or will take to see how much you can still plan. The tool on this page does the subtraction for any entitlement.` },
      ],
      body: (h) => `<h2>Remaining leave for several entitlements</h2>
${h.table(['Entitlement', 'Collective leave 2027', 'Remaining', 'Days off with the rest'], [12, 14, 15, 18, 20].map((x) => [x, CB, x - CB, K.optimalkan(2027, x - CB).libur]), 'Remaining 2027 leave if all collective leave is deducted (five-day week)', ['r', 'r', 'r', 'r'])}
<p>The last column shows how many consecutive days off you can build with the remaining leave, placed as the ${h.a('long-weekend-2027', 'long weekend planner')} suggests.</p>
<h2>Legal basis</h2>
<p>Annual leave is governed by ${h.src('uu-6-2023', 'Law 6 of 2023')}, which amended Article 79 of the Manpower Act. Collective leave is governed by the ${h.src('skb-2027', '2027 joint decree')}: its fourth provision says collective leave reduces annual leave, and its sixth leaves its application in private companies to each employer. Staff who work on a collective leave day because of their duties keep that day of leave.</p>
<h2>How to use it</h2>
<p>Spend your remaining leave on one-day bridges first: Monday 4 January, Friday 7 May, Friday 21 May, Monday 31 May and Monday 16 August 2027. Those five leave days give ${K.optimalkan(2027, 5).libur} days off. If any remain, the week after Eid gives the longest break of the year.</p>
${h.mini('lw', { p: ['cuti'], d: { tahun: 2027, cuti: MIN - CB }, c: 'Plan your remaining leave' })}`,
    },
  }),
  defineGuide({
    id: 'kalender-cetak', group: 'alat', order: 8, tool: 'kalender', toolArg: { tahun: 2027, cetak: 1 },
    related: ['home', 'kalender-2026', 'weton', 'kalender-hijriah'],
    sources: ['skb-2027', 'ummulqura'],
    idn: {
      slug: 'kalender-2027-cetak', nav: 'Kalender 2027 untuk dicetak', card: 'Satu halaman, dua belas bulan, siap cetak',
      title: 'Kalender 2027 cetak: satu halaman A4, tanggal merah lengkap',
      description: 'Kalender 2027 untuk dicetak: dua belas bulan dalam satu halaman A4 dengan tanggal merah dan cuti bersama, pilihan Hijriah atau pasaran Jawa, gratis tanpa iklan.',
      h1: 'Kalender 2027 untuk dicetak',
      intro: 'Pilih tampilan, lalu tekan tombol cetak atau simpan sebagai PDF dari peramban: kalender 2027 muat dalam satu halaman A4.',
      resume: `Kalender cetak ini memuat dua belas bulan 2027 dalam satu halaman A4 tegak, dengan ${K.nasional(2027).length} libur nasional berwarna merah dan ${CB} cuti bersama berwarna abu-abu menurut SKB 2027. Minggu ditulis merah seperti kalender dinding di Indonesia, dan pekan dimulai dari Minggu. Anda dapat menambahkan tanggal Hijriah atau pasaran Jawa di bawah setiap tanggal sebelum mencetak. Daftar libur dengan nama dan tanggalnya dicetak di bawah kalender, sehingga satu lembar sudah cukup untuk ditempel di dinding kantor, ruang guru atau dapur. Tidak ada iklan, logo atau gambar yang menghabiskan tinta. Untuk menyimpan sebagai PDF, pilih “Simpan sebagai PDF” di jendela cetak peramban. Karena kalender dibuat dari daftar yang sama dengan seluruh situs, setiap SKB perubahan langsung terbawa ke versi cetak. Ukuran A4 tegak memberi hasil paling rapi.`,
      faqs: [
        { q: 'Bagaimana cara menyimpan kalender 2027 sebagai PDF?', a: 'Tekan tombol cetak di atas kalender, lalu pada jendela cetak pilih “Simpan sebagai PDF” atau “Microsoft Print to PDF” sebagai printer. Atur ukuran kertas A4 dan orientasi tegak. Di ponsel, pilih bagikan lalu cetak, kemudian simpan berkasnya. Hasilnya satu berkas yang bisa dikirim atau dicetak ulang kapan saja.' },
        { q: 'Apakah kalender cetak memuat cuti bersama?', a: `Ya. Cuti bersama ditandai abu-abu dan libur nasional merah, sama seperti kalender di layar. Daftar di bawah kalender menyebut setiap tanggal dan keterangannya, sehingga ${CB} hari cuti bersama 2027 dapat dibedakan dari libur nasional. Cetak berwarna agar perbedaan merah dan abu-abu tetap terlihat.` },
        { q: 'Bolehkah kalender ini dicetak untuk dibagikan?', a: 'Boleh, untuk kantor, sekolah, masjid, gereja atau komunitas Anda, tanpa biaya. Mohon jangan menghapus baris sumber di bagian bawah. Untuk memasang kalender di situs web, gunakan kode sematan di halaman pasang alat. Anda tidak perlu mendaftar atau meminta izin kami terlebih dahulu.' },
      ],
      body: (h) => `<h2>Tips mencetak</h2>
<p>Kertas A4 tegak dengan margin bawaan peramban sudah cukup. Bila tulisan terlalu kecil, cetak dua lembar: pilih tahun yang sama dua kali dan atur skala 140 persen, lalu cetak halaman satu dan dua. Kalender hitam putih tetap terbaca karena libur nasional dicetak tebal dan cuti bersama diberi bingkai.</p>
<h2>Isi kalender</h2>
<p>Tanggal merah dan cuti bersama berasal dari ${h.src('skb-2027', 'SKB 2027')}. Tanggal Hijriah mengikuti SKB untuk bulan-bulan hari raya dan kalender ${h.src('ummulqura', 'Umm al-Qura')} untuk bulan lainnya. Pasaran Jawa dihitung dari siklus lima hari yang tidak terputus, seperti dijelaskan di ${h.a('weton', 'kalkulator weton')}.</p>
${h.table(['Bulan', 'Libur nasional', 'Cuti bersama', 'Hari kerja'], ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((m, i) => [m, K.nasional(2027).filter((l) => Number(l.date.slice(5, 7)) === i + 1).length, K.cutiBersama(2027).filter((l) => Number(l.date.slice(5, 7)) === i + 1).length, hk27[i]]), 'Ringkasan bulan 2027', ['l', 'r', 'r', 'r'])}
<p>Kalender 2026 untuk sisa tahun ini ada di ${h.a('kalender-2026', 'kalender 2026')}.</p>
${h.mini('wt', { p: ['tgl', 'bln', 'thn'], c: 'Hitung weton tanggal lahir' })}`,
    },
    en: {
      slug: 'printable-calendar-2027', nav: 'Printable calendar 2027', card: 'One page, twelve months, ready to print',
      title: 'Printable calendar 2027 Indonesia: one A4 page, all holidays',
      description: 'Printable Indonesia calendar 2027: twelve months on one A4 page with national holidays and collective leave, optional Hijri dates or pasaran, free and ad-free.',
      h1: 'Printable Indonesia calendar 2027',
      intro: 'Pick a layout, then press the print button or save as PDF from your browser: the 2027 calendar fits on one A4 page.',
      resume: `This printable calendar puts all twelve months of 2027 on one portrait A4 page, with the ${K.nasional(2027).length} national holidays in red and the ${CB} collective leave days in grey, as set by the 2027 joint decree. Sundays are red as on Indonesian wall calendars, and weeks start on Sunday. You can add Hijri dates or the Javanese pasaran under each date before printing. The list of holidays with names and dates prints below the calendar, so a single sheet is enough for an office wall, a staff room or a kitchen. There are no ads, logos or images to waste ink. To save as PDF, choose "Save as PDF" in the browser's print window. Because the calendar is built from the same list as the rest of the site, any amending decree carries straight into the printed version.`,
      faqs: [
        { q: 'How do I save the 2027 calendar as a PDF?', a: 'Press the print button above the calendar, then in the print window choose "Save as PDF" or "Microsoft Print to PDF" as the printer. Set the paper to A4 and the orientation to portrait. On a phone, choose share, then print, and save the file.' },
        { q: 'Does the printable calendar include collective leave?', a: `Yes. Collective leave is marked grey and national holidays red, as on screen. The list below the calendar gives every date and its description, so the ${CB} collective leave days of 2027 can be told apart from national holidays. Print in colour to keep the distinction.` },
        { q: 'May I print this calendar to hand out?', a: 'Yes, for your office, school, mosque, church or community, free of charge. Please keep the source line at the bottom. To show the calendar on a website, use the embed code on the embed page. You do not need to register or ask us for permission first.' },
      ],
      body: (h) => `<h2>Printing tips</h2>
<p>Portrait A4 with the browser's default margins is enough. If the text is too small, print on two sheets: set the scale to 140 percent and print pages one and two. A black-and-white print stays readable because national holidays print in bold and collective leave gets a frame.</p>
<h2>What the calendar contains</h2>
<p>Holidays and collective leave come from the ${h.src('skb-2027', '2027 joint decree')}. Hijri dates follow the decree for holiday months and the ${h.src('ummulqura', 'Umm al-Qura')} calendar for the rest. The Javanese pasaran comes from the unbroken five-day cycle explained in the ${h.a('weton', 'weton calculator')}.</p>
${h.table(['Month', 'National holidays', 'Collective leave', 'Working days'], ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => [m, K.nasional(2027).filter((l) => Number(l.date.slice(5, 7)) === i + 1).length, K.cutiBersama(2027).filter((l) => Number(l.date.slice(5, 7)) === i + 1).length, hk27[i]]), 'Summary by month, 2027', ['l', 'r', 'r', 'r'])}
<p>The 2026 calendar for the rest of this year is on ${h.a('kalender-2026', 'calendar 2026')}.</p>
${h.mini('wt', { p: ['tgl', 'bln', 'thn'], c: 'Work out a birth weton' })}`,
    },
  }),
];
