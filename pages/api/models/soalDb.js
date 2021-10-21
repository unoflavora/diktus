import mongoose from 'mongoose'

const mataPelajaranSchema = new mongoose.Schema({
  mataPelajaran: String,
  materi: Object
}) 

module.exports =  mongoose.models.mataPelajaran || mongoose.model('mataPelajaran', mataPelajaranSchema)
