import React from "react";

const Button = ({text,clickFunc}) => {
  return (
    <button onClick={()=> clickFunc()}  className="bg-[#0066FF] capitalize py-[6px] px-[26px] text-white cursor-pointer text-[13px] rounded-sm">
      {text}
    </button>
  );
};

export default Button;
