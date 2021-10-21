import { Physics, Paragraph, NoteBlock } from '../../public/SVGs'

const base = 'font-poppins flex items-center border-2 rounded-xl gap-2 p-5'

export default function Materi() {
  return(
    <div className='p-10 xl:p-44 xl:pt-20 rounded-3xl'>
    <h2 className='font-bold text-center text-2xl lg:text-4xl xl:text-5xl pb-5 xl:pb-20'>Mata Pelajaran</h2>
    <div className='flex flex-col sm:grid sm:grid-cols-3 sm:grid-rows-1 gap-5'>
      <div className={`${base} sm:flex-col sm:text-center sm:gap-5`}>
          <div className='w-1/3'>
            <Physics/>
          </div>
          <h3 className='font-semibold text-lg xl:text-2xl'>Sains & Teknologi (Saintek)</h3>
      </div>
      <div className={`${base} sm:flex-col sm:justify-center sm:items-center sm:text-center`}>
          <div className='w-1/3 ml-4 sm:ml-3 lg:ml-14'>
            <Paragraph/>
          </div>
          <h3 className='font-semibold text-lg xl:text-2xl -ml-4 md:ml-0'>Sosial & Humaniora (Soshum)</h3>
      </div>
      <div className={`${base} sm:flex-col sm:text-center sm:gap-3 `}>
          <div className='w-1/5 ml-2 md:ml-0 sm:w-1/3'>
            <NoteBlock/>
          </div>
          <h3 className='font-semibold text-lg xl:text-2xl ml-2'>Campuran</h3>
      </div>
    </div>        
  </div>
  )
}