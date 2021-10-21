import userServer from './mongodb'

export default async function token() {
  const saved = JSON.parse(window.localStorage.getItem("loggedUser"));
  if (saved) {
    try {
      userServer.setToken(saved.token) 
      const validation = await userServer.userValidation()
      if (validation.status === 401) {
        console.log('error token expired')
        window.localStorage.clear()
        return
      }
      return saved 
    } catch(e) {
      console.log(e)
      return null
    }     
  }
}


