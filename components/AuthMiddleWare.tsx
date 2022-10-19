import React, { useEffect, useLayoutEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAppDispatch } from '../App/hooks'
import { authStore } from '../features/auth/auth-slice'
import { authentication, db } from '../firebase'
import { SpinnerDiamond } from 'spinners-react'
import { updateDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import UserService from '../App/Services/UserService'
import { useRouter } from 'next/router'

const AuthMiddleWare = ({ children }: { children: any }) => {
    const dispatch = useAppDispatch();
    const [auth, loading] = useAuthState(authentication) as any;
    const route = useRouter();

    useLayoutEffect(() => {
        auth && UserService.isUserExist(auth?.uid).then((isExist: any) => {
            if (isExist) return;
            UserService.saveUser(auth);
        });

        if (auth) {
            updateDoc(doc(db, "users", auth.uid), {
                last_seen: serverTimestamp()
            });
        }else{
            route.push("/");
        }

    }, [auth])



    if (loading) {
        return <div className='flex justify-center items-center h-screen w-full'><SpinnerDiamond size={200} color='green' /></div>
    }

    if (auth) {
        dispatch(authStore({
            uid: auth.uid,
            name: auth.displayName,
            email: auth.email,
            number: auth.phoneNumber,
            photo_url: auth.photoURL,
            created_at: auth.metadata.creationTime,
            updated_at: auth.metadata.lastSignInTime,

        }))
    }

    return (
        <div>
            <main>{children}</main>
        </div>
    )
}

export default AuthMiddleWare