import { useLayoutEffect } from 'react';

export default function DisplaySoal(props) {
  useLayoutEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image&async=true"
    script.async = true
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
            <button onClick={() => props.updateChoosedAnswer(pg)} key={index} className={`p-4 border-2 rounded-2xl 
              ${props.choosedAnswer[props.tipeUjian][props.soal.kode]?.jawaban === pg ? 'border-4 border-ungu-gelap' : ''}`}>
              <div className='flex gap-5 items-start'>
                <div 
                className='flex items-center justify-center rounded-lg font-semibold text-lg bg-ungu-terang px-3 py-1 text-ungu-gelap'>
                  {String.fromCharCode(65+index)}
                </div>
                <div className='font-semibold text-left lg:text-lg' dangerouslySetInnerHTML={{__html:pg}}/>
              </div>
            </button>
          )
        })}
      </div>
      </>
  ) 
}