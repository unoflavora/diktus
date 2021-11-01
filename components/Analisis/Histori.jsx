import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

export default function Histori({metadata}) {
  
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

  const data = {
    labels: Object.keys(metadata.mark),
    datasets: [{
      label: "Skor Tryout Kamu",
      data: Object.values(metadata.mark),
      backgroundColor: '#2F2B71',
      borderRadius: 9,
      order: 1
    },
    {
      label: 'Skor Tryout Kamu',
      data: Object.values(metadata.mark),
      borderColor: '#a096f7',
      backgroundColor: '#FFFFFF',
      type: 'line',
      order: 0
    }
  
  ],
    
  }

  return(
    <div className='w-full flex flex-col gap-5 xl:gap-0 overflow-x-auto bg-gray-50 md:bg-white px-5 py-10 md:py-0 lg:px-10'> 
    <div className='flex flex-col gap-3 '>
      <h1 className='font-bold text-xl'>Nilai Tryout</h1> 
      <div className='flex gap-5'>
        <p className='bg-white rounded-full xl:px-4 xl:text-base mb-1 flex  items-center gap-2 px-2 py-1 border-2'>
          <div className='w-4 h-4 rounded-full bg-ungu-gelap'/>
          Nilai Kamu
        </p>
      </div>     
    </div>
    <div className='h-80 md:h-72 lg:w-full px-5 py-5 md:my-10 xl:my-5 border-2 rounded-2xl md:bg-white '>
      <Bar data={data} options={options} />
    </div>
  </div>
  )
}