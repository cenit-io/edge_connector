import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/Tooltip';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';

import { getTask } from '../../api/tasks';
import CustomizedSnackbar from '../alert/CustomizedSnackbar';

const TaskWatcher = ({ tasks, onCheckStatus, onClose }) => {

  const [isChecking, setIschecking] = React.useState(false);
  const [selected, setSelected] = React.useState();
  const [error, setError] = React.useState('');

  const handleCheck = async (id) => {
    setIschecking(true);
    setSelected(id);
    try {
      const { data } = await getTask(id);
      if (data) onCheckStatus(data)
    } catch (error) {
      setError(error);
    }
    setIschecking(false);
    setSelected(null);
  }

  const getActions = (t) => (
    <>
      {isChecking && selected === t.id ? (
        '...'
      ) : (
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
      )}
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
      <Stack spacing={2} sx={{ maxWidth: 700, padding: '5px', position: 'fixed', bottom: 0, right: 1 }}>
        {tasks.map((t) =>
          <SnackbarContent message={`${t.status?.toUpperCase()}: ${t.description}`} action={getActions(t)} />
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
