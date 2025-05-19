import {
  http,
  createConfig,
  cookieStorage,
  createStorage,
  injected,
  Config,
} from "wagmi";
import { metaMask } from "wagmi/connectors";
import { hardhat, sepolia } from "wagmi/chains";
import { onchainRiddleAbi } from "./abi/generated";

declare module "wagmi" {
  interface Register {
    config: typeof getConfig;
  }
}

export function getConfig(): Config {
  return createConfig({
    chains: [sepolia, hardhat],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    connectors: [injected({}), metaMask()],
    syncConnectedChain: true,
    transports: {
      [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL!),
      [hardhat.id]: http("http://localhost:8545"),
    },
  });
}

export const contractConfig = {
  address: process.env.NEXT_PUBLIC_ONCHAIN_RIDDLE_CONTRACT as `0x${string}`,
  abi: onchainRiddleAbi,
} as const;
