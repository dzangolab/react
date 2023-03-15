import { Page } from "@dzangolab/react-ui";

import "@dzangolab/react-layout/dist/DzangolabReactLayout.css";

interface IProperties {
  pageTitle: string;
}

const ListPage: React.FC<IProperties> = ({ pageTitle }) => {
  return <Page title={pageTitle} />;
};

export default ListPage;
