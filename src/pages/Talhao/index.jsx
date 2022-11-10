import { useCallback, useEffect, useState } from 'react';
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

import {
  itemAnimation,
  MotionFlex,
} from '../../components/Animation/AnimationFlex';
import { api } from '../../services/api/api';
import { CreateOrUpdateTalhao } from './CreateOrUpdateTalhao';

export const Talhao = () => {
  const toast = useToast();
  const [talhao, setTalhao] = useState([]);
  const [talhoes, setTalhoes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleGetTalhoes = useCallback(async () => {
    try {
      const response = await api.get('talhao');
      setTalhoes(response.data.result);
    } catch (err) {
      return toast({
        title: `Erro ao buscar os talhões!`,
        status: 'error',
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    handleGetTalhoes();
  }, [handleGetTalhoes]);

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
              <Th>Propriedade</Th>

              <Th
                onClick={() => {
                  setTalhao({
                    name: '',
                    propertyId: '',
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
            {talhoes.map((item, index) => (
              <Tr key={index}>
                <Td>{item?.name}</Td>
                <Td>{item?.property?.name}</Td>
                <Td
                  cursor={'pointer'}
                  onClick={() => {
                    setTalhao(item);
                    setShowModal(!showModal);
                  }}
                >
                  <Flex
                    align={'center'}
                    justify="center"
                    gridGap={'5px'}
                    cursor="pointer"
                  >
                    <EditIcon />{' '}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>

      <ModalWrapper isOpen={showModal}>
        <CreateOrUpdateTalhao
          onClose={() => setShowModal(!showModal)}
          talhao={talhao}
          talhoes={talhoes}
          setTalhoes={setTalhoes}
        />
      </ModalWrapper>
    </MotionFlex>
  );
};
