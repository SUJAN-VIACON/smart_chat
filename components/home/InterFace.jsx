import React from "react";

const InterFace = () => {
  return (
    <>
      <div className=" relative">
        <img src="../../images/header.svg" className="w-full" alt="" />
        <div
          id="particles-js"
          className="absolute top-0 left-0 right-0 bottom-0 w-full"
        ></div>
        <div className=" absolute top-0 left-0 right-0 bottom-0 w-full mt-10">
          <div className="hero bg-transparent text-white">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <img
                src="../../images/headerlogo.svg"
                className=" max-w-md rounded-lg "
              />
              <div>
                <h1 className="text-5xl font-bold">STUDY POINT LIVE</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-warning">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterFace;
