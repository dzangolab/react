const defaultOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export const formatDate = (
  date: number | string,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
) => {
  const dateFormatOptions = { ...defaultOptions, ...options };

  return new Date(date).toLocaleDateString(
    locale || "en-GB",
    dateFormatOptions,
  );
};
