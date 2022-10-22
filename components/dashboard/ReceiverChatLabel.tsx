import { type } from "os";
import React from "react";
import Image from "next/image";


const ReceiverChatLabel = ({ chat, imageUrl }: { chat: any, imageUrl: any }) => {
  return (
    <div className=" w-full flex justify-start">
      <label className="sender-chat-label bg-base-300 p-2 relative rounded-l-lg rounded-tr-lg flex flex-col">
      {imageUrl && (
          <Image src={imageUrl} width={200} height={150} className="rounded" />
        )}
        <span className="  ">{chat}</span>
      </label>
    </div>
  );
};

export default ReceiverChatLabel;
