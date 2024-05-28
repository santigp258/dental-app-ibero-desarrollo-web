'use client'
import DoctorsExperienceChart from '@/components/global/charts/doctors-experience-chart'
import AgeDistributionChart from '@/components/global/charts/age-distribution-chart'
import VisitsByGenderChart from '@/components/global/charts/visits-by-gender-chart'

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12">
        <AgeDistributionChart />
      </div>
      <div className="col-span-6">
        <VisitsByGenderChart />
      </div>
      <div className="col-span-6">
        <DoctorsExperienceChart />
      </div>
    </div>
  )
}
