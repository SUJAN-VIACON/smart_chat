import { Auth } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useAppSelector } from "../../App/hooks";
import Chat from "../../App/Models/Chat";
import ContactLabel from "./ContactLabel";

type Auth = {
  email: string;
  photo_url: string;
  uid: string;
  name: string;
};

const ChatContacts = () => {
  const auth = useAppSelector((state) => state.auth.auth) as Auth;
  const [users, setUsers] = useState([]);


  useEffect(() => {
    Chat.recipients(auth).then((recipientUsers: Auth | any) => {
      setUsers(recipientUsers);
    });
  }, []);


  return (
    <section>
      <div className="bg-accent-content px-7 py-5">
        <div className="flex">
          <BsSearch size={17} />
          <label className=" ml-3">Search</label>
        </div>
      </div>

      <div className="mt-10">
        {users &&
          users.map((user: any) => (
            <Link href={`/chat/${user.chatId}`}>
              <a href="">
              <ContactLabel user={user} key={user.uid} />
              </a>
            </Link>
          ))
        }
      </div>
    </section>
  );
};

export default ChatContacts;
