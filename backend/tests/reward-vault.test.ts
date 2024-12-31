import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

// const chain = new Chain();

const accounts = simnet.getAccounts();
const owner = accounts.get("wallet_1")!;
const benficiary = accounts.get("wallet_2")!;
const anontherBenficiary = accounts.get("wallet_3")!;

/*
  The test below is an example. To learn more, read the testing documentation here:
  https://docs.hiro.so/stacks/clarinet-js-sdk
*/

describe("Lock Reward Contract Tests", () => {
  it("ensures simnet is well initalised", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("lock provided reward", () => {
    const { result } = simnet.callPublicFn(
      "reward-vault",
      "lock-rewards",
      [Cl.principal(benficiary), Cl.uint(50), Cl.uint(100)],
      owner
    );
    expect(result).toBeOk(Cl.bool(true));
  });
  it("throw error is user lock at a past block height", () => {
    const { result } = simnet.callPublicFn(
      "reward-vault",
      "lock-rewards",
      [Cl.principal(benficiary), Cl.uint(2), Cl.uint(100)],
      owner
    );

    expect(result).toBeErr(Cl.uint(103));
  });
  it("throw error is user lock without amount", () => {
    const { result } = simnet.callPublicFn(
      "reward-vault",
      "lock-rewards",
      [Cl.principal(benficiary), Cl.uint(100), Cl.uint(0)],
      owner
    );

    expect(result).toBeErr(Cl.uint(105));
  });
  it("change a benefidiary", () => {
    simnet.callPublicFn(
      "reward-vault",
      "lock-rewards",
      [Cl.principal(benficiary), Cl.uint(50), Cl.uint(100)],
      owner
    );
    const { result } = simnet.callPublicFn(
      "reward-vault",
      "approve-beneficiary",
      [Cl.principal(anontherBenficiary)],
      benficiary
    );
    expect(result).toBeOk(Cl.bool(true));
  });
  it("thorw error if an non benefidiary wantt to change benefidiary", () => {
    simnet.callPublicFn(
      "reward-vault",
      "lock-rewards",
      [Cl.principal(benficiary), Cl.uint(50), Cl.uint(100)],
      owner
    );
    const { result } = simnet.callPublicFn(
      "reward-vault",
      "approve-beneficiary",
      [Cl.principal(anontherBenficiary)],
      owner
    );
    expect(result).toBeErr(Cl.uint(104));

  });

  // it("claim from the vault", () => {
  //   simnet.callPublicFn(
  //     "reward-vault",
  //     "lock-rewards",
  //     [Cl.principal(benficiary), Cl.uint(30), Cl.uint(100)],
  //     owner
  //   );

  //   const { result } = simnet.callPublicFn(
  //     "reward-vault",
  //     "claim",
  //     [],
  //     benficiary
  //   );
  //   expect(result).toBeOk(Cl.bool(true));
  // });

  it("claim before the correct block height", () => {
    simnet.callPublicFn(
      "reward-vault",
      "lock-rewards",
      [Cl.principal(benficiary), Cl.uint(50), Cl.uint(100)],
      owner
    );

    const { result } = simnet.callPublicFn(
      "reward-vault",
      "claim",
      [],
      benficiary
    );
    expect(result).toBeErr(Cl.uint(102));
  });
  it("Change unlock block height", () => {
    simnet.callPublicFn(
      "reward-vault",
      "lock-rewards",
      [Cl.principal(benficiary), Cl.uint(50), Cl.uint(100)],
      owner
    );

    const { result } = simnet.callPublicFn(
      "reward-vault",
      "change-unlock-height",
      [Cl.uint(51)],
      simnet.deployer
    );
    expect(result).toBeOk(Cl.bool(true));
  });
   it("Change block height when you are not the owner", () => {
    simnet.callPublicFn(
      "reward-vault",
      "lock-rewards",
      [Cl.principal(benficiary), Cl.uint(50), Cl.uint(100)],
      owner
    );

    const { result } = simnet.callPublicFn(
      "reward-vault",
      "change-unlock-height",
      [Cl.uint(51)],
      benficiary
    );
    expect(result).toBeErr(Cl.uint(104));
  });
   it("Change block height with a block height less then current block height", () => {
    simnet.callPublicFn(
      "reward-vault",
      "lock-rewards",
      [Cl.principal(benficiary), Cl.uint(50), Cl.uint(100)],
      owner
    );

    const { result } = simnet.callPublicFn(
      "reward-vault",
      "change-unlock-height",
      [Cl.uint(2)],
      benficiary
    );
    expect(result).toBeErr(Cl.uint(103));
  });
});
