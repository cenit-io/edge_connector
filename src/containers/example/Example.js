import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { name, description } from '../../config/projectConfig';
import Content from '../content/Content';

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
      <Content />
    </>
  );
}

export default Home;