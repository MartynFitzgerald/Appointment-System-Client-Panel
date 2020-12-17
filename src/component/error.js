import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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
          <Typography component="h1">
            Error 404
          </Typography>
        </main>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Error);