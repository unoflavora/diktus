import Footer from "../../components/Footer/Footer";
import Materi from "../../components/homepage/Materi";
import Navbar from "../../components/navbar/Navbar";

export default function Tryout() {
  return(
    <div className='overflow-hidden'>
      <Navbar/>
      <Materi/>
      <Footer/>
    </div>
  )
}