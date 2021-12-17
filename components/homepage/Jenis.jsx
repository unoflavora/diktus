import { ClipBoard, Book, Cube, Vector, LineXL } from '../../public/SVGs'
import Poin from './Poin'
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function Jenis() {
  const router = useRouter()
  return(
    <div className='relative w-screen overflow-hidden bg-gray-50 rounded-3xl'>
      <div className='px-10 p-10 md:py-10 lg:py-24 xl:px-44 xl:py-44'>
        <h2 className='relative block z-20 text-center font-bold font-poppins text-2xl lg:text-4xl xl:text-5xl'>
          <span className=' text-ungu-gelap font-sniglet tracking-widest'>diktus </span>
          memiliki berbagai jenis latihan yang menarik:
        </h2>
        <div className='hidden md:block right-0 top-0 z-0 bg-white absolute rounded-tl-full w-1/2 h-full'>
        </div>
        <div className='relative pt-14 pb-2 font-poppins 2xl:px-14
        flex flex-col gap-14
        md:grid md:grid-cols-3 md:grid-rows-1 md:gap-8 2xl:gap-10'>
          <div className='hidden xl:block absolute -top-64 -left-40'>
            <LineXL/>
          </div>
          <div className='hidden xl:block absolute  -right-48'>
            <LineXL/>
          </div>
          <div className='absolute -left-10 -top-10 xl:hidden'>
            <Vector/>
          </div>
          <div className='absolute -right-10 -bottom-5 xl:hidden transform -rotate-45'>
            <Vector/>
          </div>
          <a href='/tryout'>
            <Poin fitur
              poin='Try-Out UTBK'
              desc='Lakukan simulasi ujian penuh untuk mengukur kemampuan kamu saat ini'
              icon={<ClipBoard/>}
            />
          </a>
          <Link href='/latihan'>
            <a>
              <Poin fitur
                poin='Latihan UTBK'
                desc='Mantapkan pemahaman kamu dalam mata pelajaran dengan kumpulan ribuan soal'
                icon={<Book/>}
              />
            </a>
          </Link>
         
            <Poin fitur
              poin='Pop Quiz'
              desc='Uji kemampuan UTBK kamu dalam 5 pertanyaan dalam waktu singkat'
              icon={<Cube/>}
            />
        </div>
      </div>
    </div>
  )
}