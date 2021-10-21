import {useState, useEffect} from 'react'
import {GrFormPreviousLink, GrFormNextLink} from "react-icons/gr"
import { Slide } from 'react-slideshow-image';
import { useXP } from './Context/XpContext';
import { useRouter } from 'next/router'

import 'react-slideshow-image/dist/styles.css'

export default function SoalItem({soal, last, begin,
  handleNext, handlePrevious, answers, handleAnswer, 
  answered, handleAnswered, id, finished}) 
{
  const router = useRouter()

  const [value, setValue] = useState(answers)
  const [answer, setAnswers] = useState(answered)
  const [cskor, csetSkor] = useState(0)
  const [ternilai, setTernilai] = useState([])
  const {handleCorrect, handleFalse} = useXP()

  const konten = soal
  const PGkepanjangan = konten.pilihanGanda.some((pg) => pg.length > 100)

  useEffect(() => {
    for (let soal in answer) {
      if (answer[soal] && !ternilai.includes(soal)) { //jika jawaban pada soal bener
      csetSkor(cskor + 1)
      setTernilai([...ternilai, soal])
      }
    }
  }, [answer])

  const handleChange = (event) => {
    answers[konten.kode] = event.target.value
    handleAnswer(answers)
    setValue(answers)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    if(value[konten.kode] === undefined){
      return null
    }
    const newJawaban = {...answer}
    const jawaban = konten.jawaban
    if (jawaban === value[konten.kode]) {
      newJawaban[konten.kode] = true
      handleCorrect()
    } else {
      newJawaban[konten.kode] = false
      handleFalse()
    }
    try {
      setAnswers(newJawaban)
      handleAnswered(newJawaban)    
    } catch(e) {
      console.log(e)
    }
  }

  const soalStyle = 'grid grid-cols-1 text-left text-base md:text-xl  xl:text-2xl font-poppins tracking-wide text-ungu-gelap' 

  return (
    <div className='xl:grid xl:grid-cols-2' key={konten.kode}>
      <div className='grid grid-cols-1 items-center'>
        <div className='bg-ungu-terang xl:bg-white px-5 py-8 w-full rounded-md'>
          {konten.kode in answered ? <Slide arrows={false} indicators={true} duration={9999999999} defaultIndex={1} easing='ease' autoplay={false}>
            <div className={`${soalStyle} md:font-semibold`} dangerouslySetInnerHTML={{__html:konten.soal}}/>
            <div className={`${soalStyle} items-center tracking-normal overflow-y-scroll max-h-96`} dangerouslySetInnerHTML={{__html: konten.pembahasan}}/>
          </Slide> : <div className={soalStyle} dangerouslySetInnerHTML={{__html:konten.soal}}/>}
        </div>

        <svg className='xl:hidden' width="36px" height="26px" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 38.5V0H35.5L0 38.5Z" fill="#F2F1FF"/>
        </svg>

        
      <div className='hidden xl:flex justify-self-center'>
          <button 
            className={begin ? 'hidden' : 'block'}
            onClick={handlePrevious}>
              <GrFormPreviousLink size={56}/>
            </button>
          <button 
            className={last ? 'hidden' : 'block'}
            onClick={handleNext}>
              <GrFormNextLink size={56}/>
          </button>
      </div>

      </div>
      <form onSubmit={submitHandler} onChange={handleChange}  value={value[konten.kode]}>
        <div className=' row-span-1 grid grid-cols-1 grid-flow-row gap-4 xl:grid-cols-1 xl:bg-ungu-terang xl:rounded-xl p-5 xl:py-7'>
        {konten.pilihanGanda.map((pg, index) => {
          const abjad = ['A', 'B', 'C', 'D', 'E']
          return (
          <label key={pg}>
          <a 
          className={`flex py-2 md:py-0 flex-row xl:gap-4 items-center border-4 rounded-md xl:bg-white xl:p-2
            ${value[konten.kode] === pg ? 'bg-yellow-300 xl:bg-yellow-300' : ''}
            ${konten.kode in answered ? 
              pg === konten.jawaban ? 'bg-green-500 xl:bg-green-500' : ''
                : ''
              }
            font-poppins text-ungu-teks
            transition duration-300 ease-in-out
            `}>
            <div className='p-2'>
              <p className='bg-gray-200 px-2 xl:px-3 xl:text-md py-1 xl:py-2 rounded-md'>{abjad[index]}</p>
            </div>
            <div 
              className={`text-sm md:${PGkepanjangan ? 'text-base' : 'text-lg'} flex items-center h-full w-full`}>
              <input className='hidden' type='radio' name={'pg'}  key={pg} value={pg} defaultChecked={value[konten.kode] === pg && 'checked'} disabled={Object.keys(answer).includes(konten.kode)}/>
                <span dangerouslySetInnerHTML={{__html:pg}}/>
            </div>
          </a>
          </label>        
          )
        })}
        <div className='pt-5 md:pt-0 flex justify-center'>
          <div className='flex gap-3'>
            <button type='button' className={`${begin ? 'hidden' : 'block'} xl:hidden` } onClick={handlePrevious}>
                <GrFormPreviousLink size={56}/>
              </button>
            { finished ? 
             <button type='button' 
             onClick={() => router.back()}
             className=' bg-ungu-gelap text-white border-2 py-2 px-10 
             rounded-2xl font-poppins text-base'>
               Selesai
             </button>
            :
            <button type='submit' className=' bg-ungu-gelap 
            text-white border-2 py-2 px-10 
            rounded-2xl font-poppins text-base'>
              Jawab
            </button>
            }
              <button type='button' className={`${last ? 'hidden' : 'block'} xl:hidden` } onClick={handleNext}>
                <GrFormNextLink size={56}/>
              </button>
          </div>
        </div>  
        </div>

      </form>
    </div>
  )
}


