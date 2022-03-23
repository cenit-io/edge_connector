import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import data from './staticData';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';

import ChannelsCard from '../../components/common/channelsCard/ChannelsCard';
import Loading from '../../components/loading/Loading';
import CustomizedSnackbar from '../../components/alert/CustomizedSnackbar';

import { getChannels } from '../../api/integrations';

function Channels() {
  const [message, setMessage] = useState(null);
  const { isLoading, error, data } = useQuery('channels', async () => getChannels());

  useEffect(() => {
    if (error) {
      setMessage({ message: `Error: ${error.message}`, severity: 'error' });
    }
  }, [error]);

  const action = useCallback(payload => {
    console.log(payload);
  }, []);

  const handleCloseMessage = useCallback(() => {
    setMessage(null);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Typography><FormattedMessage id="components.layout.sidebar.mainMenu.channels" /></Typography>
      {data && (
        <Grid container spacing={2}>
          {data.map(x => (
            <Grid item xs={12} sm={6} md={3}>
              <ChannelsCard actionFunc={action} itemData={x} />
            </Grid>
          ))}
        </Grid>
      )} 
      <FormattedMessage id={isLoading ? "common.please.wait" : "common.no.data"} />
      {message && (
        <CustomizedSnackbar message={`Error: ${error.message}`} open onClose={handleCloseMessage} />
      )}
    </>
  );
}

export default Channels;
