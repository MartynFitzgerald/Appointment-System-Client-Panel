import React, { useState, useEffect }  from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import './app.css';

import Header from "./header";
import Library from "./library";
import Error from "./error";

const useStyles = makeStyles({
  root: {
    display: 'flex',
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
      <main className="main">
        <Switch>
            <Route path="/" component={Library} exact />
            <Route component={Error} />
        </Switch>
      </main>
    </div>
  )
}