import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Footer = ({ showDivider }) => {
  return (
    <Box sx={{ mt: 'auto' }}>
      <Box sx={{ mt: '10px' }}>
        {showDivider && <Divider />}
        <Grid container>
          <Grid item xs={6}>
            <Typography>This is just a plain footer</Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography color="textSecondary">
              Comments? somarriba@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

Footer.defaultProps = {
  showDivider: true
};

Footer.propTypes = {
  showDivider: PropTypes.bool
};

export default React.memo(Footer);
