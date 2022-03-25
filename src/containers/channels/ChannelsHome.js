import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { description, name } from '../../config/projectConfig';
import Channels from './Channels';

const ChannelsHome = () => {
  const intl = useIntl();

  const title = `${name} - ${intl.formatMessage({ id: 'components.layout.sidebar.mainMenu.channels' })}`;
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
      <Channels />
    </>
  );
}

export default ChannelsHome;
