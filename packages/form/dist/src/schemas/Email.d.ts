import { z } from "zod";
import type { EmailErrorMessages } from "../types";
import type { IsEmailOptions } from "../types/validator";
declare const schema: (errorMessages?: EmailErrorMessages, options?: IsEmailOptions) => z.ZodEffects<z.ZodString, string, string>;
export default schema;
//# sourceMappingURL=Email.d.ts.map