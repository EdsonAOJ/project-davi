import { Flex, Input, Select, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useCallback, useEffect } from 'react';
import { api } from '../../../../services/api/api';

export const ClientsProvider = ({ nameAndClient, handleChangeProvider }) => {
  const [clients, setClients] = useState([]);
  const toast = useToast();

  const handleGetClients = useCallback(async () => {
    try {
      const response = await api.get(`/clients`);
      setClients(response.data.result);
    } catch (err) {
      return toast({
        title: `Erro ao buscar os dados dos fornecedores!`,
        status: 'error',
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    handleGetClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Flex>
        <Text fontWeight={'semibold'} fontSize="">
          - Dados
        </Text>
      </Flex>
      <Flex justify={'space-between'} flexWrap="wrap" gridGap="3">
        <Flex flexDir={'column'} w="45%">
          <Text>Nome: </Text>

          <Input
            fontSize={'1rem'}
            color="black"
            type={'text'}
            autoComplete="off"
            name="name"
            value={nameAndClient.name}
            onChange={e => handleChangeProvider(e, true, false)}
            placeholder="Digite o nome"
            borderColor={'#11FFB8'}
            focusBorderColor={'#11FFB8'}
          />
        </Flex>
        <Flex flexDir={'column'} w="45%">
          <Text>Cliente: </Text>

          <Select
            placeholder={'Selecione uma opção'}
            bg="white"
            onChange={e => handleChangeProvider(e, true, false)}
            name="clientId"
            borderColor={'#11FFB8'}
            focusBorderColor={'#11FFB8'}
          >
            {clients?.map((item, key) => (
              <option
                value={item.id}
                key={key}
                selected={item?.id === nameAndClient.clientId}
              >
                {item.name}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </>
  );
};
