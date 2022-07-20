import { async } from '@firebase/util';
import { log } from 'console';
import { doc, getDoc, query, collection, where, getDocs, Query } from "firebase/firestore";
import { db } from "../../firebase";
import User, { Auth, UserType } from "./User";


class Chat {

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

}

export default Chat;