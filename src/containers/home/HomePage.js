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
      message: <FormattedMessage
        id="home.step.1"
        defaultMessage='Install the \"edge_integration_core\" under \"Available integrations\" menu as well as the additional channels you would like to integrate with.' />,
      next: <FormattedMessage
        id="home.step.1.next"
        defaultMessage='Click on the \"Install avalilable integrations\" button to access all available integrations. Install integrations that you require to complete this step.' />,
      btn: <FormattedMessage
        id="home.step.1.btn"
        defaultMessage="Install available integrations" />
    }, {
      message: <FormattedMessage
        id="home.step.2"
        defaultMessage="Complete the integration and authorization prcoess for all your installed integrations." />,
      next: <FormattedMessage
        id="home.step.2.next"
        defaultMessage='Click on the \"Connected integration\" button to access the installed integration and complete the connection.' />,
      btn: <FormattedMessage
        id="home.step.2.btn"
        defaultMessage="Connect integrations" />
    }, {
      message: <FormattedMessage
        id="home.step.3"
        defaultMessage="Select any subscription plan to unlock the full functionality of Ebanux! We offer different plans to cater to all business." />,
      next: <FormattedMessage
        id="home.step.3.next"
        defaultMessage='Click on the \"Get subscription\" button to access the subscription page to select a suitable plan.' />,
      btn: <FormattedMessage
        id="home.step.3.btn"
        defaultMessage="Get subscription" />
    }, {
      message: <FormattedMessage
        id="home.step.4"
        defaultMessage="Configure your integration workflows such as importing orders, products & inventory sync. You can select pre-made workflows or customise them to your business needs." />,
      next: <FormattedMessage
        id="home.step.4.next"
        defaultMessage='Click on the \"Create workflows\" button to configure all the necessary integration workflows.' />,
      btn: <FormattedMessage
        id="home.step.4.btn"
        defaultMessage="Create workflows" />
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
        <Typography variant="h6">
          <FormattedMessage id="home.salut" defaultMessage="Hi! Let's setup Ebanux app!" />
        </Typography>
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
