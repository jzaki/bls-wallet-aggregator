#!/usr/bin/env -S deno run --allow-net --allow-env --allow-read --allow-write --unstable

import { BigNumber, TransactionData } from "../deps.ts";
import Client from "../src/app/Client.ts";
import * as env from "../src/env.ts";
import Range from "../src/helpers/Range.ts";

const client = new Client(env.ORIGIN);

function dummyHex(length: number) {
  return `0x${
    Range(length).map((i) => (i % 100).toString().padStart(2, "0")).join("")
  }`;
}

const tx: TransactionData = {
  publicKey: dummyHex(128),
  nonce: BigNumber.from(1),
  signature: dummyHex(64),
  rewardTokenAddress: dummyHex(20),
  rewardTokenAmount: BigNumber.from(123),
  ethValue: BigNumber.from(0),
  contractAddress: dummyHex(20),
  encodedFunction: dummyHex(11),
};

console.log("sending", tx);

const failures = await client.addTransaction(tx);

console.log({ failures });
