import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from '@chakra-ui/react';
import {
  itemAnimation,
  MotionFlex,
} from '../../components/Animation/AnimationFlex';
import { CardFornecedor } from './CardFornecedor';
import history from '../../services/history';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { api } from '../../services/api/api';

export const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [providersFiltered, setProvidersFiltered] = useState([]);
  const [searchIcon, setSearchIcon] = useState(true);
  const inputRef = useRef(null);

  const handleRemoveFIlters = () => {
    setProvidersFiltered(providers);
    setSearchIcon(true);
    if (inputRef?.current?.value) {
      inputRef.current.value = '';
    }
  };

  const handleChangeFilter = useCallback(() => {
    if (inputRef?.current?.value === '') {
      setProvidersFiltered(providers ?? []);
      setSearchIcon(true);
      return;
    }

    // eslint-disable-next-line array-callback-return
    const result = providers?.filter(item => {
      if (
        item.name
          .toLowerCase()
          ?.includes(inputRef?.current?.value.toLowerCase() ?? '')
      ) {
        return item;
      }
    });

    setSearchIcon(false);
    setProvidersFiltered(result);
  }, [providers]);

  const toast = useToast();

  const handleGetProviders = useCallback(async () => {
    try {
      const response = await api.get('/provider');
      setProviders(response.data.result);
      setProvidersFiltered(response.data.result);
    } catch (err) {
      return toast({
        title: `Erro ao buscar os dados dos fornecedores!`,
        status: 'error',
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    handleGetProviders();
  }, [handleGetProviders]);

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
        <InputGroup w="50%">
          <Input
            placeholder="Pesquise um fornecedor"
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
          onClick={() => history.push('/providers/management/1')}
        >
          Adiconar fornecedor
        </Button>
      </Flex>

      <Flex
        flexWrap={'wrap'}
        gridGap="8"
        maxH="calc(100vh - 150px)"
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
        {providersFiltered.map((item, index) => (
          <CardFornecedor
            key={`${item?.id}-${index}`}
            id={item.id}
            name={item.name}
            email={item.email}
            ddd={item.phones[0]?.ddd}
            phone={item.phones[0]?.number}
          />
        ))}
      </Flex>
    </MotionFlex>
  );
};
