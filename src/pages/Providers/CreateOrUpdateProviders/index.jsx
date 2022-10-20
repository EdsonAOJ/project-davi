import { Flex, Text, useToast } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  itemAnimation,
  MotionFlex,
} from '../../../components/Animation/AnimationFlex';
import { api } from '../../../services/api/api';

import { AddressProvider } from './AddressProvider';
import { ButtonsToFinish } from './ButtonsToFinish';
import { GeneralDateProvider } from './GeneralDateProvider';

export const CreateOrUpdateProviders = () => {
  const { id } = useParams();
  const toast = useToast();
  const [provider, setProvider] = useState({
    email: '',
    name: '',
    cnpj: '',
    insc_state: '',
  });

  const [addresses, setAddresses] = useState({
    city: '',
    district: '',
    number: '',
    state: '',
    street: '',
    zipCode: '',
  });

  const [phones, setPhones] = useState({
    ddd: '',
    number: '',
  });

  const handleChangeProvider = useCallback(
    (e, phone, address) => {
      if (phone) {
        setPhones({ ...phones, [e.target.name]: e.target.value });
        return;
      }
      if (address) {
        setAddresses({ ...addresses, [e.target.name]: e.target.value });
        return;
      }
      setProvider({ ...provider, [e.target.name]: e.target.value });
    },
    [addresses, phones, provider]
  );

  const handleGetOneProvider = useCallback(async () => {
    try {
      const response = await api.get(`/provider/${id}`);
      setProvider(response.data);
      setPhones(response.data.phones[0] ?? {});
      setAddresses(response.data.addresses[0] ?? {});
    } catch (err) {
      return toast({
        title: `Erro ao buscar os dados dos fornecedores!`,
        status: 'error',
        isClosable: true,
      });
    }
  }, [id, toast]);

  useEffect(() => {
    if (id !== '1') {
      handleGetOneProvider();
    }
  }, [handleGetOneProvider, id]);

  return (
    <MotionFlex
      variants={itemAnimation}
      flexDir={'column'}
      initial="hidden"
      animate="visible"
      w="100%"
      h="100%"
    >
      <Flex justify="center" mb="5">
        <Text fontWeight={'bold'} fontSize="1.5rem">
          {id !== '1' ? ' Atualizar fornecedor' : 'Criar fornecedor'}
        </Text>
      </Flex>
      <Flex
        flexDir={'column'}
        overflow="auto"
        maxH="calc(100vh - 150px)"
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#11FFB8',
            borderRadius: '24px',
          },
        }}
        pr="5"
      >
        <Flex flexDir={'column'} gridGap="5">
          <GeneralDateProvider
            provider={provider}
            phone={phones}
            handleChangeProvider={handleChangeProvider}
          />
          <AddressProvider
            addresses={addresses}
            handleChangeProvider={handleChangeProvider}
          />
        </Flex>

        <ButtonsToFinish
          fullProvider={{
            ...provider,
            phones: [{ ...phones }],
            addresses: [{ ...addresses }],
          }}
        />
      </Flex>
    </MotionFlex>
  );
};
