import { describe, expect, test } from "vitest";

import { formatDate, formatNumber } from "../../common/utils";

describe("FormatDate unit test", () => {
  test("Should return a US locale based formatted date", () => {
    const date = new Date("1/9/2024");
    const locale = "en-US";

    expect(formatDate({ date, locale })).toBe("1/9/2024");
  });

  test("Should return a UK locale based formatted date", () => {
    const date = new Date("1/9/2024");
    const locale = "en-GB";

    expect(formatDate({ date, locale })).toBe("09/01/2024");
  });

  test("Should return a default formatted date", () => {
    const date = new Date("1/9/2024");
    const locale = "en-US";

    expect(formatDate({ date, locale })).toBe("1/9/2024");
  });

  test("Should return a Nepal locale based formatted date", () => {
    const date = new Date("1/9/2024");
    const locale = "ne-NP";

    expect(formatDate({ date, locale })).toBe("२०२४-०१-०९");
  });

  test("Should return passed date value if not a valid date", () => {
    const date = "date";
    const locale = "ne-NP";

    expect(formatDate({ date, locale })).toBe("date");
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

  test("Should return null if date is empty", () => {
    const date = "";

    expect(formatDate({ date })).toBeNull;
  });
});

describe("FormatNumber unit test", () => {
  test("Should return a US locale based formatted number", () => {
    const value = 10_000_000;
    const locale = "en-US";

    expect(formatNumber({ value, locale })).toBe("10,000,000");
  });

  test("Should return a Indian locale based formatted number", () => {
    const value = 10_000_000;
    const locale = "en-IN";

    expect(formatNumber({ value, locale })).toBe("1,00,00,000");
  });

  test("Should return a USD currency formatted number", () => {
    const value = 10_000_000;
    const locale = "en-US";

    expect(
      formatNumber({
        value,
        locale,
        formatOptions: {
          style: "currency",
          currency: "USD",
        },
      }),
    ).toBe("$10,000,000.00");
  });

  test("Should throw error if invalid locale is passed", () => {
    const value = 100_000;
    const locale = "ne-N";

    try {
      formatNumber({ value, locale });
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError("Invalid language tag: ne-n");
    }
  });
});
