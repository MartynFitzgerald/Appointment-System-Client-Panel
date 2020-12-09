import React, { useState, useEffect }  from "react";
import { Route, Switch } from 'react-router-dom';
import './app.css';

import Header from "./header";
import Library from "./library";
import Error from "./error";


export default function App() {
  const [counter, setCounter] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => setCounter(counter + 1), 1000);
    localStorage.setItem('timer', counter)
    return () => clearInterval(timer);
  });
  
  return (
      <main className="main">
        <Header/>
        <Switch>
            <Route path="/" component={Library} exact />
            <Route component={Error} />
        </Switch>
      </main>
  )
}