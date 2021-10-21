export default function Poin(props) {
  return(
    <div className={`relative flex hover:bg-ungu-terang flex-col gap-2 p-4 ${props.keuntungan ? 'ml-4' : ''} pl-8 border-2 rounded-3xl bg-white text-black`}>
      <h2 className='font-semibold text-base lg:text-2xl'>{props.poin}</h2>
      <p className='text-sm lg:text-lg'>{props.desc}</p>
      <div className={`absolute ${props.fitur? '-top-10 left-2' : '-left-8'} p-4 bg-ungu-terang rounded-full`}>
        {props.icon}
      </div>
  </div>
  )
}