import { Radar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';


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


const Rata = ({metadata}) => {

  const data = {
    labels: [...Object.keys(metadata[metadata.tipe]),
      ['Penalaran', 'Umum'], [ 'Pengetahuan', 'Kuantitatif'], ['Pengetahuan', 'Umum'], [ 'Pemahaman', 'Bacaan']
    ],
    datasets: [{
      label: "Nilai Kamu",
      data: [...Object.values(metadata[metadata.tipe]), ...Object.values(metadata.TPS)],
      fill: true,
      backgroundColor: 'rgba(154, 99, 255, 0.2)',
      borderColor: 'rgb(154, 99, 255)',
      pointBackgroundColor: 'rgb(154, 99, 255)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(154, 99, 255)'
    }, {
      label: "Nilai Rata-Rata",
      data: [543, 555, 541, 554, 572, 559, 565, 569],
      fill: true,
      backgroundColor: 'rgba(175, 173, 204, 0.36)',
      borderColor: 'rgb(175, 173, 204)',
      pointBackgroundColor: 'rgb(175, 173, 204)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(175, 173, 204)'
    }]
  }

  return(
    <div className='px-5 xl:px-0 py-10 font-poppins flex flex-col gap-2'>
      <div className='xl:flex xl:w-full xl:justify-between'>
      <div className=''>
        <h1 className='font-bold text-xl'>Skill Map</h1>
        <p className='text-gray-500'>Peta Keahlian Kamu</p>
      </div>
      <div className='flex gap-2'>
        <p className='rounded-full text-sm xl:text-base mb-1 flex items-center gap-1 px-2 py-1 border-2'>
          <div className='w-3 h-3 rounded-full bg-ungu-gelap'/>
          Kamu
        </p>
        <p className='rounded-full text-sm xl:text-base mb-1 flex items-center gap-1 px-2 py-1 border-2'>
          <div className='w-3 h-3 rounded-full bg-ungu-light'/>
          Rata-Rata Peserta
        </p>
        </div>
      </div>
      
      <div className='w-full overflow-x-auto'>
        <div className='h-96 graph lg:w-full'>
          <Radar data={data} options={options} />
        </div>
      </div>
    </div>
  )
}

export default Rata