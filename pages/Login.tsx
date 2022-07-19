import React from "react";
import { authentication, db } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const [user] = useAuthState(authentication);

  if (user) {
    router.push("/Dashboard");
  }

  const loginWithGoogle = () => {
    signInWithPopup(authentication, provider)
      .then((result) => {
        if (result.user) {
          storeUser(result.user);
          router.push("/Messenger");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const storeUser = async (user: any) => {
    !(await isUserExist(user)).valueOf() ? storeUserInFireBase(user) : null;
  };

  const isUserExist = async (user: any) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? true : false;
  };

  const storeUserInFireBase = async (user: any) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        number: user.phoneNumber,
        photo_url: user.photoURL,
        created_at: user.metadata.creationTime,
        updated_at: user.metadata.lastSignInTime,
        last_seen: new Date().toLocaleString(),
      });

      console.log("document saved");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center h-screen w-full">
        
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <Image
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/yvbOx5two0W.png"
              alt="Shoes"
              className="rounded-xl"

              height={100}
              width={100}
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Welcome to Sujan Messenger</h2>
            <p>For login your account click the below button</p>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={loginWithGoogle}>
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
