
import { log } from "console";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import DashboardLayout from "../../components/app/DashboardLayout";
import ChatContainer from "../../components/dashboard/ChatContainer";
import { db } from "../../firebase";
import ChatContacts from "../../components/dashboard/ChatContacts";
import ChatMain from "../../components/dashboard/ChatMain";
import UserDetails from "../../components/dashboard/UserDetails";
import { async } from "@firebase/util";
import useSWR, { unstable_serialize } from 'swr'


const Chat = ({ chat, messages }: { chat: any, messages: any }) => {

  return (
    <div>
      {/* <DashboardLayout>
        <ChatContainer
          contacts={<ChatContacts />}
          chatMain={<ChatMain chat={chat} messages={messages} />}
          userDetails={<UserDetails />}
        />
      </DashboardLayout> */}
    </div>
  );
};

export default Chat

export async function getStaticProps(context: any) {
  const chatMessage =await getChatMessages(context.query.id);
  return {
    props: {
      fallback: {
        '/api/chatMessage': chatMessage
      }
    }
  }
}

function ChatMessage() {
  // `data` will always be available as it's in `fallback`.
  const { data } = useSWR('/api/chatMessage', fetcher)
  return <h1>{data.title}</h1>
}

export async function getChatMessages(chatId: string) {
  const messages: any = [];
  const chat = [];
  const chatRef = doc(db, "chats",)

  const messageRef = query(collection(chatRef, "message"), orderBy('created_at', 'asc'));
  const messageSnapShort = await getDocs(messageRef);

  messageSnapShort.forEach((doc: any) => {
    messages.push({ ...doc.data(), timeStamp: doc.data().created_at.toDate().getTime() });
  });

  const chatSnapShort = await getDoc(chatRef);
  chat.push({ ...chatSnapShort.data(), id: chatSnapShort.id });

  return { chat: chat[0], messages: messages }
}