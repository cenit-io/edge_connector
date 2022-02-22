import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const menuData = [
  {
    key: '/',
    label: 'Home',
    icon: <HomeIcon />,
    link: '/'
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