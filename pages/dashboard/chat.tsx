import React from "react";
import DashboardLayout from "../../components/app/DashboardLayout";
import ChatContacts from "../../components/dashboard/ChatContacts";
import ChatContainer from "../../components/dashboard/ChatContainer";
import ChatMainInterFace from "../../components/dashboard/ChatMainInterFace";
import UserDetails from "../../components/dashboard/UserDetails";

const Chat = () => {
  return (
    <>
      <DashboardLayout>
        <ChatContainer
          contacts={<ChatContacts />}
          chatMain={<ChatMainInterFace />}
          userDetails={<UserDetails />}
        />
      </DashboardLayout>
    </>
  );
};

export default Chat;
