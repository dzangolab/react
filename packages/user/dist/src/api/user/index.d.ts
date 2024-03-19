import type { LoginCredentials, UpdateProfileInputType, UserType } from "@/types";
export declare const getIsFirstUser: (apiBaseUrl: string) => Promise<{
    signUp: boolean;
}>;
export declare const signUpFirstUser: (credential: LoginCredentials, apiBaseUrl: string) => Promise<UserType>;
export declare const enableUser: (id: number, apiBaseUrl: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const disableUser: (id: number, apiBaseUrl: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const updateUserProfile: (data: UpdateProfileInputType, apiBaseUrl: string) => Promise<{
    data: UserType;
}>;
//# sourceMappingURL=index.d.ts.map