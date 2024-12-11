import { DetailedHTMLProps, HTMLAttributes } from "react";

import LoadingPage, { LoadingPageProperties } from "../LoadingPage";

interface MasonryProperties
  extends Pick<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "aria-orientation"
  > {
  children?: React.ReactNode;
  className?: string;
  columnsCount?: number;
  gutter?: string;
  errorMessage?: string;
  loading?: boolean;
  loadingComponent?: React.ReactElement;
}

const Masonry: React.FC<MasonryProperties> = ({
  children,
  columnsCount = 3,
  className,
  loading = false,
  loadingComponent,
  errorMessage,
  gutter = "1rem",
  ...others
}) => {
  let child = null;
  let _className = "dz-page";

  if (loading) {
    child = loadingComponent;
  } else if (errorMessage) {
    child = (
      <div className="error" role="alert">
        <span>{errorMessage}</span>
      </div>
    );
  }

  if (className) {
    _className += ` ${className}`;
  }

  return (
    <div className={_className}>
      <div
        data-testid="masonry-content"
        className="dz-masonry-content"
        {...others}
      >
        {child ? child : children}
        {/* {items?.map((item, index) => (
          <div key={index} className={`item item${item.id}`}>
            {item.content}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Masonry;
export type { MasonryProperties };
