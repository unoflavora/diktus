import mongoose from 'mongoose'

const mataPelajaranSchema = new mongoose.Schema({
  mataPelajaran: String,
  materi: Object
}) 

const SoalDB =  mongoose.models.mataPelajaran || mongoose.model('mataPelajaran', mataPelajaranSchema)

export default function handler(request, response) {
  // const {matpel} = JSON.parse(request.body)
  // const req_matpel = matpel[0].toUpperCase() + matpel.substring(1)
    mongoose.connect(process.env.MONGODB_SOAL).then(function() {
      console.log('MongoDB Connected')
      SoalDB.find({'mataPelajaran': 'Biologi'}).then(res => {
        const kodes = res[0]['materi']
        response.status(200).json(kodes)  
      }).then(function() {
        mongoose.disconnect()
      }).catch(e => {
        response.status(401).json(e)
        console.log(e)
      })
    })
    .catch(e => {
      console.log(e)
      response.status(401).send('Error Connecting')  
    })
}