import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Home} />
        </div>
    </BrowserRouter>
    , document.getElementById('root')
);
serviceWorker.unregister();
