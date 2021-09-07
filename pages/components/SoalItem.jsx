import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
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

  const submitHandler = () => {
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

  console.log(konten)
  
  const CurrentSkor = () => {
    return (
      <div>
        skor = {cskor}
      </div>
    )
  }

  return (
    <div key={konten.name}>
      <h1>{konten.materiUmum}</h1>
      <div dangerouslySetInnerHTML=
        {{__html:documentToHtmlString(konten.soal.content[0])
        }} />
      <br/>
      <FormControl component="fieldset">
      <FormLabel component="legend">Jawaban</FormLabel>
        <RadioGroup aria-label="jawaban" name="jawaban" value={value[konten.name]} onChange={handleChange}>
          {konten.pilihanGanda.map(pg => {
            return (<FormControlLabel key={pg} value={pg} control={<Radio/>} disabled={Object.keys(answer).includes(konten.name)} label={pg}/>)
          })}
        </RadioGroup>
        <button type='submit' onClick={submitHandler}>Submit</button>
      </FormControl>
      <br/>
      {konten.name in answer &&
       <div dangerouslySetInnerHTML=
       {{__html:documentToHtmlString(konten.pembahasan.content[0])
       }} />}
       <div>
         <CurrentSkor />
       </div>
    </div>
  )
}


