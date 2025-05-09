"use client";

import { SubmitAnswer } from "./SubmitAnswer";
import { ConnectWallet } from "./WalletOptions";

export interface RiddleProps {
  isConnected: boolean;
  riddle: string | null;
}

export function SubmitRiddle({ isConnected, riddle }: RiddleProps) {
  return (
    <div>
      <div className="bg-yellow-100 p-6 rounded-lg mb-4 text-center">
        <p className="text-xl font-medium text-gray-700">
          {riddle ?? "Loading.."}
        </p>
      </div>
      {isConnected ? <SubmitAnswer /> : <ConnectWallet />}
    </div>
  );
}
