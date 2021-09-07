const contentful = require('contentful')

export default async function handler(req, res) {
  const client = contentful.createClient({
    space: '9qikiz50jlc8',
    accessToken: '_3RXK8EOROEf4mPONA9fqk1Rw_gmlm9uzVd726LBTA0'
  })
  const list_matpel = ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'TPS']

  const response = await client.getEntries()
  try {
    const data = response.items
    .filter(matpel => list_matpel.includes(matpel.fields.name))
    .map(matpel => matpel.fields.materi)
    .map(materi => materi.map(soal => soal.fields))

    function SoalPerMateri(materi) {
      const hasil = []
      materi.map(kumpulanSoal => 
        hasil.push(kumpulanSoal.soal))
        
      return hasil
    }

    const arrays = data.map(materi => SoalPerMateri(materi)) 
    const soalSoal = [].concat.apply([],arrays)

    res.status(200).json(soalSoal)

  } catch(e) {
    console.log(e)
    res.status(404).send()
  }
}