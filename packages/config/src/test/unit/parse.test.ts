import { describe, expect, it } from "vitest";

import { parse } from "../../utils";

describe("react-config >> parse", () => {
  it("Returns fallback value if value is undefined", () => {
    expect(parse(undefined, 3n)).toBe(3n);
  });

  it("Returns value if the value is boolean", () => {
    expect(parse(false, "fallback")).toBe(false);
  });

  it("Parse string to boolean", () => {
    expect(parse("false", true)).toBe(false);
    expect(parse("true", false)).toBe(true);
  });

  it("Parse string to int if the fallback have type int", () => {
    expect(parse("100", 50)).toBe(100);
    expect(parse("546", 50)).toBe(546);
  });

  it("Check if the value is returned if there is no fallback", () => {
    expect(parse(34, null)).toBe(34);
    expect(parse("PARSE", null)).toBe("PARSE");
  });
});
