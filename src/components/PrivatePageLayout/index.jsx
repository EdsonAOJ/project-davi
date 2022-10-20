import React from 'react';

import { Header } from '../../components/Header';

import { Flex } from '@chakra-ui/layout';
import { SideBar } from '../SideBar';

const PrivatePageLayout = ({ children }) => {
  return (
    <>
      <Flex w='100%' minH='100vh' overflow={'hidden'}>
        <SideBar />

        <Flex pos={'relative'} w='100%' m='6' flex='1' align={'center'} justify='center' flexDir={'column'} >
          <Flex w='100%' >
            <Header />
          </Flex>
          {children}
        </Flex>
      </Flex>
    </>
  );
};

export default PrivatePageLayout;
