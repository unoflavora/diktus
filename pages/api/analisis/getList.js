import dbConnect from "../../../lib/dbConnect"
import listMateriDB from "../models/listMateri"

export default async function handler(request, response) {
  console.log(request.body)
  const kelompokUjian = JSON.parse(request.body).kelompokUjian
  try {
    await dbConnect()
    const data = await listMateriDB.findOne({'kelompokUjian': kelompokUjian})
    console.log(data)
    response.status(200).json(data)
  } catch(e) {
    console.log(e)
    response.status(500).json('Error')
  }
}