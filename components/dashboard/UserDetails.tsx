import React from 'react'
import { MdOutlineMailOutline, MdFolderOpen } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import Image from 'next/image';

const UserDetails = () => {
    return (
        <div>
            <div className=" flex flex-col items-center justify-center ">
                <Image
                    src="/images/edu3.svg"
                    width={70} height={70}
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
    )
}

export default UserDetails