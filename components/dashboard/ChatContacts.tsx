import { onSnapshot, query, where, collection } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useAppSelector } from "../../App/hooks";
import Chat from "../../App/Models/Chat";
import User, { Auth } from "../../App/Models/User";
import ContactLabel from "./ContactLabel";
import { db } from "../../firebase";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ChatContacts = () => {
  const auth = useAppSelector((state) => state.auth.auth) as Auth;
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState<string>();
  const [result, setResult] = useState();
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [showAllUser, setShowAllUser] = useState(false);

  useEffect(() => {
    Chat.recipients(auth).then((recipientUsers: Auth | any) => {
      setUsers(recipientUsers);
    });

    User.all().then((allUsers: Auth | any) => {
      setRegisteredUsers(allUsers);
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

  return (
    <section>
      {showAllUser && (
        <div
          className="  -top-10 -right-10 bott text-2xl font-bold text-white"
          onClick={() => setShowAllUser(false)}
        >
          <AiOutlineCloseCircle size={40} />
        </div>
      )}

      <div
        className="bg-accent-content relative w-full p-3"
        onClick={() => setShowAllUser(true)}
      >
        <form className=" h-full" onSubmit={searchUser}>
          <input
            type="text"
            placeholder="Search"
            className=" bg-accent-content  w-full h-full px-10 py-3"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </form>
        <BsSearch size={17} className=" absolute translate-x-[50%] top-[40%]" />

        {/* {result && (
          <div className="absolute bg-white text-black p-1 z-20 mt-7">
            <ContactLabel
              user={result}
              setUser={setResult}
              setSearch={setSearch}
              add={true}
            />
          </div>
        )} */}

        {showAllUser && registeredUsers && (
          <div className="absolute bg-white text-black p-1 z-20 mt-7">
            {registeredUsers.map((user: any) => (
              <div key={user.id}>
                <ContactLabel
                  user={user}
                  setUser={setResult}
                  setSearch={setSearch}
                  add={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        {users &&
          users.map((user: any) => (
            <div className="mt-3 mr-3" key={user.uid}>
              <Link href={`/chat/${user.chatId}`}>
                <a href="">
                  <ContactLabel user={user} />
                </a>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ChatContacts;
