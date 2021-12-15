import { Physics, Paragraph, NoteBlock } from '../../public/SVGs'
import Math from '../../public/assets/math.svg'
import Kimia from '../../public/assets/kimia.svg'
import Biologi from '../../public/assets/biologi.svg'
import TPS from '../../public/assets/TPS.svg'
import Link from 'next/link'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer/Footer'
const base = 'font-poppins flex items-center border-2 rounded-xl gap-2 p-5'


const matpels = {
  'Matematika': <Math/>,
  'Kimia': <Kimia/>,
  'Biologi': <Biologi/>,
  'Fisika': <Physics/>,
}

export default function HomeMateri() {
  return(
  <div className='overflow-hidden'>
  <Navbar/>
  <div className='p-10 xl:p-44 xl:pt-20 rounded-3xl w-full'>
    <h2 className='font-bold text-center text-2xl lg:text-4xl xl:text-5xl pb-5 xl:pb-20'>
      Pilih Mata Pelajaran
    </h2>
    <div className='flex flex-col sm:grid sm:grid-cols-3 sm:grid-rows-1 gap-5'>
    {Object.keys(matpels).map(matpel => {
      return (
        <Link href={`/latihan/${matpel.toLowerCase()}`}>
        <a className={`${base} hover:bg-purple-100 sm:flex-col sm:text-center sm:gap-5`}>
            <div className='w-1/3'>
                <a></a>
                {matpels[matpel]}
            </div>
            <h3 className='font-semibold text-lg xl:text-2xl'>{matpel}</h3>
        </a>
      </Link>
      )
    })}
   

   
    </div>        
  </div>

  <Footer/>
  </div>
   
  )
}
