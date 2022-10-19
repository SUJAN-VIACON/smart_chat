import React from "react";
import { useState } from "react";
import * as EmailVaildator from "email-validator";
import { query, collection, where, addDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { authentication, db } from "../../../firebase";

const FriendCard = ({ user }: { user: any }) => {
  const [auth] = useAuthState(authentication) as any;
  const router = useRouter();
  const chatQuery = query(
    collection(db, "chats"),
    where("user", "array-contains", auth.email)
  );
  const [chatSnapShort] = useCollection(chatQuery);

  const createChat = async (userEmail: string) => {

    if (
      EmailVaildator.validate(userEmail) &&
      userEmail != auth.email
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
  };

  const chatAlreadyExists = (email: any) => {
    const chats: any = [];
    if (chatSnapShort && chatSnapShort.docs.length > 0) {
      chatSnapShort.forEach((doc) => {
        chats.push({ ...doc.data(), id: doc.id });
      });
    }

    var existChatId = null;

    chats.forEach((chat: any) => {
      if (chat.user[0] == auth.email && chat.user[1] == email) {
        existChatId = chat.id;
      }

      if (chat.user[1] == auth.email && chat.user[0] == email) {
        existChatId = chat.id;
      }
    });

    return { id: existChatId };
  };

  return (
    <div>
      <div className="card w-72  shadow-xl p-5 bg-accent-content">
        <figure className="px-10 pt-2">
          <img
            src={user.photo_url}
            alt="Shoes"
            className="rounded-full w-[5rem] h-[5rem] border border-indigo-50"
          />
        </figure>

        <div className="mt-3 mb-5 items-center text-center">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-lg text-indigo-50">{user.name}</h1>
              <p className="font-[400] text-[#6E6E6E]">{user?.about ?? "user has no about"}</p>
            </div>

            <div>
              <p className="text-md">{user?.email}</p>
              <p className="text-md">{user?.phone ?? "xx-xxxx-xxxx"}</p>
            </div>
          </div>
        </div>

        {
          chatAlreadyExists(user.email).id ? (
            <button className="btn btn-primary" onClick={() => router.push("/chat/" + chatAlreadyExists(user.email).id)} >chat</button>
          ) :
            (
              <button className="btn btn-primary" onClick={() => createChat(user.email)}>Add+</button>
            )
        }

      </div>
    </div>
  );
};

export default FriendCard;
