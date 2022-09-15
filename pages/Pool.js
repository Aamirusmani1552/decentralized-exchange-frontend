import React from "react";
import Header from "../components/Header";
import { FaEthereum } from "react-icons/fa";
import { SiChainlink } from "react-icons/si";
import PoolCard from "../components/PoolCard";
import { GrAdd } from "react-icons/gr";
import Head from "next/head";
import { useMoralis, useWeb3Contract } from "react-moralis";
import {
  dexAbi,
  linkAbi,
  wethAbi,
  DEX_CONTRACT_ADDRESS,
  WETH_CONTRACT_ADDRESS,
  lINK_CONTRACT_ADDRESS,
} from "../constants/address.js";
import { useEffect } from "react";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import GET__POOLS from "../components/poolQuery.js";
import { useQuery } from "@apollo/client";
import Modal from "../components/Modal";
import RemoveLiquidityModal from "../components/RemoveLiquidityModal";

const Pool = () => {
  const { isWeb3Enabled, chainId } = useMoralis();
  const [linkBalance, setLinkBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [pools, setPools] = useState([]);
  const [openWithdrawLiquidityModal, setOpenWithdrawLiquidityModal] =
    useState(false);
  const {} = useWeb3Contract({});
  const roundedOff = "1000000000000000000";

  const { loading, error, data: getPools } = useQuery(GET__POOLS);

  const { runContractFunction: getLinkBalance } = useWeb3Contract({
    abi: linkAbi,
    contractAddress: lINK_CONTRACT_ADDRESS,
    functionName: "balanceOf",
    params: {
      _owner: DEX_CONTRACT_ADDRESS,
    },
  });

  const { runContractFunction: getEthBalance } = useWeb3Contract({
    abi: wethAbi,
    contractAddress: WETH_CONTRACT_ADDRESS,
    functionName: "balanceOf",
    params: {
      account: DEX_CONTRACT_ADDRESS,
    },
  });

  useEffect(() => {
    getPools && setPools(getPools.poolCreatedEntities);
  }, [getPools]);

  useEffect(() => {
    async function getData() {
      await getLinkBalance({
        onSuccess: (data) => {
          const balance = Number(data) / Number(roundedOff);
          setLinkBalance(balance);
        },
        onError: (error) => {
          console.log(error);
        },
      });

      await getEthBalance({
        onSuccess: (data) => {
          const balance = Number(data) / Number(roundedOff);
          setEthBalance(balance);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }

    getData();
  }, [isWeb3Enabled]);

  return (
    <main className="flex min-h-screen flex-col md:px-[64px] relative lg:px-[123px] px-4 bg-[#2C2F28]">
      <Head>
        <title>Swapify-Pools</title>
      </Head>
      <Header />
      {Number(chainId) != 5 ? (
        <div>
          <h1 className="text-white text-3xl mt-[32px] bg-[#515050] px-2 py-4 text-center rounded-md">
            Please switch to Goerli Network
          </h1>
        </div>
      ) : (
        <>
          <section className=" grid grid-cols-1 gap-4 md:grid-cols-3 flex-1 mt-[32px] ">
            <div className="col-span-1 md:col-span-2 lg:col-span-2 h-full px-[16px] flex flex-col row-start-2 md:row-start-1">
              <h1 className="text-white text-xl font-semibold capitalize">
                Pools
              </h1>
              <div className="text-white bg-[#4b4e41] text-xs sm:text-sm md:text-sm flex justify-between px-[16px] py-[8px]  mt-[16px] rounded-md ">
                <span>Id</span>
                <span>Owner</span>
                <span>Amount</span>
                <span>token</span>
                <span>Active</span>
              </div>
              <div className="flex flex-col items-center justify-center mb-[16px]">
                {pools.length > 0 ? (
                  pools.map((pool) => (
                    <PoolCard
                      active={pool.active}
                      amount={pool.amount}
                      poolId={pool.poolId}
                      id={pool.id}
                      owner={pool.owner}
                      token={pool.token}
                      key={pool.id}
                    />
                  ))
                ) : (
                  <div className="text w-[40px] h-[40px] mt-5 border-8 border-gray-100 rounded-full border-l-transparent animate-spin"></div>
                )}
              </div>
            </div>

            <div className="col-span-1 md:col-span-1 h-full  px-[16px] row-start-1">
              <h1 className="text-white text-xl font-semibold capitalize">
                liquidity in pool
              </h1>
              <div className="bg-[#4b4e41] flex justify-between text-white mt-[16px] px-[16px] py-[8px] rounded-md ">
                <div className="text-3xl md:text-2xl lg:text-3xl flex flex-col">
                  <span>
                    {ethBalance ? (
                      ethBalance.toFixed(5)
                    ) : (
                      <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-10 bg-gray-500 rounded-md dark:bg-gray-700 w-24"></div>
                      </div>
                    )}
                  </span>
                  <span className="text-lg text-light text-[#b0b0b0]">
                    Ethereum
                  </span>
                </div>
                <div className="text-2xl flex gap-1 items-center">
                  <FaEthereum />
                </div>
              </div>
              <div className="bg-[#4b4e41] flex justify-between text-white mt-[16px] px-[16px] py-[8px] rounded-md ">
                <div className="text-3xl md:text-2xl lg:text-3xl flex flex-col">
                  <span>
                    {linkBalance ? (
                      linkBalance.toFixed(5)
                    ) : (
                      <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-10 bg-gray-500 rounded-md dark:bg-gray-700 w-24"></div>
                      </div>
                    )}
                  </span>
                  <span className="text-lg text-light text-[#b0b0b0]">
                    Link
                  </span>
                </div>
                <div className="text-2xl flex gap-1 items-center">
                  <SiChainlink />
                </div>
              </div>
              <div className="w-full mt-[16px]">
                <button
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  className="bg-[#C5f747] hover:bg-[#b0dc41] text-[#4b4e41] text-sm  font-bold flex items-center justify-center px-[16px] py-[8px] rounded-md capitalize gap-1"
                >
                  create pool
                  <GrAdd />
                </button>
              </div>

              <div className="w-full mt-[16px]">
                <button
                  onClick={() => {
                    setOpenWithdrawLiquidityModal(true);
                  }}
                  className="bg-[#C5f747] hover:bg-[#b0dc41] text-[#4b4e41] text-sm  font-bold flex items-center justify-center px-[16px] py-[8px] rounded-md capitalize gap-1"
                >
                  Withdraw Liquidity
                </button>
              </div>
            </div>
          </section>
          {openModal && <Modal setOpenModal={setOpenModal} />}
          {openWithdrawLiquidityModal && (
            <RemoveLiquidityModal
              setOpenWithdrawLiquidityModal={setOpenWithdrawLiquidityModal}
            />
          )}
        </>
      )}
    </main>
  );
};

export default Pool;
