import React from "react";

const FriendCard = () => {
  return (
    <div>
      <div className="card w-72 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src="https://placeimg.com/400/225/arch"
            alt="Shoes"
            className="rounded-full w-[5rem] h-[5rem]"
          />
        </figure>
        <div className="card-body items-center text-center">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-lg text-indigo-50">Nilesh</h1>
              <p>Designer</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
