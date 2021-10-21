import SoalDB from '../models/soalDb'
import dbConnect from '../../../lib/dbConnect'

export default async function handler(request, response) {
  const {materi} = JSON.parse(request.body)

  await dbConnect()
  console.log('MongoDB Connected')
  try {
    const res = await SoalDB.find({'mataPelajaran': 'Biologi'})
    const data = res[0]['materi'][materi]
    const submateriList = Object.keys(data)
    let finalData = []

    for(const submateri of submateriList) {
      let listSoalDariSubmateri = Object.keys(data[submateri])
      var num = Math.floor(Math.random() * listSoalDariSubmateri.length)
      finalData.push(data[submateri][listSoalDariSubmateri[num]])
    }

    response.status(200).json(finalData)
  } catch(e) {
    console.log(e)
    response.status(401).json(e)
  }
}