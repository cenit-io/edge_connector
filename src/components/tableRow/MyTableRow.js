import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { genId } from '../../utils/generalFunctions';

const MyTableRow = ({
  children, handPointer, options, ...others
}) => {
  const [show, setShow] = useState(false);
  const componentId = useRef(genId());
  const rowRef = useRef(null);

  const handleShow = useCallback(() => {
    setShow(true);
  }, []);

  const handleHide = useCallback(event => {
    if (componentId.current !== event.relatedTarget.id) {
      setShow(false);
    }
  }, []);

  const handleLeave = useCallback(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    componentId.current = genId();
  }, []);

  const renderOptions = useCallback(() => {
    let height = rowRef.current.clientHeight;
    height = height - (height > 50 ? 10 : 1);

    return (
      <TableRow
        id={componentId.current}
        onMouseLeave={handleLeave}
        onMouseEnter={handleShow}
        sx={{
          position: 'absolute',
          marginTop: `-${height}px`,
          width: '100%'
        }}>
        <TableCell
          colSpan="100%"
          sx={{
            width: '100%',
            border: 'none',
            display: 'block',
            textAlign: 'end',
            padding: 'unset'
          }}
        >
          {options.map(x => (
            <Tooltip title={x.tip}>
              <IconButton
                onClick={x.action}
                size='small'
                color="primary"
              >
                {x.icon}
              </IconButton>
            </Tooltip>
          ))}
        </TableCell>
      </TableRow>
    )
  }, []);

  return (
    <>
      <TableRow
        ref={rowRef}
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
        style={handPointer && { cursor: 'pointer' }}
        {...others}
      >
        {children}
      </TableRow>
      {show && renderOptions()}
    </>
  );
};

MyTableRow.defaultProps = {
  handPointer: false,
  options: []
};

MyTableRow.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node,
    tip: PropTypes.string,
    action: PropTypes.function
  })),
  handPointer: PropTypes.bool
};

export default MyTableRow;
