export const IsNavLinkActive = (link: string) => {
  {
    const pathnameArray = window.location.pathname.split("/");
    const isActive =
      window.location.pathname.startsWith(link) ||
      (pathnameArray.length && pathnameArray.includes(link));

    return isActive;
  }
};
