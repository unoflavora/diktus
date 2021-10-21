import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const data = {
  labels: ['Biologi', 'Fisika', 'Matematika', 'Kimia', ['Penalaran', 'Umum'],[ 'Pemahaman', 'Bacaan'], ['Pengetahuan', 'Umum'],[ 'Pengetahuan', 'Kuantitatif']],
  datasets: [{
    label: "Nilai Kamu",
    data: [946, 724, 892, 876, 652, 923, 1000, 896],
    backgroundColor: '#2F2B71',
    borderRadius: 9
  }, {
    label: "Nilai Rata-Rata",
    data: [728, 656, 723, 892, 762, 861, 927, 821],
    backgroundColor: '#AFADCC',
    borderRadius: 9
  }]
}

const options = {
  scales: {
    xAxes: [{
      barThickness: 24,
      maxBarThickness: 24,
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
      },
    }],
  },
  plugins: {
    legend: {
      display: false
    },
    datalabels: {
      display: true,
      color: 'white'
   }
  },
  maintainAspectRatio : false
}


const Rata = () => {
  return(
    <div className='px-5 xl:px-36 py-10 font-poppins flex flex-col gap-2'>
      <div className='xl:flex xl:w-full xl:justify-between'>
      <div className=''>
        <h1 className='font-bold text-xl'>Skor Keseluruhan</h1>
        <p className='text-gray-500'>Nilai Per Matpel</p>
      </div>
      <div className='flex gap-2'>
        <p className='rounded-full text-sm xl:text-base mb-1 flex items-center gap-1 px-2 py-1 border-2'>
          <div className='w-3 h-3 rounded-full bg-ungu-gelap'/>
          Nilai
        </p>
        <p className='rounded-full text-sm xl:text-base mb-1 flex items-center gap-1 px-2 py-1 border-2'>
          <div className='w-3 h-3 rounded-full bg-ungu-light'/>
          Rata-Rata Peserta
        </p>
        </div>
      </div>
      
      <div className='w-full overflow-x-auto'>

       
        <div className='h-96 graph lg:w-full'>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  )
}

export default Rata