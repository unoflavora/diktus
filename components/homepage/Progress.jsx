import { useRef, useEffect, useState } from 'react'
import { Controller, Scene } from 'react-scrollmagic';
import Box from '../../public/assets/box.svg'
import {gsap} from 'gsap'

const Progress = () => {
  const divRef = useRef()
  const tl = useRef()
  const boxes = gsap.utils.selector(divRef);

  useEffect(() => {
    tl.current = () => {
      const timeline = gsap.timeline({ defaults: {duration:1500}})
        .from(boxes('#box1'), {y:5})
        .from(boxes('#bola'), {x:0, y:0})
        .to(boxes('#bola'), {y:-50, x:25, ease: 'Bounce.easeOut'})
        .to(boxes('#bola'), {x:50, y:-30})
        .to(boxes('#box2'), {y:5})
        .to(boxes('#box2'), {y:0})
        .to(boxes('#bola'), {y:-75, x:55, ease: 'Bounce.easeOut'})
        .to(boxes('#bola'), {x:110, y:-60})
        .pause()
      return timeline
    }
  }, [])


  

  const progressList = [
  'Analisis per-materi kemampuan kamu di Tryout', 
  'Latihan soal di materi yang perlu kamu perbaiki', 
  'Ikuti Pop-Quiz setiap hari untuk menjaga ingatan', 
  'Ulang lagi sampai skormu mencapai target!']

  const progressKeys = [0, 0.25, 0.5, 0.75]
  return(
    <div className='px-10 xl:px-44'>
    <Controller>
      <Scene duration={1500} triggerHook='onLeave'  pin='#pin' pinSettings>
       {(progress, event) => {
          tl.current ? tl.current().progress(progress) : null
          return(
          <div id='pin'>
            <h1 className='text-2xl md:text-4xl md:py-5 font-bold font-poppins text-center xl:py-10'>
              Sukses UTBK Bersama <span className='text-ungu-gelap font-sniglet tracking-widest'>diktus</span>
            </h1>
            <div className='flex flex-col xl:flex-row justify-between'>
              <div className='flex flex-col md:flex-row xl:flex-col gap-5 xl:gap-14 lg:py-10'>
                {progressList.map((item, index) => {
                return(
                  <div key={index} className={`
                  ${progress > progressKeys[index] && progress <= (progressKeys[index+1] || 1) ? 'bg-ungu-gelap text-white' : null}
                  border-2 rounded-xl border-ungu-terang px-1 lg:px-10 py-5
                  font-poppins md:text-xl text-center xl:text-xl font-semibold
                  tracking-wider`}>
                  {item}
                </div>)
                })}
              </div>
              <div className='w-full md:h-1/2 xl:w-1/2'>
                <Box ref={divRef}/>
              </div>
            </div>
          </div>
          )}
        }
      </Scene>
    </Controller>
  </div>
  )
}

export default Progress