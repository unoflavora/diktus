export default function userProfileService(user_id) {
  const url = `https://diktus.jp.auth0.com/api/v2/users/${user_id}`

  const update = async(user_data) => {
    const options = {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${process.env.AUTH0_TOKENTEST} `, 
        'content-type': 'application/json'
      },
      body: JSON.stringify({
          ...user_data
      })
    }  
    
    try {
      const res = await fetch(url, options)
      const data = await res.json()
      return data
    } catch(e) {
      const error = e.json()
      return error
    }
  }
 
  return {update}
}