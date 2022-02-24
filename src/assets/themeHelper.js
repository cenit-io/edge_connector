import { themes } from "../config/config";

const getTheme = (mode = themes.light) => ({
  palette: {
    mode
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "50px !important"
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: "0px 40px 40px 0px",
          width: "calc(100% - 5px)"
        }
      }
    }
  }
});

export default getTheme;
