import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import dotenv from "dotenv";

dotenv.config();

const mnemonic = process.env.MNEMONIC || "";

const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL!,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY!],
      chainId: 11155111,
      // accounts: {
      //   count: 10,
      //   mnemonic,
      //   path: "m/44'/60'/0'/0",
      // },
    },
    hardhat: {
      chainId: 31337,
      // accounts: {
      //   count: 10,
      //   mnemonic,
      //   path: "m/44'/60'/0'/0",
      // },
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.28",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/hardhat-template/issues/31
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
      evmVersion: "paris",
      viaIR: true,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY!,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    src: "./contracts",
  },
};

export default config;
