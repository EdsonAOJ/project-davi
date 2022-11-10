import React from 'react'

import { Switch, Router } from 'react-router-dom';
import { Login } from '../pages/Login';


import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import history from '../services/history'
import { Providers } from '../pages/Providers';
import { CreateOrUpdateProviders } from '../pages/Providers/CreateOrUpdateProviders';
import { Products } from '../pages/Products';
import { Properties } from '../pages/Properties';
import { CreateOrUpdateProperties } from '../pages/Properties/CreateOrUpdateProperties';
import { Users } from '../pages/Users';
import { Clients } from '../pages/Clients';
import { Talhao } from '../pages/Talhao';
import { Purchase } from '../pages/Purchase';
import { Application } from '../pages/Application';
import { Report } from '../pages/Report';





export const Routes = () => {
  return (
    <Router history={history}>
      <Switch>

        <PublicRoute exact path="/" component={Login} />

        <PrivateRoute exact path="/users" component={Users} />

        <PrivateRoute exact path="/providers" component={Providers} />
        <PrivateRoute exact path="/providers/management/:id" component={CreateOrUpdateProviders} />

        <PrivateRoute exact path="/products" component={Products} />

        <PrivateRoute exact path="/properties" component={Properties} />
        <PrivateRoute exact path="/properties/management/:id" component={CreateOrUpdateProperties} />

        <PrivateRoute exact path="/clients" component={Clients} />

        <PrivateRoute exact path="/talhao" component={Talhao} />

        <PrivateRoute exact path="/purchase" component={Purchase} />

        <PrivateRoute exact path="/application" component={Application} />

        <PrivateRoute exact path="/report" component={Report} />

        <PrivateRoute exact path="*" component={Products} />
      </Switch>
    </Router>


  );
};
