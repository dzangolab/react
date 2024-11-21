export const formatDate = (
  date: number | string,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
) => {
  return new Date(date).toLocaleDateString(locale, options);
};
