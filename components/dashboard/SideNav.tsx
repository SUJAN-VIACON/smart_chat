import Link from "next/link";
import React, { useState } from "react";
import BlurCircle from "./BlurCircle";

export const SideNav = () => {
  const [open, setOpen] = useState(true);
  const menus = [
    { title: "Dashboard", src: "Chart_fill", link: "/chat" },
    
    { title: "Add Friends", src: "User", gap: true, link: "/friend_requests" },
    { title: "Friends", src: "Chat", link: "/friends" },

    { title: "Setting", src: "Setting",gap: true, link: "/profile" },
  ];
  return (
    <>
      <div
        className={`sidebar z-10 ${
          open ? "w-72" : "w-20"
        }  h-screen bg-primary bg-opacity-60 relative backdrop-blur-3xl duration-300 p-5 pt-8 rounded-r-3xl`}
      >
        <img
          src="../images/dashboard-icons/side-nav/control.png"
          alt=""
          className={` cursor-pointer absolute w-7 top-9 -right-3 rounded-full ${
            !open && "rotate-180"
          } border-2 border-primary`}
          onClick={() => setOpen(!open)}
        />

        <div className="flex gap-x-4 items-center">
          <img
            src="../images/dashboard-icons/side-nav/logo.png"
            alt=""
            className={`cursor-pointer duration-300 ${!open && "rotate-180"}`}
          />
          <h1
            className={` text-xl text-content origin-left font-medium duration-300 ${
              !open && "scale-0"
            }`}
          >
            Smart Chat
          </h1>
        </div>

        <hr className=" mt-7" />

        <ul className="pt-6">
          {menus.map((menu, index) => (
            <Link href={menu.link} key={index}>
            <li
              key={index}
              className={`p-2 flex items-center gap-x-4 text-neutral cursor-pointer hover:bg-white hover:text-black rounded ${
                menu.gap ? "mt-9" : "mt-2"
              }`}
            >
              <img
                src={`../images/dashboard-icons/side-nav/${menu.src}.png`}
                alt=""
              />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {menu.title}
              </span>
            </li>
            </Link>
          ))}
        </ul>
      </div>
      <BlurCircle bottom={0} left={-5}/>
    </>
  );
};