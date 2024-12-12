import { describe, expect, test } from "vitest";

import { formatDate, formatDateTime } from "../date";

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

  test("Should return formatted date according to the options provided", () => {
    const date = "2024-12-11T12:00:00Z";

    const locale = "en-GB";

    const options: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "long",
      day: "2-digit",
    };

    expect(formatDate(date, locale, options)).toBe("11 December 24");
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

describe("formatDateTime unit test", () => {
  test("Should return the correct formatted date time in default locale (en-GB) if no locale is passed", () => {
    const date = "2024-12-12T00:00:00Z";

    expect(formatDateTime(date)).toBe("12 Dec 2024, 5:45 am");
  });

  test("Should return the correct formatted date time with a specific locale (en-US)", () => {
    const date = "2024-12-12T00:00:00Z";
    const locale = "en-US";

    expect(formatDateTime(date, locale)).toBe("Dec 12, 2024, 5:45 AM");
  });

  test("Should return null when no date is passed", () => {
    const date = "";

    expect(formatDateTime(date)).toBeNull();
  });

  test("Should return null if not a valid date", () => {
    const date = "date";

    expect(formatDateTime(date)).toBeNull();
  });

  test("Should throw error if invalid locale is passed", () => {
    const date = new Date("1/9/2024").getTime();
    const locale = "ne-N";

    try {
      formatDateTime(date, locale);
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError("Invalid language tag: ne-n");
    }
  });

  test("Should handle string date input", () => {
    const date = "2024-12-12T00:00:00Z";

    expect(formatDateTime(date)).toBe("12 Dec 2024, 5:45 am");
  });

  test("Should handle number timestamp input", () => {
    const timestamp = 1_702_339_200_000;

    expect(formatDateTime(timestamp)).toBe("12 Dec 2023, 5:45 am");
  });

  test("Should handle custom date format options", () => {
    const date = "2024-08-10T08:00:00Z";
    const locale = "en-GB";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    expect(formatDateTime(date, locale, options)).toBe("10 Aug 2024, 1:45 pm");
  });
});
