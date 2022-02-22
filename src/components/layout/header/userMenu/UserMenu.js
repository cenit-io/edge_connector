import React, { useContext, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import GlobalContext from "../../../../config/GlobalContext";
import { FormattedMessage } from "react-intl";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
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
    debugger;
    setMainConfig({ ...config, theme: config.theme === 'light' ? 'dark' : 'light' });
    handleClose();
  };

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
            <FormattedMessage id="switch.language" values={
              { language: <FormattedMessage id={config.locale === 'en' ? 'spanish' : 'english'} /> }
            } />
          </MenuItem>
          <MenuItem onClick={handleTheme}>
            <FormattedMessage id="switch.theme" values={
              { theme: <FormattedMessage id={config.theme === 'light' ? 'dark' : 'light'} /> }
            } />
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default UserMenu;
