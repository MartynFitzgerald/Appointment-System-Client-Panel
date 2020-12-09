import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'fontsource-roboto';

import App from "./component/app";

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>, 
    document.getElementById('root')
)