import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const  useStyles = theme => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }
);

class Error extends React.Component {
  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Box component="span" m={1}>
            Error 404: Page not found, please try again.
          </Box>
        </main>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Error);