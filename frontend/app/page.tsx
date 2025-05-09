"use client";

import { contractConfig } from "@/config";
import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { RiddleCard } from "./components/RiddleCard";

export default function Home() {
  const { isConnected } = useAccount();
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
    eventName: "RiddleSet",
    onLogs(logs) {
      if (logs) {
        refetchContractState();
        setRiddle(logs[0]?.args.riddle || "");
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col p-6 relative items-center justify-center">
      <div className="flex-1 flex items-center justify-center">
        <RiddleCard isConnected={isConnected} riddle={riddle} />
      </div>
    </div>
  );
}
