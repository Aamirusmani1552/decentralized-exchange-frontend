import { createContext, useState, useEffect } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import {
  WETH_CONTRACT_ADDRESS,
  lINK_CONTRACT_ADDRESS,
  DEX_CONTRACT_ADDRESS,
} from "../constants/address";

export const accountContext = createContext();

const ActiveContext = ({ children }) => {
  const [contractAddresses, setContractAddresses] = useState({
    ETH: WETH_CONTRACT_ADDRESS,
    LINK: lINK_CONTRACT_ADDRESS,
  });
  return (
    <accountContext.Provider value={{ contractAddresses }}>
      {children}
    </accountContext.Provider>
  );
};

export default ActiveContext;
