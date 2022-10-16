
import { collection, query, where, getDocs, doc, getDoc, limit, Query } from "firebase/firestore";
import { db } from "../../firebase";

export type Auth = {
    id: string;
    email: string;
    photo_url?: string;
    uid?: string;
    name?: string;
    chatId?: string;
};

export type UserType = {
    email?: string | undefined;
    photo_url?: string | undefined;
    uid?: string | undefined;
    name?: string | undefined;
    id?: string | undefined;
    chatId?: string | undefined;
}

class UserService {

    // helper functions

    static find = async (id: string) => {
        const userRef = doc(db, 'users', id);
        return await getDoc(userRef);
    }

    static all = async (minLimit = null) => {

        const users: UserType[] = [];
        const userQuery = (minLimit ? query(collection(db, 'users'), limit(minLimit)) : query(collection(db, 'users'))) as Query<UserType>;

        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
        });

        return users;
    }

    static findByEmail = async (email: string) => {
        const users: UserType[] = [];
        const userQuery = (query(collection(db, 'users'), where("email", "==", email))) as Query<UserType>;

        const querySnapshot = await getDocs(userQuery);

        querySnapshot.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
        });

        return users.length > 0 ? users[0] : null;
    }

}

export default UserService;