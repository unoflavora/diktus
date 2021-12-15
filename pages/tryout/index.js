import Footer from "../../components/Footer/Footer";
import Materi from "../../components/Tryout/Materi";
import Navbar from "../../components/navbar/Navbar";
import Head from 'next/head'
export default function Tryout() {
  return(
    <div className='flex flex-col min-h-screen overflow-hidden'>
      <Navbar/>
      <main className='flex mt-auto items-center'>
        <Materi/>
      </main>
      <Footer/>
    </div>
  )
}