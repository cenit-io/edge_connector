import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { drawerWidth } from '../../../config/config';

const UserMenu = React.lazy(() => import('./userMenu/UserMenu'));

const Header = ({ isWideDevice, handleDrawerToggle, openDrawer }) => (
  <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      {isWideDevice && openDrawer && (
        <Box sx={{ width: theme => `calc(${drawerWidth}px - ${theme.spacing(4)})`, display: 'flex' }}>
          <Box
            component="img" alt="EBANUX" src="/icons/ebanux_white.svg"
            sx={{ width: '100px' }}
          />
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
      <Suspense fallback={'Loading...'}>
        <UserMenu />
      </Suspense>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  openDrawer: PropTypes.bool.isRequired,
  isWideDevice: PropTypes.bool.isRequired
};

const notRenderIf = (current, next) => (
  current.openDrawer === next.openDrawer && current.isWideDevice === next.isWideDevice
);

export default React.memo(Header, notRenderIf);
