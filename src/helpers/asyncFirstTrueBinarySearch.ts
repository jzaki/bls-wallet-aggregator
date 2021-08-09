import assert from "./assert.ts";

/**
 * Performs a binary search to determine the highest value of i for which
 * test(i) returns a promise to true.
 *
 * Naturally, this binary search assumes that any false result from the test fn
 * doesn't have any true results for higher inputs e.g.:
 *
 * good: [true, true, false, false, false]
 * bad : [true, true, false, true, false]
 */
export default async function asyncBinarySearchFindHighestTrue(
  highestKnownTrue: number,
  highestCandidate: number,
  test: (i: number) => Promise<boolean>,
): Promise<number> {
  assert(isInteger(highestKnownTrue));
  assert(isInteger(highestCandidate));
  assert(highestCandidate >= highestKnownTrue);

  let lowestKnownFalse = highestCandidate + 1;

  while (highestKnownTrue + 1 !== lowestKnownFalse) {
    const mid = Math.floor(0.5 * (highestKnownTrue + lowestKnownFalse));
    assert(highestKnownTrue < mid && mid < lowestKnownFalse);

    const midIsTrue = await test(mid);

    if (midIsTrue) {
      highestKnownTrue = mid;
    } else {
      lowestKnownFalse = mid;
    }
  }

  return highestKnownTrue;
}

function isInteger(x: number) {
  return Math.round(x) === x && Number.isFinite(x);
}
