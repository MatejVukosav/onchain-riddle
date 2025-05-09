import { useSwitchChain } from "wagmi";

export function ChainSelector() {
  const { chains, switchChain } = useSwitchChain();

  return (
    <div>
      {chains.map((chain) => (
        <button
          key={chain.id}
          onClick={() => switchChain({ chainId: chain.id })}
        >
          Switch to {chain.name}
        </button>
      ))}
    </div>
  );
}
