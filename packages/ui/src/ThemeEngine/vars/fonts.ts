import { defineVars } from "@stylexjs/stylex";

import { getThemeConfig } from "../theme-config";

export const DzFontFamilyVariables = defineVars({
  ...getThemeConfig().fonts.family,
});

export const DzFontSizeVariables = defineVars({
  ...getThemeConfig().fonts.size,
});

export const DzIconSizeVariables = defineVars({
  ...getThemeConfig().iconSizes,
});
