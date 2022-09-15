import React from "react";
import Link from "next/link";
import { ConnectButton } from "@web3uikit/web3";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <header className="flex w-full py-2 items-center justify-between flex-col">
      <div className="flex w-full items-center justify-between border-b-2 border-[#707070] pb-3 md:border-b-0 md:pb-0">
        <div>
          <Link href={"/"}>
            <span className=" text-[#C5F747] cursor-pointer text-xl md:text-2xl font-semibold ">
              Swapify
            </span>
          </Link>
        </div>
        <div className="flex">
          <div className="text-white text-sm   items-center gap-5 font-semibold hidden md:flex">
            <Link href={"/"}>
              <span className="hover:text-[#C5F747] cursor-pointer ">Home</span>
            </Link>
            <Link href={"/Swap"}>
              <span className="hover:text-[#C5F747] cursor-pointer ">Swap</span>
            </Link>
            <Link href={"/Pool"}>
              <span className="hover:text-[#C5F747] cursor-pointer ">Pool</span>
            </Link>
            <Link href={"/Transactions"}>
              <span className="hover:text-[#C5F747] cursor-pointer ">
                Transactions
              </span>
            </Link>
          </div>
          {(router.pathname === "/Swap" || router.pathname === "/Pool") && (
            <ConnectButton />
          )}
        </div>
      </div>
      <div>
        <div
          className={`text-white  flex text-lg items-center gap-5 font-semibold md:hidden mt-3`}
        >
          <Link href={"/"}>
            <span className="hover:text-[#C5F747] cursor-pointer ">Home</span>
          </Link>
          <Link href={"/Swap"}>
            <span className="hover:text-[#C5F747] cursor-pointer ">Swap</span>
          </Link>
          <Link href={"/Pool"}>
            <span className="hover:text-[#C5F747] cursor-pointer ">Pool</span>
          </Link>
          <Link href={"/Transactions"}>
            <span className="hover:text-[#C5F747] cursor-pointer ">
              Transactions
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
