import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { authentication } from "../../firebase";
import ReceiverChatLabel from "./ReceiverChatLabel";
import { SenderChatLabel } from "./SenderChatLabel";

export type Auth = {
  email: string;
  photo_url?: string | undefined;
  uid?: string | undefined;
  name?: string | undefined;
};

const Chats = ({ message = null }: { message: any }) => {
  const [auth, loading] = useAuthState(authentication);

  return (
    <div>
      {message?.user == auth?.email ? (
        <SenderChatLabel chat={message?.chat} imageUrl={message?.imageUrl}/>
      ) : (
        <ReceiverChatLabel chat={message?.chat} imageUrl={message?.imageUrl} />
      )}
    </div>
  );
};

export default Chats;
