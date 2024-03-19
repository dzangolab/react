import { z } from "zod";
import type { PasswordErrorMessages, StrongPasswordOptions } from "../types";
declare const schema: (errorMessages?: PasswordErrorMessages, options?: StrongPasswordOptions) => z.ZodEffects<z.ZodString, string, string>;
export default schema;
//# sourceMappingURL=Password.d.ts.map