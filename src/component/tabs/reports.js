import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Typography, Toolbar } from '@material-ui/core';

const  useStyles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class Reports extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Toolbar />
          <Typography paragraph>
            Reports
          </Typography>
        </main>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Reports);