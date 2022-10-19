import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import UserService from '../App/Services/UserService';
import DashboardLayout from '../components/app/DashboardLayout'
import EditProfile from '../components/Profile/EditProfile'
import { authentication } from '../firebase';

const Profile = () => {

  const [auth] = useAuthState(authentication) as any;
  const [user, setUser] = useState();

  useEffect(() => {
    UserService.find(auth.uid).then((result: any) => {
      setUser(result);
    })
  }, [])

  return (
    <>
      <DashboardLayout>
        {user &&
          <EditProfile user={user} />
        }
      </DashboardLayout>
    </>
  )
}

export default Profile