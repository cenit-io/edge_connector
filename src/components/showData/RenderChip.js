import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WarningIcon from '@mui/icons-material/Warning';

import { capitalize } from '@mui/material';
import { STATUS } from '../../config/constants';

const {
  completed, active, success, info, running, pending, paused,
  warning, broken, inactive, failed, unscheduled, error
} = STATUS;

const RenderChip = ({ status, styles, renderIcon }) => {
  let color = 'default';

  switch (status.toLowerCase()) {
    case completed:
    case active:
    case success: {
      color = 'success';
      break;
    }
    case info:
    case running: {
      color = 'primary';
      break;
    }
    case pending:
    case paused:
    case warning: {
      color = 'warning';
      break;
    }
    case broken:
    case inactive:
    case failed:
    case unscheduled:
    case error: {
      color = 'error';
      break;
    }
    default: {
      color = 'default';
      break;
    }
  }

  const renderIconFunc = () => {
    if (!renderIcon) {
      return undefined;
    }
    switch (status.toLowerCase()) {
      case completed:
      case success: {
        return <CheckCircleIcon />;
      }
      case pending: {
        return <HourglassFullIcon />;
      }
      case active: {
        return <ThumbUpIcon />
      }
      case inactive: {
        return <ThumbDownIcon />;
      }
      case info: {
        return <InfoOutlinedIcon />;
      }
      case warning: {
        return <WarningIcon />;
      }
      case failed:
      case error:
      case broken: {
        return <ErrorIcon />
      }
      case running: {
        return <RunCircleIcon />
      }
      case paused: {
        return <PauseCircleIcon />
      }
      case unscheduled: {
        return <AlarmOffIcon />
      }
      default: {
        return <AssignmentIcon />
      }
    }
  }

  return (
    <Chip
      size="small"
      icon={renderIconFunc()}
      label={capitalize(status)}
      color={color}
      sx={{ ...styles, color: color !== 'default' ? 'white' : 'black', width: 'fit-content' }}
    />
  );
};

RenderChip.defaultProps = {
  styles: {},
  renderIcon: true
};

RenderChip.propTypes = {
  status: PropTypes.string.isRequired,
  styles: PropTypes.object,
  renderIcon: PropTypes.bool
};

export default React.memo(RenderChip, (current, next) => current.status === next.status && current.styles === next.styles);
