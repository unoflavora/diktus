import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import {useState, useEffect} from 'react'

export default function SoalItem({soal, answers, handleAnswer, answered, handleAnswered}) {
  const [value, setValue] = useState(answers)
  const [answer, setAnswers] = useState(answered)
  const [cskor, csetSkor] = useState(0)
  const [ternilai, setTernilai] = useState([])

  useEffect(() => {
    for (let soal in answer) {
      if (answer[soal] && !ternilai.includes(soal)) { //jika jawaban pada soal bener
      csetSkor(cskor + 1)
      setTernilai([...ternilai, soal])
      }
    }
    console.log(cskor)
  }, [answer])

  const konten = soal.fields

  const handleChange = (event) => {
    answers[konten.name] = event.target.value
    handleAnswer(answers)
    setValue(answers)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    const newJawaban = {...answer}
    const jawaban = konten.jawaban[0]
    if (jawaban === value[konten.name]) {
      newJawaban[konten.name] = true
    } else {
      newJawaban[konten.name] = false
    }
    setAnswers(newJawaban)
    handleAnswered(answer)
  }
  
  const CurrentSkor = () => {
    return (
      <div>
        skor = {cskor}
      </div>
    )
  }


  return (
    <div key={konten.name}>

      <h1 className='text-xl font-semibold'>{konten.materiUmum}</h1>
      <div className='text-2xl' dangerouslySetInnerHTML=
        {{__html:documentToHtmlString(konten.soal.content[0])
        }} />

      <div>
      <form onSubmit={submitHandler} onChange={handleChange}  value={value[konten.name]}>
        {konten.pilihanGanda.map(pg => {
          return (
          <div className='text-xl'>
          <label>
            <input type='radio' name={'pg'}  key={pg} value={pg} checked={value[konten.name] === pg && 'checked'} disabled={Object.keys(answer).includes(konten.name)}/>
              {pg}
          </label>
          </div>
          )
        })}
        <button type='submit' className='border-2'>Submit</button>
      </form>
      </div>

      <div>
      {konten.name in answer &&
       <div dangerouslySetInnerHTML=
       {{__html:documentToHtmlString(konten.pembahasan.content[0])
       }} />}
      </div>

       <div>
         <CurrentSkor />
       </div>
    </div>
  )
}


