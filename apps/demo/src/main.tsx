import { ConfigProvider } from "@dzangolab/react-config";
import i18n from "@dzangolab/react-i18n";
import { UserProvider, superTokens } from "@dzangolab/react-user";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import config from "./config";
import { store } from "./redux/store";

import "normalize.css";

import "@dzangolab/react-ui/dist/DzangolabReactUI.css";
import "@dzangolab/react-i18n/dist/DzangolabReactI18n.css";
import "@dzangolab/react-user/dist/DzangolabReactUser.css";

i18n(config.i18n);

superTokens(config);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider appConfig={config}>
    <UserProvider>
      <Provider store={store}>
        <React.Suspense>
          <App />
        </React.Suspense>
      </Provider>
    </UserProvider>
  </ConfigProvider>
);
