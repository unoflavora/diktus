var axios = require("axios").default;

async function get(id) {
  const options = {
    method: 'GET',
    url: `https://diktus.jp.auth0.com/api/v2/users/${id}`,
    headers: {
      authorization: `Bearer ${process.env.AUTH0_TOKENTEST} `, 
      'content-type': 'application/json'
    }
  }
  const res = await axios.request(options)
  return(res.data.user_metadata.xp)
}

async function update(user_id, xp) {
  var options = {
    method: 'PATCH',
    url: `https://diktus.jp.auth0.com/api/v2/users/${user_id}`,
    headers: {
      authorization: `Bearer ${process.env.AUTH0_TOKENTEST} `, 
      'content-type': 'application/json'
    },
    data: {
      user_metadata: {
        xp: xp
      },
    }
  }

  const res = await axios.request(options)
  return(res.data.user_metadata.xp)
}


const exports = {
  get, update
}

export default exports