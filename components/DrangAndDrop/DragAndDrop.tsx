import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BsFileEarmarkArrowDown, BsFillFileEarmarkPostFill } from 'react-icons/bs'
import Image from 'next/image'

const DragAndDrop = () => {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles((e) => {
                const records = acceptedFiles.map((file: any) => {
                    return Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                });
                return records;
            })
        }
    })
    return (
        <div>
            <div {...getRootProps()} className=" w-full h-full flex justify-center items-center">
                <input {...getInputProps()} />
                <div className="">
                    {files.length &&
                        (
                            <div>
                                {files.map((file) => (
                                    <div className='flex flex-col justify-center gap-8'>
                                        <Image src={file.preview} width={300} height={300} className="rounded-md"/>
                                        <button className='p-3 rounded-full bg-base-300'>Send</button>
                                    </div>
                                ))
                                }
                            </div>

                        )}

                    {!files.length &&
                        (
                            <BsFileEarmarkArrowDown size={100} />
                        )}
                </div>
            </div>
        </div>
    )
}

export default DragAndDrop