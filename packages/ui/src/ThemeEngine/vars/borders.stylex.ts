import { defineVars } from "@stylexjs/stylex";

import { getThemeConfig } from "../theme-config";
const borders = {
  thin: "1px",
  medium: "2px",
  thick: "3px",
  smallRadius: "4px",
  mediumRadius: "8px",
  largeRadius: "12px",
};
// const shadows = { ...getThemeConfig().shadows };

export const dzBorderVariables = defineVars(borders);

// export const dzShadowsVariables = defineVars(shadows);
