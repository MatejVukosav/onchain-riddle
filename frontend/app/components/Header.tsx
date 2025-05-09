"use client";

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Header() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-col justify-center md:mt-4">
      <div className="flex flex-col md:flex-row justify-between items-center m-4 md:mb-8 md:gap-4">
        <h1 className="font-mono md:text-4xl"> Onchain Riddle</h1>
        <div
          className="flex flex-col md:flex-row justify-end items-center gap-2"
          hidden={!isConnected}
        >
          <div className="flex items-center ">
            {ensAvatar && <Image alt="ENS Avatar" src={ensAvatar} />}

            <Avatar>{ensAvatar && <AvatarImage src={ensAvatar} />}</Avatar>

            <Badge
              variant="outline"
              className="py-2 bg-white/80 backdrop-blur-sm"
            >
              {ensName ? `${ensName} (${address})` : address}
            </Badge>
          </div>
          <Button
            onClick={() => disconnect()}
            variant="outline"
            className="gap-2 bg-white/80 backdrop-blur-sm border-black/10 cursor-pointer"
          >
            <LogOut size={16} />
            Disconnect
          </Button>
        </div>
      </div>
      <Separator className="bg-black " />
    </div>
  );
}
