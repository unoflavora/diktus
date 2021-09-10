const bcrypt = require('bcrypt')
const contentful = require('contentful-management')

export default async function handler(req, res) {

  const body = req.body
  console.log(body)
  const password = body.password
  const salt = process.env.SALTROUNDS
  const passwordHash = await bcrypt.hash(password, salt)

  const client = contentful.createClient({
    accessToken: process.env.MANAGETOKEN
  })

  client.getSpace(process.env.SPACE)
  .then((space) => space.getEnvironment(process.env.ENVIRONMENT_ID))
  .then((environment) => environment.createEntry(process.env.USER_ID, {
    fields: {
      username: {
        'en-US': body.username
      },
      password: {
        'en-US': passwordHash
      },
      email: {
        'en-US': body.email
      },
      namaAwal: {
        'en-US': body.namaAwal
      },
      namaAkhir: {
        'en-US': body.namaAkhir
      }
    }
  })) 
  .then((entry) => res.status(200).send(entry))
  .catch(console.error)
}