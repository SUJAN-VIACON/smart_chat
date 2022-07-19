
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


const Chat = ({ chat, messages }: { chat: any, messages: any }) => {

  return (
    <div>
      <DashboardLayout>
        <ChatContainer
          contacts={<ChatContacts />}
          chatMain={<ChatMain chat={chat} messages={messages}/>}
          userDetails={<UserDetails />}
        />
      </DashboardLayout>
    </div>
  );
};

export default Chat

export async function getServerSideProps(context: any) {
  const messages: any = [];
  const chat = [];

  const chatRef = doc(db, "chats", context.query.id)

  const messageRef = query(collection(chatRef, "message"), orderBy('created_at', 'asc'));
  const messageSnapShort = await getDocs(messageRef);

  messageSnapShort.forEach((doc: any) => {
    messages.push({ ...doc.data(), timeStamp: doc.data().created_at.toDate().getTime() });
  });

  const chatSnapShort = await getDoc(chatRef);
  chat.push({ ...chatSnapShort.data(), id: chatSnapShort.id });

  return {
    props: {
      chat: chat[0] || null,
      messages: JSON.stringify(messages),
    }, // will be passed to the page component as props
  }
}