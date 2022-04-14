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
  btn, next, index, message, action
}) => {

  const handleAction = e => {
    action(`${e.target.name}`);
  };

  return (
    <Paper variant="outlined" sx={{ width: '100%', p: 2, mb: '10px' }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ textAlign: 'center', mr: '10px', display: 'flex' }}>
          <Alert icon={false} severity="info" sx={{
            flexGrow: 1,
            '& .MuiAlert-message': { m: 'auto' }
          }}>
            <Typography sx={{ textTransform: 'uppercase' }} variant="caption">
              <FormattedMessage defaultMessage="Step" id="home.step" />
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {index + 1}
            </Typography>
          </Alert>
        </Box>
        <Box sx={{
          display: 'flex',
          '@media (max-width: 600px)': { display: 'block' }
        }}>
          <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography>{message}</Typography>
            <Button
              onClick={handleAction}
              name={index}
              variant="outlined"
              size="small"
              sx={{
                mt: 'auto',
                width: 'max-content',
                '@media (max-width: 600px)': { width: '175px' }
              }}
            >
              {btn}
            </Button>
          </Box>  
          <Divider
            orientation="vertical"
            sx={{
              m: '0 10px 0 10px',
              '@media (max-width: 600px)': { display: 'none' }
            }}
          />
          <Box sx={{ width: '100%', '@media (max-width: 600px)': { mt: '10px' } }}>
            <Typography sx={{ fontWeight: 'bold' }}><FormattedMessage defaultMessage="What's next?" id="home.what.is.next" /></Typography>
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
  btn: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

export default RenderStep;
