import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Typography, Toolbar, Grid } from '@material-ui/core';

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
          <Grid container spacing={1}>
            <Grid container xs={12} sm={6}>
              <Typography variant="h4" gutterBottom>
                Reports
              </Typography>
            </Grid>

            <Grid container  xs={12} sm={6} justify="flex-end" >

            </Grid>
            
            <Grid item xs={12}>

            </Grid>
          </Grid>
        </main> 
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Reports);