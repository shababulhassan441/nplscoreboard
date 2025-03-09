import Link from "next/link";
import React from "react";

const Card = ({item}) => {
  return <Link href={item.linkto} className="w-[170px] h-[150px] cursor-pointer bg-[#F1F5F9] rounded-sm flex flex-col gap-2 justify-center items-center">
    {item.icon}
    <p className="text-[18px] capitalize">{item.title}</p>
  </Link>;
};

export default Card;
