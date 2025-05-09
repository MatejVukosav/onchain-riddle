import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const OnchainRiddleModule = buildModule("OnchainRiddleModule", (m) => {
  const onchainRiddle = m.contract("OnchainRiddle", []);

  return { onchainRiddle };
});

export default OnchainRiddleModule;
