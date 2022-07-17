import React from "react";

const CommentCard = () => {
  return (
    <div className=" w-full flex items-center justify-center">
      <div className="card w-full border-gray-300 border mx-96 ">
        <figure className="px-10 pt-10">
          <img
            src="https://api.lorem.space/image/shoes?w=400&h=225"
            alt="Shoes"
            className=" rounded-full h-40 w-40"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Martin Johe, co-Founder /CEO</h2>
          <p className=" text-gray-400 my-3">FASTCOMPANY LTD</p>
          <p className=" text-gray-400 mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            minima fugiat et porro vitae quo doloremque? Praesentium cumque
            quaerat odit possimus? Minus ad, aperiam repellat corporis dolorem
            officia consequatur corrupti?
          </p>
          <div className="card-actions"></div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
