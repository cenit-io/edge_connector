import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const Progress = ({ includePercent, handleColor, value, ...other }) => (
  <Box {...other}>
    <LinearProgress
      variant="determinate"
      value={value}
      color={handleColor ?
        (value < 25 ? 'error' : (value >= 25 && value < 50
          ? 'warning' : (value >= 50 && value < 75 ? 'info' : 'success'))) : 'primary'}
      sx={{
        height: theme => theme.spacing(3), borderRadius: theme => theme.spacing(2)
      }}
    />
    {includePercent && (
      <Typography
        sx={{
          textAlign: 'center',
          position: 'sticky',
          marginTop: '-22px',
          color: 'white'
        }}
        variant="subtitle2"
      >
        {`${value}%`}
      </Typography>
    )}
  </Box>
);

Progress.defaultProps = {
  includePercent: true,
  handleColor: true
};

Progress.propTypes = {
  value: PropTypes.number.isRequired,
  includePercent: PropTypes.bool,
  handleColor: PropTypes.bool
};

export default React.memo(Progress);
