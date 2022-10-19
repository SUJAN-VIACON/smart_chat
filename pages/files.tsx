import React from 'react'
import DashboardLayout from '../components/app/DashboardLayout'
import ImageCard from '../components/dashboard/Card/ImageCard'

const Files = () => {
  return (
    <>
      <DashboardLayout>
        <div className="grid grid-cols-4 w-full h-full p-5 justify-center">
          <ImageCard />
        </div>
      </DashboardLayout>
    </>
  )
}

export default Files