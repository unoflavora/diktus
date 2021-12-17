const baseUrl =  (mode) => { 
return (process.env.NODE_ENV === "production" 
? "https://www.diktus.id/api/" 
: "http://localhost:3000/api/")
+ mode 
}

let token = ''

async function Login(username, password) {
  try {
    const response = await fetch(baseUrl(login), {
      method: 'POST',
      body: 
        JSON.stringify({
          username: username,
          password: password
        })
    })
    console.log(response)
    return response;
  } catch(e) {
    console.log(e)
    return e
  }
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const userValidation = async () => {
  return await fetch(baseUrl('tokenAuth'), {
    method: 'POST',
    body: 
      JSON.stringify({
        jwt: token
      }),
    headers: {
      'Authorization': token
    }
  })
}

const exports = {
  Login, setToken, userValidation
}

export default exports