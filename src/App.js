import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IntlProvider } from 'react-intl';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import GlobalContext from './config/GlobalContext';
import config from './config/config';
import { ProvideAuth } from './utils/auth';
import Application from './containers/application/Application';
import getTheme from './assets/themeHelper';

import {
  QueryClient,
  QueryClientProvider
} from 'react-query';

const messageLoader = {
  en: () => import("./translations/en.json"),
  es: () => import("./translations/es.json")
}

function App() {
  const [mainConfig, setMainConfig] = useState(config);
  const [messages, setMessages] = useState(null);

  const matches = useMediaQuery('(min-width:600px)', { noSsr: true });
  const { locale, theme } = mainConfig;

  const mainTheme = createTheme(getTheme(theme));

  const queryClient = new QueryClient();

  useEffect(() => {
    messageLoader[locale]()
      .then(msgData => {
        setMessages(msgData);
      });
  }, [locale]);

  useEffect(() => {
    setMainConfig({ ...mainConfig, wideDevice: matches });
  }, [matches]);

  return (
    <ThemeProvider theme={mainTheme}>
      <GlobalContext.Provider value={{
        isWideDevice: mainConfig?.wideDevice,
        config: mainConfig,
        setMainConfig
      }}>
        <IntlProvider locale={locale} messages={messages}>
          <QueryClientProvider client={queryClient}>
            <ProvideAuth>
              <Application />
            </ProvideAuth>
          </QueryClientProvider>
        </IntlProvider>
      </GlobalContext.Provider>
    </ThemeProvider>
  );
}

export default App;
