import React from "react";
import Typography from "@mui/material/Typography";
import { Helmet } from 'react-helmet';
import { name, description } from '../../config/projectConfig';
import { FormattedMessage, useIntl } from 'react-intl';

const Home = () => {
  const intl = useIntl();
  const title = `${name} - ${intl.formatMessage({ id: 'example' })}`;
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={name} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Typography variant="h5"><FormattedMessage id="example.text" /></Typography>
      <Typography><FormattedMessage id="example.text1" /></Typography>
    </>
  );
}

export default Home;