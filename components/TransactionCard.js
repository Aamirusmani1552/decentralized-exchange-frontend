import React from "react";
import { useMoralis } from "react-moralis";

const PoolCard = ({ TxAddress, tokenSwapped, tokenRecieved, user }) => {
  const { Moralis } = useMoralis();

  return (
    <div className="bg-[#4b4e41] px-[16px] w-full cursor-pointer text-white py-[8px]  mt-[16px] items-center flex justify-between h-12 rounded-md  text-center">
      <a
        href={`http://goerli.etherscan.io/tx/${TxAddress}`}
        target="_blank"
        className="hover:underline flex-1"
        rel="noopener noreferrer"
      >
        <span>{TxAddress.slice(0, 3) + "..." + TxAddress.slice(-3)}</span>
      </a>
      <span className="flex-1 text-center">
        {Moralis.Units.FromWei(tokenSwapped).slice(0, 10)}
      </span>
      <span className="flex-1 text-center">
        {Moralis.Units.FromWei(tokenRecieved).slice(0, 10)}
      </span>
      <a
        href={`https://goerli.etherscan.io/address/${user}`}
        target="_blank"
        className="flex-1 text-center"
      >
        <span className="hover:underline">
          {user.slice(0, 3) + "..." + user.slice(-3)}
        </span>
      </a>
    </div>
  );
};

export default PoolCard;
