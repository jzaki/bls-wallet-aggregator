import { ethers } from "../../deps/index.ts";

const { utils } = ethers;

export default function dataPayload(
  chainId: number,
  nonce: number,
  contractAddress: string,
  encodedFunction: string,
) {
  const encodedFunctionHash = utils.solidityKeccak256(
    ["bytes"],
    [encodedFunction],
  );
  return utils.solidityPack(
    ["uint256", "uint256", "address", "bytes32"],
    [
      chainId,
      nonce,
      contractAddress.toString(),
      encodedFunctionHash,
    ],
  );
}
