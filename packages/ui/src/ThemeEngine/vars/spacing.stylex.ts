import { defineVars } from "@stylexjs/stylex";

import { getThemeConfig } from "../theme-config";

export const dzSpacingVariables = defineVars({
  ...getThemeConfig().spacing,
});
