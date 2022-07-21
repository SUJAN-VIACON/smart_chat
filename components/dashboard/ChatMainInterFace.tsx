import React from 'react'
import { BsChatText } from "react-icons/bs";

const ChatMainInterFace = () => {
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='flex flex-col items-center'>
        <BsChatText size={150} />
        <p className=' text-xl font-semibold mt-10'>Welcome to Sujan Academy</p>
      </div>
    </div>
  )
}

export default ChatMainInterFace