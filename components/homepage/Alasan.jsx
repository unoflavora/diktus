import {BulatHalf, LightBulb, UserMinus, Trophy} from '../../public/SVGs'
import Poin from './Poin'

export default function Alasan() {
  return(
    <div className='relative px-10 lg:py-20 xl:px-64 xl:pt-20 pb-5'>
        <div className='w-full pt-5 flex justify-around md:items-end'>
          <h1 className='w-3/4 font-poppins text-2xl lg:text-5xl font-bold sm:text-center md:w-full'>
            Mengapa menggunakan <span className='text-ungu-gelap font-sniglet tracking-widest'>diktus</span>?
          </h1>
          <div className='w-1/3 sm:w-16 sm:top-0 md:w-14 sm:absolute sm:left-10 sm:transform sm:-rotate-45 lg:top-14 lg:w-24 xl:w-44 xl:-rotate-45'>
            <BulatHalf/>
          </div>
        </div>
        <p className='font-poppins py-3 leading-relaxed text-base xl:mt-5 lg:text-xl'>
          <span className='text-ungu-gelap font-sniglet tracking-widest'>diktus</span>  Membantu kamu melakukan latihan soal UTBK dengan analisis <b>per-materi</b>, 
          sehingga kamu tahu apa kekurangan yang bisa kamu perbaiki. Karena belajar saja <b>tidak akan cukup</b>. Kamu harus latihan dengan teratur dan terarah. 
        </p>
        <div className='flex md:gap-10'>
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
          <div className='flex flex-col items-start justify-between py-5 md:w-1/3 xl:w-3/4'>
            <div className='hidden md:block w-full h-3/4 border-2 border-gray-500 rounded-xl'>
            </div>
            <div class='flex w-full h-item items-center justify-center'>
              <button className='hidden md:block py-3 w-full lg:w-10/12 xl:w-1/2 font-poppins rounded-full bg-ungu-gelap text-white text-2xl'>
                Mulai Sekarang
              </button>
            </div>

          </div>
        </div>
       
      </div>
  )
}