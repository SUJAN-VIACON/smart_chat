import React from 'react'
import Link from 'next/link'
import { signOut } from "firebase/auth";
import { authentication } from '../../../firebase';

const ProfileButton = ({ user }: any) => {
    return (
        <div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full border border-indigo-50">
                        <img src={
                            user?.profileImage ??
                            user?.photo_url ?? `https://avatars.dicebear.com/api/human/${user?.name}.svg`
                        } />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <Link href="/profile">
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </Link>

                    </li>
                    <li onClick={() => signOut(authentication)}><a>Logout</a></li>
                </ul>
            </div>
        </div>
    )
}

export default ProfileButton