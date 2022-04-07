import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { FormattedMessage } from 'react-intl';

import RenderChip from '../../../../components/showData/RenderChip';
import { dateHandler } from '../../../../utils/generalFunctions';

const RenderTabExecutions = ({ data }) => (
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
);

RenderTabExecutions.propTypes = {
  data: PropTypes.object.isRequired
};

export default RenderTabExecutions;
