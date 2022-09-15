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

const Modal = ({ setOpenModal }) => {
  const [value, setValue] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenValue, setTokenValue] = useState("");
  const [loadingCreatePool, setLoadingCreatePool] = useState(false);
  const { Moralis, account } = useMoralis();

  useEffect(() => {
    tokenValue != "" && setTokenAddress(contractAddresses[tokenValue]);
  }, [tokenValue]);

  const { contractAddresses } = useContext(accountContext);

  const { runContractFunction: balanceOfToken } = useWeb3Contract({
    contractAddress: tokenAddress,
    abi: linkAbi,
    functionName: "balanceOf",
    params: {
      _owner: account,
    },
  });

  const { runContractFunction: provideLiquidityInToken } = useWeb3Contract({
    contractAddress: DEX_CONTRACT_ADDRESS,
    abi: dexAbi,
    functionName: "provideLiquidity",
    params: {
      token: tokenAddress,
      amount: value != 0 && Moralis.Units.ETH(value),
    },
  });

  const { runContractFunction: provideLiquidityInEth } = useWeb3Contract({
    contractAddress: DEX_CONTRACT_ADDRESS,
    abi: dexAbi,
    functionName: "provideLiquidityInEth",
    msgValue: value != 0 && Moralis.Units.ETH(value),
  });

  const { runContractFunction: approveToken } = useWeb3Contract({
    contractAddress: tokenAddress,
    abi: linkAbi,
    functionName: "approve",
    params: {
      _spender: DEX_CONTRACT_ADDRESS,
      _value: value != 0 && Moralis.Units.ETH(value),
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

  async function handleCreatePool() {
    try {
      setLoadingCreatePool(true);
      if (tokenValue === "" || tokenAddress.length === "") {
        toast.error("Select token", {
          style: {
            color: "white",
            background: "#4b4e41",
          },
        });
        setLoadingCreatePool(false);

        return;
      }

      const balance = await balanceOfToken({
        onSuccess: (data) => {},
      });

      if (tokenValue == "ETH") {
        const tx = await provideLiquidityInEth({
          onSuccess: (data) => {
            toast("Processing...");
          },
          onError: (err) => {
            errorToast(err.message.slice(0, 50));
            setLoadingCreatePool(false);

            console.log(err);
          },
        });
        await tx.wait(1);
        toast.success("Pool Created");

        setOpenModal(false);
      } else {
        if (Number(balance) < Number(Moralis.Units.ETH(value))) {
          toast.error(`Your ${tokenValue} Balance is low`, {
            style: {
              color: "white",
              background: "#4b4e41",
            },
          });
          setLoadingCreatePool(false);

          return;
        }

        const tx = await approveToken({
          onSuccess: (data) => {
            toast("Approving...");
          },
          onError: (err) => {
            errorToast(err.message.slice(0, 50));
            setLoadingCreatePool(false);

            console.log(err);
          },
        });
        await tx.wait(1);
        successToast("Approved");

        const tx2 = await provideLiquidityInToken({
          onSuccess: (data) => {
            toast("Processing...");
          },
          onError: (err) => {
            errorToast(err.message.slice(0, 50));
            setLoadingCreatePool(false);

            console.log(err);
          },
        });
        await tx2.wait(1);
        successToast("Pool created");

        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingCreatePool(false);
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
          Amount &nbsp;&nbsp;
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 outline-none border-[#c5f747] border-2 rounded-md px-2 py-1 bg-[#4b4e41]"
          />
        </label>
        <button
          className="mt-[16px] flex items-center justify-center text-2xl cursor-pointer text-[#4b4e41] md:text-xl  bg-gradient-to-r from-[#e4faa7] to-[#C5F747] w-full px-[32px] py-[16px] rounded-md font-bold  hover:to-[#8aad32] capitalize disabled:from-[#868686] disabled:to-[#868686] disabled:hover:to-[#868686]"
          disabled={loadingCreatePool}
          onClick={handleCreatePool}
        >
          {loadingCreatePool ? (
            <div className="w-[30px] h-[30px] border-[5px] border-white border-r-transparent animate-spin rounded-full"></div>
          ) : (
            "create pool"
          )}
        </button>
      </div>
      <button
        onClick={() => setOpenModal(false)}
        disabled={loadingCreatePool}
        className="bg-[#4b4e41] rounded-full disabled:text-white text-[#c5f747] p-3 fixed top-2 right-8"
      >
        <ImCross />
      </button>
    </section>
  );
};

export default Modal;
