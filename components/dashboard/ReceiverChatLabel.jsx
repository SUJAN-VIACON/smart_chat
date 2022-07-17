import React from "react";

const ReceiverChatLabel = () => {
  return (
    <div className=" w-full flex justify-end">
      <style jsx>{`
        .triangle {
          position: absolute;
          bottom: 0;
          right: -3%;
          width: 0;
          height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-bottom: 20px solid #797979e5;
        }
      `}</style>

      <label className="sender-chat-label bg-base-300 p-2 relative rounded-l-lg rounded-tr-lg">
        <span className="triangle"></span>
        <span className="  ">hey there, how are you doing today</span>
      </label>
    </div>
  );
};

export default ReceiverChatLabel;
