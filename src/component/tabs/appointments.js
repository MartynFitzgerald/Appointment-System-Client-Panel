import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, Switch, FormControl, FormControlLabel, Paper, Select, MenuItem } from '@material-ui/core';
import { default  as ToolbarCore } from '@material-ui/core/Toolbar';
import { green, lightBlue } from '@material-ui/core/colors';
import { Delete, Add, Edit } from '@material-ui/icons';

import { ViewState, EditingState, GroupingState, IntegratedGrouping, IntegratedEditing } from '@devexpress/dx-react-scheduler';
//import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import { Scheduler, Resources, Appointments, AppointmentTooltip, AppointmentForm, DragDropProvider, GroupingPanel, DayView, WeekView, MonthView, CurrentTimeIndicator, DateNavigator, TodayButton, Toolbar, ViewSwitcher } from '@devexpress/dx-react-scheduler-material-ui';

import appointments from '../../data/appointments';

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

const isWeekOrMonthView = viewName => viewName === 'Day' || viewName === 'Week'  || viewName === 'Month';

const GroupOrderSwitcher = withStyles(useStyles, { name: 'GroupOrderSwitcher' })(
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
      currentViewName: 'Week',
      currentDate: new Date(),
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
    const { data, resources, grouping, groupByDate, isGroupByDate, currentViewName, currentDate } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <ToolbarCore />
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
                  height={'100%'}
                >
                  <ViewState
                    defaultCurrentDate={currentDate}
                    defaultCurrentViewName={currentViewName}
                  />
                  <EditingState
                    onCommitChanges={this.commitChanges}
                  />
                  <GroupingState
                    grouping={grouping}
                    groupByDate={groupByDate}
                  />

                  <DayView 
                    startDayHour={8}
                    endDayHour={13}
                  />
                  <WeekView
                    startDayHour={8.5}
                    endDayHour={17.5}
                  />
                  <MonthView />

                  <Toolbar />
                  <DateNavigator />
                  <TodayButton />
                  
                  <ViewSwitcher />

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