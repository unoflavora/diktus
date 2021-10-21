import { useState } from 'react'
import SoalItem from '../SoalItem'

export default function Soal({data, id}) {
  const [pageNumber, setPageNumber] = useState(1)
  const [answers, setAnswers] = useState({})
  const [answered, setAnswered] = useState({})
  const [skor, setSkor] = useState(0)

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
    setPageNumber(pageNumber - 1)
  }

  const soalSelector = (soal, index) => {
    return( 
      <SoalItem 
        soal={soal} 
        id={id}
        last={index + 1 === data.length}
        begin={index === 0}
        finished={Object.keys(answered).length === data.length}
        answers={answers} 
        answered={answered}
        handleAnswer={handleAnswer}
        handleAnswered={handleAnswered}
        skor={skor}
        setSkor={setSkor}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    )
  }

  const soalSoal = data.map((item, index) => soalSelector(item, index))
  const soals = [].concat.apply([],soalSoal)



  return (
    <>
      <div className='grid grid-rows-2 gap-2 h-14 md:h-16 px-5 lg:px-28 xl:px-40 py-2 bg-gray-100 font-poppins font-semibold text-sm md:text-lg text-ungu-teks'>
        Questions {pageNumber}/{soals.length}
        <div className='w-full rounded-lg bg-white'>
          <div style={{width: `${Math.floor(Object.keys(answered).length/soals.length * 100)}%`}} className='h-full rounded-lg bg-ungu-gelap border-2'></div>
        </div>
      </div>
       <div className='py-10 px-4 md:px-16 lg:px-36 xl:px-40'>
          {soals[pageNumber-1]}
       </div>
    </>
  )
}