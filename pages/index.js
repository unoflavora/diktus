import Head from 'next/head'
import Homepage from '../components/homepage/Index'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer/Footer';
export default function Index() {
    return(
      <div className='overflow-hidden'>
        <Head>
          <title>Diktus : Analisis Kemampuan Kamu di UTBK!</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
  
        <Navbar/>
  
        <Homepage/>
  
        <Footer/>
  
      </div>
    )  
}
