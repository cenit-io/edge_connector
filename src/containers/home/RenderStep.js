import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { FormattedMessage } from 'react-intl';

const RenderStep = ({
  action, next, index, message
}) => {
  const matches = useMediaQuery('(min-width: 770px)');

  const handleAction = () => {
    action.action();
  };

  const displayStep = () => (
    <Alert icon={false} severity="info" sx={{
      flexGrow: 1,
      '& .MuiAlert-message': { m: 'auto' }
    }}>
      <Typography sx={{ textTransform: 'uppercase' }} variant="caption">
        <FormattedMessage id="home.step" />
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {index + 1}
      </Typography>
    </Alert>
  );

  return (
    <Paper variant="outlined" sx={{ width: '100%', p: 2, mb: '10px' }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '65px', textAlign: 'center', mr: '10px', display: 'flex' }}>
          {displayStep()}
        </Box>
        <Box sx={{ width: '100%', display: matches ? 'flex' : undefined }}>
          <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography>{message}</Typography>
            <Button
              onClick={handleAction}
              variant="outlined"
              size="small"
              sx={{
                mt: 'auto',
                width: 'max-content',
                '@media (max-width: 600px)': {
                  width: '175px'
                }
              }}
            >
              {action.btn}
            </Button>
          </Box>
          <Divider orientation={matches ? 'vertical' : 'horizontal'} flexItem sx={{ m: matches ? '0 10px 0 10px' : '10px 0 10px 0' }} />
          <Box sx={{ width: '100%' }}>
            <Typography sx={{ fontWeight: 'bold' }}><FormattedMessage id="home.what.is.next" /></Typography>
            <Typography>{next}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

RenderStep.propTypes = {
  index: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  next: PropTypes.string.isRequired,
  action: PropTypes.shape({
    btn: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }).isRequired
};

export default React.memo(RenderStep, (current, nextProps) => (current.message === nextProps.message && current.next === nextProps.next));
