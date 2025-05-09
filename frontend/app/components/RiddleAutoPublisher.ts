"use client";

import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { useCallback, useEffect } from "react";
import { contractConfig } from "@/config";
import { submitNewRiddleWithBot } from "@/app/actions";

export function RiddleAutoPublisher() {
  const { chain } = useAccount();

  const { data: isActive } = useReadContract({
    ...contractConfig,
    functionName: "isActive",
  });

  const submitNewRiddle = useCallback(async () => {
    return await submitNewRiddleWithBot(chain);
  }, [chain]);

  useWatchContractEvent({
    ...contractConfig,
    eventName: "Winner",
    onLogs: async (logs) => {
      if (logs) {
        submitNewRiddle();
      }
    },
  });

  useEffect(() => {
    if (!isActive) {
      submitNewRiddle();
    }
  }, [isActive, submitNewRiddle]);

  return null;
}
