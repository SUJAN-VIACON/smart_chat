import Image from "next/image";
import React, { useState } from "react";
import * as EmailVaildator from "email-validator";
import { useAppSelector } from "../../App/hooks";
import { query, collection, where, addDoc } from "firebase/firestore";
import { authentication, db } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { Auth } from "../../App/Services/UserService";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/router";


const ContactLabel = ({
  user,
  setUser = null,
  setSearch = null,
  add = false,
  setShowAllUser = false
}: {
  user: Auth;
  setUser?: any;
  setSearch?: any;
  add?: boolean;
  setShowAllUser?: any
}) => {

  return (
    <>
      <div className="bg-accent-content px-7 py-4 mb-3">
        <div className=" flex justify-between">
          <div className=" flex">
            <Image
              src={
                user.photo_url ??
                `https://avatars.dicebear.com/api/human/${user.name}.svg`
              }
              alt=""
              width={50}
              height={50}
              className=" w-10 rounded-full"
            />
            <div className="ml-5">
              <h1 className=" text-lg line-h text-center text-neutral">
                {user.name}
              </h1>
              <p className="text-neutral-content">Ux designer</p>
            </div>
          </div>

          {add && (
            <button
              className=" text-neutral font-bold"
            >
              <IoMdAdd size={30} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactLabel;
