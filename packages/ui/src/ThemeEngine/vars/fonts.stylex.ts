import { defineVars } from "@stylexjs/stylex";

import { getThemeConfig } from "../theme-config";

export const dzFontFamilyVariables = defineVars({
  ...getThemeConfig().fonts.family,
});

export const dzFontSizeVariables = defineVars({
  ...getThemeConfig().fonts.size,
});

export const dzIconSizeVariables = defineVars({
  ...getThemeConfig().iconSizes,
});
