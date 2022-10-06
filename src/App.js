import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './shared/theme/theme'

import { Routes } from './routes';
import { SideBarProvider } from './Context/sidebar'


import { AuthProvider } from './Context/authContext'

export const App = () => {
  return (
    <SideBarProvider>
      <AuthProvider>

        <ChakraProvider theme={theme}>
          <Routes />
        </ChakraProvider>

      </AuthProvider>
    </SideBarProvider>
  );
};
