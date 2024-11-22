const defaultOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export const formatDateTime = (
  date: number | string,
  locale?: string,
  options = defaultOptions,
) => {
  return new Date(date).toLocaleDateString(locale || "en-GB", options);
};
