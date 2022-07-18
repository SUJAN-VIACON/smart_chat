import React from "react";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { RiContactsBook2Line } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { SenderChatLabel } from "./SenderChatLabel";
import ReceiverChatLabel from "./ReceiverChatLabel";


const ChatMain = () => {
  return (
    <section className="h-full relative overflow-hidden flex flex-col justify-between gap-3">
      <div className="p-7 flex justify-between bg-accent-focus">
        <div className="">
          <p className=" text-lg font-bold text-neutral">Akash Sharma</p>
          <p>applied as UX Designer</p>
        </div>
        <div className="">
          <div className="btn-group">
            <button className="btn btn-active">Chat</button>
            <button className="btn">Email</button>
            <button className="btn">Whatsapp</button>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col gap-7 px-10">

       <SenderChatLabel/>
       <SenderChatLabel/>
       <ReceiverChatLabel/>
       <ReceiverChatLabel/>
       <SenderChatLabel/>

      </div>

      <div className=" flex justify-between items-center w-full px-5 gap-2 pb-5">
        <input
          type="text"
          placeholder="Type here"
          className=" rounded-full input input-bordered w-full"
        />

        <label htmlFor="" className="bg-base-300 p-3 rounded-full">
          <BsFillFileEarmarkPostFill />
        </label>
        <label htmlFor="" className="bg-base-300 p-3 rounded-full">
          <RiContactsBook2Line />
        </label>
        <label htmlFor="" className="bg-base-300 p-3 rounded-full">
          <FaMicrophone />
        </label>
        <label htmlFor="" className="bg-base-300 p-3 rounded-full">
          <FiMoreHorizontal />
        </label>
      </div>
    </section>
  );
};

export default ChatMain;
