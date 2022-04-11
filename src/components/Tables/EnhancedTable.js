import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

function EnhancedTableHead(props) {

  const { 
    headCells, onSelectAllClick, numSelected, rowCount, withCheckboxSelection 
  } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {withCheckboxSelection ? (
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all'
              }}
            />
          ) : null}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  headCells: PropTypes.array.isRequired,
  rowCount: PropTypes.number.isRequired,
  withCheckboxSelection: PropTypes.bool
};

EnhancedTableHead.propTypes = {
  withCheckboxSelection: false
};

const EnhancedTableToolbar = (props) => {
  const { title, numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

EnhancedTableToolbar.defaultProps = {
  title: ''
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string
};

export default function EnhancedTable(props) {

  const {
    title, headCells, rows, page, rowsPerPage = 5, rowCount, withCheckboxSelection, selected, onChange
  } = props;

  const dispatch = (payload) => onChange(payload);

  const handleSelectAllClick = (event) => {

    if (event.target.checked) {
      dispatch({ type: 'SET_SELECTED', payload: rows.map(n => n.id) });
    } else dispatch({ type: 'SET_SELECTED', payload: [] });

  };

  const handleClick = (event, row) => {
    const { id } = row;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    if (withCheckboxSelection) {
      dispatch({ type: 'SET_SELECTED', payload: newSelected });
    } else dispatch({ type: 'CLICK_ROW', payload: row });
  };

  const handleChangePage = (event, newPage) => dispatch({ type: 'SET_PAGE', payload: newPage });

  const handleChangeRowsPerPage = (event) => dispatch({ type: 'SET_ROWSPERPAGE', payload: event.target.value });

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const renderCustomCell = (render, id = '', dataArray = null) => render(id, dataArray);

  const renderCell = (dataArray, keyArray) => keyArray.map((itemCell, index) => {

    if (!itemCell.customRenderCell){
      return <TableCell align={itemCell.numeric ? 'right' : 'left'} key={index.toString()}>{dataArray[itemCell.id]}</TableCell>
    }

    return <TableCell>{renderCustomCell(itemCell.customRenderCell, dataArray[itemCell.id], dataArray)}</TableCell>;

  });

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar title={title} numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rowCount}
              withCheckboxSelection={withCheckboxSelection}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {rows.slice(0, rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        {withCheckboxSelection ? (
                          <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row)}
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId
                            }}
                          />
                        ) : null}
                      </TableCell>
                      {renderCell(row, headCells)}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

EnhancedTable.propTypes = {
  title: PropTypes.string,
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array,
  rowCount: PropTypes.number,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  withCheckboxSelection: PropTypes.bool,
  selected: PropTypes.array,
  onChange: PropTypes.func
};

EnhancedTable.defaultProps = {
  title: '',
  page: 0,
  rows: [],
  rowCount: 0,
  withCheckboxSelection: false,
  selected: [],
  onChange: () => {}
};
