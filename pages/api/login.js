const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./models/user')
const mongoose = require('mongoose')

export default async function handler(request, response) {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('connected to MongoDB') 
  
  const body = JSON.parse(request.body)
  const user = await User.findOne({username: body.username})
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.password)
    console.log(passwordCorrect)
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
          error: 'invalid username or password',
          code: 'L1'
      })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(
      userForToken, 
      process.env.SECRET,
      { expiresIn: 60*60})
    
    console.log('login success')
    response.status(200).json({token, username:user.username, name:user.name})
}