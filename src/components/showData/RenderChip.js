import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import { capitalize } from '@mui/material';

const RenderChip = ({ status, styles }) => {
  let color = 'default';

  switch (status.toLowerCase()) {
    case 'completed':
    case 'active':
    case 'success': {
      color = 'success';
      break;
    }
    case 'info':
    case 'running': {
      color = 'primary';
      break;
    }
    case 'pending':
    case 'paused':
    case 'warning': {
      color = 'warning';
      break;
    }
    case 'broken':
    case 'inactive':
    case 'failed':
    case 'unscheduled':
    case 'error': {
      color = 'error';
      break;
    }
    default: {
      color = 'default';
      break;
    }
  }

  return (
    <Chip
      size="small"
      label={capitalize(status)}
      color={color}
      sx={{ ...styles, color: color !== 'default' ? 'white' : 'black', width: 'fit-content' }}
    />
  );
};

RenderChip.defaultProps = {
  styles: {}
};

RenderChip.propTypes = {
  status: PropTypes.string.isRequired,
  styles: PropTypes.object
};

export default React.memo(RenderChip, (current, next) => current.status === next.status && current.styles === next.styles);
