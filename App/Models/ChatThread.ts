import { async } from '@firebase/util';
import { log } from 'console';
import { doc, getDoc, query, collection, where, getDocs, Query, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import User, { Auth, UserType } from "./User";


export type chatTypes = {
    id: string;
    user: Array<string>;
};

class ChatThread {

    // helper functions

    static find = async (id: string) => {
        const chatRef = doc(db, 'chats', id);
        return await getDoc(chatRef);
    }

    static recipients = async (auth: Auth) => {
        const chatQuery = query(collection(db, 'chats'), where("user", "array-contains", auth.email)) as Query<{ user: string[] }>;
        const querySnapshots = await getDocs(chatQuery);

        const usersPromises: Promise<UserType | null>[] = [];
        querySnapshots.forEach((doc) => {
            const recipientEmail = doc.data().user.filter((email: string) => email !== auth.email);
            usersPromises.push(new Promise((resolve) => {
                User.findByEmail(recipientEmail[0]).then(user => {
                    resolve({ ...user, chatId: doc.id });
                })
            }));
        });

        return Promise.all(usersPromises);
    }

    static getChatMessages = async (chatId: string) => {
        const messages: any = [];
        const chat: any = [];
        const chatRef = doc(db, "chats", chatId);

        const messageRef = query(
            collection(chatRef, "message"),
            orderBy("created_at", "asc")
        );
        const messageSnapShort = await getDocs(messageRef);

        messageSnapShort.forEach((doc: any) => {
            messages.push({
                ...doc.data(),
                id: doc.id,
            });
        });

        const chatSnapShort = await getDoc(chatRef);
        chat.push({ ...chatSnapShort.data(), id: chatSnapShort.id });

        return { chat: chat[0], messages: messages };
    }

    static saveChatMessage = (message: any, email: any, chatId: string) => {
        const docRef = doc(db, "chats", chatId);
        const colRef = collection(docRef, "message");

        addDoc(colRef, {
            chat: message,
            user: email,
            created_at: serverTimestamp(),
        });
    };

}

export default ChatThread;