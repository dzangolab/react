interface GridContainerProperties {
  children?: React.ReactNode;
}

const GridContainer: React.FC<GridContainerProperties> = ({ children }) => {
  return <div className="dz-grid-container">{children}</div>;
};

export default GridContainer;
