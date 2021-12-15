import { useState } from 'react';
import Radar from './materi/Radar';

const Rata = ({listMateri}) => {
  const matpel = Object.keys(listMateri)
  const [view, setView] = useState('Biologi')

  return(
    <div className='px-5 xl:px-14 py-5 xl:py-0 bg-gray-50 xl:bg-white pb-5 lg:py-10 font-poppins flex flex-col gap-2'>
      <div className='bg-gray-50 lg:px-10 xl:px-24 xl:py-14 rounded-2xl xl:flex flex-col xl:gap-5'>
        <div className='flex justify-between w-full'>
        <h1 className='font-bold text-xl'>Skor Per Materi</h1>
          <div className='flex gap-2'>
          <p className='bg-white rounded-full xl:px-4 text-lg xl:text-base mb-1 flex  items-center gap-1 px-2 py-1 border-2'>
            <div className='w-3 h-3 rounded-full bg-ungu-gelap'/>
            Nilai
          </p>

          </div>
        </div>
        <div className='w-full overflow-x-auto'>

          <div className='w-full flex flex-col flex-wrap gap-5 overflow-x-auto'>
            <nav className='md:hidden'>
                <ul className='flex gap-10'>
                  {matpel.map(matpel => 
                    <li className={`py-2 px-4 ${view === matpel ? 'text-ungu-gelap font-semibold border-b-2 border-ungu-gelap': ''}`} key={matpel}>{matpel}</li>
                  )}
                </ul>
            <div className='md:hidden h-graph-s pt-10 pb-5 md:px-10 border-2 bg-white w-full md:w-5/6 xl:w-full md:rounded-2xl'>
              <Radar matpel={view} listMateri={listMateri}/>
            </div>
            </nav>
           
            <nav className='px-3 hidden md:flex w-full border-2 rounded-2xl bg-white'>
                  <ul className='flex flex-col items-center gap-5 py-5'>
                    {matpel.map(matpel => 
                      <button 
                        onClick={() => setView(matpel)}
                        className={` text-lg ${view === matpel ? 'text-ungu-gelap font-semibold border-b-2 border-ungu-gelap xl:border-0': ''}`} key={matpel}>{matpel}</button>
                    )}
                  </ul>
                  <div className='md:block h-graph-s pt-10 pb-5 md:pl-10 bg-white w-full md:rounded-2xl'>
                <Radar matpel={view} listMateri={listMateri}/>
            </div>
              </nav>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Rata