import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { formatToDate } from 'brazilian-values';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  itemAnimation,
  MotionFlex,
} from '../../components/Animation/AnimationFlex';
import { ModalWrapper } from '../../components/ModalWrapper';
import { api } from '../../services/api/api';
import { CreateOrUpdatePurchase } from './CreateOrUpdatePurchase';

export const Purchase = () => {
  const [showModal, setShowModal] = useState(false);
  const [purchasedEdit, setPurchasedEdit] = useState({});
  const [properties, setProperties] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [purchaseFiltered, setPurchaseFiltered] = useState([]);
  const toast = useToast();

  const handleOrderProducts = orderType => {
    if (orderType === '')
      return setPurchaseFiltered(purchase.sort(() => Math.random() - 0.5));

    if (orderType === 'Data crescente') {
      purchaseFiltered.sort((prevItem, item) => {
        let result = -1;

        if (prevItem.date.split('T')[0] > item.date.split('T')[0]) {
          result = 1;
        }

        return result;
      });
    }

    if (orderType === 'Data decrescente') {
      purchaseFiltered.sort((prevItem, item) => {
        let result = -1;

        if (prevItem.date.split('T')[0] < item.date.split('T')[0]) {
          result = 1;
        }

        return result;
      });
    }

    setPurchaseFiltered([...purchaseFiltered]);
  };

  const handleGetPurchase = async () => {
    try {
      const response = await api.get('/purchase');
      setPurchase(response.data.result);
      setPurchaseFiltered(response.data.result);
    } catch (err) {
      return toast({
        title: `Ocorreu um erro ao trazer as compras!`,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleGetProperties = async () => {
    try {
      const response = await api.get('/properties');
      setProperties(response.data.result);
    } catch (err) {}
  };

  useEffect(() => {
    handleGetProperties();
    handleGetPurchase();
  }, []);

  return (
    <MotionFlex
      variants={itemAnimation}
      flexDir={'column'}
      initial="hidden"
      animate="visible"
      w="100%"
      h="100%"
    >
      <Flex align={'center'} justify="space-between" mb="10" pos={'relative'}>
        <Flex w="35%" justify={'space-between'} gap="10px">
          <Select
            placeholder="Ordenar por"
            mr="10px"
            onChange={e => handleOrderProducts(e.target.value)}
          >
            <option value="Data crescente">Data crescente</option>
            <option value="Data decrescente">Data decrescente</option>
          </Select>
        </Flex>

        <Button
          bg="#11FFB8"
          fontSize={'1rem'}
          borderRadius={'10px'}
          _hover={{
            opacity: '0.5',
          }}
          _active={{
            opacity: '0.8',
          }}
          onClick={() => {
            setShowModal(!showModal);
            setPurchasedEdit({});
          }}
        >
          Realizar uma compra
        </Button>
      </Flex>

      <Flex
        maxH="calc(100vh - 150px)"
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
              <Th>Nome da propriedade</Th>
              <Th>Data</Th>

              <Th></Th>
            </Tr>
          </Thead>

          <Tbody>
            {purchaseFiltered.map((item, index) => {
              let propertyName = '';
              let date = item.date;
              let canShow = false;

              properties.forEach((property, index2) => {
                if (property.id === item.propertyId) {
                  canShow = true;
                  if (!propertyName) {
                    propertyName = property.name;
                  }
                }
              });

              return (
                canShow && (
                  <Tr key={index}>
                    <Td>{propertyName}</Td>
                    <Td>{formatToDate(new Date(date))}</Td>

                    <Td
                      cursor={'pointer'}
                      onClick={() => {
                        setPurchasedEdit(item);
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
                )
              );
            })}
          </Tbody>
        </Table>
      </Flex>

      <ModalWrapper isOpen={showModal}>
        <CreateOrUpdatePurchase
          onClose={() => setShowModal(!showModal)}
          properties={properties}
          purchasedEdit={purchasedEdit}
          handleGetPurchase={handleGetPurchase}
        />
      </ModalWrapper>
    </MotionFlex>
  );
};
