import { type } from "os";
import React from "react";
import Image from "next/image";


const ReceiverChatLabel = ({ message }: any) => {
  return (
    <div className=" w-full flex justify-end">
      <label className="sender-chat-label bg-base-300 p-2 relative rounded-l-lg rounded-tr-lg">
      {message.imageUrl && (
          <Image src={message.imageUrl} width={100} height={100} />
        )}
        <span className="  ">{message}</span>
      </label>
    </div>
  );
};

export default ReceiverChatLabel;
