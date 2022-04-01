/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import RenderStep from './RenderStep';

const HomePage = () => {
  const [step, setStep] = useState(0);
  const intl = useIntl();

  const steps = [
    {
      message: intl.formatMessage({ id: 'home.step.1' }),
      next: intl.formatMessage({ id: 'home.step.1.next' }),
      action: { btn: intl.formatMessage({ id: 'home.step.1.btn' }), action: index => { setStep(index + 1); } }
    }, {
      message: intl.formatMessage({ id: 'home.step.2' }),
      next: intl.formatMessage({ id: 'home.step.2.next' }),
      action: { btn: intl.formatMessage({ id: 'home.step.2.btn' }), action: index => { setStep(index + 1); } }
    }, {
      message: intl.formatMessage({ id: 'home.step.3' }),
      next: intl.formatMessage({ id: 'home.step.3.next' }),
      action: { btn: intl.formatMessage({ id: 'home.step.3.btn' }), action: index => { setStep(index + 1); } }
    }, {
      message: intl.formatMessage({ id: 'home.step.4' }),
      next: intl.formatMessage({ id: 'home.step.4.next' }),
      action: { btn: intl.formatMessage({ id: 'home.step.4.btn' }), action: index => { setStep(index + 1); } }
    }, {
      message: intl.formatMessage({ id: 'home.step.5' }),
      next: intl.formatMessage({ id: 'home.step.5.next' }),
      action: { btn: intl.formatMessage({ id: 'home.step.5.btn' }), action: index => { setStep(index + 1); } }
    }, {
      message: intl.formatMessage({ id: 'home.step.6' }),
      next: intl.formatMessage({ id: 'home.step.6.next' }),
      action: { btn: intl.formatMessage({ id: 'home.step.6.btn' }), action: index => { setStep(index + 1); } }
    }, {
      message: intl.formatMessage({ id: 'home.step.7' }),
      next: intl.formatMessage({ id: 'home.step.7.next' }),
      action: { btn: intl.formatMessage({ id: 'home.step.7.btn' }), action: index => { setStep(index + 1); } }
    },
  ];

  return (
    <>
      <Box sx={{ display: 'flex', mb: '10px' }}>
        <HomeIcon sx={{ mt: '3px', mr: '5px' }} color="primary" />
        <Typography variant="h6"><FormattedMessage id="home.salut" /></Typography>
      </Box>
      {steps.map((stepItem, index) => (
        <RenderStep
          action={stepItem.action}
          enabled={step >= index}
          next={stepItem.next}
          message={stepItem.message}
          index={index}
        />
      ))}
    </>
  )
};

export default HomePage;
