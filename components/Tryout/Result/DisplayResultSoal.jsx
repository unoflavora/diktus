import { useLayoutEffect } from 'react';

export default function DisplayResultSoal(props) {
  useLayoutEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image"
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, [props.soal]);


    return(
      <>
      <div className='font-semibold lg:text-xl' dangerouslySetInnerHTML={{__html:props.soal.soal}}/>
      <div className='flex flex-col gap-4 py-5'>
        {props.soal.pilihanGanda.map((pg, index) => {
          return(
            <div key={index} className={`p-4 border-2 rounded-2xl 
              ${props.soal.jawaban === pg ? 'bg-green-400 border-ungu-gelap'  : props.jawabanSiswa[props.tipeUjian][props.soal.kode]?.jawaban === pg ? 'border-4 border-ungu-gelap' : '' }`}>
              <div className='flex gap-5 items-start'>
                <div 
                className='flex items-center justify-center rounded-lg font-semibold text-lg bg-ungu-terang px-3 py-1 text-ungu-gelap'>
                  {String.fromCharCode(65+index)}
                </div>
                <div className='font-semibold text-left lg:text-lg' dangerouslySetInnerHTML={{__html:pg}}/>
              </div>
            </div>
          )
        })}
      </div>
      <h1>Pembahasan</h1>
      <div className='font-semibold text-left lg:text-lg bg-gray-50 border-4 px-5 py-5' dangerouslySetInnerHTML={{__html:props.soal.pembahasan}}/>

      </>
  ) 
}