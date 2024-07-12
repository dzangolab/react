import { ConfigProvider } from "@dzangolab/react-config";
import i18n from "@dzangolab/react-i18n";
import { configureTooltip } from "@dzangolab/react-ui";
import { UserProvider } from "@dzangolab/react-user";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import config from "./config";

// react-toastify
import "react-toastify/dist/ReactToastify.css";

// PrimeReact CSS
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

import "@dzangolab/react-form/dist/DzangolabReactForm.css";
import "@dzangolab/react-layout/dist/DzangolabReactLayout.css";
import "@dzangolab/react-ui/dist/DzangolabReactUI.css";
import "@dzangolab/react-user/dist/DzangolabReactUser.css";

import "./assets/css/index.css";

i18n(config.i18n);

// configure tooltip globally
configureTooltip({
  offset: 10,
  delay: 400,
  position: "right",
  mouseTrack: false,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider appConfig={config}>
    <UserProvider>
      <React.Suspense>
        <App />
      </React.Suspense>
    </UserProvider>
  </ConfigProvider>,
);
