import React, { useState, useEffect }  from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';

import Header from "./header";
import Error from "./error";
import Appointments from "./tabs/appointments";
import Customer from "./tabs/appointments";
import Staff from "./tabs/appointments";
import SystemManager from "./tabs/appointments";
import Reports from "./tabs/appointments";
import Administrators from "./tabs/appointments";

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  main: {
    margin: '0',
    height: '100%',
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
    <Switch>
      <div className={classes.root}>
        <Header/>
        <main className={classes.main}>
            <Route path="/appointments" component={Appointments} exact />
            <Route path="/customer" component={Customer} exact />
            <Route path="/staff" component={Staff} exact />
            <Route path="/system-manager" component={SystemManager} exact />
            <Route path="/reports" component={Reports} exact />
            <Route path="/administrators" component={Administrators} exact />
            <Route component={Error} />
        </main>
      </div>
    </Switch>
  )
}