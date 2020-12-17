import React, { useState, useEffect }  from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';

import 'fontsource-roboto';

import Header from "./header";
import Error from "./error";
import Appointments from "./tabs/appointments";
import Customers from "./tabs/customers";
import StaffMembers from "./tabs/staffMembers";
import SystemManager from "./tabs/systemManager";
import Reports from "./tabs/reports";
import Administrators from "./tabs/appointments";

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
            <Route path="/system-manager" component={SystemManager} exact />
            <Route path="/reports" component={Reports} exact />
            <Route path="/administrators" component={Administrators} exact />
            <Route component={Error} />
          </Switch>
        </main>
      </div>
  )
}