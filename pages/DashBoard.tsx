import React from 'react'
import DashboardLayout from '../components/app/DashboardLayout'
import ChatContainer from '../components/dashboard/ChatContainer'
import ChatContacts from "../components/dashboard/ChatContacts";
import ChatMain from "../components/dashboard/ChatMain";
import UserDetails from "../components/dashboard/UserDetails";

const DashBoard = () => {
  return (
    <>
      <DashboardLayout>
        <ChatContainer
          contacts={<ChatContacts />}
          chatMain={<ChatMain />}
          userDetails={<UserDetails />} />
      </DashboardLayout>
    </>
  )
}

export default DashBoard