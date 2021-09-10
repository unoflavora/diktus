const url = (process.env.NODE_ENV === "production" 
? "https://words-aas.vercel.app/db/" 
: "http://localhost:3000/api/")
+ "login"


export default async function Login(username, password) {
  try {
    const response = await fetch(url, {
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