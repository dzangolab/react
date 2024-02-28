export type DzTheme = "DzLight" | "DzDark" | "Auto";

export interface DzColorType {
  light: string;
  dark: string;
}

export interface Dzcolors<T> {
  primary: T;
  secondary: T;
  accent: T;
  background: T;
  text: T;
  error: T;
  success: T;
  warning: T;
  info: T;
}

export interface DzFontFamily {
  primary: string;
  secondary: string;
}

export interface DzFontSize {
  base: string;
  heading1: string;
  heading2: string;
  heading3: string;
  heading4: string;
  heading5: string;
  heading6: string;
  body: string;
  small: string;
}

export interface DzSpacing {
  base: string;
  //margin
  xSmallMargin: string;
  smallMargin: string;
  mediumMargin: string;
  largeMargin: string;
  xLargeMargin: string;
  //padding
  xSmallPadding: string;
  smallPadding: string;
  mediumPadding: string;
  largePadding: string;
  xLargePadding: string;
}

export interface DzBorder {
  thin: string;
  medium: string;
  thick: string;
  smallRadius: string;
  mediumRadius: string;
  largeRadius: string;
}

export interface DzShadows {
  small: string;
  medium: string;
  large: string;
}

export interface DzTransitions {
  duration: string;
  timingFunction: string;
}

export interface DzBreakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface DzIconSizes {
  small: string;
  medium: string;
  large: string;
}

export interface DzThemeConfig {
  defaultTheme: DzTheme;
  colors: Dzcolors<DzColorType>;
  fonts: {
    family: DzFontFamily;
    size: DzFontSize;
  };
  spacing: DzSpacing;
  borders: DzBorder;
  shadows: DzShadows;
  transitions: DzTransitions;
  breakpoints: DzBreakpoints;
  iconSizes: DzIconSizes;
}

export type DzThemeVariableType =
  | Record<"default" | ":hover" | ":active", string>
  | Record<string, string>
  | string;
