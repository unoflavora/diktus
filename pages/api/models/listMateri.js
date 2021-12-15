const mongoose = require('mongoose')

const listMateriSchema = new mongoose.Schema({
  kelompokUjian: String,
  mataPelajaran: Object
}) 

const listMateriDB =  mongoose.models.listMateri || mongoose.model('listMateri', listMateriSchema)

module.exports = listMateriDB