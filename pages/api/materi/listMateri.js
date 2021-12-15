import SoalDB from '../models/soalDb'
import dbConnect from '../../../lib/dbConnect'

export default async function handler(request, response) {
    const req = JSON.parse(request.body)['matpel']
    const matpel = req.charAt(0).toUpperCase() + req.slice(1);

    await dbConnect()
    console.log('MongoDB Connected')
    try {
      const res = await SoalDB.find({'mataPelajaran': matpel})
      const dataMatpel = res[0]['materi']
      const materi = Object.keys(dataMatpel)
      const finalData = materi.map(materi => {
        let a = {}
        a[materi] = Object.keys(dataMatpel[materi])
        return a
      })
      response.status(200).json(finalData)
    } catch(e) {
      console.log(e)
      response.status(401).json(e)
    }
}