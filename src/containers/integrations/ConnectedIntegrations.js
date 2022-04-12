import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import IntegrationCard from '../../components/card/IntegrationCard';
import Loading from '../../components/loading/Loading';
import CustomizedSnackbar from '../../components/alert/CustomizedSnackbar';
import PageHeader from '../../components/common/PageHeader';
import { authorize, getConnectedIntegrations, unauthorize } from '../../api/integrations';
import { getIntegrationCardOptions } from './helpers';

function ConnectedIntegrations() {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'title.connected.integrations' });
  const queryClient = useQueryClient();

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

  const action = useCallback(({ action, value }) => {
    switch (action) {
      case 'authorize':
        handleAuthorize(value.id);
        break;
      case 'unauthorize':
        handleUnauthorize.mutate(value.id);
        break;
      default:
        break;
    }
  });

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
    </>
  );
}

export default ConnectedIntegrations;
