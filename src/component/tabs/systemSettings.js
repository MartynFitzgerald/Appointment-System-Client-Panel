import React from "react";
import { withStyles, Typography, Toolbar, Grid, Button, Paper, TextField, Divider, Box } from '@material-ui/core';
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
  },
});

class SystemSettings extends React.Component {
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
                  System Settings
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
                    Appointments View Settings
                  </Typography>

                  <Divider />

                  <Grid container direction="row" >
                    <Grid item xs={6} sm={6} >
                      <Box p={2} >
                        <Box py={0.5} >
                          <Typography variant="body1">Work Day Start Time</Typography>
                          <TextField
                            id="startTime"
                            type="time"
                            defaultValue="09:00"
                          />
                        </Box>
                        <Box py={0.5} >
                          <Typography variant="body1">Work Day End Time</Typography>
                          <TextField
                            id="endTime"
                            type="time"
                            defaultValue="17:00"
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

export default withStyles(useStyles, { withTheme: true })(SystemSettings);