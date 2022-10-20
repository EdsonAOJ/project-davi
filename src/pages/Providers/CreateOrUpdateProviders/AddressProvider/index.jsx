import { Flex, Input, Text } from '@chakra-ui/react';

export const AddressProvider = ({ addresses, handleChangeProvider }) => {
  return (
    <>
      <Flex>
        <Text fontWeight={'semibold'} fontSize="">
          - Endereço
        </Text>
      </Flex>
      <Flex justify={'space-between'} flexWrap="wrap" gridGap="3">
        <Flex flexDir={'column'} w="45%">
          <Text>Rua: </Text>

          <Input
            fontSize={'1rem'}
            color="black"
            type={'text'}
            autoComplete="off"
            name="street"
            value={addresses.street}
            onChange={e => handleChangeProvider(e, false, true)}
            placeholder="Digite o nome da rua"
            borderColor={'#11FFB8'}
            focusBorderColor={'#11FFB8'}
          />
        </Flex>
        <Flex flexDir={'column'} w="45%">
          <Text>Cidade: </Text>

          <Input
            fontSize={'1rem'}
            color="black"
            type={'text'}
            autoComplete="off"
            name="city"
            value={addresses.city}
            onChange={e => handleChangeProvider(e, false, true)}
            placeholder="Digite o nome da cidade"
            borderColor={'#11FFB8'}
            focusBorderColor={'#11FFB8'}
          />
        </Flex>
        <Flex flexDir={'column'} w="45%">
          <Text>Número: </Text>

          <Input
            fontSize={'1rem'}
            color="black"
            type={'number'}
            autoComplete="off"
            name="number"
            value={addresses.number}
            onChange={e => handleChangeProvider(e, false, true)}
            placeholder="Digite o número da rua"
            borderColor={'#11FFB8'}
            focusBorderColor={'#11FFB8'}
          />
        </Flex>
        <Flex flexDir={'column'} w="45%">
          <Text>Distrito: </Text>

          <Input
            fontSize={'1rem'}
            color="black"
            type={'text'}
            autoComplete="off"
            name="district"
            value={addresses.district}
            onChange={e => handleChangeProvider(e, false, true)}
            placeholder="Digite o distrito"
            borderColor={'#11FFB8'}
            focusBorderColor={'#11FFB8'}
          />
        </Flex>
        <Flex flexDir={'column'} w="45%">
          <Text>Cep: </Text>

          <Input
            fontSize={'1rem'}
            color="black"
            type={'number'}
            autoComplete="off"
            name="zipCode"
            value={addresses.zipCode}
            onChange={e => handleChangeProvider(e, false, true)}
            placeholder="Digite o cep"
            borderColor={'#11FFB8'}
            focusBorderColor={'#11FFB8'}
          />
        </Flex>
        <Flex flexDir={'column'} w="45%">
          <Text>Estado: </Text>

          <Input
            fontSize={'1rem'}
            color="black"
            type={'text'}
            autoComplete="off"
            name="state"
            value={addresses.state}
            onChange={e => handleChangeProvider(e, false, true)}
            placeholder="Digite o estado"
            borderColor={'#11FFB8'}
            focusBorderColor={'#11FFB8'}
          />
        </Flex>
      </Flex>{' '}
    </>
  );
};
