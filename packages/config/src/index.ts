import ConfigProvider, {
  configContext,
  getConfig,
} from "./context/ConfigProvider";
import { parse } from "./utils";

import type { AppConfig, AppFeatures } from "./types";

export { configContext, ConfigProvider, parse, getConfig };

export type { AppConfig, AppFeatures };
