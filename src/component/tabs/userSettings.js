import React from "react";
import { withStyles, Typography, Toolbar, Grid, Button, Paper, TextField, Divider, Box, Switch } from '@material-ui/core';
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
                <Box p={2} >
                  <Typography variant="h6" >
                    Details
                  </Typography>

                  <Divider />

                  <Grid container direction="row" >
                    <Grid item xs={6} sm={6} >
                      <Box p={2} >
                        <Box py={0.5} >
                          <Typography variant="body1" style={{ paddingBottom: 5 }}>First Name</Typography>
                          <TextField variant="outlined" label="E.g. Martyn" style={{width: 500}} />
                        </Box>
                        <Box py={0.5} >
                          <Typography variant="body1" style={{ paddingBottom: 5 }}>Second Name</Typography>
                          <TextField variant="outlined" label="E.g. Fitzgerald" style={{width: 500}} />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} >
                      <Box p={2} >
                        <Box py={0.5} >
                          <Typography variant="body1" style={{ paddingBottom: 5 }}>Email Address</Typography>
                          <TextField variant="outlined" label="E.g. Martyn.Fitzgerald@AppoimentSystem.com" style={{width: 500}} />
                        </Box>
                        <Box py={0.5} >
                          <Typography variant="body1" style={{ paddingBottom: 5 }}>Phone Number</Typography>
                          <TextField variant="outlined" label="E.g. 07154 685479" style={{width: 500}} />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} >
              <Paper elevation={3} >
                <Box p={2} >
                  <Typography variant="h6" >
                    Preferences
                  </Typography>

                  <Divider />

                  <Grid container direction="row" >
                    <Grid item xs={6} sm={6} >
                      <Box p={2} >
                        <Box py={0.5} >
                          <Typography variant="body1">Darkmode</Typography>
                          <Switch
                            //checked={state.checkedA}
                            //onChange={handleChange}
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </main> 
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(UserSettings);