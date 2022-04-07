import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import { capitalize } from '@mui/material';

const RenderChip = ({ status, styles }) => (
  <Chip
    size="small"
    label={capitalize(status)}
    color={status === 'completed' ? 'success'
      : (status === 'pending' ? 'warning' : (status === 'inactive' ? 'default' : 'error'))}
    sx={{ ...styles, color: 'white' }}
  />
);

RenderChip.defaultProps = {
  styles: {}
};

RenderChip.propTypes = {
  status: PropTypes.string.isRequired,
  styles: PropTypes.object
};

export default React.memo(RenderChip, (current, next) => current.status === next.status && current.styles === next.styles);
