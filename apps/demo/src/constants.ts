export const MENU_ROUTES = [
  {
    key: "header.menu.ui",
    route: "/ui",
  },
  {
    key: "header.menu.user",
    route: "/user",
  },
  {
    key: "header.menu.form",
    route: "/form",
    submenu: [
      {
        label: "Layout",
        route: "/layout",
      },
      {
        label: "Form",
        route: "/user",
      },
    ],
  },
  {
    key: "header.menu.layout",
    route: "/layout",
  },
  {
    key: "header.menu.i18n",
    route: "/i18n",
  },
];
