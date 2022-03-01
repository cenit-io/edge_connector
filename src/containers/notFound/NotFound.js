import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Helmet } from "react-helmet";
import { name, description } from "../../config/projectConfig";

const NotFound = () => {
  const title = `${name} - Page not found`;

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
      <div sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h3">
          Error 404: The requested URL is not available
        </Typography>
        <Typography>
          <Link href="/" underline="none" rel="noopener">
            Go back to Home.
          </Link>
        </Typography>
      </div>
    </>
  );
}

export default NotFound;
