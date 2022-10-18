import Image from "next/image";
import React from "react";
type jsxType = {
  children: string;
  jsx: true;
};

export const SenderChatLabel = ({ message }: any) => {
  return (
    <div className=" flex justify-start">
      <label className="sender-chat-label bg-base-300 p-2 absolute rounded-r-lg rounded-bl-lg relative">

        {message.imageUrl && (
          <Image src={message.imageUrl} width={100} height={100} />
        )}

        <span className="  ">{message.chat}</span>
      </label>
    </div>
  );
};
