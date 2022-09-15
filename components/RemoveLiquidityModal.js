import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { accountContext } from "../context/accountContext";
import {
  linkbi,
  dexAbi,
  DEX_CONTRACT_ADDRESS,
  linkAbi,
} from "../constants/address.js";
import toast from "react-hot-toast";
import BigNumber from "bignumber.js";

const RemoveLiquidityModal = ({ setOpenWithdrawLiquidityModal }) => {
  const [value, setValue] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenValue, setTokenValue] = useState("");
  const [loadingRemovePool, setloadingRemovePool] = useState(false);
  const { Moralis, account } = useMoralis();
  const { contractAddresses } = useContext(accountContext);

  useEffect(() => {
    tokenValue != "" && setTokenAddress(contractAddresses[tokenValue]);
  }, [tokenValue]);

  const { runContractFunction: removeLiquidity } = useWeb3Contract({
    contractAddress: DEX_CONTRACT_ADDRESS,
    abi: dexAbi,
    functionName: "removeLiquidity",
    params: {
      token: tokenAddress,
      amount: value != 0 && Moralis.Units.ETH(value),
    },
  });

  const { runContractFunction: getPoolFromContract } = useWeb3Contract({
    contractAddress: DEX_CONTRACT_ADDRESS,
    abi: dexAbi,
    functionName: "checkPoolWithId",
    params: {
      id: value.toString(),
    },
  });

  function successToast(text) {
    toast.success(text, {
      style: {
        color: "GrayText",
        background: "#C5f747",
      },
    });
  }

  function errorToast(text) {
    toast.error(text + "...", {
      style: {
        color: "white",
        background: "#E83F36",
      },
    });
  }

  async function handleRemoveLiquidity() {
    try {
      setloadingRemovePool(true);
      const pool = await getPoolFromContract();
      if (!pool.active) {
        errorToast("Pool is not active");
        setloadingRemovePool(false);
        return;
      }

      if (
        pool.owner.toString().toUpperCase() !== account.toString().toUpperCase()
      ) {
        errorToast("Not pool owner");
        setloadingRemovePool(false);
        return;
      }

      if (
        Number(pool.minLockPeriod) >
        Number(Number(new Date()).toString().slice(0, 10))
      ) {
        errorToast("Pool in TimeLock");
        setloadingRemovePool(false);
        return;
      }

      const tx = await removeLiquidity({
        onSuccess: () => {
          toast("Processing...");
        },
        onError: (err) => {
          errorToast(err.message.slice(0, 50));
          console.log(err);
        },
      });

      await tx.wait(1);
      successToast("Withdraw Successfull");
      setOpenWithdrawLiquidityModal(false);
    } catch (error) {
      errorToast(error.slice(0, 50));
      setloadingRemovePool(false);
    }
  }

  return (
    <section className="min-h-screen max-w-screen bg-[#8f8e8ec6] flex items-center justify-center  top-0 left-0 w-screen fixed">
      <div className="bg-[#4b4e41] p-[32px] flex items-center flex-col rounded-md text-white">
        <label htmlFor="Liquidity-token" className="w-full flex">
          <span className="">Token</span>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select
            name="Liquidity-token"
            className=" bg-[#4b4e41] flex-1 outline-none px-2 py-1 rounded-md  border-2 border-[#C5f747]"
            id="Liquidity-token"
            value={tokenValue}
            onChange={(e) => setTokenValue(e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="ETH">ETH</option>
            <option value="LINK">LINK</option>
          </select>
        </label>
        <label
          htmlFor="liquidity-token-amount"
          className="w-full flex mt-[16px] items-center"
        >
          PoolId &nbsp;&nbsp;
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 outline-none border-[#c5f747] border-2 rounded-md px-2 py-1 bg-[#4b4e41]"
          />
        </label>
        <button
          className="mt-[16px] flex items-center justify-center text-2xl cursor-pointer text-[#4b4e41] md:text-xl  bg-gradient-to-r from-[#e4faa7] to-[#C5F747] w-full px-[32px] py-[16px] rounded-md font-bold  hover:to-[#8aad32] capitalize disabled:from-[#868686] disabled:to-[#868686] disabled:hover:to-[#868686]"
          disabled={loadingRemovePool}
          onClick={handleRemoveLiquidity}
        >
          {loadingRemovePool ? (
            <div className="w-[30px] h-[30px] border-[5px] border-white border-r-transparent animate-spin rounded-full"></div>
          ) : (
            "withdraw"
          )}
        </button>
      </div>
      <button
        onClick={() => setOpenWithdrawLiquidityModal(false)}
        disabled={loadingRemovePool}
        className="bg-[#4b4e41] rounded-full disabled:text-white text-[#c5f747] p-3 fixed top-2 right-8"
      >
        <ImCross />
      </button>
    </section>
  );
};

export default RemoveLiquidityModal;
