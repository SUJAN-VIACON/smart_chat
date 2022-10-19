import { log } from "console";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/app/DashboardLayout";
import ChatContainer from "../../components/dashboard/ChatContainer";
import { db } from "../../firebase";
import ChatContacts from "../../components/dashboard/ChatContacts";
import ChatMain from "../../components/dashboard/ChatMain";
import UserDetails from "../../components/dashboard/UserDetails";
import ChatService from "../../App/Services/ChatService";
import useSWR from 'swr'



const Chat = ({ chatId }: { chatId: any }) => {

  const fetcher = async () => {
    return await ChatService.getChatMessages(chatId);
  };

  const { data, error } = useSWR(`/api/user/${chatId}`, fetcher)

  if (error) return <div>failed to load {error}</div>

  return (
    <div>
      <DashboardLayout>
        <ChatContainer
          contacts={<ChatContacts chatId={chatId}/>}
          chatMain={<ChatMain key={chatId} chat={data?.chat} messages={data?.messages} />}
          userDetails={<UserDetails chat={data?.chat}/>}
        />
      </DashboardLayout>
    </div>
  );
};

export default Chat;

export async function getServerSideProps(context: any) {
  const chatId = context.query.id;
  return {
    props: {
      chatId: chatId,
    },
  };
}
