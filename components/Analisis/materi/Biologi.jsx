import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const data = {
  labels: ['Biologi', 'Fisika', 'Matematika', 'Kimia', ['Penalaran', 'Umum'],[ 'Pemahaman', 'Bacaan'], ['Pengetahuan', 'Umum'],[ 'Pengetahuan', 'Kuantitatif']],
  datasets: [{
    label: "Nilai Kamu",
    data: [946, 724, 892, 876, 652, 923, 1000, 896],
    backgroundColor: '#2F2B71',
    borderRadius: 9
  }]
}

const options = {
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
      color: 'gray',
      align: "end",
      anchor: "end",
   }
  },
  maintainAspectRatio : false
}

export default function Biologi() {
  return(

    <Bar data={data} plugins={[ChartDataLabels]}  options={options} />
  )
}