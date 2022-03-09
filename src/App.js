/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import GlobalContext from "./config/GlobalContext";
import config from "./config/config";
import { ProvideAuth } from "./utils/auth";
import Application from "./containers/application/Application";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { IntlProvider } from "react-intl";
import getTheme from "./assets/themeHelper";

const messageLoader = {
  en: () => import("./translations/en.json"),
  es: () => import("./translations/es.json")
}

function App() {
  const [mainConfig, setMainConfig] = useState(config);
  const [messages, setMessages] = useState(null);

  const matches = useMediaQuery('(min-width:600px)');
  const { locale, theme } = mainConfig;

  const mainTheme = createTheme(getTheme(theme));

  useEffect(() => {
    messageLoader[locale]()
      .then(msgData => {
        setMessages(msgData);
      });
  }, [locale]);

  useEffect(() => {
    setMainConfig({ ...mainConfig, wideDevice: matches });
  }, [matches]);

  if (!messages) {
    return "Loading...";
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <GlobalContext.Provider value={{
        isWideDevice: mainConfig?.wideDevice,
        config: mainConfig,
        setMainConfig
      }}>
        <IntlProvider locale={locale} messages={messages}>
        <ProvideAuth>
          <Application />
        </ProvideAuth>
        </IntlProvider>
      </GlobalContext.Provider>
    </ThemeProvider>
  );
}

export default App;
