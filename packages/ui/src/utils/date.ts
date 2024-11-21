export const formatDate = (
  date: number,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
) => {
  return new Date(date).toLocaleDateString(locale, options);
};
