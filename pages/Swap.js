import React from "react";
import Header from "../components/Header";
import Head from "next/head";
import { useState } from "react";
import Dropdown from "../components/Dropdown";
import { useWeb3Contract, useMoralis } from "react-moralis";
import {
  dexAbi,
  DEX_CONTRACT_ADDRESS,
  linkAbi,
  lINK_CONTRACT_ADDRESS,
  WETH_CONTRACT_ADDRESS,
} from "../constants/address.js";
import { DebounceInput } from "react-debounce-input";
import { useEffect } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { FiArrowUpRight } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import BigNumber from "bignumber.js";

const Swap = () => {
  const roundOff = "1000000000000000000";
  const [activeFromToken, setActiveFromToken] = useState("ETH");
  const [activeToToken, setActiveToToken] = useState("Select");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [info, setInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);
  const [txText, setTxText] = useState("");
  const [contractAddresses] = useState({
    ETH: WETH_CONTRACT_ADDRESS,
    LINK: lINK_CONTRACT_ADDRESS,
  });
  const { Moralis, account, web3, chainId } = useMoralis();

  const { runContractFunction: balanceOfToToken } = useWeb3Contract({
    contractAddress: contractAddresses[activeToToken],
    abi: linkAbi,
    functionName: "balanceOf",
    params: {
      _owner: DEX_CONTRACT_ADDRESS,
    },
  });

  const { runContractFunction: balanceOfFromToken } = useWeb3Contract({
    contractAddress: contractAddresses[activeFromToken],
    abi: linkAbi,
    functionName: "balanceOf",
    params: {
      _owner: account,
    },
  });

  const { runContractFunction: getPrice } = useWeb3Contract({
    contractAddress: DEX_CONTRACT_ADDRESS,
    abi: dexAbi,
    functionName: "calculateExchangeTokenAfterFee",
    params: {
      from: contractAddresses[activeFromToken],
      to: contractAddresses[activeToToken],
      amount: BigNumber(fromValue)
        .multipliedBy(Number(roundOff))
        .toFixed()
        .toString(),
    },
  });

  const { runContractFunction: swapToken } = useWeb3Contract({
    contractAddress: DEX_CONTRACT_ADDRESS,
    abi: dexAbi,
    functionName: "swap",
    params: {
      from: contractAddresses[activeFromToken],
      to: contractAddresses[activeToToken],
      amount: BigNumber(fromValue)
        .multipliedBy(Number(roundOff))
        .toFixed()
        .toString(),
    },
  });

  const { runContractFunction: swapWethToToken, error } = useWeb3Contract({
    contractAddress: DEX_CONTRACT_ADDRESS,
    abi: dexAbi,
    functionName: "swapWETHToToken",
    msgValue: BigNumber(fromValue).multipliedBy(BigNumber(roundOff)).toString(),
    params: {
      from: contractAddresses[activeFromToken],
      to: contractAddresses[activeToToken],
      value: 0.2,
    },
  });

  const { runContractFunction: swapTokenToWeth } = useWeb3Contract({
    contractAddress: DEX_CONTRACT_ADDRESS,
    abi: dexAbi,
    functionName: "swapTokenToWETH",
    params: {
      from: contractAddresses[activeFromToken],
      to: contractAddresses[activeToToken],
      amount: BigNumber(fromValue)
        .multipliedBy(Number(roundOff))
        .toFixed()
        .toString(),
    },
  });

  const { runContractFunction: approveToken } = useWeb3Contract({
    contractAddress: contractAddresses[activeFromToken],
    abi: linkAbi,
    functionName: "approve",
    params: {
      _spender: DEX_CONTRACT_ADDRESS,
      _value: BigNumber(fromValue)
        .multipliedBy(Number(roundOff))
        .toFixed()
        .toString(),
    },
  });

  async function handleSwapToken() {
    try {
      const DexToTokenBalance = await balanceOfToToken();
      const valueWanted = toValue.toString();

      if (Number(DexToTokenBalance) < Number(valueWanted)) {
        toast.error(`Not Enough ${activeToToken} in Pool`, {
          style: {
            color: "white",
            background: "#E83F36",
          },
        });
        setFromValue(0);
        setToValue(0);
        setSwapLoading(false);
        return;
      }

      if (activeFromToken === activeToToken) {
        alert("Same token provided");
        return;
      }
      if (activeToToken === "Select") {
        alert("select to token");
        return;
      }

      if (swapLoading) {
        return;
      }

      setSwapLoading(true);
      setTxText("");

      if (activeFromToken === "ETH") {
        const tx = await swapWethToToken({
          onSuccess: (data) => {
            toast("Processing...");
          },
          onError: (err) => {
            toast.error(err.message.slice(0, 50) + "..." + "...", {
              style: {
                color: "white",
                background: "#E83F36",
              },
            });
            console.log(err);
          },
        });
        setTxText(tx.hash.toString());

        await tx.wait(1);
        toast.success("Swap Successfull", {
          style: {
            color: "GrayText",
            background: "#C5f747",
          },
        });
        setFromValue(0);
        setToValue(0);
        setSwapLoading(false);
      } else {
        const userTokenBalance = await balanceOfFromToken();
        const valueProvided = Moralis.Units.ETH(fromValue.toString());
        if (Number(userTokenBalance) < Number(valueProvided)) {
          toast.error(`Your ${activeFromToken} balance is less`, {
            style: {
              color: "white",
              background: "#E83F36",
            },
          });
          setFromValue(0);
          setToValue(0);
          setSwapLoading(false);
          return;
        }
        if (activeToToken === "ETH") {
          const tx = await approveToken({
            onSuccess: () => {
              toast("Approving...");
            },
            onError: (err) => {
              console.log(err);
              toast.error("Transaction rejected", {
                style: {
                  color: "white",
                  background: "#E83F36",
                },
              });
            },
          });

          setTxText(tx.hash.toString());
          await tx.wait(1);
          toast.success("Approved", {
            style: {
              color: "GrayText",
              background: "#C5f747",
            },
          });

          const tx2 = await swapTokenToWeth({
            onSuccess: (data) => {
              toast("Processing...");
            },
            onError: (err) => {
              toast.error(err.message.slice(0, 50) + "...", {
                style: {
                  color: "white",
                  background: "#E83F36",
                },
              });
              console.log(err);
            },
          });
          setTxText(tx2.hash.toString());

          await tx2.wait(1);
          toast.success("Swap Successfull", {
            style: {
              color: "GrayText",
              background: "#C5f747",
            },
          });
          setFromValue(0);
          setToValue(0);
          setSwapLoading(false);
        } else if (activeFromToken != "ETH" && activeToToken != "ETH") {
          const tx = await approveToken({
            onSuccess: () => {
              toast("Approving...");
            },
            onError: (err) => {
              toast.error(err.message.slice(0, 50) + "...", {
                style: {
                  color: "white",
                  background: "#E83F36",
                },
              });
              console.log(err);
            },
          });
          setTxText(tx.hash.toString());

          await tx.wait(1);
          toast.success("Approved", {
            style: {
              color: "GrayText",
              background: "#C5f747",
            },
          });
          const tx2 = await swapToken({
            onSuccess: (data) => {
              toast("Processing...");
            },
            onError: (err) => {
              toast.error(err.message.slice(0, 50) + "...", {
                style: {
                  color: "white",
                  background: "#E83F36",
                },
              });
              console.log(err);
            },
          });

          setTxText(tx2.hash.toString());

          await tx2.wait(1);
          toast.success("Swap Successfull", {
            style: {
              color: "GrayText",
              background: "#C5f747",
            },
          });
          setFromValue(0);
          setToValue(0);
          setSwapLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setFromValue(0);
      setToValue(0);
      setSwapLoading(false);
    }
  }

  useEffect(() => {
    const handleFromChange = async () => {
      setToValue(0);
      if (fromValue === 0 || fromValue == "") {
        setLoading(false);
        return;
      }

      if (activeFromToken === activeToToken) {
        setLoading(false);
        return;
      }

      if (activeToToken === "Select") {
        return;
      }
      setLoading(true);

      await getPrice({
        onSuccess: (data) => {
          setToValue(BigInt(data.toString()));
          setLoading(false);
        },
        onError: (err) => {
          console.log(err);
        },
      });
    };
    handleFromChange();
  }, [fromValue, activeToToken, activeFromToken]);

  return (
    <div className="flex min-h-screen flex-col md:px-[128px] px-4 bg-[#2C2F28]">
      <Head>
        <title>Swapify-swap</title>
      </Head>
      <Header />
      {Number(chainId) != 5 ? (
        <div>
          <h1 className="text-white text-3xl mt-[32px] bg-[#515050] px-2 py-4 text-center rounded-md">
            Please switch to Goerli Network
          </h1>
        </div>
      ) : (
        <main className="w-full flex-1 flex items-center justify-center ">
          <div className=" w-full lg:w-1/2 px-[24px] py-[12px] bg-[#373A2F] rounded-md flex flex-col">
            <div className="text-xl text-white text-center font-semibold">
              Swap
            </div>
            <div className="w-1/3 h-[4px] self-center bg-[#C5F747] rounded-lg mt-[16px]"></div>
            <div className="mt-[16px] w-full">
              <div className="bg-[#4b4e41] relative px-[32px] py-[16px] rounded-md">
                <div className="border-l-4 border-[#C5f747] gap-6  px-[16px] flex flex-col justify-between">
                  <span className="text-[#9f9f9f] font-semibold">From</span>
                  <DebounceInput
                    type={"number"}
                    value={fromValue}
                    debounceTimeout={300}
                    placeholder="Enter Amount..."
                    className=" w-full placeholder:text-[#9f9f9f] placeholder:font-semibold bg-transparent outline-none text-white text-2xl bold font-semibold "
                    onChange={(e) => {
                      setFromValue(e.target.value);
                    }}
                  />
                  <Dropdown
                    open={openFrom}
                    activeToken={activeFromToken}
                    setOpen={setOpenFrom}
                    setActiveToken={setActiveFromToken}
                  />
                </div>
              </div>
            </div>
            <div className="mt-[16px] w-full">
              <div className="bg-[#4b4e41] relative px-[32px] py-[16px] rounded-md">
                <div className="border-l-4 border-[#C5f747] gap-6  px-[16px] flex flex-col justify-between">
                  <span className="text-[#9f9f9f] font-semibold">To</span>
                  <div className=" w-full bg-transparent outline-none text-white text-2xl bold font-semibold flex justify-between">
                    {loading ? (
                      <div className="w-[30px] h-[30px] border-[5px] border-l-transparent border-r-transparent animate-spin rounded-full"></div>
                    ) : activeFromToken == activeToToken ? (
                      <div>Same Token</div>
                    ) : (
                      <span>
                        {(Number(toValue) / Number(roundOff))
                          .toFixed(10)
                          .toString()}
                      </span>
                    )}
                    {toValue != 0 && (
                      <span className="text-sm cursor-pointer relative ">
                        <button
                          onClick={() => {
                            setInfo((prev) => !prev);

                            setTimeout(() => {
                              setInfo((prev) => !prev);
                            }, 3000);
                          }}
                        >
                          <AiFillInfoCircle />
                        </button>
                        {info && (
                          <div className="text-xs  bg-[#2C2F28] px-4 py-2 rounded-md absolute w-52 border-2 border-[#C5f747] top-4 right-5 capitalize">
                            only approx value is shown here. The actual value
                            recieved might change with the change in price of
                            token
                          </div>
                        )}
                      </span>
                    )}
                  </div>
                  <Dropdown
                    open={openTo}
                    activeToken={activeToToken}
                    setOpen={setOpenTo}
                    setActiveToken={setActiveToToken}
                  />
                </div>
              </div>
            </div>
            {txText != "" && (
              <div className="text-[#C5F747] text-sm mt-2 ml-2">
                <a
                  href={"https://goerli.etherscan.io/tx/" + txText}
                  target={"_blank"}
                  className={"flex gap-1  items-center"}
                >
                  View Transaction <FiArrowUpRight />
                </a>
              </div>
            )}
            <button
              className="mt-[16px] flex items-center justify-center text-2xl cursor-pointer text-[#4b4e41] md:text-xl  bg-gradient-to-r from-[#e4faa7] to-[#C5F747] w-full px-[32px] py-[16px] rounded-md font-bold  hover:to-[#8aad32] capitalize disabled:from-[#868686] disabled:to-[#868686] disabled:hover:to-[#868686]"
              onClick={handleSwapToken}
              disabled={fromValue <= 0 && !swapLoading ? true : false}
            >
              {swapLoading ? (
                <div className="w-[30px] h-[30px] border-[5px] border-white border-r-transparent animate-spin rounded-full"></div>
              ) : (
                "swap token"
              )}
            </button>
          </div>
        </main>
      )}
    </div>
  );
};

export default Swap;
