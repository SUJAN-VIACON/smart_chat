import React from 'react'
import BlurCircle from '../dashboard/BlurCircle'
import { SideNav } from '../dashboard/SideNav'
import UpperNav from '../dashboard/UpperNav'

const DashboardLayout = ({ children }: any) => {
  return (
    <div>
      <div className="overflow-hidden relative flex bg-base-100">
        <SideNav />
        <div className="py-7 px-14 w-full h-screen ">
          <BlurCircle top={"15%"} right={-5} />
          <UpperNav />
          <div
            className=" flex items-center justify-center "
            style={{ height: "89vh" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout