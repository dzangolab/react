import { create } from "@stylexjs/stylex";

import { getThemeConfig } from "../theme-config";

export const flexContainerStyles = create({
  base: () => ({
    display: { default: "flex" },
    gap: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
  }),
});

export const dzThemeBaseStyles = create({
  primary: () => ({
    color: getThemeConfig().colors.primary.light,
  }),
});
