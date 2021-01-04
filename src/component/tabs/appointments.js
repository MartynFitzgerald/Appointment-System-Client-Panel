import React from "react";
import { withStyles, Typography, Grid, Button, Switch, FormControl, FormControlLabel, Paper, Select, MenuItem, ListItemText, Checkbox, InputLabel } from '@material-ui/core';
import { default  as ToolbarCore } from '@material-ui/core/Toolbar';
import { Add } from '@material-ui/icons';

import { ViewState, EditingState, GroupingState, IntegratedGrouping, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, Resources, Appointments, AppointmentTooltip, AppointmentForm, DragDropProvider, GroupingPanel, DayView, WeekView, MonthView, CurrentTimeIndicator, DateNavigator, TodayButton, Toolbar, ViewSwitcher } from '@devexpress/dx-react-scheduler-material-ui';

import appointments from '../../data/appointments';
import appointmentsStaff from '../../data/appointments-staff';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
});

const isWeekOrMonthView = viewName => viewName === 'Day' || viewName === 'Week'  || viewName === 'Month';

const GroupOrderSwitcher = withStyles(useStyles, { name: 'GroupOrderSwitcher' })(
  ({ isGroupByDate, onChange }) => (
    <FormControlLabel control={ <Switch checked={isGroupByDate} onChange={onChange} /> } label="Group by Day" />
  ),
);

class AppointmentsClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: [],
      resources: [{
        fieldName: 'staffId',
        title: 'Staff',
        instances: appointmentsStaff,
      }],
      grouping: [{
        resourceName: 'staffId',
      }],
      groupByDate: isWeekOrMonthView,
      isGroupByDate: true,
      currentViewName: 'Week',
      currentDate: new Date(),

      appointments: appointments.filter(appointment => appointment.staffId <= appointmentsStaff.length),
      appointmentsConst: appointments.filter(appointment => appointment.staffId <= appointmentsStaff.length),
    };

    this.commitChanges = this.commitChanges.bind(this);

    this.onGroupOrderChange = () => {
      const { isGroupByDate } = this.state;
      this.setState({
        isGroupByDate: !isGroupByDate,
        groupByDate: isGroupByDate ? undefined : isWeekOrMonthView,
      });
    };

    this.setSelectedStaff = (selectedStaff) => {
      let { appointmentsConst } = this.state;

      this.setState({ selectedStaff: selectedStaff }); 

      if (selectedStaff.length > 0) {
        this.setState({ appointments: appointmentsConst.filter( appointment => selectedStaff.find( a => a.id === appointment.staffId)) });
      } else {
        this.setState({ appointments: appointmentsConst });
      }
    };
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { appointments } = state;

      if (added) {
        const startingAddedId = appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 0;
        appointments = [...appointments, { id: startingAddedId, ...added }];
      }
      if (changed) {
        appointments = appointments.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        appointments = appointments.filter(appointment => appointment.id !== deleted);
      }
      return { appointments };
    });
  }

  render() {
    const { classes } = this.props;
    const { appointments, resources, grouping, isGroupByDate, currentViewName, currentDate, selectedStaff } = this.state;
    const { groupByDate } = this.state;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <ToolbarCore />
          <Grid container  direction="column" spacing={1} >
            
            <Grid container direction="row" justify="center" alignItems="center" >
              <Grid item xs={6} sm={6}>
                <Typography variant="h5">
                  Appointments
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} >
                <div className={classes.right}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="staff-multiple-checkbox-label">Staff Members</InputLabel>
                    <Select
                      labelId="staff-multiple-checkbox-label"
                      id="staff-multiple-checkbox"
                      value={selectedStaff}
                      onChange={(event) => this.setSelectedStaff(event.target.value)}
                      multiple
                      renderValue={(selected) => selected.map((staff) => staff.text).join(', ')}
                      label="Staff Members"
                    >
                      {
                        appointmentsStaff.map((staff) =>
                          <MenuItem key={staff.id} value={staff}>
                            <Checkbox checked={selectedStaff.indexOf(staff) > -1} />
                            <ListItemText primary={staff.text} />
                          </MenuItem>
                        )
                      }
                    </Select>
                  </FormControl>
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
                </div>
              </Grid>
            </Grid>
            
            <Grid item xs={12} >
            <React.Fragment>
              <Paper elevation={3} >
                <Scheduler
                  data={appointments}
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

                  <AppointmentTooltip
                    showOpenButton
                    showDeleteButton
                  />
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