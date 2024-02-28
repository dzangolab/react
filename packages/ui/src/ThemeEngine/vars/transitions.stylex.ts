import { defineVars } from "@stylexjs/stylex";

import { getThemeConfig } from "../theme-config";

export const dzTransitionVariables = defineVars({
  ...getThemeConfig().transitions,
});
