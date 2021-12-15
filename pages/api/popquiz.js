import soalTryout from './models/soalTryout'
import dbConnect from '../../lib/dbConnect'

export default async function handler(request, response) {
  await dbConnect()
  try {
    soalTryout.count().exec(function (err, count) {

      // Get a random entry
      var random = Math.floor(Math.random() * count)
    
      // Again query all users but only fetch one offset by our random #
      soalTryout.findOne().skip(random).exec(
        function (err, res) {
          response.status(200).json(res)
        })
    })   
    
  } catch(e) {
    console.log(e)
    response.status(401).json(e)
  }
}
