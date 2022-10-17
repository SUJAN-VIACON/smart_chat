import React from 'react'
import { Card } from '../dashboard/Card'

const EditProfile = () => {
    return (
        <div className="w-full h-full py-10">
            <Card>
                <div className='flex flex-1 items-center p-3'>
                    <div>
                        <span className='text-2xl font-semibold mr-10'>Setting</span>
                    </div>
                    <div className='flex-1 space-x-5 text-lg'>
                        <span>Account</span>
                        <span>Notification</span>
                        <span>Chat</span>
                    </div>
                </div>
                <hr className="w-full mt-3" />
                <div className='my-10 w-full h-[60vh]'>
                    <div className='flex w-full h-full'>
                        <div className='flex justify-center items-center border-r border-[#D9D9D9]'>
                                <div className=' w-[10rem] h-[10rem] mx-20 rounded-full bg-gray-400'></div>
                        </div>
                        <div className='flex-1'>
                                jkd
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default EditProfile