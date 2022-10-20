import { Flex } from '@chakra-ui/layout';

export const Card = ({ children, ...reset }) => {


  return (
    <Flex alignItems="center" justifyContent="center" height={'100%'} w='100%'>
      <Flex
        direction="column"
        background={'#63EDC3'}
        w={[350, 600, 700]}
        p={4}
        {...reset}
        rounded={6}
      >
        {children}
      </Flex>
    </Flex>
  );
};
