import React from 'react'

const Input = ({ label, placeHolder, value, handleChange, error = null }: { label: any, placeHolder: any, value: any, handleChange: any, error: any }) => {
    return (
        <div className='relative'>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">{label}</span>

                </label>
                <input type="text" placeholder={placeHolder} className="input input-bordered w-full " value={value} onChange={handleChange} />
            </div>

            {error &&
                <span className='text-red-400 pt-1 absolute bottom-[-1.3rem] text-xs'>
                    {error}
                </span>
            }
        </div>
    )
}

export default Input