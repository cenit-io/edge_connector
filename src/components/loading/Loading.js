import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({ radius, thickness }) => (
  <CircularProgress
    sx={{ position: 'fixed', top: `calc(50% - ${radius}px)`, left: `calc(50% - ${radius}px)` }}
    size={radius * 2}
    thickness={thickness}
  />
);

Loading.defaultProps = {
  radius: 25,
  thickness: 2
};

Loading.propTypes = {
  radius: PropTypes.number,
  thickness: PropTypes.number
};

export default Loading;
