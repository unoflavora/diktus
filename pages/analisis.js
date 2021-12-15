import Header from "../components/Analisis/Header";
import Umum from "../components/Analisis/Umum";
import TargetHarian from "../components/Analisis/TargetHarian";
import Keseluruhan from "../components/Analisis/Keseluruhan";
import PerMateri from "../components/Analisis/PerMateri"
import Radar from "../components/Analisis/Radar"
import Navbar from "../components/navbar/Navbar";
import Footer from '../components/Footer/Footer'
import Nilai from "../components/Analisis/Nilai";
import { useXP } from "../components/Context/XpContext";
import Calendars from "../components/Analisis/Calendar";
import Histori from "../components/Analisis/Histori";
import { useEffect, useState } from "react";

export default function Analisis() {
  const {metadata, updateTarget, updateTanggalTes} = useXP()
  const [loading, setLoading] = useState(true)
  const [listMateri, setListMateri] = useState([])

  useEffect(() => {
    let kelompokUjian
    if(metadata) {
      kelompokUjian = metadata.tipe

      const fetchListMateri = async() => {
        const res  = await fetch('/api/analisis/getList', {
          method: 'POST',
          body: JSON.stringify({
            kelompokUjian
          })
        })
        const data = await res.json()
        console.log(data)
        setListMateri(data['mataPelajaran'])
      }
      fetchListMateri()
    }
    setLoading(false)
  }, [metadata])

  if (loading) {
    return <div>Loading...</div>
  } else {
    console.log(listMateri)
    return(
      <div className='w-screen flex justify-center'>
      <div className='font-poppins max-w-screen-2xl overflow-y-hidden'>
        <Navbar/>
        <header>
          {metadata.template ?
            <Header template/> :
            <Header/>
          }
        </header>
        <main>
          <Umum metadata={metadata} 
            updateTarget={updateTarget}
            updateTanggalTes={updateTanggalTes}/>
          <TargetHarian metadata={metadata}/>
  
          <div className=' lg:grid grid-cols-2 xl:px-36'>
            <Nilai metadata={metadata}/>
            <Radar metadata={metadata}/>
          </div>
  
          <Keseluruhan metadata={metadata}/>
  
          <PerMateri metadata={metadata} listMateri={listMateri}/>
  
          <div className='md:grid md:grid-cols-2 md:py-10 xl:px-36 items-center'>
            <Calendars metadata={metadata}/>
            <Histori metadata={metadata}/> 
          </div>
  
        </main>   
        <footer>
          <Footer/>
        </footer>    
      </div>
      </div>
      
    )
  }

 
}