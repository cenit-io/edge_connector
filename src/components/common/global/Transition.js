import React from 'react';
import Slide from '@mui/material/Slide';

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default Transition;
