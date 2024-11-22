import { defaultDateOptions } from "./date";

const defaultDateTimeOptions: Intl.DateTimeFormatOptions = {
  ...defaultDateOptions,
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export const formatDateTime = (
  date: number | string,
  locale?: string,
  options = defaultDateTimeOptions,
) => {
  return new Date(date).toLocaleDateString(locale || "en-GB", options);
};
