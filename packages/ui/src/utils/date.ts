export const formatDate = (date: number, locale?: string) => {
  return new Date(date).toLocaleDateString(locale);
};
