import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import UserService from "../../App/Services/UserService";
import { authentication } from "../../firebase";
import ProfileButton from "./ProfileButtton/ProfileButton";

const UpperNav = () => {
  const [auth] = useAuthState(authentication) as any;
  const [user, setUser] = useState() as any;

  useEffect(() => {
    UserService.find(auth.uid).then((result: any) => {
      setUser(result);
    })
  }, [])
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semi-bold text-neutral">Welcome {user ? user.name.split(" ")[0] : ""}</h1>
          <small className=" text-content-200 ">
            to Smart Coder Chat
          </small>
        </div>
        <div>
          <ProfileButton user={user}/>
        </div>
      </div>


      <hr className="w-full mt-3" />
    </>
  );
};

export default UpperNav;
