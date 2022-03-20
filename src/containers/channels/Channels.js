import React, { useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import data from "./staticData";
import { FormattedMessage } from 'react-intl';
import ChannelsCard from "../../components/common/channelsCard/ChannelsCard";

function Channels() {
  const action = useCallback(payload => {
    console.log(payload);
  }, []);

  return (
    <>
      <Typography><FormattedMessage id="components.layout.sidebar.mainMenu.channels" /></Typography>
      <Grid container spacing={2}>
        {data.map(x => (
          <Grid item xs={12} sm={6} md={3}>
            <ChannelsCard actionFunc={action} itemData={x} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Channels;
