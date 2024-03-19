import { DetailedHTMLProps, HTMLAttributes } from "react";
import { LoadingPageProperties } from "../LoadingPage";
interface Properties extends Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "aria-orientation"> {
    breadcrumb?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    centered?: boolean;
    errorMessage?: string;
    titleTag?: string | React.ReactNode;
    loading?: boolean;
    loadingComponent?: React.ReactElement;
    loadingPageStyle?: LoadingPageProperties;
    subtitle?: React.ReactNode | string;
    title?: string;
    toolbar?: React.ReactNode;
}
declare const Page: React.FC<Properties>;
export default Page;
//# sourceMappingURL=index.d.ts.map