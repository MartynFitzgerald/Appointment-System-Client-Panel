import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Typography, Toolbar, Grid, Button } from '@material-ui/core';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

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
});

const currentDate = '2018-11-01';
const schedulerData = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

class AppointmentsClass extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Toolbar />
          <Grid container spacing={1}>
            <Grid container xs={12} sm={6} alignItems="center">
              <Typography variant="h5">
                Appointments
              </Typography>
            </Grid>

            <Grid container  xs={12} sm={6} justify="flex-end" >
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<AddIcon />}
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<EditIcon />}
              >
                Modify
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
              >
                Remove
              </Button>
            </Grid>
            
            <Grid item xs={12}>

            <Scheduler
              data={schedulerData}
            >
              <ViewState
                currentDate={currentDate}
              />
              <DayView
                startDayHour={9}
                endDayHour={14}
              />
              <Appointments />
            </Scheduler>
            </Grid>
          </Grid>
        </main> 
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(AppointmentsClass);