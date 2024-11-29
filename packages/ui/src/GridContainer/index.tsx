interface GridContainerProperties {
  className?: string;
  children?: React.ReactNode;
}

const GridContainer: React.FC<GridContainerProperties> = ({
  className,
  children,
}) => {
  return (
    <div className={`dz-grid-container ${className}`.trim()}>{children}</div>
  );
};

export default GridContainer;
