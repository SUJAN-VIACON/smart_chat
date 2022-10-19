import Image from "next/image";
import React from "react";
type jsxType = {
  children: string;
  jsx: true;
};

export const SenderChatLabel = ({ chat, imageUrl }: { chat: any, imageUrl: any }) => {
  return (
    <div className=" flex justify-start">
      <label className="sender-chat-label bg-base-300 p-2 rounded-r-lg rounded-bl-lg relative flex flex-col">
        {imageUrl && (
          <Image src={imageUrl} width={200} height={150} className="rounded" />
        )}
        <span className="  ">{chat}</span>
      </label>
    </div>
  );
};
