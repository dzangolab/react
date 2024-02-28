import { defineVars } from "@stylexjs/stylex";

import { getThemeConfig } from "../theme-config";

export const DzBorderVariables = defineVars({ ...getThemeConfig().borders });

export const DzShadowsVariables = defineVars({ ...getThemeConfig().shadows });
