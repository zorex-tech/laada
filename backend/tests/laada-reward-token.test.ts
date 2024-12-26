import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const owner = accounts.get("wallet_1")!;
const benefitiary = accounts.get("wallet_2")!;
// const currentBeneficiary = simnet.getDataVar("time-lock-wallet", "beneficiary");

/*
  The test below is an example. To learn more, read the testing documentation here:
  https://docs.hiro.so/stacks/clarinet-js-sdk
*/

describe("Laada Reward Token Contract Tests", () => {
  it("ensures simnet is well initalised", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("ensures the contract is deployed", () => {
    const contractSource = simnet.getContractSource("laada-reward-token");
    expect(contractSource).toBeDefined();
  });

  it("mint token", () => {
    const { result } = simnet.callPublicFn(
      "laada-reward-token",
      "mint-lrt",
      [Cl.uint(5), Cl.principal(owner)],
      simnet.deployer
    );

    expect(result).toBeOk(Cl.bool(true));
  });

  it("burn token with zero balance", () => {
    const { result } = simnet.callPublicFn(
      "laada-reward-token",
      "burn-lrt",
      [Cl.uint(5)],
      simnet.deployer
    );

    expect(result).toBeErr(Cl.uint(100));
  });
  it("burn token with non-zero balance", () => {
    simnet.callPublicFn(
      "laada-reward-token",
      "mint-lrt",
      [Cl.uint(5), Cl.principal(owner)],
      simnet.deployer
    );
    const { result } = simnet.callPublicFn(
      "laada-reward-token",
      "burn-lrt",
      [Cl.uint(5)],
      owner
    );

    expect(result).toBeOk(Cl.bool(true));
  });
  it("transfer zero  lrt from balance", () => {
    const { result } = simnet.callPublicFn(
      "laada-reward-token",
      "transfer",
      [Cl.uint(0), Cl.principal(benefitiary), Cl.principal(owner), Cl.none()],
      owner
    );

    expect(result).toBeErr(Cl.uint(101));
  });
  it("transfer lrt greater than user balance", () => {
    simnet.callPublicFn(
      "laada-reward-token",
      "mint-lrt",
      [Cl.uint(5), Cl.principal(owner)],
      simnet.deployer
    );
    const { result } = simnet.callPublicFn(
      "laada-reward-token",
      "transfer",
      [Cl.uint(7), Cl.principal(owner), Cl.principal(benefitiary), Cl.none()],
      owner
    );

    expect(result).toBeErr(Cl.uint(100));
  });

  it("Gets user balance for zero principal", () => {
    const { result } = simnet.callPrivateFn(
      "laada-reward-token",
      "get-balance-helper",
      [Cl.principal(owner)],
      owner
    );

    expect(result).toStrictEqual(Cl.uint(0));
  });
  it("Gets user balance for a none zero principal", () => {
    simnet.callPublicFn(
      "laada-reward-token",
      "mint-lrt",
      [Cl.uint(5), Cl.principal(owner)],
      simnet.deployer
    );
    const { result } = simnet.callPrivateFn(
      "laada-reward-token",
      "get-balance-helper",
      [Cl.principal(owner)],
      owner
    );

    expect(result).toStrictEqual(Cl.uint(5));
  });
});
