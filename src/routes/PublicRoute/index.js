import React, { useContext } from 'react'

import { Redirect, Route } from 'react-router-dom';

import PublicPageLayout from '../../components/PublicPageLayout';

import { Context } from '../../Context/authContext'


export const PublicRoute = ({ component: Component, ...rest }) => {

  const { authenticated } = useContext(Context)


  if (authenticated) {
    return <Redirect to='/home' />
  }


  return (
    <Route
      {...rest}
      render={props => (
        <PublicPageLayout>
          <Component {...props} />
        </PublicPageLayout>
      )}
    />
  );
};
