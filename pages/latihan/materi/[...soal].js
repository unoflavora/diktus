import Head from 'next/head'
import {useRouter} from 'next/dist/client/router'
import { useUser } from '@auth0/nextjs-auth0';
import Soal from '../../../components/Materi/Soal'
import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/Footer/Footer'
import { useXP } from '../../../components/Context/XpContext';

export default function Materi({data}) {
  const { user, error, isLoading } = useUser();
  const router = useRouter()
  const [mataPelajaran, materi] = router.query.soal

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if(user) {
    return (
      <div className='overflow-y-hidden'>
        <Head>
          <title>Latihan Soal UTBK {materi}</title>
          <meta name="description" content="Latihan soal dan Try-Out gratis UTBK Biologi" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <Navbar user={user}/>
        </header>
        <main>
          <Soal data={data} id={user.sub}/>
        </main>
        <footer className=''>
          <Footer/>
        </footer>
      </div>
    )
  } else {
    router.push(`/api/auth/login?returnTo=/latihan/materi/${mataPelajaran}/${materi}`)
  }
}

export async function getServerSideProps(context) {
  const [mataPelajaran, materi] = context.params.soal
  const res = await fetch(
    (process.env.NODE_ENV === "production" 
    ? "https://www.diktus.id/api/" 
    : "http://localhost:3000/api/") 
    + "materi/soalMateri", {
      method: 'POST',
      body: JSON.stringify({
        mataPelajaran,
        materi
      }),
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
