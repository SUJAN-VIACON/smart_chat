import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatService from '../App/Services/ChatService';
import { Auth } from '../App/Services/UserService';
import DashboardLayout from '../components/app/DashboardLayout'
import FriendCard from '../components/dashboard/Card/FriendCard';
import { authentication } from '../firebase';

const Friends = () => {
    const [auth] = useAuthState(authentication) as any;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        ChatService.recipients(auth).then((recipientUsers: Auth | any) => {
            setUsers(recipientUsers);
        });
    }, [])

    return (
        <>
            <DashboardLayout>
                <div className="grid grid-cols-4 w-full h-full p-5 justify-center">
                    {users.map((user: any) => (
                        <FriendCard key={user.uid} user={user}/>
                    ))}
                </div>
            </DashboardLayout>
        </>
    )
}

export default Friends