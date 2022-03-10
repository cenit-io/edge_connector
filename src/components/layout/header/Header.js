import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

import { name } from '../../../config/projectConfig';
import { drawerWidth } from '../../../config/config';
import UserMenu from './userMenu/UserMenu';

const Header = ({
  isWideDevice, handleDrawerToggle, openDrawer
}) => (
  <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      {isWideDevice && openDrawer && (
        <Box sx={{ width: theme => `calc(${drawerWidth}px - ${theme.spacing(4)})` }}>
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
        {name}
      </Typography>
      <UserMenu />
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
