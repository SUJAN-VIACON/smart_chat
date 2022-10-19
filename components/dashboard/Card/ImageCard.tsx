import React from 'react'

const ImageCard = () => {
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">pohoto2555.jpg</h2>
                    <p>created at 2000</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Download</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageCard