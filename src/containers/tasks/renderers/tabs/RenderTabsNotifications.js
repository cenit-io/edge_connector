import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { FormattedMessage } from 'react-intl';
import { dateHandler, isEmpty } from '../../../../utils/generalFunctions';
import RenderChip from '../../../../components/showData/RenderChip';

const weight = { fontWeight: 'bold' }

const RenderTabNotifications = ({ data }) => {
  if (isEmpty(data)) {
    return (
      <Typography><FormattedMessage id="common.no.data" /></Typography>
    );
  }
  return (
    <TableContainer>
      <Table sx={{ width: '100%' }} size="small" aria-label="executions table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography sx={weight}>
                <FormattedMessage id="common.type" />
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={weight}>
                <FormattedMessage id="common.created.at" />
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={weight}>
                <FormattedMessage id="tasks.message" />
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow
              key={JSON.stringify(row)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <RenderChip status={row.type} />
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography sx={{ whiteSpace: 'nowrap' }}>
                  {dateHandler(row.created_at)}
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography>
                  {row.message}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

RenderTabNotifications.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    created_at: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.string
  })).isRequired
};

export default RenderTabNotifications;
