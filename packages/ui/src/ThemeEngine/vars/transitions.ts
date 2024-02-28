import { defineVars } from "@stylexjs/stylex";

import { getThemeConfig } from "../theme-config";

export const DzTransitionVariables = defineVars({
  ...getThemeConfig().transitions,
});
