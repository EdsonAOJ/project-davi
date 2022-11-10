import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useCallback, useRef, useState } from 'react';
import {
  itemAnimation,
  MotionFlex,
} from '../../components/Animation/AnimationFlex';
import { ModalWrapper } from '../../components/ModalWrapper';
import { api } from '../../services/api/api';

import { CardProducts } from './CardProducts';
import { CreateOrUpdateProducts } from './CreateOrUpdateProducts';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [editProduct, setEditProduct] = useState({
    name: '',
    uM: '',
    qntd: 0,
    amount: 0,
    providerId: '',
    propertyId: '',
  });

  const [searchIcon, setSearchIcon] = useState(true);
  const inputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [providers, setProviders] = useState([]);
  const [properties, setProperties] = useState([]);
  const options = ['Ordem alfabética', 'Quantidade', 'Valor'];

  const handleRemoveFIlters = () => {
    setProductsFiltered(products);
    setSearchIcon(true);
    if (inputRef?.current?.value) {
      inputRef.current.value = '';
    }
  };

  const handleTakeProduct = product => {
    setEditProduct(product);
    setShowModal(!showModal);
  };

  const handleShowModal = () => {
    setEditProduct({
      name: '',
      uM: '',
      qntd: 0,
      amount: 0,
      providerId: '',
    });
    setShowModal(!showModal);
  };

  const handleChangeFilter = useCallback(() => {
    if (inputRef?.current?.value === '') {
      setProductsFiltered(products ?? []);
      setSearchIcon(true);
      return;
    }

    // eslint-disable-next-line array-callback-return
    const result = products?.filter(item => {
      if (
        item.name
          .toLowerCase()
          ?.includes(inputRef?.current?.value.toLowerCase() ?? '')
      ) {
        return item;
      }
    });

    setSearchIcon(false);
    setProductsFiltered(result);
  }, [products]);

  const handleOrderProducts = orderType => {
    if (orderType === '')
      return setProductsFiltered(products.sort(() => Math.random() - 0.5));

    if (orderType === 'Ordem alfabética') {
      productsFiltered.sort((prevItem, item) => {
        let result = -1;
        if (prevItem.name > item.name) {
          result = 1;
        }
        return result;
      });
    }

    if (orderType === 'Quantidade') {
      productsFiltered.sort((prevItem, item) => {
        let result = -1;
        if (Number(prevItem.qntd) < Number(item.qntd)) {
          result = 1;
        }
        return result;
      });
    }

    if (orderType === 'Valor') {
      productsFiltered.sort((prevItem, item) => {
        let result = -1;
        if (Number(prevItem.amount) < Number(item.amount)) {
          result = 1;
        }
        return result;
      });
    }

    setProductsFiltered([...productsFiltered]);
  };

  const handleGetProducts = async () => {
    try {
      const response = await api.get('/product');
      setProducts(response.data.result);
      setProductsFiltered(response.data.result);
    } catch (err) {}
  };

  const handleGetProviders = async () => {
    try {
      const response = await api.get('/provider');
      setProviders(response.data.result);
    } catch (err) {}
  };
  const handleGetProperty = async () => {
    try {
      const response = await api.get('/properties');
      setProperties(response.data.result);
    } catch (err) {}
  };

  useEffect(() => {
    handleGetProducts();
    handleGetProviders();
    handleGetProperty();
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
        <Flex w="70%" justify={'space-between'} gap="10px">
          <InputGroup w="65%">
            <Input
              placeholder="Pesquise um produto"
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

          <Select
            placeholder="Ordenar por"
            w="30%"
            mr="10px"
            onChange={e => handleOrderProducts(e.target.value)}
          >
            {options.map((item, key) => (
              <option value={item} key={key}>
                {item}
              </option>
            ))}
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
          onClick={handleShowModal}
        >
          Adiconar produto
        </Button>
      </Flex>

      <Flex
        flexWrap={'wrap'}
        gridGap="8"
        maxH="calc(100vh - 150px)"
        overflow={'auto'}
        p="15px"
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
        {productsFiltered.map(item => (
          <CardProducts
            key={item.id}
            product={item}
            onClick={handleTakeProduct}
          />
        ))}
      </Flex>

      <ModalWrapper isOpen={showModal}>
        <CreateOrUpdateProducts
          onClose={() => setShowModal(!showModal)}
          properties={properties}
          providers={providers}
          editProduct={editProduct}
          setProductsFiltered={setProductsFiltered}
          productsFiltered={productsFiltered}
          products={products}
          setProducts={setProducts}
          handleGetProducts={handleGetProducts}
        />
      </ModalWrapper>
    </MotionFlex>
  );
};
