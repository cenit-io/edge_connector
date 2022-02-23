import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import TranslateIcon from "@mui/icons-material/Translate";

const menuData = [
  {
    key: '/',
    label: 'Home',
    icon: <HomeIcon />,
    link: '/'
  },
  {
    key: '/example',
    label: 'Example',
    icon: <TranslateIcon />,
    link: '/example'
  },
  {
    divider: true
  },
  {
    key: '/item',
    label: 'Item',
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
    label: 'Item2',
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

export default menuData;