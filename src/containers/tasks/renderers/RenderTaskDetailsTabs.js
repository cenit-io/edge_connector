import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@mui/material';

import RenderChip from '../../../components/showData/RenderChip';
import { dateHandler } from '../../../utils/generalFunctions';

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
        {selected === 0 && (
          <Stack spacing={2}>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontWeight: 'bold' }}>
                <FormattedMessage id="common.status" />:
              </Typography>
              <RenderChip status={data.status} styles={{ ml: '10px' }} />
            </Box>
            <Stack direction="row" spacing={2}>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  <FormattedMessage id="tasks.start.date" />:
                </Typography>
                <Typography sx={{ ml: '10px' }}>
                  {dateHandler(data.created_at)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  <FormattedMessage id="tasks.complete.date" />:
                </Typography>
                <Typography sx={{ ml: '10px' }}>
                  {dateHandler(data.updated_at)}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        )}
        {selected === 1 && 'Second'}
        {selected === 2 && 'Third'}
      </Box>
    </>
  );
}

RenderTaskDetailsTabs.propTypes = {
  data: PropTypes.object.isRequired
};

export default RenderTaskDetailsTabs;
