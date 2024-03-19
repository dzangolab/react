import { NavigateFunction } from "react-router-dom";
type UseFirstUserSignupArguments = {
    appConfig: any;
} & ({
    autoRedirect: false;
    redirectFn: undefined;
} | {
    autoRedirect: true;
    redirectFn: ((to?: string) => void) | NavigateFunction;
});
export declare const useFirstUserSignup: ({ appConfig, autoRedirect, redirectFn, }: UseFirstUserSignupArguments) => (boolean | null)[];
export {};
//# sourceMappingURL=useFirstUserSignup.d.ts.map