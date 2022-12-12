import type { AppConfig, AppFeatures } from "./types";

const parse = (
  value: string | boolean | undefined | number,
  fallback: bigint | string | null | boolean
) => {
  if (typeof value === "undefined") {
    return fallback;
  }

  if (typeof value === "boolean") {
    return value;
  }

  switch (typeof fallback) {
    case "boolean":
      return !!JSON.parse(value as string);

    case "number":
      return JSON.parse(value as string);

    default:
      return value;
  }
};

export { parse };

export type { AppConfig, AppFeatures };
