import { BigNumber, RouterContext, TransactionData } from "../../../deps.ts";
import nil from "../../helpers/nil.ts";
import { parseTransactionDataDto } from "../parsers.ts";
import failRequest from "./failRequest.ts";
import JsonHandler from "./JsonHandler.ts";

export default function TxHandler(
  fn: (ctx: RouterContext, tx: TransactionData) => void,
) {
  return JsonHandler(async (ctx, json) => {
    const parsedBody = parseTransactionDataDto(json);

    if ("failures" in parsedBody) {
      failRequest(
        ctx,
        parsedBody.failures.map(
          (description) => ({ type: "invalid-format", description }),
        ),
      );

      return nil;
    }

    const dto = parsedBody.success;

    const tx: TransactionData = {
      ...dto,
      nonce: BigNumber.from(dto.nonce),
      rewardTokenAmount: BigNumber.from(dto.rewardTokenAmount),
      ethValue: BigNumber.from(dto.ethValue),
    };

    return await fn(ctx, tx);
  });
}
