import { Flex, Text, useToast } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  itemAnimation,
  MotionFlex,
} from '../../../components/Animation/AnimationFlex';
import { api } from '../../../services/api/api';
import { AddressProvider } from '../../Providers/CreateOrUpdateProviders/AddressProvider';
import { Buttons } from '../Buttons';
import { ClientsProvider } from './ClientsProvider';

export const CreateOrUpdateProperties = () => {
  const { id } = useParams();
  const toast = useToast();

  const [addresses, setAddresses] = useState({
    city: '',
    district: '',
    number: '',
    state: '',
    street: '',
    zipCode: '',
  });

  const [nameAndClient, setNameAndClient] = useState({
    name: '',
    clientId: '',
  });

  const handleChangeProvider = useCallback(
    (e, client, address) => {
      if (client) {
        if (e.target.name.includes('name')) {
          nameAndClient.name = e.target.value.slice(0, 100);
          setNameAndClient({ ...nameAndClient });
          return;
        }
        setNameAndClient({ ...nameAndClient, [e.target.name]: e.target.value });
        return;
      }
      if (address) {
        if (e.target.name.includes('zipCode')) {
          addresses.zipCode = e.target.value.slice(0, 8);
          setAddresses({ ...addresses });
          return;
        }

        setAddresses({ ...addresses, [e.target.name]: e.target.value });
        return;
      }
    },
    [addresses, nameAndClient]
  );

  const handleGetOneProperties = useCallback(async () => {
    try {
      const response = await api.get(`/properties/${id}`);

      setNameAndClient(
        {
          ...response.data,
          name: response.data.name,
          clientId: response.data.clientId,
        } ?? {}
      );

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
      handleGetOneProperties();
    }
  }, [handleGetOneProperties, id]);

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
          {id !== '1' ? ' Atualizar propriedade' : 'Criar propriedade'}
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
          <ClientsProvider
            nameAndClient={nameAndClient}
            handleChangeProvider={handleChangeProvider}
          />
          <AddressProvider
            addresses={addresses}
            handleChangeProvider={handleChangeProvider}
          />
        </Flex>

        <Buttons
          fullProperties={{
            ...nameAndClient,
            addresses: [{ ...addresses }],
          }}
        />
      </Flex>
    </MotionFlex>
  );
};
