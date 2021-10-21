import Logo from '../Logo'
import {Send, Instagram, Twitter} from '../../public/SVGs'

const titles = ['Company', 'Support']

const items = {
  Company: ['Tentang Kami', 'Blog', 'Hubungi Kami', 'Harga', 'Testimonial'],
  Support: ['Bantuan Guru', 'Forum','Ketentuan Penggunaan', 'Privacy Policy']
}

export default function Footer() {
  return (
    <div className='bg-gray-100 py-10 px-10 xl:grid xl:grid-cols-3'> 
      <div className='flex flex-col gap-5 xl:ml-44'>
      <Logo/>
      <div className='hidden xl:flex flex-col gap-2 font-poppins Copyright'>
          <p>Copyright © 2021 diktus.</p>
          <p>All rights reserved</p>
      </div>
      </div>
      
      <div className='font-poppins flex flex-col gap-5 md:grid md:grid-cols-4 md:grid-rows-1 md:gap-0 xl:col-span-2'>
        {titles.map(title => (
          <div key={title}>
            <h2 className='font-semibold py-5 text-xl'>{title}</h2>
            <div className='flex flex-col gap-3 text-lg'>
              {items[title.toString()].map(item => (<h3>{item}</h3>))}
            </div> 
          </div>
        ))} 
        <div className='lg:ml-20 col-span-2 xl:flex xl:flex-col xl:gap-5'>
          <h2 className='font-semibold pt-5 text-xl'>
            Stay up to date
          </h2>
          <form className='flex flex-row bg-gray-200 font-poppins text-black w-3/4'>
            <input type='text' className='bg-gray-200 py-3 pl-3 w-3/4' placeholder='Email Anda'/>
            <div className='flex justify-center xl:justify-end xl:mr-5 items-center w-1/4'>
              <button type='submit' className='w-1/3 xl:w-1/5 h-1/3 md:h-1/2'>
                <Send/>
              </button>
            </div>
          </form>
          <div className='Company-Info mt-5'>
            <div className='grid grid-cols-3 grid-rows-1 gap-5 w-1/2 md:w-1/3 xl:w-1/3 place-items-center'>
              <Instagram/>
              <Twitter/>
            </div>
            <div className='xl:hidden flex flex-col mt-5 gap-2 font-poppins Copyright'>
              <p>Copyright © 2021 diktus.</p>
              <p>All rights reserved</p>
            </div>
        </div>     
      </div> 
    </div>
  </div>
  )
}