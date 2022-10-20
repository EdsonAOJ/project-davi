import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Flex, useBreakpointValue, Text, Box } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '../../Context/authContext';
import { useSidebar } from '../../Context/sidebar';
// import logos from '../../shared/assets/images/Blue and Pink Abstract Grid Logo.svg';

import { SidebarNav } from '../sidebarNav'


export const SideBar = () => {
  const isDrawer = useBreakpointValue({
    base: true,
    lg: false
  })

  const { user } = useContext(Context)
  const { isOpen, onClose } = useSidebar()
  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href])


  if (isDrawer) {
    return (
      <Drawer isOpen={isOpen} placement='left' onClose={onClose} >
        <DrawerOverlay>
          <DrawerContent bg={'#4FBC9A'} p='2'>
            <DrawerCloseButton mt='6' />
            <DrawerHeader>
              <Flex w='100%' align={'center'} flexDir={'column'} justify={'center'} >

                <Flex mt='3' w='100%' align={'center'} justify={'center'}>
                  <Text fontSize={'md'} maxW='270px' isTruncated>
                    {user.email}
                  </Text>
                </Flex>
              </Flex>

            </DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as='aside' minW='25%' bg={'#11FFB8'} borderRadius={'0px  9px 9px 0px'}    >
      <SidebarNav />
    </Box>
  )



}
