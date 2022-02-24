import React from "react";
import Typography from "@mui/material/Typography";
import { Helmet } from 'react-helmet';
import { name, description } from '../../config/projectConfig';
import HomeDashboard from './HomeDashboard';

const Home = () => {
  const title = `${name} - Home`;
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
      <Typography variant="h3">Home</Typography>
      <HomeDashboard />
    </>
  );
}

export default Home;
