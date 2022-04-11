import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery, useQueryClient } from 'react-query';

import Loading from '../../components/loading/Loading';
import CustomizedSnackbar from '../../components/alert/CustomizedSnackbar';
import {
  getAvailableIntegrations, installAvailableIntegration, uninstallAvailableIntegration
} from '../../api/integrations';
import PageHeader from '../../components/common/PageHeader';
import IntegrationCard from '../../components/card/IntegrationCard';
import TaskWatcher from '../../components/tasks/TaskWatcher';

export default function AvailableIntegrationList() {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'title.available.integrations' });
  const [backgroundTasks, setBackgroundTasks] = React.useState([]);
  const [loadingOnRequest, setLoadingOnRequest] = React.useState(false);

  const queryClient = useQueryClient();

  const [alert, setAlert] = React.useState({
    open: false,
    severity: 'info',
    message: '',
    autoHideDuration: 6000
  });

  const { data: integrations, error, isLoading } = useQuery('available-integrations', async () => getAvailableIntegrations());

  useEffect(() => {
    if (error) {
      setAlert({
        open: true,
        severity: 'error',
        message: `Error: ${error.message}`,
        autoHideDuration: null
      });
    }
  }, [error]);

  const handleInstall = async (id) => {
    setLoadingOnRequest(true);
    const { data, error } = await installAvailableIntegration(id);
    if (error) {
      setAlert({
        open: true,
        message: `Error: ${error}`,
        autoHideDuration: null
      });
    } else setBackgroundTasks([...backgroundTasks, data]);
    setLoadingOnRequest(false);
  };

  const handleUninstall = async (id) => {
    setLoadingOnRequest(true);
    const { data, error } = await uninstallAvailableIntegration(id);
    if (error) {
      setAlert({
        open: true,
        severity: 'error',
        message: `Error: ${error}`,
        autoHideDuration: null
      });
    } else setBackgroundTasks([...backgroundTasks, data]);
    setLoadingOnRequest(false);
  };

  const handleOnCheckTask = (d) => {
    if (d) {
      const currentTasks = [...backgroundTasks];
      const found = currentTasks.findIndex(t => t.id === d.id);
      if (found !== -1) {
        currentTasks[found] = d;
        setBackgroundTasks(currentTasks);
      }
      queryClient.invalidateQueries('available-integrations')
    }
  };

  const handleOnCloseTask = (id) => {
    const filter = backgroundTasks.filter(t => t.id !== id);
    setBackgroundTasks(filter)
  };


  const handleAction = (payload) => {
    const { action, value } = payload;
    if (action === 'install') {
      handleInstall(value.id)
    } else handleUninstall(value.id)
  };

  const handleCloseMsg = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <>
      {isLoading || loadingOnRequest ? <Loading /> : null}
      <PageHeader title={title} />
      {integrations && (
        <Grid container spacing={2}>
          {integrations.data.map(x => (
            <Grid key={x.id} item xs={12} sm={6} md={3}>
              <IntegrationCard type="available" itemData={x} onDispatchAction={handleAction} />
            </Grid>
          ))}
        </Grid>
      )}
      {!integrations?.data?.length && (
        <Typography>
          <FormattedMessage id={isLoading ? "common.please.wait" : "common.no.data"} />
        </Typography>
      )}
      <CustomizedSnackbar open={alert.open} message={alert.message} autoHideDuration={alert.autoHideDuration} onClose={handleCloseMsg} />
      <TaskWatcher onCheckStatus={handleOnCheckTask} onClose={handleOnCloseTask} tasks={backgroundTasks} />
    </>

  )
}