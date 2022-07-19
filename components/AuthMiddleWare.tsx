import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAppDispatch } from '../App/hooks'
import { authStore } from '../features/auth/auth-slice'
import { authentication, db } from '../firebase'
import { SpinnerDiamond } from 'spinners-react'
import { updateDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore'


const AuthMiddleWare = ({ children }:{children:any}) => {
    const dispatch = useAppDispatch();
    const [user, loading] = useAuthState(authentication);

    useEffect(() => {
        if (user) {
            updateDoc(doc(db, "users", user.uid), {
                last_seen: serverTimestamp()
            });
        }      
    },[])

    const isUserExist = async (user: any) => {
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)
         return userSnap.exists() ? true : false;
       };


    if (loading) {
        return <div className='flex justify-center items-center h-screen w-full'><SpinnerDiamond size={200} color='green' /></div>
    }

    if (user) {
        dispatch(authStore({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            number: user.phoneNumber,
            photo_url: user.photoURL,
            created_at: user.metadata.creationTime,
            updated_at: user.metadata.lastSignInTime,
            
        }))
    }

    return (
        <div>
            <main>{children}</main>
        </div>
    )
}

export default AuthMiddleWare