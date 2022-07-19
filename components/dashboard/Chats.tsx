import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { authentication } from '../../firebase';
import ReceiverChatLabel from './ReceiverChatLabel'
import { SenderChatLabel } from './SenderChatLabel'

const Chats = ({ user, chat }: { user: any, chat: any }) => {
    const [auth] = useAuthState(authentication);
    return (
        <div>
            <div className="h-full flex flex-col gap-7 px-10">
                {user == auth.email ? <SenderChatLabel chat={chat}/> : <ReceiverChatLabel chat={chat} />}
            </div>
        </div>
    )
}

export default Chats