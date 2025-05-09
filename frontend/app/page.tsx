"use client";

import { contractConfig } from "@/config";
import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { RiddleCard } from "./components/RiddleCard";
import { RiddleAutoPublisher } from "./components/RiddleAutoPublisher";
import { toast } from "sonner";

export default function Home() {
  const { isConnected, address } = useAccount();
  const [riddle, setRiddle] = useState<string | null>(null);

  const { data, refetch: refetchContractState } = useReadContract({
    ...contractConfig,
    functionName: "riddle",
  });

  useEffect(() => {
    if (data) {
      setRiddle(data);
    }
  }, [data]);

  useWatchContractEvent({
    ...contractConfig,
    eventName: "AnswerAttempt",
    onLogs(logs) {
      if (logs) {
        const user = logs[0]?.args.user;
        if (user === address) {
          const correct = logs[0]?.args.correct;
          if (!correct) {
            toast(`🙈 Oops! That's not the answer. Try again!`);
          }
        }
      }
    },
  });

  useWatchContractEvent({
    ...contractConfig,
    eventName: "RiddleSet",
    onLogs(logs) {
      if (logs) {
        refetchContractState();
        toast("🧩 A new riddle awaits! Good luck!");
        setRiddle(logs[0]?.args.riddle || "");
      }
    },
  });

  useWatchContractEvent({
    ...contractConfig,
    eventName: "Winner",
    onLogs(logs) {
      if (logs) {
        const winner = logs[0]?.args.user;
        if (winner === address) {
          toast(
            `🎉 Congratulations! You solved the riddle! Correct answer is ${logs[0]?.args.guess}`
          );
        } else {
          toast(
            `Player ${logs[0]?.args.user} guessed the riddle! Correct answer is ${logs[0]?.args.guess}`
          );
        }

        refetchContractState();
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col p-6 relative items-center justify-center">
      <div className="flex-1 flex items-center justify-center">
        <RiddleCard isConnected={isConnected} riddle={riddle} />
        <RiddleAutoPublisher />
      </div>
    </div>
  );
}
