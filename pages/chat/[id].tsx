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


const Chat = ({ chatId }: { chatId: any }) => {
  const [chat, setChat] = useState();
  const [messages, setMessages] = useState();

  useEffect(() => {
    getChatMessages(chatId).then((chatMessage) => {
      setChat(chatMessage.chat);
      setMessages(chatMessage.messages);
    });
  });

  

  if (!chat || !messages) {
    return null;
  }

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
          chatMain={<ChatMain chat={chat} messages={messages} />}
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
