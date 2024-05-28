'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const options: ApexOptions = {
  chart: {
    type: 'radar',
  },
  xaxis: {
    categories: ['General', 'Ortodoncista', 'Cirujano', 'Higienista'],
  },
  title: {
    text: 'Años de Experiencia de los Médicos por Especialidad',
  },
  markers: {
    size: 4,
  },
}

const DoctorsExperienceChart = () => {
  const series = [
    {
      name: 'Años de Experiencia',
      data: [16, 25, 14, 19], // Años de experiencia
    },
  ]

  return (
    <div className="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="radar"
        width="100%"
        height={420}
      />
    </div>
  )
}

export default DoctorsExperienceChart
