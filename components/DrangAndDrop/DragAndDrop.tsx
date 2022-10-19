import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  BsFileEarmarkArrowDown,
  BsFillFileEarmarkPostFill,
} from "react-icons/bs";
import Image from "next/image";
import { v4 } from "uuid";
import { authentication, db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { type } from "os";

const DragAndDrop = ({ chat, setShowDragAndDrop }: { chat: any, setShowDragAndDrop: any }) => {
  const [files, setFiles] = useState([
    { preview: '' }
  ]);
  const [message, setMessage] = useState("");
  const [auth] = useAuthState(authentication);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((e) => {
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
        sendMessage(result);
      })
      .then((response) => {
        setShowDragAndDrop(false);
      });
  };

  const sendMessage = async (imageUrl: any) => {
    const docRef = doc(db, "chats", chat.id);
    const colRef = collection(docRef, "message");
    addDoc(colRef, {
      imageUrl: imageUrl,
      chat: message,
      user: auth?.email,
      created_at: serverTimestamp(),
    });
    setMessage("");
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className=" w-full h-full flex justify-center items-center"
      >
        <input {...getInputProps()} />
        <div className="">
          {!files.length && <BsFileEarmarkArrowDown size={100} />}
        </div>
      </div>

      <div>
        {files.length && (
          <div>
            {files.map((file) => (
              <div key={file.preview} className="flex flex-col justify-center gap-8">
                <Image
                  src={file.preview}
                  width={300}
                  height={300}
                  className="rounded-md"
                />

                <input
                  type="text"
                  placeholder="write any comment..."
                  className=" rounded-full input input-bordered w-full"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <button
                  className="py-2 px-2 rounded-full bg-base-300 text-lg"
                  onClick={() => uploadFile(file)}
                >
                  Upload
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;