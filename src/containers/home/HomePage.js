/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import RenderStep from './RenderStep';

import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const steps = [
    {
      message: intl.formatMessage({ id: 'home.step.1' }),
      next: intl.formatMessage({ id: 'home.step.1.next' }),
      action: { btn: intl.formatMessage({ id: 'home.step.1.btn' }), action: () => { navigate('/integrations/available-integrations'); } }
    }, {
      message: intl.formatMessage({ id: 'home.step.2' }),
      next: intl.formatMessage({ id: 'home.step.2.next' }),
      action: { btn: intl.formatMessage({ id: 'home.step.2.btn' }), action: () => { navigate('/integrations/connected-integrations'); } }
    }, {
      message: intl.formatMessage({ id: 'home.step.3' }),
      next: intl.formatMessage({ id: 'home.step.3.next' }),
      action: { btn: intl.formatMessage({ id: 'home.step.3.btn' }), action: index => { console.log(index); } }
    }, {
      message: intl.formatMessage({ id: 'home.step.4' }),
      next: intl.formatMessage({ id: 'home.step.4.next' }),
      action: { btn: intl.formatMessage({ id: 'home.step.4.btn' }), action: index => { console.log(index); } }
    }
  ];

  return (
    <>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <HomeIcon sx={{ mt: '3px', mr: '5px' }} color="primary" />
        <Typography variant="h6"><FormattedMessage id="home.salut" /></Typography>
      </Box>
      {steps.map((stepItem, index) => (
        <RenderStep
          action={stepItem.action}
          next={stepItem.next}
          message={stepItem.message}
          index={index}
        />
      ))}
    </>
  )
};

export default HomePage;
