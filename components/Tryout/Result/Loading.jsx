import {useState} from 'react'

export default function Loading({quotes}) {
  const [state, setState] = useState(0)
  setTimeout(() => {
    setState(state + 1)
  }, 5000)
  return(
    <div className='w-full h-full flex justify-center items-center text-lg'>
     {quotes &&
     <div>
       {quotes[state].text}
     </div>
     }
    </div>
  )
}

