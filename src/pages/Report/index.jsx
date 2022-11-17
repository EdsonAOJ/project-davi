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
import { LineChart } from './LineChart';
import { LineChartProduct } from './LineChartProduct';

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
          item?.propertyName
            .toLowerCase()
            ?.includes(inputRef?.current?.value.toLowerCase() ?? '')
        ) {
          return item;
        }
      } else if (value === '2') {
        if (
          item?.propertyName
            .toLowerCase()
            ?.includes(inputRef?.current?.value.toLowerCase() ?? '')
        ) {
          return item;
        }
      } else {
        if (
          item?.talhaoName
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
        let formatedValues = [];

        response.data?.forEach(item => {
          item.products.forEach(item2 => {
            formatedValues.push({
              propertyName: item.property.name,
              value: item2.amount,
              nameProd: item2.name,
              qntd: item2.qntd,
              uM: item2.uM,
              providName: item2.provider.name,
            });
          });
        });
        setReportsFiltered(formatedValues);

        setReports(formatedValues);
      } catch (err) {}
    }
    if (value === '2') {
      try {
        const response = await api.get(
          `purchase/report?propertyIds=[${formatId}]`
        );

        let formatedValues = [];

        response.data?.forEach(item => {
          item.products.forEach(item2 => {
            formatedValues.push({
              propertyName: item.property.name,
              price: item2.price,
              nameProd: item2.productName,
              qntd: item2.qntd,
              providName: item2.providerName,
            });
          });
        });

        setReports(formatedValues);
        setReportsFiltered(formatedValues);
      } catch (err) {}
    }
    if (value === '3') {
      try {
        const response = await api.get(`talhao/report?talhaoIds=[${formatId}]`);

        let formatedValues = [];

        response.data?.forEach(item => {
          item?.applications?.forEach(item2 => {
            formatedValues.push({
              talhaoName: item.talhao.name,
              propriedade: item.talhao.property.name,
              aplicationDate: item2.applicationDate,
              qntd: item2.qntd,
              prodName: item2.product.name,
            });
          });
        });

        setReports(formatedValues);
        setReportsFiltered(formatedValues);
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
    // formatValues();
    handleGetProperties();
  }, []);

  const formatValuesToCheckProperty = () => {
    if (value === '1') {
      let result = [];

      reportsFiltered?.map(item => {
        const index = result.findIndex(item2 => item2.x === item.propertyName);

        if (index === -1) {
          result.push({
            x: item.propertyName,
            y: 1,
          });
        } else {
          result[index].y = result[index].y + 1;
        }
      });
      return result;
    }
    if (value === '2') {
      let result = [];

      reportsFiltered?.map(item => {
        const index = result.findIndex(item2 => item2.x === item.propertyName);

        if (index === -1) {
          result.push({
            x: item.propertyName,
            y: 1,
          });
        } else {
          result[index].y = result[index].y + 1;
        }
      });
      return result;
    }
    if (value === '3') {
      let result = [];

      reportsFiltered?.map(item => {
        const index = result.findIndex(item2 => item2.x === item.propriedade);

        if (index === -1) {
          result.push({
            x: item.propriedade,
            y: 1,
          });
        } else {
          result[index].y = result[index].y + 1;
        }
      });
      return result;
    }
  };

  const formatValuesToCheckProduct = () => {
    if (value === '1') {
      let result = [];

      reportsFiltered?.map(item => {
        const index = result.findIndex(item2 => item2.x === item.propertyName);

        if (index === -1) {
          result.push({
            x: item.nameProd,
            y: Number(item.value),
          });
        } else {
          result[index].y += Number(item.value);
        }
      });
      return result;
    }
    if (value === '2') {
      let result = [];

      reportsFiltered?.map(item => {
        const index = result.findIndex(item2 => item2.x === item.nameProd);

        if (index === -1) {
          result.push({
            x: item.nameProd,
            y: Number(item.price),
          });
        } else {
          result[index].y += Number(item.price);
        }
      });

      return result;
    }
    if (value === '3') {
      let result = [];

      reportsFiltered?.map(item => {
        const index = result.findIndex(item2 => item2.x === item.prodName);

        if (index === -1) {
          result.push({
            x: item.prodName,
            y: Number(item.qntd),
          });
        } else {
          result[index].y += Number(item.qntd);
        }
      });

      return result;
    }
  };

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

      <Flex h="250px">
        <LineChart reportsFiltered={formatValuesToCheckProperty()} />
      </Flex>

      <Flex h="250px">
        <LineChartProduct
          reportsFiltered={formatValuesToCheckProduct()}
          value={value}
        />
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
                      <Th>Quantidade</Th>
                      <Th>uM</Th>
                      <Th>Valor</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {reportsFiltered?.map((item, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{item.propertyName}</Td>
                          <Td>{item.nameProd}</Td>
                          <Td>{item.providName}</Td>
                          <Td>{item.qntd}</Td>
                          <Td>{item.uM}</Td>
                          <Td>{formatToBRL(item.value)}</Td>
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
                      return (
                        <Tr key={index}>
                          <Td>{item.propertyName}</Td>
                          <Td>{item.nameProd}</Td>
                          <Td>{item.providName}</Td>
                          <Td>{item.qntd}</Td>
                          <Td>{formatToBRL(item.price)}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </>
              ) : (
                <>
                  <Thead>
                    <Tr>
                      <Th>Talhão</Th>
                      <Th>Propriedade</Th>
                      <Th>Produto aplicado</Th>
                      <Th>Quantidade aplicada</Th>
                      <Th>Datas</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {reportsFiltered?.map((item, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{item.talhaoName}</Td>
                          <Td>{item.propriedade}</Td>
                          <Td>{item.prodName}</Td>
                          <Td>{item.qntd}</Td>
                          <Td>{formatToDate(new Date(item.aplicationDate))}</Td>
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
