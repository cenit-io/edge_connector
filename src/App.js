/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import GlobalContext from "./config/GlobalContext";
import config from "./config/config";
import Application from "./containers/application/Application";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

function App() {
  const [mainConfig, setMainConfig] = useState(config);
  const matches = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    setMainConfig({ ...mainConfig, wideDevice: matches });
  }, [matches]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Provider value={{
        isWideDevice: mainConfig?.wideDevice,
        isRtl: mainConfig?.rtl,
        setMainConfig
      }}>
        <Application />
      </GlobalContext.Provider>
    </ThemeProvider>
  );
}

export default App;
