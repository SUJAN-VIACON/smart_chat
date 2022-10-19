import React, { useEffect, useState } from "react";
import UserService, { Auth } from "../App/Services/UserService";
import DashboardLayout from "../components/app/DashboardLayout";
import FriendCard from "../components/dashboard/Card/FriendCard";

const FriendRequest = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    UserService.all().then((allUsers: Auth | any) => {
      setUsers(allUsers);
    });

  }, [users]);
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
