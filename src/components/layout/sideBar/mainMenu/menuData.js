import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import TranslateIcon from "@mui/icons-material/Translate";

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
    key: '/item',
    label: `${intl.formatMessage({ id: 'item' })} 1`,
    icon: <InboxIcon />,
    children: [
      {
        key: '/item/subitem',
        label: 'SubItem',
        icon: <MailIcon />,
        link: '/item/subitem'
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