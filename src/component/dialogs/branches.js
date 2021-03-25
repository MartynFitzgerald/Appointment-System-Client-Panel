import React from "react";
import { withStyles, Typography, Button, Select, MenuItem, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, FormControl, InputLabel } from '@material-ui/core';
import { Delete, Add, Edit, Close } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';

import apiMethods from '../apiMethods';

const  useStyles = theme => ({
  dialog: {
    minWidth: 800
  },
  center: {
    textAlign: 'center'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
});

class Branches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: this.props.action !== 'Add' ? this.props.selectedItems : [{ "name": "", "address": "", "latitude": "", "longitude": "" }],
      selection: 0
    };
  }

  add = () => {
    const { close } = this.props;
    const { selectedItems } = this.state;

    selectedItems.forEach((x) => {
      let data = {
        id:  uuidv4(),
        name: x.name,
        address: x.address,
        latitude: x.latitude,
        longitude: x.longitude,
        last_updated_at: new Date()
      };


      apiMethods.create(`BRANCH`, data)
      .then((result) => {
        if (result.status !== 200) {
          console.error(`Status: `, result.status, `Message: `, result.message,);
        } else {
          this.setState({selectedItems: []});
          close();
        }
      });
    });
  }
  
  modify = () => {
    const { close } = this.props;
    const { selectedItems } = this.state;

    selectedItems.forEach((x) => {
      let data = {
        id: x.id,
        name: x.name,
        address: x.address,
        latitude: x.latitude,
        longitude: x.longitude,
        last_updated_at: new Date()
      };

      apiMethods.update(`BRANCH`, data)
      .then((result) => {
        if (result.status !== 200) {
          console.error(`Status: `, result.status, `Message: `, result.message);
        } else {
          this.setState({selectedItems: []});
          close();
        }
      });
    });
  }

  remove = () => {
    const { close } = this.props;
    const { selectedItems } = this.state;

    selectedItems.forEach((x) => {
      let data = { id: x.id };

      apiMethods.delete(`BRANCH`, data)
      .then((result) => {
        if (result.status !== 200) {
          console.error(`Status: `, result.status, `Message: `, result.message);
        } else {
          this.setState({selectedItems: []});
          close();
        }
      });
    });
  }

  renderForm = () => {
    const { classes, action } = this.props;
    const { selectedItems, selection } = this.state;
  
    switch (action) {
      case 'Add': 
      case 'Modify':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" style={{ paddingBottom: 5 }}>Name</Typography>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="name"
                label="E.g. Apollo"
                type="text"
                value={selectedItems[selection].name}
                onChange={(e) => {
                  selectedItems[selection].name = e.target.value;
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" style={{ paddingBottom: 5 }}>Address</Typography>
              <TextField
                variant="outlined"
                margin="dense"
                id="address"
                label="E.g. Bristol"
                type="text"
                value={selectedItems[selection].address}
                onChange={(e) => {
                  selectedItems[selection].address = e.target.value;
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" style={{ paddingBottom: 5 }}>Latitude</Typography>
              <TextField
                variant="outlined"
                margin="dense"
                id="latitude"
                label="E.g. 50.4"
                type="number"
                value={selectedItems[selection].latitude}
                onChange={(e) => {
                  selectedItems[selection].latitude = e.target.value;
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" style={{ paddingBottom: 5 }}>Longitude</Typography>
              <TextField
                variant="outlined"
                margin="dense"
                id="longitude"
                label="E.g. -2.6"
                type="number"
                value={selectedItems[selection].longitude}
                onChange={(e) => {
                  selectedItems[selection].longitude = e.target.value;
                }}
                fullWidth
              />
            </Grid>
          </Grid>);
      case 'Remove':
        return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.center} variant="body1">Are you sure you would like to remove <b>{selectedItems.map(x => x.name).join(', ')}</b> branches from the system?</Typography>
          </Grid>
        </Grid>);
      default:
        return;
    }
  }
  
  renderButton = () => {
    const { classes, action } = this.props;
    switch(action) {
      case 'Add':
        return (<Button variant="contained" color="default" className={classes.button} startIcon={<Add />} onClick={this.add}>{action}</Button>);
      case 'Modify':
          return (<Button variant="contained" color="primary" className={classes.button} startIcon={<Edit />} onClick={this.modify}>{action}</Button>);
      case 'Remove':
        return (<Button variant="contained" color="secondary" className={classes.button} startIcon={<Delete />} onClick={this.remove}>{action}</Button>);
      default:
        return;
    }
  }
  
  renderHeader = () => {
    const { classes, action, selectedItems } = this.props;
    const { selection } = this.state;

    if (action === 'Modify') {
      if (selectedItems.length > 1) {
        return (
        <Grid container direction="row" justify="center" alignItems="center" >
          <Grid item xs={6} sm={6}>
            <DialogTitle id="form-dialog-title" aria-labelledby="form-dialog-title">{action} Branch</DialogTitle>
          </Grid>
          <Grid item xs={6} sm={6} style={{textAlign: "center"}}>
            <FormControl variant="outlined" size="small" className={classes.formControl}>
              <InputLabel id="branch-dropdown-label">Branch</InputLabel>
                <Select
                  labelId="branch-dropdown-label"
                  id="branch-dropdown"
                  value={selectedItems[selection]}
                  onChange={(e) => { 
                    this.setState({selection: selectedItems.indexOf(e.target.value)});
                  }}
                  renderValue={(x) => x.name}
                  label="Branches"
                  size="small"
                >
                  {
                    selectedItems.map((x) => <MenuItem key={x.id} value={x}>{x.name}</MenuItem>)
                  }
                </Select>
            </FormControl>
          </Grid>
        </Grid>);
      }
    }
    
    return (
      <Grid container direction="row" justify="center" alignItems="center" >
        <Grid item xs={12} sm={12}>
          <DialogTitle id="form-dialog-title" aria-labelledby="form-dialog-title">{action} Branch</DialogTitle>
        </Grid>
      </Grid>);
  }

  render() {
    const { classes, showDialog, close, action, selectedItems } = this.props;

    if (selectedItems.length > 0) {
      return (
        <Dialog open={showDialog} onClose={close} onEnter={() => { this.setState({selectedItems: [...selectedItems]}) }} fullWidth>
          {this.renderHeader()}
          <Divider/>
          <DialogContent>
            {this.renderForm()}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="default" startIcon={<Close />} onClick={close}>
              Cancel
            </Button>
            {this.renderButton(classes, action, close)}
          </DialogActions>
        </Dialog>
      );
    } else {
      return (
        <Dialog open={showDialog} onClose={close} fullWidth>
        </Dialog>
      );
    }
  }
}

export default withStyles(useStyles, { withTheme: true })(Branches);