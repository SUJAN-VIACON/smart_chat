import { onSnapshot, query, where, collection } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useAppSelector } from "../../App/hooks";
import ChatThread from "../../App/Models/ChatThread";
import User, { Auth } from "../../App/Models/User";
import ContactLabel from "./ContactLabel";
import { db } from "../../firebase";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useQuery } from "react-query";
import { QueryClient } from "react-query";



const ChatContacts = () => {
  const auth = useAppSelector((state) => state.auth.auth) as Auth;
  const [search, setSearch] = useState<string>();
  const [result, setResult] = useState();
  const [showAllUser, setShowAllUser] = useState(false);

  const queryClient = new QueryClient()


  const users = useQuery("users", async () => {
    const users = await ChatThread.recipients(auth);
    return users;
  });


  const registeredUsers = useQuery("registeredUsers", async () => {
    const users = await User.all();
    return users;
  });

  const data5 = queryClient.getQueryData(["users"])
  console.log(data5);

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

  // if (users.isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  if (users.isError) {
    return <h1>error</h1>;
  }

  // if (registeredUsers.isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  if (registeredUsers.isError) {
    return <h1>error</h1>;
  }


  return (
    <section className="relative">

      <div className="relative">
        {showAllUser && (
          <div
            className=" cursor-pointer text-2xl font-bold text-white absolute top-[1rem] right-5 z-10"
            onClick={() => setShowAllUser(false)}
          >
            <AiOutlineCloseCircle size={40} />
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
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </form>
          <BsSearch size={17} className=" absolute translate-x-[50%] top-[40%]" />
        </div>
      </div>

      {showAllUser && registeredUsers.data && (
        <div className="absolute bg-white text-black p-1 z-20 mt-7 w-full h-[65vh] overflow-y-auto scrollbar-hide">
          {registeredUsers.data.map((user: any) => (

            <ContactLabel
              key={user.id}
              user={user}
              setUser={setResult}
              setSearch={setSearch}
              setShowAllUser={setShowAllUser}
              add={true}
            />

          ))}
        </div>
      )}

      <div className="mt-10">
        {users.data &&
          users.data.map((user: any) => (
            <div className="mt-3 mr-3" key={user.uid}>
              <Link href={`/chat/${user.chatId}`}>
                <a href="">
                  <ContactLabel key={user.id} user={user} />
                </a>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ChatContacts;
