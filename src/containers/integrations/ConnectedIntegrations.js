import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import IntegrationCard from '../../components/card/IntegrationCard';
import Loading from '../../components/loading/Loading';
import CustomizedSnackbar from '../../components/alert/CustomizedSnackbar';
import PageHeader from '../../components/common/PageHeader';
import { authorize, getConnectedIntegrations, unauthorize, importResource } from '../../api/integrations';
import TaskWatcher from '../../components/tasks/TaskWatcher';
import { getIntegrationCardOptions } from './helpers';

function ConnectedIntegrations() {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'title.connected.integrations' });
  const queryClient = useQueryClient();

  const [backgroundTasks, setBackgroundTasks] = React.useState([]);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    autoHideDuration: null
  });

  const { isLoading, error, data } = useQuery('connected-integrations', getConnectedIntegrations);

  useEffect(() => {
    if (error) {
      setAlert({ open: true, message: error.message, autoHideDuration: null });
    }
  }, [error]);

  const handleCloseMessage = useCallback(() => {
    setAlert({
      message: '',
      open: false
    });
  }, []);

  const handleAuthorize = (id) => authorize(id);

  const handleUnauthorize = useMutation(unauthorize, {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setAlert({
        open: true,
        message: 'Integration unauthorized successfuly',
        severity: 'success'
      })
      queryClient.invalidateQueries('connected-integrations');
    },
    onError: (err) => {
      setAlert({
        open: true,
        message: err.message,
        autoHideDuration: null
      });
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  const handleImportResource = useMutation(importResource, {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (res) => {
      setBackgroundTasks([...backgroundTasks, res.data]);
    },
    onError: (err) => {
      setAlert({
        open: true,
        message: err.message,
        autoHideDuration: null
      });
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  const handleDeleteClick = () => window.alert("Ops! Delete action is not available yet.");

  const action = useCallback(({ action, value }) => {
    switch (action) {
      case 'authorize':
        handleAuthorize(value.id);
        break;
      case 'unauthorize':
        handleUnauthorize.mutate(value.id);
        break;
      case 'import brands':
        handleImportResource.mutate({ id: value.id, resource: 'brands' });
        break;
      case 'import categories':
        handleImportResource.mutate({ id: value.id, resource: 'categories' });
        break;
      case 'import orders':
        handleImportResource.mutate({ id: value.id, resource: 'orders' });
        break;
      case 'import products':
        handleImportResource.mutate({ id: value.id, resource: 'products' });
        break;
      case 'import logistics':
        handleImportResource({ id: value.id, resource: 'logistics' });
        break;
      case 'import stock locations':
        handleImportResource({ id: value.id, resource: 'stock/locations' });
        break;
      case 'delete':
        handleDeleteClick();
        break;
      default:
        break;
    }
  });

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

  return (
    <>
      {isLoading || loading ? <Loading /> : null}
      <PageHeader title={title} />
      {data && (
        <Grid container spacing={2}>
          {data.data.map(x => (
            <Grid key={x.id} item xs={12} sm={6} md={3}>
              <IntegrationCard itemData={x} options={getIntegrationCardOptions(x)} onDispatchAction={action} />
            </Grid>
          ))}
        </Grid>
      )}
      {!data?.data?.length && (
        <Typography>
          <FormattedMessage id={isLoading ? "common.please.wait" : "common.no.data"} />
        </Typography>
      )}
      <CustomizedSnackbar message={alert.message} open={alert.open} autoHideDuration={alert.autoHideDuration} severity={alert.severity} onClose={handleCloseMessage} />
      <TaskWatcher onCheckStatus={handleOnCheckTask} onClose={handleOnCloseTask} tasks={backgroundTasks} />
    </>
  );
}

export default ConnectedIntegrations;
