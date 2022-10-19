
import { collection, query, where, getDocs, doc, getDoc, limit, Query, setDoc } from "firebase/firestore";
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
    public auth;

    constructor(auth: any) {
        this.auth = auth;
    }

    // helper functions

    static find = async (id: string) => {
        const userRef = doc(db, 'users', id);
        return (await getDoc(userRef)).data();
    }

    static isUserExist = async (id: string) => {
        if (!id) return;
        const userRef = (doc(db, "users", id));
        const userSnap = (await getDoc(userRef)).exists()

        return userSnap;
    }

    public all = async (minLimit = null) => {
        const users: UserType[] = [];
        const userQuery = (minLimit ? query(collection(db, 'users'), limit(minLimit)) : query(collection(db, 'users'))) as Query<UserType>;

        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
        });

        if (users.length) {
            return users.filter((user) => user.uid != this.auth.uid)
        }

        return users;
    }

    static findByEmail = async (email: string) => {
        const users: UserType[] = [];
        const userQuery = (query(collection(db, 'users'), where("email", "==", email))) as Query<UserType>;

        const querySnapshot = await getDocs(userQuery);

        querySnapshot.forEach((doc) => {
            console.log(doc.data);
            users.push({ ...doc.data(), id: doc.id });
        });

        return users.length > 0 ? users[0] : null;
    }

    static saveUser = async (auth: any) => {
        await setDoc(doc(db, "users", auth.uid), {
            uid: auth.uid,
            name: auth.displayName,
            email: auth.email,
            number: auth.phoneNumber,
            photo_url: auth.photoURL,
            created_at: auth.metadata.creationTime,
            updated_at: auth.metadata.lastSignInTime,
            last_seen: new Date().toLocaleString(),
        });
    }

}

export default UserService;