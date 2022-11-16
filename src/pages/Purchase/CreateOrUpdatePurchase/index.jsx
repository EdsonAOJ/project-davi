import { AddIcon, Icon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';

import { Card } from '../../../components/Card';
import { api } from '../../../services/api/api';
import { formatToBRL } from 'brazilian-values';

export const CreateOrUpdatePurchase = ({
  onClose,
  handleGetPurchase,
  properties,
  purchasedEdit,
}) => {
  const toast = useToast();
  const [purchase, setPurchase] = useState(purchasedEdit ?? {});
  const [products, setProducts] = useState(
    purchasedEdit.product ?? [
      {
        fakeId: 1,
        productId: '',
        qntd: 0,
        price: '',
      },
    ]
  );

  const handleAddNewProduct = () => {
    const newArray = [...products];

    const newObjet = {
      fakeId: newArray.length + 1,
      productId: '',
      qntd: 0,
      price: '',
      isDeletable: true,
    };
    newArray.push(newObjet);
    setProducts(newArray);
  };

  const handleChangeProductsValue = (e, name, id) => {
    const list = [...products];

    if (typeof e === 'string') {
      list.find(item => {
        if (item.fakeId) {
          return item.fakeId === id;
        } else {
          return item.id === id;
        }
      })[name] = e;

      setProducts(list);
      return;
    }

    list.find(item => {
      if (item.fakeId) {
        return item.fakeId === id;
      } else {
        return item.id === id;
      }
    })[name] = e.target.value;

    setProducts(list);
  };

  const handleDeleteProduct = id => {
    setProducts(products.filter(item => item.id ?? item.fakeId !== id));
  };

  const hanldeChangePurchase = (e, id) => {
    setPurchase({ ...purchase, [e.target.name]: e.target.value });
  };

  const [product, setProduct] = useState([]);

  const handleGetProductsByPropertyId = async () => {
    try {
      const response = await api.get(`product/property/${purchase.propertyId}`);
      setProduct(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    if (purchase.propertyId) handleGetProductsByPropertyId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchase.propertyId]);

  const [loading, setLoading] = useState(false);

  const deletePurchase = async () => {
    setLoading(true);

    try {
      await api.delete(`/purchase/${purchasedEdit.id}`);
      handleGetPurchase();

      toast({
        title: `Produto Deletado com sucesso!`,
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: `Ocorreu um erro ao deletar o produto!`,
        status: 'error',
        isClosable: true,
      });
    }

    setLoading(false);
    onClose();
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

  const hanldeSumValues = () => {
    let values = 0;

    products.map(item => {
      values += Number(item.price);
    });

    return values;
  };

  const createOrUpdateProduct = async () => {
    let canContinue = false;
    setLoading(true);
    if (!purchase.date || !purchase.propertyId) {
      setLoading(false);
      return toast({
        title: `Preencha todos os dados!`,
        status: 'warning',
        isClosable: true,
      });
    }

    products.forEach(item => {
      if (isEmpty(item)) {
        canContinue = true;
      }
    });

    if (canContinue) {
      setLoading(false);
      return toast({
        title: `Preencha todos os dados!`,
        status: 'warning',
        isClosable: true,
      });
    }

    const objectToSend = {
      ...purchase,
      amount: hanldeSumValues(),
      product: products,
    };

    if (purchasedEdit.id) {
      try {
        await api.patch('/purchase', objectToSend);
        handleGetPurchase();
        toast({
          title: `Produto editado com sucesso!`,
          status: 'success',
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: `Ocorreu um erro ao editar o produto!`,
          status: 'error',
          isClosable: true,
        });
      }
    } else {
      try {
        await api.post('/purchase', objectToSend);

        handleGetPurchase();
        toast({
          title: `Compra efetuada com sucesso!`,
          status: 'success',
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: `Ocorreu um erro ao realizar a compra!`,
          status: 'error',
          isClosable: true,
        });
      }
    }
    setLoading(false);
    onClose();
  };

  return (
    <Card p="5">
      <Flex flexDir={'column'}>
        <Text fontWeight={'bold'} fontSize="1.5rem" mb="3">
          {purchasedEdit.id ? 'Editar compra' : 'Fazer uma compra'}
        </Text>

        <Stack spacing={3}>
          <Flex flexDir={'column'}>
            <Text>Propriedade: </Text>

            <Select
              placeholder={'Selecione uma opção'}
              bg="#F1F1F1"
              onChange={hanldeChangePurchase}
              name="propertyId"
            >
              {properties?.map((item, key) => (
                <option
                  value={item.id}
                  key={key}
                  selected={purchase?.propertyId === item.id}
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
                type={'date'}
                autoComplete="off"
                name="date"
                value={purchase?.date?.split('T')[0] ?? purchase.date}
                onChange={hanldeChangePurchase}
                _placeholder={{
                  opacity: 0.5,
                  color: 'gray.400',
                  fontWeight: 'bold',
                }}
              />
            </InputGroup>
          </Flex>

          <Flex
            maxH="200px"
            overflow={'auto'}
            flexDir="column"
            gridGap={'10px'}
            pr="3"
            css={{
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#23A07B',
                borderRadius: '24px',
              },
            }}
          >
            {products?.map(itemn => (
              <Flex
                w="100%"
                gridGap="10px"
                align="center"
                justify={'space-between'}
                key={itemn.id ?? itemn.fakeId}
              >
                <Flex flexDir={'column'} w="40%">
                  <Text>Produto: </Text>

                  <Select
                    placeholder={'Selecione uma opção'}
                    bg="#F1F1F1"
                    onChange={e => {
                      handleChangeProductsValue(
                        e.target.value,
                        'productId',
                        itemn.id ?? itemn.fakeId
                      );
                    }}
                    name="productId"
                  >
                    {product?.map((item, key) => (
                      <option
                        value={item.id}
                        key={key}
                        selected={itemn?.productId === product.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </Flex>

                <Flex flexDir={'column'} w="20%">
                  <Text>Quantidade: </Text>
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
                      onChange={e =>
                        handleChangeProductsValue(
                          e,
                          'qntd',
                          itemn.id ?? itemn.fakeId
                        )
                      }
                      _placeholder={{
                        opacity: 0.5,
                        color: 'gray.400',
                        fontWeight: 'bold',
                      }}
                    />
                  </InputGroup>
                </Flex>

                <Flex flexDir={'column'} w="20%">
                  <Text>Valor: </Text>
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
                      name="price"
                      value={itemn.price}
                      onChange={e => {
                        console.log(e.target.name);
                        handleChangeProductsValue(
                          e,
                          'price',
                          itemn.id ?? itemn.fakeId
                        );
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
                      onClick={() =>
                        handleDeleteProduct(itemn.id ?? itemn.fakeId)
                      }
                      color="black"
                      w="6"
                      h="6"
                      cursor={'pointer'}
                    />
                  </Flex>
                )}
              </Flex>
            ))}
          </Flex>
          {!purchasedEdit?.id && (
            <Flex w="100%" align={'center'} justify="center">
              <AddIcon
                mt="5"
                onClick={handleAddNewProduct}
                cursor={'pointer'}
              />
            </Flex>
          )}
        </Stack>

        <Flex
          mt={purchasedEdit?.id && '5'}
          w="100%"
          align={'flex-end'}
          justify="flex-end"
          fontWeight={'bold'}
          color="green.600"
        >
          <Text>Total: {formatToBRL(hanldeSumValues())}</Text>
        </Flex>

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

          {purchasedEdit?.id && (
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
              onClick={deletePurchase}
              isLoading={loading}
            >
              Deletar compra
            </Button>
          )}

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
            {/* {product.id ? 'Confirmar edição' : 'Confirmar criação'} */}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
