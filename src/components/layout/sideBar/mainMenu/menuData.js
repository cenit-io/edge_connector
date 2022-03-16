import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TranslateIcon from '@mui/icons-material/Translate';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

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
        key: '/available-integrations',
        label: intl.formatMessage({ id: 'components.layout.sidebar.mainMenu.availableIntegrations' }),
        icon: <MailIcon />,
        link: '/available-integrations'
      },
      {
        key: '/connected-integrations',
        label: intl.formatMessage({ id: 'components.layout.sidebar.mainMenu.connectedIntegrations' }),
        icon: <MailIcon />,
        link: '/connected-integrations'
      },
      {
        key: '/channels',
        label: intl.formatMessage({ id: 'components.layout.sidebar.mainMenu.channels' }),
        icon: <MailIcon />,
        link: '/channels'
      }
    ]
  },
  {
    key: '/item2',
    label: `${intl.formatMessage({ id: 'item' })} 2`,
    icon: <InboxIcon />,
    children: [
      {
        key: '/item2/subitem2',
        label: 'SubItem2',
        icon: <MailIcon />,
        link: '/item2/subitem2'
      }
    ]
  }
];

export default getMenuData;