import React from 'react'

const Input = ({label}:{label:any}) => {
    return (
        <div>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">{label}</span>
                    
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full " />
            </div>
        </div>
    )
}

export default Input