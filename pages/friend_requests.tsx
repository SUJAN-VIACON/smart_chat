import React from "react";
import DashboardLayout from "../components/app/DashboardLayout";
import FriendCard from "../components/dashboard/Card/FriendCard";

const FriendRequest = () => {
  return (

    <>
      <DashboardLayout>
        <div className="grid grid-cols-4 w-full h-full p-5 justify-center">
          <FriendCard />
          <FriendCard />
          <FriendCard />
          <FriendCard />
        </div>
      </DashboardLayout>
    </>
  );
};

export default FriendRequest;
