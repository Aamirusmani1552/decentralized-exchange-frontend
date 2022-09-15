import React from "react";
import { FaEthereum } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { SiChainlink } from "react-icons/si";

const Dropdown = ({ open, activeToken, setOpen, setActiveToken }) => {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpen((prev) => !prev);
        }}
        className="w-[128px] absolute disabled:bg-[#3C3C3C] disabled:text-[#6A6A6A] right-[32px] top-[16px] rounded-md outline-none bg-[#373A2F] text-white px-[16px] py-[8px] flex gap-1 items-center justify-center"
      >
        <div className="text-[#686868] text-xl"></div>
        {activeToken}
        {open ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </button>
      {open && (
        <div className="z-[2] max-h-[100px]  scrollbar-thin scrollbar-track-[#373535] scrollbar-thumb-gray-500 overflow-y-scroll border-2 border-[#C5F747] flex flex-col gap-1 w-[128px] rounded-md bg-[#373A2F] absolute top-[64px] right-[32px] overflow-hidden">
          <button
            onClick={(e) => {
              e.preventDefault();
              setActiveToken("ETH");
              setOpen((prev) => !prev);
            }}
            className="w-full hover:bg-[#595d4d] outline-none bg-[#373A2F] text-white px-[16px] py-[8px] flex gap-1 items-center justify-center"
          >
            <div className="text-[#686868] text-xl">
              <FaEthereum />
            </div>
            ETH
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setActiveToken("LINK");
              setOpen((prev) => !prev);
            }}
            className="w-full hover:bg-[#595d4d]  outline-none bg-[#373A2F] text-white px-[16px] py-[8px] flex gap-1 items-center justify-center"
          >
            <span className="text-[#3e60cf]">
              <SiChainlink />
            </span>
            LINK
          </button>
        </div>
      )}
    </>
  );
};

export default Dropdown;
