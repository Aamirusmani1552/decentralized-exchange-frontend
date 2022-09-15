import { gql } from "@apollo/client";

const GET__POOLS = gql`
  {
    poolCreatedEntities(orderBy: poolId) {
      id
      poolId
      token
      amount
      owner
      timestamp
      minLockPeriod
      active
    }
  }
`;

export default GET__POOLS;
