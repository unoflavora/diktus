import { Bar, defaults } from 'react-chartjs-2';
import { useXP } from '../../Context/XpContext';
import ChartDataLabels from 'chartjs-plugin-datalabels';

defaults.font.family = 'poppins';
defaults.font.size = 11

const options = {
  indexAxis: 'y',
  legend: {
    lables: {
      fontFamily: 'poppins'
    }
  },
  scales: {
    xAxes: [{
      barPercentage: 0.5,
      ticks: {
      autoSkip: false,
      maxRotation: 0,
      minRotation: 0
    }
    }],
    yAxes: [{
      beginAtZero: true,
      ticks: {
        fontFamily: 'poppins',
        fontSize: 15
      },
    }],
  },
 
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          size: '15px'
        }
      }
    },
    datalabels: {
      display: true,
      color: 'gray',
      align: "end",
      anchor: "end",
      font: {
        family: 'poppins',
        size: '15px',
        weight: 'bold'
      },
      padding: {
        left: 10
      }
   }
  },
  maintainAspectRatio : false
}

export default function Radar(props) {
  const {metadata} = useXP()

  if(!metadata) {
    return(
      <div>Loading..</div>
    )
  }

  try {
    const nilai = metadata[props.matpel]
    const data = {
      labels: Object.keys(nilai),
      datasets: [{
        axis: 'y',
        label: "Nilai Kamu",
        data: Object.values(nilai),
        backgroundColor: '#2F2B71',
        borderRadius: 9
      }]
    }
    return(
      <Bar data={data} plugins={[ChartDataLabels]}  options={options} />
    )
  } catch(e) {
    console.log(e)
    return(
      <div>No Data</div>
    )
  }


}