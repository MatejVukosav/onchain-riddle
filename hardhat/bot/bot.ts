import { hardhat } from "viem/chains";

import {
  createPublicClient,
  createWalletClient,
  Hex,
  http,
  keccak256,
  stringToBytes,
} from "viem";
import { mnemonicToAccount, privateKeyToAccount } from "viem/accounts";
import OnChainRiddleJson from "../artifacts/contracts/OnChainRiddle.sol/OnChainRiddle.json";
import dotenv from "dotenv";
import path from "path";
import serverHttp from "http";

dotenv.config({ path: path.resolve(__dirname, ".env") });

let lastRiddleSetBlock: bigint | null = null;

const account = mnemonicToAccount(process.env.MNEMONIC!);
const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
});

export const contractConfig = {
  address: process.env.ONCHAIN_RIDDLE_CONTRACT as Hex,
  abi: OnChainRiddleJson.abi,
} as const;

async function setNewRiddle() {
  const publicClient = createPublicClient({
    chain: hardhat,
    transport: http(),
  });

  const client = createWalletClient({
    account,
    chain: hardhat,
    transport: http(),
  });

  const _riddle = "What is the capital of France?";
  const _answerHash = keccak256(stringToBytes("Paris"));

  const { request: txRequest } = await publicClient.simulateContract({
    account,
    ...contractConfig,
    functionName: "setRiddle",
    args: [_riddle, _answerHash],
  });

  const hash = await client.writeContract(txRequest);
  const receipt = await publicClient.waitForTransactionReceipt({
    hash,
  });
  lastRiddleSetBlock = receipt.blockNumber;
}

async function checkRiddleState() {
  const isActive = await publicClient.readContract({
    ...contractConfig,
    functionName: "isActive",
  });

  if (isActive) {
    console.log("Riddle is active");
  } else {
    console.log("Riddle is not active");
  }
}

async function registerRiddleObserver() {
  publicClient.watchContractEvent({
    ...contractConfig,
    eventName: "RiddleSet",
    onLogs(logs) {
      if (logs.length === 0) {
        lastRiddleSetBlock = logs[0].blockNumber;
      }
      console.log("RiddleSet event logs: ", logs);
    },
  });
}

async function registerAnswerAttemptObserver() {
  publicClient.watchContractEvent({
    ...contractConfig,
    eventName: "AnswerAttempt",
    onLogs(logs) {
      console.log("AnswerAttempt event logs: ", logs);
    },
  });
}

async function registerWinnerObserver() {
  publicClient.watchContractEvent({
    ...contractConfig,
    eventName: "Winner",
    onLogs(logs) {
      console.log("Winner event logs: ", logs);
    },
  });
}

async function registerObservers() {
  console.log("Register observers..");
  registerAnswerAttemptObserver();
  registerRiddleObserver();
  registerWinnerObserver();
}

const server = serverHttp.createServer(
  (
    req: any,
    res: {
      writeHead: (arg0: number, arg1: { "Content-Type": string }) => void;
      end: (arg0: string) => void;
    }
  ) => {
    if (req.method === "GET" && req.url === "/api/block-height") {
      // Example GET endpoint
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ blockNumber: lastRiddleSetBlock }));
    } else {
      // 404 for all other routes
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Hello from bot" }));
    }
  }
);

registerObservers();

const PORT = 3005;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
