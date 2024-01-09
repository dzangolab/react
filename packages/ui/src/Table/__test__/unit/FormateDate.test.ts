import { describe, expect, test } from "vitest";

import { formatDate } from "../../common/utils";

describe("FormatDate unit test", () => {
  test("Should return a US locale based formatted date", () => {
    const date = new Date("1/9/2024");
    const locale = "en-US";

    expect(formatDate({ date, locale })).toBe("1/9/2024");
  });

  test("Should return a Nepal locale based formatted date", () => {
    const date = new Date("1/9/2024");
    const locale = "ne-NP";

    expect(formatDate({ date, locale })).toBe("२०२४-०१-०९");
  });

  test("Should throw error if invalid locale is passed", () => {
    const date = new Date("1/9/2024");
    const locale = "ne-N";

    try {
      formatDate({ date, locale });
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError("Invalid language tag: ne-n");
    }
  });
});
