export type LayoutCotextType = {
    menuDesktopOpen: boolean;
    menuMobileOpen: boolean;
    setMenuDesktopOpen: (value: boolean) => void;
    setMenuMobileOpen: (value: boolean) => void;
};
export declare const LayoutContext: import("react").Context<LayoutCotextType | null>;
type LayoutProviderProperties = {
    children?: React.ReactNode;
};
export declare const LayoutProvider: ({ children }: LayoutProviderProperties) => import("react").JSX.Element;
export declare const useLayoutContext: () => LayoutCotextType;
export {};
//# sourceMappingURL=Context.d.ts.map