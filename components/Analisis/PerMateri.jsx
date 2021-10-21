import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { useState } from 'react';
import Biologi from './materi/Biologi';

const matpel = {
  'Biologi' : <Biologi/>
}
const Rata = () => {
  const [view, setView] = useState('Biologi')

  return(
    <div className='px-5 xl:px-14 pb-5 font-poppins flex flex-col gap-2'>
      <div className='bg-gray-50 xl:px-24 xl:py-14 rounded-2xl xl:flex flex-col xl:gap-5'>
        <div className='xl:flex justify-between w-full'>
        <h1 className='font-bold text-xl'>Skor Per Materi</h1>
          <div className='flex gap-2'>
          <p className='bg-white rounded-full xl:px-4 text-sm xl:text-base mb-1 flex  items-center gap-1 px-2 py-1 border-2'>
            <div className='w-3 h-3 rounded-full bg-ungu-gelap'/>
            Nilai
          </p>

          </div>
        </div>
        <div className=''>
          <nav className='md:hidden'>
              <ul className='flex gap-10'>
                {Object.keys(matpel).map(matpel => 
                  <li className={`py-2 px-4 ${view === matpel ? 'text-ungu-gelap font-semibold border-b-2 border-ungu-gelap': ''}`} key={matpel}>{matpel}</li>
                )}
              </ul>
          </nav>
          <div className='w-full flex gap-5 overflow-x-auto'>
          <nav className='px-3 hidden md:flex xl:px-8 border-2 rounded-2xl bg-white'>
                <ul className='flex gap-10'>
                  {Object.keys(matpel).map(matpel => 
                    <li className={`py-2 px-4 ${view === matpel ? 'text-ungu-gelap font-semibold border-b-2 border-ungu-gelap xl:border-0': ''}`} key={matpel}>{matpel}</li>
                  )}
                </ul>
            </nav>
            <div className='h-96 pt-10 pb-5 md:px-10 border-2 bg-white w-graph-s md:w-5/6 xl:w-full md:rounded-2xl'>
              {matpel[view]}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Rata