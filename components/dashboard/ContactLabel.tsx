import Image from 'next/image'
import React, { useState } from 'react'
import * as EmailVaildator from "email-validator";
import { useAppSelector } from "../../App/hooks";
import { query, collection, where, addDoc } from "firebase/firestore";
import { authentication, db } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { Auth } from '../../App/Models/User';
import { IoMdAdd } from "react-icons/io";
import { useRouter } from 'next/router';

const ContactLabel = ({ user, setUser = null, setSearch = null, add = false }: { user: Auth, setUser?: any, setSearch?: any, add?: boolean }) => {

  const auth = useAppSelector((state) => state.auth.auth) as Auth;
  const router = useRouter();
  const chatQuery = query(
    collection(db, "chats"),
    where("user", "array-contains", auth.email)
  );
  const [chatSnapShort] = useCollection(chatQuery);

  const createChat = async (userEmail: string) => {
    const existChatId = chatAlreadyExists().id;

    if (existChatId) {
      router.push("/chat/" + existChatId)
    }

    if (
      EmailVaildator.validate(userEmail) &&
      userEmail != auth.email &&
      !existChatId
    ) {
      try {
        const newChat = await addDoc(collection(db, "chats"), {
          user: [auth.email, userEmail],
        });

        router.push("/chat/" + newChat.id);

      } catch (errors) {
        alert(errors);
        return;
      }
    }
    setUser(null);
    setSearch('');
  };

  const chatAlreadyExists = () => {

    const chats: any = [];
    if (chatSnapShort && chatSnapShort.docs.length > 0) {
      chatSnapShort.forEach((doc) => {
        chats.push({ ...doc.data(), id: doc.id });
      });
    }

    var existChatId = null;
    chats.forEach((chat: any) => {


      if (chat.user[0] == auth.email && chat.user[1] == user.email) {
        existChatId = chat.id;
      }

      if (chat.user[1] == auth.email && chat.user[0] == user.email) {
        existChatId = chat.id;
      }

    });

    return { id: existChatId };
  };

  return (
    <>
      <div className="bg-accent-content px-7 py-4">
        <div className=" flex items-center ">
          <Image
            src={user.photo_url ?? `https://avatars.dicebear.com/api/human/${user.name}.svg`}
            alt=""
            width={50} height={50}
            className=" w-10 rounded-full"
          />
          <div className="ml-5">
            <h1 className=" text-lg line-h text-center text-neutral">
              {user.name}
            </h1>
            <p className="text-neutral-content">Ux designer</p>
          </div>

          {add &&
            <button className=" text-neutral font-bold ml-20" onClick={(e) => createChat(user.email)}>
              <IoMdAdd size={30} />
            </button>
          }

        </div>
      </div>
    </>
  )
}

export default ContactLabel