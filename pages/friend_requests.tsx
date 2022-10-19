import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import UserService, { Auth } from "../App/Services/UserService";
import DashboardLayout from "../components/app/DashboardLayout";
import FriendCard from "../components/dashboard/Card/FriendCard";
import { authentication } from "../firebase";

const FriendRequest = () => {
  const [users, setUsers] = useState([]);
  const [auth] = useAuthState(authentication) as any;

  useLayoutEffect(() => {
    (new UserService(auth)).all().then((allUsers: Auth | any) => {
      setUsers(allUsers);
    });

  }, []);
  return (
    <>
      <DashboardLayout>
        <div className="grid grid-cols-4 w-full h-full p-5 justify-center">
          {users.map((user: any) => (
            <FriendCard key={user.id} user={user} />
          ))}
        </div>
      </DashboardLayout>
    </>
  );
};

export default FriendRequest;
