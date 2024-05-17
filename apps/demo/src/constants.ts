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
        label: "User",
        route: "/user",
        submenu: [
          {
            label: "UI",
            route: "/i18n",
          },
          {
            label: "UI",
            route: "/i18n",
            submenu: [
              {
                label: "UI",
                route: "/i18n",
                submenu: [
                  {
                    label: "UI",
                    route: "/i18n",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: "header.menu.i18n",
        route: "/i18n",
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
