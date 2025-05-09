import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Wallet2 } from "lucide-react";

import * as React from "react";
import { Connector, useConnect } from "wagmi";

export function ConnectWallet() {
  return (
    <div className="grid gap-2">
      <h2 className=" text-shadow-2xs text-xs">
        Please connect wallet to answer
      </h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="text-shadow-2xs cursor-pointer">
            Connect
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose wallet to connect</DialogTitle>
            <DialogDescription>
              <WalletOptions />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <>
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </>
  );
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button
      onClick={onClick}
      disabled={!ready}
      variant="outline"
      className="w-full flex items-center justify-between gap-2 px-4 py-3 mb-2 rounded-lg border-2 border-gray-200 hover:border-primary transition"
    >
      <p className="flex items-center gap-2">
        <Wallet2 className="h-5 w-5 text-primary" />
        {connector.name}
        {!ready && (
          <Badge variant="secondary" className="ml-2">
            Unavailable
          </Badge>
        )}
      </p>
    </Button>
  );
}
