const mongoose = require('mongoose')

const soalSchema = new mongoose.Schema({
  kode: String,
  materi: String,
  subMateri: String,
  mataPelajaran: String,
  soal: String,
  pilihanGanda: Array,
  jawaban: String,
  pembahasan: String,
  try: Number,
  correct: Number,
  date: Date
})


module.exports =  mongoose.models.Soal || mongoose.model('Soal', soalSchema)