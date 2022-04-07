import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';

const RenderTabNotifications = ({ data }) => {
  return (
    <>
      <Typography>
        <InfoIcon fontSize="small" sx={{ mr: '5px' }} />
        {'There is not retrieved information.'}
      </Typography>
    </>
  );
} 

RenderTabNotifications.propTypes = {
  data: PropTypes.object.isRequired
};

export default RenderTabNotifications;
