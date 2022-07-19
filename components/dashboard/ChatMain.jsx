import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { RiContactsBook2Line } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { SenderChatLabel } from "./SenderChatLabel";
import ReceiverChatLabel from "./ReceiverChatLabel";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { authentication, db } from "../../firebase";
import Chats from "./Chats";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";

const ChatMain = ({ chat = null, messages = null }) => {
  const [auth] = useAuthState(authentication);
  const [message, setMessage] = useState(null);
  const chatId = chat ? chat.id : null;
  const chatRef = chat ? doc(db, "chats", chatId) : null;
  const messageRef = message
    ? query(collection(chatRef, "message"), orderBy("created_at", "asc"))
    : null;
  const [messageSnapShort] = useCollection(messageRef);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!message || message == "") return;

    const docRef = doc(db, "chats", chat.id);
    const colRef = collection(docRef, "message");
    addDoc(colRef, {
      chat: message,
      user: auth.email,
      created_at: serverTimestamp(),
    });

    setMessage(null);
  };

  const showMessage = () => {
    if(!chat || !messages) return null;
    if (messageSnapShort) {
      const chatMessages = [];
      messageSnapShort.forEach((doc) => {
        chatMessages.push({ ...doc.data(), timeStamp: "hgh" });
      });

      return chatMessages.map((message) => (
        <Chats user={message.user} chat={message.chat} />
      ));
    } else {
      // return messages.map((message) => (
      //   <Chats user={message.user} chat={message.chat} />
      // ));
    }
  };

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

      <div>{showMessage()}</div>

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
