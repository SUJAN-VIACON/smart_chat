import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { RiContactsBook2Line } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import React, { useState, useRef, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { authentication, db } from "../../firebase";
import Chats from "./Chats";
import { MdSend } from "react-icons/md";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { useQuery, useMutation, QueryClient } from "react-query";
import ChatThread from "../../App/Models/ChatThread";

const ChatMain = ({ userChat = null, chatRefetch, isChatRetching = false }) => {

  const [auth] = useAuthState(authentication);
  const [messages, setMessages] = useState(userChat?.messages);
  const [chat, setChat] = useState(userChat?.chat);
  const [message, setMessage] = useState(null);

  const chatRef = chat?.id ? doc(db, "chats", chat.id) : null;
  const messageRef = chatRef ? query(
    collection(chatRef, "message"),
    orderBy("created_at", "asc")
  ) : null;

  const [messageSnapShort] = messageRef ? useCollection(messageRef) : [null];

  useEffect(() => {
    scrollToBottom();
  }, [chat, messages]);

  const endOfMessageRef = useRef(null);

  const recipientEmail = useQuery(
    ['recipientEmail'],
    async () => {
      if (!chat) return null;
      const email = chat.user.filter((user) => user != auth.email)[0];
      return email;
    }
  )


  const showMessage = () => {
    if (!chat && !messages) return null;

    if (messageSnapShort) {
      const chatMessages = [];
      messageSnapShort.forEach((doc) => {
        chatMessages.push({ ...doc.data(), timeStamp: "hgh" });
      });
      return chatMessages.map((message) => (
        <Chats user={message.user} chat={message.chat} key={message.id} />
      ));
    } else {
      return messages.map((message) => (
        <Chats user={message.user} chat={message.chat} key={message.id} />
      ));
    }
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!message || message == "") return;
    saveChatMessage()
    setMessage("");
    scrollToBottom();
    chatRefetch()
  };

  const saveChatMessage = () => {
    const docRef = doc(db, "chats", chat.id);
    const colRef = collection(docRef, "message");

    addDoc(colRef, {
      chat: message,
      user: auth.email,
      created_at: serverTimestamp(),
    });
  };

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  return (
    <section className="h-full relative flex flex-col justify-between gap-3">
      <div className="p-7 flex justify-between bg-accent-focus">
        <div className="">
          <p className=" text-lg font-bold text-neutral">{recipientEmail?.data}</p>
          <p>applied as UX Designer</p>
        </div>
        <div className="">
          <div className="btn-group">
            <button className="btn btn-active">Chat</button>
            <button className="btn">Email</button>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col gap-1 overflow-y-auto px-10 mb-5 scrollbar-hide">
        {showMessage()}
        <div ref={endOfMessageRef}></div>
      </div>

      <div className=" flex justify-between items-center w-full px-5 gap-2 pb-5 ">
        <div className="relative w-full flex">
          <form onSubmit={sendMessage} className=" w-full">
            <input
              type="text"
              placeholder="Type here"
              className=" rounded-full input input-bordered w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              className="text-natural font-bold absolute right-0 top-0 bottom-0 px-5"
              type="submit"
            >
              <MdSend size={25} />
            </button>
          </form>
        </div>

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
