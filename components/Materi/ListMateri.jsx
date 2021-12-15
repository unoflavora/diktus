import Link from 'next/link'

export default function ListMateri({matpel, data}) {

  if(!data) {
    return <div>Loading...</div>
  }

  if(data) {
    return (
      <div>
        {data.map((object, bab) => {
        const materi = Object.keys(object)[0]
        const submateri = object[materi]
        const matpelUpperCase = matpel.charAt(0).toUpperCase() + matpel.slice(1);
        return(
          <Link 
            key={bab}
            href={`/latihan/materi/${matpelUpperCase}/${encodeURIComponent(materi)}`}>
            <a>
              <div className='border-2 rounded-2xl p-3 px-5 
              border-gray-200 m-5 hover:bg-ungu-terang bg-white '>
                <h2 className='font-poppins border-b-2 py-2 border-gray-200'>
                  Bab {bab + 1}: <span className='font-bold'>{materi}</span>
                </h2>
                <ol className='list-inside py-2' style={{ listStyleType: "upper-roman" }}>
                  {submateri.map((submateri, index)=> 
                    <li className='py-1 font-poppins' key={index}>{submateri}</li>
                  )}
                </ol>
              </div>
            </a>
          </Link>
          )}
        )}
      </div>
    )}  
}