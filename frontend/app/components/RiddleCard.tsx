"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { SubmitRiddle } from "./SubmitRiddle";
import { Guesses } from "./Guesses";
import { contractConfig } from "@/config";
import { usePublicClient, useReadContract, useWatchContractEvent } from "wagmi";
import { Hex, parseAbiItem } from "viem";
import { useEffect } from "react";

export interface RiddleCardProps {
  riddle: string | null;
  isConnected: boolean;
}

export function RiddleCard({ isConnected, riddle }: RiddleCardProps) {
  const publicClient = usePublicClient();

  const { data: triedGuesses, refetch } = useReadContract({
    ...contractConfig,
    functionName: "getAllGuesses",
  });

  async function getSubmittedAnswers() {
    const latestRiddleBlock = await getLatestRiddleSetEvent();
    console.log("Latest Riddle Block: ", latestRiddleBlock);

    const logs = await publicClient?.getLogs({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! as Hex,
      event: parseAbiItem("event AnswerAttempt(address indexed, bool, string)"),
      fromBlock: latestRiddleBlock,
      toBlock: "latest",
    });
    console.log("Logs: ", logs);
  }

  async function getLatestRiddleSetEvent(): Promise<bigint> {
    const latestBlock = await publicClient?.getBlockNumber();
    if (!latestBlock) {
      console.error("Failed to fetch latest block number");
      return BigInt(0);
    }

    const CHUNK_SIZE = 500;
    let fromBlock = latestBlock - BigInt(CHUNK_SIZE - 1);
    if (fromBlock < 0) fromBlock = BigInt(0);
    const logs = await publicClient?.getLogs({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! as Hex,
      event: parseAbiItem("event RiddleSet(string)"),
      fromBlock: fromBlock,
      toBlock: latestBlock,
    });

    let latestRiddleSetBlock = logs?.pop()?.blockNumber || BigInt(-1);

    while (latestRiddleSetBlock === BigInt(-1) && fromBlock > 0) {
      const toBlock = fromBlock - BigInt(1);
      fromBlock = toBlock - BigInt(CHUNK_SIZE - 1);
      if (fromBlock < 0) fromBlock = BigInt(0);

      const olderLogs = await publicClient?.getLogs({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! as Hex,
        event: parseAbiItem("event RiddleSet(string)"),
        fromBlock,
        toBlock,
      });

      if (olderLogs && olderLogs?.length > 0) {
        latestRiddleSetBlock = olderLogs?.pop()?.blockNumber || BigInt(0);
      }
    }

    return latestRiddleSetBlock;
  }

  useEffect(() => {
    getSubmittedAnswers();
  }, []);

  useWatchContractEvent({
    ...contractConfig,
    eventName: "AnswerAttempt",
    onLogs(logs) {
      if (logs) {
        refetch();
      }
    },
  });

  useWatchContractEvent({
    ...contractConfig,
    eventName: "RiddleSet",
    onLogs(logs) {
      if (logs) {
        refetch();
      }
    },
  });
  return (
    <Card className="w-xl shadow-xl border-none bg-white/90 backdrop-blur-md">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="text-yellow-500" size={20} />
          <CardTitle className="text-2xl font-bold text-gray-800">
            Guess the riddle?
          </CardTitle>
        </div>
        <CardDescription>Solve the puzzle to win!</CardDescription>
      </CardHeader>
      <CardContent>
        <SubmitRiddle isConnected={isConnected} riddle={riddle} />
      </CardContent>{" "}
      <CardFooter>
        <Guesses triedGuesses={triedGuesses} />
      </CardFooter>
    </Card>
  );
}
