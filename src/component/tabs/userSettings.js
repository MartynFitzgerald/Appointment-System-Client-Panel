import React from "react";
import { withStyles, Typography, Toolbar, Grid, Button, Paper, TextField, Divider, FormControl } from '@material-ui/core';
import { Save } from '@material-ui/icons';

const  useStyles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  right: {
    float: 'right',
  }
});

class UserSettings extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Toolbar />
          <Grid container direction="column" spacing={1} >

            <Grid container direction="row" justify="center" alignItems="center" >
              <Grid item xs={6} sm={6} >
                <Typography variant="h5">
                  User Settings
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} >
                <div className={classes.right}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<Save />}
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            </Grid>
            
            <Grid item xs={12} >
              <Paper elevation={3} >
                <Typography variant="h6">
                  Details
                </Typography>

                <Divider />

                <Grid container direction="row" justify="space-evenly" alignItems="center" >
                  <Grid item xs={6} sm={6} >
                    <Typography variant="body1">First Name</Typography>
                      <TextField variant="outlined" label="E.g. Martyn" style={{width: 200}} />
                    <Typography variant="body1">Second Name</Typography>
                      <TextField variant="outlined" label="E.g. Fitzgerald" style={{width: 200}} />
                  </Grid>
                  <Grid item xs={6} sm={6} >
                    <Typography variant="body1">Email Address</Typography>
                      <TextField variant="outlined" label="E.g. Martyn.Fitzgerald@AppoimentSystem.com" style={{width: 500}} />
                    <Typography variant="body1">Phone Number</Typography>
                      <TextField variant="outlined" label="E.g. 07154 685479" style={{width: 200}} />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </main> 
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(UserSettings);