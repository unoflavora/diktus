import Link from 'next/link'
import MobileContent from './Mobile'
import useOutsideDetector from '../hooks/outsideDetector'
import { useUser } from '@auth0/nextjs-auth0'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { IconContext } from "react-icons";
import { useState, useRef } from "react";
import { useRouter } from 'next/router'
import { useXP } from '../Context/XpContext'


export default function Navbar(props) {
  const [show, setShow] = useState(false)
  const [setting, showSetting] = useState(false)
  const {user} = useUser()
  const {xp} = useXP()
  const wrapperRef = useRef(null);
  const router = useRouter()

  useOutsideDetector(wrapperRef, () => showSetting(false))


  return(
    <div className='sticky z-50 top-0 p-2 px-6 xl:py-4 xl:px-32 xl:text-xl  bg-white'>
    <nav className='relative xl:px-10 w-full'>
      <div className='flex items-center justify-between'>
      <Link href='/'>
          <a className='font-sniglet text-3xl  lg:text-4xl tracking-wider text-ungu-gelap'>
            diktus
          </a>
      </Link>

        <div className='hidden md:flex flex-row font-poppins items-center lg:text-lg text-xl gap-8 pl-10'>
          <p>Latihan</p>
          <Link href='/analisis'>
            <a>Analisis</a>
          </Link>
          <p>Harga</p>
          <div className='border-l-2 border-gray-300'>
            <div className=' flex flex-row items-center gap-1 px-8 '>
            {user ?  
            <div className='flex gap-2 items-center'>
                <div className='hidden bg-ungu-terang rounded-2xl p-2 px-3 lg:block font-poppins'>
                    {user ? `${xp}XP` : null}
                </div>
              <button 
                onClick={() => showSetting(!setting)}
                className='relative text-lg rounded-full flex flex-row gap-3 items-center hover:bg-purple-200 bg-ungu-terang text-ungu-gelap p-1 px-4'>
                  <div ref={wrapperRef} className={`${setting ? 'opacity-100' : 'opacity-0'}
                     transition-opacity
                     absolute left-0 -bottom-24 rounded-2xl  
                     flex flex-col items-center
                     bg-white border-2  text-ungu-gelap`}>
                    <p className='w-full h-full py-2 px-10 rounded-t-2xl  hover:bg-purple-200'>Profile</p>
                    <p onClick={() => router.push('/api/auth/logout')}
                      className='w-full h-full py-2 px-10 rounded-b-2xl hover:bg-purple-200'>Logout</p>
                  </div> 
                  <div className='rounded-full w-10 h-10 border-2'>
                    <img className='rounded-full' src={user.picture}/>
                  </div>
                {user.userProfile}
                  <div className='font-poppins'>
                    {user.nickname}
                  </div>
                </button>
 
              </div>
              :
              <div className='flex flex-row items-center gap-10'>
                <div className='py-4 md:py-2 px-8  font-poppins text-white bg-ungu-gelap rounded-full'>
                <Link href='/api/auth/login'>
                    <a>Masuk</a>
                  </Link>
                </div>
              </div>
            }   
                   
            </div>

          </div>
        </div>
        <div className='md:hidden'>
          <IconContext.Provider value={{className:'text-ungu-gelap', size:'1.7em' }}>
            <div className='rounded-full'>
              <button onClick={() => setShow(!show)}>
                {show ? <AiOutlineClose/> : <GiHamburgerMenu/>}
              </button>
            </div>
          </IconContext.Provider>
        </div>
      </div>
      <div className={`transition duration-300 ease-in-out ${show ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        {user? <MobileContent user={user} url={props.url || '/'}/> : <MobileContent/>}
      </div>
    </nav>
    </div>
  )
}