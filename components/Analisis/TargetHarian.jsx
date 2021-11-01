import moment from 'moment';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";

const TARGETTRYOUT = 7
const TARGETLATIHAN = {
  'low': 5,
  'med': 4,
  'high': 3,
}


const Tujuan = ({metadata}) => {
  const target = metadata.today
  const score = (metadata.target - metadata.skor) / 100

  const to = moment().diff(moment(target.TryOut, 'DD-MM-YYYY'), 'days') 
  const latihan = score < 25 ? 2 : 
                  score > 25 && score < 50 ? TARGETLATIHAN.high :
                  score > 50 && score < 75 ? TARGETLATIHAN.med :
                  TARGETLATIHAN.low
  const popquiz =  moment().diff(moment(target.PopQuiz, 'DD-MM-YYYY'), 'days') > 1 ? 0 : 1


  const TryOut =  to > TARGETTRYOUT ? 'Ayo Kerjakan' : `Selesai! Kerjakan TO ${7-to} Hari Lagi`
  const Latihan =  latihan - target.Latihan.value === 0 ? 'Selesai, Kerjakan Lagi Besok Ya!' : `${latihan - target.Latihan.value} Bab Lagi`
  const PopQuiz = popquiz < 1 ? 'Ayo Kerjakan 1 Popquiz Per Hari' : 'Selesai! Kerjakan lagi hari esok ya'

  const TO = to > TARGETTRYOUT ? 0: 100
  const LATIHAN = target.Latihan.value/latihan * 100
  const POPQUIZ = popquiz / 1

  const style = {
    card: 'flex  justify-between items-end xl:items-center p-5 md:py-5 xl:py-8 md:px-5 gap-2 bg-white rounded-2xl',
    item: 'flex flex-col',
    title: 'font-bold text-lg',
    num: 'text-gray-500 text-sm'
  }

  return(
    <div className='flex flex-col bg-gray-50 xl:bg-white px-5 xl:px-14 gap-5 rounded-3xl py-10 xl:py-0 xl:pb-10 '>
    <div className=' xl:bg-gray-50 xl:px-24 xl:py-10 rounded-b-3xl'>
    <h2 className='font-bold text-xl'>Target Hari Ini</h2>
    <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>
    <div className={style.card}>
      <div className={style.item}>
        <h3 className={style.title}>Try Out</h3>
        <p className={style.num}>{TryOut}</p>
      </div> 
    <div className='w-16 h-16'>
      <CircularProgressbar
      styles={buildStyles({
        pathColor: "#2F2B71",
      })}
       strokeWidth={10} value={TO} text={`${TO}%`} />;
    </div>
    </div>
    <div className={style.card}>
      <div className={style.item}>
        <h3 className={style.title}>Latihan</h3>
        <p className={style.num}>{Latihan}</p>
      </div> 
      <div className='w-16 h-16'>
      <CircularProgressbar
        value={LATIHAN}
        strokeWidth={10}
        text={`${LATIHAN}%`}
        styles={buildStyles({
          pathColor: "green",
        })}
      />
      </div>
    </div>
    <div className={style.card}>
      <div className={style.item}>
        <h3 className={style.title}>Pop Quiz</h3>
        <p className={style.num}>{PopQuiz}</p>
      </div> 
      <div className='w-16 h-16'>
        <CircularProgressbar
          value={POPQUIZ}
          strokeWidth={10}
          text={`${POPQUIZ}%`}
          styles={buildStyles({
            pathColor: "orange",
          })}
        />
      </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Tujuan