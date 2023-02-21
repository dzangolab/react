import { Layout } from "@dzangolab/react-layout";
import { UserToastContainer } from "@dzangolab/react-user";

import Routers from "./Routers";

function App() {
  return (
    <Layout>
      <Routers />
      <UserToastContainer />
    </Layout>
  );
}

export default App;
