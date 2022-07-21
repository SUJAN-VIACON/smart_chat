import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import BlurCircle from "./BlurCircle";

export const SideNav = () => {
  const [open, setOpen] = useState(true);
  const menus = [
    { title: "Dashboard", src: "Chart_fill", link: "/" },
    { title: "Inbox", src: "Chat", link: "/" },
    { title: "Account", src: "User", gap: true, link: "/" },
    { title: "Schedule", src: "Calendar", link: "/" },
    { title: "Search", src: "Search", link: "/" },
    { title: "Analytics", src: "Chart", link: "/" },
    { title: "Files", src: "Folder", gap: true, link: "/" },
    { title: "Setting", src: "Setting", link: "/" },
  ];
  return (
    <>
      <div
        className={`sidebar z-10 ${
          open ? "w-72" : "w-20"
        }  h-screen bg-primary bg-opacity-60 relative backdrop-blur-3xl duration-300 p-5 pt-8 rounded-r-3xl`}
      >
        <div
          className={` cursor-pointer absolute w-7 top-9 -right-3 rounded-full ${
            !open && "rotate-180"
          } border-2 border-primary`}
          onClick={() => setOpen(!open)}
        >
          <Image
            height={30}
            width={30}
            src="/images/dashboard-icons/side-nav/control.png"
            alt=""
          />
        </div>

        <div className="flex gap-x-4 items-center">
          <div
            className={`cursor-pointer duration-300 ${!open && "rotate-180"}`}
          >
            <Image
              height={30}
              width={30}
              src="/images/dashboard-icons/side-nav/logo.png"
              alt=""
            />
          </div>
          <h1
            className={` text-xl text-content origin-left font-medium duration-300 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>

        <hr className=" mt-7" />

        <ul className="pt-6">
          {menus.map((menu, index) => (
            <Link href={menu.link} key={index}>
              <a>
                <li
                  className={`p-2 flex items-center gap-x-4 text-neutral cursor-pointer hover:bg-white hover:text-black rounded ${
                    menu.gap ? "mt-9" : "mt-2"
                  }`}
                >
                  <Image
                    height={30}
                    width={30}
                    src={`/images/dashboard-icons/side-nav/${menu.src}.png`}
                    alt=""
                  />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menu.title}
                  </span>
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
      <BlurCircle bottom={0} left={-5} />
    </>
  );
};
