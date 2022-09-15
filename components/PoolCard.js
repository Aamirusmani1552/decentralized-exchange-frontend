import React from "react";
import { useMoralis } from "react-moralis";

const PoolCard = ({ id, poolId, owner, amount, token, active }) => {
  const { Moralis } = useMoralis();

  return (
    <div className="bg-[#4b4e41] px-[16px] w-full cursor-pointer text-white py-[8px]  mt-[16px] items-center flex justify-between h-12 rounded-md ">
      <a
        href={`http://goerli.etherscan.io/tx/${id}`}
        target="_blank"
        className="hover:underline"
        rel="noopener noreferrer"
      >
        <span>{poolId}</span>
      </a>
      <a href={`https://goerli.etherscan.io/address/${owner}`} target="_blank">
        <span className="hover:underline">
          {owner.slice(0, 4) + "..." + owner.slice(-4)}
        </span>
      </a>
      <span>{Moralis.Units.FromWei(amount)}</span>
      <a href={`https://goerli.etherscan.io/address/${token}`} target="_blank">
        <span className="hover:underline">
          {token.slice(0, 4) + "..." + token.slice(-4)}
          {/* <Logo /> */}
        </span>
      </a>
      <span
        className={`w-[10px] h-[10px] ${
          !active ? "bg-red-400" : "bg-green-400"
        } rounded-full`}
      ></span>
    </div>
  );
};

export default PoolCard;
