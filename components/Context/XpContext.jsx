import React, { useEffect, useState, useContext} from "react";
import { useUser } from "@auth0/nextjs-auth0";
import userXP from '../../services/userXP'

const XpContext = React.createContext()

export function useXP() {
  return useContext(XpContext)
}

export function XpProvider({children}) {
  const { user } = useUser();
  const [xp, setXP] = useState(0)

  useEffect(() => {
    const getXP = async() => {
      try {
        const newXP = await userXP.get(user.sub)
        setXP(newXP)
      } catch(e) {
        console.log(e)
      }
    }
    getXP()
  })
  

  const handleCorrect = () => {
    userXP.update(user.sub, (xp+100)).then(() => setXP(xp+100))
    .catch(e => console.log(e))
  }

  const handleFalse = async () => {
    userXP.update(user.sub, (xp+50)).then(() => setXP(xp+50))
    .catch(e => console.log(e))
  }

  return (
    <XpContext.Provider value={{xp, setXP, handleCorrect, handleFalse}}>
      {children}
    </XpContext.Provider>
  )
}