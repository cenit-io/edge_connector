import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/Tooltip';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

import { getTask } from '../../api/tasks';
import CustomizedSnackbar from '../alert/CustomizedSnackbar';

const TaskWatcher = ({ tasks, onCheckStatus, onClose }) => {

  const [isChecking, setIschecking] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleCheck = async (id) => {
    setIschecking(true);
    try {
      const { data } = await getTask(id);
      if (data) onCheckStatus(data)
    } catch (error) {
      setError(error);
    }
    setIschecking(false);
  }

  const getActions = (t) => (
    <>
      {!isChecking ? (
        <Tooltip title="Check status">
          <IconButton
            aria-label="retry"
            color="secondary"
            size="small"
            onClick={() =>
              handleCheck(t.id)}
          >
            <AutorenewIcon />
          </IconButton>
        </Tooltip>
      ) : '...'}
      <Tooltip title="Close">
        <IconButton
          aria-label="close"
          color="secondary"
          size="small"
          sx={{ marginLeft: '2px' }}
          onClick={() => onClose(t.id)}
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <>
      <Stack spacing={2} sx={{ maxWidth: 700 }}>
        {tasks.map((t) =>
          <Snackbar
            key={t.id}
            open
            message={`${t.status?.toUpperCase()}: ${t.description}`}
            action={getActions(t)}
          />
        )}
      </Stack>
      <CustomizedSnackbar
        open={error || false}
        severity="error"
        onClose={() => setError('')}
        message={error?.message}
        autoHideDuration={null}
      />
    </>
  )
};

export default TaskWatcher;

TaskWatcher.propTypes = {
  tasks: PropTypes.array,
  onCheckStatus: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

TaskWatcher.defaultProps = {
  tasks: []
};
