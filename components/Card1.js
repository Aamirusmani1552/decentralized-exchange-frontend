import Image from "next/image";
import React from "react";
import { BsCurrencyBitcoin } from "react-icons/bs";
import greenLineChart from "../images/Untitled (3).png";
import { MdOutlineArrowDropUp } from "react-icons/md";

const Card1 = () => {
  return (
    <div className="h-auto md:h-60 w-44 bg-indigo-200 rounded-md  backdrop-filter backdrop-blur-sm bg-opacity-25 p-2 select-none z-[2] -translate-y-10">
      <div className="flex gap-2 items-center justify-center">
        <div className="text-white text-4xl px-2 w-12 h-12 bg-[#4E5146] rounded-full flex items-center justify-center">
          <BsCurrencyBitcoin />
        </div>
        <div className="text-white flex flex-col">
          <span className="text-2xl">BTC</span>
          <span className="text-sm text-[#c0bcbc]">Bitcoin</span>
        </div>
      </div>
      <div>
        <Image src={greenLineChart} />
      </div>
      <div className="font-bold text-white text-center">
        <span> $19,948.20</span>
        <div className="text-xs text-[#c5f747] flex items-center justify-center">
          <MdOutlineArrowDropUp />
          4.3%
        </div>
      </div>
    </div>
  );
};

export default Card1;
