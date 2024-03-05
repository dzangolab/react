export type DzTheme = "DzLight" | "DzDark" | "Auto";

export interface DzColorType<T> {
  light: T;
  dark: T;
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

export interface DzFontFamily<T> {
  primary: T;
  secondary: T;
}

export interface DzFontSize<T> {
  base: T;
  heading1: T;
  heading2: T;
  heading3: T;
  heading4: T;
  heading5: T;
  heading6: T;
  body: T;
  small: T;
}

export interface DzSpacing<T> {
  base: T;
  //margin
  xSmallMargin: T;
  smallMargin: T;
  mediumMargin: T;
  largeMargin: T;
  xLargeMargin: T;
  //padding
  xSmallPadding: T;
  smallPadding: T;
  mediumPadding: T;
  largePadding: T;
  xLargePadding: T;
}

export interface DzBorder<T> {
  thin: T;
  medium: T;
  thick: T;
  smallRadius: T;
  mediumRadius: T;
  largeRadius: T;
}

export interface DzShadows<T> {
  small: T;
  medium: T;
  large: T;
}

export interface DzTransitions<T> {
  duration: T;
  timingFunction: T;
}

export interface DzBreakpoints<T> {
  mobile: T;
  tablet: T;
  desktop: T;
}

export interface DzIconSizes<T> {
  small: T;
  medium: T;
  large: T;
}

export interface DzThemeConfig {
  defaultTheme: DzTheme;
  colors: Dzcolors<DzColorType<string>>;
  fonts: {
    family: DzFontFamily<string>;
    size: DzFontSize<string>;
  };
  spacing: DzSpacing<string>;
  borders: DzBorder<string>;
  shadows: DzShadows<string>;
  transitions: DzTransitions<string>;
  breakpoints: DzBreakpoints<string>;
  iconSizes: DzIconSizes<string>;
}

export type DzThemeBaseStyles<T> = Dzcolors<T>;
// DzBorder<T>,
// DzFontFamily<T>,
// DzFontSize<T>,
// DzIconSizes<T>,
// DzSpacing<T>,
// DzShadows<T>,
// DzBreakpoints<T>,
// DzTransitions<T> {}

export type DzThemeVariableType =
  | Record<"default" | ":hover" | ":active", string>
  | Record<string, string>
  | string;
