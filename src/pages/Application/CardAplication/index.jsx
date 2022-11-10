import { Flex, Text } from '@chakra-ui/react';
import { formatToDate } from 'brazilian-values';

export const CardAplication = ({ application }) => {
  return (
    <Flex
      minH="220px"
      w="260px"
      border="1px solid"
      borderColor={'#00ffae43'}
      p="3"
      flexDir={'column'}
      borderRadius="8px"
      align={'center'}
      _hover={{
        background: '#31d2a1',
        transform: 'scale(1.01)',
        color: 'white',
      }}
      // onClick={() => onClick(product)}
      cursor="pointer"
      transition={'ease-in-out 0.2s'}
      gridGap={5}
    >
      <Flex w="100%" justify="space-between" h="5" align={'center'}>
        <Text fontSize={'sm'} maxW="180px" fontWeight={'semibold'} isTruncated>
          {application?.product?.name}
        </Text>
      </Flex>
      <Flex
        flexDir={'column'}
        h="100%"
        w="90%"
        justify={'space-around'}
        align="center"
      >
        <Flex justify={'space-around'} w="100%">
          <Flex flexDir={'column'} justify="center">
            <Flex align={'center'} justify="center" gridGap="2">
              <Flex w="100%" flexDir={'column'}>
                <Text fontSize={'xs'}>Data:</Text>
                <Text
                  fontSize={'xs'}
                  maxW="180px"
                  fontWeight={'semibold'}
                  isTruncated
                >
                  {formatToDate(new Date(application?.applicationDate))}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDir={'column'} justify="center">
            <Flex align={'center'} justify="center" gridGap="2">
              <Flex w="100%" flexDir={'column'}>
                <Text fontSize={'xs'}>Quantidade:</Text>
                <Text
                  fontSize={'xs'}
                  maxW="100px"
                  fontWeight={'semibold'}
                  isTruncated
                >
                  {application?.qntd}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex justify={'space-around'} w="100%"></Flex>
      </Flex>
    </Flex>
  );
};
