'use client'
import { ApexOptions } from 'apexcharts'
import React from 'react'
import dynamic from 'next/dynamic'

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

const options: ApexOptions = {
  chart: {
    type: 'pie',
  },
  labels: ['Masculino', 'Femenino'],
  title: {
    text: 'Número de Visitas por Género',
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
}
const VisitsByGenderChart = () => {
  const series = [134, 187]

  return (
    <div className="chart">
      <ApexCharts
        options={options}
        series={series}
        type="pie"
        width="100%"
        height={420}
      />
    </div>
  )
}

export default VisitsByGenderChart
