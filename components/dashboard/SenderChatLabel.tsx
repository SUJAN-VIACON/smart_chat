import React from "react";
type jsxType = {
  children: string;
  jsx: true;
};

export const SenderChatLabel = ({ chat }: any) => {
  return (
    <div className=" flex justify-start">
      <label className="sender-chat-label bg-base-300 p-2 absolute rounded-r-lg rounded-bl-lg relative">
        <span className="  ">{chat}</span>
      </label>
    </div>
  );
};
