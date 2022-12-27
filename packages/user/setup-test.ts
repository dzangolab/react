import { vi } from "vitest";

vi.mock("@dzangolab/react-i18n", () => ({
  useTranslation: () => {
    return {
      t: (string_) => string_,
      i18n: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));
