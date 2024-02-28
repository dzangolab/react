import { defineVars } from "@stylexjs/stylex";

import { getThemeConfig } from "../theme-config";

export const DzSpacingVariables = defineVars({
  ...getThemeConfig().spacing,
});
