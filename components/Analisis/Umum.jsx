import { Piala } from "../../public/SVGs"
import { useState } from "react";
import Modal from "./Modal";
import moment from "moment";

const Umum = ({metadata, updateTarget, updateTanggalTes}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cal, setCal] = useState(false)

  const reducer = (previousValue, currentValue) => previousValue + currentValue

  function openModal() {
    setIsOpen(true);
  }

  function dateDiff() {
    let a = moment(metadata.tes, 'DD-MM-YYYY')
    let b = moment()
    var years = a.diff(b, 'year');
    b.add(years, 'years');

    var months = a.diff(b, 'months');
    b.add(months, 'months');

    var days = a.diff(b, 'days');
    return({years, months, days})
  }

  const kelompok = Object.values(metadata[metadata.tipe]).reduce(reducer)
  const tps = Object.values(metadata.TPS).reduce(reducer)
  const predicted = (kelompok + tps) / 8

  const style = {
    card: 'flex  justify-between items-end xl:items-center p-5 md:py-5 xl:py-8 md:px-5 gap-2 bg-white rounded-2xl',
    item: 'flex flex-col ',
    title: 'font-bold text-lg md:mb-2',
    num: 'font-extrabold text-ungu-gelap'
  }

  return(
    <div className='flex flex-col bg-gray-50 xl:bg-white px-5 pt-10 xl:px-14 gap-5 rounded-2xl '>
    <div className='py-10 bg-gray-50 xl:px-24 xl:pt-10 rounded-t-3xl'>
    <h2 className='font-bold text-xl'>Analisis Umum</h2>
    <Modal 
      updateTarget={updateTarget}
      modalIsOpen={modalIsOpen} 
      setIsOpen={setIsOpen}
      template={'template' in metadata ? true : false}
      cal={cal}
      updateTanggal={updateTanggalTes}
    />
    <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>
    <div className={style.card}>
      <div className={style.item}>
        <h3 className={style.title}>Predicted Score</h3>
        <p className={`${style.num} text-2xl`}>{Math.round(predicted)}</p>
      </div> 
      <Piala width={56} height={56}/>
    </div>
    <div className={style.card}>
      <div className={style.item}>
        <h3 className={style.title}>Target Score</h3>
        <p className={`${style.num} text-2xl`}>{metadata.target}</p>
      </div> 
      <button onClick={() => {openModal();setCal(false)}}>Edit Skor Target</button>
    </div>
    <div className={style.card}>
      <div className={style.item}>
        {metadata.tes ?
        <div className={`${style.num}`}>
          <h1 className='text-xl'>
            {dateDiff().months} Bulan, {dateDiff().days} Hari
          </h1>
          <h2 className='text-base'>
            Menuju SBMPTN
          </h2>
        </div>
      :
        <p className='text-gray-500 text-sm'>
          Tentukan target tanggal kamu
        </p>
      }        
      </div> 
      <div className='w-1/2 flex justify-end'>
        <button onClick={() => {openModal();setCal(true)}}>Edit Tanggal Tes</button>
      </div>
    </div>
    </div>
    </div>
   
    </div>
  )
}

export default Umum