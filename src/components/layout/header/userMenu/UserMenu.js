import React, { useContext, useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TranslateIcon from '@mui/icons-material/Translate';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormattedMessage } from 'react-intl';

import GlobalContext from '../../../../config/GlobalContext';
import { themes } from '../../../../config/config';
import { useAuth } from '../../../../utils/auth';
import ManageUserOptions from './ManageUserOptions';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showUserOptions, setShowUserOptions] = useState(null);
  const { config, setMainConfig } = useContext(GlobalContext);

  const auth = useAuth();

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
    <Box sx={{ position: 'absolute', right: '10px', display: 'flex', alignItems: 'center' }}>
      <Typography sx={{display: { md: 'block', xs: 'none' } }}>{auth.authInfo?.name}</Typography>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      {anchorEl && (
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
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
          <Divider />
          <MenuItem onClick={handleUserOptions}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage id="manage.user.options" />
            </ListItemText>
          </MenuItem>
          {auth.authInfo ? (
            <MenuItem onClick={() => auth.signOut()}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>
                <FormattedMessage defaultMessage="Logout" id="components.layout.header.userMenu.logout" />
              </ListItemText>
            </MenuItem>
          ) : (
            <MenuItem onClick={() => auth.signIn()}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText>
                <FormattedMessage defaultMessage="Login" id="components.layout.header.userMenu.login" />
              </ListItemText>
            </MenuItem>
          )}
        </Menu>
      )}
      <ManageUserOptions open={showUserOptions} handleClose={handleUserOptions} />
    </Box>
  );
};

export default UserMenu;
