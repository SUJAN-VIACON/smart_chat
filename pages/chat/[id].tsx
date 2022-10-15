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
import useSWR from "swr";
import { useMutation, useQuery } from "react-query";
import ChatThread from "../../App/Models/ChatThread";

const Chat = ({ chatId }: { chatId: any }) => {
  const userChat = useQuery(
    `chat${chatId}`,
    async () => {
      const chat = await ChatThread.getChatMessages(chatId);
      return chat;
    },
  );

  if (userChat.isFetching) {
    return <div>Loading...</div>;
  }
  if (userChat.isError) {
    return <div>Error! {userChat.error.message}</div>;
  }

  return (
    <div>
      <DashboardLayout>
        <ChatContainer
          contacts={<ChatContacts />}
          chatMain={
            <ChatMain userChat={chatId} />
          }
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
