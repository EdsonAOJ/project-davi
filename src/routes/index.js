import React from 'react'

import { Switch, Router } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';


import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import history from '../services/history'
import { Providers } from '../pages/Providers';
import { CreateOrUpdateProviders } from '../pages/Providers/CreateOrUpdateProviders';
import { Products } from '../pages/Products';





export const Routes = () => {
  return (
    <Router history={history}>
      <Switch>

        <PublicRoute exact path="/" component={Login} />

        <PrivateRoute exact path="/users" component={Home} />
        <PrivateRoute exact path="/providers" component={Providers} />
        <PrivateRoute exact path="/providers/management/:id" component={CreateOrUpdateProviders} />
        <PrivateRoute exact path="/products" component={Products} />

        <PrivateRoute exact path="*" component={Products} />
      </Switch>
    </Router>


  );
};
