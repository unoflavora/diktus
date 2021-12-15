import Header from './Header'
import Alasan from './Alasan'
import Jenis from './Jenis'
import Progress from './Progress'
import Testimonials from './Testimonials'

export default function Index(props) {
  return(
    <div className='overflow-hidden'>
      <Header/>
      <Jenis/>
      <Alasan/>
      <Progress/>    
      <Testimonials/>
    </div>
  )
}

