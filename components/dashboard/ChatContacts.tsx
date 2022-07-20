import { onSnapshot, query, where, collection } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useAppSelector } from "../../App/hooks";
import Chat from "../../App/Models/Chat";
import { Auth } from "../../App/Models/User";
import ContactLabel from "./ContactLabel";
import { db } from '../../firebase'


const ChatContacts = () => {
  const auth = useAppSelector((state) => state.auth.auth) as Auth;
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState<string>();
  const [result, setResult] = useState()


  useEffect(() => {
    Chat.recipients(auth).then((recipientUsers: Auth | any) => {
      setUsers(recipientUsers);
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
      })

      setResult(user[0])
    });
  }

  return (
    <section>
      <div className="bg-accent-content relative w-full p-3">
        <form className=" h-full" onSubmit={searchUser}>
          <input type="text" placeholder="Search"
            className=" bg-accent-content  w-full h-full px-10 py-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <BsSearch size={17} className=" absolute translate-x-[50%] top-[40%]" />
        {result &&
          <div className="absolute bg-white text-black p-1 z-20 mt-7">
            <ContactLabel user={result} setUser={setResult} setSearch={setSearch} add={true} />
          </div>
        }
      </div>

      <div className="mt-10">
        {users &&
          users.map((user: any) => (
            <div className="mt-3 mr-3" key={user.uid}>
              <Link href={`/chat/${user.chatId}`} >
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
