'use client'
import { ApexOptions } from 'apexcharts'
import React from 'react'
import dynamic from 'next/dynamic'

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

const options: ApexOptions = {
  chart: {
    type: 'bar',
  },
  xaxis: {
    categories: [10, 20, 30, 40, 50, 60, 70],
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  title: {
    text: 'Distribución de Edad de los Pacientes',
  },
}

const AgeDistributionChart = () => {
  const series = [
    {
      data: [30, 40, 45, 50, 49, 60, 70, 91], // Reemplaza con tus datos
    },
  ]

  return (
    <ApexCharts
      options={options}
      series={series}
      type="bar"
      height={420}
      width="100%"
    />
  )
}

export default AgeDistributionChart
