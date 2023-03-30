enum UI_COMPONENTS_MAPPING {
  LOADING_ICON = 1,
  SUBMIT_BUTTON = 2,
  RESPONSIVE_MENU = 3,
}

const UI_COMPONENTS = [
  { key: UI_COMPONENTS_MAPPING.LOADING_ICON, value: "Loading Icon" },
  { key: UI_COMPONENTS_MAPPING.SUBMIT_BUTTON, value: "Submit Button" },
  { key: UI_COMPONENTS_MAPPING.RESPONSIVE_MENU, value: "Responsive menu" },
];

const MENU_ROUTES = [
  {
    name: "Home",
    route: "/ui",
  },
  {
    name: "About",
    route: "/ui",
  },
];

export { UI_COMPONENTS, UI_COMPONENTS_MAPPING, MENU_ROUTES };
