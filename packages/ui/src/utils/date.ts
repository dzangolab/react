const defaultDateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const defaultDateTimeOptions: Intl.DateTimeFormatOptions = {
  ...defaultDateOptions,
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export const formatDate = (
  date: number | string,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
) => {
  const dateFormatOptions = { ...defaultDateOptions, ...options };

  return new Date(date).toLocaleDateString(
    locale || "en-GB",
    dateFormatOptions,
  );
};

export const formatDateTime = (
  date: number | string,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
) => {
  const dateTimeFormatOptions = { ...defaultDateTimeOptions, ...options };

  return new Date(date).toLocaleDateString(
    locale || "en-GB",
    dateTimeFormatOptions,
  );
};
