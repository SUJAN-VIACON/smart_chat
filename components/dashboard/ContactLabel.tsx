import Image from 'next/image'
import React from 'react'

const ContactLabel = () => {
  return (
    <>
         <div className="bg-accent-content px-7 py-4 mt-3 mr-3">
          <div className=" flex items-center  ">
            <Image
              src="/images/edu3.svg"
              alt=""
              width={50} height={50}
              className=" w-10 rounded-full"
            />
            <div className="ml-5">
              <h1 className=" text-lg line-h text-center text-neutral">
                Akash Sharma
              </h1>
              <p className="text-neutral-content">Ux designer</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default ContactLabel