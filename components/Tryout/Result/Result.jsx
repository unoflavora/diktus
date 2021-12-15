import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import DisplayResultSoal from "./DisplayResultSoal"
import Loading from "./Loading"
import { useXP } from "../../Context/XpContext"

export default function Result ({dataSoal, jawabanSiswa, quotes, kelompokUjian}) {
  const [mataPelajaran, setMataPelajaran] = useState(dataSoal['TPS'].mataPelajaran)
  const [soalInView, setSoalInView] = useState(0)
  const [loading, setLoading] = useState(true)
  const [tipeUjian, setTipeUjian] = useState('TPS')
  const router = useRouter()
  const {hitungHasil, handleTO} = useXP()

  useEffect(() => {
    dataSoal[tipeUjian].map((soal) => {
      if(soal.jawaban === jawabanSiswa[kelompokUjian][soal.kode]?.jawaban){
        jawabanSiswa[kelompokUjian][soal.kode].correct = true
      }
    })
    const uploadHasil = async() => {
      await hitungHasil(kelompokUjian === 'Saintek' ? 'Saintek' : 'Soshum', jawabanSiswa)
      setLoading(false)
    }

    uploadHasil()
    handleTO()
  }, [])

  const handleChangeDataUjian = () => {
    let jadiIni = tipeUjian === 'TPS' ? kelompokUjian : 'TPS'
    setTipeUjian(jadiIni)
    setSoalInView(0)
  }


  if(loading) {
    return <Loading quotes={quotes}/>
  } else if (!loading) {
    return(
      <>
         <div className='xl:grid xl:grid-cols-12'>
          <div className='bg-white py-5 overflow-x-auto 
              xl:overflow-y-auto xl:col-span-3 xl:order-2 xl:flex xl:flex-col xl:gap-5'>
            
            <div className='xl:h-96 xl:overflow-y-auto xl:px-2'>
              <div className='flex lg:grid lg:grid-flow-col xl:grid-cols-5  lg:grid-rows-2 xl:grid-flow-row lg:auto-cols-max lg:h-24 xl:h-auto  gap-4 w-screen xl:w-auto px-5'>
              {dataSoal[tipeUjian].map((soal, index) => {
                return(
                <button 
                  onClick={() => {setSoalInView(index); setMataPelajaran(dataSoal[tipeUjian][index].mataPelajaran)}}
                  className={`border-2 rounded-tl-2xl bg-gray-50
                  ${soal.kode in jawabanSiswa[tipeUjian] ? jawabanSiswa[tipeUjian][soal.kode]?.correct ? 'bg-green-300' : 'bg-red-300': 'bg-red-300'}
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
                  <div className='bg-green-300 h-4 w-10 rounded-tl-xl'/>
                  <h3>Benar</h3>
                </div>
                <div className='flex gap-3 items-center font-semibold'>
                  <div className='bg-red-300 h-4 w-10 rounded-tl-xl'/>
                  <h3>Belum Terjawab/Salah</h3>
                </div>
  
              </div>
            </div>

            <div className='w-full flex justify-center'>
              <button 
              className='bg-ungu-gelap text-white font-semibold py-2 px-6 rounded-xl'
              onClick={handleChangeDataUjian}>Lihat Hasil {tipeUjian === 'TPS' ? 'TPA' : 'TPS'}</button>
            </div>
            
            <div className='hidden xl:flex px-7 justify-center'>
              <button  onClick={() => setVerifyModalOpen(true)} className='px-8 py-3 border-2 rounded-full border-ungu-cal hover:bg-ungu-gelap hover:text-white text-lg font-semibold text-ungu-cal'>
                Lihat Analisis
              </button>
            </div>
          </div>
          <div className='p-5 pt-0 lg:px-20 lg:mt-10 col-span-9 xl:order-1'>
          <DisplayResultSoal
            soal={dataSoal[tipeUjian][soalInView]} 
            jawabanSiswa={jawabanSiswa}
            pembahasan={true}
            tipeUjian={tipeUjian}
          />
        </div>
        </div>
  
  
  
  
        <div className='flex w-full justify-center xl:hidden px-4 lg:px-14 py-5'>
          <button
           onClick={() => router.push('/analisis')}
           className='px-8 py-3 border-2 rounded-full border-ungu-cal hover:bg-ungu-gelap hover:text-white lg:text-lg font-semibold text-ungu-cal'>
            Selesaikan Ujian
          </button>
        </div>
      </>
    )
  }  
}
  const isSaintek = (soal) => ['Biologi', 'Matematika', 'Kimia', 'Fisika'].includes(soal.mataPelajaran)

