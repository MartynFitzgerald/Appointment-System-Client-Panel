import React from "react";
import { withStyles, Typography, Toolbar, Grid, Paper } from '@material-ui/core';

const  useStyles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class UserSettings extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Toolbar />
          <Grid container  direction="column" spacing={1} >

            <Grid container direction="row" justify="center" alignItems="center" >
              <Grid item xs={12} >
                <Typography variant="h5">
                  User Settings
                </Typography>
              </Grid>
            </Grid>
            
            <Grid item xs={12}>
              <Paper>

              </Paper>
            </Grid>
          </Grid>
        </main> 
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(UserSettings);