import Image from "next/image";
import React from "react";
import { FaEthereum } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import redLineChart from "../images/Untitled (5).png";

const Card2 = () => {
  return (
    <div className="h-auto md:h-60 w-44 bg-indigo-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 p-2 select-none rotate-12 z-1 -translate-x-24">
      <div className="flex gap-2 items-center justify-center">
        <div className="text-white text-4xl px-2 w-12 h-12 bg-[#4E5146] rounded-full flex items-center justify-center">
          <FaEthereum />
        </div>
        <div className="text-white flex flex-col">
          <span className="text-2xl">ETH</span>
          <span className="text-sm text-[#c0bcbc]">Ethereum</span>
        </div>
      </div>
      <div>
        <Image src={redLineChart} />
      </div>
      <div className="font-bold text-white text-center">
        <span> $1,675.11</span>
        <div className="text-xs text-[#ec2b2b] flex items-center justify-center">
          <IoMdArrowDropdown />
          3.2%
        </div>
      </div>
    </div>
  );
};

export default Card2;
