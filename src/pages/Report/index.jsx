import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { formatToBRL, formatToDate } from 'brazilian-values';
import { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import {
  itemAnimation,
  MotionFlex,
} from '../../components/Animation/AnimationFlex';
import { Card } from '../../components/Card';
import { ModalWrapper } from '../../components/ModalWrapper';
import { api } from '../../services/api/api';

export const Report = () => {
  const [showTypeReports, setShowTypeReports] = useState(true);
  const [value, setValue] = useState('1');
  const [talhao, setTalhao] = useState([]);
  const [reports, setReports] = useState();
  const [reportsFiltered, setReportsFiltered] = useState();
  const inputRef = useRef();
  const [searchIcon, setSearchIcon] = useState(true);

  const [properties, setProperties] = useState([]);
  const [ids, setIds] = useState([]);

  const handleRemoveFIlters = () => {
    setReportsFiltered(reports);
    setSearchIcon(true);
    if (inputRef?.current?.value) {
      inputRef.current.value = '';
    }
  };

  const handleChangeFilter = useCallback(() => {
    if (inputRef?.current?.value === '') {
      setReportsFiltered(reports ?? []);
      setSearchIcon(true);
      return;
    }

    // eslint-disable-next-line array-callback-return
    const result = reports?.filter(item => {
      if (value === '1') {
        if (
          item?.property?.name
            .toLowerCase()
            ?.includes(inputRef?.current?.value.toLowerCase() ?? '')
        ) {
          return item;
        }
      } else if (value === '2') {
        if (
          item?.property?.name
            .toLowerCase()
            ?.includes(inputRef?.current?.value.toLowerCase() ?? '')
        ) {
          return item;
        }
      } else {
        if (
          item?.talhao?.name
            .toLowerCase()
            ?.includes(inputRef?.current?.value.toLowerCase() ?? '')
        ) {
          return item;
        }
      }
    });

    setSearchIcon(false);
    setReportsFiltered(result);
  }, [reports, value]);

  const handleChangeIds = e => {
    const object = {
      id: e.id,
      name: e.name,
    };
    setIds([...ids, object]);
  };

  const handleConfirmForm = async () => {
    const formatId = ids.map((item, index) => {
      return `"${item.id}"${index === ids.length ? ', ' : ''}`;
    });

    if (value === '1') {
      try {
        const response = await api.get(
          `product/report?propertyIds=[${formatId}]`
        );
        setReports(response.data);
        setReportsFiltered(response.data);
      } catch (err) {}
    }
    if (value === '2') {
      try {
        const response = await api.get(
          `purchase/report?propertyIds=[${formatId}]`
        );
        setReports(response.data);
        setReportsFiltered(response.data);
      } catch (err) {}
    }
    if (value === '3') {
      try {
        const response = await api.get(`talhao/report?talhaoIds=[${formatId}]`);
        setReports(response.data);
        setReportsFiltered(response.data);
      } catch (err) {}
    }
    setShowTypeReports(false);
  };

  const hanldeRemoveOption = e => {
    setIds(ids.filter(item => item.id !== e));
  };

  const handleGetTalhoes = async () => {
    try {
      const response = await api.get('talhao');
      setTalhao(response.data.result);
    } catch (err) {}
  };

  const handleGetProperties = async () => {
    try {
      const response = await api.get('properties');
      setProperties(response.data.result);
    } catch (err) {}
  };

  useEffect(() => {
    handleGetTalhoes();

    handleGetProperties();
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
        <Flex w="40%" gridGap="40px">
          <InputGroup mt="6">
            <Input
              placeholder={`Pesquise por ${
                value === '1' || value === '2' ? 'Propriedade' : 'Talhão'
              }`}
              borderColor={'#11FFB8'}
              focusBorderColor={'#11FFB8'}
              ref={inputRef}
              pr="75px"
            />
            {!searchIcon && (
              <CloseIcon
                color="gray.500"
                onClick={handleRemoveFIlters}
                pos="absolute"
                right={50}
                top={3}
                cursor="pointer"
              />
            )}

            <InputRightElement
              children={
                <SearchIcon color="gray.500" onClick={handleChangeFilter} />
              }
              cursor="pointer"
            />
          </InputGroup>
        </Flex>

        <Button
          bg="#11FFB8"
          mt="4"
          fontSize={'1rem'}
          borderRadius={'10px'}
          _hover={{
            opacity: '0.5',
          }}
          _active={{
            opacity: '0.8',
          }}
          onClick={() => setShowTypeReports(!showTypeReports)}
        >
          Mudar relatorio
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
          {reportsFiltered?.length === 0 ? (
            <Flex justify={'center'} w="100%" mt="54px">
              <Text fontSize={'24px'} fontWeight="semibold">
                Sem dados para esses filtros
              </Text>
            </Flex>
          ) : (
            <>
              {value === '1' ? (
                <>
                  <Thead>
                    <Tr>
                      <Th>Propriedade</Th>
                      <Th>Produto(s)</Th>
                      <Th>Fornecedor(es)</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {reportsFiltered?.map((item, index) => {
                      let propriedadeName = item?.property?.name;
                      let productsName = [];
                      let fornecedorName = [];

                      item?.products?.forEach(subItem => {
                        productsName?.push(subItem?.name);
                        fornecedorName?.push(subItem?.provider.name);
                      });

                      return (
                        <Tr key={index}>
                          <Td>{propriedadeName}</Td>
                          <Td>
                            {productsName?.map((item, indexss) => {
                              return `${item}${
                                indexss < productsName.length ? ', ' : ''
                              }`;
                            })}
                          </Td>
                          <Td>
                            {fornecedorName?.map((item, indexss) => {
                              return `${item}${
                                indexss < productsName.length ? ', ' : ''
                              }`;
                            })}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </>
              ) : value === '2' ? (
                <>
                  <Thead>
                    <Tr>
                      <Th>Propriedade</Th>
                      <Th>Produto(s) comprado(s)</Th>
                      <Th>fornecedor(es)</Th>
                      <Th>Quantidade(s) comprada(s)</Th>
                      <Th>Preço(s)</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {reportsFiltered?.map((item, index) => {
                      let propriedadeName = item?.property?.name;
                      let providerName = [];
                      let productsName = [];
                      let quantidadesCompradas = [];
                      let valores = [];

                      item?.products?.forEach(subItem => {
                        console.log(subItem, 'subItem');
                        productsName?.push(subItem?.productName);
                        quantidadesCompradas?.push(subItem?.qntd);
                        valores?.push(subItem?.price);
                        providerName?.push(subItem?.providerName);
                      });

                      return (
                        <Tr key={index}>
                          <Td>{propriedadeName}</Td>
                          <Td>
                            {productsName?.map((item, indexss) => {
                              return `${item}${
                                indexss < productsName.length ? ', ' : ''
                              }`;
                            })}
                          </Td>

                          <Td>
                            {providerName?.map((item, indexss) => {
                              return `${item}${
                                indexss < productsName.length ? ', ' : ''
                              }`;
                            })}
                          </Td>
                          <Td>
                            {quantidadesCompradas?.map((item, indexss) => {
                              return `${item}${
                                indexss < productsName.length ? ', ' : ''
                              }`;
                            })}
                          </Td>
                          <Td>
                            {valores?.map((item, indexss) => {
                              return `${formatToBRL(item)}${
                                indexss < productsName?.length ? ', ' : ''
                              }`;
                            })}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </>
              ) : (
                <>
                  <Thead>
                    <Tr>
                      <Th>Talhões</Th>
                      <Th>Produto(s) aplicado(s)</Th>
                      <Th>Quantidade(s) aplicada(s)</Th>
                      <Th>Datas</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {reportsFiltered?.map((item, index) => {
                      let propriedadeName = item?.talhao?.name;
                      let productsName = [];
                      let quantidadesAplicadas = [];
                      let datasAplicadas = [];

                      item?.applications?.forEach(subItem => {
                        console.log(subItem, 'subItem');
                        productsName?.push(subItem?.product?.name);
                        quantidadesAplicadas?.push(subItem?.qntd);
                        datasAplicadas?.push(subItem?.applicationDate);
                      });

                      return (
                        <Tr key={index}>
                          <Td>{propriedadeName}</Td>
                          <Td>
                            {productsName?.map((item, indexss) => {
                              return `${item}${
                                indexss < productsName.length ? ', ' : ''
                              }`;
                            })}
                          </Td>
                          <Td>
                            {quantidadesAplicadas?.map((item, indexss) => {
                              return `${item}${
                                indexss < productsName.length ? ', ' : ''
                              }`;
                            })}
                          </Td>

                          <Td>
                            {datasAplicadas?.map((item, indexss) => {
                              return `${formatToDate(new Date(item))}${
                                indexss < productsName.length ? ' - ' : ''
                              }`;
                            })}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </>
              )}
            </>
          )}
        </Table>
      </Flex>

      <ModalWrapper isOpen={showTypeReports}>
        <Card>
          <Text mb="5" fontWeight={'bold'} fontSize="18px">
            Selecione o tipo do relatório
          </Text>

          <Flex flexDir={'column'} gridGap="5">
            <RadioGroup
              onChange={e => {
                setValue(e);
                setIds([]);
                setReports([]);
                setReportsFiltered([]);
              }}
              value={value}
            >
              <Stack direction="row">
                <Radio value="1">Produto</Radio>
                <Radio value="2">Compra</Radio>
                <Radio value="3">Talhão</Radio>
              </Stack>
            </RadioGroup>

            <Flex flexDir={'column'}>
              <Text>
                {value === '1' || value === '2' ? 'Propriedade' : 'Talhão'}:
              </Text>

              <Select
                placeholder={'Selecione uma opção'}
                bg="#F1F1F1"
                name="productId"
                onChange={e => {
                  if (e.target.value === '') return;
                  handleChangeIds(JSON.parse(e?.target?.value));
                }}
              >
                {value === '1' || value === '2' ? (
                  <>
                    {properties?.map((item, key) => (
                      <option
                        value={JSON.stringify(item)}
                        key={key}
                        disabled={ids.some(id => id.id === item.id)}
                      >
                        {item.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    {talhao?.map((item, key) => (
                      <option
                        value={JSON.stringify(item)}
                        key={key}
                        disabled={ids.some(id => id.id === item.id)}
                      >
                        {item.name}
                      </option>
                    ))}
                  </>
                )}
                :
              </Select>
            </Flex>

            <Flex flexDir={'column'}>
              <Text>
                {value === '1' || value === '2'
                  ? 'Propriedades selecionadas'
                  : 'Talhoes selecionados'}
                :
              </Text>

              <Flex w="100%" gridGap="2" flexWrap={'wrap'}>
                {ids.map((item, key) => (
                  <Text
                    bg="gray.200"
                    key={key}
                    borderRadius={'8px'}
                    p="1"
                    px="3"
                  >
                    {item.name}
                    <CloseIcon
                      ml="2"
                      height={'14px'}
                      color="gray.500"
                      onClick={() => hanldeRemoveOption(item.id)}
                      cursor="pointer"
                    />
                  </Text>
                ))}
              </Flex>
            </Flex>

            <Flex align={'center'} justify="space-between">
              <Button
                bg="#11FFB8"
                p="1rem"
                fontSize={'1rem'}
                borderRadius={'8px'}
                _hover={{
                  opacity: '0.5',
                }}
                _active={{
                  opacity: '0.8',
                }}
                onClick={() => setShowTypeReports(!showTypeReports)}
              >
                Voltar
              </Button>
              <Button
                bg="#11FFB8"
                p="1rem"
                fontSize={'1rem'}
                borderRadius={'8px'}
                _hover={{
                  opacity: '0.5',
                }}
                _active={{
                  opacity: '0.8',
                }}
                onClick={handleConfirmForm}
              >
                Confirmar
              </Button>
            </Flex>
          </Flex>
        </Card>
      </ModalWrapper>
    </MotionFlex>
  );
};
