import Link from "next/link";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";

const Header = ({title,back=true,addnew=false,addnewlink="",backlink="/"}) => {
  return <div className="bg-[#1D2327] p-[25px] mb-[20px] flex items-center justify-between gap-4">
    <div className="bg-[#1D2327] flex items-center justify-start gap-4">
  {back &&  <Link href={backlink}><FaArrowLeftLong className="text-white text-2xl"/></Link>}
    <p className="text-white text-[20px] font-semibold capitalize">{title}</p>
  </div>;
  {addnew &&  <Link href={addnewlink}><IoAddCircleOutline className="text-white text-2xl"/></Link>}
  </div>
};

export default Header;
