import { create, props } from "@stylexjs/stylex";
import React from "react";

import { useDzThemeContext } from "../context";
import { getThemeConfig } from "../theme-config";

const containerStyles = create({
  base: {
    display: "flex",
    width: "100%",
    height: "50vmax",
    justifyContent: "center",
    alignItems: "center",
  },
  theme: (theme: "light" | "dark") => ({
    background: getThemeConfig().colors.background[theme],
    color: getThemeConfig().colors.text[theme],
  }),
});

export const StylexDemoPage = () => {
  const { theme } = useDzThemeContext();

  const styles = props(
    containerStyles.base,
    containerStyles.theme(theme === "DzDark" ? "dark" : "light"),
  );

  return (
    <div style={styles.style} className={styles.className}>
      StylexDemo
    </div>
  );
};
