import { headerHeight, themes } from '../config/config';
import { primaryColor as lightPrimaryColor } from './lightMode';
import { primaryColor as darkPrimaryColor } from './darkMode';

const getTheme = (mode = themes.light) => {
  const primaryColor = mode === themes.light ? lightPrimaryColor : darkPrimaryColor;

  return {
    palette: {
      mode,
      primary: {
        main: primaryColor
      }
    },
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: `${headerHeight}px !important`
          }
        }
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            marginLeft: "5px",
            borderRadius: "10px",
            width: "calc(100% - 10px)"
          }
        }
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            background: primaryColor,
            color: 'white'
          }
        }
      }
    }
  }
};

export default getTheme;
