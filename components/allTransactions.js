import { gql } from "@apollo/client";

const GET_TRANSACTIONS = gql`
  {
    allTransactions {
      id
      tokenSwapped
      tokenReceived
      transactionFee
      user
    }
  }
`;

export default GET_TRANSACTIONS;
