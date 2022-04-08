import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ALL } from '../../config/constants';

const TimeLineButtons = ({
  data, handleSelect, selected, topMessage, editable, ...other
}) => {
  const handleSelection = payload => () => {
    if (editable && handleSelect) {
      handleSelect(payload)
    }
  }
  return (
    <Box {...other}>
      {topMessage && <Typography sx={{ fontWeight: 'bold', mb: '5px' }}>{topMessage}</Typography>}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
        {data.map(x => (
          <Button
            size="small"
            variant={x.value !== ALL && selected.includes(x.value) ? 'contained' : 'outlined'}
            onClick={handleSelection(x.value)}>{x.label}</Button>
        ))}
      </Stack>
    </Box>
  )
};

TimeLineButtons.defaultProps = {
  selected: [],
  topMessage: undefined,
  handleSelect: undefined,
  editable: false
};

TimeLineButtons.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string),
  topMessage: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string.isRequired, label: PropTypes.string.isRequired })
  ).isRequired,
  handleSelect: PropTypes.func,
  editable: PropTypes.bool
};

export default TimeLineButtons;
