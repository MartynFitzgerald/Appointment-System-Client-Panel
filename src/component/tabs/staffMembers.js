import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Typography, Toolbar, Grid, Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

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
          <Grid container spacing={1}>
            <Grid container xs={12} sm={6}>
              <Typography variant="h4" gutterBottom>
                Staff Members
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
                startIcon={<SaveIcon />}
              >
                Save
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
              <div style={{ height: 650, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
              </div>
            </Grid>
          </Grid>
        </main> 
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(StaffMembers);