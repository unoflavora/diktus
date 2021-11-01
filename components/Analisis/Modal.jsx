import Modal from 'react-modal';
import {AiOutlineClose, AiOutlineCalendar} from "react-icons/ai";
import {SiTarget} from "react-icons/si";
import {FiAlertCircle} from "react-icons/fi"
import { useState } from 'react';
import moment from 'moment';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    borderRadius: '14px',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Modals({modalIsOpen, setIsOpen, updateTarget, template, cal, updateTanggal}) {
  const [msg, setMsg] = useState(false)
  const [value, setValue] = useState()

  function closeModal() {
    setIsOpen(false);
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (template) {
      setMsg('login')
      setTimeout(() => {
        setMsg(false)
        setIsOpen(false)  
      }, 2000)
    } else {
      if (!cal) {
        await updateTarget(value)
      } else {
        const val = moment(value, 'YYYY-MM-DD').format("DD-MM-YYYY")
        await updateTanggal(val)
      }
      setValue()
      setIsOpen(false)  
    }
  }

  return(
    <div>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Input Modal"
    >
      <form onSubmit={handleSubmit}
       className='flex flex-col gap-5 font-poppins items-center'>
        <button type='button' onClick={closeModal} className='self-end text-gray-400 font-bold'><AiOutlineClose size={20}/></button>
        {cal ? <AiOutlineCalendar size={30}/> : <SiTarget size={30}/>}
        {cal ? <>
        <div className='self-center text-center'>
          <h1 className='font-semibold self-center text-lg '>Edit Tanggal Tes Kamu</h1>
          <h2>Masukan tanggal tes kamu disini</h2>
        </div>
        <label className='flex flex-col gap-2' htmlFor='tanggal'>
          Tanggal Tes
          <input 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name='tanggal' className='border-4 px-5 py-3 rounded-2xl' type='date'/>
        </label>
        </> 
        :
        <>
        <div className='self-center text-center'>
          <h1 className='font-semibold self-center text-lg '>Edit Skor Target Kamu</h1>
          <h2>Masukan skor target kamu disini</h2>
        </div>
        <label className='flex flex-col gap-2' htmlFor='skor'>
          Target Skor
          <input 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name='skor' className='border-4 px-5 py-3 rounded-2xl' type='number'/>
        </label>
        </>}
        {msg === 'login' ? 
        <div className='flex gap-1 items-center'>
          <FiAlertCircle size={30}/>
          <p>Silahkan Login Terlebih Dahulu!</p>
        </div>
        : null
        }
        
        <button type='submit' className='w-full rounded-xl py-2 bg-ungu-gelap text-white'>
          Submit
        </button>
      </form>
    </Modal>
  </div>
  )
}