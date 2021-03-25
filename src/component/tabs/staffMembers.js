import React from "react";
import moment from "moment";
import { withStyles, Typography, Toolbar, Grid, Button, Paper } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Delete, Add, Edit } from '@material-ui/icons';

import SystemSettings from "../../data/systemSettings.json"; 

import apiMethods from '../apiMethods';
import StaffMembersDialog from "../dialogs/staffMembers";

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

const columns = [
  { field: 'first_name', headerName: 'First name', width: 200 },
  { field: 'last_name', headerName: 'Last name', width: 200 },
  { field: 'email_address', headerName: 'Email Address', width: 325 },
  { field: 'phone_number', headerName: 'Phone Number', width: 200 },
  { field: 'permission_level', headerName: 'Permission Level', width: 175 },
  { field: 'last_updated_at', headerName: 'Last Updated At', width: 250 }
];

class StaffMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isFetching: true,
        staffMembers: [],
        selectedStaffMembersIds: [],
        showDialog: false,
        action: 'Add',
        timer: null
    };
  }

  componentDidMount() {
    this.fetchStaffMembers();
    this.setState({timer: setInterval(() => this.fetchStaffMembers(), 1000 * 60 * 15)});
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  fetchStaffMembers = () => {
    //Fetch Car Parks From API.
    apiMethods.read(`STAFFMEMBERS`)
    .then((staffMembers) => {
      staffMembers.forEach(x => { x.last_updated_at = moment(x.last_updated_at).format(SystemSettings.dateFormat)});
      this.setState({isFetching: true, staffMembers: staffMembers});
    });
  }

  handleClose = () => {
    this.fetchStaffMembers();
    this.setState({showDialog: false});
  }

  render() {
    const { classes } = this.props;
    const { staffMembers, selectedStaffMembersIds, showDialog, action } = this.state;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Toolbar />
          <Grid container  direction="column" spacing={1} >

            <Grid container direction="row" justify="center" alignItems="center" >
              <Grid item xs={6} sm={6} >
                <Typography variant="h5">
                  Staff Members
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} >
                <div className={classes.right}>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<Add />}
                    onClick={() => {
                      this.setState({showDialog: true, action: 'Add'});
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<Edit />}
                    onClick={() => {
                      this.setState({showDialog: true, action: 'Modify'});
                    }}
                    disabled={selectedStaffMembersIds.length < 1}
                  >
                    Modify
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<Delete />}
                    onClick={() => {
                      this.setState({showDialog: true, action: 'Remove'});
                    }}
                    disabled={selectedStaffMembersIds.length < 1}
                  >
                    Remove
                  </Button>
                </div>
              </Grid>
            </Grid>
            
            <Grid item xs={12}>
              <Paper elevation={3} >
                <div style={{ height: '80vh', width: '100%' }}>
                  <DataGrid rows={staffMembers} columns={columns} pageSize={12} selectionModel={selectedStaffMembersIds} onSelectionChange={x => this.setState({selectedStaffMembersIds: x.rowIds})} checkboxSelection />
                </div>
              </Paper>
            </Grid>
          </Grid>
          <StaffMembersDialog showDialog={showDialog} close={this.handleClose} action={action} selectedItems={staffMembers.filter(x => selectedStaffMembersIds.includes(x.id))}/>
        </main> 
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(StaffMembers);