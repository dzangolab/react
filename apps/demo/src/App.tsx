import { Layout } from "@dzangolab/react-layout";
import { ToastContainer } from "react-toastify";

import Routers from "./Routers";

function App() {
  return (
    <Layout>
      <Routers />
      <ToastContainer />
    </Layout>
  );
}

export default App;
