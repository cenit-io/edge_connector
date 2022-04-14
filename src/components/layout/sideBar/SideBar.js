import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import { drawerWidth, headerHeight } from '../../../config/config';

const MainMenu = React.lazy(() => import('./mainMenu/MainMenu'));
const MainMenuFooter = React.lazy(() => import('./mainMenuFooter/MainMenuFooter'));


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
      minHeight: `calc(100vh - ${headerHeight}px)`
    }}>
      <Suspense fallback={'Loading...'}>
        <MainMenu dense={isWideDevice} />
        <MainMenuFooter />
      </Suspense>
    </Box>
  </Drawer>
);

SideBar.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  openDrawer: PropTypes.bool.isRequired,
  isWideDevice: PropTypes.bool.isRequired
}

export default React.memo(SideBar, (current, next) => current.openDrawer === next.openDrawer && current.isWideDevice === next.isWideDevice);
