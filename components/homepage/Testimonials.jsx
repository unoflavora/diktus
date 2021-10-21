import { CircleLines } from "../../public/SVGs"

export default function Testimonials() {
  return(
    <div className='bg-gray-50 pt-36 pb-16 flex justify-center items-center'>
      <div className='relative px-10 font-poppins flex flex-col justify-center items-center'>
        <div className='-top-44 md:-top-44 lg:-top-56 xl:w-1/5 xl:-top-36 z-0 absolute w-full md:w-1/2'>
            <CircleLines/>
        </div>
        <div className='z-10 bg-white p-8 w-full lg:w-5/12 lg:text-lg xl:text-xl flex flex-col justify-center items-center gap-5  text-center rounded-3xl'>
          <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.4278 1.16C20.1158 0.631999 17.6558 1.256 16.0478 3.032C14.4398 4.808 13.6358 7.424 13.6358 10.88V20.672H23.4278V10.88H18.3878C18.1238 9.152 18.3638 7.748 19.1078 6.668C19.8758 5.588 21.1238 5.12 22.8518 5.264L23.4278 1.16ZM10.3958 1.16C7.08375 0.631999 4.62375 1.256 3.01575 3.032C1.40775 4.808 0.60375 7.424 0.60375 10.88V20.672H10.3958V10.88H5.35575C5.09175 9.152 5.33175 7.748 6.07575 6.668C6.84375 5.588 8.09175 5.12 9.81975 5.264L10.3958 1.16Z" fill="#2EC5CE"/>
          </svg>
          <p>We had an incredible experience working with Landify and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the product concept so quickly.</p>
        </div>
        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.2559 0.885498H1.74411C0.971643 0.885498 0.490861 1.72404 0.881102 2.39069L8.63699 15.6401C9.02319 16.2998 9.97681 16.2998 10.363 15.6401L18.1189 2.39068C18.5091 1.72404 18.0284 0.885498 17.2559 0.885498Z" fill="#FFFFFF"/>
        </svg>
        <div className='py-5 -mr-5 flex w-full md:w-1/2 justify-center gap-5'>
          <div className='rounded-full border-2 border-gray-400 bg-gray-50 h-12 w-12 xl:h-16 xl:w-16'></div>
          <div className='flex flex-col'>
            <h3 className='font-semibold text-xl xl:text-2xl'>Jane Cooper</h3>
            <p className='text-base xl:text-xl'>Siswa SMAN 8 Bandung</p>
          </div>
        </div>
      </div>
  </div>
  )
}