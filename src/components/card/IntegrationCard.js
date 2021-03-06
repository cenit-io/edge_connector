import React from 'react';
import PropTypes from 'prop-types';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppBadIcon from '@mui/icons-material/GppBad';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { FormattedMessage } from 'react-intl';

const Title = ({ name }) => (<Typography sx={{ fontWeight: 'bold' }} component="div">{name}</Typography>);

Title.propTypes = {
  name: PropTypes.string.isRequired
};

function IntegrationCard({ itemData, type, options, onDispatchAction }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpenOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (action) => {
    handleClose();
    onDispatchAction({ action, value: itemData });
  };


  const handleDispatchAction = (action) => {
    if (onDispatchAction) onDispatchAction({ action, value: itemData });
  };

  const renderChannelContent = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Title name={itemData.title} />
      <Tooltip title={<FormattedMessage id="actions.add" />}>
        <IconButton size="small" onClick={() => handleDispatchAction('add-integration')}>
          <AddIcon fontSize="small" color="primary" />
        </IconButton>
      </Tooltip>
    </div>
  );

  const renderConnectedIntegrationContent = () => (
    <>
      <Title name={itemData.name} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>
          {itemData.channel_title}
        </Typography>
        {itemData.authorized ? (
          <Tooltip title={<FormattedMessage id="tooltip.authorized" />}><VerifiedUserIcon style={{ color: '#4caf50' }} /></Tooltip>
        ) : (
          <Tooltip title={<FormattedMessage id="tooltip.noAuthorized" />}><GppBadIcon /></Tooltip>
        )}
      </div>
    </>
  );

  const renderAvailableIntegrationContent = () => (
    <>
      <Title name={itemData.summary} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Chip label={itemData.status || 'unknown'} size="small" color={itemData.status === 'installed' ? 'primary' : itemData.status === 'not_installed' ? 'default' : 'secondary'} />
        <div>
          <Tooltip title={<FormattedMessage id="tooltip.install" />}>
            <IconButton
              aria-label="install"
              size="small"
              onClick={() => handleDispatchAction('install')}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={<FormattedMessage id="tooltip.uninstall" />}>
            <IconButton
              aria-label="uninstall"
              size="small"
              onClick={() => handleDispatchAction('uninstall')}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch (type) {
      case 'channel':
        return renderChannelContent();
      case 'connected':
        return renderConnectedIntegrationContent();
      case 'available':
        return renderAvailableIntegrationContent();
      default:
        return null;
    }
  };

  return (
    <Card sx={{ minWidth: 200 }}>
      {type === 'connected' ? (

        <CardHeader
          sx={{ paddingBottom: 0 }}
          action={
            <IconButton
              sx={{ padding: 0 }}
              aria-label="settings"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenOptions}
            >
              <MoreVertIcon />
            </IconButton>
          }
        />
      ) : null}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {options?.map(({ name: nm, value, disabled }) => (
          <MenuItem key={value} disabled={disabled} onClick={() => handleOptionClick(value)}>
            {nm}
          </MenuItem>
        ))}
      </Menu>

      <CardMedia
        sx={{ objectFit: 'contain', height: 60, backgroundSize: 'contain', backgroundPosition: 'left', width: 'auto', marginLeft: '24px', marginRight: '8px', marginTop: '10%' }}
        component="div"
        height="140"
        image={itemData.logo}
        alt={itemData.name}
      />
      <CardContent>
        <Divider sx={{ mb: '8px' }} />
        {renderContent()}
      </CardContent>
    </Card>
  );
}

IntegrationCard.propTypes = {
  itemData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    channel_title: PropTypes.string,
    authorized: PropTypes.bool,
    title: PropTypes.string,
    summary: PropTypes.string,
    status: PropTypes.string
  }),
  type: PropTypes.oneOf(['channel', 'connected', 'available']),
  options: PropTypes.array,
  onDispatchAction: PropTypes.func
};

IntegrationCard.defaultProps = {
  type: 'connected',
  options: [],
  onDispatchAction: () => {}
};

const notRenderIf = (current, next) => (
  JSON.stringify(current) === JSON.stringify(next)
);

export default React.memo(IntegrationCard, notRenderIf);
