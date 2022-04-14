import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import TranslateIcon from '@mui/icons-material/Translate';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import CableIcon from '@mui/icons-material/Cable';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import TaskIcon from '@mui/icons-material/Task';

const getMenuData = intl => [
  {
    key: '/',
    label: intl.formatMessage({ id: 'home' }),
    icon: <HomeIcon />,
    link: '/'
  },
  {
    key: '/example',
    label: intl.formatMessage({ id: 'example' }),
    icon: <TranslateIcon />,
    link: '/example'
  },
  {
    divider: true
  },
  {
    key: '/integrations',
    label: intl.formatMessage({ id: 'components.layout.sidebar.mainMenu.integrations' }),
    icon: <AccountTreeIcon />,
    children: [
      {
        key: '/integrations/available-integrations',
        label: intl.formatMessage({ id: 'components.layout.sidebar.mainMenu.availableIntegrations' }),
        icon: <AutoAwesomeMosaicIcon />,
        link: '/integrations/available-integrations'
      },
      {
        key: '/integrations/channels',
        label: intl.formatMessage({ id: 'components.layout.sidebar.mainMenu.channels' }),
        icon: <MultipleStopIcon />,
        link: '/integrations/channels'
      },
      {
        key: '/integrations/connected-integrations',
        label: intl.formatMessage({ id: 'components.layout.sidebar.mainMenu.connectedIntegrations' }),
        icon: <CableIcon />,
        link: '/integrations/connected-integrations'
      }
    ]
  },
  {
    key: '/tasks',
    label: intl.formatMessage({ id: 'components.layout.sidebar.mainMenu.tasks' }),
    icon: <TaskIcon />,
    link: '/tasks'
  }
];

export default getMenuData;