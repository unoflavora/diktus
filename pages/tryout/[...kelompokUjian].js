import Navbar from "../../components/navbar/Navbar"
import { useRouter } from "next/router"
import { useEffect, useState, useMemo } from "react"
import { BiTime } from "react-icons/bi"
import { AiOutlinePauseCircle } from "react-icons/ai"
import { RiRestTimeLine } from 'react-icons/ri'
import Footer from "../../components/Footer/Footer"
import Layout from "../../components/Tryout/Layout"
import Result from "../../components/Tryout/Result/Result"

export default function Ketentuan({data, quotes}) {
  const router = useRouter()
  const [choosedAnswer, setChoosedAnswer] = useState({'TPS': {}, 'Saintek': {}})
  const [ujian, setUjian] = useState('TPS')
  const [mulai, setMulai] = useState(false)
  const [selesai, setSelesai] = useState(false)
  const { kelompokUjian } = router.query
  const kelompokUjianUpperCase = useMemo(() => kelompokUjian[0].charAt(0).toUpperCase() + kelompokUjian[0].slice(1))

  useEffect(() => {
    if(!router.isReady) return;
    let jawabanSiswa = {'TPS': {}}
    jawabanSiswa[kelompokUjianUpperCase] = {}
  }, [router.isReady])


  return(
    <div className='font-poppins flex flex-col overflow-hidden min-h-screen'>
      <Navbar/>
      {mulai ? 
        !selesai ? <Layout data={data[ujian]} 
        kelompokUjian={kelompokUjianUpperCase}
        tipeUjian={ujian} setUjian={setUjian} selesai={selesai} setSelesai={setSelesai} setMulai={setMulai} choosedAnswer={choosedAnswer} setChoosedAnswer={setChoosedAnswer} /> 
        : <Result dataSoal={data} jawabanSiswa={choosedAnswer} quotes={quotes} kelompokUjian={kelompokUjianUpperCase}/>
      :
       <div className='md:py-10 lg:py-0'>
       <h1 className='w-full p-5  py-10 text-ungu-gelap text-center text-2xl font-bold'>
         Ketentuan Tryout {kelompokUjianUpperCase} UTBK  {new Date().getFullYear() + 1} Diktus
       </h1>
       <ul className='grid grid-cols-1 grid-rows-3 lg:px-36 xl:grid-rows-1 xl:grid-cols-3 gap-5'>
       {listAturan.map((list, index) => 
           <div className='border-2 mx-5 rounded-xl p-5 grid grid-cols-4 gap-3 md:gap-0 place-items-center
           xl:grid-cols-4 xl:grid-rows-1'>
             <div className='place-self-center bg-ungu-cal rounded-lg col-span-1 md:row-span-1 h-full w-full flex items-center justify-center'>
               {list.icon}
             </div>
             <div className='flex flex-col col-span-3 text-center gap-2 xl:px-2'>
               <h2 className='font-semibold text-xl'>{list.title}</h2>
               <p className='text-base text-gray-400'>{list.text}</p>
             </div>
           </div>
       )}
       </ul>
       <div className='w-full flex items-center justify-center my-8'>
         <button 
           onClick={() => setMulai(true)}
           className='px-10 py-4 rounded-2xl bg-ungu-gelap text-white text-xl'>
           Mulai Sekarang ({ujian})
         </button>
       </div>
     </div>
     }
      <Footer/>
    </div>
  )
}

export async function getServerSideProps(context) {
  const tipe = context.params.kelompokUjian[0]
  const kelompokUjianUpperCase = tipe.charAt(0).toUpperCase() + tipe.slice(1)

  const res = await fetch(
    (process.env.NODE_ENV === "production" 
    ? "https://diktus.id/api/" 
    : "http://localhost:3000/api/") 
    + "tryout/getPaket", {
      method: 'POST',
      body: JSON.stringify({
        'tipe': kelompokUjianUpperCase
      })
    }
  )
  
  const data = await res.json()

  const quotesToUse = []
  try {
    const quoteData = await fetch('https://type.fit/api/quotes', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    const quotes = await quoteData.json()
  
    const randomQuotePicker = () => {
      let i = 0
      while (i < 10) {
        quotesToUse.push(quotes[Math.floor(Math.random() * quotes.length)])
        i++
      }
    }
    randomQuotePicker()
  } catch (e) {
    console.log(e)
  }
  

  if (res.status === 404) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      data,
      quotes:quotesToUse
    }
  }
}




const listAturan = [
  {
    title: 'Waktu Pengerjaan',
    text: `Waktu Pengerjaan TPS 105 menit sedangkan TKA 90 Menit`,
    icon: <BiTime size={40} color={'white'}/>
  },
  {
    title: 'Tidak Ada Pause',
    text: 'Namun diperkenankan selesai lebih cepat',
    icon: <AiOutlinePauseCircle size={40} color={'white'}/>
  },
  {
    title: 'Ada Waktu Istirahat',
    text: 'Ada waktu istirahat selama 15 menit diantara TPS dan TKA',
    icon: <RiRestTimeLine size={40} color={'white'}/>
  }
]
