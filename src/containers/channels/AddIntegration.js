import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { FormattedMessage, useIntl } from 'react-intl';

import Dialog from '../../components/common/Dialog';

// eslint-disable-next-line react/prop-types
const AddIntegration = ({ data, loadingOnSubmit, handleAccept, handleClose }) => {
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
    handleAccept({ name, authorized });
  }

  return (
    <Dialog title={<FormattedMessage id="add.integration" />} open onAccept={beforeHandleAccept} onClose={handleClose} showLoadingOnSubmit={loadingOnSubmit} disabledAcceptBtn={!name?.trim().length}>
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
    </Dialog>
  );
};

AddIntegration.propTypes = {
  handleAccept: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  loadingOnSubmit: PropTypes.bool
};

export default AddIntegration;
