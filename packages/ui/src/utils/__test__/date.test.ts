import { describe, expect, test } from "vitest";

import { formatDate } from "../date";

describe("FormatDate unit test", () => {
  test("Should return a US locale based formatted date", () => {
    const date = new Date("1/9/2024").getTime();
    const locale = "en-US";

    expect(formatDate(date, locale)).toBe("Jan 9, 2024");
  });

  test("Should return a UK locale based formatted date", () => {
    const date = new Date("1/9/2024").getTime();
    const locale = "en-GB";

    expect(formatDate(date, locale)).toBe("9 Jan 2024");
  });

  test("Should return a default formatted date", () => {
    const date = new Date("1/9/2024").getTime();
    const locale = "en-GB";

    expect(formatDate(date, locale)).toBe("9 Jan 2024");
  });

  test("Should return a Nepal locale based formatted date", () => {
    const date = new Date("1/9/2024").getTime();
    const locale = "ne-NP";

    expect(formatDate(date, locale)).toBe("२०२४ जनवरी ९");
  });

  test("Should return invalid date if not a valid date", () => {
    const date = "date";
    const locale = "ne-NP";

    expect(formatDate(date, locale)).toBe("Invalid Date");
  });

  test("Should throw error if invalid locale is passed", () => {
    const date = new Date("1/9/2024").getTime();
    const locale = "ne-N";

    try {
      formatDate(date, locale);
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError("Invalid language tag: ne-n");
    }
  });

  test("Should return null if date is empty", () => {
    const date = "";

    expect(formatDate(date)).toBeNull();
  });

  test("Should return default formatted date if date in string format is passed", () => {
    const date = "2024-08-10T08:00:00Z";

    expect(formatDate(date)).toBe("10 Aug 2024");
  });
});
