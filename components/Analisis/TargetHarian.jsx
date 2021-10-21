import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";

const Tujuan = () => {
  const TryOut = '1 Minggu Lagi'
  const Latihan = '4 Bab Lagi'
  const PopQuiz = '1 Pop Quiz'
  const TO = 60;

  const style = {
    card: 'flex  justify-between items-end xl:items-center p-5 md:py-5 xl:py-8 md:px-5 gap-2 bg-white rounded-2xl',
    item: 'flex flex-col',
    title: 'font-bold text-lg',
    num: 'text-gray-500 text-sm'
  }

  return(
    <div className='flex flex-col px-5 xl:px-14 gap-5 rounded-3xl py-10 xl:py-0 xl:pb-10 '>
    <div className='bg-gray-50 xl:px-24 xl:py-10 rounded-3xl'>
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
        value={TO}
        strokeWidth={10}
        text={`${TO}%`}
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
          value={TO}
          strokeWidth={10}
          text={`${TO}%`}
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