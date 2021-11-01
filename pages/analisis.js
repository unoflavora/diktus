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

export default function Analisis() {
  const {metadata, updateTarget, updateTanggalTes} = useXP()

  if(!metadata) {
    return(
      <div>Loading..</div>
    )
  }

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

        <PerMateri metadata={metadata}/>

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