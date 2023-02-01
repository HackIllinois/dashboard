import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from 'Dashboard';

import 'index.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
