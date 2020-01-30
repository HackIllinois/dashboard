import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Message from 'components/Message';
import NavBar from 'components/NavBar';

import Dashboard from 'Dashboard';

import 'index.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Dashboard} />

      <Route component={() => <><NavBar /><Message title="404 Not Found" /></>} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
