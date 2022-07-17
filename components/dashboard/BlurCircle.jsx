import React from "react";

const BlurCircle = ({
  left = null,
  top = null,
  right = null,
  bottom = null,
}) => {
  // left = left < 0 ? `-left-${Math.abs(left)}` : `left-${left}`;
  // top = top < 0 ? `-top-${Math.abs(top)}` : `top-${top}`;
  // right = right < 0 ? `-right-${Math.abs(right)}` : `right-${right}`;
  // bottom = bottom < 0 ? `-bottom-${Math.abs(bottom)}` : `bottom-${bottom}`;
  return (
    <div
      className={`backdrop-circle w-52 h-52 bg-secondary rounded-full absolute saturate-200 blur-3xl`}
      style={{left: left, top: top, right: right, bottom: bottom}}
    ></div>
  );
};

export default BlurCircle;
