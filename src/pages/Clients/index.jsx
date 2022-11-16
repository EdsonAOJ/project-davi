import {
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
} from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { ModalWrapper } from '../../components/ModalWrapper';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/api/api';
import {
  itemAnimation,
  MotionFlex,
} from '../../components/Animation/AnimationFlex';
import { formatToCNPJ, formatToCPF } from 'brazilian-values';
import { CreateOrUpdateClient } from './CreateOrUpdateClient';

export const Clients = () => {
  const toast = useToast();
  const [client, setClient] = useState({});
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleGetClients = useCallback(async () => {
    try {
      const response = await api.get('clients');
      setClients(response.data.result);
    } catch (err) {
      return toast({
        title: `Erro ao buscar os dados dos usuários!`,
        status: 'error',
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    handleGetClients();
  }, [handleGetClients]);

  return (
    <MotionFlex
      variants={itemAnimation}
      flexDir={'column'}
      initial="hidden"
      animate="visible"
      w="100%"
      h="100%"
    >
      <Flex
        maxH="calc(100vh - 60px)"
        px="10px"
        overflowY="scroll"
        overflowX="scroll"
        w="100%"
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#63EDC3',
            borderRadius: '24px',
          },
        }}
      >
        <Table
          height={'100%'}
          color="black"
          w="100%"
          __css={{
            'tr:nth-of-type(even)': {
              background: '#63EDC3',
            },
            overflowX: 'scroll',
          }}
          fontSize=".8rem"
        >
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Cnpj</Th>
              <Th>Inscrição estadual</Th>

              <Th
                onClick={() => {
                  setClient({
                    cnpj: '',
                    email: '',
                    name: '',
                    insc_state: '',
                    active: true,
                  });
                  setShowModal(!showModal);
                }}
              >
                <Flex
                  align={'center'}
                  justify="center"
                  gridGap={'5px'}
                  cursor="pointer"
                >
                  <Text>Adicionar</Text>
                  <AddIcon />
                </Flex>
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {clients.map(
              (item, index) =>
                item.active && (
                  <Tr key={index}>
                    <Td>{item.name}</Td>
                    <Td>{item.email}</Td>
                    <Td>{formatToCNPJ(item.cnpj)}</Td>
                    <Td>{item.insc_state}</Td>

                    <Td
                      cursor={'pointer'}
                      onClick={() => {
                        setClient(item);
                        setShowModal(!showModal);
                      }}
                    >
                      {' '}
                      <EditIcon />{' '}
                    </Td>
                  </Tr>
                )
            )}
          </Tbody>
        </Table>
      </Flex>

      <ModalWrapper isOpen={showModal}>
        <CreateOrUpdateClient
          onClose={() => setShowModal(!showModal)}
          client={client}
          clients={clients}
          setClients={setClients}
          handleGetClients={handleGetClients}
        />
      </ModalWrapper>
    </MotionFlex>
  );
};
