import { Flex, Text } from '@chakra-ui/react';
import { formatToBRL } from 'brazilian-values';

export const CardProducts = ({ product, onClick }) => {
  return (
    <Flex
      minH="250px"
      w="270px"
      border="1px solid"
      borderColor={'#00ffae43'}
      p="3"
      flexDir={'column'}
      borderRadius="8px"
      align={'center'}
      _hover={{
        background: '#31d2a1',
        transform: 'scale(1.07)',
        color: 'white',
      }}
      onClick={() => onClick(product)}
      cursor="pointer"
      transition={'ease-in-out 0.2s'}
      gridGap={5}
    >
      <Flex w="100%" justify="space-between" h="5" align={'center'}>
        <Text fontSize={'sm'} maxW="180px" fontWeight={'semibold'} isTruncated>
          {product.name}
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
                <Text fontSize={'xs'}>Qtd:</Text>
                <Text
                  fontSize={'xs'}
                  maxW="180px"
                  fontWeight={'semibold'}
                  isTruncated
                >
                  {product.qntd}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex flexDir={'column'} justify="center">
            <Flex align={'center'} justify="center" gridGap="2">
              <Flex flexDir={'column'} w="100%">
                <Text fontSize={'xs'}>uM:</Text>
                <Text
                  fontSize={'xs'}
                  maxW="100px"
                  fontWeight={'semibold'}
                  isTruncated
                >
                  {product.uM}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex justify={'space-around'} w="100%">
          <Flex flexDir={'column'} justify="center">
            <Flex align={'center'} justify="center" gridGap="2">
              <Flex w="100%" flexDir={'column'}>
                <Text fontSize={'xs'}>Fornecedor:</Text>
                <Text
                  fontSize={'xs'}
                  maxW="100px"
                  fontWeight={'semibold'}
                  isTruncated
                >
                  {product.provider.name}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex flexDir={'column'} justify="center">
            <Flex align={'center'} justify="center" gridGap="2">
              <Flex flexDir={'column'} w="100%">
                <Text fontSize={'xs'}>Valor:</Text>
                <Text
                  fontSize={'xs'}
                  maxW="120px"
                  fontWeight={'semibold'}
                  isTruncated
                >
                  {formatToBRL(product.amount)}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
