import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import { Chart, registerables, CategoryScale, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend } from 'chart.js'
import { getLast7Days } from '../../lib/features'
Chart.register(
  ...registerables,
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
)

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      }
    },
    x: {
      grid: {
        display: false,
      }
    }
  }
}

const labels = getLast7Days()

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: value,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'Dataset 2',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'Dataset 3',
        data: [45, 69, 60, 71, 46, 65, 50],
        backgroundColor: 'rgba(75, 12, 192, 0.2)',
        borderColor: 'rgba(75, 12, 192, 1)',
        borderWidth: 2,
        fill: true
      },
    ],
  }

  return <Line data={data} options={lineChartOptions} />
}

const DoughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
}

const DoughnutChart = ({ values = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Chats vs Group Chats',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 12, 192, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 12, 192, 1)',
        ],
        borderWidth: 1,
        offset: 30,
      }
    ]
  }

  return <Doughnut data={data} options={DoughnutChartOptions} />
}

export {
  LineChart,
  DoughnutChart
}