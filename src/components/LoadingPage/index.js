import React from "react";
import Loader from "../Loader";

const Loading = () => {
  return (
    <div className="loading_page h-screen overflow-hidden w-full bg-slate-100 flex justify-center items-center fixed top-0 right-0 z-40">
      <Loader />
    </div>
  );
};

export default Loading;
