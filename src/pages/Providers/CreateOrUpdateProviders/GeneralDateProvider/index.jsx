import { Flex, Input, Text } from '@chakra-ui/react';

export const GeneralDateProvider = ({
  provider,
  phone,
  handleChangeProvider,
}) => {
  return (
    <>
      <Flex>
        <Text fontWeight={'semibold'} fontSize="">
          - Dados gerais
        </Text>
      </Flex>
      <Flex justify={'space-between'} flexWrap="wrap" gridGap="3">
        <Flex flexDir={'column'} w="45%">
          <Text>Email: </Text>

          <Input
            fontSize={'1rem'}
            color="black"
            type={'email'}
            autoComplete="off"
            name="email"
            value={provider.email}
            onChange={e => handleChangeProvider(e, false, false)}
            placeholder="Digite o email"
            borderColor={'#11FFB8'}
            focusBorderColor={'#11FFB8'}
          />
        </Flex>
        <Flex flexDir={'column'} w="45%">
          <Text>Nome: </Text>

          <Input
            fontSize={'1rem'}
            color="black"
            type={'text'}
            autoComplete="off"
            name="name"
            value={provider.name}
            onChange={e => handleChangeProvider(e, false, false)}
            placeholder="Digite o nome"
            borderColor={'#11FFB8'}
            focusBorderColor={'#11FFB8'}
          />
        </Flex>{' '}
        <Flex flexDir={'column'} w="45%">
          <Text>CNPJ: </Text>

          <Input
            fontSize={'1rem'}
            color="black"
            type={'number'}
            autoComplete="off"
            name="cnpj"
            value={provider.cnpj}
            onChange={e => handleChangeProvider(e, false, false)}
            placeholder="Digite o cnpj"
            borderColor={'#11FFB8'}
            focusBorderColor={'#11FFB8'}
          />
        </Flex>{' '}
        <Flex flexDir={'column'} w="45%">
          <Text>Insc_state: </Text>

          <Input
            fontSize={'1rem'}
            color="black"
            type={'number'}
            autoComplete="off"
            name="insc_state"
            value={provider.insc_state}
            onChange={e => handleChangeProvider(e, false, false)}
            placeholder="Digite o insc_state"
            borderColor={'#11FFB8'}
            focusBorderColor={'#11FFB8'}
          />
        </Flex>{' '}
        <Flex flexDir={'column'} w="45%">
          <Text>Telefone: </Text>

          <Flex gridGap="1rem">
            <Input
              fontSize={'1rem'}
              w="5rem"
              color="black"
              type={'number'}
              autoComplete="off"
              name="ddd"
              value={phone.ddd}
              onChange={e => handleChangeProvider(e, true, false)}
              placeholder="Digite o ddd"
              borderColor={'#11FFB8'}
              focusBorderColor={'#11FFB8'}
            />

            <Input
              fontSize={'1rem'}
              color="black"
              type={'text'}
              autoComplete="off"
              name="number"
              value={phone.number}
              onChange={e => handleChangeProvider(e, true, false)}
              placeholder="Digite o numero"
              borderColor={'#11FFB8'}
              focusBorderColor={'#11FFB8'}
            />
          </Flex>
        </Flex>{' '}
      </Flex>
    </>
  );
};
