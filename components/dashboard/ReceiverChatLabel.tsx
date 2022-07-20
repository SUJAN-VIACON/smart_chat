import { type } from "os";
import React from "react";

const ReceiverChatLabel = ({ chat }: any) => {
  return (
    <div className=" w-full flex justify-end">
      <label className="sender-chat-label bg-base-300 p-2 relative rounded-l-lg rounded-tr-lg">
        <span className="  ">{chat}</span>
      </label>
    </div>
  );
};

export default ReceiverChatLabel;
