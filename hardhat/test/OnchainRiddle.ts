import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import hre from "hardhat";

import { expect } from "chai";
import { stringToBytes, keccak256, getAddress } from "viem/utils";

describe("OnchainRiddle", async function () {
  async function deployOnchainRiddleFixture() {
    const onChainRiddle = await hre.viem.deployContract("OnchainRiddle", []);

    const publicClient = await hre.viem.getPublicClient();

    const [owner, otherAccount] = await hre.viem.getWalletClients();

    return {
      onChainRiddle,
      publicClient,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("Should set riddle", async function () {
      const { onChainRiddle, publicClient, owner } = await loadFixture(
        deployOnchainRiddleFixture
      );

      const riddle = "What does cow say?";
      const answer = "muu";

      const answerHah = keccak256(stringToBytes(answer));

      const setRiddleHash = await onChainRiddle.write.setRiddle([
        riddle,
        answerHah,
      ]);
      await publicClient.waitForTransactionReceipt({ hash: setRiddleHash });

      const submitAnswerHash = await onChainRiddle.write.submitAnswer([answer]);
      await publicClient.waitForTransactionReceipt({ hash: submitAnswerHash });

      const winnerEvent = await onChainRiddle.getEvents.Winner();
      expect(winnerEvent).to.have.lengthOf(1);
      console.log("winnerEvent", winnerEvent);

      console.log("publicClient.account", getAddress(owner.account.address));
      expect(winnerEvent[0].args.user).to.equal(
        getAddress(owner.account.address)
      );
    });
  });
});
