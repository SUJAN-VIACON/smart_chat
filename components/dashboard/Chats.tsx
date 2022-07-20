import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { authentication } from '../../firebase';
import ReceiverChatLabel from './ReceiverChatLabel'
import { SenderChatLabel } from './SenderChatLabel'

export type Auth = {
    email: string;
    photo_url?: string | undefined;
    uid?: string | undefined;
    name?: string | undefined;
};

const Chats = ({ user, chat = null, key }: { user: any, chat: null | undefined, key: any }) => {
    if (!chat) return;
    const [auth] = useAuthState(authentication);
    if (!auth) return;
    return (
        <div key={key}>
            {user == auth.email ? <SenderChatLabel chat={chat} /> : <ReceiverChatLabel chat={chat} />}
        </div>
    )
}

export default Chats