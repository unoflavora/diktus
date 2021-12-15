import SoalItemTes from '../../components/SoalItem'
import Navbar from '../../components/navbar/Navbar'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'

export default function Home({data}) {
  const { user, error, isLoading } = useUser();

  if(!user) {return <div>Login!</div>}
  else if(isLoading) {return <div>Loading!</div>}
  else {
  return (
    <div>
      <Head>
        <title>Latihan Soal UTBK Quiz Harian</title>
        <meta name="description" content="Latihan soal dan Try-Out gratis UTBK Biologi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      
      </main>
    </div>
  )}
}

export async function getServerSideProps(context) {
  const res = await fetch(
    (process.env.NODE_ENV === "production" 
    ? "https://www.diktus.id/api/" 
    : "http://localhost:3000/api/") 
    + "popquiz",
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
