import React from 'react'
import DashboardLayout from '../components/app/DashboardLayout'
import ChatContainer from '../components/dashboard/ChatContainer'

const DashBoard = () => {
  return (
    <>
      <DashboardLayout>
        <ChatContainer /> 
      </DashboardLayout>
    </>
  )
}

export default DashBoard