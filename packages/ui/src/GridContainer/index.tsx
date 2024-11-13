interface GridContainerProperties {
  children?: React.ReactNode;
}

const GridContainer: React.FC<GridContainerProperties> = ({ children }) => {
  return <div className="dz-grid-container-content">{children}</div>;
};

export default GridContainer;
