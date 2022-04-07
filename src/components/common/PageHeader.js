import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';

import { description, name } from '../../config/projectConfig';

const PageHeader = ({ title }) => {

  const t = `${name} - ${title}`;

  return (
    <>
      <Helmet>
        <title>{t}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={name} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Typography variant='h5'>{title}</Typography>
      <br/>
    </>
  );
}

export default PageHeader;

PageHeader.propTypes = {
  title: PropTypes.string.isRequired
};
