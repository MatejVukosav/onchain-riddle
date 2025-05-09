"use client";

import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { useEffect, useState } from "react";
import { RiddleAutoPublisher } from "./components/RiddleAutoPublisher";
import { CelebrationOverlay } from "./components/CelebrationOverlay";
import { toast } from "sonner";
import { RiddleCard } from "./components/RiddleCard";
import { contractConfig } from "@/config";

export default function Home() {
  const { isConnected, address } = useAccount();
  const [showCelebration, setShowCelebration] = useState(false);

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

  function handleCorrectGuess() {
    setShowCelebration(true);
  }

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
          handleCorrectGuess();
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
    <div className="min-h-screen flex flex-col p-6 relative">
      <CelebrationOverlay
        show={showCelebration}
        onHide={() => setShowCelebration(false)}
      />
      <div className="flex-1 flex items-center justify-center">
        <RiddleCard isConnected={isConnected} riddle={riddle} />
        <RiddleAutoPublisher />
      </div>
    </div>
  );
}
