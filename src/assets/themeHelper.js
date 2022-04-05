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
            borderRadius: "0px 40px 40px 0px",
            width: "calc(100% - 5px)"
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
