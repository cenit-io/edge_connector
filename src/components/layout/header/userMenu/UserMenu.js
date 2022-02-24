import React, { useContext, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TranslateIcon from "@mui/icons-material/Translate";
import Divider from "@mui/material/Divider";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GlobalContext from "../../../../config/GlobalContext";
import { themes } from "../../../../config/config";
import { FormattedMessage } from "react-intl";
import ManageUserOptions from "./ManageUserOptions";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showUserOptions, setShowUserOptions] = useState(null);
  const { config, setMainConfig } = useContext(GlobalContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguage = () => {
    setMainConfig({ ...config, locale: config.locale === 'en' ? 'es' : 'en' });
    handleClose();
  };

  const handleTheme = () => {
    setMainConfig({ ...config, theme: config.theme === themes.light ? themes.dark : themes.light });
    handleClose();
  };

  const handleUserOptions = () => {
    setShowUserOptions(!showUserOptions);
    handleClose();
  };

  const isLight = config.theme === themes.light;

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        sx={{ position: 'absolute', right: '10px' }}
      >
        <AccountCircle />
      </IconButton>
      {anchorEl && (
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLanguage}>
            <ListItemIcon>
              <TranslateIcon />
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage id="switch.language" values={
                { language: <FormattedMessage id={config.locale === 'en' ? 'spanish' : 'english'} /> }
              } />
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={handleTheme}>
            <ListItemIcon>
              {isLight ? <DarkModeIcon /> : <LightModeIcon />}
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage id="switch.theme" values={
                { theme: <FormattedMessage id={isLight ? 'dark' : 'light'} /> }
              } />
            </ListItemText>
          </MenuItem>
          <Divider/>
          <MenuItem onClick={handleUserOptions}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage id="manage.user.options" />
            </ListItemText>
          </MenuItem>
        </Menu>
      )}
      <ManageUserOptions open={showUserOptions} handleClose={handleUserOptions} />
    </>
  );
};

export default UserMenu;
