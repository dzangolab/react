import { NavMenuType } from "@/components/Layout";
interface HeaderLayoutProperties {
    className?: string;
    children?: React.ReactNode;
    displayNavIcons?: boolean;
    navigationMenu?: NavMenuType;
    title?: string | React.ReactNode;
    menu?: React.ReactNode;
    noLocaleSwitcher?: boolean;
    noLogo?: boolean;
    noToggle?: boolean;
    customHeader?: React.ReactNode;
    fixed?: boolean;
}
export declare const HeaderLayout: React.FC<HeaderLayoutProperties>;
export {};
//# sourceMappingURL=HeaderLayout.d.ts.map