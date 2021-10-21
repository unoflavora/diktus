export default function Header({matpel}) {
  return(
    <div className='w-full flex font-bold font-poppins flex-col items-center justify-center gap-3 bg-ungu-terang rounded-b-3xl py-6'>
      <h1 className='xl:text-xl'>Latihan Soal</h1>
      <h2 className=' text-4xl xl:text-6xl tracking-wide text-ungu-gelap'>{matpel.toUpperCase()}</h2>
      <div className='lg:flex text-center xl:text-lg'>
        <h3 className='font-semibold pb-3 lg:p-0 lg:pr-3'>SBMPTN</h3>
        <h3 className='font-semibold border-t-2 lg:border-t-0 lg:border-l-2 pt-3 lg:p-0 lg:pl-3 border-gray-400'>UTBK 2022</h3>
      </div>
    </div>
  )
}