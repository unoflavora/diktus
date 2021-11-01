const Header = (props) => {
return(
  <div className=' text-center px-3 py-5 flex flex-col gap-4 font-poppins '>
    <h1 className='text-ungu-gelap text-2xl font-semibold'>
      {props.template? 'Contoh Analisis': 'Analisis'}</h1>
    <p className='text-gray-500'>
      Ini  {props.template? 'contoh analisis': 'analisis'} berdasarkan hasil Tryout Terakhir kamu</p>
  </div>
)
}

export default Header
