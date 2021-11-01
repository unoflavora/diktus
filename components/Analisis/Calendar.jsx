import Calendar from 'react-calendar';
import moment from 'moment';
import React, { useState } from 'react';

export default function Calendars({metadata}) {
  const [value, onChange] = useState(new Date());
    
  return (
    <div className='bg-gray-50 px-5 flex flex-col gap-5 h-full lg:px-14 md:bg-white'>
      <h1 className='font-bold text-xl'>Study Record</h1>
        <ul className='flex flex-row flex-wrap gap-5'>
          <li className='rounded-full border-2 bg-white flex items-center gap-2 px-3'>
            <div className='h-4 w-4 rounded-full bg-ungu-cal'/>
            Tanggal Tryout
          </li>

          <li className='rounded-full border-2 bg-white flex items-center gap-2 px-3'>
            <div className='h-4 w-4 rounded-full bg-ungu-gelap'/>
            Tanggal Tes
          </li>

          <li className='rounded-full border-2 bg-white flex items-center gap-2 px-3'>
            <div className='h-4 w-4 rounded-full bg-ungu-terang'/>
            Hari ini
          </li>
        </ul>
      <div className='p-5 border-2 rounded-2xl bg-white'>
        <Calendar
          onChange={onChange}
          minDetail='year'
          prevLabel='<--'
          nextLabel='-->'

          next2Label={''}
          prev2Label={''}
          tileClassName={({ date, view }) => {
            const dates = moment(date).format("DD-MM-YYYY")
            if(Object.keys(metadata['mark']).find(x=>x===dates)){
            return 'bg-ungu-cal text-white rounded-full h-10 w-10'
            } else if (dates ===  moment(value).format("DD-MM-YYYY")){
              return 'bg-ungu-terang rounded-full h-10 w-10'
            } else if (dates ===  moment(metadata.tes).format("DD-MM-YYYY")){
              return 'bg-ungu-gelap text-white rounded-full h-10 w-10'
            } else {
              return 'h-10 w-10'
            }
          }}    
      
          tileDisabled={({ date }) => date.getDay() === 0}
      
          /*maxDate={new Date(2020, 1, 0)}</div>*/
          minDate={
            new Date()
          }
      
        />
      </div>
    </div>

    
  );
}