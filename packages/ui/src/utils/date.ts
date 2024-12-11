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

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toLocaleDateString(locale || "en-GB", dateFormatOptions);
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

  return new Date(date).toLocaleDateString(
    locale || "en-GB",
    dateTimeFormatOptions,
  );
};
