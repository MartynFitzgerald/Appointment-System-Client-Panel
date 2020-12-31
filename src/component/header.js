import React from "react";
import { withStyles, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText  } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Today, Person, SupervisedUserCircle, Settings, Assessment, PeopleAlt } from '@material-ui/icons';

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
          return <Today />;
        case 1:
          return <PeopleAlt />;
        case 2:
          return <SupervisedUserCircle />;
        case 3:
          return <Assessment />;
        case 4:
          return <Person />;
        case 5:
          return <Settings />;
        default:
          return <SupervisedUserCircle />;
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
                          <ListItem button key={indexHeader} component={Link} to={item.route} >
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