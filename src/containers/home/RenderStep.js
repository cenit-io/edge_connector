import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography';

import { FormattedMessage } from 'react-intl';

const RenderStep = ({
  action, enabled, next, index, message
}) => {
  const color = !enabled ? theme => theme.palette.text.disabled : undefined;

  const handleAction = () => {
    action.action(index);
  };

  const displayStep = () => (
    <Alert icon={false} severity="info" sx={{
      backgroundColor: !enabled ? theme => theme.palette.info.contrastText : undefined,
      flexGrow: 1
    }}>
      <Typography sx={{ textTransform: 'uppercase', color }} variant="caption">
        <FormattedMessage id="home.step" />
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color }}>
        {index + 1}
      </Typography>
    </Alert>
  );

  return (
    <Paper variant="outlined" sx={{ width: '100%', padding: 1, mb: '5px' }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '65px', textAlign: 'center', mr: '10px', display: 'flex' }}>
          {displayStep()}
        </Box>
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ color }}>{message}</Typography>
            <Button
              onClick={handleAction}
              variant="outlined"
              size="small"
              sx={{ mt: 'auto', width: 'max-content' }}
              disabled={!enabled}
            >
              {action.btn}
            </Button>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ m: '0 5px  5px' }} />
          <Box sx={{ width: '50%' }}>
            <Typography sx={{ fontWeight: 'bold', color }}><FormattedMessage id="home.what.is.next" /></Typography>
            <Typography sx={{ color }}>{next}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

RenderStep.defaultProps = {
  enabled: false
};

RenderStep.propTypes = {
  index: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  next: PropTypes.string.isRequired,
  action: PropTypes.shape({
    btn: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }).isRequired,
  enabled: PropTypes.bool
};

export default RenderStep;
