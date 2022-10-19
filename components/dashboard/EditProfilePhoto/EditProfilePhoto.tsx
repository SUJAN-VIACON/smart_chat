import React, { useState } from 'react'

import { useDropzone } from "react-dropzone";
import {
    BsFileEarmarkArrowDown,
    BsFillFileEarmarkPostFill,
} from "react-icons/bs";
import Image from "next/image";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    doc,
    collection,
    addDoc,
    serverTimestamp,
    orderBy,
    query,
    updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { authentication, db, storage } from '../../../firebase';

const EditProfilePhoto = ({ user }: { user: any }) => {
    const [files, setFiles] = useState([]) as any;

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles((e: any) => {
                const records = acceptedFiles.map((file: any) => {
                    return Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    });
                });
                return records;
            });
        },
    });

    const uploadFile = (file: any) => {
        if (!file) return;
        const imageRef = ref(storage, `iamges/${file.name}+${v4()}`);
        uploadBytes(imageRef, file)
            .then((data) => {
                return getDownloadURL(data.ref);
            })
            .then((result) => {
                updateUser(result);
            })
            .then((response) => {
                // 
            });
    };

    const updateUser = async (imageUrl: any) => {
        updateDoc(doc(db, "users", user.uid), {
            profileImage: imageUrl
        });
    };

    return (
        <div>

            <div className='pl-10 pr-20 flex flex-col justify-center items-center gap-5'>
                <div className=' rounded-full border border-indigo-50'>
                    {!files.length ?
                        (
                            <Image src={user?.profileImage ?? user.photo_url} width={200} height={200} className="overflow-hidden rounded-full  " />
                        ) :
                        (
                            <Image src={files[0]?.preview} width={200} height={200} className="overflow-hidden rounded-full  " />

                        )
                    }
                </div>

                {!files.length ?
                    (<div
                        {...getRootProps()}
                        className=" w-full h-full flex justify-center items-center"
                    >
                        <button className='btn btn-primary'>
                            Edit Profile
                        </button>
                    </div>
                    )
                    :
                    (
                        <button className='btn btn-primary' onClick={() => uploadFile(files[0])}>
                            Save Profile
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default EditProfilePhoto