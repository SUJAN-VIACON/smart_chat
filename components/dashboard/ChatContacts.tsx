import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useAppSelector } from "../../App/hooks";
import Chat from "../../App/Models/Chat";
import { Auth } from "../../App/Models/User";
import ContactLabel from "./ContactLabel";



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
            <Link href={`/chat/${user.chatId}`} key={user.uid}>
              <a href="">
                <ContactLabel user={user} />
              </a>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default ChatContacts;
