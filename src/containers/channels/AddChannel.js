import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';

import Transition from '../../components/common/global/Transition';

const AddChannel = ({ data, handleAccept, handleClose }) => {
  const intl = useIntl();
  const [name, setName] = useState('');
  const [authorized, setAuthorized] = useState(false);

  const handleName = event => {
    setName(event.target.value);
  };

  const handleAuthorized = event => {
    setAuthorized(event.target.checked);
  };

  const beforeHandleAccept = () => {
    handleAccept({ ...data, name, authorized });
  }

  return (
    <Dialog
      open
      TransitionComponent={Transition}
      keepMounted
      scroll="paper"
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle><FormattedMessage id="add.integration" /></DialogTitle>
      <DialogContent dividers sx={{ width: '450px' }}>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Typography sx={{ mr: 1, fontWeight: 'bold' }} color="primary">
            <FormattedMessage id="channel" />:
          </Typography>
          <Typography sx={{ fontStyle: 'italic' }}>
            {data.title}
          </Typography>
        </Box>
        <TextField
          placeholder={intl.formatMessage({ id: 'common.hint.enter.here' }, { item: intl.formatMessage({ id: 'name' }) })}
          required
          id="nameId"
          label={intl.formatMessage({ id: 'name' })}
          value={name}
          onChange={handleName}
          size="small"
          fullWidth
          sx={{ mb: 1 }}
        />
        <FormControlLabel
          control={<Checkbox checked={authorized} onChange={handleAuthorized} />}
          label={intl.formatMessage({ id: 'authorized' })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          <FormattedMessage id="actions.cancel" />
        </Button>
        <Button onClick={beforeHandleAccept} variant="contained" disabled={!name.trim().length}>
          <FormattedMessage id="actions.save" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddChannel.propTypes = {
  handleAccept: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

export default AddChannel;
