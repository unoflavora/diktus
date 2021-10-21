import Header from './Header'
import Alasan from './Alasan'
import Jenis from './Jenis'
import Materi from './Materi'
import Testimonials from './Testimonials'

export default function Index(props) {
  return(
    <div className='overflow-hidden'>
      <Header/>
      <Jenis/>
      <Alasan/>
      <Materi/>    
      <Testimonials/>
    </div>
  )
}

