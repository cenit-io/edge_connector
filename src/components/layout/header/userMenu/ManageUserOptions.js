import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { drawerWidth } from '../../../../config/config';

const ManageUserOptions = ({ open, handleClose }) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={handleClose}
    sx={{
      zIndex: theme => theme.zIndex.drawer + 2
    }}
  >
    <Box sx={{ width: `${drawerWidth}px`, p: 2 }}>
      <Typography>
        Some user options here...
      </Typography>
    </Box>
  </Drawer>
);

ManageUserOptions.defaultProps = {
  open: false
};

ManageUserOptions.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired
};

export default React.memo(ManageUserOptions, (current, next) => (current.open === next.open));
