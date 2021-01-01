import React from "react";
import { withStyles, Typography, Toolbar, Grid, Button, Paper } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Delete, Add, Edit } from '@material-ui/icons';

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
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 200 },
  { field: 'lastName', headerName: 'Last name', width: 200 },
  { field: 'email', headerName: 'Email', width: 350 },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 200 },
  { field: 'permissionLevel', headerName: 'Permission Level', width: 200 }
];

const rows = [
  { id: 1, firstName: 'Jon', lastName: 'Snow',  email: 'Jon.Snow@hotmail.com', phoneNumber: '07123 231323', permissionLevel: '1' },
  { id: 2, firstName: 'Billy', lastName: 'Klen',  email: 'Billy.Klen@hotmail.com', phoneNumber: '07932 645343', permissionLevel: '2' },
  { id: 3, firstName: 'Martyn', lastName: 'Fitzgerald',  email: 'Martyn.Fitz@hotmail.com', phoneNumber: '07212 112233', permissionLevel: '3' },
  { id: 4, firstName: 'Rudi', lastName: 'Tode',  email: 'Rudi.Tode@hotmail.com', phoneNumber: '07212 112233', permissionLevel: '3' },
  { id: 5, firstName: 'Billy', lastName: 'Klen',  email: 'Billy.Klen@hotmail.com', phoneNumber: '07932 645343', permissionLevel: '2' },
  { id: 6, firstName: 'Jon', lastName: 'Snow',  email: 'Jon.Snow@hotmail.com', phoneNumber: '07123 231323', permissionLevel: '1' },
  { id: 7, firstName: 'Martyn', lastName: 'Fitzgerald',  email: 'Martyn.Fitzgerald@hotmail.com', phoneNumber: '07212 112233', permissionLevel: '3' },
  { id: 8, firstName: 'Rudi', lastName: 'White',  email: 'Rudi.Tode@hotmail.com', phoneNumber: '07212 112233', permissionLevel: '3' },
  { id: 9, firstName: 'Martyn', lastName: 'Fitzgerald',  email: 'Martyn.Fitzgerald@hotmail.com', phoneNumber: '07212 112233', permissionLevel: '3' },
  { id: 10, firstName: 'Rudi', lastName: 'Tode',  email: 'Rudi.Tode@hotmail.com', phoneNumber: '07212 112233', permissionLevel: '3' },
  { id: 11, firstName: 'Martyn', lastName: 'Fitzgerald',  email: 'Martyn.Fitzgerald@hotmail.com', phoneNumber: '07212 112233', permissionLevel: '3' },
  { id: 12, firstName: 'Rudi', lastName: 'White',  email: 'Rudi.Tode@hotmail.com', phoneNumber: '07212 112233', permissionLevel: '3' },
  { id: 13, firstName: 'Martyn', lastName: 'Fitzgerald',  email: 'Martyn.Fitzgerald@hotmail.com', phoneNumber: '07212 112233', permissionLevel: '3' },
  { id: 14, firstName: 'Rudi', lastName: 'Tode',  email: 'Rudi.Tode@hotmail.com', phoneNumber: '07212 112233', permissionLevel: '3' },
];

class StaffMembers extends React.Component {
  render() {
    const { classes } = this.props;

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
                <div style={{ height: 650, width: '100%' }}>
                  <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </main> 
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(StaffMembers);