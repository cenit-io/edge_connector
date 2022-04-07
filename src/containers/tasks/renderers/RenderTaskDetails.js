import React from 'react';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { FormattedMessage } from 'react-intl';
import Progress from '../../../components/showData/Progress';
import { dateHandler } from '../../../utils/generalFunctions';
import RenderTaskDetailsTabs from './RenderTaskDetailsTabs';
import RenderChip from '../../../components/showData/RenderChip';

const fontWeight = { fontWeight: 'bold' };
const displayFlex = { display: 'flex' };

const RenderTaskDetails = ({ data, goBack }) => {
  const { row } = data;

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button size="small" onClick={goBack} variant="contained">
          <ArrowBackIcon fontSize="small" />
          <FormattedMessage id="actions.back" />
        </Button>
        <Box>
          <IconButton size="small">
            <PlayArrowIcon color="primary" fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <DeleteOutlineOutlinedIcon color="error" fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Paper elevation={2} sx={{ p: 2, mt: '10px' }}>
        <Typography sx={fontWeight}>
          {row.description || <FormattedMessage id="common.no.data" />}
        </Typography>
        <Divider sx={{ m: '10px 0' }} />
        <Grid container spacing={2} sx={{
          width: '80%',
          '@media (max-width: 600px)': {
            width: '100%'
          }
        }}>
          <Grid item xs={12} sm={6} sx={displayFlex}>
            <Typography sx={fontWeight}><FormattedMessage id="common.progress" />:</Typography>
            <Progress value={row.progress} sx={{ ml: '10px', width: 'calc(100% - 100px)' }} />
          </Grid>
          <Grid item xs={12} sm={6} sx={displayFlex}>
            <Typography sx={fontWeight}><FormattedMessage id="common.status" />:</Typography>
            <RenderChip status={row.status} styles={{ ml: '10px' }} />
          </Grid>
          <Grid item xs={12} sm={6} sx={displayFlex}>
            <Typography sx={fontWeight}><FormattedMessage id="common.created.at" />:</Typography>
            <Typography sx={{ ml: '10px' }}>{dateHandler(row.created_at)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={displayFlex}>
            <Typography sx={fontWeight}><FormattedMessage id="common.updated.at" />:</Typography>
            <Typography sx={{ ml: '10px' }}>{dateHandler(row.updated_at)}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={2} sx={{ p: 2, mt: '5px' }}>
        <RenderTaskDetailsTabs data={row} />
      </Paper>
    </>
  );
};

RenderTaskDetails.propTypes = {
  goBack: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default RenderTaskDetails;
