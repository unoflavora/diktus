import '../styles/globals.css'
import '../public/nprogress.css'
import NProgress from 'nprogress';
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { UserProvider } from '@auth0/nextjs-auth0';
import { XpProvider } from '../components/Context/XpContext';


export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url) => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <UserProvider>
      <XpProvider>
        <Component {...pageProps} />
      </XpProvider>
    </UserProvider>
  );
}


