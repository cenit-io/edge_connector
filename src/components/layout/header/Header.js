import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { drawerWidth } from "../../../config/config";
import UserMenu from "./userMenu/UserMenu";

const Header = ({ includeUserMenu, handleDrawerToggle, openDrawer }) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {openDrawer && (
          <Box sx={{ width: `${drawerWidth - 32}px` }}>
            <Typography>
              <FormattedMessage id="icon.goes.here" />
            </Typography>
          </Box>
        )}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          {openDrawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          <FormattedMessage id="project.comment" />
        </Typography>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

Header.defaultProps = {
  includeUserMenu: true
};

Header.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  openDrawer: PropTypes.bool.isRequired,
  includeUserMenu: PropTypes.bool
}

export default Header;
