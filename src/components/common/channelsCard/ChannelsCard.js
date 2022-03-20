import React from "react";
import PropTypes from "prop-types";
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

function ChannelsCard({ actionFunc, itemData }) {

  const beforeDispatchAction = () => {
    actionFunc(itemData);
  };

  return (
    <Card sx={{ minWidth: '100%' }}>
      <CardContent>
        <Box
          component="img"
          alt={itemData.icon}
          src={`/logos/${itemData.icon}.png`} 
          sx={{ width: '100px' }}
        />
        <Divider sx={{ mt: '10px', mb: '-15px' }} />
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>{itemData.channel}</Typography>
        <Button size="small" onClick={beforeDispatchAction}>
          <FormattedMessage id="actions.add" />
          <AddIcon fontSize="small" />
        </Button>
      </CardActions>
    </Card>
  );
}

ChannelsCard.propTypes = {
  actionFunc: PropTypes.func.isRequired,
  itemData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    channel: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  })
};

const notRenderIf = (current, next) => (
  current.itemData.id === next.itemData.id && current.itemData.channel === next.itemData.channel
  && current.itemData.icon === next.itemData.icon
);

export default React.memo(ChannelsCard, notRenderIf);
