import { MobileTrack, Lines, Wisuda } from "../../public/SVGs"

export default function Header() {
  return(
    <div className='relative bg-gray-50 overflow-hidden'>
      <div class='absolute top-4 lg:top-24 w-1/12 lg:w-32'>
        <MobileTrack/>
      </div>
      <div class='absolute -right-20 top-32 md:top-20 h-1/2 w-1/2'>
        <Lines/>
      </div>
      <div className='px-10 lg:px-24 2xl:px-44 pt-10'>
        <div className='grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 gap-5 lg:gap-10 lg:items-center h-auto '>
          <div className=''>
          <p className='font-poppins font-bold text-gray-700 text-4xl lg:text-6xl lg:tracking-wide'>
            Latih kemampuan kamu di UTBK
          </p>
          <div className='flex flex-col gap-5 lg:mt-5'>
            <p className='px-2 border-l-4 font-poppins font-semibold tracking-wide text-base lg:text-2xl'>
              Kami akan membantu kamu untuk lebih siap menghadapi UTBK
            </p>
            <button className='w-1/2 p-3 xl:w-1/3 xl:p-3 rounded-full bg-ungu-gelap text-white font-poppins text-sm lg:text-xl'>
              Mulai Gratis
            </button>
          </div>
        </div>
          <div>
            <Wisuda/>
          </div>
      </div>
    </div>
  </div>
  )
}