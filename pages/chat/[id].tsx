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
import useSWR from 'swr'



const Chat = ({ chatId }: { chatId: any }) => {

  const fetcher = async () => {
   return getChatMessages(chatId).then((chatMessage) => chatMessage);
  };

  const { data, error } = useSWR(`/api/user/${chatId}`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>


  async function getChatMessages(chatId: string) {
    const messages: any = [];
    const chat: any = [];
    const chatRef = doc(db, "chats", chatId);

    const messageRef = query(
      collection(chatRef, "message"),
      orderBy("created_at", "asc")
    );
    const messageSnapShort = await getDocs(messageRef);

    messageSnapShort.forEach((doc: any) => {
      messages.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    const chatSnapShort = await getDoc(chatRef);
    chat.push({ ...chatSnapShort.data(), id: chatSnapShort.id });

    return { chat: chat[0], messages: messages };
  }

  return (
    <div>
      <DashboardLayout>
        <ChatContainer
          contacts={<ChatContacts />}
          chatMain={<ChatMain chat={data?.chat} messages={data?.messages} />}
          userDetails={<UserDetails />}
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
