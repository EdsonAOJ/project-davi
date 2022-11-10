import { AddIcon, Icon } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Input,
  InputGroup,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';

import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';

import { Card } from '../../../components/Card';
import { api } from '../../../services/api/api';

export const CreateApplication = ({
  onClose,
  productsIds,
  talhaoIds,
  handleGetApplications,
}) => {
  const toast = useToast();

  const [breadCrumbValue, setBreadCrumbValue] = useState(1);

  const [products, setProducts] = useState([
    {
      fakeId: 1,
      productId: '',
      talhaoId: 0,
      applicationDate: '',
      qntd: '',
      qntdProductSelected: '',
    },
  ]);

  const handleChangeQntdProduct = (id, value) => {
    const list = [...products];
    list.find(item => {
      if (item.fakeId) {
        return item.fakeId === id;
      }
    })['qntdProductSelected'] = value;
  };

  const handleAddNewProduct = () => {
    const newArray = [...products];

    const newObjet = {
      fakeId: newArray.length + 1,
      productId: '',
      talhaoId: 0,
      applicationDate: '',
      qntd: '',
      qntdProductSelected: '',
      isDeletable: true,
    };
    newArray.push(newObjet);
    setProducts(newArray);
  };

  const handleSetProduct = breadCrumbValueIndex => {
    setBreadCrumbValue(breadCrumbValueIndex);
  };

  const handleChangeProductsValue = (e, id, setId) => {
    const list = [...products];

    if (typeof setId === 'string') {
      list.find(item => {
        if (item.fakeId) {
          return item.fakeId === id;
        }
      })[e.target.name] = setId;

      setProducts(list);
      return;
    }

    list.find(item => {
      if (item.fakeId) {
        return item.fakeId === id;
      }
    })[e.target.name] = e.target.value;

    setProducts(list);
  };

  const handleDeleteProduct = id => {
    setProducts(products.filter(item => item.fakeId !== id));
    let breadCrumbValue = 1;

    products.forEach((item, index) => {
      if (item.fakeId === id) {
        breadCrumbValue = products[index - 1].fakeId;
      }
    });

    console.log(breadCrumbValue);
    setBreadCrumbValue(breadCrumbValue);
  };

  function isEmpty(obj) {
    let result = false;
    Object.values(obj).forEach(item => {
      if (item === '') {
        result = true;
      }
    });

    return result;
  }

  const [loading, setLoading] = useState(false);

  const createOrUpdateProduct = async () => {
    let canContinue = false;
    let qntdId = 0;
    setLoading(true);

    products.forEach(item => {
      if (isEmpty(item)) {
        canContinue = true;
      }
      if (Number(item.qntd) > Number(item.qntdProductSelected)) {
        qntdId = item.fakeId;
      }
    });

    if (qntdId) {
      setLoading(false);
      return toast({
        title: `A quantidade é superior a quantidade disponivel no produto ${qntdId}!`,
        status: 'warning',
        isClosable: true,
      });
    }

    if (canContinue) {
      setLoading(false);
      return toast({
        title: `Preencha todos os dados!`,
        status: 'warning',
        isClosable: true,
      });
    }

    try {
      await api.post('/application', products);

      toast({
        title: `Aplicação efetuada com sucesso!`,
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: `Ocorreu um erro ao realizar a aplicação!`,
        status: 'error',
        isClosable: true,
      });
    }
    handleGetApplications();
    setLoading(false);
    onClose();
  };

  return (
    <Card p="5">
      <Flex flexDir={'column'}>
        <Text fontWeight={'bold'} fontSize="1.5rem" mb="3">
          Fazer aplicação
        </Text>

        <Stack spacing={3}>
          <Flex flexDir={'column'}>
            <Flex mb="5" align={'center'}>
              <Breadcrumb separator="-">
                {products.map(item => (
                  <BreadcrumbItem key={item.fakeId}>
                    <BreadcrumbLink
                      color={
                        breadCrumbValue === item.fakeId
                          ? 'green.400'
                          : 'green.900'
                      }
                      fontWeight={
                        breadCrumbValue === item.fakeId ? 'bold' : 'normal'
                      }
                      onClick={() => handleSetProduct(item.fakeId)}
                    >
                      Produto {item.fakeId}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>

              <AddIcon
                ml="5"
                onClick={handleAddNewProduct}
                cursor={'pointer'}
                height="15px"
              />
            </Flex>

            {products?.map(
              itemn =>
                breadCrumbValue === itemn.fakeId && (
                  <Flex
                    w="100%"
                    gridGap="10px"
                    key={itemn.fakeId ?? itemn.id}
                    flexDir="column"
                  >
                    <Flex flexDir={'column'}>
                      <Text>Produto: </Text>

                      <Select
                        placeholder={'Selecione uma opção'}
                        bg="#F1F1F1"
                        name="productId"
                        onChange={e => {
                          if (e?.target?.value === '') {
                            handleChangeProductsValue(e, itemn.fakeId, '');

                            return;
                          }
                          const object = JSON.parse(e?.target?.value);

                          handleChangeProductsValue(e, itemn.fakeId, object.id);
                          handleChangeQntdProduct(itemn.fakeId, object.qntd);
                        }}
                      >
                        {productsIds?.map((item, key) => (
                          <option
                            selected={item?.id === itemn.productId}
                            value={JSON.stringify(item)}
                            key={key}
                          >
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                    <Flex flexDir={'column'}>
                      <Text>Talhão: </Text>

                      <Select
                        placeholder={'Selecione uma opção'}
                        bg="#F1F1F1"
                        onChange={e => {
                          if (e?.target?.value === '') {
                            handleChangeProductsValue(e, itemn.fakeId, '');
                            return;
                          }
                          const object = JSON.parse(e?.target?.value);

                          handleChangeProductsValue(e, itemn.fakeId, object.id);
                        }}
                        name="talhaoId"
                      >
                        {talhaoIds?.map((item, key) => (
                          <option
                            selected={item?.id === itemn.talhaoId}
                            value={JSON.stringify(item)}
                            key={key}
                          >
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    </Flex>

                    <Flex flexDir={'column'}>
                      <Text>Data: </Text>
                      <InputGroup
                        bg="#F1F1F1"
                        borderRadius={'8px'}
                        alignItems={'center'}
                        justifyContent="center"
                      >
                        <Input
                          fontSize={'1rem'}
                          color="black"
                          placeholder="Digite a quantidade"
                          type={'date'}
                          autoComplete="off"
                          name="applicationDate"
                          value={itemn.applicationDate}
                          onChange={e =>
                            handleChangeProductsValue(e, itemn.fakeId)
                          }
                          _placeholder={{
                            opacity: 0.5,
                            color: 'gray.400',
                            fontWeight: 'bold',
                          }}
                        />
                      </InputGroup>
                    </Flex>

                    <Flex flexDir={'column'}>
                      <Text>
                        Quantidade:{' '}
                        {itemn.qntdProductSelected &&
                          `(disponivel ${itemn.qntdProductSelected})`}
                      </Text>
                      <InputGroup
                        bg="#F1F1F1"
                        borderRadius={'8px'}
                        alignItems={'center'}
                        justifyContent="center"
                      >
                        <Input
                          fontSize={'1rem'}
                          color="black"
                          placeholder="Digite a quantidade"
                          type={'number'}
                          autoComplete="off"
                          name="qntd"
                          value={itemn.qntd}
                          onChange={e => {
                            handleChangeProductsValue(e, itemn.fakeId);
                          }}
                          _placeholder={{
                            opacity: 0.5,
                            color: 'gray.400',
                            fontWeight: 'bold',
                          }}
                        />
                      </InputGroup>
                    </Flex>

                    {itemn.isDeletable && (
                      <Flex mt="5">
                        <Icon
                          as={BsTrash}
                          onClick={() => handleDeleteProduct(itemn.fakeId)}
                          color="black"
                          w="6"
                          h="6"
                          cursor={'pointer'}
                        />
                      </Flex>
                    )}
                  </Flex>
                )
            )}
          </Flex>
        </Stack>

        <Flex w="100%" justify={'space-between'} mt="6">
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
            onClick={onClose}
          >
            Fechar
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
            onClick={createOrUpdateProduct}
            isLoading={loading}
          >
            Confirmar
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
