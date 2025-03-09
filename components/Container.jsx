import React from "react";

const Container = ({ children }) => {
  return (
    <div className=" flex h-screen  flex-col  items-center bg-gray-600">
      <div className=" max-w-[420px] w-full h-full bg-white relative">{children}</div>
    </div>
  );
};

export default Container;
