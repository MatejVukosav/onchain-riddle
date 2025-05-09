"use client";

import * as React from "react";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { contractConfig } from "@/config";

export function SubmitAnswer() {
  const { data, writeContract, isPending } = useWriteContract();
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const { data: isActive, refetch } = useReadContract({
    ...contractConfig,
    functionName: "isActive",
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const answer = formData.get("answer");

    if (typeof answer !== "string") {
      return;
    }

    const _answer = answer.trim().toLowerCase();
    writeContract({
      ...contractConfig,
      functionName: "submitAnswer",
      args: [_answer],
    });
  }

  const {
    data: receipt,
    status,
    isLoading: isLoadingReceipt,
  } = useWaitForTransactionReceipt({
    hash: data,
  });

  useEffect(() => {
    if (status === "success" && receipt) {
      setAnswer("");
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receipt, status]);

  useEffect(() => {
    setIsLoading(isPending || isLoadingReceipt || !isActive);
  }, [isActive, isLoadingReceipt, isPending]);

  return (
    <form
      className="w-full flex gap-2 flex-col md:flex-row"
      onSubmit={onSubmit}
    >
      <Input
        name="answer"
        placeholder="your answer..."
        disabled={isLoading}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="flex-1 border-gray-300"
      />
      {isLoading ? (
        <div className="flex justify-center items-center mx-[1.8rem]">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <Button
          className="gap-2 cursor-pointer"
          disabled={isLoading || answer.trim().length == 0}
        >
          <Send size={16} />
          Send
        </Button>
      )}
    </form>
  );
}
