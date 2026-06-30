import { describe, expect, it } from "vitest";
import { getPaginationItems } from "./pagination";

describe("getPaginationItems", () => {
  it("keeps the first pages, current page area, and last page", () => {
    expect(getPaginationItems(8, 20)).toEqual([
      1,
      2,
      3,
      "gap-7",
      7,
      8,
      9,
      "gap-20",
      20,
    ]);
  });

  it("does not add gaps when pages are already adjacent", () => {
    expect(getPaginationItems(2, 4)).toEqual([1, 2, 3, 4]);
  });
});
