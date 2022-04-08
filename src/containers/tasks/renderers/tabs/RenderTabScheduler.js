import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { FormattedMessage } from 'react-intl';
import { capitalize } from '@mui/material';

import RenderChip from '../../../../components/showData/RenderChip';
import { dateHandler, isEmpty } from '../../../../utils/generalFunctions';
import TimeLineButtons from '../../../../components/showData/TimeLineButtons';

const daysOfWeekData = {
  top: 'Days of week',
  data: [
    { value: 'Mon', label: 'Mon' },
    { value: 'Tue', label: 'Tue' },
    { value: 'Wed', label: 'Wed' },
    { value: 'Thu', label: 'Thu' },
    { value: 'Fri', label: 'Fri' },
    { value: 'Sat', label: 'Sat' },
    { value: 'Sun', label: 'Sun' }
  ]
}

const weeksOfMontData = {
  top: 'Weeks of month',
  data: [
    { value: 'First', label: 'First' },
    { value: 'Second', label: 'Second' },
    { value: 'Third', label: 'Third' },
    { value: 'Fourth', label: 'Fourth' },
    { value: 'Last', label: 'Last' }
  ]
};

const monthsOfYearData = {
  top: 'Months of year',
  data: [
    { value: 'Jan', label: 'Jan' },
    { value: 'Feb', label: 'Feb' },
    { value: 'Mar', label: 'Mar' },
    { value: 'Apr', label: 'Apr' },
    { value: 'May', label: 'May' },
    { value: 'Jun', label: 'Jun' },
    { value: 'Jul', label: 'Jul' },
    { value: 'Aug', label: 'Aug' },
    { value: 'Sep', label: 'Sep' },
    { value: 'Oct', label: 'Oct' },
    { value: 'Nov', label: 'Nov' },
    { value: 'Dec', label: 'Dec' }
  ]
}

const RenderTabScheduler = ({ data }) => {
  if (isEmpty(data)) {
    return (
      <Typography><FormattedMessage id="common.no.data" /></Typography>
    );
  }

  if (typeof data === 'string') {
    return <Typography>{capitalize(data)}</Typography>
  }

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
          sx={{ mt: '10px' }}
          data={daysOfWeekData.data}
          topMessage={daysOfWeekData.top}
          selected={data.days_of_week}
        />
        <TimeLineButtons
          sx={{ mt: '10px' }}
          data={weeksOfMontData.data}
          topMessage={weeksOfMontData.top}
          selected={data.weeks_of_month}
        />
        <TimeLineButtons
          sx={{ mt: '10px' }}
          data={monthsOfYearData.data}
          topMessage={monthsOfYearData.top}
          selected={data.months_of_year}
        />
      </Stack>
    </>
  );
}

RenderTabScheduler.defaltProps = {
  data: undefined
};

RenderTabScheduler.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      active: PropTypes.bool,
      start_date: PropTypes.string,
      end_date: PropTypes.string,
      time: PropTypes.string,
      days_of_week: PropTypes.arrayOf(PropTypes.string),
      weeks_of_month: PropTypes.arrayOf(PropTypes.string),
      months_of_year: PropTypes.arrayOf(PropTypes.string)
    })
  ])
};

export default RenderTabScheduler;
