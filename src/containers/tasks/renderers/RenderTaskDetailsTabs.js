import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FormattedMessage } from 'react-intl';
import RenderTabExecutions from './tabs/RenderTabExecutions';
import RenderTabScheduler from './tabs/RenderTabScheduler';
import RenderTabNotifications from './tabs/RenderTabsNotifications';

const RenderTaskDetailsTabs = ({ data }) => {

  const [selected, setSelected] = useState(0);

  const handleChange = (_, newValue) => {
    setSelected(newValue);
  };

  return (
    <>
      <Tabs value={selected} onChange={handleChange} aria-label="tabs">
        <Tab label={<FormattedMessage id="tasks.executions" />} />
        <Tab label={<FormattedMessage id="tasks.scheduler" />} />
        <Tab label={<FormattedMessage id="tasks.notifications" />} />
      </Tabs>
      <Box sx={{ width: 'calc(100% - 4px)', ml: '2px', mt: '-6px', border: theme => `solid 1px ${theme.palette.primary.main}`, p: 2 }}>
        {selected === 0 && <RenderTabExecutions data={data} />}
        {selected === 1 && <RenderTabScheduler data={data} />}
        {selected === 2 && <RenderTabNotifications data={data} />}
      </Box>
    </>
  );
}

RenderTaskDetailsTabs.propTypes = {
  data: PropTypes.object.isRequired
};

export default RenderTaskDetailsTabs;
