import { useQuery } from "@apollo/client";
import React from "react";
import Header from "../components/Header";
import TransactionCard from "../components/TransactionCard";
import GET_TRANSACTIONS from "../components/allTransactions";
import { useState } from "react";
import { useEffect } from "react";
import Head from "next/head";
import { useMoralis } from "react-moralis";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { data: txData } = useQuery(GET_TRANSACTIONS);
  const { chainId } = useMoralis();

  useEffect(() => {
    txData && setTransactions(txData.allTransactions);
  }, [txData]);

  return (
    <main className="flex min-h-screen flex-col md:px-[64px] relative lg:px-[123px] px-4 bg-[#2C2F28]">
      <Head>
        <title>Swapify-transactions</title>
      </Head>
      <Header />
      {Number(chainId) != 5 ? (
        <div>
          <h1 className="text-white text-3xl mt-[32px] bg-[#515050] px-2 py-4 text-center rounded-md">
            Please switch to Goerli Network
          </h1>
        </div>
      ) : (
        <section className="mt-[32px] flex flex-col text-xs md:text-sm">
          <h1 className="text-white text-xl font-semibold capitalize">
            All Transactions
          </h1>
          <div className="flex flex-col">
            <div className="text-white font-bold bg-[#4b4e41] text-xs sm:text-sm md:text-sm flex justify-between px-[16px] py-[8px]  mt-[16px] rounded-md ">
              <span className="flex-1 text-center">TxAddress</span>
              <span className="flex-1 text-center">Token Swapped</span>
              <span className="flex-1 text-center">Token Recieved</span>
              <span className="flex-1 text-center">user</span>
            </div>
            <div className="mb-3 flex flex-col items-center justify-center">
              {transactions.length > 0 ? (
                transactions.map((tx) => {
                  console.log(tx);
                  return (
                    <TransactionCard
                      TxAddress={tx.id.toString()}
                      tokenRecieved={tx.tokenReceived.toString()}
                      tokenSwapped={tx.tokenSwapped.toString()}
                      user={tx.user.toString()}
                      key={tx.id.toString()}
                    />
                  );
                })
              ) : (
                <div className="text w-[40px] h-[40px] mt-5 border-8 border-gray-100 rounded-full border-l-transparent animate-spin"></div>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Transactions;
