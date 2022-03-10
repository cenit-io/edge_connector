import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import MainMenu from './mainMenu/MainMenu';
import { drawerWidth } from '../../../config/config';
import MainMenuFooter from './mainMenuFooter/MainMenuFooter';

const SideBar = ({ isWideDevice, handleDrawerToggle, openDrawer }) => (
  <Drawer
    anchor="left"
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
    <Box sx={{
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 50px)'
    }}>
      <MainMenu dense={isWideDevice} />
      <MainMenuFooter />
    </Box>
  </Drawer>
);

SideBar.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  openDrawer: PropTypes.bool.isRequired,
  isWideDevice: PropTypes.bool.isRequired
}

export default React.memo(SideBar, (current, next) => current.openDrawer === next.openDrawer && current.isWideDevice === next.isWideDevice);
