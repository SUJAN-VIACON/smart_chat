import React from 'react'
import DashboardLayout from '../components/app/DashboardLayout'
import EditProfile from '../components/Profile/EditProfile'

const Profile = () => {
  return (
    <>
    <DashboardLayout>
        <EditProfile/>
    </DashboardLayout>
    </>
  )
}

export default Profile