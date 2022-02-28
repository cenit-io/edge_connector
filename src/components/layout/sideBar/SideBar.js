import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import MainMenu from "./mainMenu/MainMenu";
import { drawerWidth } from "../../../config/config";

const SideBar = ({ isWideDevice, handleDrawerToggle, openDrawer }) => (
  <Drawer
    anchor="left"
    open={openDrawer}
    variant={isWideDevice ? 'persistent' : 'temporary'}
    onClose={handleDrawerToggle}
    PaperProps={{ style: { left: 0, right: 'unset' } }}
    ModalProps={isWideDevice ? { keepMounted: true } : undefined}
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
    }}
  >
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
      <MainMenu />
    </Box>
  </Drawer>
);

SideBar.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  openDrawer: PropTypes.bool.isRequired,
  isWideDevice: PropTypes.bool.isRequired
}

export default React.memo(SideBar, (current, next) => current.openDrawer === next.openDrawer && current.isWideDevice === next.isWideDevice);
