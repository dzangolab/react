interface Properties {
  version?: string;
}

const Version = ({ version }: Properties) => {
  return <div className="version">{version}</div>;
};

Version.defaultProps = {
  version: "[App Version]",
};

export default Version;
