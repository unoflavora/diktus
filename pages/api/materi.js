const contentful = require('contentful')

export default async function handler(req, res) {
  const {matpel} = JSON.parse(req.body)
  const client = contentful.createClient({
    space: process.env.SPACE,
    accessToken: process.env.ACCESSTOKEN
  })
  const req_matpel = matpel[0].toUpperCase() + matpel.substring(1)
  console.log(req_matpel)
  const response = await client.getEntries()
  try {
    const names = response.items
    .filter(matpel => matpel.fields.name === req_matpel)
    .map(matpel => matpel.fields.materi)[0]
    .filter(materi => materi.fields.name) //ubah ini kalau mau ada sub-materi
    .map(materi => materi.fields)
    res.status(200).json(names)
  } catch {
    res.status(404).json({})
  }
}
