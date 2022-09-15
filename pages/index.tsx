import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header.js";
import Main from "../components/Main.js";
import Footer from "../components/Footer.js";
import { useMoralis } from "react-moralis";

const Home: NextPage = () => {
  const { chainId } = useMoralis();

  return (
    <div className="flex max-w-screen flex-col lg:px-[128px] md:px-[64px] px-4 bg-[#2C2F28]">
      <Head>
        <title>Swapify-Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Main />
      <Footer />
    </div>
  );
};

export default Home;
