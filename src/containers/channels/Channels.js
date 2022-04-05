import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';

import IntegrationCard from '../../components/card/IntegrationCard';
import Loading from '../../components/loading/Loading';
import CustomizedSnackbar from '../../components/alert/CustomizedSnackbar';

import { getChannels } from '../../api/integrations';
import AddChannel from './AddChannel';
import PageHeader from '../../components/common/PageHeader';

function Channels() {
  const intl = useIntl();

  const title = intl.formatMessage({ id: 'title.channels' });
  const [message, setMessage] = useState(null);
  const [addChannel, setAddChannel] = useState(null);
  const { isLoading, error, data } = useQuery('channels', async () => getChannels());

  useEffect(() => {
    if (error) {
      setMessage({ message: `Error: ${error.message}` });
    }
  }, [error]);

  const action = useCallback(payload => {
    setAddChannel(payload.value);
  }, []);

  const handleCloseMessage = useCallback(() => {
    setMessage(null);
  }, []);

  const handleAccept = useCallback(payload => {
    console.log(payload);
    handleCloseMessage();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <PageHeader title={title} />
      {data && (
        <Grid container spacing={2}>
          {data.data.map(x => (
            <Grid item xs={12} sm={6} md={3}>
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
      {message && (
        <CustomizedSnackbar message={message.message} open onClose={handleCloseMessage} />
      )}
      {addChannel && (
        <AddChannel
          handleAccept={handleAccept}
          handleClose={() => { setAddChannel(null); }}
          data={addChannel}
        />
      )}
    </>
  );
}

export default Channels;
