import React, { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import ReplayIcon from '@mui/icons-material/Replay';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { FormattedMessage, useIntl } from 'react-intl';

import PageHeader from '../../components/common/PageHeader';
import EnhancedTable from '../../components/Tables/EnhancedTable';
import Loading from '../../components/loading/Loading';
import CustomizedSnackbar from '../../components/alert/CustomizedSnackbar';
import TaskWatcher from '../../components/tasks/TaskWatcher';
import { getTasks, retryTask } from '../../api/tasks';
import RenderTaskDetails from './renderers/RenderTaskDetails';

const getStatusColor = status => {
  switch (status) {
    case 'failed':
      return 'error';
    case 'broken':
      return 'error';
    case 'pending':
      return '';
    case 'completed':
      return 'success';
    default:
      return 'info';
  }
};

export default function TaskList() {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'title.tasks' });
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [loadingOnRequest, setLoadingOnRequest] = React.useState(false);
  const [backgroundTasks, setBackgroundTasks] = React.useState([]);

  const [openDetails, setOpenDetails] = useState(null);

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    severity: 'info',
    message: '',
    autoHideDuration: 6000
  });

  const { data: tasks, error, isLoading } = useQuery(['tasks', page, rowsPerPage], () => getTasks({
    page, rowsPerPage
  }));

  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: `Error: ${error.message}`,
        autoHideDuration: null
      });
    }
  }, [error]);

  const handleOnCheckTask = (d) => {
    if (d) {
      const currentTasks = [...backgroundTasks];
      const found = currentTasks.findIndex(t => t.id === d.id);
      if (found !== -1) {
        currentTasks[found] = d;
        setBackgroundTasks(currentTasks);
      }
      queryClient.invalidateQueries('tasks')
    }
  };

  const handleOnCloseTask = (id) => {
    const filter = backgroundTasks.filter(t => t.id !== id);
    setBackgroundTasks(filter)
  };

  const handleRetryMutation = useMutation(retryTask, {
    onMutate: () => {
      setLoadingOnRequest(true);
    },
    onSuccess: (res) => {
      setBackgroundTasks([...backgroundTasks, res.data])
      queryClient.invalidateQueries('tasks')
    },
    onError: (err) => {
      setSnackbar({
        open: true,
        severity: 'error',
        message: err.message,
        autoHideDuration: null
      });

    },
    onSettled: () => {
      setLoadingOnRequest(false)
    }
  });


  const headCells = [
    {
      id: 'description',
      label: <FormattedMessage id="common.description" />
    },
    {
      id: 'created_at',
      label: <FormattedMessage id="common.created.at" />
    },
    {
      id: 'progress',
      label: <FormattedMessage id="common.progress" />
    },
    {
      id: 'status',
      label: <FormattedMessage id="common.status" />,
      customRenderCell: value => (
        <div>
          <Chip
            size="small"
            color={getStatusColor(value)}
            style={{ width: 10, height: 10, marginRight: 10 }}
          />
          {value}
        </div>)
    },
    {
      id: 'actions',
      label: <FormattedMessage id="common.actions" />,
      customRenderCell: (value, row) => (
        <div>
          <Tooltip title="Retry">
            <IconButton
              aria-label="retry"
              size="small"
              onClick={() => {
                handleRetryMutation.mutate(row.id)
              }}
            >
              <ReplayIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Details">
            <IconButton
              aria-label="details"
              size="small"
              onClick={() => {
                setOpenDetails({ row });
              }}
            >
              <VisibilityOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ];

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  const handleTableChange = (action) => {
    const { type, payload } = action;
    switch (type) {
      case 'SET_PAGE':
        setPage(payload);
        break;
      case 'SET_ROWSPERPAGE':
        setRowsPerPage(payload);
        break;
      default:
        break;
    }
    return null;
  };

    
  const closeDetails = React.useCallback(() => {
    setOpenDetails(null);
  }, []);


  return (
    <div>
      <PageHeader title={title} />
      {isLoading || loadingOnRequest ? <Loading /> : null}
      {!openDetails ? (<>
        <EnhancedTable
          rows={tasks?.data}
          rowCount={tasks?.pagination.total}
          headCells={headCells}
          rowsPerPage={rowsPerPage}
          page={page}
          onChange={handleTableChange}
        />
        <CustomizedSnackbar
          open={snackbar.open}
          severity={snackbar.severity}
          onClose={handleClose}
          message={snackbar.message}
          autoHideDuration={snackbar.autoHideDuration}
        />
      </>) : <RenderTaskDetails data={openDetails} goBack={closeDetails} />}
      <TaskWatcher onCheckStatus={handleOnCheckTask} onClose={handleOnCloseTask} tasks={backgroundTasks} />
    </div>
  )
}