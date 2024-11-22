const defaultOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

export const formatDate = (
  date: number | string,
  locale?: string,
  options = defaultOptions,
) => {
  return new Date(date).toLocaleDateString(locale || "en-GB", options);
};
