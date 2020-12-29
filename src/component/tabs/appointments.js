import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Typography, Toolbar, Grid, Button, Switch, FormControlLabel, Paper } from '@material-ui/core';
import { green, lightBlue } from '@material-ui/core/colors';
import { Delete, Add, Edit } from '@material-ui/icons';

import { ViewState, EditingState, GroupingState, IntegratedGrouping, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, Resources, Appointments, AppointmentTooltip, AppointmentForm, DragDropProvider, GroupingPanel, WeekView, MonthView, CurrentTimeIndicator,
  // eslint-disable-next-line 
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';

import appointments from '../../data/appointments';

const isWeekOrMonthView = viewName => viewName === 'Week' || viewName === 'Month';

const StaffData = [
  { id: 1, text: 'Martyn', color: lightBlue },
  { id: 2, text: 'Dawid', color: green }
];

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

const GroupOrderSwitcher = withStyles(useStyles, { name: 'ResourceSwitcher' })(
  ({ isGroupByDate, onChange }) => (
    <FormControlLabel
      control={
        <Switch checked={isGroupByDate} onChange={onChange} />
      }
      label="Grouped by Day"
    />
  ),
);

class AppointmentsClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments.filter(appointment => appointment.staffId <= StaffData.length),
      resources: [{
        fieldName: 'staffId',
        title: 'Staff',
        instances: StaffData,
      }],
      grouping: [{
        resourceName: 'staffId',
      }],
      groupByDate: isWeekOrMonthView,
      isGroupByDate: true,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.onGroupOrderChange = () => {
      const { isGroupByDate } = this.state;
      this.setState({
        isGroupByDate: !isGroupByDate,
        groupByDate: isGroupByDate ? undefined : isWeekOrMonthView,
      });
    };
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;

      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, resources, grouping, groupByDate, isGroupByDate } = this.state;
    const { classes } = this.props;

    if (data.length > 0){
      data.forEach(i => {
        i.startDate = new Date(i.startDate);
        i.endDate = new Date(i.endDate);
      });
    }

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Toolbar />
          <Grid container spacing={1}>
            <Grid container xs={6} sm={6} alignItems="center">
              <Typography variant="h5">
                Appointments
              </Typography>
            </Grid>

            <Grid container  xs={6} sm={6} justify="flex-end" >
              <GroupOrderSwitcher 
                isGroupByDate={isGroupByDate} 
                onChange={this.onGroupOrderChange} 
              />
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<Add />}
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<Edit />}
              >
                Modify
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<Delete />}
              >
                Remove
              </Button>
            </Grid>
            
            <Grid item xs={12}>

            <React.Fragment>
              <Paper>
                <Scheduler
                  data={data}
                  height={750}
                >
                  <ViewState
                    defaultCurrentDate={new Date()} // defaultCurrentDate="2018-05-30"
                  />
                  <EditingState
                    onCommitChanges={this.commitChanges}
                  />
                  <GroupingState
                    grouping={grouping}
                    groupByDate={groupByDate}
                  />

                  <WeekView
                    startDayHour={8.5}
                    endDayHour={17}
                  />
                  <MonthView />

                  <Appointments />
                  <Resources
                    data={resources}
                    mainResourceName="staffId"
                  />
                  <IntegratedGrouping />
                  <IntegratedEditing />

                  <AppointmentTooltip />
                  <AppointmentForm />

                  <GroupingPanel />
                  <DragDropProvider />
                  
                  <CurrentTimeIndicator
                    shadePreviousCells={true}
                  />
                </Scheduler>
              </Paper>
            </React.Fragment>
            </Grid>
          </Grid>
        </main> 
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(AppointmentsClass);