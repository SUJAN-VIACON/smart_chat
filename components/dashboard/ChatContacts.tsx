import { onSnapshot, query, where, collection } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useAppSelector } from "../../App/hooks";
import ChatService from "../../App/Services/ChatService";
import UserService, { Auth } from "../../App/Services/UserService";
import ContactLabel from "./ContactLabel";
import { authentication, db } from "../../firebase";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatContacts = ({ chatId }: { chatId: any }) => {
  const [auth] = useAuthState(authentication) as any;
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState<string>();
  const [result, setResult] = useState();
  const [searchableUsers, setSearchableUsers] = useState([]);
  const [showAllUser, setShowAllUser] = useState(false);

  useEffect(() => {
    ChatService.recipients(auth).then((recipientUsers: Auth | any) => {
      setUsers(recipientUsers);
      setSearchableUsers(recipientUsers)
    });
  }, [search, result]);

  const searchUser = async (event: any) => {
    event.preventDefault();
    const keyword = search;
    const q = query(collection(db, "users"), where("email", "==", keyword));
    onSnapshot(q, (querySnapshot) => {
      let user: any = [];
      querySnapshot.forEach((doc) => {
        user.push({ ...doc.data(), id: doc.id });
      });

      setResult(user[0]);
    });
  };

  const handleSearch = (text: any) => {
    const results = users.filter((user: any) => {
      return Object.values(user.email).join("").toLowerCase().includes(text.toLowerCase())
        || Object.values(user.name).join("").toLowerCase().includes(text.toLowerCase())
    });
    setSearchableUsers(results);
  }

  return (
    <section className="relative">

      <div className="relative">
        {showAllUser && (
          <div
            className=" cursor-pointer text-2xl font-bold text-white absolute top-[1.5rem] right-5 z-10"
            onClick={() => setShowAllUser(false)}
          >
            <AiOutlineClose />
          </div>
        )}

        <div
          className="bg-accent-content relative w-full p-3"
          onClick={() => setShowAllUser(true)}
        >
          <form className=" h-full " onSubmit={searchUser}>
            <input
              type="text"
              placeholder="Search"
              className=" bg-accent-content  w-full h-full px-10 py-3"
              onChange={(e) => {
                handleSearch(e.target.value);
                // setSearch(e.target.value);
              }}
            />
          </form>
          <BsSearch size={17} className=" absolute translate-x-[50%] top-[40%]" />
        </div>
      </div>

      {showAllUser && searchableUsers && (
        <div className="absolute bg-white text-black p-1 z-20 mt-7 w-full h-[65vh] overflow-y-auto scrollbar-hide">
          {searchableUsers.map((user: any) => (
            <Link href={`/chat/${user.chatId}`}>
              <a href="">
                <ContactLabel key={user.id} user={user} isActive={() => {
                  return chatId == user.chatId;
                }} />
              </a>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10">
        {users &&
          users.map((user: any) => (
            <div className="mt-3 mr-3" key={user.uid}>
              <Link href={`/chat/${user.chatId}`}>
                <a href="">

                  <ContactLabel key={user.id} user={user}
                    isActive={chatId == user.chatId}
                  />
                </a>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ChatContacts;
