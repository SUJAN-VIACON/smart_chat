import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import UserService from "../../App/Services/UserService";
import { authentication } from "../../firebase";
import { MdOutlineMailOutline, MdFolderOpen } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import Image from 'next/image';

const UserDetails = ({ chat }: { chat: any }) => {
    const [auth] = useAuthState(authentication) as any;
    const [user, setUser] = useState() as any;

    useEffect(() => {
        if (chat) {
            const friendEmail = chat.user.filter((email: any) => email != auth.email)[0]
            UserService.findByEmail(friendEmail).then((result: any) => setUser(result))
        } else {
            UserService.find(auth.uid).then((result: any) => {
                setUser(result);
            })
        }
    }, [chat])

    return (
        <div>
            <div className=" flex flex-col items-center justify-center ">
                <Image
                    src={
                        user?.profileImage ??
                        user?.photo_url ?? `https://avatars.dicebear.com/api/human/${user?.name}.svg`
                    }
                    width={70} height={70}
                    alt=""
                    className=" w-20 rounded-full"
                />
                <h1 className="mt-2 text-2xl text-center text-neutral">{user?.name}</h1>
                <p className="mt-2 text-neutral-content">{user?.about != '' && user?.about ? user?.about : "no about"}</p>
            </div>
            <hr className="w-full my-5" />

            <div className="flex gap-4">
                <MdOutlineMailOutline size={30} className="  font-light text-neutral-content" />{" "}
                <span className="">{user?.email}</span>
            </div>

            <div className="flex gap-4 mt-2">
                <IoIosCall size={30} className="  font-light text-neutral-content" />{" "}
                <span className="">{user?.phone != '' && user?.phone ? user?.phone : "xx-xxxx-xxxx"}</span>
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