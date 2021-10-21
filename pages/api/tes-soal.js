const Soal = require('./models/soal')
const mongoose = require('mongoose')

export default async function handler(request, response) {
  try {
    mongoose.connect(process.env.MONGODB_SOAL)
    console.log('MongoDB Connected')
  } catch(e) {
    console.log(e)
    response.status(401).send('Error Connecting')
  }
  try {
    const data = await Soal.find()
    response.status(200).json(data)
  } catch(e) {
    response.status(401).json(e)
  }
}

