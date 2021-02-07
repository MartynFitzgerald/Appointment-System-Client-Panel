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
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'address', headerName: 'Address', width: 400 },
  { field: 'latitude', headerName: 'Latitude', width: 100 },
  { field: 'longitude', headerName: 'Longitude', width: 100 },
  { field: 'last_updated_at', headerName: 'Last Updated At', width: 200 }
];

const rows = [
  { id: 1, name: 'Bosco LLC', address: '9672 Mante Row Apt. 575 North Bryana, MA 37759', latitude: '50.4', 	longitude: '-2.4', last_updated_at: '21-12-2020 22:21:35' },
  { id: 2, name: 'Bosco LLC', address: '9672 Mante Row Apt. 575 North Bryana, MA 37759', latitude: '50.4', 	longitude: '-2.4', last_updated_at: '21-12-2020 22:21:35' },
  { id: 3, name: 'Bosco LLC', address: '9672 Mante Row Apt. 575 North Bryana, MA 37759', latitude: '50.4', 	longitude: '-2.4', last_updated_at: '21-12-2020 22:21:35' },
];

class Branches extends React.Component {
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

export default withStyles(useStyles, { withTheme: true })(Branches);