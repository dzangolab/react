import { DzThemeConfig } from "./types";

const themeConfigProvider = () => {
  const themeConfig: DzThemeConfig = {
    defaultTheme: "auto",
    colors: {
      primary: {
        light: "#007bff",
        dark: "#007bff",
      },
      secondary: {
        light: "#6c757d",
        dark: "#6c757d",
      },
      accent: {
        light: "#ffc107",
        dark: "#ffc107",
      },
      background: {
        light: "#f8f9fa",
        dark: "#343a40",
      },
      text: {
        light: "#212529",
        dark: "#f8f9fa",
      },
      error: {
        light: "#dc3545",
        dark: "#ff7b7b",
      },
      success: {
        light: "#28a745",
        dark: "#63ed7a",
      },
      warning: {
        light: "#ffc107",
        dark: "#ffc107",
      },
      info: {
        light: "#17a2b8",
        dark: "#17a2b8",
      },
    },
    // Fonts, Spacing, Borders, Shadows, Transitions, Breakpoints remain the same for both modes
    fonts: {
      family: {
        primary: "Arial, sans-serif",
        secondary: "Arial, sans-serif",
      },
      size: {
        base: "16px",
        heading1: "2.5rem",
        heading2: "2rem",
        heading3: "1.75rem",
        heading4: "1.5rem",
        heading5: "1.25rem",
        heading6: "1rem",
        body: "1rem",
        small: "0.875rem",
      },
    },
    spacing: {
      base: "8px",
      xSmallMargin: "4px",
      smallMargin: "8px",
      mediumMargin: "16px",
      largeMargin: "24px",
      xLargeMargin: "32px",
      xSmallPadding: "4px",
      smallPadding: "8px",
      mediumPadding: "16px",
      largePadding: "24px",
      xLargePadding: "32px",
    },
    borders: {
      thin: "1px",
      medium: "2px",
      thick: "3px",
      smallRadius: "4px",
      mediumRadius: "8px",
      largeRadius: "12px",
    },
    shadows: {
      small: "0 2px 4px rgba(0, 0, 0, 0.1)",
      medium: "0 4px 8px rgba(0, 0, 0, 0.1)",
      large: "0 8px 16px rgba(0, 0, 0, 0.1)",
    },
    transitions: {
      duration: "0.3s",
      timingFunction: "ease-in-out",
    },
    breakpoints: {
      mobile: "576px",
      tablet: "768px",
      desktop: "992px",
    },
    iconSizes: {
      small: "16px",
      medium: "24px",
      large: "32px",
    },
  };

  return {
    getThemeConfig: (): Readonly<DzThemeConfig> => ({ ...themeConfig }),
    setThemeConfig: (userThemeConfig: DzThemeConfig) => {
      function mergeObjects(target: any, source: any): void {
        for (const key in source) {
          if (typeof source[key] === "object" && !Array.isArray(source[key])) {
            // If the current property is an object, recursively merge it
            mergeObjects(target[key], source[key]);
          } else {
            // Otherwise, assign the value directly
            target[key] = source[key];
          }
        }
      }

      mergeObjects(themeConfig, userThemeConfig);
    },
  };
};

export const { getThemeConfig, setThemeConfig } = themeConfigProvider();
