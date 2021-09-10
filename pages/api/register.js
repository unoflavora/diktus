const bcrypt = require('bcrypt')
const User = require('./models/user')
const mongoose = require('mongoose')
  
export default async function handler(req, res) {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('connected to MongoDB') 
    const body = req.body
  
    const saltRounds = 10
    const password = await bcrypt.hash(body.password, saltRounds)
  
    const user = new User({
      username: body.username,
      namaAwal: body.namaAwal,
      namaAkhir: body.namaAkhir,
      email: body.email,
      password: password,
      materi: []
    })
  
    const savedUser = await user.save()
  
    res.status(200).json({message:'Berhasil menyimpan user!'})
  } catch(error) {
    console.log('error connecting to MongoDB: ', error.message) 
    res.status(400).json({message: error.message})
  }  
}
