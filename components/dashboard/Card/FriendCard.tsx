import React from "react";

const FriendCard = ({ user }: { user: any }) => {
  return (
    <div>
      <div className="card w-72  shadow-xl p-5 bg-accent-content">
        <figure className="px-10 pt-2">
          <img
            src={user.photo_url}
            alt="Shoes"
            className="rounded-full w-[5rem] h-[5rem] border border-indigo-50"
          />
        </figure>

        <div className="mt-3 mb-5 items-center text-center">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-lg text-indigo-50">{user.name}</h1>
              <p className="font-[400] text-[#6E6E6E]">Designer</p>
            </div>

            <div>
              <p className="text-sm text-[#6E6E6E]">Department</p>
              <p className="text-sm">Design and development</p>
            </div>

            <div>
              <p className="text-md">{user.email}</p>
              <p className="text-md">9007393435</p>
            </div>
          </div>
        </div>
        <button className="btn btn-primary">Add+</button>
      </div>
    </div>
  );
};

export default FriendCard;
