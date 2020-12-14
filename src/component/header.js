import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText  } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import SystemVariables from "../data/systemVariables.json"; 

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
    const systemVariables = SystemVariables;
    const { classes } = this.props;

    const renderIcons = (param) => {
      switch(param) {
        case 0:
          return <InboxIcon />;
        case 1:
          return <MailIcon />;
        default:
          return <MailIcon />;
      }
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              {systemVariables.name}
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
              systemVariables.headers.map((header, index) => {
                return (
                <div key={index}>
                  <List>
                    {
                      header.items.map((item, indexHeader) => {
                        return (
                          <ListItem button key={indexHeader}>
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