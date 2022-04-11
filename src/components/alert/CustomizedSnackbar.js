import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Portal from '@mui/material/Portal';

import SEVERITY from '../../config/constants';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbar({ open, severity, message, autoHideDuration, onClose }) {

  return (
    <Portal>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={autoHideDuration} onClose={onClose}>
          <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </Portal>
  );
}

CustomizedSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  severity: PropTypes.string,
  message: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number,
  onClose: PropTypes.func.isRequired
};

CustomizedSnackbar.defaultProps = {
  autoHideDuration: 6000,
  severity: SEVERITY.error
};
