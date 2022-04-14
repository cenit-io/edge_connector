import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

import { useNavigate } from 'react-router-dom';

import RenderStep from './RenderStep';


const Home = () => {
  const navigate = useNavigate();

  const steps = [
    {
      message: <FormattedMessage
        defaultMessage={"Install the \"edge_integration_core\" under \"Available integrations\" menu as well as the additional channels you would like to integrate with."}
        id="home.step.1" />,
      next: <FormattedMessage
        defaultMessage={"Click on the \"Install avalilable integrations\" button to access all available integrations. Install integrations that you require to complete this step."}
        id="home.step.1.next" />,
      btn: <FormattedMessage defaultMessage="Install available integrations" id="home.step.1.btn" />
    }, {
      message: <FormattedMessage
        defaultMessage="Complete the integration and authorization prcoess for all your installed integrations."
        id="home.step.2" />,
      next: <FormattedMessage
        defaultMessage={"Click on the \"Connected integration\" button to access the installed integration and complete the connection."}
        id="home.step.2.next" />,
      btn: <FormattedMessage defaultMessage="Connect integrations" id="home.step.2.btn" />
    }, {
      message: <FormattedMessage
        defaultMessage="Select any subscription plan to unlock the full functionality of Ebanux! We offer different plans to cater to all business."
        id="home.step.3" />,
      next: <FormattedMessage
        defaultMessage={"Click on the \"Get subscription\" button to access the subscription page to select a suitable plan."}
        id="home.step.3.next" />,
      btn: <FormattedMessage defaultMessage="Get subscription" id="home.step.3.btn" />
    }, {
      message: <FormattedMessage
        defaultMessage="Configure your integration workflows such as importing orders, products & inventory sync. You can select pre-made workflows or customise them to your business needs."
        id="home.step.4" />,
      next: <FormattedMessage
        defaultMessage={"Click on the \"Create workflows\" button to configure all the necessary integration workflows."}
        id="home.step.4.next" />,
      btn: <FormattedMessage defaultMessage="Create workflows" id="home.step.4.btn" />
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
      <PageHeader title="Home" />
      <Box sx={{ display: 'flex', mb: 2 }}>
        <HomeIcon sx={{ mt: '3px', mr: '5px' }} color="primary" />
        <Typography variant="h6"><FormattedMessage defaultMessage="Hi! Let's setup Ebanux app!" id="home.salut" /></Typography>
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

export default Home;
