import {
  parseTransactionDataDto,
  TransactionDataDto,
} from "../src/app/parsers.ts";
import { assertEquals } from "./deps.ts";

Deno.test("parseTransactionDataDto reports missing fields for undefined", () => {
  assertEquals(
    parseTransactionDataDto(undefined),
    {
      failures: [
        "field publicKey: not provided",
        "field signature: not provided",
        "field nonce: not provided",
        "field tokenRewardAmount: not provided",
        "field ethValue: not provided",
        "field contractAddress: not provided",
        "field encodedFunctionData: not provided",
      ],
    },
  );
});

Deno.test("parseTransactionDataDto accepts dummy values", () => {
  const dummyTxData: TransactionDataDto = {
    "publicKey": [
      "0x000102030405060708091011121314151617181920212223242526272829303132333",
      "43536373839404142434445464748495051525354555657585960616263646566676869",
      "70717273747576777879808182838485868788899091929394959697989900010203040",
      "506070809101112131415161718192021222324252627",
    ].join(""),
    "nonce": "0x01",
    "signature": [
      "0x000102030405060708091011121314151617181920212223242526272829303132333",
      "43536373839404142434445464748495051525354555657585960616263",
    ].join(""),
    "rewardTokenAddress": "0x0001020304050607080910111213141516171819",
    "rewardTokenAmount": [
      "0x0001020304050607080910111213141516171819202122232425262728293031",
    ].join(""),
    "ethValue": "0x00",
    "contractAddress": "0x0001020304050607080910111213141516171819",
    "encodedFunction": "0x0001020300010203040506",
  };

  assertEquals(
    parseTransactionDataDto(dummyTxData),
    { success: dummyTxData },
  );
});
