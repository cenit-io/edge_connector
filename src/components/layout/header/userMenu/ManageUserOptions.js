import React from "react";
import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ManageUserOptions = ({ open, handleClose }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={{ 
        zIndex: theme => theme.zIndex.drawer + 2
       }}
    >
      <Box>
        <Typography>
          Some user options here...
        </Typography>
      </Box>
    </Drawer>
  );
}

ManageUserOptions.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default React.memo(ManageUserOptions, (current, next) => (current.open === next.open));
