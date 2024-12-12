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
  if (!date) {
    return null;
  }

  const dateFormatOptions = { ...defaultDateOptions, ...options };

  const formattedDate = new Date(date).toLocaleDateString(
    locale || "en-GB",
    dateFormatOptions,
  );

  return formattedDate === "Invalid Date" ? null : formattedDate;
};

export const formatDateTime = (
  date: number | string,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
) => {
  if (!date) {
    return null;
  }

  const dateTimeFormatOptions = { ...defaultDateTimeOptions, ...options };

  const formattedDateTime = new Date(date).toLocaleDateString(
    locale || "en-GB",
    dateTimeFormatOptions,
  );

  return formattedDateTime === "Invalid Date" ? null : formattedDateTime;
};
