import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Typography from "@mui/material/Typography";
import { drawerWidth } from "../../../config/config";
import { FormattedMessage } from "react-intl";

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
