import soalTryout from '../models/soalTryout'
import dbConnect from '../../../lib/dbConnect'

export default async function handler(request, response) {
  await dbConnect()
  let tipeUjian
  if(request.headers['user-agent'] === 'PostmanRuntime/7.28.3') {
    tipeUjian = request.body.tipe
  } else {
    tipeUjian = JSON.parse(request.body).tipe
  }

  try {

    let res = {'TPS': []}
    res[tipeUjian] = []

    for(const mata_pelajaran of tipeUjian === 'Saintek' 
    ? Object.keys(Saintek)
    : Object.keys(Soshum)){
      const soalDariDB = await soalTryout.find({'mataPelajaran': mata_pelajaran})
      const soalDariDB_shuffled = shuffle(soalDariDB)
      for (const soal of soalDariDB_shuffled) {
        if(soal.materi in Saintek[mata_pelajaran] && 
          (res[tipeUjian].filter(soalDiRes => soalDiRes.materi === soal.materi).length < Saintek[mata_pelajaran][soal.materi])) {
          const req = {
          kode: soal.kode,
          mataPelajaran: soal.mataPelajaran,
          materi: soal.materi,
          subMateri:soal.subMateri,
          soal: soal.soal,
          pilihanGanda:soal.pilihanGanda,
          jawaban:soal.jawaban,
          pembahasan: soal.pembahasan,
          kesulitan:soal.kesulitan
        }
        res[tipeUjian].push(req)
      }
      }
    }

    for(const mata_pelajaran of Object.keys(TPS)){
      const soalDariDB = await soalTryout.find({'mataPelajaran': mata_pelajaran})
      for (const soal of soalDariDB) {
        if(soal.materi in TPS[mata_pelajaran] && 
          (res[tipeUjian].filter(soalDiRes => soalDiRes.materi === soal.materi).length < TPS[mata_pelajaran][soal.materi])) {
          const req = {
          kode: soal.kode,
          mataPelajaran: soal.mataPelajaran,
          materi: soal.materi,
          subMateri:soal.subMateri,
          soal: soal.soal,
          pilihanGanda:soal.pilihanGanda,
          jawaban:soal.jawaban,
          pembahasan: soal.pembahasan,
          kesulitan:soal.kesulitan
        }
        res['TPS'].push(req)
      }
      }
    }

    response.status(200).json(res)
  } catch(e) {
    console.log(e)
    response.status(401).json(e)
  }
}


const Saintek = {
  'Matematika': {
    'Eksponen, Bentuk Akar, dan Logaritma':2,
    'Sistem Persamaan dan Pertidaksamaan':2,
    'Komposisi dan Invers Fungsi':1,
    'Matriks': 1,
    'Baris dan Deret': 1,
    'Bunga Tunggal dan Majemuk': 1,
    'Peluang': 1,
    'Statistika': 1,
    'Geometri': 2,
    'Transformasi': 1,
    'Limit':1,
    'Aplikasi Turunan dan Integral':2,
    'Irisan Kerucut':1,
    'Suku Banyak': 1,
    'Vektor': 1,
    'Trigonometri':1
  },
  'Fisika': {
    'Mekanika': 8,
    'Zat dan Kalor': 2,
    'Getaran, Gelombang, dan Bunyi': 3,
    'Listrik dan Magnet': 3,
    'Cahaya dan Alat Optik': 2,
    'Fisika Modern': 2
  },
  'Kimia': {
    'Stoikiometri': 4,
    'Struktur Atom': 1,
    'Sistem Periodik Unsur':2,
    'Ikatan Kimia':2,
    'Termokimia':2,
    'Laju Reaksi':2,
    'Kesetimbangan Kimia':1,
    'Reaksi Redoks & Elektrokimia':2,
    'Larutan':3,
    'Kimia Organik':1
  },
  'Biologi': {
    'Jaringan dan Perkembangan Tumbuhan': 4,
    'Sistem Organ dan Fisiologis Manusia':2,
    'Karakteristik dan Peranan Makhluk Hidup':4,
    'Keanekaragaman dan Sistem Klasifikasi Makhluk Hidup':1,
    'Metabolisme Sel':2,
    'Genetika':2,
    'Sel':1,
    'Evolusi':1,
    'Ekosistem':1,
    'Perubahan Lingkungan dan Konservasi': 1,
    'Bioteknologi':1
  }
}

const TPS = {
  "Kemampuan Penalaran Umum": {
    "Unsur Paragraf": 11,
    "Tata Bahasa" : 3,
    "Penalaran Kuantitatif": 6
  },
  "Kemampuan Memahami Bacaan dan Menulis": {
    "Pemahaman Isi Bacaan": 12,
    "Kaidah Penulisan": 8
  },
  "Pengetahuan dan Pemahaman Umum": {
    "Analisis isi Bacaan": 12,
    "Reading Comprehension": 8
  },
  "Pengetahuan Kuantitatif": {
    "Geometri": 3,
    "Perhitungan Dasar": 13,
    "Logika Dasar": 4
  }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
