import React from "react";

const BlurCircle = ({ left, top, right, bottom,
}: { left?: any | undefined, top?: any | undefined, right?: any | undefined, bottom?: any | undefined }) => {
  return (
    <div
      className={`backdrop-circle w-52 h-52 bg-secondary rounded-full absolute saturate-200 blur-3xl`}
      style={{ left: left, top: top, right: right, bottom: bottom }}
    ></div>
  );
};

export default BlurCircle;
