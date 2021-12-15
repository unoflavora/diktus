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
    userXP.updateXP(user.sub, (xp+100)).then(() => setXP(xp+50))
    .catch(e => console.log(e))
  }

  const handleFalse = async () => {
    userXP.updateXP(user.sub, (xp+50)).then(() => setXP(xp+10))
    .catch(e => console.log(e))
  }

  const handleTO = async () => {
    userXP.updateXP(user.sub, (xp+1000)).then(() => setXP(xp+1000))
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

  const hitungHasil = async (tipe, jawabanSiswa) => {
    let tipeUjians = ['TPS', tipe === 'Saintek' ? 'Saintek' : 'Soshum']
    const date = new Date()
    const [hari, bulan, tahun] = [date.getDate(), date.getUTCMonth() + 1, date.getFullYear()]

    let jawaban = {
      TPS: {
        'Kemampuan Penalaran Umum': 0,
        'Pengetahuan Kuantitatif': 0,
        'Pengetahuan dan Pemahaman Umum': 0,
        'Kemampuan Memahami Bacaan dan Menulis': 0
      },
      'Kemampuan Penalaran Umum': {},
      'Pengetahuan Kuantitatif': {},
      'Pengetahuan dan Pemahaman Umum': {},
      'Kemampuan Memahami Bacaan dan Menulis': {},
      Saintek : {
        'Matematika': 0,
        'Fisika': 0,
        'Kimia': 0,
        'Biologi': 0
      },
      Biologi: {},
      Fisika: {},
      Matematika: {},
      Kimia: {},

      skor: 0,
      tipe,
      date: `${hari}-${bulan}-${tahun}`
    }

    jawaban['nilai'] = {...jawaban[tipe === 'Saintek' ? 'Saintek' : 'Soshum'], ...jawaban['TPS']}
    let length = {}
    
    tipeUjians.map((tipeUjian) => {
      Object.keys(jawabanSiswa[tipeUjian]).map(kode => {
        const soal = jawabanSiswa[tipeUjian][kode]
        if(soal.correct) {
          jawaban[tipeUjian][soal.mataPelajaran] = jawaban[tipeUjian][soal.mataPelajaran] + 50
          
          soal.materi in length 
          ? length[soal.materi]++
          : length[soal.materi] = 1

          soal.materi in jawaban[soal.mataPelajaran] 
            ? jawaban[soal.mataPelajaran][soal.materi] =  Math.round(((jawaban[soal.mataPelajaran][soal.materi] + 1) / length[soal.materi]) * 100) / 100
            : jawaban[soal.mataPelajaran][soal.materi] = 1
        }  
        return
      })
      return
    })

    tipeUjians.map((tipeUjian) => {
      Object.keys(jawaban[tipeUjian]).map(matpel => jawaban.skor = jawaban.skor + jawaban[tipeUjian][matpel])
    })

    jawaban.skor = Math.round(jawaban.skor / 8)

    console.log(jawaban)

    await userXP.updateHasil(user.sub, tipe, jawaban)
}



  return (
    <XpContext.Provider value={{xp, setXP, handleTO, metadata, updateLatihanMingguIni, handleCorrect, handleFalse, updateTarget, updateTanggalTes, hitungHasil}}>
      {children}
    </XpContext.Provider>
  )
}