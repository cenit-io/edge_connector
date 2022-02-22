/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { drawerWidth } from '../../config/config';
import GlobalContext from '../../config/GlobalContext';
import SideBar from './sideBar/SideBar';
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
      <Header handleDrawerToggle={handleDrawerToggle} openDrawer={openDrawer} />
      <SideBar handleDrawerToggle={handleDrawerToggle} openDrawer={openDrawer} />
      <Box
        component="main"
        sx={{
          mt: '64px',
          flexGrow: 1,
          p: 3,
          width: openDrawer ? `calc(100% - ${drawerWidth}px)` : '100%'
        }}>
        {children}
      </Box>
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default MainLayout;
