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

const Chats = ({ message = null }: { message: null }) => {
  const [auth, loading] = useAuthState(authentication);

  return (
    <div>
      {message?.user == auth?.email ? (
        <SenderChatLabel message={message} />
      ) : (
        <ReceiverChatLabel message={message} />
      )}
    </div>
  );
};

export default Chats;
