import {useRouter} from 'next/dist/client/router'
import { useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head'
import ListMateri from '../../components/Materi/ListMateri'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Materi/Header';
import Article from '../../components/Materi/Article';
import Ringkasan from '../../components/Materi/Ringkasan';

export default function Home({data}) {
  const { user, error, isLoading } = useUser();
  const router = useRouter()
  const { params } = router.query
  const matpel = params[0]
  const tahun = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).getFullYear()

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
    return(
      <div>
        <Head>
          <title>Latihan SBMPTN UTBK {`${matpel.charAt(0).toUpperCase()}${matpel.slice(1)} ${tahun}`}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Navbar user={user}/>
        <header>
          <Header matpel={matpel}/>
        </header>
        <main className='xl:flex flex-col xl:px-40 justify-center bg-gray-50'>
          <div className='xl:grid grid-cols-12 max-w-screen-2xl'>
            <div className='hidden xl:block xl:col-span-4 my-10'>
              <Ringkasan/>            
            </div>
            <div className='col-span-8'>
              <ListMateri matpel={matpel} data={data}/>
            </div>
          </div>
          <Article matpel={matpel}/>
        </main>
        <footer>
          <Footer/>
        </footer>
      </div>
    )
}


export async function getServerSideProps(context) {
  const matpel = context.params.params[0]
  const res = await fetch(
    (process.env.NODE_ENV === "production" 
    ? "https://www.diktus.id/api" 
    : "http://localhost:3000/api/") 
    + "materi/listMateri", {
      method: 'POST',
      body: JSON.stringify({matpel}),
    }
  )
  const data = await res.json()
  if (res.status === 404) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      data
    }
  }
}