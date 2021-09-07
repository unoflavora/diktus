import {useRouter} from 'next/dist/client/router'

import SoalItem from '../components/SoalItem'
import Head from 'next/head'
import Pagination from '@material-ui/lab/Pagination'
import { useState } from 'react'

export async function getServerSideProps(context) {
  const res = await fetch(
    (process.env.NODE_ENV === "production" 
    ? "https://words-aas.vercel.app/db/" 
    : "http://localhost:3000/api/") 
    + "popquiz",
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

  const handleSoal = (event, page) => {
    setPageNumber(page)
  }

  const handleAnswer = (answer) => {
    setAnswers({...answers, answer})
  }

  const handleAnswered = (newAnswered) => {
    setAnswered(newAnswered)
  }
  const soalSelector = (soal) => {
    return( 
      <SoalItem 
        soal={soal} 
        answers={answers} 
        answered={answered}
        handleAnswer={handleAnswer}
        handleAnswered={handleAnswered}
        skor={skor}
        setSkor={setSkor}
      />
    )
  }

  const soalSoal = data.map(soal => soal.map(item => soalSelector(item)))
  const soals = [].concat.apply([],soalSoal)

  console.log('soals', soals)
  return (
    <div>
      <Head>
        <title>Latihan Soal UTBK </title>
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