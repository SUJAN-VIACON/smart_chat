import React from "react";

export const Card = ({ children }:any) => {
  return (
    <>
      <div className="w-full h-full bg-primary bg-opacity-60  backdrop-blur-3xl p-10 rounded-2xl relative">
       {children}
      </div>
    </>
  );
};
