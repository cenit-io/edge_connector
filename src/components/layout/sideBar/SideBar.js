import React, { useContext } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import MainMenu from "./mainMenu/MainMenu";
import GlobalContext from "../../../config/GlobalContext";
import { drawerWidth } from "../../../config/config";

const SideBar = ({ handleDrawerToggle, openDrawer }) => {
  const { isRtl, isWideDevice } = useContext(GlobalContext);

  return (
    <Drawer
      anchor={isRtl ? 'left' : 'right'}
      open={openDrawer}
      variant={isWideDevice ? 'persistent' : 'temporary'}
      onClose={handleDrawerToggle}
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
}

SideBar.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  openDrawer: PropTypes.bool.isRequired
}

export default React.memo(SideBar, (current, next) => current.openDrawer === next.openDrawer);
