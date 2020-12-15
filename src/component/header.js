import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText  } from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';

import SystemSettings from "../data/systemSettings.json"; 

const drawerWidth = 240;

const  useStyles = theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }
);

class Header extends React.Component {
  render() {
    const systemSettings = SystemSettings;
    const { classes } = this.props;

    const renderIcons = (param) => {
      switch(param) {
        case 0:
          return <TodayIcon />;
        case 1:
          return <PeopleIcon />;
        case 2:
          return <SupervisedUserCircleIcon />;
        case 3:
          return <AssessmentIcon />;
        case 4:
          return <SettingsIcon />;
        default:
          return <SupervisedUserCircleIcon />;
      }
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              {systemSettings.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
        }}>
          <Toolbar />
          <div className={classes.drawerContainer}>
            {
              systemSettings.headers.map((header, index) => {
                return (
                <div key={index}>
                  <List>
                    {
                      header.items.map((item, indexHeader) => {
                        return (
                          <ListItem button key={indexHeader} >
                            <ListItemIcon>{renderIcons(item.icon)}</ListItemIcon>
                            <ListItemText primary={item.title} />
                          </ListItem>
                        );
                      })
                    }
                  </List>
                  <Divider />
                </div>
                );
              })
            }
          </div>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(useStyles, { withTheme: true })(Header);