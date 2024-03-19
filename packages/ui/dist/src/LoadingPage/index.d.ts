import React from "react";
export interface LoadingPageProperties extends Pick<React.CSSProperties, "fontSize" | "color"> {
    pageType?: "container" | "overlay";
}
declare const LoadingPage: ({ color, fontSize, pageType, }: LoadingPageProperties) => React.JSX.Element;
export default LoadingPage;
//# sourceMappingURL=index.d.ts.map