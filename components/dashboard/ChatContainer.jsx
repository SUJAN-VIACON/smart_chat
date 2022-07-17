import React from "react";
import { Card } from "./Card";
import { MdOutlineMailOutline, MdFolderOpen } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import ChatContacts from "./ChatContacts";
import ChatMain from "./ChatMain";

const ChatContainer = () => {
  return (
    <>
      <div className="w-full h-full py-10">
        <Card>
          <div className=" w-full h-full bg-accent rounded-lg">
            <div className="flex flex-row h-full overflow-hidden rounded-lg">
              <div className="basis-3/12 bg-base-200"><ChatContacts/></div>
              <div className="basis-6/12 bg-base-200"><ChatMain/></div>
              <div className="basis-3/12 py-5 px-10">
                <div className=" flex flex-col items-center justify-center ">
                  <img
                    src="../images/edu3.svg"
                    alt=""
                    className=" w-20 rounded-full"
                  />
                  <h1 className="mt-2 text-2xl text-center text-neutral">Akash Sharma</h1>
                  <p className="mt-2 text-neutral-content">Ux designer</p>
                </div>
                <hr className="w-full my-5" />

                <div className="flex gap-4">
                  <MdOutlineMailOutline size={30} className="  font-light text-neutral-content" />{" "}
                  <span className="">Suajnmoi787@gmail.com</span>
                </div>

                <div className="flex gap-4 mt-2">
                  <IoIosCall size={30} className="  font-light text-neutral-content" />{" "}
                  <span className="">Suajnmoi787@gmail.com</span>
                </div>

                <hr className="w-full my-5" />

                <div>
                  <p>Share the meeting link </p>
                  <p className=" text-neutral-content text-light mt-2">
                    https://www.figma.com/file/VKFN
                  </p>
                </div>

                <hr className="w-full my-5" />

                <div className="flex justify-between">
                  <p>Shared Files</p>
                  <a href="">
                    <small >See all</small>
                  </a>
                </div>

                <div className="mt-2">
                  <div className="flex gap-5 mt-2 ">
                    <div className="bg-base-200 px-3 rounded flex items-center justify-center">
                      <MdFolderOpen size={25} />
                    </div>
                    <div>
                      <p> job description</p>
                      <small className=" text-neutral-content">1.3 MB</small>
                    </div>
                  </div>

                  <div className="flex gap-5 mt-2 ">
                    <div className="bg-base-200 px-3 rounded flex items-center justify-center">
                      <MdFolderOpen size={25} />
                    </div>
                    <div>
                      <p> job description</p>
                      <small className=" text-neutral-content">1.3 MB</small>
                    </div>
                  </div>

                  <div className="flex gap-5 mt-2 ">
                    <div className="bg-base-200 px-3 rounded flex items-center justify-center">
                      <MdFolderOpen size={25} />
                    </div>
                    <div>
                      <p> job description</p>
                      <small className=" text-neutral-content">1.3 MB</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ChatContainer;
