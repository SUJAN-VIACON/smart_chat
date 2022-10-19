import Image from 'next/image'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { authentication } from '../../firebase';
import { Card } from '../dashboard/Card'
import Input from '../dashboard/Input/Input';

const EditProfile = () => {
    const [auth] = useAuthState(authentication) as any;

    return (
        <div className="w-full h-full py-10">
            <Card>
                <div className='flex flex-1 items-center p-3'>
                    <div>
                        <span className='text-2xl font-semibold mr-10'>Setting</span>
                    </div>
                    <div className='flex-1 space-x-5 text-lg'>
                        {/* <span>Account</span>
                        <span>Notification</span>
                        <span>Chat</span> */}
                    </div>
                </div>
                <hr className="w-full mt-3" />
                <div className='my-10 w-full h-[30vh]'>
                    <div className='flex w-full h-full'>
                        <div className='flex justify-center items-center border-r border-[#D9D9D9]'>
                            <div className='pl-10 pr-20 flex flex-col justify-center items-center gap-5'>
                                <div className=' rounded-full border border-indigo-50'>
                                    <Image src={auth?.photoURL} width={200} height={200} className="overflow-hidden rounded-full  " />
                                </div>
                                
                                <button className='btn btn-primary'>
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div className='px-20 w-full'>
                                <div className="grid grid-cols-2 gap-5">
                                    <Input label="First Name" />
                                    <Input label="Last Name" />

                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <Input label="First Name" />
                                    <Input label="Last Name" />

                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <Input label="First Name" />
                                    <Input label="Last Name" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=' absolute bottom-10 right-[8%]'>
                    <button className='btn bg-base-300 text-white px-10'>
                        save
                    </button>
                </div>
            </Card>
        </div>
    )
}

export default EditProfile