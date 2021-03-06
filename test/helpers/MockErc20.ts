import { BigNumber, ethers } from "../../deps.ts";
import * as ovmContractABIs from "../../ovmContractABIs/index.ts";

export default class MockErc20 {
  contract: ethers.Contract;

  constructor(
    address: string,
    provider: ethers.providers.Provider | ethers.Signer,
  ) {
    this.contract = new ethers.Contract(
      address,
      ovmContractABIs.MockERC20.abi,
      provider,
    );
  }

  async balanceOf(address: string): Promise<BigNumber> {
    return await this.contract.balanceOf(address);
  }

  async mint(address: string, amount: BigNumber) {
    await (await this.contract.mint(
      address,
      amount,
    )).wait();
  }
}
