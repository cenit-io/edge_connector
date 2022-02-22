/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import menuData from "./menuData";

const MainMenu = () => {
  const [expand, setExpand] = useState('');
  const [selected, setSelected] = useState('');

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
          sx={{ mt: '-7px', mr: '-20px', h: '24px', w: '24px' }}
        />
      </ListItemAvatar>
    }
    return (
      <ListItemIcon sx={{ mt: '-7px', mr: '-20px' }}>
        <Icon>{src}</Icon>
      </ListItemIcon>
    );
  }, []);

  const handlePadding = useCallback(level => ({ pl: `${(level * 20 + 16)}px` }), []);

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
          <List component="div" disablePadding>
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

  console.log(expand, selected);

  useEffect(() => {
    if (pathname) {
      if (pathname.split('/').length > 1) {
        setExpand(pathname.slice(0, pathname.lastIndexOf('/')));
      }
      setSelected(pathname);
    }
  }, []);

  return (
    <List>
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

export default MainMenu;
