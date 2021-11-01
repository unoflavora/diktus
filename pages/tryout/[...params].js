import Navbar from "../../components/navbar/Navbar"
import { useRouter } from "next/router"
import { BiTime } from "react-icons/bi"
import {AiOutlinePauseCircle} from "react-icons/ai"
import {RiRestTimeLine} from 'react-icons/ri'
export default function Ketentuan() {
  const router = useRouter()
  const { params } = router.query

  const listAturan = [
    {
      title: 'Waktu Pengerjaan',
      text: 'Waktu Pengerjaan TPS adalah 105 menit sedangkan TKA 90 Menit',
      icon: <BiTime size={40} color={'white'}/>
    },
    {
      title: 'Tidak Ada Pause',
      text: 'Namun diperkenankan selesai lebih cepat',
      icon: <AiOutlinePauseCircle size={40} color={'white'}/>
    },
    {
      title: 'Ada Waktu Istirahat',
      text: 'Ada waktu istirahat selama 15 menit diantara TPS dan TKA',
      icon: <RiRestTimeLine size={40} color={'white'}/>
    }
  ]

  return(
    <div className='font-poppins'>
      <Navbar/>
      <h1 className='w-full p-5 py-10 text-ungu-gelap text-center text-2xl font-bold'>
        Ketentuan Tryout UTBK  {new Date().getFullYear() + 1} Diktus
      </h1>
      <ul className='grid grid-cols-1 grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-5'>
      {listAturan.map((list, index) => 
          <div className='border-2 mx-5 rounded-xl p-5 grid grid-cols-4 gap-3 place-items-center'>
            <div className='bg-ungu-cal rounded-lg col-span-1 h-full w-full flex items-center justify-center'>
              {list.icon}
            </div>
            <div className='flex flex-col col-span-3 text-center gap-2'>
              <h2 className='font-semibold text-xl'>{list.title}</h2>
              <p className='text-base text-gray-400'>{list.text}</p>
            </div>
          </div>
      )}
      </ul>
      <div className='w-full flex items-center justify-center my-8'>
        <button className='px-10 py-4 rounded-2xl bg-ungu-gelap text-white text-xl'>
          Mulai Sekarang
        </button>
      </div>
    </div>
  )
}