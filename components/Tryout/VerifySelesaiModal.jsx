import Modal from 'react-modal';

export default function VerifySelesaiModal({isOpen, setIsOpen, jumlahSoal, choosedAnswer, setSelesai, tipeUjian, setUjian, kelompokUjian, setMulai}) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '40px'
    },
  };

  const handleSelesai = () => {
    if(tipeUjian === 'TPS') {
      setUjian(kelompokUjian)
      setMulai(false)
    } else {
      setSelesai(true)
    }
  }

  return(
    <Modal
      isOpen={isOpen}
      style={customStyles}
    >
    <div className='flex justify-center py-10'>
    <div className='text-center flex flex-col gap-4 w-3/4 justify-center'>
      <h1 className='text-lg'>Apakah kamu yakin akan menyelesaikan tes ini?</h1>
      <h2 className='text-lg font-semibold'>{choosedAnswer < jumlahSoal ? `Ada ${jumlahSoal - choosedAnswer} soal yang belum kamu kerjakan`: 
      'Mohon Periksa Kembali Jawabanmu'}</h2>
      <div className='flex gap-4 justify-center'>
        <button onClick={handleSelesai} className='rounded-full border-2 border-ungu-light p-2 px-5 hover:bg-ungu-gelap hover:text-white'>Selesai</button>
        <button onClick={() => setIsOpen(false)} className='rounded-full border-2 border-ungu-light p-2 px-5 hover:bg-ungu-gelap hover:text-white'>Belum</button>
      </div>
      {tipeUjian === 'TPS' && 
          <h1 className='text-lg'>
            Setelah ini, kamu akan memiliki waktu istirahat selama 15 menit sebelum memulai TPA
          </h1>
        }
    </div>
    </div>
  
    </Modal>
  )
}