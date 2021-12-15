import { useState } from "react"
import DisplaySoal from "./DisplaySoal"
import VerifySelesaiModal from "./VerifySelesaiModal"

export default function Layout({data, setSelesai, choosedAnswer, setChoosedAnswer, tipeUjian, setUjian, kelompokUjian, setMulai}) {
  const [mataPelajaran, setMataPelajaran] = useState(data[0].mataPelajaran)
  const [soalInView, setSoalInView] = useState(0)
  const [verifyModalOpen, setVerifyModalOpen] = useState(false)
  const [time, setTime] = useState(tipeUjian === 'TPS' ? 6300 : 5400)

 const updateChoosedAnswer = (jawaban) => {
    let newChoosedAnswer = {...choosedAnswer}
    newChoosedAnswer[tipeUjian][data[soalInView].kode] = {
      'jawaban': jawaban,
      'mataPelajaran': data[soalInView].mataPelajaran,
      'materi': data[soalInView].materi
    }
    setChoosedAnswer(newChoosedAnswer)
  }


  setTimeout(() => {
    let t = time
    setTime(t - 1) 
  }, 1000)

  if(time === 0) {
    if(tipeUjian === 'TPS') {
      setUjian(kelompokUjian)
      setMulai(false)
    } else {
      setSelesai(true)
    }
  }

  return (
    <>
      <div className='bg-gray-100 font-poppins flex justify-between px-5 lg:px-20  py-5'>
        <h1 className='font-semibold text-xl'>{mataPelajaran}</h1>
        <p className='font-semibold text-lg'>{time  && new Date(time * 1000).toISOString().substr(11, 8)} Left</p>
      </div>

      <div className='xl:grid xl:grid-cols-12'>
          <div className='bg-white py-5 overflow-x-auto 
            xl:overflow-y-auto xl:col-span-3 xl:order-2 xl:flex xl:flex-col xl:gap-5'>
          
          <div className='xl:h-96 xl:overflow-y-auto xl:px-2'>
            <div className='flex lg:grid lg:grid-flow-col xl:grid-cols-5  lg:grid-rows-2 xl:grid-flow-row lg:auto-cols-max lg:h-24 xl:h-auto  gap-4 w-screen xl:w-auto px-5'>
            {data.map((soal, index) => {
              return(
              <button 
                onClick={() => {setSoalInView(index); setMataPelajaran(data[index].mataPelajaran)}}
                className={`border-2 rounded-tl-2xl bg-gray-50
                ${soal.kode in choosedAnswer[tipeUjian] ? 'bg-yellow-300': ''}
                ${index === soalInView ? 'bg-white border-ungu-gelap text-ungu-gelap': ''}
                text-lg p-1 px-3`}>
                {index + 1}
              </button>
              )
            })}
            </div>
          </div>

          <div className='hidden xl:flex flex-col px-7 gap-3'>
            <h2 className='font-semibold text-gray-500'>Keterangan</h2>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-3 items-center font-semibold'>
                <div className='bg-yellow-300 h-3 w-10 rounded-tl-xl'/>
                <h3>Terjawab</h3>
              </div>
              <div className='flex gap-3 items-center font-semibold'>
                <div className='bg-gray-200 h-3 w-10 rounded-tl-xl'/>
                <h3>Belum Terjawab</h3>
              </div>
              <div className='flex gap-3 items-center font-semibold'>
                <div className='bg-gray-200 h-3 w-10 border-2 border-ungu-gelap rounded-tl-xl'/>
                <h3>Current</h3>
              </div>
            </div>
          </div>
          
          <div className='hidden xl:flex px-7 mt-5'>
            <button  onClick={() => setVerifyModalOpen(true)} className='px-8 py-3 border-2 rounded-full border-ungu-cal hover:bg-ungu-gelap hover:text-white text-lg font-semibold text-ungu-cal'>
              {tipeUjian === 'TPS' ? 'Lanjutkan ke TPA' : 'Selesaikan Ujian'}
            </button>
          </div>
        </div>


      <div className='p-5 pt-0 lg:px-20 lg:mt-10 col-span-9 xl:order-1'>
        <DisplaySoal 
          soal={data[soalInView]} 
          choosedAnswer={choosedAnswer}
          updateChoosedAnswer={updateChoosedAnswer}
          tipeUjian={tipeUjian}
          setUjian = {setUjian}
        />
      </div>
      </div>

      <div className='flex w-full justify-center xl:hidden px-4 lg:px-14 py-5'>
        <button
         onClick={() => setVerifyModalOpen(true)}
         className='px-8 py-3 border-2 rounded-full border-ungu-cal hover:bg-ungu-gelap hover:text-white lg:text-lg font-semibold text-ungu-cal'>
          Selesaikan Ujian
        </button>
      </div>

      <VerifySelesaiModal 
        isOpen={verifyModalOpen} 
        setIsOpen={setVerifyModalOpen} 
        setSelesai={setSelesai} 
        jumlahSoal={Object.keys(data).length} 
        choosedAnswer={Object.keys(choosedAnswer[tipeUjian]).length}
        tipeUjian={tipeUjian}
        setUjian={setUjian}
        kelompokUjian= {kelompokUjian}
        setMulai={setMulai}
      />
      
    </>
  )
}

