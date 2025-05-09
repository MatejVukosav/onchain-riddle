import { defineConfig } from "@wagmi/cli";
import { hardhat } from "@wagmi/cli/plugins";
import { Hex } from "viem";

export default defineConfig({
  out: "abi/generated.ts",
  contracts: [],
  plugins: [
    hardhat({
      project: "../hardhat",
      artifacts: "./artifacts",
      deployments: {
        OnchainRiddleModule: {
          1: process.env.NEXT_PUBLIC_ONCHAIN_RIDDLE_CONTRACT as Hex,
        },
      },
      commands: {
        clean: "pnpm hardhat clean",
        build: "pnpm hardhat compile",
        rebuild: "pnpm hardhat compile",
      },
    }),
  ],
});
