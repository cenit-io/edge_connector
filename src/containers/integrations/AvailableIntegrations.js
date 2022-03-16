import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from 'react-query';

import EnhancedTable from '../../components/Tables/EnhancedTable';
import Loading from '../../components/loading/Loading';
import CustomizedSnackbar from '../../components/alert/CustomizedSnackbar';
import {
    getAvailableIntegrations, installAvailableIntegration, uninstallAvailableIntegration
} from '../../api/integrations';

export default function AvailableIntegrationList() {

    const [loadingOnRequest, setLoadingOnRequest] = React.useState(false);

    const [snackbar, setSnackbar] = React.useState({
        open: false,
        severity: 'info',
        message: '',
        autoHideDuration: 6000
    });

    const { data: integrations, error, isLoading } = useQuery('available-integrations', async () => getAvailableIntegrations());

    useEffect(() => {
        if(error) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: `Error: ${error.message}`,
                autoHideDuration: null
            });
        }
      }, [error]);

    const [page] = useState(0);
    const [selectedRows] = useState([]);
    const [rowsPerPage] = useState(10);

    const handleInstall = async (id) => {
        setLoadingOnRequest(true);
        const { error } = await installAvailableIntegration(id);
        setSnackbar({
            open: true,
            severity: !error ? 'info' : 'error',
            message: !error ? 'Installing available integration' : `Error: ${error}`,
            autoHideDuration: null
        });
        setLoadingOnRequest(false);
    };

    const handleUninstall = async (id) => {
        setLoadingOnRequest(true);
        const { error } = await uninstallAvailableIntegration(id);
        setSnackbar({
            open: true,
            severity: !error ? 'info' : 'error',
            message: !error ? 'Uninstalling available integration' : `Error: ${error}`,
            autoHideDuration: null
        });
        setLoadingOnRequest(false);
    };
    

    const headCells = [
        {
            id: 'name',
            label: 'name',
        },
        {
            id: 'version',
            label: 'Version',
        },
        {
            id: 'status',
            label: 'Status',
        },
        {
            id: 'installed_at',
            label: 'Installed at',
            customRenderCell: value => <div>{value}</div>,
        },
        {
            id: 'actions',
            label: 'Actions',
            customRenderCell: (value, row) => (
                <div>
                    <Tooltip title="install">
                        <IconButton
                            aria-label="install"
                            size="small"
                            onClick={() => handleInstall(row.id || null)}
                        >
                            <DownloadIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="uninstall">
                        <IconButton
                            aria-label="uninstall"
                            size="small"
                            onClick={() => handleUninstall(row.id || null)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            )
        }
    ];

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbar((prevState) => ({ ...prevState, open: false }));
      };


    return (
        <div>
            {isLoading || loadingOnRequest ? <Loading /> : null}
            <EnhancedTable
                rows={integrations?.data}
                headCells={headCells}
                rowsPerPage={rowsPerPage}
                page={page}
                selected={selectedRows}
            />
            <CustomizedSnackbar
                 open={snackbar.open}
                 severity={snackbar.severity}
                 onClose={handleClose}
                 message={snackbar.message}
                 autoHideDuration={snackbar.autoHideDuration}
            />
        </div>
    )
}