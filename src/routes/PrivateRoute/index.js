import React, { useContext } from 'react'


import { Route, Redirect } from 'react-router-dom';

import PrivatePageLayout from '../../components/PrivatePageLayout';


import { Context } from '../../Context/authContext'


export const PrivateRoute = ({ component: Component, ...rest }) => {

  const { authenticated } = useContext(Context)

  if (!authenticated) {
    return <Redirect to='/' />
  }


  return (
    <Route
      {...rest}
      render={props => (
        <PrivatePageLayout>
          <Component {...props} />
        </PrivatePageLayout>
      )}
    />
  );
};
