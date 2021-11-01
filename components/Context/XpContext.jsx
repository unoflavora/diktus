import React, { useEffect, useState, useContext} from "react";
import { useUser } from "@auth0/nextjs-auth0";
import userXP from '../../services/userXP'
import metadatas from "./metadata";
import moment from "moment";

const XpContext = React.createContext()

export function useXP() {
  return useContext(XpContext)
}

export function XpProvider({children}) {
  const {user} = useUser()
  const [xp, setXP] = useState(0)
  const [metadata, setMetadata] = useState()

  useEffect(() => {
    const getXP = async() => {
    if(!user) {
      setMetadata(metadatas)
    }
    try {
      const meta = await userXP.get(user.sub)
      if(meta.xp > 0) {
        setXP(meta.xp)
      }
      setMetadata(meta)      
    } catch(e) {
      console.log(e)
    }}

    getXP()
  }, [user])

  useEffect(() => {
    const resetTargetHariIni = async() => {      
      const diff = moment().diff(moment(metadata.today.Latihan.date, 'DD-MM-YYYY'), 'days')
      console.log(diff)
      if (diff > 6) {
        await userXP.updateLatihan({...metadata["today"], 
                                    Latihan: {"date": metadata.today.Latihan.date, "value": 0}}, user.sub)
      } else {
        return
      }    
    }

    if(user) {
      resetTargetHariIni()
    }
  }, [user])



  
  
  const handleCorrect = () => {
    userXP.updateXP(user.sub, (xp+100)).then(() => setXP(xp+100))
    .catch(e => console.log(e))
  }

  const handleFalse = async () => {
    userXP.updateXP(user.sub, (xp+50)).then(() => setXP(xp+50))
    .catch(e => console.log(e))
  }

  const updateTarget = async (skor) => {
    userXP.updateTarget(user.sub, skor).then(() => setMetadata({...metadata, target:skor}))
    .catch(e => console.log(e))
  }

  const updateTanggalTes = (tanggal) => {
    userXP.updateTanggalTes(user.sub, tanggal)
    .then(() => setMetadata({
      ...metadata,
      tes:tanggal
    }))
    .catch((e) => {
      console.log(e)
    })
  }

  const updateLatihanMingguIni = async () => {
    try {
      const latihan = metadata.today.Latihan
      const val = latihan.value + 1

      await userXP.updateLatihan({...metadata["today"], 
            Latihan: {...latihan, value:  val}}, user.sub)

      setMetadata({
        ...metadata,
        today: {
          ...metadata['today'],
          Latihan: {...latihan, value: val}
        }
      })

    } catch(e) {
      console.log('error', e)
    }
  }



  return (
    <XpContext.Provider value={{xp, setXP, metadata, updateLatihanMingguIni, handleCorrect, handleFalse, updateTarget, updateTanggalTes}}>
      {children}
    </XpContext.Provider>
  )
}