import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';
import RenderStep from './RenderStep';

import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const steps = [
    {
      message: <FormattedMessage id="home.step.1" />,
      next: <FormattedMessage id="home.step.1.next" />,
      btn: <FormattedMessage id="home.step.1.btn" />
    }, {
      message: <FormattedMessage id="home.step.2" />,
      next: <FormattedMessage id="home.step.2.next" />,
      btn: <FormattedMessage id="home.step.2.btn" />
    }, {
      message: <FormattedMessage id="home.step.3" />,
      next: <FormattedMessage id="home.step.3.next" />,
      btn: <FormattedMessage id="home.step.3.btn" />
    }, {
      message: <FormattedMessage id="home.step.4" />,
      next: <FormattedMessage id="home.step.4.next" />,
      btn: <FormattedMessage id="home.step.4.btn" />
    }
  ];

  const action = payload => {
    if (payload === '0') {
      navigate('/integrations/available-integrations');
    } else if (payload === '1') {
      navigate('/integrations/connected-integrations');
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <HomeIcon sx={{ mt: '3px', mr: '5px' }} color="primary" />
        <Typography variant="h6"><FormattedMessage id="home.salut" /></Typography>
      </Box>
      {steps.map((stepItem, index) => (
        <RenderStep
          btn={stepItem.btn}
          action={action}
          next={stepItem.next}
          message={stepItem.message}
          index={index}
        />
      ))}
    </>
  )
};

export default HomePage;
