import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';

import { drawerWidth } from '../../config/config';
import GlobalContext from '../../config/GlobalContext';
// import SideBar from './sideBar/SideBar';
import Header from './header/Header';

const MainLayout = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const { isWideDevice } = useContext(GlobalContext);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  useEffect(() => {
    if (isWideDevice && !openDrawer) {
      setOpenDrawer(true);
    }
    if (!isWideDevice && openDrawer) {
      setOpenDrawer(false);
    }
  }, [isWideDevice]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} openDrawer={openDrawer} isWideDevice={isWideDevice} />
      {/* <SideBar handleDrawerToggle={handleDrawerToggle} openDrawer={openDrawer} isWideDevice={isWideDevice} /> */}
      <Box
        component="main"
        sx={isWideDevice ? {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          flexGrow: 1,
          p: 2,
          transition: theme => theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          }),
          marginLeft: `-${drawerWidth}px`,
          ...(openDrawer && {
            transition: theme => theme.transitions.create("margin", {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: 0
          })
        } : {
          flexGrow: 1,
          p: 3,
          width: `${drawerWidth}px`
        }}>
        <Toolbar />
        <Paper elevation={2} sx={{ p: 2 }}>
          {children}
        </Paper>
      </Box>
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default MainLayout;
