import React from "react";

export const Card = ({ children }) => {
  return (
    <>
      <div className="w-full h-full bg-primary bg-opacity-60  backdrop-blur-3xl p-10 rounded-2xl">
       {children}
      </div>
    </>
  );
};
