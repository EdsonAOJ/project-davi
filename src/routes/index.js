import React from 'react'

import { Switch, Router } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';


import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import history from '../services/history'







export const Routes = () => {
  return (
    <Router history={history}>
      <Switch>

        <PublicRoute exact path="/" component={Login} />

        <PrivateRoute exact path="/usuarios" component={Home} />

      </Switch>
    </Router>


  );
};
