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
import Spinner from "./Spinner";
import DragAndDrop from "../DrangAndDrop/DragAndDrop";

const ChatMain = ({ chat = null, messages = null }) => {

  const [showDragAndDrop, setShowDragAndDrop] = useState(false);

  // return (
  //   <div className="h-full relative flex flex-col justify-between">
  //     <Spinner loading={true} />
  //   </div>
  // )


  const [auth] = useAuthState(authentication);
  const [message, setMessage] = useState('');
  const endOfMessageRef = useRef(null);
  const chatId = chat ? chat.id : null;
  const chatRef = chatId ? doc(db, "chats", chatId) : null;
  const messageRef = chatRef ? query(
    collection(chatRef, "message"),
    orderBy("created_at", "asc")
  ) : null;

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
    setMessage("");
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageSnapShort, message]);

  const showMessage = () => {
    if (!chat && !messages) return null;
    if (messageSnapShort) {
      const chatMessages = [];
      messageSnapShort.forEach((doc) => {
        chatMessages.push({ ...doc.data(), timeStamp: "hgh" });
      });
      return chatMessages.map((message) => (
        <Chats key={message.chat.id} user={message.user} chat={message.chat} />
      ));
    } else {
      return messages.map((message) => (
        <Chats key={message.chat.id} user={message.user} chat={message.chat} />
      ));
    }
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
          <p className=" text-lg font-bold text-neutral">Akash Sharma</p>
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
        {!chat &&
          <div className="flex items-center h-full">
            <Spinner loading={true} />
          </div>
        }

        {showDragAndDrop ?
          (
            <div className="flex items-center justify-center h-full w-full border-2 rounded-md border-bg-base-300">
              <DragAndDrop />
            </div>)
          : showMessage()}
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

        <label htmlFor="" className="bg-base-300 p-3 rounded-full" onClick={() => setShowDragAndDrop((e) => !e)}>
          <BsFillFileEarmarkPostFill />
        </label>
      </div>
    </section>
  );
};

export default ChatMain;
