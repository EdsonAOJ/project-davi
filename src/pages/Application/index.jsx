import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
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
import { CreateApplication } from './CreateApplication';
import { EditApplication } from './EditApplication';

export const Application = () => {
  const [showModal, setShowModal] = useState(false);
  const [productsIds, setProductsIds] = useState([]);
  const [talhaoIds, setTalhaoIds] = useState([]);
  const [applications, setApplications] = useState([]);
  const [applicationsFiltered, setApplicationsFiltered] = useState([]);
  const [initDate, setInitDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [closeIcon, setCloseIcon] = useState(false);
  const [applicationEdit, setApplicationEdit] = useState({});
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleFIlter = () => {
    if (initDate && endDate) {
      setCloseIcon(true);
      setApplicationsFiltered(
        applications.filter(item => {
          if (
            new Date(item?.applicationDate?.split('T')[0]) >=
              new Date(initDate) &&
            new Date(item?.applicationDate?.split('T')[0]) <= new Date(endDate)
          ) {
            return item;
          }
        })
      );
    }
  };

  useEffect(() => {
    handleFIlter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate]);

  const handleRemoveDate = () => {
    setApplicationsFiltered(applications);
    setEndDate('');
    setInitDate('');
    setCloseIcon(false);
  };

  const handleGetProducts = async () => {
    try {
      const response = await api.get('/product');
      setProductsIds(response.data.result);
    } catch (err) {}
  };
  const handleGetTalhoes = async () => {
    try {
      const response = await api.get('talhao');
      setTalhaoIds(response.data.result);
    } catch (err) {}
  };
  const handleGetApplications = async () => {
    try {
      const response = await api.get('application');
      setApplications(response.data.result);
      setApplicationsFiltered(response.data.result);
    } catch (err) {}
  };

  const handleTakeTalhaoName = id => {
    let talhaoName = '';

    talhaoIds.map(itens => {
      if (itens.id === id) {
        talhaoName = itens.name;
      }
    });

    return talhaoName;
  };

  useEffect(() => {
    handleGetProducts();
    handleGetTalhoes();
    handleGetApplications();
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
        <Flex w="70%" gridGap="40px">
          <InputGroup w="32%">
            <Flex flexDir={'column'}>
              <Text>Data inicial: </Text>
              <Input
                placeholder="Pesquise um produto"
                type="date"
                borderColor={'#11FFB8'}
                focusBorderColor={'#11FFB8'}
                name="initDate"
                value={initDate}
                onChange={e => setInitDate(e.target.value)}
              />
            </Flex>
          </InputGroup>
          <InputGroup w="32%">
            <Flex flexDir={'column'}>
              <Text>Data Final: </Text>
              <Input
                placeholder="Pesquise um produto"
                type="date"
                borderColor={'#11FFB8'}
                focusBorderColor={'#11FFB8'}
                name="endDate"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </Flex>
          </InputGroup>
          {closeIcon && <CloseIcon onClick={handleRemoveDate} mt="9" />}
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
          onClick={() => setShowModal(!showModal)}
        >
          Fazer uma aplicação
        </Button>
      </Flex>

      <Flex
        flexWrap={'wrap'}
        gridGap="8"
        maxH="calc(100vh - 160px)"
        overflow={'auto'}
        justifyContent={['left']}
        paddingRight={'5'}
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
              <Th>Nome do produto</Th>
              <Th>Data</Th>
              <Th>Quantidade</Th>
              <Th>Nome do talhão</Th>
              <Th></Th>
            </Tr>
          </Thead>

          <Tbody>
            {applicationsFiltered.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td>{item?.product?.name}</Td>
                  <Td>{formatToDate(new Date(item?.applicationDate))}</Td>
                  <Td>{item?.qntd}</Td>
                  <Td>{handleTakeTalhaoName(item?.talhaoId)}</Td>

                  <Td
                    cursor={'pointer'}
                    onClick={() => {
                      setApplicationEdit(item);
                      setShowModalEdit(!showModalEdit);
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
              );
            })}
          </Tbody>
        </Table>
        {/* <CreateOrUpdateApplication /> */}
      </Flex>

      <ModalWrapper isOpen={showModal}>
        <CreateApplication
          productsIds={productsIds}
          talhaoIds={talhaoIds}
          onClose={() => setShowModal(!showModal)}
          handleGetApplications={handleGetApplications}
        />
      </ModalWrapper>

      <ModalWrapper isOpen={showModalEdit}>
        <EditApplication
          productsIds={productsIds}
          talhaoIds={talhaoIds}
          itemn={applicationEdit}
          onClose={() => setShowModalEdit(!showModalEdit)}
          handleGetApplications={handleGetApplications}
        />
      </ModalWrapper>
    </MotionFlex>
  );
};
