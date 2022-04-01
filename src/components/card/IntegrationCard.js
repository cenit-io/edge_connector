import React from 'react';
import PropTypes from 'prop-types';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppBadIcon from '@mui/icons-material/GppBad';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { FormattedMessage } from 'react-intl';

function IntegrationCard({ itemData, type, onDispatchAction }) {

    const handleDispatchAction = (action) => {
        if(onDispatchAction) onDispatchAction({ action, value: itemData });
    };

    const renderContent = () => {

        const connectedIntegrationContent = (
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
        );

        const availableIntegrationContent = (
            <div>
                <Typography>
                    {itemData.summary}
                </Typography>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                    <Chip label={itemData.status || 'unknown'} size="small" color="primary" />
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
            </div>
        );

        if (type === 'connected') {
            return connectedIntegrationContent;
        }

        return availableIntegrationContent;
    };

    return (
        <Card sx={{ minWidth: 200 }}>
            <CardMedia
                sx={{ objectFit: 'contain', height: 60, backgroundSize: 'contain', backgroundPosition: 'left', width: 'auto', marginLeft: '24px', marginTop: '10%' }}
                component="img"
                height="140"
                image={itemData.logo}
                alt={itemData.name}
            />
            <CardContent>
                <Divider sx={{ mb: '8px' }} />
                <Typography sx={{ fontWeight: 'bold' }} component="div">
                    {itemData.name}
                </Typography>
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
        summary: PropTypes.string,
        status: PropTypes.string,
    }),
    type: PropTypes.oneOf(['connected','available']),
    onDispatchAction: PropTypes.func,
};

IntegrationCard.defaultProps = {
    type: 'connected',
    onDispatchAction: () => {}
};

const notRenderIf = (current, next) => (
    JSON.stringify(current) === JSON.stringify(next)
);

export default React.memo(IntegrationCard, notRenderIf);
