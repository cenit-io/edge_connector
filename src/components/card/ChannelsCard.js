import React from "react";
import PropTypes from "prop-types";
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
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
          alt={itemData.title}
          src={itemData.logo}
          sx={{ width: '100px' }}
        />
        <Divider sx={{ mt: '10px', mb: '-15px' }} />
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontStyle: 'italic' }}>{itemData.title}</Typography>
        <Tooltip title={<FormattedMessage id="actions.add" />}>
          <IconButton size="small" onClick={beforeDispatchAction}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

ChannelsCard.propTypes = {
  actionFunc: PropTypes.func.isRequired,
  itemData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

const notRenderIf = (current, next) => (
  JSON.stringify(current) === JSON.stringify(next)
);

export default React.memo(ChannelsCard, notRenderIf);
