
export default function Nilai({metadata}) {
  const tipe = metadata.tipe

  return(
    <div className='px-5 py-2 m-5 xl:my-10 rounded-2xl border-2 flex flex-col justify-center gap-5 lg:gap-14'>
      <div>
        <h1 className='font-bold text-xl'>
            Nilai TKA {tipe}
          </h1>
          <ul className='flex flex-col gap-3 md:gap-0'>
            {Object.keys(metadata[tipe]).map(matpel => {
              const nilai = metadata[tipe][matpel]
              return(
                <li className='flex justify-between text-lg' key={matpel}>
                    <p>{matpel}</p> 
                    <p>{nilai}</p>
                </li>
              )
              }        
            )}
          </ul>
      </div>
      <div>
        <h1 className='font-bold text-xl'>
            Nilai TPS
          </h1>
          <ul className='flex flex-col gap-3 md:gap-0'>
            {Object.keys(metadata.TPS).map(matpel => {
              const nilai = metadata.TPS[matpel]
              return(
                <li className='flex justify-between text-lg' key={matpel}>
                    <p>{matpel}</p> 
                    <p>{nilai}</p>
                </li>
              )
              }        
            )}
          </ul>
      </div>      
    </div>
  )
}
