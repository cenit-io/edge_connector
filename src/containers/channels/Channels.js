import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery, useMutation } from 'react-query';

import IntegrationCard from '../../components/card/IntegrationCard';
import Loading from '../../components/loading/Loading';
import CustomizedSnackbar from '../../components/alert/CustomizedSnackbar';

import { authorize, createIntegration, getChannels } from '../../api/integrations';
import AddIntegration from './AddIntegration';
import PageHeader from '../../components/common/PageHeader';

function Channels() {
  const intl = useIntl();
  const navigate = useNavigate();

  const title = intl.formatMessage({ id: 'title.channels' });
  const [alert, setAlert] = useState({
    open: false,
    message: ''
  });
  const [channel, setChannel] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const { isLoading, error, data } = useQuery('channels', async () => getChannels());

  useEffect(() => {
    if (error) {
      setAlert({
        open: true,
        message: `Error: ${error.message}`
      });
    }
  }, [error]);

  const action = useCallback(payload => {
    setChannel(payload.value);
  }, []);

  const handleCloseMessage = useCallback(() => {
    setAlert({
      open: false,
      message: ''
    });
  }, []);

  const handleAccept = useMutation(({ name }) => createIntegration({ name, channel: channel.name }), {
    onMutate: () => {
      setLoadingState(true);
    },
    onSuccess: (res, params) => {
      setAlert({
        open: true,
        message: 'Integration created successfuly',
        severity: 'success'
      })
      if (params.authorized) {
        authorize(res.data.id)
      } else navigate('/integrations/connected-integrations');
    },
    onError: (err) => {
      setAlert({
        open: true,
        message: err.message,
        autoHideDuration: null
      });
    },
    onSettled: () => {
      setLoadingState(false)
    },
});

  return (
    <>
      {isLoading && <Loading />}
      <PageHeader title={title} />
      {data && (
        <Grid container spacing={2}>
          {data.data.map(x => (
            <Grid key={x.name} item xs={12} sm={6} md={3}>
              <IntegrationCard itemData={x} type="channel" onDispatchAction={action} />
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
      {channel && (
        <AddIntegration
          handleAccept={handleAccept.mutate}
          handleClose={() => { setChannel(null); }}
          data={channel}
          loadingOnSubmit={loadingState}
        />
      )}
    </>
  );
}

export default Channels;
