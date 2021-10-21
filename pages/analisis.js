import Header from "../components/Analisis/Header";
import Umum from "../components/Analisis/Umum";
import TargetHarian from "../components/Analisis/TargetHarian";
import Keseluruhan from "../components/Analisis/Keseluruhan";
import PerMateri from "../components/Analisis/PerMateri"
import Navbar from "../components/navbar/Navbar";
import Footer from '../components/Footer/Footer'

export default function Analisis() {

  return(
    <div className='font-poppins overflow-y-hidden'>
      <Navbar/>
      <header>
        <Header/>
      </header>
      <main>
        <Umum/>
        <TargetHarian/>
        <Keseluruhan/>
        <PerMateri/>
      </main>   
      <footer>
        <Footer/>
      </footer>    
    </div>
  )
}