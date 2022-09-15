import React from "react";
import Card1 from "./Card1.js";
import Card2 from "./Card2.js";
import Card3 from "./Card3.js";
import { BsArrowRightShort } from "react-icons/bs";
import { SiChainlink } from "react-icons/si";
import Link from "next/link.js";
import investMentImage from "../images/8432-removebg.png";
import Image from "next/image.js";

const Main = () => {
  return (
    <main className="w-full flex-1 flex flex-col">
      <section className="w-full flex-1 grid min-h-screen  grid-cols-2">
        <div className="flex-1 self-center items-center justify-center col-span-2 md:col-span-1">
          <div className="md:text-6xl lg:text-8xl text-4xl text-center md:text-start text-white">
            The Best <span className="text-[#C5F747]">Crypto </span>
            Exchage
          </div>
          <div className="my-2 flex flex-col items-center md:items-start justify-center md:justify-start">
            <div className="text-[#7a7d76]">only 0.3% transaction free</div>
            <Link href={"/Swap"}>
              <button className="bg-[#c5f747] px-6 py-2 rounded-md text-gray-700 font-bold flex items-center mt-8 hover:tracking-wider transition-all">
                Launch App
                <BsArrowRightShort className="text-3xl" />
              </button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center md:col-start-2 row-start-1 col-span-2 md:col-span-1">
          <Card3 />
          <Card1 />
          <Card2 />
        </div>
      </section>
      <section className="text-gray-600 body-font mt-[64px] md:mt-123px">
        <div className="container px-5 py-24 mx-auto flex flex-wrap justify-center items-center">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl text-center w-full mb-10 capitalize">
            Invest for the future
          </h1>
          <div className="flex flex-wrap w-full items-center justify-center lg:items-start h-fit">
            <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C5F747] inline-flex items-center justify-center text-gray relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-white mb-1 tracking-wider">
                    STEP 1
                  </h2>
                  <p className="leading-relaxed text-[#d2d1d1] ">
                    provid liquidity in pool
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C5F747] inline-flex items-center justify-center text-gray relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-white mb-1 tracking-wider">
                    STEP 2
                  </h2>
                  <p className="leading-relaxed text-[#d2d1d1]">
                    Keep funds in pools for minimum 1 week.
                  </p>
                </div>
              </div>
              <div className="flex relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C5F747] inline-flex items-center justify-center text-gray relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-white mb-1 tracking-wider">
                    FINISH
                  </h2>
                  <p className="leading-relaxed text-[#d2d1d1]">
                    Start earning interest at 10% per annum
                  </p>
                </div>
              </div>
            </div>
            <a href="https://www.freepik.com">
              <div className="relative md:w-[500px]">
                <Image
                  src={investMentImage}
                  alt="
                  designed by Pch.vector - Freepik.com"
                />
              </div>
            </a>
          </div>
        </div>
      </section>
      <section className="w-full min-h-screen justify-center flex flex-col items-center gap-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#fff]">
          Powered By:{" "}
        </h1>
        <div className="flex max-w-full justify-center items-center gap-3 flex-col md:flex-row">
          <div className="text-[#3e60cf] bg-[#373A2F] text-9xl flex flex-col items-center justify-center px-[32px] py-[16px] w-full md:w-64 h-44 rounded-md select-none">
            <SiChainlink />
            <h3 className="text-xl text-center md:text-2xl lg-text-3xl font-bold mt-2">
              ChainLink Price Feeds
            </h3>
          </div>
          <div className=" bg-[#373A2F] text-9xl flex flex-col items-center justify-center px-[32px] py-[16px] w-full md:w-64 h-44 rounded-md select-none">
            <img
              className="w-[64px] "
              src="data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='22px' height='28px' viewBox='0 0 22 28' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3c!-- Generator: Sketch 52.4 (67378) - http://www.bohemiancoding.com/sketch --%3e %3ctitle%3eFill 19%3c/title%3e %3cdesc%3eCreated with Sketch.%3c/desc%3e %3cg id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='Menu-/-not-signed-in' transform='translate(-88.000000%2c -52.000000)' fill='white'%3e %3cpath d='M97.3333019%2c67.5555032 C93.8969498%2c67.5555032 91.1111006%2c64.7698425 91.1111006%2c61.3333019 C91.1111006%2c57.8967613 93.8969498%2c55.1111006 97.3333019%2c55.1111006 C100.769843%2c55.1111006 103.555503%2c57.8967613 103.555503%2c61.3333019 C103.555503%2c64.7698425 100.769843%2c67.5555032 97.3333019%2c67.5555032 M97.3333019%2c52 C102.487924%2c52 106.666604%2c56.1786795 106.666604%2c61.3333019 C106.666604%2c66.4879243 102.487924%2c70.6666038 97.3333019%2c70.6666038 C92.1786795%2c70.6666038 88%2c66.4879243 88%2c61.3333019 C88%2c56.1786795 92.1786795%2c52 97.3333019%2c52 Z M106.211063%2c71.1221444 C106.818576%2c71.7296575 106.818576%2c72.7144622 106.211063%2c73.3219753 L99.9886734%2c79.5443652 C99.3811603%2c80.1518783 98.3963556%2c80.1518783 97.7888425%2c79.5443652 C97.1813294%2c78.9368521 97.1813294%2c77.9520473 97.7888425%2c77.3445342 L104.011232%2c71.1221444 C104.618745%2c70.5146313 105.60355%2c70.5146313 106.211063%2c71.1221444 Z M109.777704%2c53.5555503 C109.777704%2c54.4147797 109.081384%2c55.1111006 108.222343%2c55.1111006 C107.363113%2c55.1111006 106.666792%2c54.4147797 106.666792%2c53.5555503 C106.666792%2c52.6963209 107.363113%2c52 108.222343%2c52 C109.081384%2c52 109.777704%2c52.6963209 109.777704%2c53.5555503 Z' id='Fill-19'%3e%3c/path%3e %3c/g%3e %3c/g%3e%3c/svg%3e"
              alt="is image"
            />
            <p className="text-[32px] font-bold text-white">Graph</p>
          </div>
          <div className="px-[32px] py-[16px] w-full md:w-64 bg-[#373A2F] rounded-md h-44 flex items-center justify-center">
            <svg
              width="299"
              height="90"
              viewBox="0 0 299 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M141.86 32.189C144.849 32.189 147.249 33.1469 149.058 35.0628C150.867 36.9786 151.77 39.5284 151.77 42.7148V58.326H143.946V43.3771C143.946 42.0895 143.623 41.0719 142.981 40.3271C142.338 39.5824 141.407 39.2072 140.19 39.2072C138.902 39.2072 137.903 39.6307 137.192 40.4778C136.479 41.3248 136.122 42.496 136.122 43.9854V58.326H128.299V43.3771C128.299 42.0895 127.976 41.0719 127.333 40.3271C126.691 39.5824 125.759 39.2072 124.542 39.2072C123.254 39.2072 122.255 39.6307 121.545 40.4778C120.831 41.3248 120.475 42.496 120.475 43.9854V58.326H112.651V32.8996H120.475V35.239C121.901 33.2038 124.231 32.189 127.463 32.189C130.489 32.189 132.765 33.3089 134.297 35.546C135.896 33.3089 138.418 32.189 141.86 32.189V32.189Z"
                fill="#396993"
              />
              <path
                d="M178.78 55.1478C176.102 57.7402 172.832 59.0392 168.974 59.0392C165.116 59.0392 161.847 57.743 159.169 55.1478C156.491 52.5554 155.153 49.3775 155.153 45.614C155.153 41.8505 156.491 38.6725 159.169 36.0802C161.847 33.4878 165.116 32.1916 168.974 32.1916C172.832 32.1916 176.102 33.4878 178.78 36.0802C181.457 38.6725 182.796 41.8505 182.796 45.614C182.796 49.3775 181.457 52.5554 178.78 55.1478ZM164.697 49.9346C165.844 51.0545 167.27 51.6117 168.974 51.6117C170.678 51.6117 172.102 51.0517 173.251 49.9346C174.398 48.8146 174.972 47.3763 174.972 45.6111C174.972 43.8459 174.398 42.4076 173.251 41.2877C172.105 40.1677 170.678 39.6106 168.974 39.6106C167.27 39.6106 165.844 40.1705 164.697 41.2877C163.551 42.4048 162.976 43.8488 162.976 45.6111C162.976 47.3735 163.551 48.8146 164.697 49.9346Z"
                fill="#396993"
              />
              <path
                d="M194.39 58.3287H186.077V32.7631H193.974V38.9256C195.228 34.2099 198.523 32.1207 201.662 32.1207C202.964 32.1207 204.379 32.2429 205.795 33.0956L203.53 40.9694C201.549 40.2019 200.417 40.2105 199.465 40.2105C196.329 40.2105 194.393 42.0325 194.393 49.5339V58.3287H194.39Z"
                fill="#396993"
              />
              <path
                d="M225.719 32.8993H233.543V58.3256H225.719V55.3154C224.732 57.8737 221.287 59.0362 217.949 59.0362C214.612 59.0362 211.569 57.7401 209.135 55.1448C206.701 52.5525 205.483 49.3745 205.483 45.611C205.483 41.8475 206.701 38.6696 209.135 36.0772C211.569 33.4848 214.507 32.129 217.949 32.1886C223.882 32.291 225.864 35.1335 225.719 36.5548V32.8993ZM215.028 50.1363C216.175 51.2563 217.669 51.8134 219.515 51.8134C221.36 51.8134 222.852 51.2534 224.001 50.1363C225.15 49.0192 225.722 47.5098 225.722 45.611C225.722 43.7122 225.148 42.2028 224.001 41.0857C222.855 39.9686 221.357 39.4087 219.515 39.4087C217.672 39.4087 216.177 39.9686 215.028 41.0857C213.882 42.2057 213.307 43.7122 213.307 45.611C213.307 47.5098 213.882 49.0192 215.028 50.1363Z"
                fill="#396993"
              />
              <path
                d="M239.326 58.3258V21.2053H247.15V58.3258H239.326Z"
                fill="#396993"
              />
              <path
                d="M260.256 29.315C259.333 30.2133 258.229 30.6624 256.944 30.6624C255.659 30.6624 254.552 30.2133 253.632 29.315C252.709 28.4168 252.251 27.3395 252.251 26.0859C252.251 24.8324 252.712 23.7551 253.632 22.8568C254.552 21.9586 255.656 21.5095 256.944 21.5095C258.232 21.5095 259.333 21.9586 260.256 22.8568C261.176 23.7551 261.637 24.8324 261.637 26.0859C261.637 27.3395 261.176 28.4168 260.256 29.315ZM253.032 58.3258V32.8994H260.856V58.3258H253.032Z"
                fill="#396993"
              />
              <path
                d="M274.01 40.3241C274.01 40.833 274.454 41.248 275.34 41.5692C276.226 41.8904 277.296 42.2144 278.547 42.5356C279.798 42.8568 281.049 43.2718 282.303 43.7806C283.554 44.2895 284.624 45.128 285.51 46.2963C286.396 47.4646 286.841 48.9313 286.841 50.6937C286.841 53.4395 285.796 55.5174 283.71 56.9216C281.624 58.3287 279.051 59.0308 275.991 59.0308C270.497 59.0308 266.76 57.0154 264.779 52.9791L271.558 49.2156C272.255 51.2167 273.729 52.2144 275.991 52.2144C277.868 52.2144 278.807 51.6886 278.807 50.6368C278.807 50.128 278.363 49.7045 277.477 49.3662C276.591 49.0279 275.521 48.6982 274.27 48.3742C273.019 48.053 271.768 47.6294 270.514 47.1036C269.263 46.5777 268.193 45.7562 267.307 44.6363C266.421 43.5163 265.976 42.1434 265.976 40.5174C265.976 37.8739 266.959 35.8216 268.923 34.3634C270.887 32.9052 273.313 32.1775 276.198 32.1775C278.355 32.1775 280.319 32.6436 282.091 33.576C283.863 34.5083 285.289 35.8557 286.368 37.6181L279.693 41.1257C278.858 39.6334 277.692 38.8887 276.198 38.8887C274.703 38.8887 274.007 39.3634 274.007 40.3128L274.01 40.3241Z"
                fill="#396993"
              />
              <path
                d="M91.0797 26.0945C87.4568 18.4205 80.0667 13.1076 71.7369 12.4797C67.6556 12.099 63.444 12.7922 59.7645 14.6532C57.2936 15.8834 55.0944 17.5909 53.2461 19.6252C49.4336 15.2867 44.0474 12.4456 38.2338 12.1529C26.0123 11.4142 15.4776 19.3581 12.9105 31.6859C11.3509 39.07 13.052 46.7809 16.4286 53.2758C19.7996 59.6826 24.7188 65.3791 31.1183 68.726C35.5846 70.908 39.7707 65.3735 36.5045 61.5038C35.4629 60.3332 34.5034 59.0888 33.6288 57.7592C32.8165 56.5261 32.0863 55.2305 31.4239 53.9037C29.5842 50.1193 28.2115 45.8576 27.9398 41.6612C27.7784 38.9933 28.1266 36.6948 29.2304 34.3736C30.2748 32.2087 31.9674 30.3477 34.1892 29.4726C37.6451 28.1572 41.251 28.8646 43.8776 31.7058C45.5843 33.4701 46.3655 35.9391 47.2372 38.2177C47.3023 38.3825 47.3731 38.5416 47.4467 38.6979C49.1817 44.0705 57.1351 44.2069 58.621 38.0955C58.6663 37.8881 58.7116 37.6779 58.7597 37.4648C58.7682 37.4307 58.7767 37.3994 58.7852 37.3654C58.7937 37.3313 58.7993 37.2972 58.8078 37.2602C58.9352 36.7147 59.0824 36.1692 59.272 35.6607C59.8635 34.0213 60.8485 32.4388 62.0316 31.2313C63.8147 29.4101 66.0875 28.3106 68.5754 28.5549C69.968 28.6345 71.5388 29.0152 72.671 29.6317C79.0223 33.0894 78.36 42.1754 75.6372 48.1617C73.7239 52.3553 70.6614 55.8641 67.265 58.8956C66.4243 59.6428 65.4648 60.4668 64.5959 61.1629C60.6136 64.2682 59.5946 70.1466 62.742 74.36C66.1187 78.9911 72.8436 79.2156 76.7071 75.0959C77.4656 74.343 78.1987 73.5617 78.9204 72.7747C86.2086 64.6035 92.8317 52.4746 93.862 41.2975C94.2865 36.0726 93.361 30.8506 91.0769 26.0945H91.0797Z"
                fill="url(#paint0_radial_793_4459)"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_793_4459"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(68.5409 70.1613) rotate(-131.427) scale(67.7597 102.847)"
                >
                  <stop stopColor="#33FFCC" />
                  <stop offset="1" stopColor="#0F7FFF" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
