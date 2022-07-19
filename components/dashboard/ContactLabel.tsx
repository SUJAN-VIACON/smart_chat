import Image from 'next/image'
import React from 'react'
import * as EmailVaildator from "email-validator";
import { useAppSelector } from "../../App/hooks";
import {
  query,
  collection,
  where,
  onSnapshot,
  setDoc,
  doc,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { log } from "console";
import { useCollection } from "react-firebase-hooks/firestore";

export type Auth = {
  email: string ;
  photo_url?: string | undefined;
  uid?: string | undefined;
  name?: string | undefined;
};

const ContactLabel = ({ user, add = false }: { user: Auth; add?: boolean }) => {

  const auth = useAppSelector((state) => state.auth.auth) as Auth;

  const chatQuery = query(
    collection(db, "chats"),
    where("user", "array-contains", auth.email)
  );

  const [chatSnapShort] = useCollection(chatQuery);

  const createChat = async (userEmail: string) => {
    if (
      EmailVaildator.validate(userEmail) &&
      userEmail != auth.email &&
      !chatAlreadyExists()
    ) {
      try {
        await addDoc(collection(db, "chats"), {
          user: [auth.email, userEmail],
        });
      } catch (errors) {
        alert(errors);
      }

      userEmail = "ds";
    }
  };

  const chatAlreadyExists = () => {
    const chat: any = [];
    if (chatSnapShort && chatSnapShort.docs.length > 0) {
      chatSnapShort.forEach((doc) => {
        chat.push({ ...doc.data(), id: doc.id });
      });
    }
    return chat.length ? true : false;
  };

  const link = `/chat/${user.chatId}`;

  return (
    <>
         <div className="bg-accent-content px-7 py-4 mt-3 mr-3">
          <div className=" flex items-center ">
            <Image
              src={user.photo_url}
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
          </div>
        </div>
    </>
  )
}

export default ContactLabel