# Onchain Riddle Hardhat

This directory contains the smart contracts for the Onchain Riddle dApp.

## Structure

- `contracts/` - Solidity smart contract ( `OnchainRiddle.sol`)
- `test/` - Contract tests

## Setup

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/OnchainRiddle.ts
```

After deploying contract set contract address in `frontend` env variables
