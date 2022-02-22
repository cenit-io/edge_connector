/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import GlobalContext from "./config/GlobalContext";
import config from "./config/config";
import Application from "./containers/application/Application";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { IntlProvider } from "react-intl";

const theme = createTheme();
const messageLoader = {
  en: () => import("./translations/en.json"),
  es: () => import("./translations/es.json")
}

function App() {
  const [mainConfig, setMainConfig] = useState(config);
  const [messages, setMessages] = useState(null);

  const matches = useMediaQuery('(min-width:600px)');
  const { locale } = mainConfig;

  useEffect(() => {
    messageLoader[locale]().then(messages => {
      setMessages(messages);
    });
  }, [locale]);

  useEffect(() => {
    setMainConfig({ ...mainConfig, wideDevice: matches });
  }, [matches]);

  if (!messages) {
    return "Loading...";
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Provider value={{
        isWideDevice: mainConfig?.wideDevice,
        isRtl: mainConfig?.rtl,
        setMainConfig
      }}>
        <IntlProvider locale={locale} messages={messages}>
          <Application />
        </IntlProvider>
      </GlobalContext.Provider>
    </ThemeProvider>
  );
}

export default App;
