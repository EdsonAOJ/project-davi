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
import { useState } from 'react';

import { Card } from '../../../components/Card';
import { api } from '../../../services/api/api';

export const CreateOrUpdateProducts = ({
  onClose,
  providers,
  editProduct,
  setProductsFiltered,
  productsFiltered,
  products,
  setProducts,
}) => {
  const toast = useToast();
  const [product, setProduct] = useState(editProduct);
  const [loading, setLoading] = useState(false);

  const handleChangeProduct = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const createOrUpdateProduct = async () => {
    setLoading(true);
    if (
      product.name.trim() === '' ||
      product.qntd === 0 ||
      product.uM.trim() === '' ||
      product.amount === 0 ||
      product.providerId.trim() === ''
    ) {
      setLoading(false);
      return toast({
        title: `preencha todos os dados!`,
        status: 'warning',
        isClosable: true,
      });
    }

    if (editProduct.id) {
      try {
        const response = await api.patch('/product', product);

        setProductsFiltered(
          productsFiltered.map(item => {
            if (item.id === response.data.id) {
              item = response.data;
            }
            return item;
          })
        );

        setProducts(
          products.map(item => {
            if (item.id === response.data.id) {
              item = response.data;
            }
            return item;
          })
        );

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
        const response = await api.post('/product', product);

        setProductsFiltered([...productsFiltered, response.data]);

        setProducts([...products, response.data]);

        toast({
          title: `Produto criado com sucesso!`,
          status: 'success',
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: `Ocorreu um erro ao criar o produto!`,
          status: 'error',
          isClosable: true,
        });
      }
    }
    setLoading(false);
    onClose();
  };

  console.log(product);
  return (
    <Card p="5">
      <Flex flexDir={'column'}>
        <Text fontWeight={'bold'} fontSize="1.5rem" mb="3">
          {product.id ? 'Editar produto' : 'Criar produto'}
        </Text>

        <Stack spacing={3}>
          <Flex flexDir={'column'}>
            <Text>Nome do produto: </Text>
            <InputGroup
              bg="#F1F1F1"
              borderRadius={'8px'}
              alignItems={'center'}
              justifyContent="center"
            >
              <Input
                fontSize={'1rem'}
                color="black"
                placeholder="Digite seu email"
                type={'text'}
                autoComplete="off"
                name="name"
                value={product.name}
                onChange={handleChangeProduct}
                _placeholder={{
                  opacity: 0.5,
                  color: 'gray.400',
                  fontWeight: 'bold',
                }}
              />
            </InputGroup>
          </Flex>
          <Flex flexDir={'column'}>
            <Text>Unidade de medida: </Text>
            <InputGroup
              bg="#F1F1F1"
              borderRadius={'8px'}
              alignItems={'center'}
              justifyContent="center"
            >
              <Input
                fontSize={'1rem'}
                color="black"
                placeholder="Digite a unidade de medida"
                type={'text'}
                autoComplete="off"
                name="uM"
                value={product.uM}
                onChange={handleChangeProduct}
                _placeholder={{
                  opacity: 0.5,
                  color: 'gray.400',
                  fontWeight: 'bold',
                }}
              />
            </InputGroup>
          </Flex>
          <Flex flexDir={'column'}>
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
                value={product.qntd}
                onChange={handleChangeProduct}
                _placeholder={{
                  opacity: 0.5,
                  color: 'gray.400',
                  fontWeight: 'bold',
                }}
              />
            </InputGroup>
          </Flex>

          <Flex flexDir={'column'}>
            <Text>Fornecedor: </Text>

            <Select
              placeholder={'Selecione uma opção'}
              bg="#F1F1F1"
              onChange={handleChangeProduct}
              name="providerId"
            >
              {providers?.map((item, key) => (
                <option
                  value={item.id}
                  key={key}
                  selected={product?.provider?.id === item.id}
                >
                  {item.name}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex flexDir={'column'}>
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
                placeholder="Valor do produto"
                type={'number'}
                autoComplete="off"
                name="amount"
                value={product.amount}
                onChange={handleChangeProduct}
                _placeholder={{
                  opacity: 0.5,
                  color: 'gray.400',
                  fontWeight: 'bold',
                }}
              />
            </InputGroup>
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
            {product.id ? 'Confirmar edição' : 'Confirmar criação'}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
