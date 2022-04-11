import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
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

  const renderBox = useCallback(() => {
    return (
      <Box
        id={componentId.current}
        onMouseLeave={handleLeave}
        sx={{
          width: `${rowRef.current.offsetWidth}px`,
          mt: '-32px',
          position: 'absolute',
          textAlign: 'right',
          cursor: handPointer ? 'pointer' : undefined,
          backgroundColor: 'rgba(66, 118, 152, 0.08)',
          borderRadius: '5px'
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
        ))
        }
      </Box>
    );
  }, []);

  return (
    <>
      <TableRow
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
        style={handPointer && { cursor: 'pointer' }}
        ref={rowRef}
        {...others}
      >
        {children}
      </TableRow>
      {show && renderBox()}
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
