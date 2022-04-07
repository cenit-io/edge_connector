import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';

import IntegrationCard from '../../components/card/IntegrationCard';
import Loading from '../../components/loading/Loading';
import CustomizedSnackbar from '../../components/alert/CustomizedSnackbar';

import PageHeader from '../../components/common/PageHeader';
import { getConnectedIntegrations } from '../../api/integrations';

function ConnectedIntegrations() {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'title.connected.integrations' });
  const [message, setMessage] = useState(null);
  const { isLoading, error, data } = useQuery('connected-integrations', getConnectedIntegrations);

  useEffect(() => {
    if (error) {
      setMessage({ message: `Error: ${error.message}` });
    }
  }, [error]);


  const handleCloseMessage = useCallback(() => {
    setMessage(null);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <PageHeader title={title} />
      {data && (
        <Grid container spacing={2}>
          {data.data.map(x => (
            <Grid key={x.id} item xs={12} sm={6} md={3}>
              <IntegrationCard itemData={x} />
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
    </>
  );
}

export default ConnectedIntegrations;
