import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import { name, description } from "../../config/projectConfig";

const NotFound = () => {
  const intl = useIntl();
  const title = `${name} - ${intl.formatMessage({ id: "page.not.found" })}`;

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
      <Box sx={{
        height: 'calc(100vh - 150px)',
        width: '100%'
      }}>
        <Box sx={{
          position: 'relative',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <Icon fontSize="large">
            <DoNotTouchIcon fontSize="large" />
          </Icon>
          <Typography sx={{ fontWeight: 'bold' }} variant="h5">
            {intl.formatMessage({ id: 'page.not.found.error' })}
          </Typography>
          <Typography>
            <Link href="/" underline="none" rel="noopener">
              {intl.formatMessage({ id: 'go.back.home' })}
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default NotFound;
