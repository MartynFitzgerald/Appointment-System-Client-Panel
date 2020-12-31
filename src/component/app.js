import React, { useState, useEffect }  from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, Redirect } from 'react-router-dom';

import 'fontsource-roboto';

import Header from "./header";
import Error from "./error";
import Appointments from "./tabs/appointments";
import Customers from "./tabs/customers";
import StaffMembers from "./tabs/staffMembers";
import SystemSettings from "./tabs/systemSettings";
import UserSettings from "./tabs/userSettings";
import Reports from "./tabs/reports";

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  main: {
    margin: '0',
    height: '100%',
    width: '100%',
  },
});

export default function App() {
  const [counter, setCounter] = useState(0);
  const classes = useStyles();
  
  useEffect(() => {
    const timer = setInterval(() => setCounter(counter + 1), 1000);
    localStorage.setItem('timer', counter)
    return () => clearInterval(timer);
  });
  
  return (
      <div className={classes.root}>
        <Header/>
        <main className={classes.main}>
          <Switch>
            <Route path="/appointments" component={Appointments} exact />
            <Route path="/customers" component={Customers} exact />
            <Route path="/staff-members" component={StaffMembers} exact />
            <Route path="/system-settings" component={SystemSettings} exact />
            <Route path="/user-settings" component={UserSettings} exact />
            <Route path="/reports" component={Reports} exact />
            <Route component={Error} />
          </Switch>
        </main>
        <Redirect exact to="/appointments" />
      </div>
  )
}