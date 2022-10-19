import React, { useEffect } from 'react'
import DashboardLayout from '../components/app/DashboardLayout'
import ChatContainer from '../components/dashboard/ChatContainer'
import ChatContacts from "../components/dashboard/ChatContacts";
import ChatMainInterFace from '../components/dashboard/ChatMainInterFace';
import UserDetails from "../components/dashboard/UserDetails";
import { useRouter } from 'next/router';
import ChatService from '../App/Services/ChatService';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authentication } from '../firebase';

const Chat = () => {
  const router = useRouter();
  const [auth] = useAuthState(authentication) as any;

  useEffect(() => {
    ChatService.recipients(auth).then((results) => {
      if (!results.length) return router.push("/friend_requests")
    })
  }, [])

  return (
    <>
      <DashboardLayout>
        <ChatContainer
          contacts={<ChatContacts chatId={null} />}
          chatMain={<ChatMainInterFace />}
          userDetails={<UserDetails chat={null} />} />
      </DashboardLayout>
    </>
  )
}

export default Chat