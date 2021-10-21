import SoalItemTes from './components/SoalItem'
import Head from 'next/head'
import tokenCheck from '../services/tokenCheck'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


export async function getServerSideProps(context) {
  const res = await fetch(
    (process.env.NODE_ENV === "production" 
    ? "https://words-aas.vercel.app/db/" 
    : "http://localhost:3000/api/") 
    + "tes-soal",
  )
  const data = await res.json()
  if (res.status === 404) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      data
    }
  }
}

export default function Home({data}) {
  const [pageNumber, setPageNumber] = useState(1)
  const [answers, setAnswers] = useState({})
  const [answered, setAnswered] = useState({})
  const [user, setUser] = useState({})
  const [skor, setSkor] = useState(0)
  const router = useRouter()

  useEffect(async() => {
    try {
      const userToken = await tokenCheck()
      if (!userToken) {
        router.push('/login')
      }
      setUser(userToken)
    } catch(e) {
      router.push('/login')
    }
  }, [])

  const handleAnswer = (answer) => {
    setAnswers({...answers, answer})
  }

  const handleAnswered = (newAnswered) => {
    setAnswered(newAnswered)
  }

  const handleNext = () => {
    setPageNumber(pageNumber + 1)
  }

  const handlePrevious = () => {
    if (pageNumber === 1) {
      null
    } else {
      setPageNumber(pageNumber - 1)
    }
  }
  
  const soalSelector = (soal) => {
    return( 
      <SoalItemTes 
        soal={soal} 
        answers={answers} 
        answered={answered}
        handleAnswer={handleAnswer}
        handleAnswered={handleAnswered}
        skor={skor}
        setSkor={setSkor}
        handleNext ={handleNext}
        handlePrevious={handlePrevious}
      />
    )
  }
  const soalSoal = data.map(item => soalSelector(item))
  const soals = [].concat.apply([],soalSoal)

  return (
    <div>
      <Head>
        <title>Latihan Soal UTBK Quiz Harian</title>
        <meta name="description" content="Latihan soal dan Try-Out gratis UTBK Biologi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <div className='h-16 px-5'>
        <h1>Semangat {user.nama}!</h1>
      </div>
      <div className='grid grid-rows-2 gap-2 h-14 px-5 xl:px-40 py-2 bg-gray-100 font-poppins text-sm text-ungu-teks'>
        Questions {pageNumber}/{soals.length}
        <div className='w-full rounded-lg bg-white'>
          <div style={{width: `${pageNumber/soals.length * 100}%`}} className='h-full rounded-lg bg-ungu-gelap border-2'></div>
        </div>
      </div>
       <div className='h-screen px-16 xl:px-40 overflow-scroll'>
          <div className='pt-6 flex flex-col justify-center'>
            {soals[pageNumber-1]}
          </div>         
       </div>
      </main>
    </div>
  )
}