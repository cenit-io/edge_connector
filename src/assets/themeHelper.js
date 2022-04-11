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
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            padding: '2px'
          },
          indicator: {
            display: 'none'
          },
          flexContainer: {
            borderBottom: `solid 1px ${primaryColor}`
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            border: `solid 1px ${primaryColor}`,
            borderRadius: '5px 5px 0 0',
            padding: '2px 16px',
            borderBottomStyle: 'none',
            height: '40px',
            minHeight: '40px',
            '&.Mui-selected': {
              fontWeight: 'bold',
              backgroundColor: primaryColor,
              color: 'white'
            }
          }
        }
      }
    }
  }
};

export default getTheme;
