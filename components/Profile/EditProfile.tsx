import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { authentication, db } from '../../firebase';
import { Card } from '../dashboard/Card'
import Input from '../dashboard/Input/Input';
import { Formik } from 'formik';
import * as yup from "yup";
import { doc, updateDoc } from 'firebase/firestore';
import UserService from '../../App/Services/UserService';

const profileSchema = yup.object().shape({
    firstName: yup.string().required("first name is required"),
    lastName: yup.string().required("last name is required"),
    email: yup
        .string()
        .email("please enter valid email")
        .required("email is required"),
});


const EditProfile = ({user}:{user:any}) => {

    return (
        <div className="w-full h-full py-10">
            <Card>
                <Formik
                    initialValues={{
                        firstName: user.name.split(" ")[0], lastName: user?.name.split(" ")[1], email: user?.email,
                        phone: user?.phone??'', about: user?.about??""
                    }}
                    validationSchema={profileSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        updateDoc(doc(db, "users", user?.uid), {
                            name: `${values.firstName} ${values.lastName}`,
                            phone: values?.phone,
                            about: values.about
                        });
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
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
                                                <Image src={user?.photo_url} width={200} height={200} className="overflow-hidden rounded-full  " />
                                            </div>

                                            <button className='btn btn-primary'>
                                                Edit Profile
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex-1'>


                                        <div className='px-20 w-full space-y-5'>
                                            <div className="grid grid-cols-2 gap-5">
                                                <Input label="First Name" placeHolder="enter your first name" value={values.firstName}
                                                    handleChange={handleChange("firstName")} error={errors.firstName}
                                                />
                                                <Input label="Last Name" placeHolder="enter your last name" value={values.lastName}
                                                    handleChange={handleChange("lastName")} error={errors.lastName}
                                                />

                                            </div>
                                            <div className="grid grid-cols-2 gap-5">
                                                <Input label="Email" placeHolder="enter your email id" value={values.email}
                                                    handleChange={handleChange("email")} error={errors?.email}
                                                />
                                                <div>
                                                    <button className='btn btn-primary mt-10'>verified</button>
                                                </div>

                                            </div>
                                            <div className="grid grid-cols-2 gap-5">
                                                <Input label="Phone No" placeHolder="enter your phone number" value={values.phone}
                                                    handleChange={handleChange("phone")} error={errors?.phone}
                                                />
                                                <Input label="your about" placeHolder="enter some thing about you" value={values.about}
                                                    handleChange={handleChange("about")} error={errors?.about}
                                                />

                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className=' absolute bottom-10 right-[8%]'>
                                <button className='btn bg-base-300 text-white px-10' type='submit'>
                                    save
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </Card>
        </div >
    )
}

export default EditProfile