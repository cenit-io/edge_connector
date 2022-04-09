import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { default as MuiDialog } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

import { FormattedMessage } from 'react-intl';

import Transition from '../../components/common/global/Transition';

const Dialog = ({ title, open, children, onAccept, onClose, disabledAcceptBtn, showLoadingOnSubmit }) => {

    return (
        <MuiDialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            scroll="paper"
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers sx={{ width: '450px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                 {children}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    <FormattedMessage id="actions.cancel" />
                </Button>
                <Button onClick={onAccept} variant="contained" startIcon={showLoadingOnSubmit ? <CircularProgress color="inherit" size={20} /> : undefined} disabled={disabledAcceptBtn || showLoadingOnSubmit}>
                    <FormattedMessage id="actions.save" />
                </Button>
            </DialogActions>
        </MuiDialog>
    );
};

Dialog.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    disabledAcceptBtn: PropTypes.bool,
    showLoadingOnSubmit: PropTypes.bool,
    onAccept: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

Dialog.defaultProps = {
    disabledAcceptBtn: false,
    showLoadingOnSubmit: false
};

export default Dialog;
