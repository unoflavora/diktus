import { Piala } from "../../public/SVGs"
const Umum = () => {
  
  const style = {
    card: 'flex  justify-between items-end xl:items-center p-5 md:py-5 xl:py-8 md:px-5 gap-2 bg-white rounded-2xl',
    item: 'flex flex-col ',
    title: 'font-bold text-lg md:mb-2',
    num: 'text-2xl font-extrabold text-ungu-gelap'
  }

  const predicted = 116
  return(
    <div className='flex flex-col px-5 pt-10 xl:px-14 gap-5 rounded-2xl '>
    <div className='bg-gray-50 py-10 xl:px-24 xl:pt-10 rounded-3xl'>
    <h2 className='font-bold text-xl'>Analisis Umum</h2>
    <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>
    <div className={style.card}>
      <div className={style.item}>
        <h3 className={style.title}>Predicted Score</h3>
        <p className={style.num}>{predicted}</p>
      </div> 
      <Piala width={56} height={56}/>
    </div>
    <div className={style.card}>
      <div className={style.item}>
        <h3 className={style.title}>Target Score</h3>
        <p className={style.num}>{predicted}</p>
      </div> 
      <p>Edit Skor Target</p>
    </div>
    <div className={style.card}>
      <div className={style.item}>
        <h3 className={style.title}>Tanggal Tes</h3>
        <p className='text-gray-500 text-sm'>
          Tentukan target tanggal kamu
        </p>
      </div> 
      <p className='w-full flex justify-end'>Edit Tanggal Tes</p>
    </div>
    </div>
    </div>
   
    </div>
  )
}

export default Umum