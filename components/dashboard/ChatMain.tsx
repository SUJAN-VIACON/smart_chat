import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
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
import UserService from "../../App/Services/UserService";


const ChatMain = ({ chat = null, messages = null }: { chat: any, messages: any }) => {
  const [showDragAndDrop, setShowDragAndDrop] = useState(false);
  const [auth] = useAuthState(authentication) as any;
  const [user, setUser] = useState() as any;
  const [message, setMessage] = useState("");
  const endOfMessageRef = useRef(null) as any;
  const chatId = chat ? chat.id : null;
  const chatRef = chatId ? doc(db, "chats", chatId) : null;
  const messageRef = chatRef
    ? query(collection(chatRef, "message"), orderBy("created_at", "asc"))
    : null;

  const [messageSnapShort] = useCollection(messageRef);

  const sendMessage = async (event:any) => {
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
     const userEmail = chat?.user ? chat.user.filter((userEmail:any)=> userEmail!=auth.email)[0]:"";
     UserService.findByEmail(userEmail).
     then((result:any)=> setUser(result))
    scrollToBottom();
  }, [messageSnapShort, message]);


  const showMessage = () => {
    if (!chat && !messages) return null;
    if (messageSnapShort) {
      const chatMessages: any = [];
      messageSnapShort.forEach((doc) => {
        chatMessages.push({ ...doc.data(), timeStamp: "hgh" });
      });
      if (!chatMessages.length) return;
      return chatMessages.map((message: any) => (
        <Chats key={message.chat.id} message={message} />
      ));
    } else {
      return messages.map((message: any) => (
        <Chats key={message.chat.id} message={message} />
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
          <p className=" text-lg font-bold text-neutral">{user?.name??"###"}</p>
          <p>{user?.about != '' && user?.about ? user?.about : "no about"}</p>
        </div>
      </div>

      <div className="h-full flex flex-col gap-1 overflow-y-auto px-10 mb-5 scrollbar-hide">
        {!chat && (
          <div className="flex items-center h-full">
            <Spinner loading={true} />
          </div>
        )}

        {showDragAndDrop ? (
          <div className="flex items-center justify-center h-full w-full border-2 rounded-md border-bg-base-300">
            <DragAndDrop chat={chat} setShowDragAndDrop={setShowDragAndDrop} />
          </div>
        ) : (
          showMessage()
        )}
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

        <label
          htmlFor=""
          className="bg-accent-content shadow-lg border border-gray-400 p-3 rounded-full"
          onClick={() => setShowDragAndDrop((e) => !e)}
        >
          {showDragAndDrop ? (<AiOutlineClose />) : (<BsFillFileEarmarkPostFill />)}
        </label>
      </div>
    </section>
  );
};

export default ChatMain;
