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
import { formatToCPF } from 'brazilian-values';
import { CreateOrUpdateUser } from './CreateOrUpdateUser';

export const Users = () => {
  const toast = useToast();
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleGetUsers = useCallback(async () => {
    try {
      const response = await api.get('user');
      setUsers(response.data.result);
    } catch (err) {
      return toast({
        title: `Erro ao buscar os dados dos usuários!`,
        status: 'error',
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

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
              <Th>CPF</Th>
              <Th>Telefone</Th>

              <Th
                onClick={() => {
                  setUser({
                    password: '',
                    email: '',
                    name: '',
                    cpf: '',
                    phones: [
                      {
                        ddd: '',
                        number: '',
                      },
                    ],
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
            {users.map(
              (item, index) =>
                item.active && (
                  <Tr key={index}>
                    <Td>{item.name}</Td>
                    <Td>{item.email}</Td>
                    <Td>{formatToCPF(item.cpf)}</Td>
                    <Td>{`${item.phones[0]?.ddd ?? '... '} - ${
                      item.phones[0]?.number ?? '...'
                    }`}</Td>
                    <Td
                      cursor={'pointer'}
                      onClick={() => {
                        setUser(item);
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
        <CreateOrUpdateUser
          onClose={() => setShowModal(!showModal)}
          handleGetUsers={handleGetUsers}
          user={user}
          users={users}
          setUsers={setUsers}
        />
      </ModalWrapper>
    </MotionFlex>
  );
};
