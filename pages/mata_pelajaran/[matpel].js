import {useRouter} from 'next/dist/client/router'

import SoalItem from '../components/SoalItem'
import Head from 'next/head'
import Pagination from '@material-ui/lab/Pagination'
import { useState } from 'react'


const matpelName = () => {
  const router = useRouter()
  const { matpel } = router.query

  const name = matpel[0].toUpperCase() + matpel.substring(1)

  return (name)
}


export async function getServerSideProps(context) {
  const matpel = context.params.matpel
  const res = await fetch(
    (process.env.NODE_ENV === "production" 
    ? "https://words-aas.vercel.app/db/" 
    : "http://localhost:3000/api/") 
    + "materi",
    {
      method: 'POST',
      body: JSON.stringify({ matpel })
    }
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
  const [skor, setSkor] = useState(0)

  const matpel = matpelName()

  const handleSoal = (event, page) => {
    setPageNumber(page)
  }

  const handleAnswer = (answer) => {
    setAnswers({...answers, answer})
  }

  const handleAnswered = (newAnswered) => {
    setAnswered(newAnswered)
  }

  function SoalPerMateri(materi) {
    const hasil = []
    materi.soal.map(kumpulanSoal => 
      hasil.push(kumpulanSoal))
    return hasil
  }

  const arrays = data.map(materi => SoalPerMateri(materi))
  const merged = [].concat.apply([],arrays)
  const soals =  merged.map(soal => 
    <SoalItem 
      soal={soal} 
      answers={answers} 
      answered={answered}
      handleAnswer={handleAnswer}
      handleAnswered={handleAnswered}
      skor={skor}
      setSkor={setSkor}
    />)

  return (
    <div>
      <Head>
        <title>Latihan Soal UTBK {matpel} | Try-Out UTBK {matpel}</title>
        <meta name="description" content="Latihan soal dan Try-Out gratis UTBK Biologi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {soals[pageNumber-1]}
      </main>
      <Pagination count={soals.length} variant="outlined" color="primary" onChange={handleSoal} />

    </div>
  )
}