import React from 'react';
import { Flex } from '@chakra-ui/react';
import { SideBar } from '../SideBar'


const PublicPageLayout = ({ children }) => {
  return (
    <Flex w='100%' minH='100vh' overflow={'hidden'}>
      <SideBar />
      <Flex pos={'relative'} m='6' flex='1' align={'center'} justify='center' w='100%'  >
        {children}
      </Flex>
    </Flex>
  )
};

export default PublicPageLayout;
