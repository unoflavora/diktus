import { MobileTrack, Line, BulatHalf } from "../../public/SVGs"
import Link from "next/link"

const NavMobile = (props) => {
  return(
    <div className='absolute top-11 -left-6 py-10 bg-gray-50 max-h-screen w-screen rounded-2xl'>
      <div className='relative flex items-center text-ungu-gelap text-4xl font-poppins font-semibold'>
        <div className='grid grid-cols-1 grid-rows-2 w-full'>
          <div className='grid grid-rows-1 grid-cols-2'>
            <div className='px-5 flex flex-col gap-10'>
              {props.user ?
                  <p>Hi {props.user.nickname}!</p> :
                  <Link href={`/api/auth/login?returnTo=${props.url}`}>
                    <a>Masuk</a>
                  </Link>
              }
            </div>
            <div className='relative justify-self-end h-full w-full'>
              <div className='absolute h-full w-2/3 top-28 z-10'>
                <BulatHalf/>
              </div>
               <div className='absolute h-full w-full'>
                 <Line/>
               </div>
            </div>
          </div>

          <div className='relative grid grid-rows-1'>
            <div className='w-1/3 self-center'>
              <MobileTrack/>
            </div>
            <div className='px-5 absolute justify-self-end h-full flex flex-col gap-10 justify-center items-end'>
              <a href='/'>Beranda</a>
              <a href='/'>Tes</a>
              <a href='/'>Analisis</a>
              <a href='/'>Dashboard</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavMobile