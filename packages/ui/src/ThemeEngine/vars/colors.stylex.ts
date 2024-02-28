import { defineVars } from "@stylexjs/stylex";

import { getThemeConfig } from "../theme-config";
import { DzColorType, DzThemeVariableType, Dzcolors } from "../types";

const parseConfigVariables = (theme: "light" | "dark") => {
  const colors = getThemeConfig().colors;

  const processedColor = {} as Dzcolors<DzThemeVariableType>;

  for (const x in colors) {
    processedColor[x as keyof Dzcolors<DzThemeVariableType>] =
      colors[x as keyof Dzcolors<DzColorType>][theme];
  }

  return processedColor;
};

export const dzLightColorVariables = defineVars({
  ...parseConfigVariables("light"),
});

export const dzDarkColorVariables = defineVars({
  ...parseConfigVariables("dark"),
});
