import React from "react";
import { withStyles, Typography, Toolbar, Grid, Button, Paper } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Delete, Add, Edit } from '@material-ui/icons';

import apiMethods from '../apiMethods';

const useStyles = theme => ({
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
  { field: 'email_address', headerName: 'Email Address', width: 350 },
  { field: 'phone_number', headerName: 'Phone Number', width: 200 },
  { field: 'last_updated_at', headerName: 'Last Updated At', width: 200 }
];

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isFetching: true,
        users: []
    };
  }

  componentDidMount() {
    this.fetchUsers();
    this.timer = setInterval(() => this.fetchUsers(), 1000 * 60 * 15); // 15 minutes
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  fetchUsers = () => {
    //Fetch Car Parks From API.
    apiMethods.read(`USERS`)
    .then((users) => {
      this.setState({...this.state, isFetching: true});
      this.setState({...this.state, users: users});
    });
  }

  render() {
    const { classes } = this.props;
    const { users } = this.state;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Toolbar />
          <Grid container  direction="column" spacing={1} >

            <Grid container direction="row" justify="center" alignItems="center" >
              <Grid item xs={6} sm={6} >
                <Typography variant="h5">
                  Customers
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} >
                <div className={classes.right}>
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
                </div>
              </Grid>
            </Grid>
            
            <Grid item xs={12}>
              <Paper elevation={3} >
                <div style={{ height: '80vh', width: '100%' }}>
                  <DataGrid rows={users} columns={columns} pageSize={12} checkboxSelection />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </main> 
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Customers);