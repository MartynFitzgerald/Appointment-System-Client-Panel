import React from "react";
import "./error.css";
import { Box } from '@material-ui/core';

export default class Error extends React.Component {
  render() {
    return (
      <div className="component-error">
        <Box component="span" m={1}>
          Error 404: Page not found, please try again.
        </Box>
      </div>
    );
  }
}