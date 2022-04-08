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

import RenderChip from '../../../../components/showData/RenderChip';
import { dateHandler, isEmpty } from '../../../../utils/generalFunctions';

const weight = { fontWeight: 'bold' };

const RenderTabExecutions = ({ data }) => {
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
                <FormattedMessage id="common.status" />
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={weight}>
                <FormattedMessage id="tasks.start.date" />
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={weight}>
                <FormattedMessage id="tasks.complete.date" />
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
                <RenderChip status={row.status} />
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography>
                  {dateHandler(row.started_at)}
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography>
                  {dateHandler(row.completed_at)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

RenderTabExecutions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(
    { completed_at: PropTypes.string.isRequired },
    { started_at: PropTypes.string.isRequired },
    { status: PropTypes.string.isRequired }
  )).isRequired
};

export default RenderTabExecutions;
