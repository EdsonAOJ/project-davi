import { Flex, Text } from '@chakra-ui/react';
import { formatToPhone } from 'brazilian-values';
import history from '../../../services/history';

export const CardFornecedor = ({ id, name, email, phone, ddd }) => {
  return (
    <>
      <Flex
        minH="250px"
        w="250px"
        border="1px solid"
        borderColor={'#11FFB8'}
        p="3"
        flexDir={'column'}
        borderRadius="4px"
        align={'center'}
        _hover={{
          background: '#00ffae43',
        }}
        onClick={() => history.push(`/providers/management/${id}`)}
        cursor="pointer"
        transition={'ease-in-out 0.2s'}
        gridGap={5}
      >
        <Flex w="100%" justify="space-between" h="5" align={'center'}>
          <Text
            fontSize={'sm'}
            maxW="180px"
            fontWeight={'semibold'}
            isTruncated
          >
            {name}
          </Text>
        </Flex>

        <Flex w="90%" flexDir={'column'} h="100%" justify={'space-around'}>
          <Flex flexDir={'column'} justify="center">
            <Flex align={'center'} justify="center" gridGap="2">
              {/* <Flex w="20%"><Icon as={FaCartPlus} h="6" w="6" /></Flex> */}
              <Flex w="100%" flexDir={'column'}>
                <Text fontSize={'xs'}>Email:</Text>
                <Text
                  fontSize={'xs'}
                  maxW="180px"
                  fontWeight={'semibold'}
                  isTruncated
                >
                  {email}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex flexDir={'column'} justify="center">
            <Flex align={'center'} justify="center" gridGap="2">
              <Flex flexDir={'column'} w="100%">
                <Text fontSize={'xs'}>Telefone:</Text>
                <Text
                  fontSize={'xs'}
                  maxW="180px"
                  fontWeight={'semibold'}
                  isTruncated
                >
                  {formatToPhone(`${ddd}${phone}`)}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
