import React from 'react'
import DashboardLayout from '../components/app/DashboardLayout'
import ChatContainer from '../components/dashboard/ChatContainer'
import ChatContacts from "../components/dashboard/ChatContacts";
import ChatMainInterFace from '../components/dashboard/ChatMainInterFace';
import UserDetails from "../components/dashboard/UserDetails";

const dashboard = () => {
  return (
    <>
      <DashboardLayout>
        <ChatContainer
          contacts={<ChatContacts />}
          chatMain={<ChatMainInterFace />}
          userDetails={<UserDetails />} />
      </DashboardLayout>
    </>
  )
}

export default dashboard