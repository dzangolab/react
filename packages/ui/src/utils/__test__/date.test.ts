import { describe, expect, test } from "vitest";

import { formatDate } from "../date";

describe("formatDate unit test", () => {
  test("Should return a passed locale based formatted date", () => {
    const date = new Date("1/9/2024").getTime();
    const locale = "en-US";

    expect(formatDate(date, locale)).toBe("Jan 9, 2024");
  });

  test("Should return a default formatted date if locale is not passed", () => {
    const date = new Date("1/9/2024").getTime();

    expect(formatDate(date)).toBe("9 Jan 2024");
  });

  test("Should eturn formatted date according to the options provided", () => {
    const date = "2024-12-11T12:00:00Z";

    const locale = "en-GB";

    const options: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "long",
      day: "2-digit",
    };

    expect(formatDate(date, locale, options)).toBe("11 December 24");
  });

  test("Should return formatted date if date in string format is passed", () => {
    const date = "2024-08-10T08:00:00Z";

    expect(formatDate(date)).toBe("10 Aug 2024");
  });

  test("Should return null if date is empty", () => {
    const date = "";

    expect(formatDate(date)).toBeNull();
  });

  test("Should return null if not a valid date", () => {
    const date = "date";

    expect(formatDate(date)).toBeNull();
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
});
