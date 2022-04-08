import React, { useCallback, useEffect, useState } from 'react';
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

import { useQuery } from 'react-query';
import { FormattedMessage } from 'react-intl';
import Progress from '../../../components/showData/Progress';
import Loading from '../../../components/loading/Loading';
import { dateHandler, isEmpty } from '../../../utils/generalFunctions';
import RenderTaskDetailsTabs from './RenderTaskDetailsTabs';
import RenderChip from '../../../components/showData/RenderChip';
import { getTask } from '../../../api/tasks';
import CustomizedSnackbar from '../../../components/alert/CustomizedSnackbar';

const fontWeight = { fontWeight: 'bold' };
const displayFlex = { display: 'flex' };

const RenderTaskDetails = ({ data, goBack }) => {
  const [errorMessage, setMessage] = useState(null);
  const { row } = data;

  const { isLoading, error, data: task } = useQuery('task', () => getTask(row.id));

  const handleCloseMessage = useCallback(() => {
    setMessage(null);
  }, []);

  useEffect(() => {
    if (error) {
      setMessage({ message: `Error: ${error.message}` });
    }
  }, [error]);

  return (
    <>
      {isLoading && <Loading />}
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
        {!isLoading && !isEmpty(task?.data) ? <RenderTaskDetailsTabs task={task?.data} /> : (
          <Typography>
            <FormattedMessage id={!task?.data ? "common.please.wait" : "common.no.data" } />
          </Typography>
        )}
      </Paper>
      {errorMessage && (
        <CustomizedSnackbar message={errorMessage.message} open onClose={handleCloseMessage} />
      )}
    </>
  );
};

RenderTaskDetails.propTypes = {
  goBack: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default RenderTaskDetails;
