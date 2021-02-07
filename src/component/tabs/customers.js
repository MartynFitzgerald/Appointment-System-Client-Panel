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
  { field: 'first_name', headerName: 'First name', width: 200 },
  { field: 'last_name', headerName: 'Last name', width: 200 },
  { field: 'email_address', headerName: 'Email Address', width: 350 },
  { field: 'phone_number', headerName: 'Phone Number', width: 200 },
  { field: 'last_updated_at', headerName: 'Last Updated At', width: 200 }
];

const rows = [
  { id: 1, first_name: 'Jon', last_name: 'Snow',  email_address: 'Jon.Snow@hotmail.com', phone_number: '07123 231323', last_updated_at: '21-12-2020 22:21:35' },
  { id: 2, first_name: 'Billy', last_name: 'Klen',  email_address: 'Billy.Klen@hotmail.com', phone_number: '07932 645343', last_updated_at: '21-12-2020 22:21:35' },
  { id: 3, first_name: 'Martyn', last_name: 'Fitzgerald',  email_address: 'Martyn.Fitz@hotmail.com', phone_number: '07212 112233', last_updated_at: '21-12-2020 22:21:35' },
  { id: 4, first_name: 'Rudi', last_name: 'Tode',  email_address: 'Rudi.Tode@hotmail.com', phone_number: '07212 112233', last_updated_at: '21-12-2020 22:21:35' },
  { id: 5, first_name: 'Billy', last_name: 'Klen',  email_address: 'Billy.Klen@hotmail.com', phone_number: '07932 645343', permission_level: '2', last_updated_at: '21-12-2020 22:21:35' },
  { id: 6, first_name: 'Jon', last_name: 'Snow',  email_address: 'Jon.Snow@hotmail.com', phone_number: '07123 231323', permission_level: '1', last_updated_at: '21-12-2020 22:21:35' },
  { id: 7, first_name: 'Martyn', last_name: 'Fitzgerald',  email_address: 'Martyn.Fitzgerald@hotmail.com', phone_number: '07212 112233', last_updated_at: '21-12-2020 22:21:35' },
  { id: 8, first_name: 'Rudi', last_name: 'White',  email_address: 'Rudi.Tode@hotmail.com', phone_number: '07212 112233', last_updated_at: '21-12-2020 22:21:35' },
  { id: 9, first_name: 'Martyn', last_name: 'Fitzgerald',  email_address: 'Martyn.Fitzgerald@hotmail.com', phone_number: '07212 112233', last_updated_at: '21-12-2020 22:21:35' },
  { id: 10, first_name: 'Rudi', last_name: 'Tode',  email_address: 'Rudi.Tode@hotmail.com', phone_number: '07212 112233', last_updated_at: '21-12-2020 22:21:35' },
  { id: 11, first_name: 'Martyn', last_name: 'Fitzgerald',  email_address: 'Martyn.Fitzgerald@hotmail.com', phone_number: '07212 112233', last_updated_at: '21-12-2020 22:21:35' },
  { id: 12, first_name: 'Rudi', last_name: 'White',  email_address: 'Rudi.Tode@hotmail.com', phone_number: '07212 112233', last_updated_at: '21-12-2020 22:21:35' },
  { id: 13, first_name: 'Martyn', last_name: 'Fitzgerald',  email_address: 'Martyn.Fitzgerald@hotmail.com', phone_number: '07212 112233', last_updated_at: '21-12-2020 22:21:35' },
  { id: 14, first_name: 'Rudi', last_name: 'Tode',  email_address: 'Rudi.Tode@hotmail.com', phone_number: '07212 112233', last_updated_at: '21-12-2020 22:21:35' },
];

class Customers extends React.Component {
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
                  <DataGrid rows={rows} columns={columns} pageSize={12} checkboxSelection />
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