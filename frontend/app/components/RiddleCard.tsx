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
import { useReadContract, useWatchContractEvent } from "wagmi";

export interface RiddleCardProps {
  riddle: string | null;
  isConnected: boolean;
}

export function RiddleCard({ isConnected, riddle }: RiddleCardProps) {
  const { data: triedGuesses, refetch } = useReadContract({
    ...contractConfig,
    functionName: "getAllGuesses",
  });

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
