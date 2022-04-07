import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { FormattedMessage } from 'react-intl';

import RenderChip from '../../../../components/showData/RenderChip';
import { dateHandler } from '../../../../utils/generalFunctions';
import TimeLineButtons from '../../../../components/showData/TimeLineButtons';
import { ALL } from '../../../../config/constants';

const timelineData = {
  top: 'Timeline in the day',
  data: [
    { value: '15m', label: 'Every 15 mins' },
    { value: '30m', label: 'Every 30 mins' },
    { value: '1h', label: 'Every hour' },
    { value: '3h', label: 'Every 3 hours' },
    { value: '6h', label: 'Every 6 hours' },
    { value: '12h', label: 'Every 12 hours' }
  ]
}

const daysOfWeekData = {
  top: 'Days of week',
  data: [
    { value: 'mon', label: 'MON' },
    { value: 'tue', label: 'TUE' },
    { value: 'wed', label: 'WED' },
    { value: 'thu', label: 'THU' },
    { value: 'fri', label: 'FRI' },
    { value: 'sat', label: 'SAT' },
    { value: 'sun', label: 'SUN' },
    { value: ALL, label: 'EVERYDAY' },
  ]
}

const RenderTabScheduler = ({ data }) => {
  const [timeline, setTimeline] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState([]);

  const handleTimeLine = useCallback(payload => {
    setTimeline(payload === timeline[0] ? [] : [payload]);
  }, [timeline]);

  const handleDayOfWeek = useCallback(payload => {
    let selection = [...dayOfWeek];
    if (payload === ALL) {
      if (selection.length !== (daysOfWeekData.data.length - 1)) {
        selection = daysOfWeekData.data.reduce((acc, x) => {
          if (x.value !== ALL) {
            acc.push(x.value);
          }
          return acc;
        }, []);
      } else {
        selection = [];
      }
    } else {
      if (selection.includes(payload)) {
        const index = selection.indexOf(payload);
        selection.splice(index, 1);
      } else {
        selection.push(payload);
      }
    }
    setDayOfWeek(selection);
  }, [dayOfWeek]);

  return (
    <>
      <Stack spacing={2}>
        <RenderChip status={data.status} />
        <Stack spacing={2}>
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
                <FormattedMessage id="tasks.time" />:
              </Typography>
              <Typography sx={{ ml: '10px' }}>
                {dateHandler(data.created_at)}
              </Typography>
            </Box>
          </Stack>
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
      <Divider sx={{ m: '10px 0' }} />
      <Stack spacing={2}>
        <TimeLineButtons
          data={timelineData.data}
          topMessage={timelineData.top}
          handleSelect={handleTimeLine}
          selected={timeline}
        />
        <TimeLineButtons
          sx={{ mt: '10px' }}
          data={daysOfWeekData.data}
          topMessage={daysOfWeekData.top}
          selected={dayOfWeek}
          handleSelect={handleDayOfWeek}
        />
      </Stack>
    </>
  );
}

RenderTabScheduler.propTypes = {
  data: PropTypes.object.isRequired
};

export default RenderTabScheduler;
