"use server";

import { http } from "wagmi";
import { contractConfig } from "@/config";
import { Chain, createPublicClient, createWalletClient, Hex } from "viem";
import { hardhat } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { generateRiddle, hashAnswer } from "@/lib/riddles";

const account = privateKeyToAccount(process.env.BOT_PRIVATE_KEY! as Hex);

const customHardhat = {
  ...hardhat,
  id: 31337, //Required because of Metamask
};

export async function submitNewRiddleWithBot(chain: Chain | undefined) {
  const ch = chain ?? customHardhat;
  try {
    const publicClient = createPublicClient({
      chain: ch,
      transport: http(),
    });

    const isActive = await publicClient.readContract({
      ...contractConfig,
      functionName: "isActive",
    });

    if (isActive) {
      return;
    }

    const riddle = generateRiddle();
    const _answerHash = hashAnswer(riddle.answer);
    const _riddle = riddle.question;

    const client = createWalletClient({
      account,
      chain: ch,
      transport: http(),
    });

    const { request: txRequest } = await publicClient.simulateContract({
      account,
      ...contractConfig,
      functionName: "setRiddle",
      args: [_riddle, _answerHash],
    });
    await client.writeContract(txRequest);
  } catch (error) {
    console.error("Failed to submit new riddle:", error);
  }
}
