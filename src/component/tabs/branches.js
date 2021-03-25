import React from "react";
import moment from "moment";
import { withStyles, Typography, Toolbar, Grid, Button, Paper } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Delete, Add, Edit } from '@material-ui/icons';

import SystemSettings from "../../data/systemSettings.json"; 

import apiMethods from '../apiMethods';
import BranchesDialog from "../dialogs/branches";

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
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'address', headerName: 'Address', width: 400 },
  { field: 'latitude', headerName: 'Latitude', width: 150 },
  { field: 'longitude', headerName: 'Longitude', width: 150 },
  { field: 'last_updated_at', headerName: 'Last Updated At', width: 250 }
];

class Branches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isFetching: true,
        branches: [],
        selectedBranchesIds: [],
        showDialog: false,
        action: 'Add',
        timer: null
    };
  }

  componentDidMount() {
    this.fetchBranches();
    this.setState({timer: setInterval(() => this.fetchBranches(), 1000 * 60 * 15 )});
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  fetchBranches = () => {
    //Fetch Car Parks From API.
    apiMethods.read(`BRANCHES`)
    .then((branches) => {
      branches.forEach(x => { x.last_updated_at = moment(x.last_updated_at).format(SystemSettings.dateFormat)});
      this.setState({isFetching: true, branches: branches});
    });
  }

  handleClose = () => {
    this.fetchBranches();
    this.setState({showDialog: false});
  }

  render() {
    const { classes } = this.props;
    const { branches, selectedBranchesIds, showDialog, action } = this.state;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Toolbar />
          <Grid container  direction="column" spacing={1} >

            <Grid container direction="row" justify="center" alignItems="center" >
              <Grid item xs={6} sm={6} >
                <Typography variant="h5">
                  Branches
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
                    disabled={selectedBranchesIds.length < 1}
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
                    disabled={selectedBranchesIds.length < 1}
                  >
                    Remove
                  </Button>
                </div>
              </Grid>
            </Grid>
                    
            <Grid item xs={12}>
              <Paper elevation={3} >
                <div style={{ height: '80vh', width: '100%' }}>
                  <DataGrid rows={branches} columns={columns} pageSize={12} selectionModel={selectedBranchesIds} onSelectionChange={x => this.setState({selectedBranchesIds: x.rowIds})} checkboxSelection/>
                </div>
              </Paper>
            </Grid>
          </Grid>
          <BranchesDialog showDialog={showDialog} close={this.handleClose} action={action} selectedItems={branches.filter(x => selectedBranchesIds.includes(x.id))}/>
        </main>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Branches);