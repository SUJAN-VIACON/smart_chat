import React from "react";
type jsxType = {
  children: string;
  jsx: true,
}

export const SenderChatLabel = ({chat}:any) => {
  
  return (
    <div className=" flex justify-start">
      <style jsx >{`
        .triangle {
          content: "";
          position: absolute;
          top: 0;
          left: -10%;
          width: 0;
          height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;

          border-top: 20px solid #797979e5;
        }
      `}</style>

      <label className="sender-chat-label bg-base-300 p-2 absolute rounded-r-lg rounded-bl-lg relative">
        <span className="triangle"></span>
        <span className="  ">{chat}</span>
      </label>
    </div>
  );
};
