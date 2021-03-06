import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NavLink, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';

import getMenuData from './menuData';

const MainMenu = ({dense}) => {
  const [expand, setExpand] = useState('');
  const [selected, setSelected] = useState('');
  const intl = useIntl();

  const handleExpand = value => () => {
    setExpand(value === expand ? '' : value);
  };

  const handleSelected = value => () => {
    setSelected(value);
  }

  const getImage = useCallback(src => {
    if (typeof src === 'string') {
      <ListItemAvatar>
        <Avatar
          alt={src}
          src={src}
          variant="rounded"
          sx={{ mt: '-7px', mr: '-20px', height: '24px', width: '24px' }}
        />
      </ListItemAvatar>
    }
    return (
      <ListItemIcon sx={{ mt: '-7px', mr: '-20px' }}>
        <Icon>{src}</Icon>
      </ListItemIcon>
    );
  }, []);

  const handlePadding = useCallback(level => ({ pl: theme => `calc(calc(${level} * ${theme.spacing(4)}) + ${theme.spacing(3)})` }), []);

  const renderItem = useCallback((item, level) => {
    const { key } = item;
    return (
      <NavLink to={item.link} style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleSelected(key)}>
        <ListItem
          selected={key === selected}
          button
          key={key}
          sx={handlePadding(level)}
        >
          {item.icon && getImage(item.icon)}
          <ListItemText primary={item.label} />
        </ListItem>
      </NavLink>
    )
  }, [selected]);

  const renderParent = useCallback((item, level) => {
    const { key } = item;
    const open = key === expand.split('/').slice(0, level + 2).join('/');
    
    return (
      <>
        <ListItem button onClick={handleExpand(key)} sx={handlePadding(level)} key={key}>
          {item.icon && getImage(item.icon)}
          <ListItemText primary={item.label} />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense={dense}>
            {item.children.map(child => {
              if (!child.children) {
                return renderItem(child, level + 1);
              }
              return renderParent(child, level + 1);
            })}
          </List>
        </Collapse>
      </>
    );
  }, [expand, selected]);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname) {
      if (pathname.split('/').length > 1) {
        setExpand(pathname.slice(0, pathname.lastIndexOf('/')));
      }
      setSelected(pathname);
    }
  }, [pathname]);

  const menuData = getMenuData(intl);

  return (
    <List dense={dense}>
      {menuData.map(item => {
        if (item.divider) {
          return <Divider />
        } else if (item.children) {
          return renderParent(item, 0);
        }
        return renderItem(item, 0);
      })}
    </List>
  );
}

MainMenu.defaultProps = {
  dense: true
};

MainMenu.propTypes = {
  dense: PropTypes.bool
};

export default MainMenu;
