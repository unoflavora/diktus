import {BulatHalf, LightBulb, UserMinus, Trophy} from '../../public/SVGs'
import Poin from './Poin'

export default function Alasan() {
  return(
    <div className='relative bg-gray-50 px-10 lg:px-14 lg:py-20 xl:px-64 xl:pt-36 pb-5'>

      <div className='flex flex-col md:flex-row md:gap-10 xl:gap-36'>
        <div className='flex flex-col justify-center md:gap-5 py-5 xl:gap-5 md:w-3/4 xl:w-3/4'>
          <div className='w-full pt-5 flex justify-center items-center md:items-end'>
          <div className='w-3/4  md:w-full'>
          <h1 className='font-poppins text-base md:text-xl font-semibold sm:text-center lg:text-left lg:text-5xl leading-10 '>
            Mengapa menggunakan <span className='text-ungu-gelap font-sniglet tracking-widest'>diktus</span>?
          </h1>
          </div>
        
          <div className='w-1/3 sm:w-16 sm:top-0 md:w-14 sm:absolute sm:left-0 
          xl:left-36 sm:transform sm:-rotate-45 md:top-10 lg:top-14 lg:w-24 xl:w-44 xl-rotate-12'>
            <BulatHalf/>
          </div>
          </div>
          <p className='font-poppins leading-relaxed text-base xl:mt-5 lg:text-xl'>
          belajar saja tidak akan cukup. Kamu harus latihan dengan teratur dan terarah. 
          </p>
            <div class='flex w-full h-item items-center justify-center'>
              <button className='hidden md:block py-3 w-full md:w-1/2 md:text-lg lg:w-10/12 xl:w-1/2 font-poppins rounded-full bg-ungu-gelap text-white text-2xl'>
                Mulai Sekarang
              </button>
            </div>

      </div>
        <div className='py-5 font-poppins flex flex-col gap-5 md:w-2/3'>
          <Poin
            keuntungan
            poin='Analisis akurat'
            desc='Kemampuan kamu diuji dengan analisis per-materi, sehingga kemampuanmu diukur lebih akurat.'
            icon={<LightBulb/>}
          />
          <Poin
            keuntungan
            poin='Penilaian akurat'
            desc='Hasil tes kamu akan dinilai seperti penilaian UTBK yang sesungguhnya.'
            icon={<UserMinus/>}
          />
          <Poin
            keuntungan
            poin='Belajar sambil bermain'
            desc={`Ayo seringlah berlatih di diktus dan dapatkan hadiahnya!`}
            icon={<Trophy/>}
          />
        </div>

      </div>
       
      </div>
  )
}